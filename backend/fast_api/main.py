from fastapi import FastAPI, HTTPException, Request, Depends
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer
from routers.recommendation import recommendation_router
from routers.bakeryrouter import bakeryrouter
from routers.chat_router import chat_router
from routers.course_router import course_router

app = FastAPI(docs_url="/fast_api/docs",
              openapi_url="/fast_api/openapi.json")

app.add_middleware(
    CORSMiddleware,
    allow_origins = ["*"], # 모든 출처 허용
    allow_credentials = True,
    allow_methods = ["*"], # 모든 HTTP 메서드 허용
    allow_headers = ["*"], # 모든 헤더 허용
)

# 전역 Dependency: Access Token 확인
def verify_access_token(request: Request):
    access_token = request.headers.get("access_token")
    if not access_token:
        raise HTTPException(status_code=401, detail="Access token is missing")
    # 여기에서 토큰 유효성 검사 로직 추가 (예: JWT 디코딩 및 검증)
    if access_token != "valid_token_example":  # 예시: 실제 검증 로직 추가
        raise HTTPException(status_code=401, detail="Invalid access token")
    return access_token

# 라우터 연결
app.include_router(recommendation_router, prefix="/fast_api", dependencies=[Depends(verify_access_token)])
app.include_router(bakeryrouter, prefix='/fast_api', dependencies=[Depends(verify_access_token)])
app.include_router(chat_router, prefix='/fast_api', dependencies=[Depends(verify_access_token)])
app.include_router(course_router, prefix='/fast_api', dependencies=[Depends(verify_access_token)])


# 기본 엔드포인트
@app.get("/")
def read_root():
    return {"message": "Welcome to the Travel Recommendation API"}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)