from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import pandas as pd
import time

def setup_driver():
    # Chrome 옵션 설정
    chrome_options = Options()
    chrome_options.add_argument('--headless')  # 헤드리스 모드
    chrome_options.add_argument('--no-sandbox')
    chrome_options.add_argument('--disable-dev-shm-usage')
    
    # Chrome 드라이버 설정
    service = Service(r"C:\Users\SSAFY\MCL\S11P31B105\backend\data\chromedriver-win64\chromedriver.exe")  # chromedriver 경로를 지정하세요
    driver = webdriver.Chrome(service=service, options=chrome_options)
    return driver

def scrape_restaurant_info():
    try:
        driver = setup_driver()
        url = "https://daejeontour.co.kr/ko/mapbase/mapbaseList.do?menuIdx=126&mapClId=restrnt01"
        driver.get(url)
        
        # 페이지가 로드될 때까지 대기
        time.sleep(3)
        
        # 음식점 정보를 저장할 리스트
        restaurants = []
        
        # 음식점 리스트 아이템 찾기
        restaurant_items = driver.find_elements(By.CSS_SELECTOR, 'li[idx]')
        
        for item in restaurant_items:
            try:
                name = item.find_element(By.CSS_SELECTOR, 'strong.rsname').text
                category = item.find_element(By.CSS_SELECTOR, 'span.rsfac').text
                address = item.find_element(By.CSS_SELECTOR, 'span.rsaddr').text
                
                restaurants.append({
                    '이름': name,
                    '종류': category,
                    '주소': address,
                    '평점': None,
                    '리뷰수': None
                })
            except Exception as e:
                print(f"항목 처리 중 오류 발생: {str(e)}")
                continue
        
        # DataFrame 생성 및 저장
        df = pd.DataFrame(restaurants)
        df.to_csv('대전_맛집.csv', index=False, encoding='utf-8-sig')
        
        print("크롤링이 완료되었습니다. '대전_맛집.csv' 파일이 생성되었습니다.")
        
    except Exception as e:
        print(f"크롤링 중 오류가 발생했습니다: {str(e)}")
    
    finally:
        driver.quit()

if __name__ == "__main__":
    scrape_restaurant_info()