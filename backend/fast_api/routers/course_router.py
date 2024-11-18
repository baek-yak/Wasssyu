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

# 코스 상세 조회
@course_router.get("/courses/{course_id}")
def get_course_details(course_id: int, current_user: str = Depends(get_current_user)):
    """
    특정 코스의 상세 정보를 반환하며, 사용자가 관광지를 방문했는지 여부, 진행 상태, 그리고 해시태그를 포함
    """
    try:
        user_id = get_user_id(current_user)  # `current_user`는 이메일

        # 코스 정보 가져오기
        course_query = """
            SELECT id, course_name, description, image_url
            FROM tour_course
            WHERE id = %s
        """
        course_data = fetch_data(course_query, params=[course_id])

        if not course_data:
            raise HTTPException(status_code=404, detail=f"Course with ID {course_id} not found")
        
        # 코스 해시태그 가져오기
        course_hashtag_query = """
            SELECT hashtag
            FROM course_hashtag
            WHERE course_id = %s
        """
        course_hashtags_data = fetch_data(course_hashtag_query, params=[course_id])
        course_hashtags = [row["hashtag"] for row in course_hashtags_data]


        # 코스에 포함된 장소 정보 가져오기 (Breadmon 이미지 포함)
        details_query = """
            SELECT DISTINCT ON (tse.spot_name)
                tse.id AS spot_id,
                tse.spot_name AS bakery_name, 
                tse.spot_address AS address, 
                tse.rating, 
                tse.phone, 
                tse.business_hours, 
                tse.elastic_id,
                tse.latitude,
                tse.longitude,
                tse.spot_description AS description,
                tsie.tourist_spot_image_url AS spot_image_url,
                wme.image AS wassumon_image_url,
                wme.name AS wassumon_name,
                wme.model AS wassumon_model,
                wme.authentication_url AS authentication_url
            FROM tour_course_details_entity AS tcde
            JOIN tourist_spot_entity AS tse
            ON tcde.bakery_id = tse.id
            LEFT JOIN tourist_spot_image_entity AS tsie
            ON tse.id = tsie.tourist_spot_entity_id
            LEFT JOIN wassu_mon_entity AS wme
            ON tse.id = wme.spot_id
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

        # 관광지 정보에 방문 여부와 해시태그 추가
        course_details = []
        for row in details_data:
            detail = dict(row)
            detail["completed"] = detail["spot_id"] in visited_spot_ids

            # 해시태그 가져오기
            hashtags_query = """
                SELECT hashtag
                FROM spot_hashtag
                WHERE spot_id = %s
            """
            hashtags_data = fetch_data(hashtags_query, params=[detail["spot_id"]])
            detail["hashtags"] = [tag["hashtag"] for tag in hashtags_data]

            course_details.append(detail)

        # 코스 상태 가져오기
        progress_query = """
            SELECT progress
            FROM user_course_progress
            WHERE user_id = %s AND tour_course_id = %s
        """
        progress_data = fetch_data(progress_query, params=[user_id, course_id])
        if not progress_data:
            progress_status = "yet"  # 시작하지 않은 상태
        else:
            progress_status = progress_data[0]["progress"]

        # 응답 생성
        response = {
            "course": {
                **dict(course_data[0]),
                "hashtags" : course_hashtags
                },
            "course_details": course_details,
            "completed_all": progress_status
        }

        return response

    except Exception as e:
        print(f"ERROR: {e}")
        logger.error(f"Error in Get course details: {e}")
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
    
    
# 사용자 챌린지 상태 조회 (진행 중 + 완료된 코스)
@course_router.get("/user/challenges")
def get_user_challenges(current_user: str = Depends(get_current_user)):
    """
    진행 중인 챌린지와 완료된 챌린지를 조회
    """
    try:
        user_id = get_user_id(current_user)  # `current_user`는 이메일

        # 진행 중 및 완료된 코스 정보 가져오기
        challenges_query = """
            SELECT tc.id AS course_id, tc.course_name, tc.description, tc.image_url, ucp.progress
            FROM user_course_progress AS ucp
            JOIN tour_course AS tc
            ON ucp.tour_course_id = tc.id
            WHERE ucp.user_id = %s
        """
        challenges_data = fetch_data(challenges_query, params=[user_id])

        if not challenges_data:
            return {"message": "No challenges found"}

        # 진행 중 및 완료된 코스 구분
        in_progress_courses = []
        completed_courses = []

        for course in challenges_data:
            course_id = course["course_id"]

            # 해당 코스의 장소 정보 가져오기
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

            # 사용자 방문 기록 가져오기
            visits_query = """
                SELECT spot_id
                FROM user_visit_records
                WHERE user_id = %s
            """
            visited_spots = fetch_data(visits_query, params=[user_id])
            visited_spot_ids = {row["spot_id"] for row in visited_spots}

            # 장소별 방문 여부 추가
            course_details = []
            for row in details_data:
                detail = dict(row)
                detail["completed"] = detail["spot_id"] in visited_spot_ids
                course_details.append(detail)

            # 코스 데이터 구성
            course_data = {
                "course": {
                    "id": course["course_id"],
                    "course_name": course["course_name"],
                    "description": course["description"],
                    "image_url": course["image_url"]
                },
                "course_details": course_details
            }

            # 진행 중 또는 완료된 상태에 따라 분류
            if course["progress"] == "start":
                in_progress_courses.append(course_data)
            elif course["progress"] == "complete":
                completed_courses.append(course_data)

        return {
            "in_progress": in_progress_courses,
            "completed": completed_courses
        }

    except Exception as e:
        print(f"ERROR: {e}")
        logger.error(f"Error in Get user challenges: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")
    
    
@course_router.get("/user/wassumon")
def get_collected_breadmons(current_user: str = Depends(get_current_user)):
    """
    사용자가 채집한 와쑤몬 목록을 반환 (이미지 URL과 이름만)
    """
    try:
        user_id = get_user_id(current_user)  # `current_user`는 이메일

        # 사용자 채집한 와쑤몬 조회 (이미지와 이름만 반환)
        collected_wassumon_query = """
            SELECT 
                wme.spot_id AS spot_id,
                wme.name AS wassumon_name,
                wme.image AS wassumon_image
            FROM user_visit_records AS uvr
            JOIN wassu_mon_entity AS wme
            ON uvr.spot_id = wme.spot_id
            WHERE uvr.user_id = %s
        """
        collected_wassumon = fetch_data(collected_wassumon_query, params=[user_id])

        if not collected_wassumon:
            return {"message": "No wassumons collected"}

        # 와쑤몬 리스트 생성
        wassumons = [
            {
                "spot_id": row["spot_id"],
                "wassumon_name": row["wassumon_name"],
                "wassumon_image": row["wassumon_image"]
            }
            for row in collected_wassumon
        ]

        return {"collected_wassumons": wassumons}

    except Exception as e:
        print(f"ERROR: {e}")
        logger.error(f"Error in Get collected wassumons: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")


@course_router.get("/wassumons/{spot_id}")
def get_wassumon_details(spot_id: int, current_user: str = Depends(get_current_user)):
    """
    특정 와쑤몬의 상세 정보를 반환
    """
    try:
        # 특정 와쑤몬 상세 정보 조회
        wassumon_detail_query = """
            SELECT 
                wme.spot_id AS spot_id,
                wme.name AS wassumon_name,
                wme.image AS wassumon_image,
                wme.type AS wassumon_type,
                wme.weight AS wassumon_weight,
                wme.height AS wassumon_height,
                wme.description AS wassumon_description,
                tse.spot_name AS spot_name
            FROM wassu_mon_entity AS wme
            JOIN tourist_spot_entity AS tse
            ON wme.spot_id = tse.id
            WHERE wme.spot_id = %s
        """
        wassumon_data = fetch_data(wassumon_detail_query, params=[spot_id])

        if not wassumon_data:
            raise HTTPException(status_code=404, detail=f"Wassumon with spot_id {spot_id} not found")

        # 상세 정보 반환
        wassumon = dict(wassumon_data[0])
        return {"wassumon_details": wassumon}

    except Exception as e:
        print(f"ERROR: {e}")
        logger.error(f"Error in Get wassumon details: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")