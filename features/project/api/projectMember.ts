import type {
  AddProjectMember,
  ProjectMember,
} from '@/features/project/types/project.type';
import axiosInstance from '@/lib/axios';

// 프로젝트 멤버 추가
export const addProjectMember = async (
  projectId: string,
  data: AddProjectMember,
) => {
  try {
    const response = await axiosInstance.post<string>(
      `/project/${projectId}/members`,
      data,
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 프로젝트 멤버 목록 조회
export const getProjectMemberList = async (projectId: string) => {
  try {
    const response = await axiosInstance.get<ProjectMember[]>(
      `/project/${projectId}/members`,
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 프로젝트 멤버 삭제
export const removeProjectMember = async (
  projectId: string,
  memberId: string,
) => {
  try {
    const response = await axiosInstance.delete<void>(
      `/project/${projectId}/members/${memberId}`,
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
