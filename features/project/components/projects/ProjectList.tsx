'use client';

import Button from '../../../../components/Button';
import ProjectCard from './ProjectCard';
import { mockProjects } from '../../mocks/project.mock';
import SelectInput from '../../../../components/SelectInput';
import { Project } from '../../types/project.type';
import { useForm, useWatch } from 'react-hook-form';
import SearchInput from '../../../../components/SearchInput';
import { useMemo, useState } from 'react';
import { useAuth } from '@/features/auth/hooks/useAuth';
import CreateProjectModal from '@/features/project/components/projects/CreateProjectModal';
import { projectStatusOptions } from '@/features/project/constants/project.const';

const tabs = ['전체', '내 프로젝트'];
const statusOptions = [{ label: '전체', value: '' }, ...projectStatusOptions];

const ProjectList = () => {
  const { register, control } = useForm<Project>();
  const wName = useWatch({ control, name: 'name' });
  const wStatus = useWatch({ control, name: 'status' });

  const { user } = useAuth();

  const [selectedTab, setSelectedTab] = useState<string>('전체');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);

  const filteredProjects = useMemo(() => {
    // 상태로 필터링
    const statusFiltered = wStatus
      ? mockProjects.filter((v) => v.status === wStatus)
      : mockProjects;

    // 이름으로 필터링
    const nameFiltered = wName
      ? statusFiltered.filter((v) => v.name.includes(wName))
      : statusFiltered;

    // 탭으로 필터링
    return selectedTab !== '전체'
      ? nameFiltered.filter((v) => {
          return v.Members.some((member) => member.userId === user?.id);
        })
      : nameFiltered;
  }, [selectedTab, user?.id, wName, wStatus]);

  const onNewProjectClick = () => {
    setIsCreateModalOpen(true);
  };

  return (
    <>
      {isCreateModalOpen && (
        <CreateProjectModal onClose={() => setIsCreateModalOpen(false)} />
      )}

      <div className="p-5 md:p-7">
        <header>
          <h1 className="text-2xl font-bold text-slate-900">프로젝트</h1>
          <p className="mt-1 text-sm text-slate-500">
            참여 중인 프로젝트를 관리하세요.
          </p>
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
                  onClick={onNewProjectClick}
                />
              )}
            </div>
          </div>
        </form>

        <div className="mt-5 flex gap-6 overflow-x-auto border-b border-slate-200">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setSelectedTab(tab)}
              className={`shrink-0 border-b-2 px-1 pb-3 text-sm font-semibold ${selectedTab === tab ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-900'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ProjectList;
