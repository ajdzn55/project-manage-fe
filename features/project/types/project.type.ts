import { ProjectMemberRoleEnum, ProjectStatusEnum } from './enums';
import { User } from '@/features/user/types/user.type';

export interface ProjectMember extends Pick<User, 'name' | 'email'> {
  userId: User['id'];
  role: ProjectMemberRoleEnum;
}

export type AddProjectMember = Pick<ProjectMember, 'userId'>;

export interface Project {
  id: string;
  name: string;
  description?: string | null;
  status?: ProjectStatusEnum | null;
  startDate?: string | null;
  endDate?: string | null;
  Members: ProjectMember[];
}

export type ProjectSimple = Omit<Project, 'description' | 'Members'>;

export interface CreateProject extends Project {
  createdById: string;
}

export type UpdateProject = Omit<CreateProject, 'createdById'>;
