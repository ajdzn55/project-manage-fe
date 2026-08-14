import Button from '@/components/Button';
import MemberAvatars from './MemberAvatars';
import StatusBadge from './StatusBadge';
import {
  mockProjectDetail,
  mockProjectTasks,
} from '../mocks/projectDetail.mock';

const tabs = ['개요', '작업', '보드', '일정', '파일', '설정'];

const ProjectDetail = () => {
  const { TaskSummary } = mockProjectDetail;

  return (
    <div>
      <header className="border-b border-slate-200 px-5 pt-5 md:px-7 md:pt-7">
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-start gap-4">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-violet-100 font-bold text-violet-600">
              A
            </span>
            <div className="min-w-0">
              <h1 className="truncate text-2xl font-bold text-slate-900">
                {mockProjectDetail.name}
              </h1>
              <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                <StatusBadge status={mockProjectDetail.status} />
                <span>
                  ▣ {mockProjectDetail.startDate ?? '미정'} -{' '}
                  {mockProjectDetail.endDate ?? '미정'}
                </span>
                <MemberAvatars
                  members={mockProjectDetail.Members.map((member) => ({
                    id: member.userId,
                    name: member.name,
                  }))}
                />
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              className="flex size-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50"
            >
              ↗
            </button>
            <button
              type="button"
              className="flex size-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50"
            >
              ⋮
            </button>
          </div>
        </div>
        <nav className="mt-6 flex gap-7 overflow-x-auto">
          {tabs.map((tab, index) => (
            <button
              key={tab}
              type="button"
              className={`shrink-0 border-b-2 px-1 pb-3 text-sm font-semibold ${index === 0 ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-900'}`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </header>

      <div className="space-y-5 p-5 md:p-7">
        <section className="rounded-xl border border-slate-200 p-5">
          <h2 className="font-bold text-slate-900">진행률</h2>
          <div className="mt-5 flex items-center gap-7">
            <div className="relative flex size-28 shrink-0 items-center justify-center rounded-full bg-[conic-gradient(#2563eb_65%,#e2e8f0_0)]">
              <div className="flex size-22 items-center justify-center rounded-full bg-white text-2xl font-bold">
                {TaskSummary.progressRate}%
              </div>
            </div>
            <dl className="w-full max-w-xs space-y-2 text-sm">
              {[
                ['전체 작업', TaskSummary.totalCount],
                ['완료', TaskSummary.doneCount],
                ['진행 중', TaskSummary.inProgressCount],
                ['대기', TaskSummary.todoCount],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between gap-4">
                  <dt className="text-slate-500">{label}</dt>
                  <dd className="font-semibold">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="overflow-hidden rounded-xl border border-slate-200">
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
            <h2 className="font-bold text-slate-900">최근 작업</h2>
            <Button text="+ 새 작업" width="96px" height="36px" />
          </div>
          <div className="divide-y divide-slate-100">
            {mockProjectTasks.map((task) => (
              <div
                key={task.id}
                className="grid grid-cols-[1fr_auto] items-center gap-4 px-5 py-4 md:grid-cols-[2fr_1fr_1fr_1fr_auto]"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <span className="text-red-500">□</span>
                  <span className="truncate text-sm font-medium">
                    {task.title}
                  </span>
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
                <button
                  type="button"
                  className="text-slate-400 hover:text-slate-700"
                >
                  ⋮
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProjectDetail;
