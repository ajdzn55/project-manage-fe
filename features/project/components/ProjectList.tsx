import Button from '@/components/Button';
import ProjectCard from './ProjectCard';
import ProjectMobileMenu from './ProjectMobileMenu';
import { mockProjects } from '../mocks/projectMocks';

const tabs = ['전체', '내 프로젝트'];

const ProjectList = () => {
  return (
    <div className="p-5 md:p-7">
      <div className="mb-5 md:hidden">
        <ProjectMobileMenu />
      </div>

      <header>
        <h1 className="text-2xl font-bold text-slate-900">프로젝트</h1>
        <p className="mt-1 text-sm text-slate-500">
          참여 중인 프로젝트를 관리하세요.
        </p>
      </header>

      <div className="mt-6 flex items-center justify-between gap-3">
        <div className="relative min-w-0 flex-1 md:max-w-md">
          <label htmlFor="project-search" className="sr-only">
            프로젝트 검색
          </label>
          <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
            ⌕
          </span>
          <input
            id="project-search"
            type="search"
            placeholder="프로젝트 검색..."
            className="h-11 w-full rounded-lg border border-slate-200 pr-4 pl-9 text-sm transition outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-3 focus:ring-blue-100"
          />
        </div>

        <Button text="+ 새 프로젝트" width="132px" height="40px" />
      </div>

      <div className="mt-5 flex gap-6 overflow-x-auto border-b border-slate-200">
        {tabs.map((tab, index) => (
          <button
            key={tab}
            type="button"
            className={`shrink-0 border-b-2 px-1 pb-3 text-sm font-semibold ${index === 0 ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-900'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {mockProjects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            selected={index === 0}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectList;
