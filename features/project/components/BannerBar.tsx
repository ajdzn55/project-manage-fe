import type { ProjectTask } from '@/features/project/types/task.type';

interface Props {
  dueTasks: ProjectTask[];
  onClose: () => void;
}

const BannerBar = ({ dueTasks, onClose }: Props) => {
  const taskNames = dueTasks.map((v) => v.name)?.join(', ');
  const bannerText = `마감일이 다가오는 작업이 있습니다. (${dueTasks.length}건: ${taskNames})`;

  return (
    <div className="relative z-50 flex h-10 w-full items-center overflow-hidden border-b border-amber-200/60 bg-amber-50 text-xs font-medium text-amber-800">
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee-once {
          display: flex;
          animation: marquee 20s linear infinite;
        }
        .animate-marquee-once:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="flex w-full overflow-hidden whitespace-nowrap">
        <div className="animate-marquee-once flex shrink-0">
          <span className="flex min-w-full items-center pr-12 pl-4">
            {bannerText}
          </span>
          <span className="flex min-w-full items-center pr-12 pl-4">
            {bannerText}
          </span>
        </div>
      </div>

      {/* 닫기 버튼 */}
      <div className="absolute top-0 right-0 flex h-full items-center bg-gradient-to-l from-amber-50 via-amber-50 to-transparent pr-4 pl-6">
        <button
          type="button"
          className="rounded-md p-1 text-amber-600 transition-colors hover:bg-amber-100 hover:text-amber-900"
          onClick={onClose}
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default BannerBar;
