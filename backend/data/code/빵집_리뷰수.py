from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import pandas as pd
import time

# ChromeDriver 설정
def setup_driver():
    chrome_driver_path = r"C:\Users\SSAFY\MCL\S11P31B105\backend\data\chromedriver-win64\chromedriver.exe"
    options = webdriver.ChromeOptions()
    # options.add_argument('--headless')  # 브라우저 창을 띄우지 않도록 주석 처리
    options.add_argument('--start-maximized')
    service = Service(chrome_driver_path)
    return webdriver.Chrome(service=service, options=options)

# Google에서 검색 및 리뷰 수 가져오기
def fetch_reviews(driver, place_name):
    search_query = f"{place_name}"
    driver.get(f"https://www.google.com/search?q={search_query}")
    time.sleep(2)  # 페이지 로딩 대기

    try:
        # Google 리뷰 수 요소 찾기
        review_element = WebDriverWait(driver, 3).until(
            EC.presence_of_element_located((By.XPATH, "//span[contains(text(), 'Google 리뷰')]"))
        )
        reviews_text = review_element.text
        reviews = int(''.join(filter(str.isdigit, reviews_text)))  # 숫자만 추출
        return reviews
    except:
        return None

# 데이터프레임 업데이트
def update_reviews(data):
    driver = setup_driver()
    try:
        for index, row in data.iterrows():
            if pd.isna(row['리뷰수']):  # 리뷰수가 없는 경우에만 검색
                print(f"검색 중: {row['이름']}...")
                reviews = fetch_reviews(driver, row['이름'])
                data.at[index, '리뷰수'] = reviews if reviews is not None else row['리뷰수']
                time.sleep(2)  # 검색 제한 방지
    finally:
        driver.quit()
    return data

# 데이터 로드
input_path = r'C:\Users\SSAFY\MCL\S11P31B105\backend\data\csv_files\대전_빵집_업데이트.csv'
data = pd.read_csv(input_path, encoding='utf-8')

# 데이터 업데이트
updated_data = update_reviews(data)

# 업데이트된 데이터 저장
output_path = r'C:\Users\SSAFY\MCL\S11P31B105\backend\data\csv_files\대전_빵집_리뷰수_업데이트.csv'
updated_data.to_csv(output_path, index=False, encoding='utf-8-sig')

print(f"업데이트된 데이터가 {output_path}에 저장되었습니다.")
