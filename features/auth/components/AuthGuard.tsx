'use client';

import { type ReactNode } from 'react';
import { redirect, usePathname } from 'next/navigation';
import { useLoginInfoQuery } from '@/features/user/hooks/useUser';
import { ClipLoader } from 'react-spinners';

interface Props {
  children: ReactNode;
}

const AuthGuard = ({ children }: Props) => {
  // 로그인 없이 접근 가능한 페이지 확인
  const pathname = usePathname();
  const isPublicPage = ['/login', '/sign-up'].includes(pathname);

  // 로그인 정보 조회
  const { data: loginInfo, isPending, error } = useLoginInfoQuery();

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

  if (isPublicPage) {
    // 기존 로그인 정보가 확인된 경우
    if (loginInfo) {
      redirect('/project');
    }
    return children;
  }

  if (error) {
    redirect('/login');
  }

  return children;
};

export default AuthGuard;
