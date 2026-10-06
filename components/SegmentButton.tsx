import { motion } from 'motion/react';
import type { ReactNode } from 'react';

export interface SegmentItem<T extends string> {
  label: string;
  value: T;
  icon: ReactNode;
}

interface Props<T extends string> {
  segmentList: SegmentItem<T>[];
  selected: T;
  onChange: (value: T) => void;
  width?: string;
  height?: string;
}

const SegmentButton = <T extends string>({
  segmentList,
  selected,
  onChange,
  width,
  height,
}: Props<T>) => {
  return (
    <div
      style={{ width: width ?? 'auto', height: height ?? 'auto' }}
      className="border-line flex items-center overflow-hidden rounded-md border bg-white font-semibold transition-colors focus-within:border-blue-500 hover:border-slate-300"
    >
      {segmentList.map((segment) => {
        const isSelected = selected === segment.value;

        return (
          <button
            key={segment.value}
            type="button"
            onClick={() => onChange(segment.value)}
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
              <span>{segment.label}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default SegmentButton;
