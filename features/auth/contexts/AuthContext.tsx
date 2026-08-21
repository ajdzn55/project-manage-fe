'use client';

import { createContext, useEffect, useState, type ReactNode } from 'react';
import type { AuthUser, User } from '@/features/user/types/user.type';
import { AUTH_STORAGE_KEY } from '@/features/auth/constants/auth';
import { SIDEBAR_COLLAPSED_KEY } from '@/constants/common.const';

interface AuthContextValue {
  user: AuthUser | null;
  isInitialized: boolean;
  login: (user: User) => void;
  updateUser: (user: Pick<AuthUser, 'name' | 'email'>) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

interface Props {
  children: ReactNode;
}

const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  useEffect(() => {
    const restoreUser = window.setTimeout(() => {
      const storedUser = localStorage.getItem(AUTH_STORAGE_KEY);

      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser) as AuthUser);
        } catch {
          localStorage.removeItem(AUTH_STORAGE_KEY);
        }
      }

      setIsInitialized(true);
    }, 0);

    return () => window.clearTimeout(restoreUser);
  }, []);

  const login = (loginUser: User) => {
    const { id, name, email, createdAt, updatedAt } = loginUser;
    const authUser: AuthUser = { id, name, email, createdAt, updatedAt };

    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authUser));
    setUser(authUser);
  };

  const logout = () => {
    // 로그인 정보 제거
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setUser(null);
    // 사이드바 상태 제거
    localStorage.removeItem(SIDEBAR_COLLAPSED_KEY);
  };

  const updateUser = (updatedUser: Pick<AuthUser, 'name' | 'email'>) => {
    setUser((previousUser) => {
      if (!previousUser) return previousUser;

      const nextUser = {
        ...previousUser,
        ...updatedUser,
        updatedAt: new Date().toISOString(),
      };

      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(nextUser));
      return nextUser;
    });
  };

  return (
    <AuthContext.Provider
      value={{ user, isInitialized, login, updateUser, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
