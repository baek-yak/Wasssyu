from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import psycopg2
import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from geopy.distance import geodesic
from openai import OpenAI
import os
import dotenv

dotenv.load_dotenv()

# OpenAI API Key 설정
API_KEY = os.environ.get("OPENAI_API_KEY")
client = OpenAI(api_key=API_KEY)

DB_CONFIG = {
    "user": os.environ.get("POSTGRES_USER"),
    "password": os.environ.get("POSTGRES_PASSWORD"),
    "dbname": os.environ.get("POSTGRES_DB"),
    "host": os.environ.get("POSTGRES_HOST"),
    "port": os.environ.get("POSTGRES_PORT"),
}

# FastAPI 애플리케이션 생성
marble_router = APIRouter()

# 데이터 모델 정의
class UserInput(BaseModel):
    preference: str
    start_lat: float
    start_lon: float
    end_lat: float
    end_lon: float

# OpenAI API를 사용한 텍스트 임베딩 생성
def generate_embedding(text):
    try:
        response = client.embeddings.create(
            input=text,
            model="text-embedding-3-large"
        )
        return np.array(response.data[0].embedding)
    except Exception as e:
        print(f"Error generating embedding for text '{text}': {e}")
        return None

# 데이터베이스에서 데이터 가져오기
def fetch_data_from_db():
    try:
        connection = psycopg2.connect(**DB_CONFIG)
        query = """
            SELECT 
                latitude, longitude, spot_name, embedding
            FROM tourist_spot_entity;
        """
        df = pd.read_sql_query(query, connection)
        print("데이터를 성공적으로 가져왔습니다!")
        return df
    except Exception as e:
        print("데이터베이스 연결 오류:", e)
        raise HTTPException(status_code=500, detail="Database connection error")
    finally:
        if 'connection' in locals() and connection:
            connection.close()

# embedding 컬럼을 배열로 변환 및 NaN 제거
def parse_embedding(embedding_data):
    if isinstance(embedding_data, str):
        try:
            return np.array(eval(embedding_data))
        except Exception as e:
            print(f"Error parsing embedding: {embedding_data} - {e}")
            return None
    elif isinstance(embedding_data, (list, np.ndarray)):
        return np.array(embedding_data)
    else:
        print(f"Unexpected embedding format: {embedding_data}")
        return None

# 강화학습 환경 정의
class TouristBoardEnv:
    def __init__(self, places, user_embedding, start_coords, end_coords):
        self.places = places
        self.user_embedding = user_embedding
        self.start_coords = start_coords
        self.end_coords = end_coords

        self.current_index = 0
        self.visited = []

    def reset(self):
        self.current_index = 0
        self.visited = []
        return self.current_index

    def step(self, action):
        next_index = action
        done = next_index in self.visited
        if not done:
            self.visited.append(next_index)
            self.current_index = next_index
        reward = self.calculate_reward(self.places.iloc[next_index])
        return self.current_index, reward, done

    def calculate_reward(self, selected_place):
        if np.isnan(self.user_embedding).any() or np.isnan(selected_place['embedding']).any():
            print("Invalid embedding detected. Skipping reward calculation.")
            return 0
        similarity = cosine_similarity([self.user_embedding], [selected_place['embedding']])[0][0]
        start_distance = geodesic(self.start_coords, (selected_place['latitude'], selected_place['longitude'])).km
        end_distance = geodesic((selected_place['latitude'], selected_place['longitude']), self.end_coords).km
        distance_efficiency = 1 / (start_distance + end_distance + 1e-5)
        return similarity + distance_efficiency

# 탐험 및 최적 경로 탐색
def explore_and_find_optimal(env, num_episodes=50):
    best_route = None
    best_reward = float('-inf')
    for episode in range(num_episodes):
        state = env.reset()
        total_reward = 0
        visited_places = []
        while True:
            action = np.random.choice(len(env.places))  # 랜덤 행동
            next_state, reward, done = env.step(action)
            total_reward += reward
            visited_places.append(next_state)
            if done:
                break
        if total_reward > best_reward:
            best_reward = total_reward
            best_route = visited_places
    return list(dict.fromkeys(best_route))[:28]  # 중복 제거 및 28개로 제한

# 최적 경로 API 엔드포인트
@marble_router.post("/api/optimal-route")
def get_optimal_route(user_input: UserInput):
    # DB에서 데이터 가져오기
    df = fetch_data_from_db()

    # embedding 컬럼 변환
    df['embedding'] = df['embedding'].apply(parse_embedding)

    # NaN 값 제거
    df = df.dropna(subset=['embedding'])

    # 사용자 성향 임베딩 생성
    user_embedding = generate_embedding(user_input.preference)
    if user_embedding is None:
        raise HTTPException(status_code=500, detail="Failed to generate user embedding")

    # 강화학습 환경 생성
    start_coords = (user_input.start_lat, user_input.start_lon)
    end_coords = (user_input.end_lat, user_input.end_lon)
    env = TouristBoardEnv(df, user_embedding, start_coords, end_coords)

    # 탐험 및 최적 경로 탐색
    optimal_route = explore_and_find_optimal(env, num_episodes=50)

    # 최적 경로의 장소 이름 반환
    optimal_places = [{"spot_name": df.iloc[idx]["spot_name"]} for idx in optimal_route]
    return {"optimal_route": optimal_places}