import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios';
import type { Token } from '@/features/auth/types/token.type';

export interface ApiErrorResponse {
  message: string | string[];
  statusCode?: number;
  error?: string;
}

// Axios 요청 객체 타입 확장
interface RetryRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

let accessToken: string | null = null;
let refreshPromise: Promise<Token> | null = null;

/**
 * Axios 공통 인스턴스 생성
 */
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10_000,
  withCredentials: true,
});
const refreshAxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10_000,
  withCredentials: true,
});

export const setAccessToken = (token: string) => {
  accessToken = token;
};
export const clearAccessToken = () => {
  accessToken = null;
};

const refreshAccessToken = async () => {
  try {
    const response = await refreshAxiosInstance.post<Token>('/auth/refresh');
    const accessToken = response.data.accessToken;

    setAccessToken(accessToken);

    return response.data;
  } finally {
    refreshPromise = null;
  }
};

/**
 * Request Interceptor
 */
axiosInstance.interceptors.request.use(
  (config) => {
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error: AxiosError<ApiErrorResponse>) => {
    return Promise.reject(error);
  },
);

/**
 * Response Interceptor
 */
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<ApiErrorResponse>) => {
    const originalRequest = error.config as RetryRequestConfig | undefined;

    // 일반 에러 발생 시
    if (error.response?.status !== 401 || !originalRequest) {
      return Promise.reject(error);
    }

    // 이미 토큰 재발급하여 요청을 재시도 하지 않은 경우
    if (originalRequest._retry) {
      clearAccessToken();
      return Promise.reject(error);
    }
    // 무한 재요청 방지를 위함
    originalRequest._retry = true;

    try {
      // 여러 요청이 동시에 실패해도 재발급은 한 번만 실행
      refreshPromise ??= refreshAccessToken();

      const newToken = await refreshPromise;
      originalRequest.headers.Authorization = `Bearer ${newToken.accessToken}`;

      return axiosInstance(originalRequest);
    } catch (refreshError) {
      clearAccessToken();
      return Promise.reject(refreshError);
    }
  },
);

export default axiosInstance;
