import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createProject,
  deleteProject,
  getProject,
  getProjectList,
  updateProject,
} from '@/features/project/api/project';
import type {
  CreateProject,
  Project,
  ProjectSimple,
  UpdateProject,
} from '@/features/project/types/project.type';
import { toastAlert } from '@/utils/alert';

export const useCreateProjectMutation = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: ({ data }: { data: CreateProject }) => createProject(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['project'] });
      toastAlert({ type: 'success', content: '프로젝트가 생성되었습니다.' });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return { mutate };
};

export const useProjectListQuery = () => {
  const { data } = useQuery<ProjectSimple[]>({
    queryKey: ['project'],
    queryFn: getProjectList,
  });

  return { data };
};

export const useProjectQuery = (id: string) => {
  const { data } = useQuery<Project>({
    queryKey: ['project', id],
    queryFn: () => getProject(id),
    enabled: !!id,
  });

  return { data };
};

export const useUpdateProjectMutation = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: ({ data }: { data: UpdateProject }) =>
      updateProject(data.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['project'] });
      toastAlert({ type: 'success', content: '프로젝트가 수정되었습니다.' });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return { mutate };
};

export const useDeleteProjectMutation = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (id: string) => deleteProject(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['project'] });
      toastAlert({ type: 'success', content: '프로젝트가 삭제되었습니다.' });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return { mutate };
};
