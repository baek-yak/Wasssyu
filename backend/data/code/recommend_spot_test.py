from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
from openai import OpenAI
from dotenv import load_dotenv
import os
from db_conect import connect_to_db
from psycopg2.extras import RealDictCursor
import json

# 환경 변수 로드
load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
client = OpenAI(api_key=OPENAI_API_KEY)  # OpenAI API 클라이언트 초기화

def get_openai_embedding(text):
    """
    OpenAI API를 사용하여 텍스트 임베딩을 생성합니다.
    
    :param text: 사용자 입력 텍스트
    :return: 1536차원 임베딩 벡터 (numpy array)
    """
    try:
        response = client.embeddings.create(
            input=text,
            model="text-embedding-3-large"  # 사용할 모델
        )
        embedding = response.data[0].embedding
        return np.array(embedding, dtype=np.float32)
    except Exception as e:
        print(f"Error fetching embedding from OpenAI: {e}")
        raise e

def fetch_tourist_spots_from_db():
    """
    데이터베이스에서 관광지 데이터를 가져옵니다.
    
    :return: 관광지 데이터 리스트
    """
    query = """
    SELECT 
        tse.id,
        tse.spot_name,
        tse.spot_address,
        tse.spot_description,
        tse.elastic_id,
        tse.phone,
        tse.daily_plan_entity_id,
        tse.embedding,
        tsie.tourist_spot_image_url
    FROM 
        tourist_spot_entity tse
    LEFT JOIN 
        tourist_spot_image_entity tsie
    ON 
        tse.id = tsie.tourist_spot_entity_id;
    """
    try:
        connection = connect_to_db()
        cursor = connection.cursor(cursor_factory=RealDictCursor)
        cursor.execute(query)
        results = cursor.fetchall()
        return results
    except Exception as e:
        print(f"Error fetching data from database: {e}")
        raise e
    finally:
        if connection:
            cursor.close()
            connection.close()

def find_similar_places(user_input):
    """
    사용자 입력을 기반으로 가장 유사한 장소 10개를 반환합니다.
    
    :param user_input: 사용자 입력 텍스트
    :return: 유사한 장소 데이터 리스트
    """
    try:
        # 사용자 입력 임베딩
        user_vector = get_openai_embedding(user_input)
        
        # DB에서 관광지 데이터 가져오기
        spots = fetch_tourist_spots_from_db()
        
        # 관광지 데이터와 유사도 계산
        similarities = []
        for spot in spots:
            if spot["embedding"] is not None:
                try:
                    # `embedding`이 JSON 문자열이라면 변환
                    db_vector = np.array(json.loads(spot["embedding"]), dtype=np.float32)
                except (TypeError, ValueError) as e:
                    print(f"Error parsing embedding for spot ID {spot['id']}: {e}")
                    continue
                
                # 유사도 계산
                similarity = cosine_similarity([user_vector], [db_vector])[0][0]
                similarities.append({
                    "id": spot["id"],
                    "spot_name": spot["spot_name"],
                    "spot_address": spot["spot_address"],
                    "spot_description": spot["spot_description"],
                    "elastic_id": spot["elastic_id"],
                    "phone": spot["phone"],
                    "daily_plan_entity_id": spot["daily_plan_entity_id"],
                    "tourist_spot_image_url": spot["tourist_spot_image_url"],
                    "similarity": similarity
                })
        
        # 유사도로 정렬 후 상위 10개 반환
        top_similar_places = sorted(similarities, key=lambda x: x["similarity"], reverse=True)[:10]
        return top_similar_places

    except Exception as e:
        print(f"Error in finding similar places: {e}")
        raise e

# 사용자 입력 받기
user_input = input("Enter a description or keywords for the tourist spot: ")
similar_places = find_similar_places(user_input)

# 결과 출력
print("\nTop 10 Similar Tourist Spots:")
for idx, place in enumerate(similar_places, start=1):
    print(f"{idx}. {place['spot_name']} ({place['similarity']:.2f})")
    print(f"   Address: {place['spot_address']}")
    print(f"   Description: {place['spot_description']}")
    print(f"   Phone: {place['phone']}")
    print(f"   Image URL: {place['tourist_spot_image_url']}")
    print()