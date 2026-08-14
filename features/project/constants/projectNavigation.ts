export const projectMenuItems = [
  { label: '프로젝트', href: '/project', icon: '▦' },
  { label: '내 작업', href: '/project/tasks', icon: '☑' },
  { label: '캘린더', href: '/project/calendar', icon: '□' },
] as const;

export const projectAccountMenuItems = [
  { label: '설정', href: '/project/settings', icon: '⚙' },
  { label: '내 정보', href: '/project/profile', icon: '◎' },
] as const;
