import Button from '@/components/Button';
import { mockProjectTasks } from '@/features/project/mocks/projectDetail.mock';
import Table from '@/components/Table';
import { projectTaskColumns } from '@/features/project/constants/project.columns';
import { useState } from 'react';
import TaskModal from '../tasks/TaskModal';
import { dialogAlert, toastAlert } from '@/utils/alert';
import EmptyState from '@/features/project/components/EmptyState';
import type { ProjectTask } from '@/features/project/types/task.type';

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
    const alertRes = await dialogAlert({
      type: 'warning',
      content: '작업을 삭제하시겠습니까?',
      showCancelButton: true,
    });

    if (alertRes.isConfirmed) {
      // TODO: api 연결 필요
    }
  };

  const handleSaveTask = (data: ProjectTask) => {
    // TODO: api 연결 필요

    setIsModalOpen(false);
    toastAlert({
      type: 'info',
      content: `작업이 ${data.id ? '수정' : '생성'}되었습니다.`,
    });
  };

  return (
    <>
      {isModalOpen && (
        <TaskModal
          onClose={() => setIsModalOpen(false)}
          targetTask={targetTask}
          onSave={handleSaveTask}
        />
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
