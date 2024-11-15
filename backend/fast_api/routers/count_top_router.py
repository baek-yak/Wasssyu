from fastapi import APIRouter, HTTPException
import psycopg2
import pandas as pd
from dotenv import load_dotenv
import os

# 환경 변수 로드
load_dotenv()

# PostgreSQL DB 설정
POSTGRES_USER = os.getenv("POSTGRES_USER")
POSTGRES_PASSWORD = os.getenv("POSTGRES_PASSWORD")
POSTGRES_DB = os.getenv("POSTGRES_DB")
POSTGRES_PORT = os.getenv("POSTGRES_PORT")
POSTGRES_HOST = os.getenv("POSTGRES_HOST")

DB_CONFIG = {
    "user": POSTGRES_USER,
    "password": POSTGRES_PASSWORD,
    "dbname": POSTGRES_DB,
    "host": POSTGRES_HOST,
    "port": POSTGRES_PORT,
}

# FastAPI 앱 초기화
top_app = APIRouter()

# 데이터베이스 연결 및 데이터 로드
def load_top_spots_by_reviews(limit=10):
    """
    리뷰가 많은 순으로 관광지와 이미지를 반환
    :param limit: 상위 n개 반환
    """
    try:
        conn = psycopg2.connect(**DB_CONFIG)
        query = f"""
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
                COUNT(re.id) AS review_count,
                array_agg(tsie.tourist_spot_image_url) AS images
            FROM tourist_spot_entity tse
            LEFT JOIN review_entity re ON tse.id = re.tourist_spot_entity_id
            LEFT JOIN tourist_spot_image_entity tsie ON tse.id = tsie.tourist_spot_entity_id
            GROUP BY tse.id
            ORDER BY review_count DESC
            LIMIT {limit};
        """
        data = pd.read_sql_query(query, conn)
        conn.close()

        if data.empty:
            raise HTTPException(status_code=404, detail="No data found")
        return data.to_dict(orient="records")

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {e}")


def load_top_spots_by_likes(limit=10):
    """
    좋아요가 많은 순으로 관광지와 이미지를 반환
    :param limit: 상위 n개 반환
    """
    try:
        conn = psycopg2.connect(**DB_CONFIG)
        query = f"""
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
                COUNT(tsf.id) AS like_count,
                array_agg(tsie.tourist_spot_image_url) AS images
            FROM tourist_spot_entity tse
            LEFT JOIN tourist_spot_favorites tsf ON tse.id = tsf.tourist_spot_entity_id
            LEFT JOIN tourist_spot_image_entity tsie ON tse.id = tsie.tourist_spot_entity_id
            GROUP BY tse.id
            ORDER BY like_count DESC
            LIMIT {limit};
        """
        data = pd.read_sql_query(query, conn)
        conn.close()

        if data.empty:
            raise HTTPException(status_code=404, detail="No data found")
        return data.to_dict(orient="records")

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {e}")

# 리뷰 순 API 엔드포인트
@top_app.get("/top_reviews")
def get_top_spots_by_reviews():
    """
    리뷰가 많은 순으로 관광지와 이미지를 반환
    """
    try:
        spots = load_top_spots_by_reviews(limit=10)
        return {"top_spots": spots}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# 좋아요 순 API 엔드포인트
@top_app.get("/top_likes")
def get_top_spots_by_likes():
    """
    좋아요가 많은 순으로 관광지와 이미지를 반환
    """
    try:
        spots = load_top_spots_by_likes(limit=10)
        return {"top_spots": spots}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
