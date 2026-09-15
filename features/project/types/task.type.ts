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
  'priority' | 'status' | 'id' | 'createdById'
> & {
  projectId: string;
  status?: TaskStatusEnum;
  priority?: TaskPriorityEnum;
};

export type UpdateProjectTask = Partial<Omit<CreateProjectTask, 'projectId'>>;

export interface TaskSearchParams {
  projectId?: string;
  month?: string;
  isMyTask?: boolean;
}

export interface DailyCompletedCount {
  date: string;
  count: number;
}

export interface TaskSummary {
  totalCount: number;
  todoCount: number;
  inProgressCount: number;
  doneCount: number;
  progressRate: number;
  dailyCompletedCounts: DailyCompletedCount[];
}
