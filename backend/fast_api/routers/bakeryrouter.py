from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import psycopg2
import random

# PostgreSQL 설정
DB_CONFIG = {
    "user": "daebbang",
    "password": "apvmf0462",
    "dbname": "postgres",
    "host": "k11b105.p.ssafy.io",
    "port": 5444,
}

# 라우터 생성
bakeryrouter = APIRouter()

# 빵집 정보를 담을 Pydantic 모델
class Bakery(BaseModel):
    name: str
    category: str
    address: str
    rating: float
    review_count: int
    phone: str
    business_hours: str
    latitude: float
    longitude: float

# 데이터베이스 연결 함수
def connect_to_db():
    try:
        conn = psycopg2.connect(**DB_CONFIG)
        print("Connected to the database successfully.")
        return conn
    except Exception as e:
        print(f"Error connecting to the database: {e}")
        return None

# 빵집 정보를 랜덤으로 8개 가져오는 API
@bakeryrouter.get("/random_bakeries", response_model=list[Bakery])
def get_random_bakeries():
    conn = connect_to_db()
    if not conn:
        raise HTTPException(status_code=500, detail="Failed to connect to the database.")

    try:
        with conn.cursor() as cursor:
            # 빵집 정보 개수 확인
            cursor.execute("SELECT COUNT(*) FROM bakeries;")
            total_count = cursor.fetchone()[0]

            if total_count < 8:
                raise HTTPException(status_code=400, detail="Not enough bakeries in the database.")

            # 랜덤 ID 가져오기
            cursor.execute("SELECT id FROM bakeries;")
            ids = [row[0] for row in cursor.fetchall()]
            random_ids = random.sample(ids, 8)

            # 랜덤으로 선택된 빵집 정보 가져오기
            cursor.execute(
                """
                SELECT name, category, address, rating, review_count, phone, business_hours, latitude, longitude
                FROM bakeries
                WHERE id IN %s;
                """,
                (tuple(random_ids),),
            )
            rows = cursor.fetchall()

            # 데이터를 Bakery 객체로 변환
            bakeries = [
                Bakery(
                    name=row[0],
                    category=row[1],
                    address=row[2],
                    rating=row[3],
                    review_count=row[4],
                    phone=row[5],
                    business_hours=row[6],
                    latitude=row[7],
                    longitude=row[8],
                )
                for row in rows
            ]

            return bakeries

    except Exception as e:
        print(f"Error querying database: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch bakeries.")

    finally:
        conn.close()
        print("Database connection closed.")