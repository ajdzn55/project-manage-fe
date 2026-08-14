'use client';

import { useEffect, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/features/auth/hooks/useAuth';

interface Props {
  children: ReactNode;
}

const AuthGuard = ({ children }: Props) => {
  const router = useRouter();
  const { user, isInitialized } = useAuth();

  useEffect(() => {
    if (isInitialized && !user) {
      router.replace('/login');
    }
  }, [isInitialized, router, user]);

  if (!isInitialized || !user) {
    return null;
  }

  return children;
};

export default AuthGuard;
