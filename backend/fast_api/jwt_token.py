import jwt
import datetime
from os import getenv

# 테스트용 비밀 키
SECRET_KEY = getenv("SECRET_KEY")  # 서버와 동일하지 않아도 됨
ALGORITHM = getenv("ALGORITHM")          # 서명 알고리즘

# 토큰 생성 함수
def create_test_token(user_id, expires_in=3600):
    """
    테스트용 JWT 토큰 생성.
    :param user_id: 사용자 ID
    :param expires_in: 만료 시간 (초)
    :return: JWT 토큰
    """
    payload = {
        "sub": user_id,
        "userid": user_id,
        "exp": datetime.datetime.utcnow() + datetime.timedelta(seconds=expires_in),  # 만료 시간
        "iat": datetime.datetime.utcnow(),  # 발급 시간
        "role": "test-user"  # 테스트 사용자 역할
    }
    token = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)
    return token

# 테스트용 토큰 생성
if __name__ == "__main__":
    token = create_test_token(user_id="12345", expires_in=3600)  # 1시간 유효
    print("Generated Test Token:", token)
