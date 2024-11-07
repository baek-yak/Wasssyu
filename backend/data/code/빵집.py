from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
import pandas as pd

# ChromeDriver 설정
def setup_driver():
    chrome_driver_path = r"C:\Users\SSAFY\MCL\S11P31B105\backend\data\chromedriver-win64\chromedriver.exe"
    options = webdriver.ChromeOptions()
    options.add_argument('--start-maximized')  # 브라우저 최대화
    # options.add_argument('--headless')  # 테스트 시에는 주석 처리
    service = Service(chrome_driver_path)
    return webdriver.Chrome(service=service, options=options)

# Google에서 검색하고 정보 추출
def fetch_google_data(driver, query):
    driver.get(f"https://www.google.com/search?q={query}")
    time.sleep(2)  # 페이지 로딩 대기

    try:
        # 평점 찾기
        rating_elem = WebDriverWait(driver, 3).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, "span.Aq14fc"))
        )
        rating = rating_elem.text
    except:
        rating = None

    try:
        # 리뷰 수 찾기
        review_elem = driver.find_element(By.CSS_SELECTOR, "span.RDApEe span")
        reviews = review_elem.text
    except:
        reviews = None

    try:
        # 주소 찾기
        address_elem = driver.find_element(By.CSS_SELECTOR, "span.LrzXr")
        address = address_elem.text
    except:
        address = None

    return rating, reviews, address

# 데이터프레임 업데이트
def update_dataframe_with_google(data):
    driver = setup_driver()
    try:
        for index, row in data.iterrows():
            if pd.isna(row['평점']) or pd.isna(row['리뷰수']) or pd.isna(row['주소']):
                print(f"검색 중: {row['이름']}...")
                query = f"{row['이름']} 대전 빵집"
                rating, reviews, address = fetch_google_data(driver, query)

                # 데이터 업데이트
                data.at[index, '평점'] = rating if rating else row['평점']
                data.at[index, '리뷰수'] = reviews if reviews else row['리뷰수']
                data.at[index, '주소'] = address if address else row['주소']

                time.sleep(2)  # 검색 제한 방지
    finally:
        driver.quit()

    return data

# 데이터 불러오기
input_path = r'C:\Users\SSAFY\MCL\S11P31B105\backend\data\csv_files\대전_빵집.csv'
data = pd.read_csv(input_path)

# 데이터 업데이트
updated_data = update_dataframe_with_google(data)

# 업데이트된 데이터 저장
output_path = r'C:\Users\SSAFY\MCL\S11P31B105\backend\data\csv_files\대전_빵집_업데이트.csv'
updated_data.to_csv(output_path, index=False, encoding='utf-8-sig')

print(f"업데이트된 데이터가 {output_path}에 저장되었습니다.")
