from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

def setup_driver():
    chrome_driver_path = r"C:\Users\SSAFY\MCL\S11P31B105\backend\data\chromedriver-win64\chromedriver.exe"  # ChromeDriver 경로
    options = webdriver.ChromeOptions()
    # options.add_argument('--headless')  # 브라우저 숨기기
    options.add_argument('--start-maximized')
    service = Service(chrome_driver_path)
    return webdriver.Chrome(service=service, options=options)

def search_naver_place(driver, place_name):
    """네이버 플레이스에서 검색 후 첫 번째 결과 클릭"""
    search_query = f"대전 {place_name}"
    url = f"https://map.naver.com/v5/search/{search_query}"
    driver.get(url)
    time.sleep(3)  # 페이지 로드 대기

    try:
        # 첫 번째 iframe 전환
        iframe = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, "iframe"))
        )
        driver.switch_to.frame(iframe)

        # 첫 번째 검색 결과 클릭
        first_result = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, "a.search_title"))
        )
        first_result.click()

        # 첫 번째 검색 결과로 이동 성공
        print(f"'{place_name}'의 첫 번째 검색 결과로 이동했습니다.")

    except Exception as e:
        print(f"Error accessing search result for {place_name}: {e}")

if __name__ == "__main__":
    # ChromeDriver 실행
    driver = setup_driver()

    try:
        # 네이버 플레이스 검색 및 첫 번째 결과 클릭
        place_to_search = "하레하레 둔산점"
        search_naver_place(driver, place_to_search)
        time.sleep(5)  # 페이지 확인용 대기

    finally:
        driver.quit()
