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
  UpdateProjectTask,
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
import type { RowSelectionState } from '@tanstack/react-table';
import { motion } from 'motion/react';
import TaskBatchEditModal, {
  type BatchEditField,
} from '@/features/project/components/projects/TaskBatchEditModal';
import { updateTask } from '@/features/project/api/task';

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
          assigneeId: assigneeId === '' ? null : assigneeId,
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

  // 테이블 체크 상태
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const selectedTaskIds = Object.keys(rowSelection);

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

  const [batchEditField, setBatchEditField] = useState<BatchEditField | null>(
    null,
  );

  const handleBatchUpdate = async (data: Partial<UpdateProjectTask>) => {
    const { status, dueDate, assigneeId } = data;
    const statusStr = String(status);

    const requestBody = {
      ...(batchEditField === 'assigneeId' && {
        assigneeId: assigneeId === '' ? null : assigneeId,
      }),
      ...(batchEditField === 'status' && {
        status: statusStr === '' ? undefined : (status as TaskStatusEnum),
      }),
      ...(batchEditField === 'dueDate' && {
        dueDate: dueDate === '' ? null : dueDate,
      }),
    };

    const results = await Promise.allSettled(
      selectedTaskIds.map((id) => updateTask(id, requestBody)),
    );
    await queryClient.invalidateQueries({
      queryKey: ['task'],
    });

    const failedCount = results.filter(
      (result) => result.status === 'rejected',
    ).length;

    if (failedCount === 0) {
      toastAlert({
        type: 'success',
        content: `${selectedTaskIds.length}개 작업이 수정되었습니다.`,
      });

      setBatchEditField(null);
      setRowSelection({});
      return;
    }

    dialogAlert({
      type: 'error',
      content: `${failedCount}개의 작업 수정에 실패했습니다.`,
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
      {batchEditField !== null && (
        <TaskBatchEditModal
          field={batchEditField}
          onSave={handleBatchUpdate}
          onClose={() => setBatchEditField(null)}
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
        <div className="h-full min-h-0 p-7">
          <section className="border-line flex h-full min-h-0 flex-col overflow-hidden rounded-xl border">
            <div className="border-line flex shrink-0 items-center justify-between border-b px-5 py-3">
              <div className="flex items-center gap-3">
                <h2 className="text-heading font-bold">전체 작업</h2>
                <p className="text-muted text-xs">총 {tasks?.length}건</p>
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

            <div className="relative m-3 min-h-0 flex-1">
              <Table
                columns={columns}
                data={tasks ?? []}
                tableBorder
                rowSelection={rowSelection}
                onRowSelectionChange={setRowSelection}
              />

              {selectedTaskIds.length > 0 && (
                <motion.div
                  initial={{ x: '-50%', y: 20, opacity: 0 }}
                  animate={{ x: '-50%', y: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="border-line bg-surface absolute bottom-3 left-1/2 z-10 flex gap-5 rounded-md border p-2 shadow-[0_12px_32px_rgba(15,23,42,0.18)]"
                >
                  <span className="text-primary flex shrink-0 items-center pl-3 font-semibold">{`${selectedTaskIds.length}개 작업 선택됨`}</span>
                  <div className="bg-line my-1 w-px shrink-0" />
                  <div className="flex gap-3">
                    <Button
                      text="담당자 변경"
                      width="100px"
                      height="40px"
                      color="white"
                      onClick={() => setBatchEditField('assigneeId')}
                    />
                    <Button
                      text="상태 변경"
                      width="100px"
                      height="40px"
                      color="white"
                      onClick={() => setBatchEditField('status')}
                    />
                    <Button
                      text="마감일 변경"
                      width="100px"
                      height="40px"
                      color="white"
                      onClick={() => setBatchEditField('dueDate')}
                    />
                  </div>
                </motion.div>
              )}
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default ProjectTasksTab;
