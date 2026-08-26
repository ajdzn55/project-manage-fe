import { useQuery } from '@tanstack/react-query';
import type { User } from '@/features/user/types/user.type';
import { getUserList } from '@/services/user';

export const useUserListQuery = () => {
  const { data } = useQuery<User[]>({
    queryKey: ['user'],
    queryFn: getUserList,
  });

  return { data };
};
