import os
import csv
import time
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException
from bs4 import BeautifulSoup

def setup_driver():
    chrome_driver_path = r"C:\Users\SSAFY\MCL\S11P31B105\backend\data\chromedriver-win64\chromedriver.exe"
    options = webdriver.ChromeOptions()
    # options.add_argument('--headless')  # 디버깅을 위해 헤드리스 모드 비활성화
    options.add_argument('--start-maximized')
    service = Service(chrome_driver_path)
    return webdriver.Chrome(service=service, options=options)

def create_csv(save_dir):
    os.makedirs(save_dir, exist_ok=True)
    filename = os.path.join(save_dir, "대전_관광지.csv")
    
    with open(filename, mode="w", encoding="utf-8-sig", newline="") as file:
        writer = csv.writer(file)
        writer.writerow(["이름", "종류", "주소"])
    return filename

def wait_for_elements(driver, selector, timeout=10):
    try:
        return WebDriverWait(driver, timeout).until(
            EC.presence_of_all_elements_located((By.CSS_SELECTOR, selector))
        )
    except TimeoutException:
        print(f"Timeout waiting for elements: {selector}")
        return []

def scroll_to_bottom(driver):
    SCROLL_PAUSE_TIME = 2
    last_height = driver.execute_script("return document.documentElement.scrollHeight")
    
    while True:
        driver.execute_script("window.scrollTo(0, document.documentElement.scrollHeight);")
        time.sleep(SCROLL_PAUSE_TIME)
        
        new_height = driver.execute_script("return document.documentElement.scrollHeight")
        if new_height == last_height:
            break
        last_height = new_height
        print("Scrolling...")

def extract_data(driver):
    items = wait_for_elements(driver, "li[nm][idx]")
    data = []
    
    for item in items:
        try:
            name = item.get_attribute("nm")
            kind = item.find_element(By.CLASS_NAME, "rsfac").text.strip()
            address = item.find_element(By.CLASS_NAME, "rsaddr").text.strip()
            data.append([name, kind, address])
            print(f"추출된 데이터: {name} | {kind} | {address}")
        except Exception as e:
            print(f"데이터 추출 중 오류 발생: {str(e)}")
    
    return data

def main():
    save_dir = r"C:\Users\SSAFY\MCL\S11P31B105\backend\data\csv_files"
    url = "https://daejeontour.co.kr/ko/mapbase/mapbaseList.do?menuIdx=118&mapClId=tour"
    
    driver = setup_driver()
    filename = create_csv(save_dir)
    
    try:
        print("페이지 로딩 중...")
        driver.get(url)
        time.sleep(5)  # 초기 페이지 로딩 대기
        
        # 정보 더보기 버튼이 있다면 클릭
        try:
            more_button = WebDriverWait(driver, 10).until(
                EC.presence_of_element_located((By.CLASS_NAME, "more"))
            )
            driver.execute_script("arguments[0].click();", more_button)
            time.sleep(2)
        except:
            print("더보기 버튼을 찾을 수 없습니다.")
        
        print("페이지 스크롤 중...")
        scroll_to_bottom(driver)
        time.sleep(2)
        
        print("데이터 추출 중...")
        data = extract_data(driver)
        
        print(f"총 {len(data)}개의 항목을 찾았습니다.")
        
        # CSV 파일에 데이터 저장
        with open(filename, mode="a", encoding="utf-8-sig", newline="") as file:
            writer = csv.writer(file)
            for item in data:
                writer.writerow(item)
        
        print(f"데이터가 성공적으로 저장되었습니다: {filename}")
        
    except Exception as e:
        print(f"크롤링 중 오류 발생: {str(e)}")
    
    finally:
        driver.quit()

if __name__ == "__main__":
    main()