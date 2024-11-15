from fastapi import FastAPI, Request, Depends
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
from jwt_middleware import JWTMiddleware
from jwt_handler import JWTHandler
from dotenv import load_dotenv
from routers.bakeryrouter import bakeryrouter
from routers.chat_router import chat_router
from routers.course_router import course_router
from routers.recommend_spot_router import recommend_router
from routers.count_top_router import top_app

# 환경 변수 로드
load_dotenv()

# JWT 핸들러 인스턴스 생성
jwt_handler = JWTHandler()

# FastAPI 애플리케이션 설정
app = FastAPI(
    docs_url="/fast_api/docs",
    openapi_url="/fast_api/openapi.json",
    title="Travel Recommendation API",
    description="JWT token is required for authentication"
)

# CORS 미들웨어 추가
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# JWT 미들웨어 추가
app.add_middleware(JWTMiddleware)

# 라우터 연결
app.include_router(
    bakeryrouter,
    prefix='/fast_api',
    dependencies=[Depends(jwt_handler.get_current_user)]
)
app.include_router(
    chat_router,
    prefix='/fast_api',
    dependencies=[Depends(jwt_handler.get_current_user)]
)
app.include_router(
    course_router,
    prefix='/fast_api',
    dependencies=[Depends(jwt_handler.get_current_user)]
)
app.include_router(
    recommend_router,
    prefix='/fast_api',
    dependencies=[Depends(jwt_handler.get_current_user)]
)
app.include_router(
    top_app,
    prefix='/fast_api',
    dependencies=[Depends(jwt_handler.get_current_user)]
)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Travel Recommendation API"}

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    print(f"Unhandled exception occurred: {exc}")
    return {"detail": "서버 내부 오류가 발생했습니다.", "error": str(exc)}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)