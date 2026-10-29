import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios';

// 호출부에서 전달하기 위한 타입 확장
declare module 'axios' {
  interface AxiosRequestConfig {
    skipAuthRefresh?: boolean; // 토큰 재발급 시도를 제외할지 여부
  }
}

// Axios 인터셉터가 요청 처리 중 내부적으로 추가하는 상태를 위한 타입
interface RetryRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean; // refresh를 통한 재시도를 이미 했는지 여부
}

// API 오류 응답 타입
export interface ApiErrorResponse {
  message: string | string[];
  statusCode?: number;
  error?: string;
}

// 진행 중인 refresh 요청
let refreshPromise: Promise<void> | null = null;

/**
 * 클라이언트 컴포넌트에서 사용하는 Axios 공통 인스턴스 생성
 */
const clientAxios = axios.create({
  baseURL: '/api/backend',
  timeout: 10_000,
});

// 토큰 갱신 API만 호출하는 별도 인스턴스
const refreshAxiosInstance = axios.create({
  baseURL: '/api/backend',
  timeout: 10_000,
});

const refreshAccessToken = async () => {
  try {
    await refreshAxiosInstance.post<void>('/auth/refresh');
  } finally {
    // 완료된 refresh Promise 초기화
    refreshPromise = null;
  }
};

/**
 * Response Interceptor
 */
clientAxios.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<ApiErrorResponse>) => {
    const originalRequest = error.config as RetryRequestConfig | undefined;

    if (
      error.response?.status !== 401 ||
      !originalRequest ||
      originalRequest.skipAuthRefresh
    ) {
      return Promise.reject(error);
    }

    // 이미 refresh 후 재시도한 요청인 경우
    if (originalRequest._retry) {
      return Promise.reject(error);
    }
    // 재시도 표시 (무한 재요청 방지를 위함)
    originalRequest._retry = true;

    try {
      // 동시 refresh 제어
      // refreshPromise가 null이면 refreshAccessToken() 실행 결과를 저장
      // 이미 Promise가 있으면 새 refresh를 실행하지 않고 기존 Promise 사용
      // await으로 쿠키 갱신이 끝날 때까지 기다림
      await (refreshPromise ??= refreshAccessToken());

      // 원래 요청 재시도
      return clientAxios(originalRequest);
    } catch (refreshError) {
      return Promise.reject(refreshError);
    }
  },
);

export default clientAxios;
