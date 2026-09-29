import type { UseFormRegisterReturn } from 'react-hook-form';
import type { InputHTMLAttributes } from 'react';
import { SearchIcon } from '@/components/icons/InputIcons';
import InputLabel, { type LabelTooltip } from '@/components/InputLabel';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  labelWidth?: string;
  labelTooltip?: LabelTooltip;
  register?: UseFormRegisterReturn<any>;
}

const SearchInput = ({
  label,
  labelWidth = '0px',
  labelTooltip,
  register,
  ...inputProps
}: Props) => {
  return (
    <div
      className="relative flex items-center gap-[3px]"
      style={{
        width: inputProps.width ? inputProps.width : 'auto',
        height: inputProps.height ? inputProps.height : 'auto',
      }}
    >
      <InputLabel
        label={label}
        labelWidth={labelWidth}
        tooltip={labelTooltip}
      />

      <div className="relative min-w-0 flex-1">
        <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
          <SearchIcon />
        </span>
        <input
          {...register}
          id={label || undefined}
          type="search"
          className="border-line text-body h-11 w-full rounded-lg border bg-white pr-3 pl-9 transition outline-none placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          {...inputProps}
        />
      </div>
    </div>
  );
};

export default SearchInput;
