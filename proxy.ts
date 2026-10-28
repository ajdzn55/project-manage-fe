import { NextResponse, type NextRequest } from 'next/server';

/**
 * 현재 요청 URL을 확인하고 x-return-to request header 설정
 */
export function proxy(request: NextRequest) {
  const returnTo = `${request.nextUrl.pathname}${request.nextUrl.search}`;

  // 클라이언트가 임의로 보낸 값을 사용하지 않고 Proxy에서 덮어쓴다.
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-return-to', returnTo);

  // 쿠키 자체가 없으면 API 조회 전에 바로 로그인 화면으로 이동
  if (!request.cookies.has('accessToken')) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('returnTo', returnTo);

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: [
    '/project/:path*',
    '/my-task/:path*',
    '/calendar/:path*',
    '/profile/:path*',
  ],
};
