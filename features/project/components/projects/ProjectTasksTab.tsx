import Button from '@/components/Button';
import Table from '@/components/Table';
import { projectTaskColumns } from '@/features/project/constants/project.columns';
import { useCallback, useMemo, useState } from 'react';
import TaskModal from '../tasks/TaskModal';
import { dialogAlert, toastAlert } from '@/utils/alert';
import EmptyState from '@/features/project/components/EmptyState';
import type {
  CreateProjectTask,
  ProjectTask,
} from '@/features/project/types/task.type';
import {
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useTaskListQuery,
  useUpdateTaskMutation,
} from '@/features/project/hooks/useTask';
import { TaskStatusEnum } from '@/features/project/types/enums';
import {
  useLoginInfoQuery,
  useUserListQuery,
} from '@/features/user/hooks/useUser';
import { useQueryClient } from '@tanstack/react-query';

interface Props {
  projectId: string;
  isOwner?: boolean;
}

const ProjectTasksTab = ({ projectId, isOwner }: Props) => {
  const { data: loginUser } = useLoginInfoQuery();
  const { data: users } = useUserListQuery();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [rowId, setRowId] = useState<string | null>(null);

  const { data: tasks } = useTaskListQuery({ projectId });
  const { mutate: createMutate } = useCreateTaskMutation();
  const { mutate: updateMutate } = useUpdateTaskMutation();
  const { mutate: deleteMutate } = useDeleteTaskMutation();

  const queryClient = useQueryClient();

  const targetTask = tasks?.find((v) => v.id === rowId);

  const onCreateTaskClick = () => {
    setRowId(null);
    setIsModalOpen(true);
  };

  const handleModifyTask = useCallback((taskId: string) => {
    setRowId(taskId);
    setIsModalOpen(true);
  }, []);

  const handleDeleteTask = useCallback(
    async (taskId: string) => {
      const alertRes = await dialogAlert({
        type: 'warning',
        content: '작업을 삭제하시겠습니까?',
        showCancelButton: true,
      });

      if (alertRes.isConfirmed) {
        deleteMutate(taskId, {
          onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: ['project', projectId] }),
        });
      }
    },
    [deleteMutate, projectId, queryClient],
  );

  const handleSaveTask = useCallback(
    (data: ProjectTask) => {
      if (!loginUser) return;

      const { id, status, dueDate, assigneeId, ...body } = data;
      const statusStr = String(status);

      if (rowId) {
        updateMutate(
          {
            id,
            data: {
              ...body,
              assigneeId: assigneeId === '' ? null : assigneeId,
              status: statusStr === '' ? undefined : (status as TaskStatusEnum),
              dueDate: dueDate === '' ? null : dueDate,
            },
          },
          {
            onSuccess: () => {
              queryClient.invalidateQueries({
                queryKey: ['project', projectId],
              });
              toastAlert({
                type: 'success',
                content: '작업이 수정되었습니다.',
              });
            },
          },
        );
      } else {
        const requestBody: CreateProjectTask = {
          ...body,
          projectId,
          status: statusStr === '' ? undefined : (status as TaskStatusEnum),
          dueDate: dueDate === '' ? null : dueDate,
        };
        createMutate(requestBody, {
          onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: ['project', projectId] }),
        });
      }

      setIsModalOpen(false);
    },
    [createMutate, loginUser, projectId, queryClient, rowId, updateMutate],
  );

  const columns = useMemo(
    () =>
      projectTaskColumns(
        users ?? [],
        isOwner,
        handleModifyTask,
        handleDeleteTask,
      ),
    [handleDeleteTask, handleModifyTask, isOwner, users],
  );

  return (
    <>
      {isModalOpen && (
        <TaskModal
          onClose={() => setIsModalOpen(false)}
          targetTask={targetTask}
          onSave={handleSaveTask}
        />
      )}

      {tasks?.length === 0 ? (
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
                <p className="text-muted mt-1 text-xs">총 {tasks?.length}건</p>
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
              <Table columns={columns} data={tasks ?? []} tableBorder />
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default ProjectTasksTab;
