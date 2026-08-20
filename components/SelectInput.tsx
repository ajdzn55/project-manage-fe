import type { SelectHTMLAttributes } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';
import { SelectArrowIcon } from '@/components/Icons';
import InputLabel from '@/components/InputLabel';

export interface SelectInputOption {
  label: string;
  value: string;
}

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  labelWidth?: string;
  register?: UseFormRegisterReturn<any>;
  options?: SelectInputOption[];
  width?: string;
  height?: string;
}

const SelectInput = ({
  label,
  labelWidth = '0px',
  register,
  options = [],
  width,
  height,
  ...inputProps
}: Props) => {
  return (
    <div
      className="relative flex items-center gap-[3px]"
      style={{
        width: width ? width : 'auto',
        height: height ? height : 'auto',
      }}
    >
      <InputLabel label={label} labelWidth={labelWidth} />

      <div className="relative min-w-0 flex-1">
        <select
          {...register}
          id={label}
          className="border-line text-body h-11 w-full appearance-none rounded-lg border bg-white px-3 pr-9 transition outline-none hover:border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          {...inputProps}
        >
          {options.map((v) => (
            <option key={v.value} value={v.value}>
              {v.label}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
          <SelectArrowIcon />
        </span>
      </div>
    </div>
  );
};

export default SelectInput;
