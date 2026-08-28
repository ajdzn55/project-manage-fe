'use client';

import { useCallback, useEffect } from 'react';
import { format } from 'date-fns';
import { useForm } from 'react-hook-form';
import Button from '@/components/Button';
import TextInput from '@/components/TextInput';
import { useAuth } from '@/features/auth/hooks/useAuth';
import type { UpdateUser } from '@/features/user/types/user.type';
import { usePatchUserMutation } from '@/features/user/hooks/useUser';

const UserProfile = () => {
  const { loginUser } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty, errors },
  } = useForm<UpdateUser>();

  const resetForm = useCallback(() => {
    reset({
      name: loginUser?.name ?? '',
      email: loginUser?.email ?? '',
    });
  }, [reset, loginUser]);

  const { mutate: patchMutate, isPending } = usePatchUserMutation();

  const handleSave = (data: UpdateUser) => {
    patchMutate({ data });
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

  if (!loginUser) return null;

  return (
    <div className="p-7">
      <h1 className="text-heading text-2xl font-bold">내 정보</h1>
      <p className="text-muted mt-1">계정 정보를 확인하고 수정하세요.</p>

      <form onSubmit={handleSubmit(handleSave)} className="mt-8 max-w-100">
        <div className="border-line flex items-center gap-4 border-b pb-6">
          <div className="bg-primary flex size-14 shrink-0 items-center justify-center rounded-full text-xl font-bold text-white">
            {loginUser.name.trim().charAt(0)}
          </div>
          <div className="min-w-0">
            <p className="text-heading truncate text-lg font-bold">
              {loginUser.name}
            </p>
            <p className="text-muted truncate">{loginUser.email}</p>
          </div>
        </div>

        <div className="space-y-4 py-6">
          <TextInput
            label="이름"
            labelWidth="80px"
            register={register('name', { required: true })}
            hasError={!!errors.name}
          />
          <TextInput
            label="이메일"
            labelWidth="80px"
            type="email"
            register={register('email', { required: true })}
            hasError={!!errors.email}
          />
          <div className="flex min-h-11 items-center gap-[3px]">
            <span className="text-body w-20 shrink-0 font-semibold">
              가입일
            </span>
            <time dateTime={loginUser.createdAt} className="text-body">
              {format(new Date(loginUser.createdAt), 'yyyy.MM.dd')}
            </time>
          </div>
        </div>

        <div className="border-line flex justify-end border-t pt-5">
          <Button
            text="저장"
            width="104px"
            height="40px"
            type="submit"
            disabled={isPending}
          />
        </div>
      </form>
    </div>
  );
};

export default UserProfile;
