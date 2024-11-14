import pandas as pd
import os

def split_csv_by_category():
    # 입력 및 출력 디렉토리 설정
    input_dir = r"C:\Users\SSAFY\MCL\S11P31B105\backend\data\csv_files"
    output_dir = input_dir  # 같은 디렉토리에 저장
    
    # 입력 파일 경로
    input_file = os.path.join(input_dir, "대전_관광지.csv")
    
    # CSV 파일 읽기
    try:
        df = pd.read_csv(input_file, encoding='utf-8-sig')
        print(f"원본 파일 읽기 완료. 총 {len(df)}개의 데이터가 있습니다.")
    except Exception as e:
        print(f"파일 읽기 오류: {str(e)}")
        return

    # 파일명 매핑
    category_files = {
        "역사명소": "대전_역사명소.csv",
        "문화명소": "대전_문화명소.csv",
        "생태환경명소": "대전_생태환경명소.csv",
        "과학명소": "대전_과학명소.csv",
        "대표명소": "대전시_대표명소.csv",
        "기타명소": "대전_기타명소.csv"
    }

    # 각 카테고리별로 파일 생성
    for category, filename in category_files.items():
        # 해당 카테고리의 데이터만 필터링
        category_df = df[df['종류'] == category]
        
        if len(category_df) > 0:
            # 파일 저장
            output_file = os.path.join(output_dir, filename)
            category_df.to_csv(output_file, encoding='utf-8-sig', index=False)
            print(f"{filename}: {len(category_df)}개의 데이터 저장 완료")
        else:
            print(f"{category}: 해당하는 데이터가 없습니다.")

    print("\n분할 작업이 완료되었습니다.")
    
    # 각 파일의 데이터 수 확인
    print("\n각 파일의 데이터 수:")
    for filename in os.listdir(output_dir):
        if filename.endswith('.csv') and filename != "대전_관광지.csv":
            try:
                df = pd.read_csv(os.path.join(output_dir, filename), encoding='utf-8-sig')
                print(f"{filename}: {len(df)}개")
            except:
                continue

if __name__ == "__main__":
    split_csv_by_category()