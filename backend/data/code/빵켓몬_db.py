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

# Breadmon 이미지 URL 리스트
BREADMON_IMAGES = [
    "단팥몬.png",
    "소보로몬.png",
    "바게트몬.png"
]

def insert_breadmon_entities():
    try:
        # DB 연결
        conn = psycopg2.connect(**DB_CONFIG)
        cursor = conn.cursor()

        # 빵집에 해당하는 tourist_spot_entity.id 조회
        query = """
        SELECT tse.id, tse.spot_name
        FROM tourist_spot_entity tse
        JOIN tourist_spot_tag_entity tste
        ON tse.id = tste.tourist_spot_entity_id
        WHERE tste.tag = '빵집';
        """
        cursor.execute(query)
        rows = cursor.fetchall()

        if not rows:
            print("빵집 태그가 포함된 tourist_spot_entity가 없습니다.")
            return

        # Breadmon 엔터티에 데이터 삽입
        for row in rows:
            spot_id, spot_name = row
            mon_image_url = random.choice(BREADMON_IMAGES)

            insert_query = """
            INSERT INTO breadmon_entity (bakery_temp_id, mon_image_url)
            VALUES (%s, %s);
            """
            cursor.execute(insert_query, (spot_id, mon_image_url))
            print(f"spot_name: {spot_name}, image: {mon_image_url} 삽입 완료")

        # 변경 사항 커밋
        conn.commit()
        print("모든 Breadmon 엔터티가 삽입되었습니다.")

    except Exception as e:
        print(f"오류 발생: {e}")
    finally:
        # DB 연결 종료
        if cursor:
            cursor.close()
        if conn:
            conn.close()

# 실행
if __name__ == "__main__":
    insert_breadmon_entities()