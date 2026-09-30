import ModalWrapper from '@/components/ModalWrapper';
import { useForm } from 'react-hook-form';
import type { ProjectTask } from '@/features/project/types/task.type';
import { taskStatusOptions } from '@/features/project/constants/project.const';
import { useUserListQuery } from '@/features/user/hooks/useUser';
import DateInput from '@/components/DateInput';
import SelectInput from '@/components/SelectInput';

export type BatchEditField = 'assigneeId' | 'status' | 'dueDate';

interface Props {
  field: BatchEditField;
  onSave: (data: ProjectTask) => void;
  onClose: () => void;
}

const TaskBatchEditModal = ({ field, onSave, onClose }: Props) => {
  const title =
    field === 'assigneeId' ? '담당자' : field === 'status' ? '상태' : '마감일';
  const { handleSubmit, register } = useForm<ProjectTask>();

  const { data: users } = useUserListQuery();

  const assigneeOptions = [
    { label: '', value: '' },
    ...(users ?? []).map((v) => ({ label: v.name, value: v.id })),
  ];

  return (
    <ModalWrapper
      title={`${title} 일괄 수정`}
      onClose={onClose}
      onSubmit={handleSubmit(onSave)}
      buttonText="저장"
    >
      {field === 'assigneeId' && (
        <SelectInput
          label="담당자"
          labelWidth="80px"
          register={register(field)}
          options={assigneeOptions}
        />
      )}

      {field === 'status' && (
        <SelectInput
          label="상태"
          labelWidth="80px"
          register={register(field)}
          options={taskStatusOptions}
        />
      )}

      {field === 'dueDate' && (
        <DateInput
          label="마감일"
          labelWidth="80px"
          register={register(field)}
        />
      )}
    </ModalWrapper>
  );
};

export default TaskBatchEditModal;
