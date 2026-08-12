'use client';

import Link from 'next/link';
import { useState } from 'react';

const menuItems = [
  { label: '프로젝트', href: '/project', icon: '▦' },
  { label: '내 작업', href: '/tasks', icon: '☑' },
  { label: '캘린더', href: '/calendar', icon: '□' },
];

const ProjectMobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <button
        type="button"
        aria-label="메뉴 열기"
        aria-expanded={isOpen}
        aria-controls="project-mobile-menu"
        onClick={() => setIsOpen(true)}
        className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 md:hidden"
      >
        <svg
          aria-hidden="true"
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
            aria-label="메뉴 닫기"
            onClick={closeMenu}
            className="absolute inset-0 bg-slate-950/40"
          />

          <aside
            id="project-mobile-menu"
            className="relative flex h-full w-70 max-w-[85vw] flex-col bg-white shadow-xl"
          >
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
                aria-label="메뉴 닫기"
                onClick={closeMenu}
                className="flex size-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-50"
              >
                <svg
                  aria-hidden="true"
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

            <nav className="flex-1 space-y-1 px-3 py-5">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${item.href === '/project' ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
                >
                  <span className="w-5 text-center">{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="space-y-1 border-t border-slate-100 px-3 py-5 text-sm font-medium text-slate-600">
              <Link
                href="/settings"
                onClick={closeMenu}
                className="block rounded-lg px-3 py-2.5 hover:bg-slate-50"
              >
                ⚙　설정
              </Link>
              <Link
                href="/profile"
                onClick={closeMenu}
                className="block rounded-lg px-3 py-2.5 hover:bg-slate-50"
              >
                ◎　내 프로필
              </Link>
            </div>
          </aside>
        </div>
      )}
    </>
  );
};

export default ProjectMobileMenu;
