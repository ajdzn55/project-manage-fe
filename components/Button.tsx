'use client';

import { motion } from 'motion/react';
import type { MouseEventHandler } from 'react';

interface Props {
  text: string;
  color?: 'default' | 'gray' | 'white';
  width?: string;
  height?: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

const Button = ({
  text,
  color = 'default',
  width,
  height,
  type = 'button',
  onClick,
  disabled,
}: Props) => {
  const backgroundColor =
    color === 'default'
      ? 'bg-primary hover:bg-primary-hover text-white'
      : color === 'white'
        ? 'border border-gray-200 hover:border-gray-300 bg-white text-muted'
        : 'bg-gray-200 hover:bg-gray-300';

  return (
    <motion.button
      type={type}
      style={{ width: width ?? 'auto', height: height ?? 'auto' }}
      whileHover={disabled ? undefined : { scale: 1.02 }}
      whileTap={disabled ? undefined : { scale: 0.97 }}
      transition={{ duration: 0.12 }}
      className={`flex items-center justify-center rounded-lg font-semibold ${backgroundColor} ${
        disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </motion.button>
  );
};

export default Button;
