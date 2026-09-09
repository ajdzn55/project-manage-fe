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

export type CreateProjectTask = Omit<ProjectTask, 'status' | 'id'> & {
  projectId: string;
  status?: TaskStatusEnum;
};

export type UpdateProjectTask = Omit<
  CreateProjectTask,
  'priority' | 'projectId' | 'createdById'
> & {
  priority?: TaskPriorityEnum;
};

export interface TaskSearchParams {
  projectId?: string;
  month?: string;
  isMyTask?: string;
}
