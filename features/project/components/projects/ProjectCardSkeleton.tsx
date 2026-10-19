const ProjectCardSkeleton = () => {
  return (
    <div className="border-line animate-pulse rounded-lg border bg-white p-5">
      <div className="h-5 w-2/3 rounded bg-slate-200" />
      <div className="mt-4 h-4 w-full rounded bg-slate-100" />
      <div className="mt-2 h-4 w-4/5 rounded bg-slate-100" />
      <div className="mt-6 h-4 w-1/3 rounded bg-slate-200" />
    </div>
  );
};

export default ProjectCardSkeleton;
