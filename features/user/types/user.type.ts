export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUser extends Omit<User, 'createdAt' | 'updatedAt'> {
  password: string;
}

export type UpdateUser = Partial<Pick<User, 'name' | 'email'>>;
