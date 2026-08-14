import Link from 'next/link';
import AuthLayout from '@/features/auth/components/AuthLayout';
import TextInput from '@/components/TextInput';
import Button from '@/components/Button';

const SignUpForm = () => {
  return (
    <AuthLayout>
      <header className="mb-7 flex flex-col items-center text-center">
        <h1 className="text-xl font-bold text-slate-900">회원가입</h1>
        <p className="mt-2 text-sm text-slate-500">
          계정을 생성하여 시작하세요.
        </p>
      </header>

      <form className="space-y-5">
        <TextInput
          label="아이디"
          labelWidth="80px"
          placeholder="아이디를 입력하세요"
        />
        <TextInput
          label="비밀번호"
          labelWidth="80px"
          type="password"
          placeholder="비밀번호를 입력하세요"
        />
        <TextInput
          label="이름"
          labelWidth="80px"
          placeholder="이름을 입력하세요"
        />
        <TextInput
          label="이메일"
          labelWidth="80px"
          placeholder="이메일을 입력하세요"
        />
        <Button text="회원가입" type="submit" width="100%" height="40px" />
      </form>

      <div className="mt-6 text-center">
        <Link
          href="/login"
          className="text-sm font-semibold text-blue-600 transition hover:text-blue-700 hover:underline"
        >
          로그인
        </Link>
      </div>
    </AuthLayout>
  );
};

export default SignUpForm;
