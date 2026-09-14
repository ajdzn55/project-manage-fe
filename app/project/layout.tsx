import type { ReactNode } from 'react';
import ProjectLayout from '@/features/project/components/ProjectLayout';

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  return <ProjectLayout>{children}</ProjectLayout>;
}
