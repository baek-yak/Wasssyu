import subprocess

# conda list 실행 및 결과 가져오기
result = subprocess.run(['conda', 'list'], capture_output=True, text=True)

# 결과 처리 및 파일에 쓰기
with open('/Users/gangbyeong-gyu/VSCodeProjects/ML/S11P31B105/backend/requirements.txt', 'w') as f:
    for line in result.stdout.split('\n'):
        if line and not line.startswith('#'):
            parts = line.split()
            if len(parts) >= 2:
                f.write(f"{parts[0]}=={parts[1]}\n")  # = 대신 == 사용