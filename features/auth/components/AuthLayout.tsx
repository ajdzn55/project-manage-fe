import React from 'react';

interface Props {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: Props) => {
  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-[#f8fafc] px-4 py-10">
      <section className="w-full max-w-[380px] rounded-xl border border-slate-200 bg-white px-7 py-8 shadow-[0_8px_30px_rgba(15,23,42,0.06)]">
        {children}
      </section>
    </main>
  );
};

export default AuthLayout;
