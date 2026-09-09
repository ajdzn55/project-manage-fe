import InputLabel from '@/components/InputLabel';
import React, { type InputHTMLAttributes } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  labelWidth?: string;
  register?: UseFormRegisterReturn<any>;
}

const DateInput = ({
  label,
  labelWidth = '0px',
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
      <InputLabel label={label} labelWidth={labelWidth} />

      <div className="min-w-0 flex-1">
        <input
          {...register}
          id={label ?? ''}
          type="date"
          max="9999-12-31"
          className="border-line text-heading h-11 w-full rounded-lg border bg-white px-3 transition outline-none focus:border-blue-500 focus:ring-3 focus:ring-blue-100"
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
