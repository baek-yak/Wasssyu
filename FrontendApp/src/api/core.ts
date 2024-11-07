import axios, {AxiosRequestHeaders, InternalAxiosRequestConfig, AxiosResponse} from 'axios';
import {getTokens, saveTokens} from '../utills/tokenStorage';

export const BASE_URL = 'https://k11b105.p.ssafy.io/wassu';

const config = {
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
};

// axios 인스턴스 생성
export const api = axios.create(config);
export const Authapi = axios.create(config);

// 요청 인터셉터: 요청 시 액세스 토큰을 자동으로 추가
Authapi.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const {accessToken} = await getTokens();
    if (accessToken) {
      config.headers = config.headers || {};
      (config.headers as AxiosRequestHeaders).Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

// 응답 인터셉터: 401 에러 발생 시 리프레시 토큰으로 액세스 토큰 재발급
Authapi.interceptors.response.use(
  (response: AxiosResponse) => response,
  async error => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const {refreshToken} = await getTokens();
      if (refreshToken) {
        try {
          const response = await axios.post(`${BASE_URL}/auth/refresh`, {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          });
          const {access: newAccessToken} = response.data;

          await saveTokens(newAccessToken, refreshToken);

          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return Authapi(originalRequest);
        } catch (refreshError) {
          console.error('Token refresh failed:', refreshError);
        }
      }
    }
    return Promise.reject(error);
  },
);
