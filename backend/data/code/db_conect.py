import os
import psycopg2
from dotenv import load_dotenv


# .env 파일 로드
load_dotenv()

# PostgreSQL DB 설정
POSTGRES_USER = os.getenv("POSTGRES_USER")
POSTGRES_PASSWORD = os.getenv("POSTGRES_PASSWORD")
POSTGRES_DB = os.getenv("POSTGRES_DB")
POSTGRES_PORT = os.getenv("POSTGRES_PORT")
POSTGRES_HOST = os.getenv("POSTGRES_HOST")

def connect_to_db():
    """
    PostgreSQL 데이터베이스에 연결합니다.

    :return: psycopg2.Connection 객체
    """
    try:
        connection = psycopg2.connect(
            user=POSTGRES_USER,
            password=POSTGRES_PASSWORD,
            dbname=POSTGRES_DB,
            host=POSTGRES_HOST,
            port=POSTGRES_PORT,
        )
        print("Database connection successful.")
        return connection
    except psycopg2.Error as e:
        print(f"Error connecting to the database: {e}")
        raise e