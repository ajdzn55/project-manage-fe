'use client';

import { useCallback, useEffect } from 'react';
import { format } from 'date-fns';
import { useForm } from 'react-hook-form';
import Button from '@/components/Button';
import TextInput from '@/components/TextInput';
import { useAuth } from '@/features/auth/hooks/useAuth';
import type { AuthUser } from '@/features/user/types/user.type';

type UserProfileFormType = Pick<AuthUser, 'name' | 'email'>;

const UserProfile = () => {
  const { user, updateUser } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm<UserProfileFormType>();

  const resetForm = useCallback(() => {
    reset({
      name: user?.name ?? '',
      email: user?.email ?? '',
    });
  }, [reset, user]);

  const handleSave = (data: UserProfileFormType) => {
    // 로그인 한 사용자 정보에 동기화
    updateUser(data);
    // TODO: api 연결 필요
  };

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  useEffect(() => {
    if (!isDirty) return;

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isDirty]);

  if (!user) return null;

  return (
    <div className="p-7">
      <h1 className="text-heading text-2xl font-bold">내 정보</h1>
      <p className="text-muted mt-1">계정 정보를 확인하고 수정하세요.</p>

      <form onSubmit={handleSubmit(handleSave)} className="mt-8 max-w-100">
        <div className="border-line flex items-center gap-4 border-b pb-6">
          <div className="bg-primary flex size-14 shrink-0 items-center justify-center rounded-full text-xl font-bold text-white">
            {user.name.trim().charAt(0)}
          </div>
          <div className="min-w-0">
            <p className="text-heading truncate text-lg font-bold">
              {user.name}
            </p>
            <p className="text-muted truncate">{user.email}</p>
          </div>
        </div>

        <div className="space-y-4 py-6">
          <TextInput
            label="이름"
            labelWidth="80px"
            required
            register={register('name')}
          />
          <TextInput
            label="이메일"
            labelWidth="80px"
            type="email"
            required
            register={register('email')}
          />
          <div className="flex min-h-11 items-center gap-[3px]">
            <span className="text-body w-20 shrink-0 font-semibold">
              가입일
            </span>
            <time dateTime={user.createdAt} className="text-body">
              {format(new Date(user.createdAt), 'yyyy.MM.dd')}
            </time>
          </div>
        </div>

        <div className="border-line flex justify-end border-t pt-5">
          <Button text="저장" width="104px" height="40px" type="submit" />
        </div>
      </form>
    </div>
  );
};

export default UserProfile;
