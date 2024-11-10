import os
import pandas as pd
from openai import OpenAI

# OpenAI API 키 설정
OPENAI_API_KEY = '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'
client = OpenAI(api_key=OPENAI_API_KEY)

# OpenAI API를 사용하여 설명 생성
def generate_description(place_name):
    prompt = f"{place_name}"
    try:
        completion = client.chat.completions.create(
            model="gpt-4o",  # GPT-4o 모델 사용
            messages=[
                {"role": "system", "content": "당신은 대전관광 전문가 입니다. 제가 드리는 장소에 대해 여행자의 이해를 돕기위한 설명을 작성해주세요"},
                {"role": "user", "content": prompt},
            ],
            max_tokens=3000,
            temperature=0.7,
        )
        description = completion.choices[0].message.content
        return description
    except Exception as e:
        print(f"Error generating description for {place_name}: {e}")
        return "설명을 생성할 수 없습니다."

# 디렉토리 내 모든 파일 순회 및 설명 생성
def process_and_save_descriptions(input_dir):
    output_dir = os.path.join(input_dir, "updated")
    os.makedirs(output_dir, exist_ok=True)

    for file_name in os.listdir(input_dir):
        if file_name.endswith(".csv"):
            input_path = os.path.join(input_dir, file_name)
            output_path = os.path.join(output_dir, file_name)

            print(f"\nProcessing file: {file_name}")
            data = pd.read_csv(input_path, encoding="utf-8-sig")

            # 'description' 열 추가
            if "description" not in data.columns:
                data["description"] = None

            # 각 장소에 대해 설명 생성
            for idx, row in data.iterrows():
                if pd.isna(row["description"]):  # 이미 설명이 있으면 건너뜀
                    place_name = row["name"]  # 'name' 열의 장소 이름
                    print(f"\nGenerating description for: {place_name}")
                    description = generate_description(place_name)
                    data.at[idx, "description"] = description
                    print(f"장소: {place_name}")
                    print(f"설명: {description}")
                    print("-" * 80)

            # 업데이트된 데이터 저장
            data.to_csv(output_path, index=False, encoding="utf-8-sig")
            print(f"Updated file saved to: {output_path}")

# 실행
if __name__ == "__main__":
    input_directory = "/Users/gangbyeong-gyu/VSCodeProjects/ML/S11P31B105/backend/data/csv_files/my_datas/updated"
    print("OpenAI GPT-4 API를 사용하여 설명을 생성하고 저장합니다...")
    process_and_save_descriptions(input_directory)
    print("모든 작업이 완료되었습니다!")