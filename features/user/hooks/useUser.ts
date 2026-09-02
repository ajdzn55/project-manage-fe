import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type {
  CreateUser,
  UpdateUser,
  User,
} from '@/features/user/types/user.type';
import {
  createUser,
  deleteUser,
  getUser,
  getUserList,
  restoreUser,
  updateUser,
} from '@/features/user/api/user';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { toastAlert } from '@/utils/alert';

export const useUserListQuery = () => {
  const { data } = useQuery<User[]>({
    queryKey: ['user'],
    queryFn: getUserList,
  });

  return { data };
};

export const useUserQuery = (id: string) => {
  const { data } = useQuery({
    queryKey: ['user', id],
    queryFn: () => getUser(id),
    enabled: !!id,
  });

  return { data };
};

export const useUpdateUserMutation = () => {
  const queryClient = useQueryClient();

  // 로그인 정보
  const { loginUser, updateUserInfo } = useAuth();

  const { mutate, isPending } = useMutation({
    mutationFn: ({ data }: { data: UpdateUser }) => {
      if (!loginUser?.id) {
        throw new Error('로그인 사용자 정보가 없습니다.');
      }

      return updateUser(loginUser.id, data);
    },
    onSuccess: (_, variables) => {
      updateUserInfo(variables.data);
      queryClient.invalidateQueries({ queryKey: ['user'] });
      toastAlert({ type: 'success', content: '사용자 정보가 수정되었습니다.' });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return { mutate, isPending };
};

export const useCreateUserMutation = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: ({ data }: { data: CreateUser }) => createUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      toastAlert({ type: 'success', content: '사용자가 생성되었습니다.' });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return { mutate };
};

export const useDeleteUserMutation = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async (id: string) => deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      toastAlert({
        type: 'success',
        content: '사용자가 미사용 처리 되었습니다.',
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return { mutate };
};

export const useRestoreUserMutation = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async (id: string) => restoreUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      toastAlert({
        type: 'success',
        content: '사용자가 복구되었습니다.',
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return { mutate };
};
