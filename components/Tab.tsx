'use client';

import type { ComponentType } from 'react';

interface Props {
  TabItems: { label: string; component: ComponentType }[];
  selected: string;
  setSelected: (tabLabel: string) => void;
}

const Tab = ({ TabItems, selected, setSelected }: Props) => {
  const TargetComponent = TabItems.find((v) => v.label === selected)?.component;

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="border-line mt-6 flex shrink-0 gap-7 overflow-x-auto border-b px-7">
        {TabItems.map((v) => (
          <button
            key={v.label}
            type="button"
            onClick={() => setSelected(v.label)}
            className={`shrink-0 border-b-2 px-1 pb-3 font-semibold ${selected === v.label ? 'border-primary text-primary' : 'text-muted hover:text-heading border-transparent'}`}
          >
            {v.label}
          </button>
        ))}
      </div>

      <div className="min-h-0 flex-1">
        {TargetComponent && <TargetComponent />}
      </div>
    </div>
  );
};

export default Tab;
