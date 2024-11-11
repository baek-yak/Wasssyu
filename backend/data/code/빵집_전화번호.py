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
    # options.add_argument('--headless')  # 브라우저 숨기기 옵션
    options.add_argument('--start-maximized')
    service = Service(chrome_driver_path)
    return webdriver.Chrome(service=service, options=options)

# Google 검색에서 전화번호와 영업시간 가져오기
def fetch_contact_and_hours_google(driver, place_name):
    search_query = f"{place_name} 대전"
    driver.get(f"https://www.google.com/search?q={search_query}")
    time.sleep(3)  # 페이지 로드 대기

    phone = "정보 없음"
    hours = "정보 없음"

    try:
        # 전화번호 가져오기
        try:
            phone_element = WebDriverWait(driver, 5).until(
                EC.presence_of_element_located((By.XPATH, "//span[contains(text(), '전화번호')]/following-sibling::span"))
            )
            phone = phone_element.text
        except:
            print(f"전화번호 없음: {place_name}")

        # 영업시간 가져오기
        try:
            # '펼쳐보기' 버튼 클릭
            try:
                expand_button = WebDriverWait(driver, 5).until(
                    EC.element_to_be_clickable((By.CSS_SELECTOR, "span.BTP3Ac"))
                )
                expand_button.click()
                time.sleep(2)  # 클릭 후 대기
            except:
                print(f"'펼쳐보기' 버튼 없음: {place_name}")

            # 영업시간 테이블 가져오기
            hours_table = WebDriverWait(driver, 5).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, "table.WgFkxc"))
            )
            rows = hours_table.find_elements(By.CSS_SELECTOR, "tr")
            operating_hours = []
            for row in rows:
                day = row.find_element(By.CSS_SELECTOR, "td.SKNSIb").text
                time_range = row.find_elements(By.CSS_SELECTOR, "td")[1].text
                operating_hours.append(f"{day}: {time_range}")
            hours = " | ".join(operating_hours)
        except:
            print(f"영업시간 없음: {place_name}")

    except Exception as e:
        print(f"Error fetching details for {place_name}: {e}")

    return phone, hours

# 기존 데이터 업데이트
def update_csv_with_contact_and_hours(input_path, output_path):
    # CSV 파일 읽기
    data = pd.read_csv(input_path, encoding='utf-8-sig')

    # 전화번호와 영업시간 열 추가
    if '전화번호' not in data.columns:
        data['전화번호'] = None
    if '영업시간' not in data.columns:
        data['영업시간'] = None

    driver = setup_driver()

    try:
        for idx, row in data.iterrows():
            if pd.isna(row['전화번호']) or pd.isna(row['영업시간']):  # 결측치만 크롤링
                print(f"Fetching data for: {row['이름']}")
                phone, hours = fetch_contact_and_hours_google(driver, row['이름'])
                data.at[idx, '전화번호'] = phone
                data.at[idx, '영업시간'] = hours
                time.sleep(2)  # 요청 간격 조정

    finally:
        driver.quit()

    # 업데이트된 데이터 저장
    data.to_csv(output_path, index=False, encoding='utf-8-sig')
    print(f"업데이트된 데이터가 {output_path}에 저장되었습니다.")

# 실행
if __name__ == "__main__":
    input_file = r"C:\Users\SSAFY\MCL\S11P31B105\backend\data\csv_files\대전_빵집.csv"  # 기존 파일 경로
    output_file = r"C:\Users\SSAFY\MCL\S11P31B105\backend\data\csv_files\대전_빵집_업데이트.csv"  # 업데이트 파일 경로

    print("Google 검색을 통한 전화번호와 영업시간 크롤링을 시작합니다...")
    update_csv_with_contact_and_hours(input_file, output_file)
    print(f"완료! 업데이트된 데이터는 {output_file}에 저장되었습니다.")
