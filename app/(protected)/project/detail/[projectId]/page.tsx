import ProjectDetail from '@/features/project/components/ProjectDetail';
import type { Project } from '@/features/project/types/project.type';
import { getProject } from '@/features/project/api/project.server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { createServerQueryClient } from '@/lib/queryClient';
import type { ProjectTask } from '@/features/project/types/task.type';
import { getTaskList } from '@/features/project/api/task.server';
import type { User } from '@/features/user/types/user.type';
import { getUserList } from '@/features/user/api/user.server';

interface Props {
  params: Promise<{ projectId: string }>;
}

export default async function ProjectDetailPage({ params }: Props) {
  const { projectId } = await params;
  const queryClient = createServerQueryClient();

  await Promise.all([
    // 프로젝트 상세 조회
    queryClient.prefetchQuery<Project>({
      queryKey: ['project', projectId],
      queryFn: () => getProject(projectId),
    }),
    // 프로젝트 작업 목록 조회
    queryClient.prefetchQuery<ProjectTask[]>({
      queryKey: ['task', { projectId }],
      queryFn: () => getTaskList({ projectId }),
    }),
    // 사용자 목록 조회
    queryClient.prefetchQuery<User[]>({
      queryKey: ['user'],
      queryFn: getUserList,
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProjectDetail projectId={projectId} />
    </HydrationBoundary>
  );
}
