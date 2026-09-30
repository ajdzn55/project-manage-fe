'use client';

import Button from '@/components/Button';
import ProjectCard from './ProjectCard';
import SelectInput from '@/components/SelectInput';
import { type CreateProject, Project } from '../../types/project.type';
import { useForm, useWatch } from 'react-hook-form';
import SearchInput from '@/components/SearchInput';
import { useMemo, useState } from 'react';
import { projectStatusOptions } from '@/features/project/constants/project.const';
import ProjectModal from '@/features/project/components/projects/ProjectModal';
import {
  useCreateProjectMutation,
  useProjectListQuery,
} from '@/features/project/hooks/useProject';
import type { ProjectStatusEnum } from '@/features/project/types/enums';
import { useLoginInfoQuery } from '@/features/user/hooks/useUser';

const tabs = ['전체', '내 프로젝트'];
const statusOptions = [{ label: '전체', value: '' }, ...projectStatusOptions];

const ProjectList = () => {
  const { register, control } = useForm<Project>();
  const wName = useWatch({ control, name: 'name' });
  const wStatus = useWatch({ control, name: 'status' });

  const { data: loginUser } = useLoginInfoQuery();

  const [selectedTab, setSelectedTab] = useState<string>('전체');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);

  const { data: projects } = useProjectListQuery();
  const { mutate: createMutate } = useCreateProjectMutation();

  const filteredProjects = useMemo(() => {
    // 상태로 필터링
    const statusFiltered =
      (wStatus ? projects?.filter((v) => v.status === wStatus) : projects) ??
      [];

    // 이름으로 필터링
    const nameFiltered = wName
      ? statusFiltered.filter((v) => v.name.includes(wName))
      : statusFiltered;

    // 탭으로 필터링
    return selectedTab !== '전체'
      ? nameFiltered.filter((v) => v.createdById === loginUser?.id)
      : nameFiltered;
  }, [wStatus, projects, wName, selectedTab, loginUser?.id]);

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

  return (
    <>
      {isCreateModalOpen && (
        <ProjectModal
          onSave={handleSaveProject}
          onClose={() => setIsCreateModalOpen(false)}
        />
      )}

      <div className="h-full overflow-y-auto p-7">
        <header>
          <h1 className="text-heading text-2xl font-bold">프로젝트</h1>
          <p className="text-muted mt-1">참여 중인 프로젝트를 관리하세요.</p>
        </header>

        <form
          className="mt-6 flex items-center"
          onSubmit={(e) => e.preventDefault()}
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
              onClick={() => setSelectedTab(tab)}
              className={`shrink-0 cursor-pointer border-b-2 px-1 pb-3 font-semibold ${buttonStyle(tab)}`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="mt-5 grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-4">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ProjectList;
