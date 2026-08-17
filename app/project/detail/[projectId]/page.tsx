import ProjectDetail from '@/features/project/components/ProjectDetail';

interface Props {
  params: Promise<{ projectId: string }>;
}

export default async function ProjectDetailPage({ params }: Props) {
  const { projectId } = await params;

  return <ProjectDetail projectId={projectId} />;
}
