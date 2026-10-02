import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type {
  CreateUser,
  LoginInfo,
  NoticeCheck,
  UpdateUser,
  User,
} from '@/features/user/types/user.type';
import {
  checkDueTaskNotice,
  createUser,
  deleteUser,
  getCheckNotice,
  getLoginInfo,
  getUser,
  getUserList,
  restoreUser,
  updateUser,
} from '@/features/user/api/user';
import { dialogAlert, toastAlert } from '@/utils/alert';
import type { AxiosError } from 'axios';
import type { ApiErrorResponse } from '@/lib/axios';

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
  const loginUser = queryClient.getQueryData<LoginInfo>(['loginUser']);

  const { mutate, isPending } = useMutation({
    mutationFn: ({ data }: { data: UpdateUser }) => {
      if (!loginUser?.id) {
        throw new Error('로그인 사용자 정보가 없습니다.');
      }

      return updateUser(loginUser.id, data);
    },
    onSuccess: (_, variables) => {
      // 수정한 내용을 화면에 즉시 반영
      queryClient.setQueryData<LoginInfo>(['loginUser'], (prev) =>
        prev ? { ...prev, ...variables.data } : prev,
      );

      // 서버 최신 정보로 갱신 (재조회 완료 전까지 기존 데이터 띄움)
      void queryClient.invalidateQueries({ queryKey: ['loginUser'] });
      void queryClient.invalidateQueries({ queryKey: ['user'] });

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
    onError: async (error: AxiosError<ApiErrorResponse>) => {
      console.log(error);

      if (error.response?.status === 409) {
        await dialogAlert({ type: 'error', content: '중복된 ID입니다.' });
      }
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

// 로그인 정보 조회
export const useLoginInfoQuery = (enabled: boolean = true) => {
  return useQuery<LoginInfo>({
    queryKey: ['loginUser'],
    queryFn: getLoginInfo,
    staleTime: 5 * 60 * 1000,
    retry: false,
    enabled,
  });
};

export const useCheckNoticeQuery = () => {
  const { data } = useQuery<NoticeCheck>({
    queryKey: ['check-notice'],
    queryFn: getCheckNotice,
  });

  return { data };
};

export const useCheckDueTaskNoticeMutation = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: () => checkDueTaskNotice(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['check-notice'] });
    },
  });

  return { mutate };
};
