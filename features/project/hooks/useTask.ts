import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createTask,
  deleteTask,
  getTaskList,
  updateTask,
} from '@/features/project/api/task.client';
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
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: UpdateProjectTask;
      // startedAt?: number;
    }) => updateTask(id, data),

    onMutate: async ({
      id,
      data,
      // startedAt,
    }: {
      id: string;
      data: UpdateProjectTask;
      // startedAt?: number;
    }) => {
      await queryClient.cancelQueries({
        queryKey: ['task'],
      });

      const previousTaskQueries = queryClient.getQueriesData<ProjectTask[]>({
        queryKey: ['task'],
      });

      // PERF_TEST  (요청 실패 시 UI와 캐시 롤백)
      // console.log(
      //   '[측정] 작업 캐시 키',
      //   previousTaskQueries.map(([queryKey]) => queryKey),
      // );

      queryClient.setQueriesData<ProjectTask[]>(
        { queryKey: ['task'] },
        (tasks) =>
          tasks?.map((task) => (task.id === id ? { ...task, ...data } : task)),
      );

      // PERF_TEST (낙관적 UI 반영 및 서버 응답 시간 측정)
      // if (startedAt !== undefined) {
      //   requestAnimationFrame(() => {
      //     console.log('[측정] 낙관적 UI 반영', {
      //       elapsed: performance.now() - startedAt,
      //     });
      //   });
      // }

      return { previousTaskQueries };
    },

    onError: (error, _variables, context) => {
      console.log(error);
      context?.previousTaskQueries.forEach(([queryKey, tasks]) => {
        queryClient.setQueryData(queryKey, tasks);
      });

      // PERF_TEST (요청 실패 시 작업 캐시 롤백 검증)
      // if (context) {
      //   const subsequentTaskQueries = queryClient.getQueriesData<ProjectTask[]>(
      //     {
      //       queryKey: ['task'],
      //     },
      //   );
      //   const restoredCount = context?.previousTaskQueries.filter(
      //     ([queryKey, previousData]) => {
      //       const restoredData = subsequentTaskQueries.find(
      //         ([currentKey]) =>
      //           JSON.stringify(currentKey) === JSON.stringify(queryKey),
      //       )?.[1];
      //
      //       return (
      //         JSON.stringify(previousData) === JSON.stringify(restoredData)
      //       );
      //     },
      //   ).length;
      //
      //   console.log('[측정] 작업 캐시 롤백', {
      //     total: context?.previousTaskQueries.length,
      //     restored: restoredCount,
      //   });
      // }
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['task'],
      });
    },

    // PERF_TEST (낙관적 UI 반영 및 서버 응답 시간 측정)
    // onSuccess: (_data, { startedAt }) => {
    //   if (startedAt !== undefined) {
    //     console.log('[측정] 서버 응답 완료', {
    //       elapsed: performance.now() - startedAt,
    //     });
    //   }
    // },
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
  });

  return { mutate };
};
