'use client';

import Link from 'next/link';
import AuthLayout from '@/features/auth/components/AuthLayout';
import TextInput from '@/components/TextInput';
import Button from '@/components/Button';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { login } from '@/features/user/api/user';
import type { UserLogin } from '@/features/user/types/user.type';
import { setAccessToken } from '@/lib/axios';
import { dialogAlert } from '@/utils/alert';
import { isAxiosError } from 'axios';

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserLogin>();
  const router = useRouter();

  const onSubmit = async (data: UserLogin) => {
    try {
      const { accessToken } = await login(data);
      setAccessToken(accessToken);
      router.replace('/project');
    } catch (error) {
      const isUnauthorized =
        isAxiosError(error) && error.response?.status === 401;

      await dialogAlert({
        type: 'error',
        content: isUnauthorized
          ? error.response?.data.message
          : '로그인에 실패했습니다. 잠시 후 다시 시도해주세요.',
      });
      return;
    }
  };

  return (
    <AuthLayout>
      <header className="mb-7 flex flex-col items-center text-center">
        <div className="bg-primary mb-4 flex size-12 items-center justify-center rounded-xl shadow-sm">
          {/* 로고 */}
        </div>
        <h1 className="text-heading text-xl font-bold">ProjectHub</h1>
        <p className="text-muted mt-2">
          프로젝트 협업을 더 효율적으로 관리하세요.
        </p>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <TextInput
          register={register('id', { required: true })}
          label="아이디"
          labelWidth="80px"
          placeholder="아이디를 입력하세요"
          hasError={!!errors.id}
        />
        <TextInput
          register={register('password', { required: true })}
          label="비밀번호"
          labelWidth="80px"
          type="password"
          placeholder="비밀번호를 입력하세요"
          hasError={!!errors.password}
        />
        <Button
          text="로그인"
          type="submit"
          width="100%"
          height="40px"
          disabled={isSubmitting}
        />
      </form>

      <div className="mt-6 text-center">
        <Link
          href="/sign-up"
          className="text-primary hover:text-primary-hover font-semibold transition hover:underline"
        >
          회원가입
        </Link>
      </div>
    </AuthLayout>
  );
};

export default LoginForm;
