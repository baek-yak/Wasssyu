from fastapi import APIRouter, HTTPException, Depends
import psycopg2
import psycopg2.extras
from dependencies.dependencies import get_current_user  # JWT 인증 의존성
import os
from dotenv import load_dotenv

load_dotenv()

DB_CONFIG = {
    "user": os.environ.get("POSTGRES_USER"),
    "password": os.environ.get("POSTGRES_PASSWORD"),
    "dbname": os.environ.get("POSTGRES_DB"),
    "host": os.environ.get("POSTGRES_HOST"),
    "port": os.environ.get("POSTGRES_PORT"),
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
    
def execute_query(query, params=None):
    """데이터베이스에서 데이터를 삽입/갱신하는 함수"""
    try:
        conn = psycopg2.connect(**DB_CONFIG)
        cursor = conn.cursor()
        cursor.execute(query, params)
        conn.commit()
        conn.close()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {e}")

# 장소 방문 처리
@course_router.post("/courses/{course_id}/spots/{spot_id}/visit")
def visit_spot(course_id: int, spot_id: int, current_user: dict = Depends(get_current_user)):
    """
    특정 장소를 방문 처리하고, 코스의 모든 장소가 완료되었는지 반환
    """
    user_id = current_user["id"]  # JWT에서 추출된 사용자 ID

    # 장소 방문 기록 추가
    visit_query = """
        INSERT INTO user_visit_records (user_id, spot_id)
        VALUES (%s, %s)
        ON CONFLICT DO NOTHING
    """
    execute_query(visit_query, params=[user_id, spot_id])

    # 코스 내 모든 장소 가져오기
    spots_query = """
        SELECT tse.id AS spot_id
        FROM tour_course_details_entity AS tcde
        JOIN tourist_spot_entity AS tse
        ON tcde.bakery_id = tse.id
        WHERE tcde.course_id = %s
    """
    all_spots = fetch_data(spots_query, params=[course_id])
    all_spot_ids = {row["spot_id"] for row in all_spots}

    # 사용자가 방문한 장소 가져오기
    visits_query = """
        SELECT spot_id
        FROM user_visit_records
        WHERE user_id = %s AND spot_id = ANY(%s)
    """
    visited_spots = fetch_data(visits_query, params=[user_id, list(all_spot_ids)])
    visited_spot_ids = {row["spot_id"] for row in visited_spots}

    # 코스 완료 여부 확인
    is_completed = all_spot_ids == visited_spot_ids

    return {
        "course_id": course_id,
        "completed": is_completed,
        "total_spots": len(all_spot_ids),
        "visited_spots": len(visited_spot_ids),
        "remaining_spots": len(all_spot_ids - visited_spot_ids)
    }

# 코스 상세 조회
@course_router.get("/courses/{course_id}")
def get_course_details(course_id: int, current_user: dict = Depends(get_current_user)):
    """
    특정 코스의 상세 정보를 반환하며 사용자가 관광지를 방문했는지 여부를 포함
    """
    user_id = current_user["id"]  # JWT에서 추출된 사용자 ID

    # 코스 정보 가져오기
    course_query = """
        SELECT id, course_name, description, image_url
        FROM tour_course
        WHERE id = %s
    """
    course_data = fetch_data(course_query, params=[course_id])

    if not course_data:
        raise HTTPException(status_code=404, detail=f"Course with ID {course_id} not found")

    # 코스에 포함된 빵집 정보 가져오기 (중복 제거)
    details_query = """
        SELECT DISTINCT ON (tse.spot_name)
            tse.id AS spot_id,
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
        ORDER BY tse.spot_name, tsie.tourist_spot_image_url
    """
    details_data = fetch_data(details_query, params=[course_id])

    if not details_data:
        raise HTTPException(status_code=404, detail=f"No spots found for course ID {course_id}")

    # 사용자 방문 기록 가져오기
    visits_query = """
        SELECT spot_id
        FROM user_visit_records
        WHERE user_id = %s
    """
    visited_spots = fetch_data(visits_query, params=[user_id])
    visited_spot_ids = {row["spot_id"] for row in visited_spots}

    # 관광지 정보에 방문 여부 추가
    bakeries = []
    for row in details_data:
        bakery = dict(row)
        bakery["completed"] = bakery["spot_id"] in visited_spot_ids
        bakeries.append(bakery)

    # 코스 완료 여부 확인
    all_spot_ids = {row["spot_id"] for row in details_data}
    is_completed = all_spot_ids == visited_spot_ids

    # 코스 정보와 빵집 정보 결합
    response = {
        "course": dict(course_data[0]),
        "bakeries": bakeries,
        "completed": is_completed
    }

    return response