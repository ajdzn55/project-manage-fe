import React from 'react';

interface Props {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: Props) => {
  return (
    <main className="bg-surface flex min-h-screen w-full items-center justify-center px-4 py-10">
      <section className="border-line w-full max-w-[380px] rounded-xl border bg-white px-7 py-8 shadow-[0_8px_30px_rgba(15,23,42,0.06)]">
        {children}
      </section>
    </main>
  );
};

export default AuthLayout;
