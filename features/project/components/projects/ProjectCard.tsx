import Link from 'next/link';
import MemberAvatars from '../MemberAvatars';
import StatusBadge from '../StatusBadge';
import type { Project } from '../../types/project.type';

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <Link
      href={`/project/detail/${project.id}`}
      className="border-line rounded-xl border bg-white p-5 transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md"
    >
      <div className="flex items-start gap-3">
        <span className="bg-primary-soft text-primary flex size-9 shrink-0 items-center justify-center rounded-lg font-bold">
          A
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="text-heading truncate font-bold">{project.name}</h2>
          <div className="mt-2">
            <StatusBadge status={project.status} />
          </div>
        </div>
      </div>
      <p className="text-muted mt-4 text-xs">
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
