'use client';

import SearchInput from '@/components/SearchInput';
import { useForm, useWatch } from 'react-hook-form';
import { taskStatusOptions } from '@/features/project/constants/project.const';
import SelectInput from '@/components/SelectInput';
import { useMemo } from 'react';
import { mockProjectTasks } from '@/features/project/mocks/projectDetail.mock';
import Table from '@/components/Table';
import { projectTaskColumns } from '@/features/project/constants/project.columns';
import type { ProjectTask } from '@/features/project/types/task.type';

const statusOptions = [{ label: '전체', value: '' }, ...taskStatusOptions];

const TaskList = () => {
  const { register, handleSubmit, control } = useForm<ProjectTask>();
  const wStatus = useWatch({ control, name: 'status' });

  // TODO: api 연결 필요
  const onSubmit = (data: ProjectTask) => {
    console.log(data);
  };

  const filteredTasks = useMemo(() => {
    // 상태로 필터링
    return wStatus
      ? mockProjectTasks.filter((v) => v.status === wStatus)
      : mockProjectTasks;
  }, [wStatus]);

  return (
    <div className="p-7">
      <header>
        <h1 className="text-heading text-2xl font-bold">내 작업</h1>
        <p className="text-muted mt-1">내 작업 현황을 확인하세요.</p>
      </header>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-6 flex items-center gap-3"
      >
        <div className="w-full max-w-96 min-w-0">
          <SearchInput register={register('name')} placeholder="작업 검색..." />
        </div>
        <div className="w-full max-w-44 shrink-0">
          <SelectInput options={statusOptions} register={register('status')} />
        </div>
      </form>

      <div className="mt-5 flex gap-6 overflow-x-auto">
        <Table
          columns={projectTaskColumns(false)}
          data={filteredTasks}
          tableBorder
        />
      </div>
    </div>
  );
};

export default TaskList;
