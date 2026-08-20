'use client';

import MemberAvatars from './MemberAvatars';
import StatusBadge from './StatusBadge';
import { mockProjectDetail } from '../mocks/projectDetail.mock';
import { mockProjects } from '../mocks/project.mock';
import ProjectTasksTab from '@/features/project/components/projects/ProjectTasksTab';
import ProjectOverviewTab from '@/features/project/components/projects/ProjectOverviewTab';
import ProjectMembersTab from '@/features/project/components/projects/ProjectMembersTab';
import Tab from '@/components/Tab';
import { useState } from 'react';
import Link from 'next/link';
import MoreMenuButton from '@/components/MoreMenuButton';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { ProjectMemberRoleEnum } from '@/features/project/types/enums';

interface Props {
  projectId: string;
}

const ProjectDetail = ({ projectId }: Props) => {
  const [selectedTab, setSelectedTab] = useState('개요');
  const { user } = useAuth();
  const project =
    mockProjects.find((item) => item.id === projectId) ?? mockProjectDetail;
  const isOwner = project.Members.some(
    (member) =>
      member.userId === user?.id && member.role === ProjectMemberRoleEnum.Owner,
  );
  const tabs = [
    { label: '개요', item: <ProjectOverviewTab isOwner={isOwner} /> },
    { label: '작업', item: <ProjectTasksTab isOwner={isOwner} /> },
    { label: '멤버', item: <ProjectMembersTab isOwner={isOwner} /> },
  ];

  return (
    <>
      <header className="px-7 pt-7">
        <div className="flex min-w-0 items-center gap-2 text-slate-400">
          <Link
            href="/project"
            className="hover:text-primary shrink-0 transition-colors"
          >
            프로젝트
          </Link>
          <span>/</span>
          <span className="text-body truncate font-medium">{project.name}</span>
        </div>

        <div className="mt-5 flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-start gap-4">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-violet-100 font-bold text-violet-600">
              {project.name.slice(0, 1)}
            </span>
            <div className="min-w-0">
              <h1 className="text-heading truncate text-2xl font-bold">
                {project.name}
              </h1>
              <div className="text-muted mt-2 flex flex-wrap items-center gap-3 text-xs">
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
          {isOwner && <MoreMenuButton />}
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
