from fastapi import APIRouter, HTTPException
import psycopg2
import pandas as pd
from sklearn.preprocessing import MinMaxScaler
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

def load_combined_top_spots(limit=10):
    """
    리뷰 수와 좋아요 수를 Min-Max 스케일링하여 결합 점수로 상위 관광지를 반환.
    :param limit: 상위 n개 반환
    """
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
                COUNT(re.id) AS review_count,
                COUNT(tsf.id) AS like_count,
                array_agg(DISTINCT tsie.tourist_spot_image_url) AS images
            FROM tourist_spot_entity tse
            LEFT JOIN review_entity re ON tse.id = re.tourist_spot_entity_id
            LEFT JOIN tourist_spot_favorites tsf ON tse.id = tsf.tourist_spot_entity_id
            LEFT JOIN tourist_spot_image_entity tsie ON tse.id = tsie.tourist_spot_entity_id
            GROUP BY tse.id
        """
        data = pd.read_sql_query(query, conn)
        conn.close()

        if data.empty:
            raise HTTPException(status_code=404, detail="No data found")

        # 리뷰 수와 좋아요 수에 Min-Max 스케일링 적용
        scaler = MinMaxScaler()
        scores = data[['review_count', 'like_count']]
        scaled_scores = scaler.fit_transform(scores)
        scaled_df = pd.DataFrame(scaled_scores, columns=['scaled_review_count', 'scaled_like_count'])

        # 가중치 점수 계산
        data['weighted_score'] = (0.7 * scaled_df['scaled_review_count'] +
                                  0.3 * scaled_df['scaled_like_count'])

        # 상위 n개 결과 반환
        top_spots = data.sort_values(by='weighted_score', ascending=False).head(limit)
        return top_spots.to_dict(orient="records")

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {e}")

# API 엔드포인트
@top_app.get("/top_spot")
def get_top_combined_spots():
    """
    리뷰 수와 좋아요 수를 결합한 점수를 기준으로 상위 10개의 관광지를 반환
    """
    try:
        spots = load_combined_top_spots(limit=10)
        return {"top_spots": spots}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
