import axiosInstance from '@/lib/axios';
import type {
  CreateProject,
  Project,
  ProjectSimple,
  UpdateProject,
} from '@/features/project/types/project.type';

// 프로젝트 생성
export const createProject = async (data: CreateProject) => {
  try {
    const response = await axiosInstance.post<string>('/project', data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 프로젝트 목록 조회
export const getProjectList = async () => {
  try {
    const response = await axiosInstance.get<ProjectSimple[]>('/project');
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 프로젝트 상세 조회
export const getProject = async (id: string) => {
  try {
    const response = await axiosInstance.get<Project>(`/project/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 프로젝트 정보 수정
export const updateProject = async (id: string, data: UpdateProject) => {
  try {
    const response = await axiosInstance.patch<void>(`/project/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 프로젝트 삭제
export const deleteProject = async (id: string) => {
  try {
    const response = await axiosInstance.delete<void>(`/project/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
