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
  TaskSearchParams,
  UpdateProjectTask,
} from '@/features/project/types/task.type';
import { toastAlert } from '@/utils/alert';

export const useCreateTaskMutation = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (data: CreateProjectTask) => createTask(data),
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

export const useTaskListQuery = (params: TaskSearchParams) => {
  const { data } = useQuery<ProjectTask[]>({
    queryKey: ['task', params],
    queryFn: () => getTaskList(params),
    enabled: Object.values(params).some(Boolean),
  });

  return { data };
};

export const useUpdateTaskMutation = () => {
  const queryClient = useQueryClient();

  const { mutate, mutateAsync } = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateProjectTask }) =>
      updateTask(id, data),

    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({
        queryKey: ['task'],
      });

      const previousTaskQueries = queryClient.getQueriesData<ProjectTask[]>({
        queryKey: ['task'],
      });

      queryClient.setQueriesData<ProjectTask[]>(
        { queryKey: ['task'] },
        (tasks) =>
          tasks?.map((task) => (task.id === id ? { ...task, ...data } : task)),
      );

      return { previousTaskQueries };
    },

    onError: (error, _variables, context) => {
      console.log(error);
      context?.previousTaskQueries.forEach(([queryKey, tasks]) => {
        queryClient.setQueryData(queryKey, tasks);
      });
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['task'],
      });
    },
  });

  return { mutate, mutateAsync };
};

export const useDeleteTaskMutation = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (id: string) => deleteTask(id),
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
