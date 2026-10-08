import Link from 'next/link';
import StatusBadge from '../StatusBadge';
import type { ProjectSimple } from '../../types/project.type';

const ProjectCard = ({ project }: { project: ProjectSimple }) => {
  return (
    <Link
      href={`/project/detail/${project.id}`}
      className="border-line rounded-xl border bg-white p-5 transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md"
    >
      <div className="min-w-0 flex-1">
        <h2 className="text-heading truncate font-bold">{project.name}</h2>
        <div className="mt-2">
          <StatusBadge status={project.status} />
        </div>
      </div>
      <p className="text-muted mt-4 text-xs">
        {project.startDate ?? '미정'} - {project.endDate ?? '미정'}
      </p>
    </Link>
  );
};

export default ProjectCard;
