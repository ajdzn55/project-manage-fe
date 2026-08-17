import React from 'react';

interface Props {
  label?: string;
  labelWidth?: string;
}

const InputLabel = ({ label, labelWidth = '0px' }: Props) => {
  return (
    <label
      htmlFor={label}
      style={{ width: labelWidth }}
      className="flex items-center text-sm font-semibold text-slate-700"
    >
      {label}
    </label>
  );
};

export default InputLabel;
