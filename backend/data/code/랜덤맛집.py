import psycopg2
import random
import pandas as pd
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

def fetch_food_related_spots():
    """
    '음식' 태그가 포함된 tourist_spot_entity에서 spot_name을 랜덤으로 28개 선택
    """
    query = """
        SELECT tse.spot_name
        FROM tourist_spot_entity AS tse
        JOIN tourist_spot_tag_entity AS tste
        ON tse.id = tste.tourist_spot_entity_id
        WHERE tste.tag = '빵집';
    """

    try:
        # 데이터베이스 연결
        conn = psycopg2.connect(**DB_CONFIG)
        cursor = conn.cursor()

        # 쿼리 실행
        cursor.execute(query)
        results = cursor.fetchall()

        # 데이터프레임으로 변환
        spot_names = [row[0] for row in results]

        # 랜덤으로 28개 선택
        selected_spots = random.sample(spot_names, min(28, len(spot_names)))

        # 출력
        print("Randomly Selected Spots:")
        for spot in selected_spots:
            print(spot)

        # 데이터 반환
        return selected_spots

    except Exception as e:
        print(f"Error: {e}")
    finally:
        # 연결 종료
        if conn:
            conn.close()

# 실행
if __name__ == "__main__":
    selected_spots = fetch_food_related_spots()
