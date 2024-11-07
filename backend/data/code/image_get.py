import requests
import pandas as pd
import time
import os

# API 설정
API_KEY = "AIzaSyDfhuBRPpwFL8kvBP85F2lFgfgyDHe7gHk "  # 실제 API 키를 여기에 넣으세요
SAVE_DIR = "photos"  # 사진을 저장할 폴더

# CSV 파일 로드
csv_file_path = r"C:\Users\SSAFY\MCL\전처리_완료.csv"  # CSV 파일 경로
data = pd.read_csv(csv_file_path)

# 저장 폴더 생성
os.makedirs(SAVE_DIR, exist_ok=True)

# 사진 다운로드 함수
def download_photo(photo_reference, api_key, place_name, index):
    url = f"https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference={photo_reference}&key={api_key}"
    response = requests.get(url)
    if response.status_code == 200:
        # 파일 저장
        filename = f"{SAVE_DIR}/{place_name}_{index}.jpg"
        with open(filename, "wb") as file:
            file.write(response.content)
        print(f"Photo saved: {filename}")
    else:
        print(f"Failed to download photo for {place_name}")

# Google Places API에서 photo_reference 가져오기
def get_photo_references(place_name, latitude, longitude, api_key):
    url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json"
    params = {
        "location": f"{latitude},{longitude}",
        "radius": 100,  # 작은 반경 내에서 해당 장소의 photo_reference 검색
        "keyword": place_name,
        "key": api_key,
        "language": "ko"
    }
    
    response = requests.get(url, params=params)
    if response.status_code != 200:
        print(f"Error fetching photos for {place_name}: {response.status_code}")
        return []

    # 응답에서 최대 2개의 photo_reference 추출
    places = response.json().get("results", [])
    photo_references = []
    if places:
        for photo in places[0].get("photos", [])[:2]:
            photo_references.append(photo["photo_reference"])

    return photo_references

# 모든 장소에 대해 사진 다운로드
for _, row in data.iterrows():
    place_name = row['name'].replace("/", "-")  # 파일 이름에 사용할 수 없는 문자 대체
    latitude = row['latitude']
    longitude = row['longitude']

    # 각 장소에서 최대 2개의 photo_reference 가져오기
    photo_references = get_photo_references(place_name, latitude, longitude, API_KEY)
    if photo_references:
        for i, photo_reference in enumerate(photo_references):
            download_photo(photo_reference, API_KEY, place_name, i+1)
    else:
        print(f"No photos found for {place_name}")

    time.sleep(2)  # API 요청 간의 대기 시간
