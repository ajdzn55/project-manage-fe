'use client';

import ModalWrapper from '@/components/ModalWrapper';
import Table from '@/components/Table';
import { ProjectMemberColumns } from '@/features/project/constants/project.columns';
import type { User } from '@/features/user/types/user.type';

interface AddProjectMemberModalProps {
  users: User[];
  onClose: () => void;
}

const AddProjectMemberModal = ({
  users,
  onClose,
}: AddProjectMemberModalProps) => {
  return (
    <ModalWrapper title="새 멤버" onClose={onClose} submitButtonText="선택">
      <Table columns={ProjectMemberColumns} data={users} tableBorder />
    </ModalWrapper>
  );
};

export default AddProjectMemberModal;
