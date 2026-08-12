'use client';

import { motion } from 'motion/react';
import type { MouseEventHandler } from 'react';

interface Props {
  text: string;
  width?: string;
  height?: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const Button = ({ text, width, height, type = 'button', onClick }: Props) => {
  return (
    <motion.button
      type={type}
      style={{ width: width ?? 'auto', height: height ?? 'auto' }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.12 }}
      className="flex items-center justify-center rounded-lg bg-blue-600 text-sm font-semibold text-white hover:bg-blue-700"
      onClick={onClick}
    >
      {text}
    </motion.button>
  );
};

export default Button;
