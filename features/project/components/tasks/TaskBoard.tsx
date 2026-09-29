import ProfileIcon from '@/components/icons/ProfileIcon';
import DeadlineIcon from '@/components/icons/DeadlineIcon';
import type { ProjectTask } from '@/features/project/types/task.type';
import { TaskStatusEnum } from '@/features/project/types/enums';
import {
  TaskPriorityColor,
  TaskPriorityDesc,
  TaskStatusDesc,
} from '@/features/project/constants/task.const';
import { useUserListQuery } from '@/features/user/hooks/useUser';
import { useState, type DragEvent } from 'react';
import { useUpdateTaskMutation } from '@/features/project/hooks/useTask';

interface Props {
  status: TaskStatusEnum;
  data: ProjectTask[];
}

const TaskBoard = ({ status, data }: Props) => {
  const { data: users } = useUserListQuery();
  const { mutate } = useUpdateTaskMutation();

  const [isDraggingFromHere, setIsDraggingFromHere] = useState<boolean>(false);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    // 어떤 드래그 동작인지 브라우저에 알리기
    e.dataTransfer.dropEffect = 'move';

    if (!isDraggingFromHere) {
      setIsDragOver(true);
    }
  };

  const handleDragStart = (e: DragEvent<HTMLDivElement>, taskId: string) => {
    // 드래그하려는 카드 ID 저장 (드롭하는 곳에서 꺼내어 사용)
    e.dataTransfer.setData('text/plain', taskId);
    // 드래그 동작 허용 범위 결정
    e.dataTransfer.effectAllowed = 'move';

    setIsDraggingFromHere(true);
  };

  const handleDragEnd = () => {
    setIsDraggingFromHere(false);
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    // 마우스가 다음으로 진입한 요소
    const nextTarget = event.relatedTarget;

    // 다음 요소가 보드 내부인지 여부
    if (
      nextTarget instanceof Node &&
      event.currentTarget.contains(nextTarget)
    ) {
      return;
    }

    setIsDragOver(false);
  };

  // 카드 드롭 시 해당 상태로 변경
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);

    // 드롭한 카드 ID
    const taskId = e.dataTransfer.getData('text/plain');

    if (!taskId) return;
    // 원래 보드에 놓은 경우
    if (data.some((v) => v.id === taskId)) return;

    mutate({
      id: taskId,
      data: { status },
    });
  };

  return (
    <div
      style={{ height: 'calc(100vh - 270px)' }}
      className={`flex flex-col rounded-md border p-3 transition-colors ${
        isDragOver ? 'border-primary bg-primary-soft' : 'border-line bg-surface'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="mb-3 flex h-[24px] shrink-0 items-center justify-between font-semibold">
        <span className="px-2">{TaskStatusDesc[status]}</span>
        <span className="bg-line w-[40px] rounded-md text-center">
          {data.length} 건
        </span>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-2.5">
        {data.map((v) => (
          <div
            key={v.id}
            draggable
            onDragStart={(e) => handleDragStart(e, v.id)}
            onDragEnd={handleDragEnd}
            className="border-line mb-2 flex cursor-grab flex-col gap-3 rounded-md border bg-white p-3 hover:border-blue-300 hover:shadow-md active:cursor-grabbing"
          >
            <div className="flex items-center justify-between">
              <span className="font-semibold">{v.name}</span>
              <div
                className={`rounded-md px-1.5 text-xs font-semibold ${TaskPriorityColor[v.priority]}`}
              >
                {TaskPriorityDesc[v.priority]}
              </div>
            </div>
            <div className="text-muted flex justify-between">
              <div className="flex">
                <ProfileIcon />
                <span>
                  {v.assigneeId
                    ? users?.find((user) => user.id === v.assigneeId)?.name
                    : ''}
                </span>
              </div>

              <div className="flex gap-1">
                <DeadlineIcon />
                <span>{v.dueDate ?? '미정'}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskBoard;
