import 'server-only';
import createServerAxios from '@/lib/server';
import type { Project } from '@/features/project/types/project.type';

// 프로젝트 상세 조회
export const getProject = async (id: string) => {
  const serverAxios = await createServerAxios();

  try {
    const response = await serverAxios.get<Project>(`/project/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
