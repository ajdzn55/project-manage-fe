'use client';

import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { type ReactNode, useState } from 'react';
import { toastAlert } from '@/utils/alert';

interface ReactQueryProviderProps {
  children: ReactNode;
}

export default function ReactQueryProvider({
  children,
}: ReactQueryProviderProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 받아온 데이터를 최신 데이터로 취급하는 시간
            retry: 1, // 요청 실패 시 재시도 횟수
            refetchOnWindowFocus: false, // 다른 창에서 돌아올 때 자동 재요청 여부
          },
        },
        queryCache: new QueryCache({
          onError: (error) => {
            console.error(error);

            toastAlert({
              type: 'error',
              content: error.message,
              toastTimer: 5000,
            });
          },
        }),
        mutationCache: new MutationCache({
          onError: (error, _variables, _onMutateResult, mutation) => {
            console.error(error);

            if (mutation.options.meta?.skipErrorToast) {
              return;
            }

            toastAlert({
              type: 'error',
              content: error.message,
              toastTimer: 5000,
            });
          },
        }),
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
