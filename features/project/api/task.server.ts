import 'server-only';
import type {
  ProjectTask,
  TaskSearchParams,
} from '@/features/project/types/task.type';
import createServerAxios from '@/lib/server';

// 프로젝트 작업 목록 조회
export const getTaskList = async (params: TaskSearchParams) => {
  const serverAxios = await createServerAxios();

  try {
    const response = await serverAxios.get<ProjectTask[]>('/task', {
      params,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
