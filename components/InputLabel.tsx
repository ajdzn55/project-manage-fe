import React from 'react';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

interface Props {
  label?: string;
  labelWidth?: string;
  tooltip?: { id: string; content: string; type: 'warning' | 'info' };
}

const InputLabel = ({ label, labelWidth = '0px', tooltip }: Props) => {
  const tooltipIcon = tooltip?.type === 'warning' ? '!' : '?';

  return (
    <>
      <div
        style={{ width: labelWidth }}
        className="flex shrink-0 items-center gap-1.5 font-semibold text-slate-700"
      >
        <label htmlFor={label}>{label}</label>

        {tooltip && (
          <span
            tabIndex={0}
            aria-label={`${label} 설명`}
            data-tooltip-id={tooltip.id}
            data-tooltip-content={tooltip.content}
            className={`flex size-4 items-center justify-center rounded-full text-[10px] font-bold ${
              tooltip.type === 'warning'
                ? 'bg-amber-100 text-amber-700'
                : 'bg-slate-100 text-slate-500'
            }`}
          >
            {tooltipIcon}
          </span>
        )}
      </div>

      {tooltip && (
        <Tooltip
          id={tooltip.id}
          place="top"
          offset={6}
          style={{ zIndex: 70 }}
        />
      )}
    </>
  );
};

export default InputLabel;
