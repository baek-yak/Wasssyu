# routers/recommendation.py

import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../../../')))

from fastapi import APIRouter
from pydantic import BaseModel
from typing import List
import pandas as pd
from geopy.distance import geodesic
import joblib
from config import DATA_PATH, MODEL_PATH

# 저장된 데이터 및 모델 불러오기
data = pd.read_csv(DATA_PATH)
kmeans = joblib.load(MODEL_PATH)
# 라우터 생성
recommendation_router = APIRouter()

# 요청 데이터 모델
class RecommendationRequest(BaseModel):
    latitude: float
    longitude: float
    preferred_types: List[str]

# 추천 엔드포인트
@recommendation_router.post("/recommend")
def recommend_places(request: RecommendationRequest):
    user_location = (request.latitude, request.longitude)

    # 사용자 좌표에서 가장 가까운 클러스터 찾기
    data['distance'] = data[['latitude', 'longitude']].apply(
        lambda row: geodesic(user_location, (row['latitude'], row['longitude'])).km, axis=1
    )
    closest_cluster = data.loc[data['distance'].idxmin(), 'cluster']

    # 클러스터 내에서 조건에 맞는 장소 필터링
    filtered_places = data[
        (data['cluster'] == closest_cluster) &
        (data['rating'] >= 4.0) &
        (data['types'].apply(lambda x: any(t in x for t in request.preferred_types)))
    ]

    # 결과 정리
    recommended_places = filtered_places[['name', 'rating', 'address', 'latitude', 'longitude']].to_dict(orient='records')
    
    return {"recommended_places": recommended_places}
