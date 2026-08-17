import { SelectInputOption } from '@/components/SelectInput';
import {
  ProjectMemberRoleEnum,
  ProjectStatusEnum,
} from '@/features/project/types/enums';

export const projectMenuItems = [
  { label: '프로젝트', href: '/project', icon: '▦' },
  { label: '내 작업', href: '/project/tasks', icon: '☑' },
  { label: '캘린더', href: '/project/calendar', icon: '□' },
] as const;

export const projectAccountMenuItems = [
  { label: '설정', href: '/project/settings', icon: '⚙' },
  { label: '내 정보', href: '/project/profile', icon: '◎' },
] as const;

export const projectStatusOptions: SelectInputOption[] = [
  { label: '계획', value: ProjectStatusEnum.Planned },
  { label: '진행 중', value: ProjectStatusEnum.InProgress },
  { label: '완료', value: ProjectStatusEnum.Completed },
] as const;

export const roleLabels: Record<ProjectMemberRoleEnum, string> = {
  [ProjectMemberRoleEnum.Owner]: '소유자',
  [ProjectMemberRoleEnum.Member]: '멤버',
};
