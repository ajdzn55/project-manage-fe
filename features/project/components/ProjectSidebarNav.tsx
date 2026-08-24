'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  logoutMenu,
  projectAccountMenu,
  projectMenuItems,
} from '../constants/project.const';
import { dialogAlert } from '@/utils/alert';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useState } from 'react';

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

  const [isLogoutActive, setIsLogoutActive] = useState<boolean>(false);

  const handleLogout = async () => {
    setIsLogoutActive(true);
    const alertRes = await dialogAlert({
      type: 'question',
      content: '로그아웃 하시겠습니까?',
      showCancelButton: true,
    });

    if (alertRes.isConfirmed) {
      logout();
      router.replace('/login');
    }
    setIsLogoutActive(false);
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
            } ${isActive(item.href) ? 'bg-blue-50' : 'hover:bg-surface'}`}
          >
            {isActive(item.href) ? item.activeIcon : item.defaultIcon}
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
        <Link
          key={projectAccountMenu.href}
          href={projectAccountMenu.href}
          title={isCollapsed ? projectAccountMenu.label : undefined}
          aria-label={isCollapsed ? projectAccountMenu.label : undefined}
          className={`flex items-center rounded-lg py-2.5 transition ${
            isCollapsed ? 'justify-center px-0' : 'gap-3 px-3'
          } ${isActive(projectAccountMenu.href) ? 'bg-blue-50' : 'hover:bg-surface'}`}
        >
          {isActive(projectAccountMenu.href)
            ? projectAccountMenu.activeIcon
            : projectAccountMenu.defaultIcon}
          <span
            className={`overflow-hidden whitespace-nowrap transition-[max-width,opacity] duration-200 ${
              isCollapsed
                ? 'max-w-0 opacity-0'
                : 'max-w-40 opacity-100 delay-100'
            }`}
          >
            {projectAccountMenu.label}
          </span>
        </Link>

        <button
          type="button"
          onClick={handleLogout}
          title={isCollapsed ? '로그아웃' : undefined}
          aria-label={isCollapsed ? '로그아웃' : undefined}
          className={`text-body hover:bg-surface hover:text-heading flex w-full items-center rounded-lg py-2.5 transition ${
            isCollapsed ? 'justify-center px-0' : 'gap-3 px-3'
          }`}
        >
          {isLogoutActive ? logoutMenu.activeIcon : logoutMenu.defaultIcon}

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
