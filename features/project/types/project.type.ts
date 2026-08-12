import { ProjectMemberRoleEnum, ProjectStatusEnum } from './enums';

export interface ProjectMember {
  id: string;
  userId: string;
  name: string;
  role: ProjectMemberRoleEnum;
}

export interface Project {
  id: string;
  name: string;
  description?: string | null;
  status: ProjectStatusEnum;
  startDate?: string | null;
  endDate?: string | null;
  Members: ProjectMember[];
}
