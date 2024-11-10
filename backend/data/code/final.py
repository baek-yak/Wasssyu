import os
import pandas as pd

# 경로 설정
COORDINATES_DIR = "/Users/gangbyeong-gyu/VSCodeProjects/ML/S11P31B105/backend/data/csv_files/my_datas/updated/updated_with_coordinates"
UPDATED_DIR = "/Users/gangbyeong-gyu/VSCodeProjects/ML/S11P31B105/backend/data/csv_files/my_datas/updated/updated"

def add_coordinates_to_files():
    for file_name in os.listdir(COORDINATES_DIR):
        if file_name.endswith(".csv"):
            coordinates_path = os.path.join(COORDINATES_DIR, file_name)
            updated_path = os.path.join(UPDATED_DIR, file_name)

            if not os.path.exists(updated_path):
                print(f"File '{file_name}' not found in '{UPDATED_DIR}'. Skipping...")
                continue
            
            print(f"\nProcessing file: {file_name}")
            
            # 데이터 읽기
            coordinates_df = pd.read_csv(coordinates_path, encoding="utf-8-sig")
            updated_df = pd.read_csv(updated_path, encoding="utf-8-sig")

            # 디버그: 열 이름 확인
            print(f"Columns in coordinates_df: {coordinates_df.columns}")
            print(f"Columns in updated_df: {updated_df.columns}")

            # `latitude`와 `longitude` 열 추가
            if "latitude" not in updated_df.columns:
                updated_df["latitude"] = None
            if "longitude" not in updated_df.columns:
                updated_df["longitude"] = None

            # 데이터 병합
            try:
                if "address" in coordinates_df.columns and "address" in updated_df.columns:
                    merged_df = updated_df.merge(
                        coordinates_df[["address", "latitude", "longitude"]],
                        on="address",
                        how="left"
                    )
                else:
                    print(f"Missing 'address' column in one of the files. Skipping '{file_name}'.")
                    continue
            except KeyError as e:
                print(f"KeyError during merging: {e}")
                continue

            # 병합 후 'latitude_y'와 'longitude_y'로 값 가져오기
            if "latitude_y" in merged_df.columns and "longitude_y" in merged_df.columns:
                updated_df["latitude"] = merged_df["latitude_y"]
                updated_df["longitude"] = merged_df["longitude_y"]
            else:
                print(f"'latitude_y' or 'longitude_y' not found in merged_df for file: {file_name}")
                continue

            # 파일 저장
            updated_df.to_csv(updated_path, index=False, encoding="utf-8-sig")
            print(f"Updated file saved to: {updated_path}")

if __name__ == "__main__":
    print("Starting to add latitude and longitude to updated files...")
    add_coordinates_to_files()
    print("All files processed successfully!")