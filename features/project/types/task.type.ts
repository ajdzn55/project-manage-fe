import {
  TaskPriorityEnum,
  type TaskStatusEnum,
} from '@/features/project/types/enums';

export interface ProjectTask {
  id: string;
  name: string;
  description?: string | null;
  backgroundColor: string;
  status: TaskStatusEnum;
  priority: TaskPriorityEnum;
  assigneeId?: string | null;
  dueDate?: string | null;
  createdById: string;
}

export type CreateProjectTask = Omit<
  ProjectTask,
  'priority' | 'status' | 'id'
> & {
  projectId: string;
  status?: TaskStatusEnum;
  priority?: TaskPriorityEnum;
};

export type UpdateProjectTask = Omit<
  CreateProjectTask,
  'projectId' | 'createdById'
>;

export interface TaskSearchParams {
  projectId?: string;
  month?: string;
  isMyTask?: string;
}
