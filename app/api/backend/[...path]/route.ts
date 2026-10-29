import type { NextRequest } from 'next/server';

/**
 * Catch-all Route Handler
 * 브라우저의 요청을 받아 백엔드 서버로 전달하고 응답을 브라우저에 전달한다.
 * 여러 API 요청 경로를 동적으로 받아 이곳에서 한 번에 중계한다.
 */

// 요청 헤더: 응답 형식, 요청 본문 타입
const FORWARDED_REQUEST_HEADERS = ['accept', 'content-type'] as const;
// 응답 헤더: 응답 캐시 정책, 파일 다운로드 관련 정보, 응답 형식
const FORWARDED_RESPONSE_HEADERS = [
  'cache-control',
  'content-disposition',
  'content-type',
] as const;
// 인증 쿠키
const AUTH_COOKIE_NAMES = ['accessToken', 'refreshToken'] as const;
const BODYLESS_STATUS_CODES = new Set([204, 205, 304]);

interface RouteContext {
  params: Promise<{ path: string[] }>;
}

// 백엔드 API 요청 URL 생성
const getBackendUrl = (path: string[], search: string) => {
  const apiUrl = process.env.API_URL;

  if (!apiUrl) {
    throw new Error('API_URL is not configured.');
  }

  const baseUrl = apiUrl.endsWith('/') ? apiUrl : `${apiUrl}/`;
  const encodedPath = path.map(encodeURIComponent).join('/');
  const backendUrl = new URL(encodedPath, baseUrl);
  backendUrl.search = search;

  return backendUrl;
};

// 요청 헤더 생성
const createBackendHeaders = (request: NextRequest) => {
  const headers = new Headers();

  FORWARDED_REQUEST_HEADERS.forEach((name) => {
    const value = request.headers.get(name);

    if (value) {
      headers.set(name, value);
    }
  });

  const authCookies = AUTH_COOKIE_NAMES.flatMap((name) => {
    const cookie = request.cookies.get(name);

    return cookie ? [`${cookie.name}=${cookie.value}`] : [];
  });

  if (authCookies.length > 0) {
    headers.set('cookie', authCookies.join('; '));
  }

  return headers;
};

// 클라이언트에 돌려줄 응답 헤더 생성
const createClientHeaders = (backendResponse: Response) => {
  const headers = new Headers();

  FORWARDED_RESPONSE_HEADERS.forEach((name) => {
    const value = backendResponse.headers.get(name);

    if (value) {
      headers.set(name, value);
    }
  });

  backendResponse.headers.getSetCookie().forEach((cookie) => {
    headers.append('set-cookie', cookie);
  });

  return headers;
};

// 요청 중계
const forwardRequest = async (
  request: NextRequest,
  { params }: RouteContext,
) => {
  try {
    const { path } = await params;
    const backendUrl = getBackendUrl(path, request.nextUrl.search);
    const hasRequestBody = !['GET', 'HEAD'].includes(request.method);

    const backendResponse = await fetch(backendUrl, {
      method: request.method,
      headers: createBackendHeaders(request),
      body: hasRequestBody ? await request.arrayBuffer() : undefined,
      cache: 'no-store',
      signal: AbortSignal.timeout(10_000),
    });

    const hasResponseBody =
      request.method !== 'HEAD' &&
      !BODYLESS_STATUS_CODES.has(backendResponse.status);

    return new Response(hasResponseBody ? backendResponse.body : null, {
      status: backendResponse.status,
      headers: createClientHeaders(backendResponse),
    });
  } catch {
    // 연결 실패 처리
    return Response.json(
      { message: '백엔드 서비스에 연결할 수 없습니다.' },
      { status: 502 }, // Bad Gateway
    );
  }
};

// HTTP 메서드 이름으로 export
export const GET = forwardRequest;
export const POST = forwardRequest;
export const PUT = forwardRequest;
export const PATCH = forwardRequest;
export const DELETE = forwardRequest;
export const HEAD = forwardRequest;
