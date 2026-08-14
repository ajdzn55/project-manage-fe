import Link from 'next/link';
import MemberAvatars from '../MemberAvatars';
import StatusBadge from '../StatusBadge';
import type { Project } from '../../types/project.type';

interface Props {
  project: Project;
  selected?: boolean;
}

const ProjectCard = ({ project, selected = false }: Props) => {
  return (
    <Link
      href={`/project/detail/${project.id}`}
      className={`rounded-xl border p-5 transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md ${selected ? 'border-blue-400 bg-blue-50/40' : 'border-slate-200 bg-white'}`}
    >
      <div className="flex items-start gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-blue-100 font-bold text-blue-600">
          A
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="truncate font-bold text-slate-900">{project.name}</h2>
          <div className="mt-2">
            <StatusBadge status={project.status} />
          </div>
        </div>
      </div>
      <p className="mt-4 text-xs text-slate-500">
        {project.startDate ?? '미정'} - {project.endDate ?? '미정'}
      </p>
      <div className="mt-5">
        <MemberAvatars
          members={project.Members.map((member) => ({
            id: member.userId,
            name: member.name,
          }))}
        />
      </div>
    </Link>
  );
};

export default ProjectCard;
