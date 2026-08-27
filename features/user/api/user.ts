import axiosInstance from '../../../lib/axios';
import type {
  CreateUser,
  UpdateUser,
  User,
} from '@/features/user/types/user.type';

// 사용자 생성(회원가입)
export const createUser = async (data: CreateUser) => {
  try {
    const response = await axiosInstance.post<string>('/user', data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 사용자 목록 조회
export const getUserList = async () => {
  try {
    const response = await axiosInstance.get<User[]>('/user');
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 사용자 조회
export const getUser = async (id: string) => {
  try {
    const response = await axiosInstance.get<User>(`/user/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 사용자 정보 수정
export const updateUser = async (id: string, data: UpdateUser) => {
  try {
    const response = await axiosInstance.patch<void>(`/user/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
