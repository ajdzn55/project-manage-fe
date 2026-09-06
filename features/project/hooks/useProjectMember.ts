import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toastAlert } from '@/utils/alert';
import type {
  AddProjectMember,
  ProjectMember,
} from '@/features/project/types/project.type';
import {
  addProjectMember,
  getProjectMemberList,
  removeProjectMember,
} from '@/features/project/api/projectMember';

export const useAddProjectMemberMutation = (projectId: string) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: ({ data }: { data: AddProjectMember }) =>
      addProjectMember(projectId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projectMember'] });
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

export const useProjectMemberListQuery = (projectId: string) => {
  const { data } = useQuery<ProjectMember[]>({
    queryKey: ['projectMember', projectId],
    queryFn: () => getProjectMemberList(projectId),
    enabled: !!projectId,
  });

  return { data };
};

export const useRemoveProjectMemberMutation = (
  projectId: string,
  memberId: string,
) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: () => removeProjectMember(projectId, memberId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projectMember'] });
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
