from fastapi import FastAPI, HTTPException, Request, Depends
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import jwt
import os
from dotenv import load_dotenv
from routers.bakeryrouter import bakeryrouter
from routers.chat_router import chat_router
from routers.course_router import course_router
# from routers.recommend_spot_router import recommend_router
from routers.count_top_router import top_app

# 환경 변수 로드
load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")

# FastAPI 애플리케이션 설정
app = FastAPI(docs_url="/fast_api/docs",
              openapi_url="/fast_api/openapi.json")

# CORS 미들웨어 추가
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 모든 출처 허용
    allow_credentials=True,
    allow_methods=["*"],  # 모든 HTTP 메서드 허용
    allow_headers=["*"],  # 모든 헤더 허용
)

# JWT 인증 미들웨어
security = HTTPBearer()

def verify_jwt(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """
    JWT 토큰을 검증합니다.
    """
    try:
        payload = jwt.decode(credentials.credentials, SECRET_KEY, algorithms=[ALGORITHM])
        return payload  # 토큰이 유효한 경우 payload 반환
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="토큰이 만료되었습니다.")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="유효하지 않은 토큰입니다.")

# 라우터 연결
app.include_router(bakeryrouter, prefix='/fast_api', dependencies=[Depends(verify_jwt)])
app.include_router(chat_router, prefix='/fast_api', dependencies=[Depends(verify_jwt)])
app.include_router(course_router, prefix='/fast_api', dependencies=[Depends(verify_jwt)])
# app.include_router(recommend_router, prefix='/fast_api', dependencies=[Depends(verify_jwt)])
app.include_router(top_app, prefix='/fast_api', dependencies=[Depends(verify_jwt)])

# 기본 엔드포인트
@app.get("/")
def read_root():
    print("Root endpoint accessed.")
    return {"message": "Welcome to the Travel Recommendation API"}

# 전역 예외 핸들러
@app.exception_handler(Exception)
def global_exception_handler(request: Request, exc: Exception):
    print(f"Unhandled exception occurred: {exc}")
    return {"detail": "서버 내부 오류가 발생했습니다. 관리자에게 문의하세요.", "error": str(exc)}

if __name__ == "__main__":
    print("Starting FastAPI server...")
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
