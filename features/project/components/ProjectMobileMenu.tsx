'use client';

import Link from 'next/link';
import { useState } from 'react';
import ProjectSidebarNav from './ProjectSidebarNav';

const ProjectMobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 md:hidden"
      >
        <svg
          viewBox="0 0 24 24"
          className="size-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            type="button"
            onClick={closeMenu}
            className="absolute inset-0 bg-slate-950/40"
          />

          <aside className="relative flex h-full w-70 max-w-[85vw] flex-col bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-5">
              <Link
                href="/"
                onClick={closeMenu}
                className="flex items-center gap-3"
              >
                <span className="flex size-8 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold text-white">
                  A
                </span>
                <span className="font-bold text-slate-900">ProjectHub</span>
              </Link>

              <button
                type="button"
                onClick={closeMenu}
                className="flex size-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-50"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="size-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="m6 6 12 12M18 6 6 18" />
                </svg>
              </button>
            </div>

            <ProjectSidebarNav onNavigate={closeMenu} />
          </aside>
        </div>
      )}
    </>
  );
};

export default ProjectMobileMenu;
