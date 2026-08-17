import Button from '@/components/Button';
import { mockProjectTasks } from '@/features/project/mocks/projectDetail.mock';
import Table from '@/components/Table';
import { projectTaskColumns } from '@/features/project/constants/project.columns';

const ProjectTasksTab = () => {
  return (
    <div className="space-y-5 p-5 md:p-7">
      <section className="overflow-hidden rounded-xl border border-slate-200">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <h2 className="font-bold text-slate-900">전체 작업</h2>
          <div className="w-36">
            <Button text="+ 새 작업" width="100%" height="40px" />
          </div>
        </div>
        <Table
          columns={projectTaskColumns}
          data={mockProjectTasks}
          getRowKey={(task) => task.id}
          showFooter={false}
        />
      </section>
    </div>
  );
};

export default ProjectTasksTab;
