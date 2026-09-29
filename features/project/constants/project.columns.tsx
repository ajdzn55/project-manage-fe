import { createTableColumnHelper, type TableColumn } from '@/components/Table';
import MoreMenuButton from '@/components/MoreMenuButton';
import StatusBadge from '@/features/project/components/StatusBadge';
import { roleLabels } from '@/features/project/constants/project.const';
import { ProjectMemberRoleEnum } from '@/features/project/types/enums';
import type { ProjectMember } from '@/features/project/types/project.type';
import type { User } from '@/features/user/types/user.type';
import type { ProjectTask } from '@/features/project/types/task.type';
import { TaskPriorityDesc } from '@/features/project/constants/task.const';

const avatarStyles = [
  'bg-amber-100 text-amber-700',
  'bg-primary-soft text-blue-700',
  'bg-emerald-100 text-emerald-700',
] as const;

const memberColumnHelper = createTableColumnHelper<ProjectMember>();
const memberColumns = memberColumnHelper.columns([
  memberColumnHelper.accessor('name', {
    header: '이름',
    size: 300,
    cell: (info) => (
      <div className="flex items-center gap-3">
        <span
          className={`flex size-9 shrink-0 items-center justify-center rounded-full font-bold ${avatarStyles[info.row.index % avatarStyles.length]}`}
        >
          {info.getValue().slice(0, 1)}
        </span>
        <span className="text-heading truncate font-medium">
          {info.getValue()}
        </span>
      </div>
    ),
  }),
  memberColumnHelper.accessor('email', {
    header: '이메일',
    size: 450,
  }),
  memberColumnHelper.accessor('role', {
    header: '역할',
    size: 150,
    cell: (info) => (
      <span
        className={`inline-flex rounded-md px-2 py-1 text-xs font-semibold ${
          info.getValue() === ProjectMemberRoleEnum.Owner
            ? 'bg-blue-50 text-blue-600'
            : 'bg-emerald-50 text-emerald-600'
        }`}
      >
        {roleLabels[info.getValue()]}
      </span>
    ),
  }),
]);

interface ProjectTaskColumn extends ProjectTask {
  assigneeName?: string;
}

export const projectMemberColumns = (
  showActions?: boolean,
  onModify?: (userId: string) => void,
  onDelete?: (userId: string) => void,
  singleOwnerId?: string,
): TableColumn<ProjectMember>[] => {
  const memberActionsColumn = memberColumnHelper.display({
    id: 'actions',
    header: '관리',
    size: 100,
    minSize: 100,
    maxSize: 100,
    enableSorting: false,
    enableResizing: false,
    meta: { align: 'center' },
    cell: (info) => {
      const disabled = !!(
        singleOwnerId && info.row.original.userId === singleOwnerId
      );

      return (
        <MoreMenuButton
          onModify={() => {
            if (onModify) onModify(info.row.original.userId);
          }}
          onDelete={() => {
            if (onDelete) onDelete(info.row.original.userId);
          }}
          disabled={disabled}
        />
      );
    },
  });

  return showActions ? [...memberColumns, memberActionsColumn] : memberColumns;
};

const taskColumnHelper = createTableColumnHelper<ProjectTaskColumn>();
const taskColumns = (users: User[]) => {
  return taskColumnHelper.columns([
    taskColumnHelper.accessor('name', {
      header: '작업명',
      size: 300,
      cell: (info) => (
        <div className="flex min-w-0 items-center gap-3">
          <span className="text-danger">□</span>
          <span className="text-heading truncate font-medium">
            {info.getValue()}
          </span>
        </div>
      ),
    }),
    taskColumnHelper.display({
      id: 'assigneeName',
      header: '담당자',
      size: 200,
      cell: (info) => {
        const assigneeId = info.row.original.assigneeId;

        return assigneeId
          ? users.find((user) => user.id === assigneeId)?.name
          : '미지정';
      },
    }),
    taskColumnHelper.accessor('priority', {
      header: '우선순위',
      size: 180,
      cell: (info) => TaskPriorityDesc[info.getValue()],
    }),
    taskColumnHelper.accessor('status', {
      header: '상태',
      size: 180,
      cell: (info) => <StatusBadge status={info.getValue()} />,
    }),
    taskColumnHelper.accessor('dueDate', {
      header: '마감일',
      size: 200,
      cell: (info) => <time>{info.getValue() ?? '미정'}</time>,
    }),
  ]);
};

const taskActionsColumn = (
  onModify?: (rowId: string) => void,
  onDelete?: (rowId: string) => void,
) =>
  taskColumnHelper.display({
    id: 'actions',
    header: '관리',
    size: 120,
    minSize: 120,
    maxSize: 120,
    enableSorting: false,
    enableResizing: false,
    meta: { align: 'center' },
    cell: (info) => (
      <MoreMenuButton
        onModify={() => {
          if (onModify) onModify(info.row.original.id);
        }}
        onDelete={() => {
          if (onDelete) onDelete(info.row.original.id);
        }}
      />
    ),
  });

export const projectTaskColumns = (
  users: User[],
  showActions?: boolean,
  onModify?: (rowId: string) => void,
  onDelete?: (rowId: string) => void,
): TableColumn<ProjectTask>[] =>
  showActions && onModify && onDelete
    ? [...taskColumns(users), taskActionsColumn(onModify, onDelete)]
    : taskColumns(users);

const userColumnHelper = createTableColumnHelper<User>();

export const ProjectMemberColumns = userColumnHelper.columns([
  userColumnHelper.accessor('id', {
    header: '아이디',
    size: 100,
    cell: (info) => info.getValue(),
  }),
  userColumnHelper.accessor('name', {
    header: '이름',
    size: 80,
    cell: (info) => info.getValue(),
  }),
  userColumnHelper.accessor('email', {
    header: '이메일',
    size: 150,
    cell: (info) => <span title={info.getValue()}>{info.getValue()}</span>,
  }),
]);
