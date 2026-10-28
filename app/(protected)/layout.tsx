import React from 'react';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getLoginInfo } from '@/features/user/api/user.server';
import { createServerQueryClient } from '@/lib/queryClient';
import type { LoginInfo } from '@/features/user/types/user.type';
import CommonLayout from '@/features/project/components/CommonLayout';
import { isAxiosError } from 'axios';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

/**
 * 인증이 필요한 페이지들을 하나의 서버 레이아웃 아래에 묶기 위함
 */
const ProtectedLayout = async ({ children }: { children: React.ReactNode }) => {
  const requestHeaders = await headers();
  const returnTo = requestHeaders.get('x-return-to') ?? '/project';

  const queryClient = createServerQueryClient();

  try {
    // 로그인 정보 조회
    await queryClient.fetchQuery<LoginInfo>({
      queryKey: ['loginUser'],
      queryFn: getLoginInfo,
    });
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 401) {
      redirect(`/login?returnTo=${encodeURIComponent(returnTo)}`);
    }

    throw error;
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CommonLayout>{children}</CommonLayout>
    </HydrationBoundary>
  );
};

export default ProtectedLayout;
