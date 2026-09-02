import {
  TaskPriorityEnum,
  type TaskStatusEnum,
} from '@/features/project/types/enums';

export interface ProjectTask {
  id: string;
  name: string;
  description?: string | null;
  backgroundColor?: string;
  status?: TaskStatusEnum | null;
  priority?: TaskPriorityEnum | null;
  assigneeId?: string | null;
  dueDate?: string | null;
  createdById: string;
}

export type CreateProjectTask = Partial<
  Omit<ProjectTask, 'id' | 'createdById'>
>;

export type UpdateProjectTask = CreateProjectTask;
