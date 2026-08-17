import StatusBadge from '@/features/project/components/StatusBadge';
import { mockProjectTasks } from '@/features/project/mocks/projectDetail.mock';
import MoreMenuButton from '@/components/MoreMenuButton';

const RecentProjectTaskList = () => {
  const recentTasks = mockProjectTasks.slice(0, 3);

  return (
    <section className="overflow-hidden rounded-xl border border-slate-200">
      <div className="flex items-center border-b border-slate-200 px-5 py-4">
        <h2 className="font-bold text-slate-900">최근 작업</h2>
      </div>
      <div className="divide-y divide-slate-100">
        {recentTasks.map((task) => (
          <div
            key={task.id}
            className="grid grid-cols-[1fr_auto] items-center gap-4 px-5 py-4 md:grid-cols-[2fr_1fr_1fr_1fr_auto]"
          >
            <div className="flex min-w-0 items-center gap-3">
              <span className="text-red-500">□</span>
              <span className="truncate text-sm font-medium">{task.title}</span>
            </div>
            <span className="hidden text-sm text-slate-600 md:block">
              {task.assigneeName ?? '미지정'}
            </span>
            <div className="hidden md:block">
              <StatusBadge status={task.status} />
            </div>
            <time className="hidden text-sm text-slate-500 md:block">
              {task.dueDate ?? '미정'}
            </time>
            <MoreMenuButton />
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecentProjectTaskList;
