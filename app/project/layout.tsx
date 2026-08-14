import type { ReactNode } from 'react';
import ProjectLayout from '@/features/project/components/ProjectLayout';
import AuthGuard from '@/features/auth/components/AuthGuard';

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <AuthGuard>
      <ProjectLayout>{children}</ProjectLayout>
    </AuthGuard>
  );
}
