'use client';

import { useEffect, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/features/auth/hooks/useAuth';

interface Props {
  children: ReactNode;
}

const AuthGuard = ({ children }: Props) => {
  const router = useRouter();
  const { loginUser, isInitialized } = useAuth();

  useEffect(() => {
    if (isInitialized && !loginUser) {
      router.replace('/login');
    }
  }, [isInitialized, router, loginUser]);

  if (!isInitialized || !loginUser) {
    return null;
  }

  return children;
};

export default AuthGuard;
