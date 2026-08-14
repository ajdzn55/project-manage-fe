'use client';

import { UseFormRegisterReturn } from 'react-hook-form';
import React from 'react';
import { SearchIcon } from '@/components/Icons';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  labelWidth?: string;
  register?: UseFormRegisterReturn<any>;
}

const SearchInput = ({
  label,
  labelWidth = '0px',
  register,
  ...inputProps
}: Props) => {
  return (
    <div
      className="relative flex items-center gap-[3px]"
      style={{
        width: inputProps.width ?? '100%',
        height: inputProps.height ?? '40px',
      }}
    >
      <label htmlFor={label} style={{ width: labelWidth }}>
        {label}
      </label>
      <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
        <SearchIcon />
      </span>
      <input
        {...register}
        id={label || undefined}
        type="search"
        className="h-full w-full rounded-md border border-slate-200 bg-white pr-3 pl-9 text-sm text-slate-700 transition outline-none placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        {...inputProps}
      />
    </div>
  );
};

export default SearchInput;
