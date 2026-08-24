import { SelectInputOption } from '@/components/SelectInput';
import {
  ProjectMemberRoleEnum,
  ProjectStatusEnum,
  TaskStatusEnum,
} from '@/features/project/types/enums';

export const projectMenuItems = [
  {
    label: '프로젝트',
    href: '/project',
    defaultIcon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3.5 8.75L10 3.5L16.5 8.75V16.5H12.5V12H7.5V16.5H3.5V8.75Z"
          stroke="#475569"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),
    activeIcon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3.5 8.75L10 3.5L16.5 8.75V16.5H12.5V12H7.5V16.5H3.5V8.75Z"
          stroke="#2563EB"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),
  },
  {
    label: '내 작업',
    href: '/project/tasks',
    defaultIcon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14 3.5H6C4.89543 3.5 4 4.39543 4 5.5V14.5C4 15.6046 4.89543 16.5 6 16.5H14C15.1046 16.5 16 15.6046 16 14.5V5.5C16 4.39543 15.1046 3.5 14 3.5Z"
          stroke="#475569"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M7.5 3.5V2.75C7.5 2.34 7.84 2 8.25 2H11.75C12.16 2 12.5 2.34 12.5 2.75V3.5M7 10L9 12L13 8"
          stroke="#475569"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),
    activeIcon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14 3.5H6C4.89543 3.5 4 4.39543 4 5.5V14.5C4 15.6046 4.89543 16.5 6 16.5H14C15.1046 16.5 16 15.6046 16 14.5V5.5C16 4.39543 15.1046 3.5 14 3.5Z"
          stroke="#2563EB"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M7.5 3.5V2.75C7.5 2.34 7.84 2 8.25 2H11.75C12.16 2 12.5 2.34 12.5 2.75V3.5M7 10L9 12L13 8"
          stroke="#2563EB"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),
  },
  {
    label: '캘린더',
    href: '/project/calendar',
    defaultIcon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14.5 4.5H5.5C4.39543 4.5 3.5 5.39543 3.5 6.5V14.5C3.5 15.6046 4.39543 16.5 5.5 16.5H14.5C15.6046 16.5 16.5 15.6046 16.5 14.5V6.5C16.5 5.39543 15.6046 4.5 14.5 4.5Z"
          stroke="#475569"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M6.5 2.75V6M13.5 2.75V6M3.5 8H16.5M7 11H7.01M10 11H10.01M13 11H13.01M7 14H7.01M10 14H10.01"
          stroke="#475569"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),
    activeIcon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14.5 4.5H5.5C4.39543 4.5 3.5 5.39543 3.5 6.5V14.5C3.5 15.6046 4.39543 16.5 5.5 16.5H14.5C15.6046 16.5 16.5 15.6046 16.5 14.5V6.5C16.5 5.39543 15.6046 4.5 14.5 4.5Z"
          stroke="#2563EB"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M6.5 2.75V6M13.5 2.75V6M3.5 8H16.5M7 11H7.01M10 11H10.01M13 11H13.01M7 14H7.01M10 14H10.01"
          stroke="#2563EB"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),
  },
] as const;

export const projectAccountMenu = {
  label: '내 정보',
  href: '/project/profile',
  defaultIcon: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 10C11.6569 10 13 8.65685 13 7C13 5.34315 11.6569 4 10 4C8.34315 4 7 5.34315 7 7C7 8.65685 8.34315 10 10 10Z"
        stroke="#475569"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M4 16.5C4.65 13.75 6.85 12 10 12C13.15 12 15.35 13.75 16 16.5"
        stroke="#475569"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  ),
  activeIcon: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 10C11.6569 10 13 8.65685 13 7C13 5.34315 11.6569 4 10 4C8.34315 4 7 5.34315 7 7C7 8.65685 8.34315 10 10 10Z"
        stroke="#2563EB"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M4 16.5C4.65 13.75 6.85 12 10 12C13.15 12 15.35 13.75 16 16.5"
        stroke="#2563EB"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  ),
} as const;

export const logoutMenu = {
  defaultIcon: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.5 3.5H5.5C4.4 3.5 3.5 4.4 3.5 5.5V14.5C3.5 15.6 4.4 16.5 5.5 16.5H8.5M11.5 13.5L15 10L11.5 6.5M15 10H7.5"
        stroke="#475569"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  ),
  activeIcon: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.5 3.5H5.5C4.4 3.5 3.5 4.4 3.5 5.5V14.5C3.5 15.6 4.4 16.5 5.5 16.5H8.5M11.5 13.5L15 10L11.5 6.5M15 10H7.5"
        stroke="#2563EB"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  ),
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
