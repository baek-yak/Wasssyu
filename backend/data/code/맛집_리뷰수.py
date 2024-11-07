import pandas as pd
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

# ChromeDriver 설정
def setup_driver():
    chrome_driver_path = r"C:\Users\SSAFY\MCL\S11P31B105\backend\data\chromedriver-win64\chromedriver.exe"
    options = webdriver.ChromeOptions()
    # options.add_argument('--headless')  # 브라우저를 띄우지 않으려면 주석 해제
    options.add_argument('--start-maximized')
    service = Service(chrome_driver_path)
    return webdriver.Chrome(service=service, options=options)

# Google에서 평점과 리뷰수 가져오기
def fetch_google_reviews(driver, place_name):
    search_query = f"대전 {place_name}"
    driver.get(f"https://www.google.com/search?q={search_query}")
    time.sleep(2)  # 페이지 로딩 대기

    try:
        # 평점 가져오기
        rating_elem = WebDriverWait(driver, 3).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, "span.Aq14fc"))
        )
        rating = float(rating_elem.text)

        # 리뷰 수 가져오기
        review_elem = WebDriverWait(driver, 3).until(
            EC.presence_of_element_located((By.XPATH, "//span[contains(text(), 'Google 리뷰')]"))
        )
        reviews_text = review_elem.text
        reviews = int(''.join(filter(str.isdigit, reviews_text)))

        return rating, reviews
    except Exception as e:
        print(f"Error fetching reviews for {place_name}: {e}")
        return None, None

# 데이터 업데이트
def update_csv_with_reviews(input_path, output_path):
    data = pd.read_csv(input_path, encoding='utf-8-sig')
    driver = setup_driver()

    try:
        for idx, row in data.iterrows():
            if pd.isna(row['평점']) or pd.isna(row['리뷰수']):  # 결측치만 크롤링
                print(f"Fetching data for: {row['이름']}")
                rating, reviews = fetch_google_reviews(driver, row['이름'])
                data.at[idx, '평점'] = rating
                data.at[idx, '리뷰수'] = reviews
                time.sleep(2)  # Google 크롤링 제한 방지

    finally:
        driver.quit()

    # 데이터 저장
    data.to_csv(output_path, index=False, encoding='utf-8-sig')
    print(f"업데이트된 데이터가 {output_path}에 저장되었습니다.")

# 실행 코드
input_file = r"C:\Users\SSAFY\MCL\S11P31B105\backend\data\대전_맛집.csv"
output_file = r"C:\Users\SSAFY\MCL\S11P31B105\backend\data\대전_맛집_업데이트.csv"

update_csv_with_reviews(input_file, output_file)
