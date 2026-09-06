'use client';

import SearchInput from '@/components/SearchInput';
import { useForm, useWatch } from 'react-hook-form';
import { taskStatusOptions } from '@/features/project/constants/project.const';
import SelectInput from '@/components/SelectInput';
import { useMemo } from 'react';
import Table from '@/components/Table';
import { projectTaskColumns } from '@/features/project/constants/project.columns';
import type { ProjectTask } from '@/features/project/types/task.type';
import { useTaskListQuery } from '@/features/project/hooks/useTask';
import { useAuth } from '@/features/auth/hooks/useAuth';
import EmptyState from '@/features/project/components/EmptyState';
import { useRouter } from 'next/navigation';

const statusOptions = [{ label: '전체', value: '' }, ...taskStatusOptions];

const TaskList = () => {
  const { register, control } = useForm<ProjectTask>();
  const wStatus = useWatch({ control, name: 'status' });
  const wName = useWatch({ control, name: 'name' });

  const { loginUser } = useAuth();
  const { data: tasks } = useTaskListQuery({ isMyTask: loginUser?.id });

  const filteredTasks = useMemo(() => {
    // 상태로 필터링
    const statusFiltered = wStatus
      ? tasks?.filter((v) => v.status === wStatus)
      : tasks;

    // 작업 이름으로 필터링
    return wName
      ? statusFiltered?.filter((v) => v.name.includes(wName))
      : statusFiltered;
  }, [tasks, wName, wStatus]);

  const router = useRouter();

  return (
    <>
      {tasks?.length === 0 ? (
        <EmptyState
          title="표시할 작업이 없습니다."
          content="새 작업을 추가해 보세요!"
          actionText="프로젝트 목록"
          onAction={() => router.push('/project')}
        />
      ) : (
        <div className="p-7">
          <header>
            <h1 className="text-heading text-2xl font-bold">내 작업</h1>
            <p className="text-muted mt-1">내 작업 현황을 확인하세요.</p>
          </header>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-6 flex items-center gap-3"
          >
            <div className="w-full max-w-96 min-w-0">
              <SearchInput
                register={register('name')}
                placeholder="작업 검색..."
              />
            </div>
            <div className="w-full max-w-44 shrink-0">
              <SelectInput
                options={statusOptions}
                register={register('status')}
              />
            </div>
          </form>

          <div className="mt-5 flex gap-6 overflow-x-auto">
            <Table
              columns={projectTaskColumns(false)}
              data={filteredTasks ?? []}
              tableBorder
            />
          </div>
        </div>
      )}
    </>
  );
};

export default TaskList;
