import type { MouseEventHandler } from 'react';

interface Props {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

const MoreMenuButton = ({ onClick, disabled = false }: Props) => {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="inline-flex size-8 items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
    >
      <svg viewBox="0 0 20 20" fill="currentColor" className="size-4">
        <circle cx="10" cy="4" r="1.5" />
        <circle cx="10" cy="10" r="1.5" />
        <circle cx="10" cy="16" r="1.5" />
      </svg>
    </button>
  );
};

export default MoreMenuButton;
