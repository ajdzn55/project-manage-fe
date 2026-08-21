'use client';

import Link from 'next/link';
import { type ReactNode, useEffect, useState } from 'react';
import ProjectSidebarNav from './ProjectSidebarNav';
import { SIDEBAR_COLLAPSED_KEY } from '@/constants/common.const';

interface Props {
  children: ReactNode;
}

const ProjectLayout = ({ children }: Props) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);

  useEffect(() => {
    const restoreSidebarStatus = window.setTimeout(() => {
      const storedSidebarStatus = localStorage.getItem(SIDEBAR_COLLAPSED_KEY);

      if (storedSidebarStatus !== null) {
        setIsSidebarCollapsed(storedSidebarStatus === 'true');
      }
    }, 0);

    return () => window.clearTimeout(restoreSidebarStatus);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarCollapsed((prev) => {
      const nextValue = !prev;
      localStorage.setItem(SIDEBAR_COLLAPSED_KEY, nextValue.toString());

      return nextValue;
    });
  };

  return (
    <main className="bg-surface min-h-dvh min-w-[1024px] overflow-auto p-8">
      <div className="border-line mx-auto flex min-h-[calc(100dvh-64px)] max-w-360 rounded-xl border bg-white shadow-sm">
        <aside
          className={`border-line relative flex shrink-0 flex-col border-r transition-[width] duration-200 ${
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
            <span className="bg-primary flex size-8 shrink-0 items-center justify-center rounded-lg font-bold text-white">
              A
            </span>
            <span
              className={`text-heading overflow-hidden font-bold whitespace-nowrap transition-[max-width,opacity] duration-200 ${
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
            onClick={toggleSidebar}
            className="border-line text-muted hover:bg-surface hover:text-heading absolute top-[68px] -right-3 z-10 flex size-6 items-center justify-center rounded-full border bg-white shadow-sm transition"
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
