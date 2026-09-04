import axiosInstance from '@/lib/axios';
import type {
  CreateProjectTask,
  ProjectTask,
  TaskSearchParams,
  UpdateProjectTask,
} from '@/features/project/types/task.type';
import { omitInvalidValues } from '@/utils/common';

// 프로젝트 작업 생성
export const createTask = async (data: CreateProjectTask) => {
  try {
    const response = await axiosInstance.post<string>('/task', data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 프로젝트 작업 목록 조회
export const getTaskList = async (params: TaskSearchParams) => {
  try {
    const response = await axiosInstance.get<ProjectTask[]>('/task', {
      params,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 프로젝트 작업 정보 수정
export const updateTask = async (id: string, data: UpdateProjectTask) => {
  try {
    const requestBody = omitInvalidValues(data);
    const response = await axiosInstance.patch<void>(`/task${id}`, requestBody);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 프로젝트 작업 삭제
export const deleteTask = async (id: string) => {
  try {
    const response = await axiosInstance.delete<void>(`/task/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
