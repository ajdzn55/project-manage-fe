'use client';

import SearchInput from '@/components/SearchInput';
import { useForm, useWatch } from 'react-hook-form';
import { type ChangeEvent, useMemo, useState } from 'react';
import Table from '@/components/Table';
import { projectTaskColumns } from '@/features/project/constants/project.columns';
import type { ProjectTask } from '@/features/project/types/task.type';
import { useTaskListQuery } from '@/features/project/hooks/useTask';
import EmptyState from '@/features/project/components/EmptyState';
import { useRouter } from 'next/navigation';
import { useUserListQuery } from '@/features/user/hooks/useUser';
import SegmentButton from '@/components/SegmentButton';
import { BoardIcon, ListIcon } from '@/components/icons/SegmentIcons';
import TaskBoard from '@/features/project/components/tasks/TaskBoard';
import { TaskStatusEnum } from '@/features/project/types/enums';
import CheckboxInput from '@/components/CheckboxInput';

const TaskList = () => {
  const { register, control } = useForm<ProjectTask>();
  const wName = useWatch({ control, name: 'name' });
  const keyword = wName?.trim().toLowerCase();

  const { data: users } = useUserListQuery();
  const { data: tasks } = useTaskListQuery({ isMyTask: true });

  const [statusList, setStatusList] = useState<TaskStatusEnum[]>([
    TaskStatusEnum.Todo,
    TaskStatusEnum.InProgress,
  ]);

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const status = e.target.value as TaskStatusEnum;

    setStatusList((prev) =>
      e.target.checked
        ? [...prev, status]
        : prev.filter((value) => value !== status),
    );
  };

  const filteredTasks = useMemo(() => {
    // 상태로 필터링
    const statusFiltered = tasks?.filter((v) => statusList.includes(v.status));

    // 작업 이름으로 필터링
    return keyword
      ? statusFiltered?.filter((v) => v.name.toLowerCase().includes(keyword))
      : statusFiltered;
  }, [tasks, keyword, statusList]);

  const searchedTasks = useMemo(() => {
    if (!keyword) return tasks ?? [];

    return (
      tasks?.filter((task) => task.name.toLowerCase().includes(keyword)) ?? []
    );
  }, [tasks, keyword]);

  const todo =
    searchedTasks?.filter((v) => v.status === TaskStatusEnum.Todo) ?? [];
  const inProgress =
    searchedTasks?.filter((v) => v.status === TaskStatusEnum.InProgress) ?? [];
  const done =
    searchedTasks?.filter((v) => v.status === TaskStatusEnum.Done) ?? [];

  const router = useRouter();

  const segmentList = [
    {
      name: '목록',
      icon: <ListIcon />,
    },
    {
      name: '보드',
      icon: <BoardIcon />,
    },
  ];
  const [viewType, setViewType] = useState<string>(segmentList[0].name);

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

            {viewType === '목록' && (
              <div className="flex w-full max-w-44 shrink-0 justify-between">
                <CheckboxInput
                  label="대기"
                  labelWidth="25px"
                  value={TaskStatusEnum.Todo}
                  checked={statusList.includes(TaskStatusEnum.Todo)}
                  onChange={handleCheckboxChange}
                />
                <CheckboxInput
                  label="진행 중"
                  labelWidth="40px"
                  value={TaskStatusEnum.InProgress}
                  checked={statusList.includes(TaskStatusEnum.InProgress)}
                  onChange={handleCheckboxChange}
                />
                <CheckboxInput
                  label="완료"
                  labelWidth="25px"
                  value={TaskStatusEnum.Done}
                  checked={statusList.includes(TaskStatusEnum.Done)}
                  onChange={handleCheckboxChange}
                />
              </div>
            )}

            <div className="ml-auto w-full max-w-56">
              <SegmentButton
                segmentList={segmentList}
                selected={viewType}
                setSelected={setViewType}
              />
            </div>
          </form>

          <div className="mt-5 overflow-x-auto">
            {viewType === '목록' ? (
              <div
                style={{ height: 'calc(100vh - 270px)' }}
                className="flex flex-grow"
              >
                <Table
                  columns={projectTaskColumns(users ?? [])}
                  data={filteredTasks ?? []}
                  tableBorder
                />
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-5">
                <TaskBoard status={TaskStatusEnum.Todo} data={todo} />
                <TaskBoard
                  status={TaskStatusEnum.InProgress}
                  data={inProgress}
                />
                <TaskBoard status={TaskStatusEnum.Done} data={done} />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default TaskList;
