import {
  TaskPriorityEnum,
  TaskStatusEnum,
  TaskViewTypeEnum,
} from '@/features/project/types/enums';
import { BoardIcon, ListIcon } from '@/components/icons/SegmentIcons';

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

export const TaskViewTypeDesc = {
  [TaskViewTypeEnum.List]: '목록',
  [TaskViewTypeEnum.Board]: '보드',
};

export const segmentList = [
  {
    label: TaskViewTypeDesc[TaskViewTypeEnum.List],
    value: TaskViewTypeEnum.List,
    icon: <ListIcon />,
  },
  {
    label: TaskViewTypeDesc[TaskViewTypeEnum.Board],
    value: TaskViewTypeEnum.Board,
    icon: <BoardIcon />,
  },
];
