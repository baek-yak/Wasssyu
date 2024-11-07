import pandas as pd
import requests
import os
import time

# Google Places API 설정
API_KEY = "AIzaSyDfhuBRPpwFL8kvBP85F2lFgfgyDHe7gHk"

# 특정 장소에 대한 평점 및 리뷰 수를 가져오는 함수
def fetch_place_details(place_name, api_key):
    url = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json"
    params = {
        "input": place_name,
        "inputtype": "textquery",
        "fields": "name,rating,user_ratings_total",
        "key": api_key
    }
    response = requests.get(url, params=params)
    data = response.json()

    if data["status"] == "OK" and "candidates" in data and len(data["candidates"]) > 0:
        place = data["candidates"][0]
        rating = place.get("rating", 0.0)
        reviews = place.get("user_ratings_total", 0)
        return rating, reviews
    else:
        return 0.0, 0  # 데이터를 찾지 못한 경우 기본값 반환

# CSV 파일 업데이트 함수
def update_csv_with_api_data():
    input_dir = r"C:\Users\SSAFY\MCL\S11P31B105\backend\data\csv_files"

    # 모든 CSV 파일 처리
    for filename in os.listdir(input_dir):
        if not filename.endswith('.csv') or filename == "대전_관광지.csv":
            continue

        file_path = os.path.join(input_dir, filename)
        print(f"\n처리 중: {filename}")

        try:
            # CSV 파일 읽기
            df = pd.read_csv(file_path, encoding='utf-8-sig')
        except Exception as e:
            print(f"파일 읽기 실패: {str(e)}")
            continue

        # 평점과 리뷰수 컬럼 추가
        if '평점' not in df.columns:
            df['평점'] = 0.0
        if '리뷰수' not in df.columns:
            df['리뷰수'] = 0

        # 각 장소에 대한 정보 수집
        for idx, row in df.iterrows():
            place_name = row['이름']
            print(f"검색 중: {place_name}")

            # 이미 수집된 데이터가 있다면 건너뛰기
            if pd.notna(df.at[idx, '평점']) and df.at[idx, '평점'] > 0:
                print(f"이미 데이터 있음: 평점 {df.at[idx, '평점']}, 리뷰 {df.at[idx, '리뷰수']}")
                continue

            # API 호출하여 평점 및 리뷰 수 수집
            rating, reviews = fetch_place_details(place_name, API_KEY)
            print(f"수집된 데이터: 평점 {rating}, 리뷰 {reviews}")

            # 데이터 업데이트
            df.at[idx, '평점'] = rating
            df.at[idx, '리뷰수'] = reviews

            # API 사용 제한 방지
            time.sleep(1)  # 1초 대기 (API 호출 속도 조절)

        # 수정된 데이터프레임을 CSV로 저장
        df.to_csv(file_path, index=False, encoding='utf-8-sig')
        print(f"{filename} 업데이트 완료")

if __name__ == "__main__":
    print("Google Places API를 통한 리뷰 데이터 수집을 시작합니다...")
    update_csv_with_api_data()
    print("\n모든 데이터 업데이트가 완료되었습니다.")
