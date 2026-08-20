'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  projectAccountMenuItems,
  projectMenuItems,
} from '../constants/project.const';
import { myAlert } from '@/utils/alert';
import { useAuth } from '@/features/auth/hooks/useAuth';

interface Props {
  isCollapsed: boolean;
}

const ProjectSidebarNav = ({ isCollapsed }: Props) => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (href: string) => {
    if (href === '/project') {
      return pathname === href || pathname.startsWith('/project/detail/');
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const { logout } = useAuth();

  const handleLogout = async () => {
    const alertRes = await myAlert({
      type: 'question',
      content: '로그아웃 하시겠습니까?',
      confirmButtonText: '예',
      cancelButtonText: '아니오',
    });

    if (alertRes.isConfirmed) {
      logout();
      router.replace('/login');
    }
  };

  return (
    <>
      <nav className="flex-1 space-y-1 px-3 py-5">
        {projectMenuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            title={isCollapsed ? item.label : undefined}
            aria-label={isCollapsed ? item.label : undefined}
            className={`flex items-center rounded-lg py-2.5 font-medium transition ${
              isCollapsed ? 'justify-center px-0' : 'gap-3 px-3'
            } ${isActive(item.href) ? 'text-primary bg-blue-50' : 'text-body hover:bg-surface hover:text-heading'}`}
          >
            <span className="w-5 shrink-0 text-center">{item.icon}</span>
            <span
              className={`overflow-hidden whitespace-nowrap transition-[max-width,opacity] duration-200 ${
                isCollapsed
                  ? 'max-w-0 opacity-0'
                  : 'max-w-40 opacity-100 delay-100'
              }`}
            >
              {item.label}
            </span>
          </Link>
        ))}
      </nav>

      <nav className="space-y-1 border-t border-slate-100 px-3 py-5 font-medium">
        {projectAccountMenuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            title={isCollapsed ? item.label : undefined}
            aria-label={isCollapsed ? item.label : undefined}
            className={`flex items-center rounded-lg py-2.5 transition ${
              isCollapsed ? 'justify-center px-0' : 'gap-3 px-3'
            } ${isActive(item.href) ? 'text-primary bg-blue-50' : 'text-body hover:bg-surface hover:text-heading'}`}
          >
            <span className="w-5 shrink-0 text-center">{item.icon}</span>
            <span
              className={`overflow-hidden whitespace-nowrap transition-[max-width,opacity] duration-200 ${
                isCollapsed
                  ? 'max-w-0 opacity-0'
                  : 'max-w-40 opacity-100 delay-100'
              }`}
            >
              {item.label}
            </span>
          </Link>
        ))}

        <button
          type="button"
          onClick={handleLogout}
          title={isCollapsed ? '로그아웃' : undefined}
          aria-label={isCollapsed ? '로그아웃' : undefined}
          className={`text-body hover:bg-surface hover:text-heading flex w-full items-center rounded-lg py-2.5 transition ${
            isCollapsed ? 'justify-center px-0' : 'gap-3 px-3'
          }`}
        >
          <span className="w-5 shrink-0 text-center">🚪</span>
          <span
            className={`overflow-hidden whitespace-nowrap transition-[max-width,opacity] duration-200 ${
              isCollapsed
                ? 'max-w-0 opacity-0'
                : 'max-w-40 opacity-100 delay-100'
            }`}
          >
            로그아웃
          </span>
        </button>
      </nav>
    </>
  );
};

export default ProjectSidebarNav;
