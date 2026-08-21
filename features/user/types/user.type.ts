export interface User {
  id: string;
  password: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export type AuthUser = Omit<User, 'password'>;
