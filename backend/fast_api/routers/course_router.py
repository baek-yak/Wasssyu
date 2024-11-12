from fastapi import APIRouter, HTTPException
import psycopg2
import pandas as pd
from typing import List

# PostgreSQL DB 설정
DB_CONFIG = {
    "user": "daebbang",
    "password": "apvmf0462",
    "dbname": "postgres",
    "host": "k11b105.p.ssafy.io",
    "port": 5444,
}

# 라우터 생성
bakeries_router = APIRouter()

# PostgreSQL에서 데이터 로드 함수
def fetch_bakeries_info_with_images(names: List[str]):
    """
    tourist_spot_entity, breadmon_entity, tourist_spot_image_entity 테이블을 기반으로
    빵집 정보를 조회하며 연결된 모든 이미지를 반환
    """
    try:
        conn = psycopg2.connect(**DB_CONFIG)
        placeholders = ', '.join(['%s'] * len(names))
        query = f"""
            SELECT 
                tse.spot_name AS name, 
                tse.spot_address AS address, 
                tse.rating, 
                tse.favorites_count AS review_count, 
                tse.phone, 
                tse.business_hours, 
                tse.spot_description AS description, 
                ARRAY_AGG(DISTINCT COALESCE(be.mon_image_url, tsie.tourist_spot_image_url)) AS image_urls
            FROM tourist_spot_entity AS tse
            LEFT JOIN breadmon_entity AS be
            ON tse.id = be.bakery_temp_id
            LEFT JOIN tourist_spot_image_entity AS tsie
            ON tse.id = tsie.tourist_spot_entity_id
            WHERE tse.spot_name IN ({placeholders})
            GROUP BY tse.id
        """
        data = pd.read_sql_query(query, conn, params=names)
        conn.close()
        return data
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {e}")

# 엔드포인트 정의
@bakeries_router.get("/bakery_course")
def get_bakeries_info():
    """
    지정된 빵집들의 정보를 반환하며, 여러 개의 이미지 URL을 포함
    """
    bakery_names = ["성심당 본점", "몽심 대흥점", "하레하레 둔산점", "르뺑99-1", "꾸드뱅", "연선흠과자점"]
    data = fetch_bakeries_info_with_images(bakery_names)

    if data.empty:
        raise HTTPException(status_code=404, detail="No data found for the given bakeries")

    # 데이터를 딕셔너리로 변환 후 반환
    return data.to_dict(orient="records")

@bakeries_router.get("/bread_tour")
def get_bread_tour_overview():
    """
    빵지순례 코스 전체 정보 반환
    """
    try:
        # 코스 이름과 간략한 설명, 대표 이미지만 반환
        response = {
            "course_name": "대전 빵지순례 코스",
            "description": "대전의 다양한 빵집을 탐방해보세요!",
            "image_url": "https://example.com/대표이미지.png"  # 대표 이미지 URL
        }
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating course overview: {e}")