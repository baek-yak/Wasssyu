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
    try:
        conn = psycopg2.connect(**DB_CONFIG)
        placeholders = ', '.join(['%s'] * len(names))
        query = f"""
            SELECT 
                b.name, 
                b.address, 
                b.rating, 
                b.review_count, 
                b.phone, 
                b.business_hours, 
                b.description, 
                be.image_url
            FROM bakeries AS b
            LEFT JOIN breadmon_entity AS be
            ON b.temp_id = be.bakery_temp_id
            WHERE b.name IN ({placeholders})
        """
        data = pd.read_sql_query(query, conn, params=names)
        conn.close()
        return data
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {e}")

# 엔드포인트 정의
@bakeries_router.get("/bakeries/info")
def get_bakeries_info():
    """지정된 빵집들의 정보를 반환"""
    bakery_names = ["성심당 본점", "몽심 대흥점", "하레하레 둔산점", "르뺑99-1", "꾸드뱅", "연선흠과자점"]
    data = fetch_bakeries_info_with_images(bakery_names)

    if data.empty:
        raise HTTPException(status_code=404, detail="No data found for the given bakeries")

    # 데이터를 딕셔너리로 변환 후 반환
    return data.to_dict(orient="records")
