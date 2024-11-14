from fastapi import FastAPI, HTTPException, Request
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
from routers.recommendation import recommendation_router
from routers.bakeryrouter import bakeryrouter
from routers.chat_router import chat_router
from routers.course_router import course_router
from routers.recommend_spot_router import recommend_router

app = FastAPI(docs_url="/fast_api/docs",
              openapi_url="/fast_api/openapi.json")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 모든 출처 허용
    allow_credentials=True,
    allow_methods=["*"],  # 모든 HTTP 메서드 허용
    allow_headers=["*"],  # 모든 헤더 허용
)

# 라우터 연결
app.include_router(recommendation_router, prefix="/fast_api")
app.include_router(bakeryrouter, prefix='/fast_api')
app.include_router(chat_router, prefix='/fast_api')
app.include_router(course_router, prefix='/fast_api')
app.include_router(recommend_router, prefix='/fast_api')

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