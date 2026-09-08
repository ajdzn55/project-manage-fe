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
  onSave: (data: Project) => void;
  onClose: () => void;
  targetProject?: Project;
}

const ProjectModal = ({
  onSave,
  onClose,
  targetProject,
}: ProjectModalProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Project>();

  const statusOptions = [{ label: '', value: '' }, ...projectStatusOptions];

  useEffect(() => {
    if (targetProject) {
      reset(targetProject);
    }
  }, [reset, targetProject]);

  return (
    <ModalWrapper
      title={targetProject ? '프로젝트 수정' : '새 프로젝트'}
      onClose={onClose}
      onSubmit={handleSubmit(onSave)}
      buttonText={targetProject ? '저장' : '생성'}
    >
      <input type="hidden" {...register('id')} />
      <TextInput
        label="프로젝트명"
        labelWidth="80px"
        register={register('name', { required: true })}
        hasError={!!errors.name}
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
