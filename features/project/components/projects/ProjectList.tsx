'use client';

import Button from '@/components/Button';
import ProjectCard from './ProjectCard';
import SelectInput from '@/components/SelectInput';
import { type CreateProject, Project } from '../../types/project.type';
import { useForm } from 'react-hook-form';
import SearchInput from '@/components/SearchInput';
import React, { useState } from 'react';
import { projectStatusOptions } from '@/features/project/constants/project.const';
import ProjectModal from '@/features/project/components/projects/ProjectModal';
import {
  useCreateProjectMutation,
  useProjectInfiniteQuery,
} from '@/features/project/hooks/useProject';
import type { ProjectStatusEnum } from '@/features/project/types/enums';
import { useLoginInfoQuery } from '@/features/user/hooks/useUser';
import EmptyState from '@/features/project/components/EmptyState';
import ProjectCardSkeleton from '@/features/project/components/projects/ProjectCardSkeleton';

interface ProjectSearchForm {
  name?: string;
  status?: ProjectStatusEnum;
}

const tabs = ['전체', '내 프로젝트'];
const statusOptions = [{ label: '전체', value: '' }, ...projectStatusOptions];

const ProjectList = () => {
  const { register, handleSubmit } = useForm<ProjectSearchForm>();

  const { data: loginUser } = useLoginInfoQuery();

  const [selectedTab, setSelectedTab] = useState<string>('전체');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useState<
    ProjectSearchForm & { isMyProject?: boolean }
  >({ isMyProject: false });

  const onSubmit = (data: ProjectSearchForm) => {
    setSearchParams({
      name: data.name?.trim() || undefined,
      status: data.status || undefined,
      isMyProject: selectedTab !== '전체',
    });
  };

  const { data, fetchNextPage, hasNextPage, isPending, isFetchingNextPage } =
    useProjectInfiniteQuery(searchParams);
  const { mutate: createMutate } = useCreateProjectMutation();

  const projects = data?.pages?.map((v) => v.data).flat();

  const handleSaveProject = (data: Project) => {
    if (!loginUser) return;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, members, status, startDate, endDate, ...res } = data;
    const statusStr = String(status);
    const requestBody: CreateProject = {
      ...res,
      createdById: loginUser.id,
      status: statusStr === '' ? undefined : (statusStr as ProjectStatusEnum),
      startDate: startDate === '' ? null : startDate,
      endDate: endDate === '' ? null : endDate,
    };
    createMutate(requestBody);

    setIsCreateModalOpen(false);
  };

  const buttonStyle = (tab: string) =>
    selectedTab === tab
      ? 'border-primary text-primary'
      : 'text-muted hover:text-heading border-transparent';

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const element = event.currentTarget;

    // 바닥에 완전히 닿기 전에 미리 다음 페이지 요청
    const isNearBottom =
      element.scrollHeight - element.scrollTop - element.clientHeight < 100;

    if (isNearBottom && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return (
    <>
      {isCreateModalOpen && (
        <ProjectModal
          onSave={handleSaveProject}
          onClose={() => setIsCreateModalOpen(false)}
        />
      )}

      {isPending ? (
        <EmptyState
          title="프로젝트 목록을 불러오는 중입니다.."
          content="잠시 기다려주세요!"
        />
      ) : (
        <div className="h-full overflow-y-auto p-7" onScroll={handleScroll}>
          <header>
            <h1 className="text-heading text-2xl font-bold">프로젝트</h1>
            <p className="text-muted mt-1">참여 중인 프로젝트를 관리하세요.</p>
          </header>

          <form
            className="mt-6 flex items-center"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex min-w-0 flex-[4_1_0%] items-center gap-3">
              <div className="w-full max-w-96 min-w-0">
                <SearchInput
                  register={register('name')}
                  placeholder="프로젝트 검색..."
                />
              </div>
              <div className="w-full max-w-44 shrink-0">
                <SelectInput
                  options={statusOptions}
                  register={register('status')}
                />
              </div>
              <Button
                type="submit"
                text="검색"
                width="88px"
                height="44px"
                color="white"
              />
            </div>
            <div className="w-4 shrink-0" />
            <div className="flex min-w-0 flex-[1_1_0%] justify-end">
              <div className="w-full max-w-36">
                {selectedTab === '전체' && (
                  <Button
                    text="+ 새 프로젝트"
                    width="100%"
                    height="40px"
                    onClick={() => setIsCreateModalOpen(true)}
                  />
                )}
              </div>
            </div>
          </form>

          <div className="border-line mt-5 flex gap-6 overflow-x-auto border-b">
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => {
                  setSelectedTab(tab);
                  setSearchParams((prev) => {
                    return { ...prev, isMyProject: tab !== '전체' };
                  });
                }}
                className={`shrink-0 cursor-pointer border-b-2 px-1 pb-3 font-semibold ${buttonStyle(tab)}`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="mt-5 grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-4">
            {projects?.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
            {isFetchingNextPage && <ProjectCardSkeleton />}
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectList;
