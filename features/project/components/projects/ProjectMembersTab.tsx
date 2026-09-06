import Table from '@/components/Table';
import Button from '@/components/Button';
import { projectMemberColumns } from '@/features/project/constants/project.columns';
import AddProjectMemberModal from '@/features/project/components/projects/AddProjectMemberModal';
import { useMemo, useState } from 'react';
import { dialogAlert } from '@/utils/alert';
import EmptyState from '@/features/project/components/EmptyState';
import { useUserListQuery } from '@/features/user/hooks/useUser';
import type { ProjectMember } from '@/features/project/types/project.type';

interface Props {
  isOwner?: boolean;
  members?: ProjectMember[];
}

const ProjectMembersTab = ({ isOwner, members }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { data: users } = useUserListQuery();

  const availableUsers = useMemo(
    () =>
      users?.filter(
        (user) => !members?.some((member) => member.userId === user.id),
      ),
    [members, users],
  );

  const onAddProjectMemberClick = async () => {
    if (availableUsers?.length === 0) {
      await dialogAlert({
        type: 'info',
        content: '모든 사용자가 이미 프로젝트에 참여하고 있습니다.',
        width: '280px',
      });

      return;
    }

    setIsModalOpen(true);
  };

  return (
    <>
      {isModalOpen && (
        <AddProjectMemberModal
          users={availableUsers ?? []}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      {!members?.length ? (
        <EmptyState
          title="표시할 멤버가 없습니다."
          content={
            isOwner
              ? '새 멤버를 추가해 보세요!'
              : '아직 등록된 멤버가 없습니다.'
          }
          actionText={isOwner ? '+ 새 멤버' : undefined}
          onAction={isOwner ? onAddProjectMemberClick : undefined}
        />
      ) : (
        <div className="p-7">
          <section className="border-line overflow-hidden rounded-xl border bg-white">
            <div className="border-line flex items-center justify-between border-b px-5 py-4">
              <div>
                <h2 className="text-heading font-bold">프로젝트 멤버</h2>
                <p className="text-muted mt-1 text-xs">
                  총 {members?.length}명
                </p>
              </div>
              {isOwner && (
                <div className="w-36">
                  <Button
                    text="+ 새 멤버"
                    width="100%"
                    height="40px"
                    onClick={onAddProjectMemberClick}
                  />
                </div>
              )}
            </div>

            <div className="m-3">
              <Table
                columns={projectMemberColumns(isOwner)}
                data={members ?? []}
                rowKey="userId"
                tableBorder
              />
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default ProjectMembersTab;
