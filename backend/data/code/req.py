import subprocess

# conda list 실행 및 결과 가져오기
result = subprocess.run(['conda', 'list'], capture_output=True, text=True)

# 결과 처리 및 파일에 쓰기
output_file_path = '/Users/gangbyeong-gyu/VSCodeProjects/ML/S11P31B105/backend/requirements.txt'

with open(output_file_path, 'w') as f:
    for line in result.stdout.split('\n'):
        if line and not line.startswith('#'):  # 주석 제거
            parts = line.split()
            if len(parts) >= 2 and not parts[0].startswith('pypi'):  # pypi 제외
                package_name = parts[0]
                package_version = parts[1]
                f.write(f"{package_name}>={package_version}\n")  # '>=' 형식으로 작성

print(f"Requirements file has been saved to {output_file_path}")