# Conda 환경을 제공하는 기본 이미지로 시작
FROM continuumio/miniconda3

# 작업 디렉토리를 /app으로 설정
WORKDIR /app

# PostgreSQL 클라이언트 및 필수 라이브러리 설치
RUN apt-get update && apt-get install -y \
    libpq-dev \
    postgresql-client \
    build-essential && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# requirements.txt만 별도로 복사하여 캐싱 최적화
COPY backend/requirements.txt /app/backend/requirements.txt

# Conda 환경 생성 및 패키지 설치
RUN conda create -n fastapi_env python=3.10.11 -y && \
    conda run -n fastapi_env pip install --no-cache-dir -r /app/backend/requirements.txt && \
    conda clean -afy

# SHELL 명령어를 통해 환경 활성화 설정
SHELL ["conda", "run", "-n", "fastapi_env", "/bin/bash", "-c"]

# PYTHONPATH 설정으로 fast_api를 루트로 추가
ENV PYTHONPATH=/app/backend/fast_api

# 나머지 코드 복사 (변경된 경우에만 캐시 무효화)
COPY backend/ /app/backend
COPY config.py /app/config.py

# FastAPI 애플리케이션 실행 명령어
CMD ["conda", "run", "--no-capture-output", "-n", "fastapi_env", "uvicorn", "backend.fast_api.main:app", "--host", "0.0.0.0", "--port", "8000", "--log-level", "debug"]
