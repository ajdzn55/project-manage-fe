import { mockProjectDetail } from '@/features/project/mocks/projectDetail.mock';
import RecentProjectTaskList from '@/features/project/components/projects/RecentProjectTaskList';

interface Props {
  isOwner?: boolean;
}

const ProjectOverviewTab = ({ isOwner }: Props) => {
  const { TaskSummary } = mockProjectDetail;

  return (
    <div className="space-y-5 p-7">
      <section className="border-line rounded-xl border p-5">
        <h2 className="text-heading font-bold">진행률</h2>
        <div className="mt-5 flex items-center gap-7">
          <div className="relative flex size-28 shrink-0 items-center justify-center rounded-full bg-[conic-gradient(var(--color-primary)_65%,var(--color-line)_0)]">
            <div className="flex size-22 items-center justify-center rounded-full bg-white text-2xl font-bold">
              {TaskSummary.progressRate}%
            </div>
          </div>
          <dl className="w-full max-w-xs space-y-2">
            {[
              ['전체 작업', TaskSummary.totalCount],
              ['완료', TaskSummary.doneCount],
              ['진행 중', TaskSummary.inProgressCount],
              ['대기', TaskSummary.todoCount],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between gap-4">
                <dt className="text-muted">{label}</dt>
                <dd className="font-semibold">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <RecentProjectTaskList isOwner={isOwner} />
    </div>
  );
};

export default ProjectOverviewTab;
