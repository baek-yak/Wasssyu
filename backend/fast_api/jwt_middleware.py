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
            "/fast_api/auth/login",  # 로그인 엔드포인트가 있다면
            "/fast_api/auth/register"  # 회원가입 엔드포인트가 있다면
        ]

        # 현재 경로가 제외 경로에 포함되어 있으면 미들웨어 스킵
        if request.url.path in exclude_paths:
            return await call_next(request)

        # Authorization 헤더 확인
        auth_header = request.headers.get('Authorization')
        if not auth_header or not auth_header.startswith('Bearer '):
            return JSONResponse(
                status_code=401,
                content={"detail": "Invalid authentication credentials"}
            )

        try:
            # Token 추출 및 검증
            token = auth_header.split(' ')[1]
            payload = jwt.decode(
                token,
                getenv("SECRET_KEY"),
                algorithms=[getenv("ALGORITHM")]
            )
            # request state에 user 정보 저장
            request.state.user = payload['sub']
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