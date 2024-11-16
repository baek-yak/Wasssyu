from fastapi import APIRouter, HTTPException, Depends
import psycopg2
import psycopg2.extras
from jwt_handler import logger
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

def get_user_id(email: str):
    """
    이메일을 기반으로 사용자 ID를 가져옵니다.
    """
    query = """
        SELECT id
        FROM user_entity
        WHERE email = %s
    """
    result = fetch_data(query, params=[email])
    if not result:
        raise HTTPException(status_code=404, detail="User not found")
    
    return result[0]["id"]

# 코스 시작하기
@course_router.post("/courses/{course_id}/start")
def start_course(course_id: int, current_user: str = Depends(get_current_user)):
    """
    코스를 시작하여 진행 상태를 "start"로 설정
    """
    user_id = get_user_id(current_user)  # `current_user`는 이메일

    # user_course_progress 테이블에 "start" 상태 추가
    start_query = """
        INSERT INTO user_course_progress (user_id, tour_course_id, progress)
        VALUES (%s, %s, 'start')
        ON CONFLICT (user_id, tour_course_id) 
        DO UPDATE SET progress = 'start'
    """
    execute_query(start_query, params=[user_id, course_id])

    return {"message": f"Course {course_id} started for user {user_id}"}


# 코스 목록 조회
@course_router.get("/courses")
def get_courses(current_user: str = Depends(get_current_user)):
    """
    모든 코스 목록을 반환하며, 각 코스의 완료 상태를 포함
    """
    try:
        # 이메일을 기반으로 사용자 ID 가져오기
        user_id = get_user_id(current_user)

        # 모든 코스 정보 가져오기
        query = """
            SELECT id, course_name, description, image_url
            FROM tour_course
        """
        courses_data = fetch_data(query)

        if not courses_data:
            raise HTTPException(status_code=404, detail="No courses found")

        # 모든 코스의 완료 상태 계산
        completed_courses = []
        for course in courses_data:
            course_id = course["id"]

            # 코스 내 모든 장소 ID 가져오기
            spots_query = """
                SELECT tse.id AS spot_id
                FROM tour_course_details_entity AS tcde
                JOIN tourist_spot_entity AS tse
                ON tcde.bakery_id = tse.id
                WHERE tcde.course_id = %s
            """
            all_spots = fetch_data(spots_query, params=[course_id])
            all_spot_ids = {row["spot_id"] for row in all_spots}

            # 사용자가 방문한 장소 ID 가져오기
            visits_query = """
                SELECT spot_id
                FROM user_visit_records
                WHERE user_id = %s AND spot_id = ANY(%s)
            """
            visited_spots = fetch_data(visits_query, params=[user_id, list(all_spot_ids)])
            visited_spot_ids = {row["spot_id"] for row in visited_spots}

            # 코스 완료 여부 확인
            is_completed = all_spot_ids == visited_spot_ids

            # 코스 정보에 completed 상태 추가
            completed_courses.append({
                "id": course["id"],
                "course_name": course["course_name"],
                "description": course["description"],
                "image_url": course["image_url"],
                "completed_all": is_completed
            })

        return completed_courses

    except Exception as e:
        print(f"ERROR: {e}")
        logger.error(f"Error in Get courses: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

# 장소 방문 처리
@course_router.post("/courses/{course_id}/spots/{spot_id}/visit")
def visit_spot(course_id: int, spot_id: int, current_user: str = Depends(get_current_user)):
    """
    특정 장소를 방문 처리하고, 코스의 모든 장소가 완료되었는지 확인 후 상태 업데이트
    """
    user_id = get_user_id(current_user)  # `current_user`는 이메일

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

    # 진행 상태 업데이트
    progress_status = "complete" if is_completed else "start"
    progress_query = """
        INSERT INTO user_course_progress (user_id, tour_course_id, progress)
        VALUES (%s, %s, %s)
        ON CONFLICT (user_id, tour_course_id)
        DO UPDATE SET progress = EXCLUDED.progress
    """
    execute_query(progress_query, params=[user_id, course_id, progress_status])

    return {
        "course_id": course_id,
        "completed": is_completed,
        "progress": progress_status,
        "total_spots": len(all_spot_ids),
        "visited_spots": len(visited_spot_ids),
        "remaining_spots": len(all_spot_ids - visited_spot_ids)
    }