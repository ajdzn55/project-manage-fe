import Link from 'next/link';
import type { ReactNode } from 'react';
import ProjectMobileMenu from './ProjectMobileMenu';
import ProjectSidebarNav from './ProjectSidebarNav';

interface Props {
  children: ReactNode;
}

const ProjectLayout = ({ children }: Props) => {
  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="mx-auto flex min-h-[calc(100vh-64px)] max-w-360 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <aside className="hidden w-56 shrink-0 flex-col border-r border-slate-200 md:flex">
          <Link
            href="/project"
            className="flex items-center gap-3 border-b border-slate-100 px-5 py-6"
          >
            <span className="flex size-8 items-center justify-center rounded-lg bg-blue-600 font-bold text-white">
              A
            </span>
            <span className="font-bold text-slate-900">ProjectHub</span>
          </Link>
          <ProjectSidebarNav />
        </aside>
        <section className="min-w-0 flex-1">
          <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-4 md:hidden">
            <ProjectMobileMenu />
            <Link href="/project" className="font-bold text-slate-900">
              ProjectHub
            </Link>
          </div>
          {children}
        </section>
      </div>
    </main>
  );
};

export default ProjectLayout;
