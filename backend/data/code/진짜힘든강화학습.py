import psycopg2
import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from geopy.distance import geodesic
from openai import OpenAI
from gym import Env
from gym.spaces import Discrete
import dotenv
import os

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

# OpenAI API를 사용한 텍스트 임베딩 생성
def generate_embedding(text):
    try:
        response = client.embeddings.create(
            input=text,
            model="text-embedding-3-large"
        )
        return np.array(response.data[0].embedding)  # numpy 배열로 반환
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
    finally:
        if 'connection' in locals() and connection:
            connection.close()

# embedding 컬럼을 배열로 변환 및 NaN 제거
def parse_embedding(embedding_data):
    """embedding 데이터를 numpy 배열로 변환"""
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
class TouristBoardEnv(Env):
    def __init__(self, places, user_embedding, start_coords, end_coords):
        super().__init__()
        self.places = places  # 전체 장소 데이터
        self.user_embedding = user_embedding  # 사용자 임베딩
        self.start_coords = start_coords  # 출발 위치 좌표 (위도, 경도)
        self.end_coords = end_coords  # 도착 위치 좌표 (위도, 경도)

        # 상태: 장소 개수로 상태 설정
        self.observation_space = Discrete(len(self.places))

        # 행동: 장소 이동
        self.action_space = Discrete(len(self.places))

        # 초기 상태
        self.current_index = 0
        self.visited = []

    def reset(self):
        """환경 초기화"""
        self.current_index = 0
        self.visited = []
        return self.current_index

    def step(self, action):
        """주어진 행동(action)에 따른 상태 업데이트 및 보상 계산"""
        next_index = action

        # 종료 조건: 이미 방문했거나 초과 시 종료
        done = next_index in self.visited

        # 상태 업데이트
        if not done:
            self.visited.append(next_index)
            self.current_index = next_index

        # 보상 계산
        reward = self.calculate_reward(self.places.iloc[next_index])

        return self.current_index, reward, done, {}

    def calculate_reward(self, selected_place):
        """현재 선택된 장소에 대한 보상 계산"""
        if np.isnan(self.user_embedding).any() or np.isnan(selected_place['embedding']).any():
            print("Invalid embedding detected. Skipping reward calculation.")
            return 0

        # 코사인 유사도 보상
        similarity = cosine_similarity(
            [self.user_embedding], [selected_place['embedding']]
        )[0][0]

        # 거리 효율성 보상
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
            action = env.action_space.sample()  # 랜덤 행동
            next_state, reward, done, _ = env.step(action)
            total_reward += reward
            visited_places.append(next_state)

            if done:
                break

        # 최적 보상 업데이트
        if total_reward > best_reward:
            best_reward = total_reward
            best_route = visited_places

    # 최적 경로에서 28개 장소 선택
    best_route = list(dict.fromkeys(best_route))[:28]  # 중복 제거 및 28개로 제한
    return best_route

if __name__ == "__main__":
    # DB에서 데이터 가져오기
    df = fetch_data_from_db()

    # embedding 컬럼 변환
    df['embedding'] = df['embedding'].apply(parse_embedding)

    # NaN 값 제거
    df = df.dropna(subset=['embedding'])

    # 전체 데이터 활용
    selected_places = df.to_dict('records')
    selected_df = pd.DataFrame(selected_places)

    # 사용자 입력
    user_preference_text = input("여행 성향을 입력하세요 (예: '역사적인 장소 선호'): ")
    start_lat = float(input("출발 위치 위도를 입력하세요: "))
    start_lon = float(input("출발 위치 경도를 입력하세요: "))
    end_lat = float(input("도착 위치 위도를 입력하세요: "))
    end_lon = float(input("도착 위치 경도를 입력하세요: "))

    # 사용자 성향 임베딩 생성
    user_embedding = generate_embedding(user_preference_text)

    # 강화학습 환경 생성
    start_coords = (start_lat, start_lon)
    end_coords = (end_lat, end_lon)
    env = TouristBoardEnv(selected_df, user_embedding, start_coords, end_coords)

    # 탐험 및 최적 경로 탐색
    optimal_route = explore_and_find_optimal(env, num_episodes=50)

    # 최적 경로의 spot_name 출력
    print("\n최적 경로의 장소 이름:")
    for idx in optimal_route:
        place = selected_df.iloc[idx]
        print(place['spot_name'])