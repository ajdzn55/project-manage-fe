import { type InputHTMLAttributes } from 'react';
import InputLabel, { type LabelTooltip } from '@/components/InputLabel';
import type { UseFormRegisterReturn } from 'react-hook-form';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  labelWidth?: string;
  labelTooltip?: LabelTooltip;
  register?: UseFormRegisterReturn<any>;
}

const CheckboxInput = ({
  label,
  labelWidth = '0px',
  labelTooltip,
  register,
  ...inputProps
}: Props) => {
  return (
    <div
      className="flex items-center gap-[3px]"
      style={{
        width: inputProps.width ? inputProps.width : 'auto',
        height: inputProps.height ? inputProps.height : 'auto',
      }}
    >
      <div className="relative flex items-center">
        <input
          {...register}
          {...inputProps}
          id={label}
          type="checkbox"
          className="accent-primary size-4 shrink-0 cursor-pointer rounded border-slate-300 focus:ring-2 focus:ring-blue-100"
        />
      </div>

      <InputLabel
        label={label}
        labelWidth={labelWidth}
        tooltip={labelTooltip}
      />
    </div>
  );
};

export default CheckboxInput;
