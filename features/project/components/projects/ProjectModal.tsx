'use client';

import TextInput from '@/components/TextInput';
import { useForm } from 'react-hook-form';
import SelectInput from '@/components/SelectInput';
import { projectStatusOptions } from '@/features/project/constants/project.const';
import DateInput from '@/components/DateInput';
import ModalWrapper from '@/components/ModalWrapper';
import { useEffect } from 'react';
import { Project } from '@/features/project/types/project.type';

interface ProjectModalProps {
  onClose: () => void;
  data?: Project;
}

const ProjectModal = ({ onClose, data }: ProjectModalProps) => {
  const { register, handleSubmit, reset } = useForm<Project>();

  const statusOptions = [{ label: '', value: '' }, ...projectStatusOptions];

  // TODO: api 연결 필요
  const onSubmit = (data: Project) => {
    console.log(data);
  };

  useEffect(() => {
    if (data) {
      reset(data);
    }
  }, [reset, data]);

  return (
    <ModalWrapper
      title={data ? '프로젝트 수정' : '새 프로젝트'}
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      submitButtonText={data ? '저장' : '생성'}
    >
      <input type="hidden" {...register('id')} />
      <TextInput
        label="프로젝트명"
        labelWidth="80px"
        register={register('name', { required: true })}
      />
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
        label="시작일"
        labelWidth="80px"
        register={register('startDate')}
      />
      <DateInput
        label="종료일"
        labelWidth="80px"
        register={register('endDate')}
      />
    </ModalWrapper>
  );
};

export default ProjectModal;
