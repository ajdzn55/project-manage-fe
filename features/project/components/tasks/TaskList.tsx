'use client';

import SearchInput from '@/components/SearchInput';
import { useForm } from 'react-hook-form';
import { Project } from '@/features/project/types/project.type';
import { TaskStatusEnum } from '@/features/project/types/enums';

const taskStatusOptions = [
  { label: '전체', value: '' },
  { label: '대기', value: TaskStatusEnum.Todo },
  { label: '진행 중', value: TaskStatusEnum.InProgress },
  { label: '완료', value: TaskStatusEnum.Done },
];

const TaskList = () => {
  const { register, handleSubmit } = useForm<Project>();

  // TODO: api 연결 필요
  const onSubmit = (data: Project) => {
    console.log(data);
  };

  return (
    <div className="p-5 md:p-7">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">내 작업</h1>
        <p className="mt-1 text-sm text-slate-500">
          내 작업 현황을 확인하세요.
        </p>
      </header>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-6 flex items-center"
      >
        <div className="w-full max-w-96 min-w-0">
          <SearchInput register={register('name')} placeholder="작업 검색..." />
        </div>
      </form>

      <div className="mt-5 flex gap-6 overflow-x-auto border-b border-slate-200">
        {taskStatusOptions.map((tab, index) => (
          <button
            key={tab.label}
            type="button"
            className={`shrink-0 border-b-2 px-1 pb-3 text-sm font-semibold ${index === 0 ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-900'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
