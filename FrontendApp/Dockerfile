# 1. Node.js 이미지 사용
FROM node:16 as builder

# 2. 작업 디렉토리 설정
WORKDIR /app

# 3. 의존성 설치
COPY package.json package-lock.json ./
RUN npm install

# 4. 소스 코드 복사
COPY . .

# 5. Metro 서버 실행 (빌드 및 개발 환경)
CMD ["npx", "react-native", "start"]
