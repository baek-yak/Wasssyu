from fastapi import FastAPI, HTTPException, Request, Depends
import uvicorn
import os
import jwt
from dotenv import load_dotenv
from fastapi.security import OAuth2PasswordBearer
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from routers.recommendation import recommendation_router
from routers.bakeryrouter import bakeryrouter
from routers.chat_router import chat_router
from routers.course_router import course_router

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")

app = FastAPI(docs_url="/fast_api/docs",
              openapi_url="/fast_api/openapi.json")

app.add_middleware(
    CORSMiddleware,
    allow_origins = ["*"], # 모든 출처 허용
    allow_credentials = True,
    allow_methods = ["*"], # 모든 HTTP 메서드 허용
    allow_headers = ["*"], # 모든 헤더 허용
)
security = HTTPBearer()


# 전역 Dependency: Access Token 확인
def verify_access_token(credentials : HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials # Bearer 토큰 값 가져오기
    if not token:
        raise HTTPException(status_code=401, detail="엑세스 토큰을 입력하세요.(Access token is missing)")
    
    try:
        # JWT 디코딩 및 검증
        payroad = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        
        # 추가 검증 : 사용자 ID 확인
        user_id = payroad.get("sub")
        if not user_id:
            raise HTTPException(status_code=401, detail="유효하지 않은 토큰입니다. 사용자 정보가 없습니다.(Invalid token: Missing 'sub')")
        
        # 검증 통과시 페이로드 반환
        return payroad
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="토큰이 만료되었습니다.(Token has expired)")
    except jwt.InvalidTokenError as e:
        raise HTTPException(status_code=401, detail=f"유효하지 않은 토큰입니다.(Invalid token): {str(e)}")

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
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True, log_level="debug")