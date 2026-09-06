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
  status: ProjectStatusEnum;
  startDate?: string | null;
  endDate?: string | null;
  Members?: ProjectMember[];
}

export interface ProjectSimple extends Omit<
  Project,
  'description' | 'Members'
> {
  createdById: string;
}

export type CreateProject = Omit<Project, 'id' | 'Members'> & {
  createdById: string;
};

export type UpdateProject = Omit<CreateProject, 'status' | 'createdById'> & {
  status?: ProjectStatusEnum;
};
