import psycopg2
from psycopg2 import sql

# PostgreSQL 설정
DB_CONFIG = {
    "user": "daebbang",
    "password": "apvmf0462",
    "dbname": "postgres",
    "host": "k11b105.p.ssafy.io",
    "port": 5444,
}

# 처리할 테이블 목록
TABLES = [
    "science_sites",
    "restaurants",
    "cultural_sites",
    "bakeries",
    "eco_sites",
    "historical_sites",
    "main_sites",
]

def connect_to_db():
    try:
        conn = psycopg2.connect(**DB_CONFIG)
        print("Connected to the database successfully.")
        return conn
    except Exception as e:
        print(f"Error connecting to the database: {e}")
        return None

def verify_table_structure(cursor, table_name):
    """테이블 구조를 확인합니다."""
    try:
        # 테이블 존재 여부 확인
        cursor.execute("""
            SELECT EXISTS (
                SELECT FROM information_schema.tables 
                WHERE table_name = %s
            );
        """, (table_name,))
        
        if not cursor.fetchone()[0]:
            print(f"Table '{table_name}' does not exist.")
            return False
            
        return True
    except Exception as e:
        print(f"Error verifying table structure for '{table_name}': {e}")
        return False

def add_primary_key(cursor, table_name):
    """테이블에 serial 타입의 기본 키 컬럼을 추가합니다."""
    try:
        # 임시 ID 컬럼 추가
        add_column_query = sql.SQL("""
            ALTER TABLE {table} 
            ADD COLUMN IF NOT EXISTS temp_id SERIAL;
        """).format(table=sql.Identifier(table_name))
        
        cursor.execute(add_column_query)
        
        # 기존 기본 키가 있다면 제거
        cursor.execute("""
            SELECT constraint_name 
            FROM information_schema.table_constraints 
            WHERE table_name = %s 
            AND constraint_type = 'PRIMARY KEY';
        """, (table_name,))
        
        existing_pk = cursor.fetchone()
        if existing_pk:
            drop_pk_query = sql.SQL("""
                ALTER TABLE {table} 
                DROP CONSTRAINT {constraint};
            """).format(
                table=sql.Identifier(table_name),
                constraint=sql.Identifier(existing_pk[0])
            )
            cursor.execute(drop_pk_query)
        
        # temp_id를 기본 키로 설정
        set_pk_query = sql.SQL("""
            ALTER TABLE {table} 
            ADD PRIMARY KEY (temp_id);
        """).format(table=sql.Identifier(table_name))
        
        cursor.execute(set_pk_query)
        print(f"Added primary key to table '{table_name}'")
        return True
        
    except Exception as e:
        print(f"Error adding primary key to '{table_name}': {e}")
        return False

def remove_duplicates(cursor, table_name, unique_column="name"):
    """중복 레코드를 제거합니다."""
    try:
        # 중복 제거를 위한 임시 테이블 생성
        temp_table = f"temp_{table_name}"
        create_temp_query = sql.SQL("""
            CREATE TEMP TABLE {temp_table} AS 
            SELECT DISTINCT ON ({unique_col}) *
            FROM {original_table}
            ORDER BY {unique_col}, temp_id;
        """).format(
            temp_table=sql.Identifier(temp_table),
            original_table=sql.Identifier(table_name),
            unique_col=sql.Identifier(unique_column)
        )
        
        cursor.execute(create_temp_query)
        
        # 원본 테이블의 데이터 삭제
        truncate_query = sql.SQL("""
            TRUNCATE TABLE {table};
        """).format(table=sql.Identifier(table_name))
        
        cursor.execute(truncate_query)
        
        # 중복이 제거된 데이터 다시 삽입
        insert_query = sql.SQL("""
            INSERT INTO {original_table}
            SELECT * FROM {temp_table};
        """).format(
            original_table=sql.Identifier(table_name),
            temp_table=sql.Identifier(temp_table)
        )
        
        cursor.execute(insert_query)
        
        # 임시 테이블 삭제
        drop_temp_query = sql.SQL("""
            DROP TABLE {temp_table};
        """).format(temp_table=sql.Identifier(temp_table))
        
        cursor.execute(drop_temp_query)
        
        print(f"Successfully removed duplicates from '{table_name}'")
        return True
        
    except Exception as e:
        print(f"Error removing duplicates from '{table_name}': {e}")
        return False

def main():
    conn = connect_to_db()
    if conn is None:
        print("Database connection failed. Exiting...")
        return
    
    try:
        with conn.cursor() as cursor:
            for table in TABLES:
                print(f"\nProcessing table: {table}")
                
                if not verify_table_structure(cursor, table):
                    continue
                
                # 기본 키 추가
                if add_primary_key(cursor, table):
                    # 중복 제거
                    if remove_duplicates(cursor, table, "name"):
                        conn.commit()
                        print(f"Successfully processed table '{table}'")
                    else:
                        conn.rollback()
                        print(f"Failed to remove duplicates from '{table}'")
                else:
                    conn.rollback()
                    print(f"Failed to add primary key to '{table}'")
            
            print("\nAll tables processed.")
            
    except Exception as e:
        print(f"Error during processing: {e}")
        conn.rollback()
    finally:
        conn.close()
        print("Database connection closed.")

if __name__ == "__main__":
    main()