'use client';

import TextInput from '@/components/TextInput';
import { useForm, useWatch } from 'react-hook-form';
import SelectInput from '@/components/SelectInput';
import { taskStatusOptions } from '@/features/project/constants/project.const';
import DateInput from '@/components/DateInput';
import ModalWrapper from '@/components/ModalWrapper';
import InputLabel from '@/components/InputLabel';
import { useEffect } from 'react';
import { useUserListQuery } from '@/features/user/hooks/useUser';
import type { ProjectTask } from '@/features/project/types/task.type';

const TASK_COLOR_PALETTE = [
  '#FFD2D5',
  '#FFFB8C',
  '#D1FCD6',
  '#BDF4F9',
  '#DED0F5',
  '#FFFFFF',
] as const;

interface TaskModalProps {
  onSave: (data: ProjectTask) => void;
  onClose: () => void;
  targetTask?: ProjectTask;
}

const TaskModal = ({ onSave, onClose, targetTask }: TaskModalProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { errors },
  } = useForm<ProjectTask>();

  const wBackgroundColor = useWatch({
    control,
    name: 'backgroundColor',
  });

  const { data: users } = useUserListQuery();

  const statusOptions = [{ label: '', value: '' }, ...taskStatusOptions];
  const assigneeOptions = [
    { label: '', value: '' },
    ...(users ?? []).map((v) => ({ label: v.name, value: v.id })),
  ];

  useEffect(() => {
    if (targetTask) {
      reset(targetTask);
    } else {
      reset({ backgroundColor: '#FFFFFF' });
    }
  }, [reset, targetTask]);

  return (
    <ModalWrapper
      title={targetTask ? '작업 수정' : '새 작업'}
      onClose={onClose}
      onSubmit={handleSubmit(onSave)}
      buttonText={targetTask ? '저장' : '생성'}
    >
      <input type="hidden" {...register('id')} />
      <TextInput
        label="작업명"
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
        label="마감일"
        labelWidth="80px"
        register={register('dueDate')}
      />
      <SelectInput
        label="담당자"
        labelWidth="80px"
        register={register('assigneeId')}
        options={assigneeOptions}
      />

      <div className="flex min-h-11 items-center gap-[3px]">
        <InputLabel
          label="색상"
          labelWidth="80px"
          tooltip={{
            id: 'color-tooltip',
            content: '기본 색상은 흰색입니다.',
            type: 'info',
          }}
        />
        <input type="hidden" {...register('backgroundColor')} />
        <div className="flex flex-1 items-center gap-2">
          {TASK_COLOR_PALETTE.map((color) => (
            <button
              key={color}
              type="button"
              aria-label={`${color} 색상 선택`}
              className={`border-line size-7 rounded-md border transition ${
                wBackgroundColor === color
                  ? 'ring-2 ring-blue-500 ring-offset-2'
                  : 'hover:scale-110'
              }`}
              style={{ backgroundColor: color }}
              onClick={() => setValue('backgroundColor', color)}
            />
          ))}
        </div>
      </div>
    </ModalWrapper>
  );
};

export default TaskModal;
