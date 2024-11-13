import os
import pandas as pd
import psycopg2
from psycopg2 import sql, extras

# PostgreSQL 설정
DB_CONFIG = {
    "user": "daebbang",
    "password": "apvmf0462",
    "dbname": "postgres",
    "host": "k11b105.p.ssafy.io",
    "port": 5444,
}

DATA_DIR = r"C:\Users\SSAFY\MCL\S11P31B105\backend\data\csv_files\my_datas"

FILE_TABLE_MAP = {
    "대전_과학명소.csv": "science_sites",
    "대전_맛집.csv": "restaurants",
    "대전_문화명소.csv": "cultural_sites",
    "대전_빵집.csv": "bakeries",
    "대전_생태환경명소.csv": "eco_sites",
    "대전_역사명소.csv": "historical_sites",
    "대전시_대표명소.csv": "main_sites",
}

def connect_to_db():
    try:
        conn = psycopg2.connect(**DB_CONFIG)
        print("Connected to the database successfully.")
        return conn
    except Exception as e:
        print(f"Error connecting to the database: {e}")
        return None

def create_table(cursor, table_name, columns):
    try:
        column_definitions = ", ".join(
            [f"{col_name} {col_type}" for col_name, col_type in columns.items()]
        )
        create_table_query = sql.SQL(
            f"CREATE TABLE IF NOT EXISTS {table_name} ({column_definitions});"
        )
        cursor.execute(create_table_query)
        print(f"Table '{table_name}' created or already exists.")
    except Exception as e:
        print(f"Error creating table '{table_name}': {e}")

def insert_data(cursor, table_name, df):
    try:
        columns = df.columns.tolist()
        query = sql.SQL(
            f"INSERT INTO {table_name} ({', '.join(columns)}) VALUES %s"
        )
        records = [tuple(row) for row in df.itertuples(index=False)]
        extras.execute_values(cursor, query, records, template=None, page_size=100)
        print(f"Data inserted into '{table_name}'.")
    except Exception as e:
        print(f"Error inserting data into table '{table_name}': {e}")

def process_and_upload_files():
    conn = connect_to_db()
    if conn is None:
        print("Database connection failed. Exiting...")
        return

    try:
        with conn.cursor() as cursor:
            for file_name, table_name in FILE_TABLE_MAP.items():
                file_path = os.path.join(DATA_DIR, file_name)
                if not os.path.exists(file_path):
                    print(f"File '{file_name}' not found in the directory.")
                    continue

                print(f"\nProcessing file: {file_name}")
                
                try:
                    df = pd.read_csv(file_path, encoding="utf-8-sig")
                    print(f"File '{file_name}' read successfully with {len(df)} rows.")
                except Exception as e:
                    print(f"Error reading file '{file_name}': {e}")
                    continue

                try:
                    df.rename(
                        columns={
                            "종류": "category",
                            "영업시간": "business_hours",
                            "전화번호": "phone",
                        },
                        inplace=True,
                    )
                    df.columns = df.columns.str.lower().str.replace(" ", "_")

                    # NaN 값을 None으로 변환
                    df = df.where(pd.notnull(df), None)

                    # 숫자 컬럼 강제 변환 및 재할당
                    if "review_count" in df.columns:
                        df["review_count"] = pd.to_numeric(df["review_count"], errors="coerce")
                        df["review_count"] = df["review_count"].fillna(0)
                except Exception as e:
                    print(f"Error processing columns in file '{file_name}': {e}")
                    continue

                column_types = {
                    "name": "TEXT",
                    "category": "TEXT",
                    "address": "TEXT",
                    "rating": "REAL",
                    "review_count": "BIGINT",
                    "phone": "TEXT",
                    "business_hours": "TEXT",
                    "latitude": "REAL",
                    "longitude": "REAL",
                    "description": "TEXT",
                }
                create_table(cursor, table_name, column_types)

                try:
                    insert_data(cursor, table_name, df)
                    conn.commit()
                    print(f"Data uploaded successfully for '{file_name}'.")
                except Exception as e:
                    print(f"Error inserting data for file '{file_name}': {e}")
                    conn.rollback()

    except Exception as e:
        print(f"Error during file processing: {e}")
    finally:
        conn.close()
        print("Database connection closed.")

if __name__ == "__main__":
    process_and_upload_files()