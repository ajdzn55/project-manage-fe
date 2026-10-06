import { usePathname, useSearchParams } from 'next/navigation';

export const useAuthNavigation = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentSearch = searchParams.toString();
  const currentPath = currentSearch ? `${pathname}?${currentSearch}` : pathname;

  const returnTo = searchParams.get('returnTo');
  const isValidReturnTo =
    returnTo?.startsWith('/') &&
    !returnTo.startsWith('//') &&
    !returnTo.startsWith('/login') &&
    !returnTo.startsWith('/sign-up');

  const destination = returnTo && isValidReturnTo ? returnTo : '/project';

  // 로그인 정보 없이 접근 가능한 페이지
  const isPublicPage = ['/login', '/sign-up'].includes(pathname);

  return { isPublicPage, currentPath, destination };
};
