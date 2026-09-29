import { motion } from 'motion/react';
import type { ReactNode } from 'react';

interface Props {
  segmentList: { name: string; icon: ReactNode }[];
  selected: string;
  setSelected: (selected: string) => void;
}

const SegmentButton = ({ segmentList, selected, setSelected }: Props) => {
  return (
    <div className="border-line flex h-[44px] w-full items-center overflow-hidden rounded-md border bg-white font-semibold transition-colors focus-within:border-blue-500 hover:border-slate-300">
      {segmentList.map((segment) => {
        const isSelected = selected === segment.name;

        return (
          <button
            key={segment.name}
            type="button"
            onClick={() => setSelected(segment.name)}
            className={`relative flex h-full flex-1 cursor-pointer items-center justify-center gap-3 transition-colors ${
              isSelected ? 'text-primary' : 'text-muted'
            }`}
          >
            {isSelected && (
              <motion.div
                layoutId="activeSegment"
                className="bg-primary-soft absolute inset-0 z-0 rounded-md"
                transition={{ type: 'spring', stiffness: 500, damping: 35 }}
              />
            )}

            <span className="relative z-10 flex items-center gap-3">
              {segment.icon}
              <span>{segment.name}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default SegmentButton;
