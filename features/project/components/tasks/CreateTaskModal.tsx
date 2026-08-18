'use client';

import TextInput from '@/components/TextInput';
import { useForm } from 'react-hook-form';
import SelectInput from '@/components/SelectInput';
import { taskStatusOptions } from '@/features/project/constants/project.const';
import DateInput from '@/components/DateInput';
import { ProjectTask } from '@/features/project/types/projectDetail.type';
import ModalWrapper from '@/components/ModalWrapper';

interface CreateTaskModalProps {
  onClose: () => void;
}

const CreateTaskModal = ({ onClose }: CreateTaskModalProps) => {
  const { register, handleSubmit } = useForm<ProjectTask>();

  const statusOptions = [{ label: '', value: '' }, ...taskStatusOptions];

  // TODO: api 연결 필요
  const onSubmit = (data: ProjectTask) => {
    console.log(data);
  };

  return (
    <ModalWrapper
      title="새 작업"
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextInput label="작업명" labelWidth="80px" register={register('name')} />
      <TextInput
        label="설명"
        labelWidth="80px"
        register={register('description')}
      />
      <SelectInput
        label="상태"
        labelWidth="80px"
        register={register('status')}
        options={statusOptions}
      />
      <DateInput
        label="마감일"
        labelWidth="80px"
        register={register('dueDate')}
      />
    </ModalWrapper>
  );
};

export default CreateTaskModal;
