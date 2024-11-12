# Conda 환경을 제공하는 기본 이미지로 시작
FROM continuumio/miniconda3

# 작업 디렉토리를 /app으로 설정
WORKDIR /app

# requirements.txt 파일과 config.py를 로컬 구조대로 복사
COPY config.py /app/config.py
COPY backend/ /app/backend

# Python 3.9.20을 Conda로 설치
RUN conda install python=3.9.20 -y

# fastapi_env라는 새로운 Conda 환경 생성 및 활성화
RUN conda create -n fastapi_env python=3.9.20 -y && \
    echo "source activate fastapi_env" > ~/.bashrc

# SHELL 명령어를 통해 환경 활성화 설정
SHELL ["conda", "run", "-n", "fastapi_env", "/bin/bash", "-c"]

# PostgreSQL 클라이언트 및 필수 라이브러리 설치
RUN apt-get update && apt-get install -y \
    libpq-dev \
    postgresql-client \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# PYTHONPATH 설정으로 fast_api를 루트로 추가
ENV PYTHONPATH=/app/backend/fast_api

# /app/backend/requirements.txt 파일을 사용하여 필요한 패키지 설치
RUN pip install --no-cache-dir -r /app/backend/requirements.txt

# FastAPI 애플리케이션 실행 명령어
CMD ["conda", "run", "-n", "fastapi_env", "uvicorn", "backend.fast_api.main:app", "--host", "0.0.0.0", "--port", "8000"]