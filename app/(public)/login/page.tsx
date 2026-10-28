import LoginForm from '@/features/auth/components/LoginForm';
import { getLoginInfo } from '@/features/user/api/user.server';
import { redirect } from 'next/navigation';
import { isAxiosError } from 'axios';
import type { LoginInfo } from '@/features/user/types/user.type';

interface Props {
  searchParams: Promise<{ returnTo?: string | string[] }>;
}

export default async function LoginPage({ searchParams }: Props) {
  const params = await searchParams;
  const returnTo = Array.isArray(params.returnTo)
    ? params.returnTo[0]
    : params.returnTo;

  // 복귀 경로 검증
  const isValidReturnTo =
    returnTo?.startsWith('/') &&
    !returnTo.startsWith('//') &&
    !returnTo.startsWith('/login') &&
    !returnTo.startsWith('/sign-up');

  const destination = returnTo && isValidReturnTo ? returnTo : '/project';

  let loginInfo: LoginInfo | null = null;

  try {
    loginInfo = await getLoginInfo();
  } catch (error) {
    if (!isAxiosError(error) || error.response?.status !== 401) {
      throw error;
    }
  }

  // 이미 로그인한 사용자는 검증된 복귀 경로로 즉시 이동
  if (loginInfo) {
    redirect(destination);
  }

  return <LoginForm destination={destination} />;
}
