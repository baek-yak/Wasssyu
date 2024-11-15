from fastapi import HTTPException, Security
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from datetime import datetime, timedelta
import jwt
from os import getenv
import logging
import base64

# 로깅 설정
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

class JWTHandler:
    def __init__(self):
        self.secret_key = base64.b64decode(getenv("SECRET_KEY"))
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
            logger.error(f"Error creating token: {str(e)}")
            raise HTTPException(status_code=500, detail=f"Error creating token: {str(e)}")

    def verify_token(self, token: str) -> str:
        try:
            logger.info(f"Token: {token}")
            payload = jwt.decode(token, self.secret_key, algorithms=[self.algorithm])
            print(f"""
                    payload : {payload}
                    """)
            return payload['sub']
        except jwt.ExpiredSignatureError as e:
            logger.error(f"Token expired: {str(e)}")
            raise HTTPException(status_code=401, detail='Token has expired')
        except jwt.InvalidTokenError as e:
            print(f"""
                    Invalid ERROR : {e}
                """)
            logger.error(f"Invalid token: {str(e)}")
            raise HTTPException(status_code=401, detail='Invalid token')
        except Exception as e:
            logger.error(f"Error verifying token: {str(e)}")
            raise HTTPException(status_code=500, detail=f"Error verifying token: {str(e)}")

    def get_current_user(self, credentials: HTTPAuthorizationCredentials = Security(HTTPBearer())) -> str:
        try:
            logger.debug("Attempting to get current user")
            token = credentials.credentials
            print(f"""
                    Get current user token : {token}
                """)
            user_id = self.verify_token(token)
            logger.debug(f"Successfully got user: {user_id}")
            return user_id
        except Exception as e:
            logger.error(f"Error in get_current_user: {str(e)}")
            raise