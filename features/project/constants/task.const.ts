import {
  TaskPriorityEnum,
  TaskStatusEnum,
} from '@/features/project/types/enums';

export const TaskPriorityDesc = {
  [TaskPriorityEnum.Low]: '낮음',
  [TaskPriorityEnum.Medium]: '중간',
  [TaskPriorityEnum.High]: '높음',
};

export const TaskPriorityColor = {
  [TaskPriorityEnum.Low]: 'text-green-700 bg-green-50',
  [TaskPriorityEnum.Medium]: 'text-primary bg-blue-50',
  [TaskPriorityEnum.High]: 'text-danger bg-red-50',
};

export const TaskStatusDesc = {
  [TaskStatusEnum.Todo]: '대기',
  [TaskStatusEnum.InProgress]: '진행 중',
  [TaskStatusEnum.Done]: '완료',
};
