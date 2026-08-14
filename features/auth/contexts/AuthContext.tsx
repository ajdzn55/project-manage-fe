'use client';

import {
  createContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import type { AuthUser, User } from '@/features/user/types/user.type';
import { AUTH_STORAGE_KEY } from '@/features/auth/constants/auth';

interface AuthContextValue {
  user: AuthUser | null;
  isInitialized: boolean;
  login: (user: User) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

interface Props {
  children: ReactNode;
}

const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

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
    const authUser: AuthUser = {
      id: loginUser.id,
      name: loginUser.name,
      email: loginUser.email,
      createdAt: loginUser.createdAt,
      updatedAt: loginUser.updatedAt,
    };

    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authUser));
    setUser(authUser);
  };

  const logout = () => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isInitialized, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
