import { TaskSummary } from '@/features/project/types/task.type';
import {
  TaskPriorityEnum,
  TaskStatusEnum,
} from '@/features/project/types/enums';
import { Project } from './project.type';

export interface ProjectDetail extends Project {
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  TaskSummary: TaskSummary;
}

export interface ProjectTask {
  id: string;
  projectId: ProjectDetail['id'];
  name: string;
  description?: string | null;
  backgroundColor?: string | null;
  status: TaskStatusEnum;
  priority: TaskPriorityEnum;
  assigneeId?: string | null;
  assigneeName?: string | null;
  dueDate?: string | null;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}
