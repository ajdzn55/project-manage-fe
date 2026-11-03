import clientAxios from '@/lib/client';
import type {
  CreateProject,
  Project,
  Projects,
  ProjectSearchParams,
  UpdateProject,
} from '@/features/project/types/project.type';
import { omitInvalidValues } from '@/utils/common';

// 프로젝트 생성
export const createProject = async (data: CreateProject) => {
  const requestBody = omitInvalidValues(data);
  const response = await clientAxios.post<string>('/project', requestBody);
  return response.data;
};

// 프로젝트 목록 조회
export const getProjectList = async (params: ProjectSearchParams) => {
  const response = await clientAxios.get<Projects>('/project', {
    params,
  });
  return response.data;
};

// 프로젝트 상세 조회
export const getProject = async (id: string) => {
  const response = await clientAxios.get<Project>(`/project/${id}`);
  return response.data;
};

// 프로젝트 정보 수정
export const updateProject = async (id: string, data: UpdateProject) => {
  const requestBody = omitInvalidValues(data);
  await clientAxios.patch<void>(`/project/${id}`, requestBody);
};

// 프로젝트 삭제
export const deleteProject = async (id: string) => {
  await clientAxios.delete<void>(`/project/${id}`);
};
