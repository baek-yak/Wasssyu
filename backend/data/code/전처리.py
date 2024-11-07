import pandas as pd
import os

# CSV 파일 불러오기
df = pd.read_csv(r'C:\Users\SSAFY\MCL\S11P31B105\backend\data\전처리_완료.csv')  # '파일경로.csv'를 실제 파일 경로로 변경하세요.

# 'rating'과 'user_ratings_total' 열에 결측치가 있는 행 삭제
df = df.dropna(subset=['rating', 'user_ratings_total'])

# 'name' 열에 특정 키워드가 포함된 행 삭제
keywords_to_remove = [
    "파리바게", "할리스커피", "뚜레", "롯데리아", "네네치킨", "스타벅스", "그린브라우니", "공차", "메가커피", "놀숲", "드롭탑", "이디야", 
    "지코바", "이화수전통육개장", "마시내탕수육", "피자마루", "던킨", "코코호도", "못난이꽈베기", "PARIS BAGUETT", "크리스피크림도넛", "투썸",
    "탐앤탐스커피", "빽다방", "스터디카페", "파스쿠찌", "요거프레", "엔젤스코인노래연습장", "커피베이", 
]
df = df[~df['name'].str.contains('|'.join(keywords_to_remove), na=False)]

# 중복 데이터 삭제 (name, latitude, longitude 열을 기준으로 중복 제거)
df = df.drop_duplicates(subset=['name', 'latitude', 'longitude'])

# 최종 파일 저장 경로 설정
output_dir = os.path.join("C:", os.sep, "Users", "SSAFY", "MCL", "S11P31B105", "backend", "data")
os.makedirs(output_dir, exist_ok=True)  # 폴더가 없을 경우 생성

output_path = os.path.join(output_dir, '최종_데이터.csv')
df.to_csv(output_path, index=False, encoding='utf-8-sig')  # UTF-8 인코딩으로 저장

print(f"데이터가 {output_path}에 저장되었습니다.")
