import ProjectList from '@/features/project/components/projects/ProjectList';
import { getUserList } from '@/features/user/api/user.server';
import { createServerQueryClient } from '@/lib/queryClient';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import type { User } from '@/features/user/types/user.type';

export default async function ProjectPage() {
  const queryClient = createServerQueryClient();

  // 사용자 목록 조회
  await queryClient.prefetchQuery<User[]>({
    queryKey: ['user'],
    queryFn: getUserList,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProjectList />
    </HydrationBoundary>
  );
}
