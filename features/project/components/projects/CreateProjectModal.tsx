'use client';

import TextInput from '@/components/TextInput';
import { useForm, useWatch } from 'react-hook-form';
import { Project } from '@/features/project/types/project.type';
import SelectInput from '@/components/SelectInput';
import { projectStatusOptions } from '@/features/project/constants/project.const';
import DateInput from '@/components/DateInput';
import React, { useCallback } from 'react';
import ModalWrapper from '@/components/ModalWrapper';

interface CreateProjectModalProps {
  onClose: () => void;
}

const CreateProjectModal = ({ onClose }: CreateProjectModalProps) => {
  const { register, setValue, handleSubmit, control } = useForm<Project>();
  const wStartDate = useWatch({ control, name: 'startDate' });
  const wEndDate = useWatch({ control, name: 'endDate' });

  const statusOptions = [{ label: '', value: '' }, ...projectStatusOptions];

  // TODO: api 연결 필요
  const onSubmit = (data: Project) => {
    console.log(data);
  };

  const onStartDateChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
      if (wEndDate) {
        const startDate = new Date(e.target.value);
        const endDate = new Date(wEndDate);

        if (startDate > endDate) {
          setValue('endDate', e.target.value);
        }
      }
    },
    [setValue, wEndDate],
  );

  const onEndDateChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
      if (wStartDate) {
        const startDate = new Date(wStartDate);
        const endDate = new Date(e.target.value);

        if (endDate < startDate) {
          setValue('startDate', e.target.value);
        }
      }
    },
    [setValue, wStartDate],
  );

  return (
    <ModalWrapper
      title="새 프로젝트"
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextInput
        label="프로젝트명"
        labelWidth="80px"
        register={register('name')}
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
        onChange={onStartDateChange}
      />
      <DateInput
        label="종료일"
        labelWidth="80px"
        register={register('endDate')}
        onChange={onEndDateChange}
      />
    </ModalWrapper>
  );
};

export default CreateProjectModal;
