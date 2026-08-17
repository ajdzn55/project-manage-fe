'use client';

import TextInput from '@/components/TextInput';
import { useForm, useWatch } from 'react-hook-form';
import { Project } from '@/features/project/types/project.type';
import SelectInput from '@/components/SelectInput';
import { projectStatusOptions } from '@/features/project/constants/project.const';
import DateInput from '@/components/DateInput';
import React, { useCallback, useEffect } from 'react';
import Button from '@/components/Button';

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

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <>
      <div className="fixed inset-0 z-50 bg-slate-950/55 backdrop-blur-[2px]" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="fixed top-1/2 left-1/2 z-[60] w-[360px] -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-white p-5 shadow-2xl"
      >
        <div className="flex flex-col justify-between gap-3">
          <div className="flex flex-col gap-3">
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
          </div>
          <div className="flex items-center justify-end gap-3">
            <Button
              text="취소"
              color="gray"
              width="100px"
              height="36px"
              onClick={onClose}
            />
            <Button text="생성" width="100px" height="36px" type="submit" />
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateProjectModal;
