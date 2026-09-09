import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toastAlert } from '@/utils/alert';
import {
  addProjectMember,
  changeProjectMemberRole,
  removeProjectMember,
} from '@/features/project/api/projectMember';
import type {
  AddProjectMember,
  UpdateProjectMember,
} from '@/features/project/types/project.type';

export const useAddProjectMemberMutation = (projectId: string) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (data: AddProjectMember) => addProjectMember(projectId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['project', projectId] });
      toastAlert({
        type: 'success',
        content: '프로젝트 멤버가 추가되었습니다.',
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return { mutate };
};

export const useChangeProjectMemberRoleMutation = (projectId: string) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (data: UpdateProjectMember) =>
      changeProjectMemberRole(projectId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['project', projectId] });
      toastAlert({
        type: 'success',
        content: '프로젝트 멤버 역할이 변경되었습니다.',
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return { mutate };
};

export const useRemoveProjectMemberMutation = (projectId: string) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (memberId: string) => removeProjectMember(projectId, memberId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['project', projectId] });
      toastAlert({
        type: 'success',
        content: '프로젝트 멤버가 제거되었습니다.',
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return { mutate };
};
