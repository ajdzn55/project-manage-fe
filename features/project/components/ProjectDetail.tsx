'use client';

import MemberAvatars from './MemberAvatars';
import StatusBadge from './StatusBadge';
import ProjectTasksTab from '@/features/project/components/projects/ProjectTasksTab';
import ProjectOverviewTab from '@/features/project/components/projects/ProjectOverviewTab';
import ProjectMembersTab from '@/features/project/components/projects/ProjectMembersTab';
import Tab from '@/components/Tab';
import { useMemo, useState } from 'react';
import Link from 'next/link';
import MoreMenuButton from '@/components/MoreMenuButton';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { ProjectMemberRoleEnum } from '@/features/project/types/enums';
import { dialogAlert } from '@/utils/alert';
import ProjectModal from '@/features/project/components/projects/ProjectModal';
import { Project } from '@/features/project/types/project.type';
import {
  useDeleteProjectMutation,
  useProjectQuery,
  useUpdateProjectMutation,
} from '@/features/project/hooks/useProject';

interface Props {
  projectId: string;
}

const ProjectDetail = ({ projectId }: Props) => {
  const { loginUser } = useAuth();
  const [selectedTab, setSelectedTab] = useState('개요');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { data: targetProject } = useProjectQuery(projectId);
  const { mutate: updateMutate } = useUpdateProjectMutation();
  const { mutate: deleteMutate } = useDeleteProjectMutation();

  const isOwner = targetProject?.members?.some(
    (member) =>
      member.userId === loginUser?.id &&
      member.role === ProjectMemberRoleEnum.Owner,
  );
  const tabs = useMemo(
    () => [
      {
        label: '개요',
        item: <ProjectOverviewTab projectId={projectId} isOwner={isOwner} />,
      },
      {
        label: '작업',
        item: <ProjectTasksTab projectId={projectId} isOwner={isOwner} />,
      },
      {
        label: '멤버',
        item: (
          <ProjectMembersTab
            projectId={projectId}
            isOwner={isOwner}
            members={targetProject?.members}
          />
        ),
      },
    ],
    [isOwner, projectId, targetProject?.members],
  );

  const handleModifyProject = () => {
    setIsModalOpen(true);
  };

  const handleDeleteProject = async () => {
    const alertRes = await dialogAlert({
      type: 'warning',
      content:
        '프로젝트를 삭제하시겠습니까?\n프로젝트에 포함된 작업과 멤버 정보도 함께 삭제됩니다.',
      showCancelButton: true,
    });

    if (alertRes.isConfirmed) {
      deleteMutate(projectId);
    }
  };

  const handleSaveProject = (data: Project) => {
    const { id, ...body } = data;
    updateMutate({ id, data: body });

    setIsModalOpen(false);
  };

  if (!targetProject) return null;

  return (
    <>
      {isModalOpen && (
        <ProjectModal
          onSave={handleSaveProject}
          onClose={() => setIsModalOpen(false)}
          targetProject={targetProject}
        />
      )}

      <header className="px-7 pt-7">
        <div className="flex min-w-0 items-center gap-2 text-slate-400">
          <Link
            href="/project"
            className="hover:text-primary shrink-0 transition-colors"
          >
            프로젝트
          </Link>
          <span>/</span>
          <span className="text-body truncate font-medium">
            {targetProject.name}
          </span>
        </div>

        <div className="mt-5 flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-start gap-4">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-violet-100 font-bold text-violet-600">
              {targetProject.name.slice(0, 1)}
            </span>
            <div className="min-w-0">
              <h1 className="text-heading truncate text-2xl font-bold">
                {targetProject.name}
              </h1>
              <div className="text-muted mt-2 flex flex-wrap items-center gap-3 text-xs">
                <StatusBadge status={targetProject.status} />
                <span>
                  {`${targetProject.startDate ?? '미정'} ~ ${targetProject.endDate ?? '미정'}`}
                </span>
                <MemberAvatars members={targetProject?.members ?? []} />
              </div>
            </div>
          </div>
          {isOwner && (
            <MoreMenuButton
              onModify={handleModifyProject}
              onDelete={handleDeleteProject}
            />
          )}
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
