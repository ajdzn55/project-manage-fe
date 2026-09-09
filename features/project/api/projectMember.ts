import axiosInstance from '@/lib/axios';
import type {
  AddProjectMember,
  UpdateProjectMember,
} from '@/features/project/types/project.type';

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

// 프로젝트 멤버 역할 변경
export const changeProjectMemberRole = async (
  projectId: string,
  data: UpdateProjectMember,
) => {
  try {
    const response = await axiosInstance.patch<void>(
      `/project/${projectId}/members`,
      data,
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
