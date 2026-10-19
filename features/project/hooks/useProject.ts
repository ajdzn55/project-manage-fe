import {
  keepPreviousData,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {
  createProject,
  deleteProject,
  getProject,
  getProjectList,
  updateProject,
} from '@/features/project/api/project';
import type {
  CreateProject,
  Project,
  Projects,
  ProjectSearchParams,
  UpdateProject,
} from '@/features/project/types/project.type';
import { toastAlert } from '@/utils/alert';

export const useCreateProjectMutation = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (data: CreateProject) => createProject(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['project'] });
      toastAlert({ type: 'success', content: '프로젝트가 생성되었습니다.' });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return { mutate };
};

export const useProjectInfiniteQuery = (
  searchParams: Pick<ProjectSearchParams, 'name' | 'status' | 'isMyProject'>,
) => {
  return useInfiniteQuery<Projects>({
    queryKey: ['project', searchParams], // 서로 다른 검색 겨과가 같은 캐시를 사용할 수도 있어서
    queryFn: ({ pageParam }) => {
      return getProjectList({
        ...searchParams,
        page: Number(pageParam),
        limit: 16,
      });
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const loadedCount = allPages.length * 16;

      // 수신 건수가 전체 건수보다 작으면 더 불러오고, 아니면 그만 불러오도록
      return loadedCount < lastPage.totalCount
        ? allPages.length + 1
        : undefined;
    },
    placeholderData: keepPreviousData,
  });
};

export const useProjectQuery = (id: string) => {
  const { data } = useQuery<Project>({
    queryKey: ['project', id],
    queryFn: () => getProject(id),
    enabled: !!id,
  });

  return { data };
};

export const useUpdateProjectMutation = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateProject }) =>
      updateProject(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['project'] });
      toastAlert({ type: 'success', content: '프로젝트가 수정되었습니다.' });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return { mutate };
};

export const useDeleteProjectMutation = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (id: string) => deleteProject(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['project'] });
      toastAlert({ type: 'success', content: '프로젝트가 삭제되었습니다.' });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return { mutate };
};
