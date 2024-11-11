import pandas as pd
import os
from sklearn.metrics.pairwise import cosine_similarity
from langchain.embeddings.openai import OpenAIEmbeddings
import numpy as np
from openai import OpenAI

# OpenAI API 설정
API_KEY = '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'

client = OpenAI(api_key=API_KEY)

# 데이터 로드 함수
def load_data_from_directory(directory_path):
    """지정된 디렉토리의 모든 CSV 파일을 읽어와 하나의 데이터프레임으로 통합"""
    all_data = pd.DataFrame()
    for file in os.listdir(directory_path):
        if file.endswith(".csv"):
            file_path = os.path.join(directory_path, file)
            try:
                df = pd.read_csv(file_path, encoding="utf-8-sig")
                all_data = pd.concat([all_data, df], ignore_index=True)
            except Exception as e:
                print(f"Error loading {file}: {e}")
    return all_data

# 정보 요청 처리
def handle_info_request(user_input, data):
    """정보 요청 처리 함수"""
    for idx, row in data.iterrows():
        if row['name'] in user_input:
            if "주소" in user_input:
                return f"{row['name']}의 주소는 {row['address']}입니다."
            elif "평점" in user_input:
                return f"{row['name']}의 평점은 {row['rating']}입니다."
            elif "리뷰" in user_input:
                return f"{row['name']}의 리뷰 수는 {row['review_count']}개입니다."
            elif "전화번호" in user_input:
                return f"{row['name']}의 전화번호는 {row['전화번호']}입니다."
            elif "영업시간" in user_input:
                return f"{row['name']}의 영업시간은 {row['영업시간']}입니다."
            elif "설명" in user_input:
                return f"{row['name']}에 대한 설명: {row['description']}"
    return "해당 정보를 찾을 수 없습니다. 다시 시도해주세요."

# 코스 추천 처리
def handle_course_recommendation(user_input, data, filters=None):
    """코스 추천 처리 함수"""
    embeddings = client.embeddings.create(
      input= user_input,
      model="text-embedding-3-large"
    )
    user_embedding = embeddings.data[0].embedding

    # 데이터의 임베딩 추출
    data['embedding'] = data['name'] + " " + data['종류'] + " " + data['address']
    travel_embeddings = data['embedding'].apply(embeddings.embed_query).to_list()
    travel_embeddings = np.stack(travel_embeddings)

    # 코사인 유사도 계산
    similarities = cosine_similarity([user_embedding], travel_embeddings)[0]
    data['similarity'] = similarities

    # 필터 적용 (평점, 리뷰수 기준)
    if filters:
        if 'min_rating' in filters:
            data = data[data['rating'] >= filters['min_rating']]
        if 'min_reviews' in filters:
            data = data[data['review_count'] >= filters['min_reviews']]

    # 유사도 상위 5개 장소 추천
    recommended = data.sort_values(by='similarity', ascending=False).head(5)
    return recommended[['name', '종류', 'address', 'rating', 'review_count']]

# OpenAI를 사용해 자연스러운 응답 생성
def generate_natural_response(user_input, action, result):
    """OpenAI를 사용해 자연스러운 응답 생성"""
    prompt = f"""
    사용자의 질문: {user_input}
    작업 유형: {action}
    결과: {result}

    위 정보를 기반으로 사용자에게 친근하고 자연스러운 대화 스타일로 응답을 생성하세요.
    """
    try:
        completion = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": "당신은 여행 정보 및 추천을 제공하는 전문 챗봇입니다."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=300,
            temperature=0.7
        )
        response = completion.choices[0].message.content
        return response
    except Exception as e:
        print(f"OpenAI API 호출 중 오류가 발생했습니다: {e}")
        return "죄송합니다. 요청을 처리하는 중 문제가 발생했습니다."

# 사용자 입력 처리
def process_user_input(user_input, data):
    """사용자 입력을 처리하고 OpenAI를 통해 자연스러운 응답 생성"""
    action = classify_input(user_input)
    result = ""

    if action == "정보 요청":
        result = handle_info_request(user_input, data)
    elif action == "코스 추천":
        filters = {}
        if "평점 높은" in user_input:
            filters['min_rating'] = 4.0
        if "리뷰 많은" in user_input:
            filters['min_reviews'] = 100
        result = handle_course_recommendation(user_input, data, filters)
        result = result.to_string(index=False)  # 추천 결과를 문자열로 변환
    else:
        result = "입력을 이해하지 못했습니다. 다시 시도해주세요."

    # OpenAI를 사용해 자연스러운 응답 생성
    response = generate_natural_response(user_input, action, result)
    return response

# 사용자 입력 분류
def classify_input(user_input):
    """사용자의 입력을 '정보 요청' 또는 '코스 추천'으로 분류"""
    keywords_info = ["주소", "전화번호", "평점", "리뷰", "정보", "설명"]
    keywords_recommend = ["추천", "코스", "여행지", "가볼 만한 곳", "명소"]
    
    if any(keyword in user_input for keyword in keywords_info):
        return "정보 요청"
    elif any(keyword in user_input for keyword in keywords_recommend):
        return "코스 추천"
    else:
        return "알 수 없음"

# 메인 실행
def main():
    data_directory = r"C:\Users\SSAFY\MCL\S11P31B105\backend\data\csv_files\my_datas"
    data = load_data_from_directory(data_directory)

    print("챗봇을 시작합니다. 질문 또는 요청을 입력하세요.")
    while True:
        user_input = input("\n사용자 입력: ")
        if user_input.lower() in ["종료", "exit", "quit"]:
            print("챗봇을 종료합니다.")
            break

        response = process_user_input(user_input, data)
        print(f"\n응답: {response}")

# 실행
if __name__ == "__main__":
    main()
