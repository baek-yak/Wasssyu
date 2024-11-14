from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import psycopg2
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
from openai import OpenAI

from dotenv import load_dotenv
import os

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

# PostgreSQL DB 설정
DB_CONFIG = {
    "user": POSTGRES_USER,
    "password": POSTGRES_PASSWORD,
    "dbname": POSTGRES_DB,
    "host": POSTGRES_HOST,
    "port": POSTGRES_PORT,
}

# Pydantic 모델 정의
class UserInput(BaseModel):
    user_input: str

# 라우터 생성
recommend_router = APIRouter()

# 데이터베이스 연결 및 데이터 로드
def load_spots_from_db():
    """tourist_spot_entity 및 관련 이미지 데이터를 로드"""
    try:
        conn = psycopg2.connect(**DB_CONFIG)
        query = """
            SELECT 
                tse.id AS spot_id,
                tse.spot_name,
                tse.spot_address,
                tse.spot_description,
                tse.latitude,
                tse.longitude,
                tse.business_hours,
                tse.phone,
                tse.rating,
                tse.embedding,
                tsie.tourist_spot_image_url
            FROM tourist_spot_entity tse
            LEFT JOIN tourist_spot_image_entity tsie
            ON tse.id = tsie.tourist_spot_entity_id
        """
        data = pd.read_sql_query(query, conn)
        conn.close()

        # 문자열로 저장된 벡터를 numpy 배열로 변환
        data["embedding"] = data["embedding"].apply(lambda x: np.array(eval(x)) if isinstance(x, str) else x)
        return data
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {e}")

# 사용자 입력 임베딩 생성
def generate_user_embedding(user_input):
    """OpenAI를 사용하여 사용자 입력을 벡터 임베딩으로 변환"""
    try:
        response = client.embeddings.create(
            input=user_input,
            model="text-embedding-ada-002"
        )
        return np.array(response.data[0].embedding)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"OpenAI API error: {e}")

# 유사도 계산 및 추천
def recommend_places(user_input):
    """사용자 입력과 장소 데이터의 임베딩 유사도를 계산하여 장소 추천"""
    data = load_spots_from_db()
    if data.empty:
        raise HTTPException(status_code=404, detail="No data found in the database")

    # 사용자 입력 임베딩 생성
    user_embedding = generate_user_embedding(user_input)

    # 임베딩 간 코사인 유사도 계산
    embeddings = np.stack(data["embedding"].to_numpy())
    similarities = cosine_similarity([user_embedding], embeddings)[0]

    # 데이터에 유사도 추가
    data["similarity"] = similarities

    # 유사도 상위 5개 장소 선택
    recommended_data = data.sort_values(by="similarity", ascending=False).head(5)

    # 결과를 그룹화하여 반환
    recommendations = []
    for spot_id, group in recommended_data.groupby("spot_id"):
        spot_info = group.iloc[0].to_dict()
        images = group["tourist_spot_image_url"].dropna().tolist()
        spot_info["images"] = images
        recommendations.append(spot_info)

    return recommendations

# 추천 엔드포인트
@recommend_router.post("/recommend")
def get_recommendations(input_data: UserInput):
    """
    사용자의 입력을 기반으로 장소를 추천
    :param input_data: 사용자 입력 텍스트
    :return: 추천 장소 리스트
    """
    try:
        recommendations = recommend_places(input_data.user_input)
        return {"recommendations": recommendations}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
