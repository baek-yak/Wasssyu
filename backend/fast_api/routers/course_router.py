from fastapi import APIRouter, HTTPException
import psycopg2
import pandas as pd

# PostgreSQL DB 설정
DB_CONFIG = {
    "user": "daebbang",
    "password": "apvmf0462",
    "dbname": "postgres",
    "host": "k11b105.p.ssafy.io",
    "port": 5444,
}

# 라우터 생성
course_router = APIRouter()

# 데이터베이스 연결 함수
def fetch_data(query, params=None):
    """데이터베이스에서 데이터를 조회하는 함수"""
    try:
        conn = psycopg2.connect(**DB_CONFIG)
        data = pd.read_sql_query(query, conn, params=params)
        conn.close()
        return data
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {e}")

# 코스 목록 조회
@course_router.get("/courses")
def get_courses():
    """모든 코스 목록을 반환"""
    query = """
        SELECT id, course_name, description, image_url
        FROM tour_course
    """
    data = fetch_data(query)

    if data.empty:
        raise HTTPException(status_code=404, detail="No courses found")

    return data.to_dict(orient="records")

# 특정 코스의 상세 정보 조회
@course_router.get("/courses/{course_id}")
def get_course_details(course_id: int):
    """특정 코스의 상세 정보를 반환"""
    # 코스 정보 가져오기
    course_query = """
        SELECT id, course_name, description, image_url
        FROM tour_course
        WHERE id = %s
    """
    course_data = fetch_data(course_query, params=[course_id])

    if course_data.empty:
        raise HTTPException(status_code=404, detail=f"Course with ID {course_id} not found")

    # 코스에 포함된 빵집 정보 가져오기
    details_query = """
        SELECT 
            tse.spot_name AS bakery_name, 
            tse.spot_address AS address, 
            tse.rating, 
            tse.phone, 
            tse.business_hours, 
            tse.spot_description AS description,
            tsie.tourist_spot_image_url AS image_url
        FROM bread_tour_course_details AS btcd
        JOIN tourist_spot_entity AS tse
        ON btcd.bakery_id = tse.id
        LEFT JOIN tourist_spot_image_entity AS tsie
        ON tse.id = tsie.tourist_spot_entity_id
        WHERE btcd.course_id = %s
    """
    details_data = fetch_data(details_query, params=[course_id])

    if details_data.empty:
        raise HTTPException(status_code=404, detail=f"No bakeries found for course ID {course_id}")

    # 코스 정보와 빵집 정보 결합
    response = {
        "course": course_data.to_dict(orient="records")[0],
        "bakeries": details_data.to_dict(orient="records")
    }

    return response