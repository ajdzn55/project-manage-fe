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
}

const Button = ({
  text,
  color = 'default',
  width,
  height,
  type = 'button',
  onClick,
}: Props) => {
  const backgroundColor =
    color === 'default'
      ? 'bg-blue-600 hover:bg-blue-700 text-white'
      : color === 'white'
        ? 'border border-gray-200 hover:border-gray-300'
        : 'bg-gray-200 hover:bg-gray-300';

  return (
    <motion.button
      type={type}
      style={{ width: width ?? 'auto', height: height ?? 'auto' }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.12 }}
      className={`flex cursor-pointer items-center justify-center rounded-lg font-semibold ${backgroundColor}`}
      onClick={onClick}
    >
      {text}
    </motion.button>
  );
};

export default Button;
