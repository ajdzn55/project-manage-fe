'use client';

import { createContext, type ReactNode, useEffect, useState } from 'react';
import { AUTH_STORAGE_KEY } from '@/features/auth/constants/auth';
import { SIDEBAR_COLLAPSED_KEY } from '@/constants/common.const';
import type { UpdateUser, User } from '@/features/user/types/user.type';

interface AuthContextValue {
  loginUser: User | null; // 현재 로그인 사용자
  isInitialized: boolean; // 로컬 스토리지에서 사용자 정보가 복원됐는지 여부
  login: (user: User) => void; // 사용자 정보를 로컬 스토리지에 저장하고 로그인 상태로 바꾸는 함수
  updateUserInfo: (user: UpdateUser) => void; // 저장된 사용자 정보를 변경하는 함수
  logout: () => void; // 로컬 스토리지에 저장된 사용자 정보를 지우는 함수
}

export const AuthContext = createContext<AuthContextValue | null>(null);

interface Props {
  children: ReactNode;
}

const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  useEffect(() => {
    const restoreUser = window.setTimeout(() => {
      const storedUser = localStorage.getItem(AUTH_STORAGE_KEY);

      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser) as User);
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
    const authUser: User = { id, name, email, createdAt, updatedAt };

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

  const updateUser = (updatedUser: UpdateUser) => {
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
      value={{
        loginUser: user,
        isInitialized,
        login,
        updateUserInfo: updateUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
