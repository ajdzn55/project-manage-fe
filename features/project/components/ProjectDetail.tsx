'use client';

import MemberAvatars from './MemberAvatars';
import StatusBadge from './StatusBadge';
import { mockProjectDetail } from '../mocks/projectDetail.mock';
import { mockProjects } from '../mocks/project.mock';
import ProjectTasksTab from '@/features/project/components/projects/ProjectTasksTab';
import ProjectOverviewTab from '@/features/project/components/projects/ProjectOverviewTab';
import ProjectMembersTab from '@/features/project/components/projects/ProjectMembersTab';
import ProjectSettingsTab from '@/features/project/components/projects/ProjectSettingsTab';
import Tab from '@/components/Tab';
import { useState } from 'react';
import Link from 'next/link';

const tabs = [
  { label: '개요', item: <ProjectOverviewTab /> },
  { label: '작업', item: <ProjectTasksTab /> },
  { label: '멤버', item: <ProjectMembersTab /> },
  { label: '설정', item: <ProjectSettingsTab /> },
];

interface Props {
  projectId: string;
}

const ProjectDetail = ({ projectId }: Props) => {
  const [selectedTab, setSelectedTab] = useState(tabs[0].label);
  const project =
    mockProjects.find((item) => item.id === projectId) ?? mockProjectDetail;

  return (
    <>
      <header className="px-5 pt-5 md:px-7 md:pt-7">
        <div className="flex min-w-0 items-center gap-2 text-sm text-slate-400">
          <Link
            href="/project"
            className="shrink-0 transition-colors hover:text-blue-600"
          >
            프로젝트
          </Link>
          <span>/</span>
          <span className="truncate font-medium text-slate-600">
            {project.name}
          </span>
        </div>

        <div className="mt-5 flex items-start">
          <div className="flex min-w-0 items-start gap-4">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-violet-100 font-bold text-violet-600">
              {project.name.slice(0, 1)}
            </span>
            <div className="min-w-0">
              <h1 className="truncate text-2xl font-bold text-slate-900">
                {project.name}
              </h1>
              <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                <StatusBadge status={project.status} />
                <span>
                  {`${project.startDate ?? '미정'} ~ ${project.endDate ?? '미정'}`}
                </span>
                <MemberAvatars
                  members={project.Members.map((member) => ({
                    id: member.userId,
                    name: member.name,
                  }))}
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      <Tab
        TabItems={tabs}
        selected={selectedTab}
        setSelected={setSelectedTab}
      />
    </>
  );
};

export default ProjectDetail;
