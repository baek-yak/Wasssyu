import psycopg2
import random

# PostgreSQL 연결 설정
DB_CONFIG = {
    "dbname": "postgres",
    "user": "daebbang",
    "password": "apvmf0462",
    "host": "k11b105.p.ssafy.io",
    "port": 5444,
}

# breadmon_entity 테이블 생성 및 데이터 삽입
def setup_breadmon_entity():
    create_table_query = """
    CREATE TABLE IF NOT EXISTS breadmon_entity (
        id SERIAL PRIMARY KEY,                     -- 고유 ID
        bakery_temp_id INT NOT NULL,              -- bakeries 테이블과 관계를 가지는 temp_id
        image_url VARCHAR(255) NOT NULL,          -- 이미지 URL
        CONSTRAINT fk_bakery_temp_id
            FOREIGN KEY (bakery_temp_id)
            REFERENCES bakeries(temp_id)          -- bakeries 테이블의 temp_id와 관계 설정
            ON DELETE CASCADE                     -- bakeries의 데이터 삭제 시 관련 데이터도 삭제
    );
    """

    comment_table_query = """
    COMMENT ON TABLE breadmon_entity IS 'Bakeries 테이블과 연결된 Breadmon 이미지를 저장하는 테이블';
    COMMENT ON COLUMN breadmon_entity.bakery_temp_id IS 'bakeries 테이블의 temp_id와 관계';
    COMMENT ON COLUMN breadmon_entity.image_url IS 'Breadmon의 이미지 URL';
    """

    insert_data_query = """
    INSERT INTO breadmon_entity (bakery_temp_id, image_url) VALUES (%s, %s);
    """

    try:
        # PostgreSQL 연결
        conn = psycopg2.connect(**DB_CONFIG)
        cursor = conn.cursor()

        # breadmon_entity 테이블 생성
        cursor.execute(create_table_query)
        conn.commit()

        # 테이블 및 칼럼 주석 추가
        cursor.execute(comment_table_query)
        conn.commit()

        # 41개의 랜덤 데이터 삽입 (bakery_temp_id=16은 제외)
        image_options = ['단팥몬.png', '소보루몬.png', '바게트몬.png']
        data_to_insert = [
            (temp_id, random.choice(image_options)) for temp_id in range(1, 42) if temp_id != 16
        ]

        cursor.executemany(insert_data_query, data_to_insert)
        conn.commit()

        print("데이터가 성공적으로 삽입되었습니다 (bakery_temp_id=16은 제외).")

    except Exception as e:
        print(f"Error: {e}")
    finally:
        if conn:
            cursor.close()
            conn.close()

if __name__ == "__main__":
    setup_breadmon_entity()
