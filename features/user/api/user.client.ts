import clientAxios from '../../../lib/client';
import type {
  CreateUser,
  LoginInfo,
  NoticeCheck,
  UpdateUser,
  User,
  UserLogin,
} from '@/features/user/types/user.type';

// 사용자 생성(회원가입)
export const createUser = async (data: CreateUser) => {
  try {
    const response = await clientAxios.post<string>('/user', data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 사용자 목록 조회
export const getUserList = async () => {
  try {
    const response = await clientAxios.get<User[]>('/user');
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 사용자 조회
export const getUser = async (id: string) => {
  try {
    const response = await clientAxios.get<User>(`/user/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 사용자 정보 수정
export const updateUser = async (id: string, data: UpdateUser) => {
  try {
    const response = await clientAxios.patch<void>(`/user/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 사용자 삭제(미사용)
export const deleteUser = async (id: string) => {
  try {
    const response = await clientAxios.delete<void>(`/user/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// 사용자 삭제 취소
export const restoreUser = async (id: string) => {
  try {
    const response = await clientAxios.patch<void>(`/user/${id}/restore`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// 로그인
export const login = async (data: UserLogin) => {
  try {
    await clientAxios.post<void>('/auth/login', data, {
      skipAuthRefresh: true, // 로그인 실패 오류는 재시도 제외
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 로그인 정보 조회
export const getLoginInfo = async () => {
  try {
    const response = await clientAxios.get<LoginInfo>('/auth/login');
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 마감 임박 작업 알림 마지막 확인일자 조회
export const getCheckNotice = async () => {
  try {
    const response = await clientAxios.get<NoticeCheck>('/user/check-notice');
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 마감 임박 작업 알림 확인
export const checkDueTaskNotice = async () => {
  try {
    const response = await clientAxios.put<void>('/user/check-notice');
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 로그아웃
export const logout = async () => {
  try {
    const response = await clientAxios.post<string>('/auth/logout');
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
