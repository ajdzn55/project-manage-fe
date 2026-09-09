'use client';

import Link from 'next/link';
import AuthLayout from '@/features/auth/components/AuthLayout';
import TextInput from '@/components/TextInput';
import Button from '@/components/Button';
import { CreateUser } from '@/features/user/types/user.type';
import { useForm } from 'react-hook-form';
import {
  useCreateUserMutation,
  useUserListQuery,
} from '@/features/user/hooks/useUser';
import { dialogAlert } from '@/utils/alert';

const SignUpForm = () => {
  const { handleSubmit, register } = useForm<CreateUser>();

  const { data: users } = useUserListQuery();
  const { mutate: postMutate } = useCreateUserMutation();

  const onSubmit = async (data: CreateUser) => {
    // 중복 아이디 검사
    const isDuplicate = users?.some((v) => v.id === data.id);

    if (isDuplicate) {
      await dialogAlert({ type: 'error', content: '중복된 ID 입니다.' });
      return;
    }

    postMutate({ data });
  };

  return (
    <AuthLayout>
      <header className="mb-7 flex flex-col items-center text-center">
        <h1 className="text-heading text-xl font-bold">회원가입</h1>
        <p className="text-muted mt-2">계정을 생성하여 시작하세요.</p>
      </header>

      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          register={register('id')}
          label="아이디"
          labelWidth="80px"
          placeholder="아이디를 입력하세요"
        />
        <TextInput
          register={register('password')}
          label="비밀번호"
          labelWidth="80px"
          type="password"
          placeholder="비밀번호를 입력하세요"
        />
        <TextInput
          register={register('name')}
          label="이름"
          labelWidth="80px"
          placeholder="이름을 입력하세요"
        />
        <TextInput
          register={register('email')}
          label="이메일"
          labelWidth="80px"
          placeholder="이메일을 입력하세요"
        />
        <Button text="회원가입" type="submit" width="100%" height="40px" />
      </form>

      <div className="mt-6 text-center">
        <Link
          href="/login"
          className="text-primary hover:text-primary-hover font-semibold transition hover:underline"
        >
          로그인
        </Link>
      </div>
    </AuthLayout>
  );
};

export default SignUpForm;
