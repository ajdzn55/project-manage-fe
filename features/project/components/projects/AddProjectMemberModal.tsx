'use client';

import ModalWrapper from '@/components/ModalWrapper';
import Table from '@/components/Table';
import { useState } from 'react';
import { ProjectMemberColumns } from '@/features/project/constants/project.columns';
import type { User } from '@/features/user/types/user.type';

interface AddProjectMemberModalProps {
  users: User[];
  onClose: () => void;
  onAction: (userId: string) => void;
}

const AddProjectMemberModal = ({
  users,
  onClose,
  onAction,
}: AddProjectMemberModalProps) => {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const handleSelect = () => {
    if (!selectedUserId) {
      return;
    }

    onAction(selectedUserId);
  };

  return (
    <ModalWrapper
      title="새 멤버"
      onClose={onClose}
      buttonText="선택"
      onAction={handleSelect}
      maxWidth="500px"
    >
      <Table
        columns={ProjectMemberColumns}
        data={users}
        onRowClick={(user) => setSelectedUserId(user.id)}
        selectedRowId={selectedUserId ?? undefined}
        tableBorder
      />
    </ModalWrapper>
  );
};

export default AddProjectMemberModal;
