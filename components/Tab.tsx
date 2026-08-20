'use client';

import type { ReactNode } from 'react';

interface Props {
  TabItems: { label: string; item: ReactNode }[];
  selected: string;
  setSelected: (tabLabel: string) => void;
}

const Tab = ({ TabItems, selected, setSelected }: Props) => {
  const currentItem = TabItems.find((v) => v.label === selected)?.item;

  return (
    <>
      <div className="border-line mt-6 flex gap-7 overflow-x-auto border-b px-7">
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

      {currentItem}
    </>
  );
};

export default Tab;
