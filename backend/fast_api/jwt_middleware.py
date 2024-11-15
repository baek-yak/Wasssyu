# jwt_middleware.py
from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware
from fastapi.responses import JSONResponse
import jwt
from os import getenv

class JWTMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        # 인증이 필요없는 경로 리스트
        exclude_paths = [
            "/fast_api/docs",
            "/fast_api/openapi.json",
            "/",
            "/fast_api/auth/login",
            "/fast_api/auth/register"
        ]

        if any(request.url.path.startswith(path) for path in exclude_paths):
            return await call_next(request)

        try:
            auth_header = request.headers.get('Authorization')
            if not auth_header:
                return JSONResponse(
                    status_code=401,
                    content={"detail": "No authorization header"}
                )

            if not auth_header.startswith('Bearer '):
                return JSONResponse(
                    status_code=401,
                    content={"detail": "Invalid authorization header"}
                )

            token = auth_header.split(' ')[1]
            try:
                payload = jwt.decode(
                    token,
                    getenv("SECRET_KEY"),
                    algorithms=[getenv("ALGORITHM")]
                )
                request.state.user = payload.get('sub')
            except jwt.ExpiredSignatureError:
                return JSONResponse(
                    status_code=401,
                    content={"detail": "Token has expired"}
                )
            except jwt.InvalidTokenError:
                return JSONResponse(
                    status_code=401,
                    content={"detail": "Invalid token"}
                )
            
            return await call_next(request)
            
        except Exception as e:
            return JSONResponse(
                status_code=500,
                content={"detail": f"Internal server error: {str(e)}"}
            )

# jwt_handler.py
from fastapi import HTTPException, Security
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from datetime import datetime, timedelta
import jwt
from os import getenv
from typing import Optional

class JWTHandler:
    def __init__(self):
        self.secret_key = getenv("SECRET_KEY")
        self.algorithm = getenv("ALGORITHM")
        self.security = HTTPBearer()

    def create_token(self, user_id: str) -> str:
        try:
            payload = {
                'exp': datetime.utcnow() + timedelta(days=1),
                'iat': datetime.utcnow(),
                'sub': user_id
            }
            token = jwt.encode(
                payload,
                self.secret_key,
                algorithm=self.algorithm
            )
            return token
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Error creating token: {str(e)}")

    def verify_token(self, token: str) -> Optional[str]:
        try:
            payload = jwt.decode(token, self.secret_key, algorithms=[self.algorithm])
            return payload.get('sub')
        except jwt.ExpiredSignatureError:
            raise HTTPException(status_code=401, detail='Token has expired')
        except jwt.InvalidTokenError:
            raise HTTPException(status_code=401, detail='Invalid token')
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Error verifying token: {str(e)}")

    async def get_current_user(self, auth: HTTPAuthorizationCredentials = Security(HTTPBearer())) -> str:
        return self.verify_token(auth.credentials)