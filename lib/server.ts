import 'server-only';
import axios from 'axios';
import { cookies } from 'next/headers';

/**
 * 서버 컴포넌트에서 사용하는 Axios 공통 인스턴스 생성
 * 요청마다 독립적인 Axios 인스턴스를 새로 생성하는 것이 안전하다.
 * 인스턴스를 전역으로 공유하면 쿠키, 헤더, 인증 토큰 같은 사용자별 요청 데이터가
 * 여러 요청 간에 섞이는 심각한 보안 이슈(Cross-Request Pollution)가 발생할 수 있기 때문
 */

const createServerAxios = async () => {
  // server-only에 의해 불필요한 코드
  // const isServer = environmentManager.isServer();
  // if (isServer) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value || '';
  // }

  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 10_000,
    headers: {
      // 요청 본문으로 일반 객체를 전달하면 Axios가 JSON으로 직렬화하면서 application/json을 설정한다.
      // 'Content-Type': 'application/json',
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
  });

  /**
   * Response Interceptor
   */
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      // 에러 로깅 또는 공통 에러 핸들링
      return Promise.reject(error);
    },
  );

  return instance;
};

export default createServerAxios;
