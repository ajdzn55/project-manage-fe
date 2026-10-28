import 'server-only';
import axios from 'axios';
import { cookies } from 'next/headers';

/**
 * 서버 컴포넌트 요청마다 독립적인 Axios 인스턴스 생성
 */
const createServerAxios = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value || '';

  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 10_000,
    headers: {
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
  });

  /**
   * Response Interceptor
   */
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      return Promise.reject(error);
    },
  );

  return instance;
};

export default createServerAxios;
