import os
import pandas as pd
import requests
import time
from urllib.parse import quote

GOOGLE_API_KEY = "AIzaSyBO9KfZVPtQePywaaADbKvFW2OZuMtd0BM"

def fetch_coordinates(address):
    # 주소를 URL 인코딩
    encoded_address = quote(address)
    url = f"https://maps.googleapis.com/maps/api/geocode/json?address={encoded_address}&key={GOOGLE_API_KEY}&language=ko"
    
    try:
        # 헤더 추가
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            'Referer': 'https://maps.googleapis.com/'
        }
        
        response = requests.get(url, headers=headers)
        
        # 상태 코드 확인
        if response.status_code != 200:
            print(f"HTTP Error: {response.status_code}")
            return None, None
            
        data = response.json()
        
        # 자세한 에러 처리
        if data["status"] != "OK":
            if data["status"] == "REQUEST_DENIED":
                print(f"API Key Error: {data.get('error_message', 'No error message')}")
            elif data["status"] == "ZERO_RESULTS":
                print(f"No results found for address: {address}")
            elif data["status"] == "OVER_QUERY_LIMIT":
                print("API quota exceeded. Waiting longer between requests...")
                time.sleep(5)  # 더 긴 대기 시간
                return fetch_coordinates(address)  # 재시도
            else:
                print(f"API Error: {data['status']} - {data.get('error_message', 'No error message')}")
            return None, None
            
        location = data["results"][0]["geometry"]["location"]
        return location["lat"], location["lng"]
        
    except requests.exceptions.RequestException as e:
        print(f"Network Error: {e}")
        return None, None
    except Exception as e:
        print(f"Unexpected Error: {e}")
        return None, None

def process_and_add_coordinates(input_dir):
    output_dir = os.path.join(input_dir, "updated_with_coordinates")
    os.makedirs(output_dir, exist_ok=True)
    
    for file_name in os.listdir(input_dir):
        if file_name.endswith(".csv"):
            input_path = os.path.join(input_dir, file_name)
            output_path = os.path.join(output_dir, file_name)
            
            try:
                print(f"\nProcessing file: {file_name}")
                data = pd.read_csv(input_path, encoding="utf-8-sig")
                
                # 'latitude'와 'longitude' 열 추가
                if "latitude" not in data.columns:
                    data["latitude"] = None
                if "longitude" not in data.columns:
                    data["longitude"] = None
                
                for idx, row in data.iterrows():
                    if pd.isna(row["latitude"]) or pd.isna(row["longitude"]):
                        address = row.get("address")
                        if pd.isna(address) or not address.strip():
                            print(f"Skipping empty address at row {idx}")
                            continue
                            
                        print(f"Fetching coordinates for: {address}")
                        latitude, longitude = fetch_coordinates(address)
                        
                        if latitude is not None and longitude is not None:
                            data.at[idx, "latitude"] = latitude
                            data.at[idx, "longitude"] = longitude
                            print(f"Success - Address: {address}, Lat: {latitude}, Lng: {longitude}")
                        else:
                            print(f"Failed to get coordinates for: {address}")
                        
                        time.sleep(1.5)  # API 제한 방지를 위한 대기 시간 증가
                
                # 업데이트된 데이터 저장
                data.to_csv(output_path, index=False, encoding="utf-8-sig")
                print(f"Updated file saved to: {output_path}")
                
            except Exception as e:
                print(f"Error processing file {file_name}: {e}")
                continue

if __name__ == "__main__":
    input_directory = "/Users/gangbyeong-gyu/VSCodeProjects/ML/S11P31B105/backend/data/csv_files/my_datas/updated"
    
    # API 키 확인
    if not GOOGLE_API_KEY or GOOGLE_API_KEY == "YOUR_API_KEY_HERE":
        print("Error: Please set your Google API key")
        exit(1)
        
    print("Starting coordinate fetching process...")
    process_and_add_coordinates(input_directory)
    print("Process completed!")