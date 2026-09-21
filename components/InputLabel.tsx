import React from 'react';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

export interface LabelTooltip {
  id: string;
  content: string;
  type: 'warning' | 'info';
}

interface Props {
  label?: string;
  labelWidth?: string;
  tooltip?: LabelTooltip;
  required?: boolean;
}

const InputLabel = ({
  label,
  labelWidth = '0px',
  tooltip,
  required = false,
}: Props) => {
  const tooltipIcon = tooltip?.type === 'warning' ? '!' : '?';

  return (
    <>
      <div
        style={{ minWidth: labelWidth }}
        className="text-body flex shrink-0 items-center gap-1.5 font-semibold"
      >
        <label htmlFor={label}>{label}</label>
        {required && <span className="text-danger">*</span>}

        {tooltip && (
          <span
            tabIndex={0}
            aria-label={`${label} 설명`}
            data-tooltip-id={tooltip.id}
            data-tooltip-content={tooltip.content}
            className={`flex size-4 items-center justify-center rounded-full text-[10px] font-bold ${
              tooltip.type === 'warning'
                ? 'bg-amber-100 text-amber-700'
                : 'text-muted bg-slate-100'
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
