from fastapi import FastAPI, HTTPException, Request, Depends
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import jwt
import logging
import os
from dotenv import load_dotenv
from routers.bakeryrouter import bakeryrouter
from routers.chat_router import chat_router
from routers.course_router import course_router
from routers.recommend_spot_router import recommend_router
from routers.count_top_router import top_app

# 환경 변수 로드
load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")

# 로깅 설정
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    handlers=[logging.StreamHandler()]
)
logger = logging.getLogger("FastAPI")

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
    except jwt.ExpiredSignatureError as e:
        logger.error("JWT 토큰이 만료되었습니다: %s", str(e))
        raise HTTPException(status_code=401, detail="토큰이 만료되었습니다.")
    except jwt.InvalidTokenError as e:
        logger.error("유효하지 않은 JWT 토큰입니다: %s", str(e))
        raise HTTPException(status_code=401, detail="유효하지 않은 토큰입니다.")
    except Exception as e:
        logger.exception("JWT 검증 중 예기치 않은 오류 발생: %s", str(e))
        raise HTTPException(status_code=500, detail="JWT 처리 중 오류가 발생했습니다.")

# 라우터 연결
try:
    app.include_router(bakeryrouter, prefix='/fast_api', dependencies=[Depends(verify_jwt)])
    app.include_router(chat_router, prefix='/fast_api', dependencies=[Depends(verify_jwt)])
    app.include_router(course_router, prefix='/fast_api', dependencies=[Depends(verify_jwt)])
    app.include_router(recommend_router, prefix='/fast_api', dependencies=[Depends(verify_jwt)])
    app.include_router(top_app, prefix='/fast_api', dependencies=[Depends(verify_jwt)])
    logger.info("라우터 연결 완료")
except Exception as e:
    logger.exception("라우터 연결 중 오류 발생: %s", str(e))
    raise HTTPException(status_code=500, detail="라우터 연결 중 오류가 발생했습니다.")

# 기본 엔드포인트
@app.get("/")
def read_root():
    logger.info("Root endpoint accessed.")
    return {"message": "Welcome to the Travel Recommendation API"}

# 전역 예외 핸들러
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.exception("Unhandled exception occurred: %s", str(exc))
    return {"detail": "서버 내부 오류가 발생했습니다. 관리자에게 문의하세요.", "error": str(exc)}

# 요청 및 응답 로깅 미들웨어
@app.middleware("http")
async def log_requests(request: Request, call_next):
    logger.info("요청 시작: %s %s", request.method, request.url)
    try:
        response = await call_next(request)
        logger.info("응답 상태 코드: %s %s", response.status_code, response.body)
        return response
    except Exception as e:
        logger.exception("요청 처리 중 오류 발생: %s", str(e))
        raise

if __name__ == "__main__":
    logger.info("Starting FastAPI server...")
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
