import Button from '@/components/Button';
import { mockProjectTasks } from '@/features/project/mocks/projectDetail.mock';
import Table from '@/components/Table';
import { projectTaskColumns } from '@/features/project/constants/project.columns';
import { useState } from 'react';
import CreateTaskModal from '@/features/project/components/tasks/CreateTaskModal';

interface Props {
  isOwner: boolean;
}

const ProjectTasksTab = ({ isOwner }: Props) => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);

  const onNewTaskClick = () => {
    setIsCreateModalOpen(true);
  };

  return (
    <>
      {isCreateModalOpen && (
        <CreateTaskModal onClose={() => setIsCreateModalOpen(false)} />
      )}

      <div className="space-y-5 p-5 md:p-7">
        <section className="overflow-hidden rounded-xl border border-slate-200">
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
            <div>
              <h2 className="font-bold text-slate-900">전체 작업</h2>
              <p className="mt-1 text-xs text-slate-500">
                총 {mockProjectTasks.length}건
              </p>
            </div>
            <div className="w-36">
              <Button
                text="+ 새 작업"
                width="100%"
                height="40px"
                onClick={onNewTaskClick}
              />
            </div>
          </div>

          <div className="m-3">
            <Table
              columns={projectTaskColumns(isOwner)}
              data={mockProjectTasks}
              tableBorder
            />
          </div>
        </section>
      </div>
    </>
  );
};

export default ProjectTasksTab;
