'use client';

import Link from 'next/link';
import { type ReactNode, useState } from 'react';
import ProjectSidebarNav from './ProjectSidebarNav';

interface Props {
  children: ReactNode;
}

const ProjectLayout = ({ children }: Props) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <main className="min-h-dvh min-w-[1024px] overflow-auto bg-slate-50 p-8">
      <div className="mx-auto flex min-h-[calc(100dvh-64px)] max-w-360 rounded-xl border border-slate-200 bg-white shadow-sm">
        <aside
          className={`relative flex shrink-0 flex-col border-r border-slate-200 transition-[width] duration-200 ${
            isSidebarCollapsed ? 'w-16' : 'w-56'
          }`}
        >
          <Link
            href="/project"
            title={isSidebarCollapsed ? 'ProjectHub' : undefined}
            aria-label={isSidebarCollapsed ? 'ProjectHub' : undefined}
            className={`flex items-center border-b border-slate-100 py-6 ${
              isSidebarCollapsed ? 'justify-center px-0' : 'gap-3 px-5'
            }`}
          >
            <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-blue-600 font-bold text-white">
              A
            </span>
            <span
              className={`overflow-hidden font-bold whitespace-nowrap text-slate-900 transition-[max-width,opacity] duration-200 ${
                isSidebarCollapsed
                  ? 'max-w-0 opacity-0'
                  : 'max-w-40 opacity-100 delay-100'
              }`}
            >
              ProjectHub
            </span>
          </Link>

          <button
            type="button"
            aria-label={
              isSidebarCollapsed ? '사이드바 펼치기' : '사이드바 접기'
            }
            onClick={() => setIsSidebarCollapsed((previous) => !previous)}
            className="absolute top-[68px] -right-3 z-10 flex size-6 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:bg-slate-50 hover:text-slate-900"
          >
            {isSidebarCollapsed ? '›' : '‹'}
          </button>

          <ProjectSidebarNav isCollapsed={isSidebarCollapsed} />
        </aside>
        <section className="min-w-0 flex-1 overflow-hidden rounded-r-xl">
          {children}
        </section>
      </div>
    </main>
  );
};

export default ProjectLayout;
