import Button from '@/components/Button';
import { mockProjectTasks } from '@/features/project/mocks/projectDetail.mock';
import Table from '@/components/Table';
import { projectTaskColumns } from '@/features/project/constants/project.columns';
import { useState } from 'react';
import TaskModal from '../tasks/TaskModal';
import { myAlert } from '@/utils/alert';
import EmptyState from '@/features/project/components/EmptyState';

interface Props {
  isOwner?: boolean;
}

const ProjectTasksTab = ({ isOwner }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [rowId, setRowId] = useState<string | null>(null);
  const targetTask = mockProjectTasks.find((v) => v.id === rowId);

  const onCreateTaskClick = () => {
    setRowId(null);
    setIsModalOpen(true);
  };

  const handleModifyTask = (taskId: string) => {
    setRowId(taskId);
    setIsModalOpen(true);
  };

  const handleDeleteTask = async (taskId: string) => {
    const alertRes = await myAlert({
      type: 'warning',
      content: '작업을 삭제하시겠습니까?',
      confirmButtonText: '예',
      cancelButtonText: '아니오',
    });

    if (alertRes.isConfirmed) {
      // TODO: api 연결 필요
    }
  };

  return (
    <>
      {isModalOpen && (
        <TaskModal onClose={() => setIsModalOpen(false)} data={targetTask} />
      )}

      {mockProjectTasks.length === 0 ? (
        <EmptyState
          title="표시할 작업이 없습니다."
          content="새 작업을 추가해 보세요!"
          actionText="+ 새 작업"
          onAction={onCreateTaskClick}
        />
      ) : (
        <div className="space-y-5 p-7">
          <section className="border-line overflow-hidden rounded-xl border">
            <div className="border-line flex items-center justify-between border-b px-5 py-4">
              <div>
                <h2 className="text-heading font-bold">전체 작업</h2>
                <p className="text-muted mt-1 text-xs">
                  총 {mockProjectTasks.length}건
                </p>
              </div>
              <div className="w-36">
                <Button
                  text="+ 새 작업"
                  width="100%"
                  height="40px"
                  onClick={onCreateTaskClick}
                />
              </div>
            </div>

            <div className="m-3">
              <Table
                columns={projectTaskColumns(
                  isOwner,
                  handleModifyTask,
                  handleDeleteTask,
                )}
                data={mockProjectTasks}
                tableBorder
              />
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default ProjectTasksTab;
