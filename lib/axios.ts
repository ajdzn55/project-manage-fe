import axios, { type AxiosError } from 'axios';

export interface ApiErrorResponse {
  message: string | string[];
  statusCode?: number;
  error?: string;
}

/**
 * Axios 공통 인스턴스 생성
 */
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10_000,
  withCredentials: true,
});

/**
 * Response Interceptor
 */
axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorResponse>) => {
    return Promise.reject(error);
  },
);

export default axiosInstance;
