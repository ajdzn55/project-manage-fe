import { useTaskListQuery } from '@/features/project/hooks/useTask';
import DueProjectTaskList from '@/features/project/components/projects/DueProjectTaskList';
import EmptyState from '@/features/project/components/EmptyState';
import type { TaskSummary } from '@/features/project/types/task.type';

interface Props {
  projectId: string;
  isOwner?: boolean;
  taskSummary?: TaskSummary;
}

const ProjectOverviewTab = ({ projectId, isOwner, taskSummary }: Props) => {
  const { data: tasks } = useTaskListQuery({ projectId });

  return (
    <div className="space-y-5 p-7">
      {taskSummary && tasks && tasks?.length > 0 ? (
        <>
          <section className="border-line rounded-xl border p-5">
            <h2 className="text-heading font-bold">진행률</h2>
            <div className="mt-5 flex items-center gap-7">
              <div className="relative flex size-28 shrink-0 items-center justify-center rounded-full bg-[conic-gradient(var(--color-primary)_65%,var(--color-line)_0)]">
                <div className="flex size-22 items-center justify-center rounded-full bg-white text-2xl font-bold">
                  {taskSummary.progressRate}%
                </div>
              </div>
              <dl className="w-full max-w-xs space-y-2">
                {[
                  ['전체 작업', taskSummary.totalCount],
                  ['완료', taskSummary.doneCount],
                  ['진행 중', taskSummary.inProgressCount],
                  ['대기', taskSummary.todoCount],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between gap-4">
                    <dt className="text-muted">{label}</dt>
                    <dd className="font-semibold">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>

          <DueProjectTaskList isOwner={isOwner} tasks={tasks} />
        </>
      ) : (
        <EmptyState
          title="등록된 작업이 없습니다."
          content="작업을 등록하면 전체 진행률과 최근 작업 상태를 확인할 수 있습니다."
        />
      )}
    </div>
  );
};

export default ProjectOverviewTab;
