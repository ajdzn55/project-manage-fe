import Link from 'next/link';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const menuItems = [
  { label: '프로젝트', href: '/project', icon: '▦' },
  { label: '내 작업', href: '/tasks', icon: '☑' },
  { label: '캘린더', href: '/calendar', icon: '□' },
];

const ProjectLayout = ({ children }: Props) => {
  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="mx-auto flex min-h-[calc(100vh-64px)] max-w-360 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <aside className="hidden w-56 shrink-0 flex-col border-r border-slate-200 md:flex">
          <Link
            href="/"
            className="flex items-center gap-3 border-b border-slate-100 px-5 py-6"
          >
            <span className="flex size-8 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold text-white">
              A
            </span>
            <span className="font-bold text-slate-900">ProjectHub</span>
          </Link>
          <nav className="flex-1 space-y-1 px-3 py-5">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
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
              className="block rounded-lg px-3 py-2.5 hover:bg-slate-50"
            >
              ⚙　설정
            </Link>
            <Link
              href="/profile"
              className="block rounded-lg px-3 py-2.5 hover:bg-slate-50"
            >
              ◎　내 프로필
            </Link>
          </div>
        </aside>
        <section className="min-w-0 flex-1">{children}</section>
      </div>
    </main>
  );
};

export default ProjectLayout;
