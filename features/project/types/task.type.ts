import {
  TaskPriorityEnum,
  type TaskStatusEnum,
} from '@/features/project/types/enums';

export interface ProjectTask {
  id: string;
  name: string;
  description?: string | null;
  backgroundColor?: string;
  status: TaskStatusEnum;
  priority: TaskPriorityEnum;
  assigneeId?: string | null;
  dueDate?: string | null;
  createdById: string;
}

export type CreateProjectTask = Omit<ProjectTask, 'id' | 'createdById'> & {
  projectId: string;
};

export type UpdateProjectTask = Omit<
  CreateProjectTask,
  'status' | 'priority' | 'projectId'
> & {
  status?: TaskStatusEnum;
  priority?: TaskPriorityEnum;
};

export interface TaskSearchParams {
  projectId?: string;
  month?: string;
  isMyTask?: string;
}
