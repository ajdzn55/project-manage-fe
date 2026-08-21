import Table from '@/components/Table';
import Button from '@/components/Button';
import { members } from '@/features/project/mocks/project.mock';
import { projectMemberColumns } from '@/features/project/constants/project.columns';
import AddProjectMemberModal from '@/features/project/components/projects/AddProjectMemberModal';
import { useState } from 'react';
import { mockUsers } from '@/features/auth/mocks/user.mock';
import { myAlert } from '@/utils/alert';

interface Props {
  isOwner?: boolean;
}

const ProjectMembersTab = ({ isOwner }: Props) => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const availableUsers = mockUsers.filter(
    (user) => !members.some((member) => member.userId === user.id),
  );

  const onNewProjectMemberClick = async () => {
    if (availableUsers.length === 0) {
      await myAlert({
        type: 'info',
        content: '모든 사용자가 이미 프로젝트에 참여하고 있습니다.',
        confirmButtonText: '확인',
        width: '280px',
      });

      return;
    }

    setIsCreateModalOpen(true);
  };

  return (
    <>
      {isCreateModalOpen && (
        <AddProjectMemberModal
          users={availableUsers}
          onClose={() => setIsCreateModalOpen(false)}
        />
      )}

      <div className="p-7">
        <section className="border-line overflow-hidden rounded-xl border bg-white">
          <div className="border-line flex items-center justify-between border-b px-5 py-4">
            <div>
              <h2 className="text-heading font-bold">프로젝트 멤버</h2>
              <p className="text-muted mt-1 text-xs">총 {members.length}명</p>
            </div>
            {isOwner && (
              <div className="w-36">
                <Button
                  text="+ 새 멤버"
                  width="100%"
                  height="40px"
                  onClick={onNewProjectMemberClick}
                />
              </div>
            )}
          </div>

          <div className="m-3">
            <Table
              columns={projectMemberColumns(isOwner)}
              data={members}
              rowKey="userId"
              tableBorder
            />
          </div>
        </section>
      </div>
    </>
  );
};

export default ProjectMembersTab;
