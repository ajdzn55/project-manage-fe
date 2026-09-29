import StatusBadge from '@/features/project/components/StatusBadge';
import MoreMenuButton from '@/components/MoreMenuButton';
import type { ProjectTask } from '@/features/project/types/task.type';
import { useUserListQuery } from '@/features/user/hooks/useUser';

interface Props {
  tasks: ProjectTask[];
  isOwner?: boolean;
}

const DueProjectTaskList = ({ tasks, isOwner }: Props) => {
  const { data: users } = useUserListQuery();

  const getAssigneeName = (userId: string) => {
    return users?.find((user) => user.id === userId)?.name;
  };

  return (
    <section className="border-line overflow-hidden rounded-xl border">
      <div className="border-line flex items-center border-b px-5 py-3">
        <h2 className="text-heading font-bold">최근 작업</h2>
      </div>
      <div className="divide-y divide-slate-100">
        {tasks?.slice(0, 3).map((task) => (
          <div
            key={task.id}
            className="grid grid-cols-[2fr_1fr_1fr_1fr_auto] items-center gap-4 px-5 py-4"
          >
            <div className="flex min-w-0 items-center gap-3">
              <span className="text-danger">□</span>
              <span className="truncate font-medium">{task.name}</span>
            </div>
            <span className="text-body">
              {task?.assigneeId ? getAssigneeName(task?.assigneeId) : '미지정'}
            </span>
            <div>
              <StatusBadge status={task.status} />
            </div>
            <time className="text-muted">{task.dueDate ?? '미정'}</time>
            {isOwner && <MoreMenuButton />}
          </div>
        ))}
      </div>
    </section>
  );
};

export default DueProjectTaskList;
