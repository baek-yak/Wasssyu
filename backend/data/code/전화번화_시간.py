import os
import pandas as pd
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from concurrent.futures import ThreadPoolExecutor, as_completed
from webdriver_manager.chrome import ChromeDriverManager
import time

# ChromeDriver 설정
def setup_driver():
    options = webdriver.ChromeOptions()
    # options.add_argument("--headless")  # 브라우저 숨김
    options.add_argument("--disable-images")  # 이미지 비활성화
    options.add_argument("--blink-settings=imagesEnabled=false")
    options.add_argument("--start-maximized")
    service = Service(ChromeDriverManager().install())
    return webdriver.Chrome(service=service, options=options)

# Google 검색에서 전화번호와 영업시간 가져오기
def fetch_contact_and_hours(place_name, index, total):
    driver = setup_driver()
    phone = "정보 없음"
    hours = "정보 없음"

    try:
        print(f"[{index}/{total}] '{place_name}' 처리 중...")
        search_query = f"{place_name} 대전"
        driver.get(f"https://www.google.com/search?q={search_query}")
        time.sleep(2)  # 페이지 로드 대기

        # 전화번호 가져오기
        try:
            phone_element = WebDriverWait(driver, 5).until(
                EC.presence_of_element_located((By.XPATH, "//span[contains(text(), '전화번호')]/following-sibling::span"))
            )
            phone = phone_element.text
        except:
            print(f"  - 전화번호 없음: {place_name}")

        # '펼쳐보기' 버튼 클릭
        try:
            expand_button = WebDriverWait(driver, 5).until(
                EC.element_to_be_clickable((By.CSS_SELECTOR, "span.BTP3Ac"))
            )
            expand_button.click()
            time.sleep(1)
        except:
            print(f"  - '펼쳐보기' 버튼 없음: {place_name}")

        # 영업시간 가져오기
        try:
            hours_table = WebDriverWait(driver, 5).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, "table.WgFkxc"))
            )
            rows = hours_table.find_elements(By.CSS_SELECTOR, "tr")
            operating_hours = []
            for row in rows:
                day = row.find_element(By.CSS_SELECTOR, "td.SKNSIb").text
                time_range = row.find_element(By.CSS_SELECTOR, "td:nth-child(2)").text
                operating_hours.append(f"{day}: {time_range}")
            hours = " | ".join(operating_hours)
        except:
            print(f"  - 영업시간 없음: {place_name}")

    finally:
        driver.quit()

    return phone, hours

# 병렬로 크롤링 수행
def process_places(dataframe):
    results = []
    total_places = len(dataframe)
    with ThreadPoolExecutor(max_workers=4) as executor:  # 병렬 작업 수 설정
        futures = {
            executor.submit(fetch_contact_and_hours, row["name"], idx + 1, total_places): idx
            for idx, row in dataframe.iterrows()
        }
        for future in as_completed(futures):
            idx = futures[future]
            try:
                results.append(future.result())
            except Exception as e:
                print(f"  - Error 처리 중: {e}")
                results.append(("정보 없음", "정보 없음"))
    return results

# 디렉토리 내 모든 파일 순회 및 크롤링 작업
def process_directory(input_dir, output_dir):
    os.makedirs(output_dir, exist_ok=True)

    for file_name in os.listdir(input_dir):
        if file_name.endswith(".csv"):
            input_path = os.path.join(input_dir, file_name)
            output_path = os.path.join(output_dir, file_name)

            print(f"파일 처리 중: {file_name}")
            data = pd.read_csv(input_path, encoding="utf-8-sig")

            # 전화번호와 영업시간 열 추가
            if "전화번호" not in data.columns:
                data["전화번호"] = None
            if "영업시간" not in data.columns:
                data["영업시간"] = None

            # 데이터 순회하며 크롤링
            print("크롤링 시작...")
            results = process_places(data)
            data["전화번호"], data["영업시간"] = zip(*results)

            # 업데이트된 데이터 저장
            data.to_csv(output_path, index=False, encoding="utf-8-sig")
            print(f"업데이트된 파일 저장됨: {output_path}")

# 실행
if __name__ == "__main__":
    input_directory = "/Users/gangbyeong-gyu/VSCodeProjects/ML/S11P31B105/backend/data/csv_files/my_datas"
    output_directory = "/Users/gangbyeong-gyu/VSCodeProjects/ML/S11P31B105/backend/data/csv_files/my_datas/updated"

    print("디렉토리 내 모든 CSV 파일을 순회하며 크롤링을 시작합니다...")
    process_directory(input_directory, output_directory)
    print("모든 작업이 완료되었습니다!")