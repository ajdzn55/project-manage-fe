import TaskList from '@/features/project/components/tasks/TaskList';
import { createServerQueryClient } from '@/lib/queryClient';
import { getTaskList } from '@/features/project/api/task.server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import type {
  ProjectTask,
  TaskSearchParams,
} from '@/features/project/types/task.type';
import { getUserList } from '@/features/user/api/user.server';
import type { User } from '@/features/user/types/user.type';

export default async function TasksPage() {
  const params: TaskSearchParams = { isMyTask: true };
  const queryClient = createServerQueryClient();

  await Promise.all([
    // 프로젝트 작업 목록 조회
    queryClient.prefetchQuery<ProjectTask[]>({
      queryKey: ['task', params],
      queryFn: () => getTaskList(params),
    }),
    // 사용자 목록 조회
    queryClient.prefetchQuery<User[]>({
      queryKey: ['user'],
      queryFn: getUserList,
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TaskList />
    </HydrationBoundary>
  );
}
