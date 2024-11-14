import psycopg2
import random

# PostgreSQL DB 설정
DB_CONFIG = {
    "user": "daebbang",
    "password": "apvmf0462",
    "dbname": "postgres",
    "host": "k11b105.p.ssafy.io",
    "port": 5444,
}

def create_random_course_details(tour_course_id):
    """랜덤 코스와 6개 스팟을 연결"""
    try:
        conn = psycopg2.connect(**DB_CONFIG)
        cur = conn.cursor()

        # tourist_spot_entity에서 무작위로 6개 선택
        cur.execute("SELECT id FROM tourist_spot_entity ORDER BY RANDOM() LIMIT 6")
        spot_ids = cur.fetchall()

        # random_course_details에 삽입
        for spot_id in spot_ids:
            cur.execute(
                """
                INSERT INTO bread_tour_course_details (course_id, bakery_id)
                VALUES (%s, %s)
                """,
                (tour_course_id, spot_id[0])
            )

        conn.commit()
        cur.close()
        conn.close()
        return f"Random course details for tour_course_id={tour_course_id} created successfully with 6 spots."
    except Exception as e:
        return f"Error: {e}"

# 실행 예시
if __name__ == "__main__":
    tour_course_id = 2  # 기존의 랜덤 코스 ID
    print(create_random_course_details(tour_course_id))