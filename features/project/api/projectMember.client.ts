import clientAxios from '@/lib/client';
import type {
  AddProjectMember,
  UpdateProjectMember,
} from '@/features/project/types/project.type';
import { omitInvalidValues } from '@/utils/common';

// 프로젝트 멤버 추가
export const addProjectMember = async (
  projectId: string,
  data: AddProjectMember,
) => {
  const requestBody = omitInvalidValues(data);
  const response = await clientAxios.post<string>(
    `/project/${projectId}/members`,
    requestBody,
  );
  return response.data;
};

// 프로젝트 멤버 역할 변경
export const changeProjectMemberRole = async (
  projectId: string,
  userId: string,
  data: UpdateProjectMember,
) => {
  await clientAxios.patch<void>(
    `/project/${projectId}/members/${userId}`,
    data,
  );
};

// 프로젝트 멤버 삭제
export const removeProjectMember = async (
  projectId: string,
  memberId: string,
) => {
  await clientAxios.delete<void>(`/project/${projectId}/members/${memberId}`);
};
