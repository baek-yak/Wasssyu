import psycopg2
import ast  # 문자열을 Python 리스트로 변환하기 위해 사용

# PostgreSQL 연결 설정
conn = psycopg2.connect(
    dbname="postgres",
    user="daebbang",
    password="apvmf0462",
    host="k11b105.p.ssafy.io",
    port=5444
)
cursor = conn.cursor()

try:
    # embedding 칼럼 데이터 조회
    cursor.execute("SELECT id, embedding FROM tourist_spot_entity WHERE embedding IS NOT NULL;")
    rows = cursor.fetchall()

    for row in rows:
        record_id = row[0]
        embedding_text = row[1]

        try:
            # 문자열을 Python 리스트로 변환
            embedding_vector = ast.literal_eval(embedding_text)
            
            if isinstance(embedding_vector, (list, tuple)):  # 변환이 제대로 됐는지 확인
                # embedding_vector에 업데이트
                query = """
                    UPDATE tourist_spot_entity
                    SET embedding_vector = %s
                    WHERE id = %s;
                """
                cursor.execute(query, (embedding_vector, record_id))
            else:
                print(f"ID {record_id}: 데이터가 리스트가 아닙니다. {embedding_text}")

        except (ValueError, SyntaxError) as e:
            print(f"ID {record_id}: 변환 실패. 데이터: {embedding_text} -> 오류: {e}")

    # 변경 사항 커밋
    conn.commit()
    print("모든 데이터를 벡터 형태로 변환 완료.")

except Exception as e:
    print(f"Error: {e}")
    conn.rollback()

finally:
    cursor.close()
    conn.close()
