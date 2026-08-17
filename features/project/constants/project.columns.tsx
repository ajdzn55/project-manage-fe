import { ProjectMember } from '@/features/project/types/project.type';
import { TableColumn } from '@/components/Table';
import { ProjectMemberRoleEnum } from '@/features/project/types/enums';
import { roleLabels } from '@/features/project/constants/project.const';
import MoreMenuButton from '@/components/MoreMenuButton';
import type { ProjectTask } from '@/features/project/types/projectDetail.type';
import StatusBadge from '@/features/project/components/StatusBadge';

const avatarStyles = [
  'bg-amber-100 text-amber-700',
  'bg-blue-100 text-blue-700',
  'bg-emerald-100 text-emerald-700',
] as const;

export const projectMemberColumns: TableColumn<ProjectMember>[] = [
  {
    header: '이름',
    key: 'name',
    className: 'w-[28%]',
    render: (member, index) => (
      <div className="flex items-center gap-3">
        <span
          className={`flex size-9 shrink-0 items-center justify-center rounded-full font-bold ${avatarStyles[index % avatarStyles.length]}`}
        >
          {member.name.slice(0, 1)}
        </span>
        <span className="truncate font-medium text-slate-900">
          {member.name}
        </span>
      </div>
    ),
  },
  {
    header: '이메일',
    key: 'email',
    className: 'w-[42%]',
  },
  {
    header: '역할',
    key: 'role',
    className: 'w-[18%]',
    render: (member) => (
      <span
        className={`inline-flex rounded-md px-2 py-1 text-xs font-semibold ${
          member.role === ProjectMemberRoleEnum.Owner
            ? 'bg-blue-50 text-blue-600'
            : 'bg-emerald-50 text-emerald-600'
        }`}
      >
        {roleLabels[member.role]}
      </span>
    ),
  },
  {
    header: '작업',
    key: 'actions',
    className: 'w-[12%] text-center',
    render: () => <MoreMenuButton />,
  },
];

export const projectTaskColumns: TableColumn<ProjectTask>[] = [
  {
    header: '작업명',
    key: 'title',
    className: 'w-[30%]',
    render: (task) => (
      <div className="flex min-w-0 items-center gap-3">
        <span className="text-red-500">□</span>
        <span className="truncate font-medium text-slate-900">
          {task.title}
        </span>
      </div>
    ),
  },
  {
    header: '담당자',
    key: 'assigneeName',
    className: 'w-[20%]',
    render: (task) => task.assigneeName ?? '미지정',
  },
  {
    header: '상태',
    key: 'status',
    className: 'w-[18%]',
    render: (task) => <StatusBadge status={task.status} />,
  },
  {
    header: '마감일',
    key: 'dueDate',
    className: 'w-[20%]',
    render: (task) => <time>{task.dueDate ?? '미정'}</time>,
  },
  {
    header: '작업',
    key: 'actions',
    className: 'w-[12%] text-center',
    render: () => <MoreMenuButton />,
  },
];
