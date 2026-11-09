import 'server-only';
import axios, { isAxiosError } from 'axios';
import { cookies, headers } from 'next/headers';
import { toApiError } from '@/utils/error';
import { redirect } from 'next/navigation';

/**
 * 서버 컴포넌트 요청마다 독립적인 Axios 인스턴스 생성
 */
const createServerAxios = async () => {
  const cookieStore = await cookies();
  const requestHeaders = await headers();

  const accessToken = cookieStore.get('accessToken')?.value || '';
  const returnTo = requestHeaders.get('return-to') ?? '/project';

  const instance = axios.create({
    baseURL: process.env.API_URL,
    timeout: 10_000,
    headers: {
      ...(accessToken ? { Cookie: `accessToken=${accessToken}` } : {}),
    },
  });

  /**
   * Response Interceptor
   */
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (isAxiosError(error) && error.response?.status === 401) {
        redirect(`/api/auth/refresh?returnTo=${encodeURIComponent(returnTo)}`);
      }

      return Promise.reject(toApiError(error));
    },
  );

  return instance;
};

export default createServerAxios;
