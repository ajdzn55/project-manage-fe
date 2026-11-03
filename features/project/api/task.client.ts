import clientAxios from '@/lib/client';
import type {
  CreateProjectTask,
  ProjectTask,
  TaskSearchParams,
  UpdateProjectTask,
} from '@/features/project/types/task.type';
import { omitInvalidValues } from '@/utils/common';

// 프로젝트 작업 생성
export const createTask = async (data: CreateProjectTask) => {
  const requestBody = omitInvalidValues(data);
  const response = await clientAxios.post<string>('/task', requestBody);
  return response.data;
};

// 프로젝트 작업 목록 조회
export const getTaskList = async (params: TaskSearchParams) => {
  const response = await clientAxios.get<ProjectTask[]>('/task', {
    params,
  });
  return response.data;
};

// 프로젝트 작업 정보 수정
export const updateTask = async (id: string, data: UpdateProjectTask) => {
  const requestBody = omitInvalidValues(data);
  await clientAxios.patch<void>(`/task/${id}`, requestBody);
};

// 프로젝트 작업 삭제
export const deleteTask = async (id: string) => {
  await clientAxios.delete<void>(`/task/${id}`);
};
