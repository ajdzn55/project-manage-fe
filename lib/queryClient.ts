import { QueryClient } from '@tanstack/react-query';

export const createServerQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
      // 어떤 쿼리를 직렬화 대상에 포함할 것인지 결정 (기본: 성공한 쿼리)
      // dehydrate: {},
    },
  });
};
