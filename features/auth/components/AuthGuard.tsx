'use client';

import { type ReactNode, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useLoginInfoQuery } from '@/features/user/hooks/useUser';
import { ClipLoader } from 'react-spinners';

interface Props {
  children: ReactNode;
}

const AuthGuard = ({ children }: Props) => {
  const router = useRouter();

  // 로그인 없이 접근 가능한 페이지 확인
  const pathname = usePathname();
  const isPublicPage = ['/login', '/sign-up'].includes(pathname);

  // 로그인이 필요한 페이지에서 사용자 정보 조회
  const { isPending, error } = useLoginInfoQuery(!isPublicPage);

  // 로그인 없이 접근 시도 시 차단
  useEffect(() => {
    if (!isPublicPage && error) {
      router.replace('/login');
    }
  }, [error, isPublicPage, router]);

  if (isPublicPage) return children;

  if (isPending)
    return (
      <ClipLoader
        color="#fff"
        loading
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    );

  if (error) return null;

  return children;
};

export default AuthGuard;
