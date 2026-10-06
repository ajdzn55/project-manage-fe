'use client';

import { type ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { useLoginInfoQuery } from '@/features/user/hooks/useUser';
import { ClipLoader } from 'react-spinners';
import { useAuthNavigation } from '@/utils/useAuthNavigation';

interface Props {
  children: ReactNode;
}

const AuthGuard = ({ children }: Props) => {
  const { isPublicPage, currentPath, destination } = useAuthNavigation();

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
      redirect(destination);
    }
    return children;
  }

  if (error) {
    redirect(`/login?returnTo=${encodeURIComponent(currentPath)}`);
  }

  return children;
};

export default AuthGuard;
