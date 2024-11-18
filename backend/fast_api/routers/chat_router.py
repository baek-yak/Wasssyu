from fastapi import APIRouter, HTTPException
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
from openai import OpenAI
from dotenv import load_dotenv
import os
import psycopg2
import json

load_dotenv()

# 환경 변수 로드
POSTGRES_USER = os.getenv("POSTGRES_USER")
POSTGRES_PASSWORD = os.getenv("POSTGRES_PASSWORD")
POSTGRES_DB = os.getenv("POSTGRES_DB")
POSTGRES_PORT = os.getenv("POSTGRES_PORT")
POSTGRES_HOST = os.getenv("POSTGRES_HOST")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

# OpenAI API 설정
client = OpenAI(api_key=OPENAI_API_KEY)

# 라우터 생성
chat_router = APIRouter()

# PostgreSQL에서 데이터 로드
def load_all_data():
    """tourist_spot_entity 테이블에서 데이터 로드"""
    query = """
    SELECT 
        spot_name AS name,
        spot_address AS address,
        spot_description AS description,
        phone,
        business_hours,
        favorites_count,
        rating,
        embedding
    FROM tourist_spot_entity;
    """
    try:
        connection = psycopg2.connect(
            user=POSTGRES_USER,
            password=POSTGRES_PASSWORD,
            dbname=POSTGRES_DB,
            host=POSTGRES_HOST,
            port=POSTGRES_PORT,
        )
        data = pd.read_sql_query(query, connection)
        connection.close()

        # `embedding` 컬럼이 vector 타입으로 저장된 경우 변환
        data['embedding'] = data['embedding'].apply(
            lambda x: np.array(x, dtype=np.float32) if x is not None else None
        )

        # 누락된 `embedding` 제거
        data = data.dropna(subset=["embedding"])
        return data
    except Exception as e:
        print(f"Error loading data: {e}")
        return pd.DataFrame()

# 사용자 입력 임베딩 생성
def generate_user_embedding(user_input):
    """사용자 입력을 임베딩으로 변환"""
    try:
        response = client.embeddings.create(
            input=user_input,
            model="text-embedding-ada-002"
        )
        return np.array(response.data[0].embedding)
    except Exception as e:
        print(f"Error generating embedding for user input: {e}")
        return None

# 코스 추천 처리
def handle_course_recommendation(user_input, data, filters=None):
    """코스 추천 처리 함수"""
    user_embedding = generate_user_embedding(user_input)
    if user_embedding is None:
        return "사용자 입력 임베딩 생성에 실패했습니다."

    # 코사인 유사도 계산
    embeddings = np.stack(data['embedding'].to_numpy())
    similarities = cosine_similarity([user_embedding], embeddings)[0]
    data['similarity'] = similarities

    if filters:
        if 'min_rating' in filters:
            data = data[data['rating'] >= filters['min_rating']]
        if 'min_favorites' in filters:
            data = data[data['favorites_count'] >= filters['min_favorites']]

    # 유사도 기준으로 정렬 후 상위 5개 선택
    recommended = data.sort_values(by='similarity', ascending=False).head(5)
    return recommended[['name', 'address', 'rating', 'favorites_count', 'phone', 'business_hours']]

# 사용자 입력 처리
def process_user_input(user_input, data):
    """사용자 입력을 처리하고 PostgreSQL 데이터를 활용"""
    if data.empty:
        return "테이블 데이터를 로드하는 데 실패했습니다."

    action = classify_input(user_input)
    result = ""

    if action == "코스 추천":
        filters = {}
        if "평점 높은" in user_input:
            filters['min_rating'] = 4.0
        if "즐겨찾기 많은" in user_input:
            filters['min_favorites'] = 100
        result = handle_course_recommendation(user_input, data, filters)
        response = result.to_string(index=False)
    elif action == "정보 요청":
        result = handle_info_request(user_input, data)
        response = result
    else:
        response = "입력을 이해하지 못했습니다. 다시 시도해주세요."

    return response

# 정보 요청 처리
def handle_info_request(user_input, data):
    """정보 요청 처리"""
    for idx, row in data.iterrows():
        if row['name'] in user_input:
            if "주소" in user_input:
                return f"{row['name']}의 주소는 {row['address']}입니다."
            elif "평점" in user_input:
                return f"{row['name']}의 평점은 {row['rating']}입니다."
            elif "즐겨찾기" in user_input:
                return f"{row['name']}의 즐겨찾기 수는 {row['favorites_count']}개입니다."
            elif "전화" in user_input:
                return f"{row['name']}의 전화번호는 {row['phone']}입니다."
            
    return "해당 정보를 찾을 수 없습니다."

# 사용자 입력 분류
def classify_input(user_input):
    """사용자의 입력을 '정보 요청' 또는 '코스 추천'으로 분류"""
    keywords_info = ["주소", "전화번호", "평점", "즐겨찾기"]
    keywords_recommend = ["추천", "코스", "여행지", "가볼 만한 곳", "명소"]

    if any(keyword in user_input for keyword in keywords_info):
        return "정보 요청"
    elif any(keyword in user_input for keyword in keywords_recommend):
        return "코스 추천"
    else:
        return "알 수 없음"

# FastAPI 라우터 엔드포인트 정의
@chat_router.post("/chat")
async def chat_with_bot(user_input: str):
    """사용자의 입력에 응답"""
    data = load_all_data()
    if data.empty:
        raise HTTPException(status_code=500, detail="데이터 로드 실패")
    response = process_user_input(user_input, data)
    return {"response": response}