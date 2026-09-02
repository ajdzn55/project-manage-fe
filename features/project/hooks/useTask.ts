import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createTask,
  deleteTask,
  getTaskList,
  updateTask,
} from '@/features/project/api/task';
import type {
  CreateProjectTask,
  ProjectTask,
  UpdateProjectTask,
} from '@/features/project/types/task.type';
import { toastAlert } from '@/utils/alert';

export const useCreateTaskMutation = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: ({ data }: { data: CreateProjectTask }) => createTask(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['task'] });
      toastAlert({ type: 'success', content: '작업이 생성되었습니다.' });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return { mutate };
};

export const useTaskListQuery = (projectId: string) => {
  const { data } = useQuery<ProjectTask[]>({
    queryKey: ['task'],
    queryFn: () => getTaskList(projectId),
    enabled: !!projectId,
  });

  return { data };
};

export const useUpdateTaskMutation = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: ({ data }: { data: UpdateProjectTask }) => updateTask(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['task'] });
      toastAlert({ type: 'success', content: '작업이 수정되었습니다.' });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return { mutate };
};

export const useDeleteTaskMutation = (id: string) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: () => deleteTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['task'] });
      toastAlert({ type: 'success', content: '작업이 삭제되었습니다.' });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return { mutate };
};
