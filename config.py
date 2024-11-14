import os
import sys

# 프로젝트 루트 디렉토리 절대 경로 설정
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# 데이터 및 모델 경로 설정
DATA_PATH = os.path.join(BASE_DIR, 'backend', 'model', 'clustered_data.csv')
MODEL_PATH = os.path.join(BASE_DIR, 'backend', 'model', 'kmeans_model.joblib')

# DB_con 디렉토리 경로 설정
DB_CON_DIR = os.path.join(BASE_DIR, 'backend', 'DB_con')

# DB_con 디렉토리를 sys.path에 추가
if DB_CON_DIR not in sys.path:
    sys.path.append(DB_CON_DIR)
    