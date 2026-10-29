import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

/**
 * Route Handler
 * Next.js 서버에서 실행된다.
 * 서버 컴포넌트에서 401 에러가 발생하면 이곳으로 리다이렉트 한다.
 * 토큰을 갱신하여 Set-Cookie로 브라우저 쿠키를 변경한다.
 * 원래 경로로 리다이렉트 한다.
 */

const getReturnTo = (request: NextRequest) => {
  const returnTo = request.nextUrl.searchParams.get('returnTo');

  const isValid =
    returnTo?.startsWith('/') &&
    !returnTo.startsWith('//') &&
    !returnTo.startsWith('/login') &&
    !returnTo.startsWith('/api/auth/refresh');

  return returnTo && isValid ? returnTo : '/project';
};

// 토큰 갱신 불가능한 경우 로그인 페이지 리다이렉트 응답 생성
const redirectToLogin = (request: NextRequest, returnTo: string) => {
  // 현재 요청의 출처를 기준으로 로그인 URL 생성
  const loginUrl = new URL('/login', request.url);
  loginUrl.searchParams.set('returnTo', returnTo);

  return NextResponse.redirect(loginUrl);
};

// GET /api/auth/refresh 요청을 처리하는 함수
export async function GET(request: NextRequest) {
  const returnTo = getReturnTo(request);
  // 브라우저가 Vercel에 보낸 refreshToken 쿠키
  const refreshToken = request.cookies.get('refreshToken')?.value;
  const apiUrl = process.env.API_URL;

  if (!refreshToken || !apiUrl) {
    return redirectToLogin(request, returnTo);
  }

  try {
    const refreshUrl = new URL(
      'auth/refresh',
      apiUrl.endsWith('/') ? apiUrl : `${apiUrl}/`,
    );

    // 토큰 갱신
    const backendResponse = await fetch(refreshUrl, {
      method: 'POST',
      headers: {
        Cookie: `refreshToken=${refreshToken}`,
      },
      cache: 'no-store',
      signal: AbortSignal.timeout(10_000),
    });

    if (!backendResponse.ok) {
      return redirectToLogin(request, returnTo);
    }

    const response = NextResponse.redirect(new URL(returnTo, request.url));

    backendResponse.headers.getSetCookie().forEach((cookie) => {
      response.headers.append('set-cookie', cookie);
    });

    return response;
  } catch {
    return redirectToLogin(request, returnTo);
  }
}
