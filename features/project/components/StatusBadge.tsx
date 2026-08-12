import {
  ProjectStatusEnum,
  TaskStatusEnum,
} from '@/features/project/types/enums';

interface Props {
  status: ProjectStatusEnum | TaskStatusEnum;
}

const statusOptions = {
  [ProjectStatusEnum.Planned]: {
    label: '계획 중',
    className: 'bg-violet-50 text-violet-600',
  },
  [TaskStatusEnum.Todo]: {
    label: '대기',
    className: 'bg-amber-50 text-amber-600',
  },
  [ProjectStatusEnum.InProgress]: {
    label: '진행 중',
    className: 'bg-blue-50 text-blue-600',
  },
  [ProjectStatusEnum.Completed]: {
    label: '완료',
    className: 'bg-emerald-50 text-emerald-600',
  },
  [TaskStatusEnum.Done]: {
    label: '완료',
    className: 'bg-emerald-50 text-emerald-600',
  },
} satisfies Record<
  ProjectStatusEnum | TaskStatusEnum,
  { label: string; className: string }
>;

const StatusBadge = ({ status }: Props) => {
  const option = statusOptions[status];

  return (
    <span
      className={`inline-flex w-fit rounded-md px-2 py-1 text-xs font-semibold ${option.className}`}
    >
      {option.label}
    </span>
  );
};

export default StatusBadge;
