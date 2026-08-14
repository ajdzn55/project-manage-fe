'use client';

import Link from 'next/link';
import AuthLayout from '@/features/auth/components/AuthLayout';
import TextInput from '@/components/TextInput';
import Button from '@/components/Button';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { User } from '../../user/types/user.type';
import { mockUsers } from '../mocks/user.mock';
import { myAlert } from '@/utils/alert';
import { useAuth } from '@/features/auth/hooks/useAuth';

type LoginFormType = Pick<User, 'id' | 'password'>;

const LoginForm = () => {
  const { register, handleSubmit } = useForm<LoginFormType>();
  const router = useRouter();
  const { login } = useAuth();

  const invalidAlert = async () => {
    await myAlert({
      type: 'error',
      content: '아이디 또는 비밀번호가 일치하지 않습니다.',
      width: '380px',
      confirmButtonText: '확인',
    });
  };

  const onSubmit = async (data: LoginFormType) => {
    // 유효성 검사
    const { id: userId, password } = data;
    const targetUser = mockUsers.find((v) => v.id === userId);
    const isMatchPassword = password !== targetUser?.password;

    if (!targetUser || isMatchPassword) {
      await invalidAlert();
      return;
    }

    login(targetUser);
    router.replace('/project');
  };

  return (
    <AuthLayout>
      <header className="mb-7 flex flex-col items-center text-center">
        <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-blue-600 shadow-sm">
          {/* 로고 */}
        </div>
        <h1 className="text-xl font-bold text-slate-900">ProjectHub</h1>
        <p className="mt-2 text-sm text-slate-500">
          프로젝트 협업을 더 효율적으로 관리하세요.
        </p>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <TextInput
          register={register('id')}
          label="아이디"
          labelWidth="80px"
          placeholder="아이디를 입력하세요"
          required
        />
        <TextInput
          register={register('password')}
          label="비밀번호"
          labelWidth="80px"
          type="password"
          placeholder="비밀번호를 입력하세요"
          required
        />
        <Button text="로그인" type="submit" width="100%" height="40px" />
      </form>

      <div className="mt-6 text-center">
        <Link
          href="/sign-up"
          className="text-sm font-semibold text-blue-600 transition hover:text-blue-700 hover:underline"
        >
          회원가입
        </Link>
      </div>
    </AuthLayout>
  );
};

export default LoginForm;
