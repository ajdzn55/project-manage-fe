export interface User {
  id: string;
  name: string;
  email?: string;
}

export interface CreateUser extends Omit<User, 'createdAt' | 'updatedAt'> {
  password: string;
}

export type UpdateUser = Partial<Pick<User, 'name' | 'email'>>;

export interface LoginInfo extends User {
  createdAt: string;
}

export type UserLogin = Pick<CreateUser, 'id' | 'password'>;

export interface NoticeCheck {
  lastCheckedDate?: string;
}
