import psycopg2

# PostgreSQL DB 설정
DB_CONFIG = {
    "user": "daebbang",
    "password": "apvmf0462",
    "dbname": "postgres",
    "host": "k11b105.p.ssafy.io",
    "port": 5444,
}

# 삭제할 테이블 목록
TABLES_TO_DELETE = [
    "science_sites",
    "restaurants",
    "cultural_sites",
    "bakeries",
    "eco_sites",
    "historical_sites",
    "main_sites"
]

# 테이블 삭제 함수
def delete_tables():
    try:
        conn = psycopg2.connect(**DB_CONFIG)
        cursor = conn.cursor()

        for table in TABLES_TO_DELETE:
            # 테이블 삭제 쿼리 실행
            cursor.execute(f"DROP TABLE IF EXISTS {table} CASCADE;")
            print(f"테이블 {table}이(가) 삭제되었습니다.")
        
        conn.commit()
        cursor.close()
        conn.close()
        print("모든 테이블이 삭제되었습니다.")
    except Exception as e:
        print(f"테이블 삭제 중 오류가 발생했습니다: {e}")

# 메인 실행
if __name__ == "__main__":
    delete_tables()