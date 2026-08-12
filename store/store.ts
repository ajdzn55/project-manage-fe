import { create, StateCreator } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { devtools } from 'zustand/middleware';

const devtoolsMiddleware = (process.env.NODE_ENV === 'production'
  ? (initializer: unknown) => initializer
  : devtools) as unknown as typeof devtools;

export const createStore = <T extends object>(
  initializer: StateCreator<T, [['zustand/devtools', never], ['zustand/immer', never]]>,
  options?: { name: string },
) =>
  create<T, [['zustand/devtools', never], ['zustand/immer', never]]>(devtoolsMiddleware(immer(initializer), options));
