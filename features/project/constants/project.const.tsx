import { SelectInputOption } from '@/components/SelectInput';
import {
  ProjectMemberRoleEnum,
  ProjectStatusEnum,
  TaskStatusEnum,
} from '@/features/project/types/enums';
import ProfileIcon from '@/components/icons/ProfileIcon';
import {
  CalendarIcon,
  LogoutIcon,
  ProjectIcon,
  TaskIcon,
} from '@/components/icons/ProjectIcons';

export const projectMenuItems = [
  {
    label: '프로젝트',
    href: '/project',
    defaultIcon: <ProjectIcon />,
    activeIcon: <ProjectIcon color="text-primary" />,
  },
  {
    label: '내 작업',
    href: '/project/tasks',
    defaultIcon: <TaskIcon />,
    activeIcon: <TaskIcon color="text-primary" />,
  },
  {
    label: '캘린더',
    href: '/project/calendar',
    defaultIcon: <CalendarIcon />,
    activeIcon: <CalendarIcon color="text-primary" />,
  },
] as const;

export const projectAccountMenu = {
  label: '내 정보',
  href: '/project/profile',
  defaultIcon: <ProfileIcon />,
  activeIcon: <ProfileIcon color="text-primary" />,
} as const;

export const logoutMenu = {
  defaultIcon: <LogoutIcon />,
  activeIcon: <LogoutIcon color="text-primary" />,
};

export const projectStatusOptions: SelectInputOption[] = [
  { label: '계획', value: ProjectStatusEnum.Planned },
  { label: '진행 중', value: ProjectStatusEnum.InProgress },
  { label: '완료', value: ProjectStatusEnum.Completed },
] as const;

export const roleLabels: Record<ProjectMemberRoleEnum, string> = {
  [ProjectMemberRoleEnum.Owner]: '소유자',
  [ProjectMemberRoleEnum.Member]: '멤버',
};

export const taskStatusOptions: SelectInputOption[] = [
  { label: '대기', value: TaskStatusEnum.Todo },
  { label: '진행 중', value: TaskStatusEnum.InProgress },
  { label: '완료', value: TaskStatusEnum.Done },
] as const;
