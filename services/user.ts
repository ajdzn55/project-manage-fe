import axiosInstance from '../lib/axios';
import type { User } from '@/features/user/types/user.type';

export const getUserList = async () => {
  const response = await axiosInstance.get<User[]>('/user');
  return response.data;
};
