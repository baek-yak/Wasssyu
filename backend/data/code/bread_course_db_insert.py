import psycopg2

# PostgreSQL DB 설정
DB_CONFIG = {
    "user": "daebbang",
    "password": "apvmf0462",
    "dbname": "postgres",
    "host": "k11b105.p.ssafy.io",
    "port": 5444,
}

# 삽입할 데이터
tour_course_data = {
    "course_name": "대전 쇼핑 코스",
    "description": "대전의 쇼핑코스를 즐겨보세요!",
    "image_url": "https://example.com/bread_tour.png",
    "stores": [
        "성심당 본점", "몽심 대흥점", "하레하레 둔산점", "르뺑99-1", "꾸드뱅", "연선흠과자점"
    ]
}

# 데이터 삽입 함수
def insert_tour_course_with_bakeries():
    try:
        conn = psycopg2.connect(**DB_CONFIG)
        cur = conn.cursor()

        # `tour_course` 테이블에 코스 데이터 삽입
        cur.execute("""
            INSERT INTO shoping_course (course_name, description, image_url)
            VALUES (%s, %s, %s)
            RETURNING id;
        """, (tour_course_data["course_name"], tour_course_data["description"], tour_course_data["image_url"]))
        course_id = cur.fetchone()[0]

        # 각 빵집 데이터를 `bread_tour_course_details`에 삽입
        for bakery_name in tour_course_data["bakeries"]:
            # `tourist_spot_entity` 테이블에서 빵집 ID 조회
            cur.execute("""
                SELECT id FROM tourist_spot_entity WHERE spot_name = %s;
            """, (bakery_name,))
            bakery_id = cur.fetchone()

            if bakery_id:
                cur.execute("""
                    INSERT INTO bread_tour_course_details (course_id, bakery_id)
                    VALUES (%s, %s);
                """, (course_id, bakery_id[0]))
            else:
                print(f"Bakery not found in `tourist_spot_entity`: {bakery_name}")

        conn.commit()
        print(f"Tour course '{tour_course_data['course_name']}' and related bakeries successfully inserted.")
    except Exception as e:
        print(f"Error inserting data: {e}")
    finally:
        conn.close()

# 실행
if __name__ == "__main__":
    insert_tour_course_with_bakeries()