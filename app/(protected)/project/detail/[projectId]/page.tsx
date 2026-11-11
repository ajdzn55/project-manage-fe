import ProjectDetail from '@/features/project/components/ProjectDetail';
import type { Project } from '@/features/project/types/project.type';
import { getProject } from '@/features/project/api/project.server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { createServerQueryClient } from '@/lib/queryClient';
import type { ProjectTask } from '@/features/project/types/task.type';
import { getTaskList } from '@/features/project/api/task.server';
import type { User } from '@/features/user/types/user.type';
import { getUserList } from '@/features/user/api/user.server';

// PERF_TEST
// import { performance } from 'node:perf_hooks';

interface Props {
  params: Promise<{ projectId: string }>;
}

export default async function ProjectDetailPage({ params }: Props) {
  const { projectId } = await params;
  const queryClient = createServerQueryClient();

  // PERF_TEST
  // const measure = async (callback: () => Promise<unknown>) => {
  //   const startedAt = performance.now();
  //
  //   await callback();
  //
  //   return performance.now() - startedAt;
  // };
  // const totalStartedAt = performance.now();

  // PERF_TEST
  // const [projectMs, taskMs, userMs] =
  await Promise.all([
    // 프로젝트 상세 조회
    // measure(() =>
    queryClient.fetchQuery<Project>({
      queryKey: ['project', projectId],
      queryFn: () => getProject(projectId),
    }),
    // ),
    // 프로젝트 작업 목록 조회
    // measure(() =>
    queryClient.fetchQuery<ProjectTask[]>({
      queryKey: ['task', { projectId }],
      queryFn: () => getTaskList({ projectId }),
    }),
    // ),
    // 사용자 목록 조회
    // measure(() =>
    queryClient.fetchQuery<User[]>({
      queryKey: ['user'],
      queryFn: getUserList,
    }),
    // ),
  ]);

  // PERF_TEST
  // const totalMs = performance.now() - totalStartedAt;
  // const sequentialSumMs = projectMs + taskMs + userMs;
  // const maxFetchMs = Math.max(projectMs, taskMs, userMs);

  // PERF_TEST
  // console.log('[측정] 프로젝트 상세 서버 조회', {
  //   projectMs: Number(projectMs.toFixed(2)),
  //   taskMs: Number(taskMs.toFixed(2)),
  //   userMs: Number(userMs.toFixed(2)),
  //   sequentialSumMs: Number(sequentialSumMs.toFixed(2)),
  //   maxFetchMs: Number(maxFetchMs.toFixed(2)),
  //   parallelTotalMs: Number(totalMs.toFixed(2)),
  // });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProjectDetail projectId={projectId} />
    </HydrationBoundary>
  );
}
