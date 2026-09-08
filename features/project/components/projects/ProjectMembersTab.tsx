import Table from '@/components/Table';
import Button from '@/components/Button';
import { projectMemberColumns } from '@/features/project/constants/project.columns';
import AddProjectMemberModal from '@/features/project/components/projects/AddProjectMemberModal';
import { useCallback, useMemo, useState } from 'react';
import { dialogAlert } from '@/utils/alert';
import { useUserListQuery } from '@/features/user/hooks/useUser';
import type { ProjectMember } from '@/features/project/types/project.type';
import {
  useAddProjectMemberMutation,
  useChangeProjectMemberRoleMutation,
  useRemoveProjectMemberMutation,
} from '@/features/project/hooks/useProjectMember';
import { ProjectMemberRoleEnum } from '@/features/project/types/enums';

interface Props {
  projectId: string;

  isOwner?: boolean;
  members?: ProjectMember[];
}

const ProjectMembersTab = ({ projectId, isOwner, members }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { data: users } = useUserListQuery();
  const { mutate: removeMutate } = useRemoveProjectMemberMutation(projectId);
  const { mutate: changeMutate } =
    useChangeProjectMemberRoleMutation(projectId);
  const { mutate: addMutate } = useAddProjectMemberMutation(projectId);

  const availableUsers = useMemo(
    () =>
      users?.filter(
        (user) => !members?.some((member) => member.userId === user.id),
      ),
    [members, users],
  );

  const singleOwnerId = useMemo(() => {
    const owners = members?.filter(
      (v) => v.role === ProjectMemberRoleEnum.Owner,
    );

    return owners?.length === 1 ? owners[0].userId : undefined;
  }, [members]);

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

  const handleModifyMember = useCallback(
    async (userId: string) => {
      const member = members?.find((v) => v.userId === userId);

      if (!member) return;

      const { role, name } = member;
      const changeRoleName =
        role === ProjectMemberRoleEnum.Owner ? '일반 멤버' : '소유자';
      const changeRole =
        role === ProjectMemberRoleEnum.Owner
          ? ProjectMemberRoleEnum.Member
          : ProjectMemberRoleEnum.Owner;

      const alertRes = await dialogAlert({
        type: 'question',
        content: `${name}님의 역할을 ${changeRoleName}로 변경하시겠습니까?`,
        showCancelButton: true,
      });

      if (alertRes.isConfirmed) {
        changeMutate({ userId, role: changeRole });
      }
    },
    [changeMutate, members],
  );

  const handleDeleteMember = useCallback(
    async (userId: string) => {
      const alertRes = await dialogAlert({
        type: 'warning',
        content:
          '멤버 삭제 시, 담당 작업 정보가 삭제됩니다.\n그래도 삭제하시겠습니까?',
        showCancelButton: true,
        width: '320px',
      });

      if (alertRes.isConfirmed) {
        removeMutate(userId);
      }
    },
    [removeMutate],
  );

  const handleAddMember = useCallback(
    (userId: string) => {
      addMutate({ userId }, { onSuccess: () => setIsModalOpen(false) });
    },
    [addMutate],
  );

  return (
    <>
      {isModalOpen && (
        <AddProjectMemberModal
          users={availableUsers ?? []}
          onClose={() => setIsModalOpen(false)}
          onAction={handleAddMember}
        />
      )}

      <div className="p-7">
        <section className="border-line overflow-hidden rounded-xl border bg-white">
          <div className="border-line flex items-center justify-between border-b px-5 py-4">
            <div>
              <h2 className="text-heading font-bold">프로젝트 멤버</h2>
              <p className="text-muted mt-1 text-xs">총 {members?.length}명</p>
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
            <div className="flex w-full justify-end pb-3">
              <p className="text-muted mt-1 text-xs">
                소유자가 1명일 경우, 해당 소유자의 역할 변경 및 삭제가
                제한됩니다.
              </p>
            </div>
            <Table
              columns={projectMemberColumns(
                isOwner,
                handleModifyMember,
                handleDeleteMember,
                singleOwnerId,
              )}
              data={members ?? []}
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
