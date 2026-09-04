import { useTaskListQuery } from '@/features/project/hooks/useTask';
import DueProjectTaskList from '@/features/project/components/projects/DueProjectTaskList';

interface Props {
  projectId: string;
  isOwner?: boolean;
}

const ProjectOverviewTab = ({ projectId, isOwner }: Props) => {
  const { data: tasks } = useTaskListQuery({ projectId });
  const progressRate = 1;
  const totalCount = 1;
  const doneCount = 1;
  const inProgressCount = 1;
  const todoCount = 1;

  return (
    <div className="space-y-5 p-7">
      <section className="border-line rounded-xl border p-5">
        <h2 className="text-heading font-bold">진행률</h2>
        <div className="mt-5 flex items-center gap-7">
          <div className="relative flex size-28 shrink-0 items-center justify-center rounded-full bg-[conic-gradient(var(--color-primary)_65%,var(--color-line)_0)]">
            <div className="flex size-22 items-center justify-center rounded-full bg-white text-2xl font-bold">
              {progressRate}%
            </div>
          </div>
          <dl className="w-full max-w-xs space-y-2">
            {[
              ['전체 작업', totalCount],
              ['완료', doneCount],
              ['진행 중', inProgressCount],
              ['대기', todoCount],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between gap-4">
                <dt className="text-muted">{label}</dt>
                <dd className="font-semibold">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <DueProjectTaskList isOwner={isOwner} tasks={tasks ?? []} />
    </div>
  );
};

export default ProjectOverviewTab;
