import Table from '@/components/Table';
import Button from '@/components/Button';
import { members } from '@/features/project/mocks/project.mock';
import { projectMemberColumns } from '@/features/project/constants/project.columns';

const ProjectMembersTab = () => {
  return (
    <div className="p-5 md:p-7">
      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <div>
            <h2 className="font-bold text-slate-900">프로젝트 멤버</h2>
            <p className="mt-1 text-xs text-slate-500">
              총 {members.length}명이 이 프로젝트에 참여하고 있어요.
            </p>
          </div>
          <div className="w-36">
            <Button text="+ 새 멤버" width="100%" height="40px" />
          </div>
        </div>

        <Table
          columns={projectMemberColumns}
          data={members}
          getRowKey={(member) => member.userId}
          showFooter={false}
        />
      </section>
    </div>
  );
};

export default ProjectMembersTab;
