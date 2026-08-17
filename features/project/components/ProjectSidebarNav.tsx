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
  onNavigate?: () => void;
}

const ProjectSidebarNav = ({ onNavigate }: Props) => {
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
      onNavigate?.();
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
            onClick={onNavigate}
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${isActive(item.href) ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
          >
            <span className="w-5 text-center">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>

      <nav className="space-y-1 border-t border-slate-100 px-3 py-5 text-sm font-medium">
        {projectAccountMenuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 transition ${isActive(item.href) ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
          >
            <span className="w-5 text-center">{item.icon}</span>
            {item.label}
          </Link>
        ))}

        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
        >
          <span className="w-5 text-center">🚪</span>
          로그아웃
        </button>
      </nav>
    </>
  );
};

export default ProjectSidebarNav;
