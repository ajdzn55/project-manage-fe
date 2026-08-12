import axios, {AxiosError} from "axios";

export interface ApiErrorResponse {
  message: string;
  statusCode?: number;
  error?: string;
}

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_HOST,
  timeout: 10_000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
    (response) => response,
    (error: AxiosError<ApiErrorResponse>) => {
      return Promise.reject(error);
    }
)

export default axiosInstance;