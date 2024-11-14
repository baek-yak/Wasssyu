import psycopg2
import pandas as pd
import numpy as np

# PostgreSQL DB 설정
DB_CONFIG = {
    "user": "daebbang",
    "password": "apvmf0462",
    "dbname": "postgres",
    "host": "k11b105.p.ssafy.io",
    "port": 5444,
}

# 테이블 목록
TABLES_TO_CHECK = [
    "science_sites",
    "restaurants",
    "cultural_sites",
    "bakeries",
    "eco_sites",
    "historical_sites",
    "main_sites",
]

# tourist_spot_entity 테이블에 embedding 컬럼 생성
def add_embedding_column():
    try:
        conn = psycopg2.connect(**DB_CONFIG)
        cursor = conn.cursor()

        # embedding 컬럼이 존재하지 않을 경우 추가
        cursor.execute("""
            DO $$ BEGIN
                IF NOT EXISTS (
                    SELECT 1 FROM information_schema.columns
                    WHERE table_name='tourist_spot_entity' AND column_name='embedding'
                ) THEN
                    ALTER TABLE tourist_spot_entity ADD COLUMN embedding TEXT;
                END IF;
            END $$;
        """)
        conn.commit()
        cursor.close()
        conn.close()
        print("Embedding 컬럼이 추가되었습니다.")
    except Exception as e:
        print(f"Error adding embedding column: {e}")

# 각 테이블의 embedding 값을 tourist_spot_entity에 삽입
def update_tourist_spot_entity():
    try:
        conn = psycopg2.connect(**DB_CONFIG)
        cursor = conn.cursor()

        # tourist_spot_entity 데이터를 로드
        cursor.execute("SELECT id, spot_name FROM tourist_spot_entity")
        tourist_spots = cursor.fetchall()

        for spot_id, spot_name in tourist_spots:
            # 각 테이블에서 spot_name과 name이 일치하는 데이터를 검색
            for table in TABLES_TO_CHECK:
                query = f"""
                    SELECT embedding
                    FROM {table}
                    WHERE name = %s
                """
                cursor.execute(query, (spot_name,))
                result = cursor.fetchone()

                if result:
                    embedding_value = result[0]

                    # tourist_spot_entity의 embedding 컬럼 업데이트
                    update_query = """
                        UPDATE tourist_spot_entity
                        SET embedding = %s
                        WHERE id = %s
                    """
                    cursor.execute(update_query, (embedding_value, spot_id))
                    conn.commit()
                    print(f"Updated embedding for {spot_name} in tourist_spot_entity")
                    break  # 일치하는 값을 찾으면 다음 tourist_spot으로 이동

        cursor.close()
        conn.close()
        print("tourist_spot_entity 테이블이 업데이트되었습니다.")
    except Exception as e:
        print(f"Error updating tourist_spot_entity: {e}")

# 메인 실행
if __name__ == "__main__":
    # 1. tourist_spot_entity 테이블에 embedding 컬럼 추가
    add_embedding_column()

    # 2. 각 테이블의 embedding 값을 tourist_spot_entity에 삽입
    update_tourist_spot_entity()