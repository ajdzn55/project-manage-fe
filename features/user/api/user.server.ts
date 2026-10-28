import 'server-only';
import createServerAxios from '@/lib/server';
import type { LoginInfo, User } from '@/features/user/types/user.type';

// 로그인 정보 조회
export const getLoginInfo = async () => {
  const serverAxios = await createServerAxios();

  try {
    const response = await serverAxios.get<LoginInfo>('/auth/login');
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 사용자 목록 조회
export const getUserList = async () => {
  const serverAxios = await createServerAxios();

  try {
    const response = await serverAxios.get<User[]>('/user');
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
