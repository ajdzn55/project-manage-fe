import InputLabel, { type LabelTooltip } from '@/components/InputLabel';
import React, { type InputHTMLAttributes } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  labelWidth?: string;
  labelTooltip?: LabelTooltip;
  register?: UseFormRegisterReturn<any>;
  width?: string;
  height?: string;
}

const DateInput = ({
  label,
  labelWidth = '0px',
  labelTooltip,
  register,
  width,
  height,
  ...inputProps
}: Props) => {
  return (
    <div
      className="flex items-center gap-[3px]"
      style={{
        width: width ?? 'auto',
        height: height ?? '44px',
      }}
    >
      <InputLabel
        label={label}
        labelWidth={labelWidth}
        tooltip={labelTooltip}
      />

      <div className="h-full min-w-0 flex-1">
        <input
          {...register}
          {...inputProps}
          id={label ?? ''}
          type="date"
          max="9999-12-31"
          className="border-line text-heading h-full w-full cursor-pointer rounded-lg border bg-white px-3 transition outline-none focus:border-blue-500 focus:ring-3 focus:ring-blue-100"
          onChange={(e) => {
            if (inputProps.onChange) inputProps.onChange(e);
            register?.onChange(e);
          }}
        />
      </div>
    </div>
  );
};

export default DateInput;
