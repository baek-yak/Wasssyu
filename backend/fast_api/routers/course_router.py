from fastapi import APIRouter, HTTPException
import psycopg2
import psycopg2.extras

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
        cursor = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)
        cursor.execute(query, params)
        records = cursor.fetchall()
        conn.close()
        return records
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

    if not data:
        raise HTTPException(status_code=404, detail="No courses found")

    # 데이터를 Dict 형태로 변환
    courses = [dict(row) for row in data]
    return courses

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

    if not course_data:
        raise HTTPException(status_code=404, detail=f"Course with ID {course_id} not found")

    # 코스에 포함된 빵집 정보 가져오기
    details_query = """
        SELECT 
            tse.spot_name AS bakery_name, 
            tse.spot_address AS address, 
            tse.rating, 
            tse.phone, 
            tse.business_hours, 
            tse.elastic_id,
            tse.spot_description AS description,
            tsie.tourist_spot_image_url AS image_url
        FROM tour_course_details_entity AS tcde
        JOIN tourist_spot_entity AS tse
        ON tcde.bakery_id = tse.id
        LEFT JOIN tourist_spot_image_entity AS tsie
        ON tse.id = tsie.tourist_spot_entity_id
        WHERE tcde.course_id = %s
    """
    details_data = fetch_data(details_query, params=[course_id])

    if not details_data:
        raise HTTPException(status_code=404, detail=f"No spots found for course ID {course_id}")

    # 코스 정보와 빵집 정보 결합
    response = {
        "course": dict(course_data[0]),
        "bakeries": [dict(row) for row in details_data]
    }

    return response