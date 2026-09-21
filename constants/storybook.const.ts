import type { Args, ArgTypes } from '@storybook/nextjs-vite';

export const inputArgTypes: ArgTypes = {
  label: {
    control: 'text',
    description: 'Input 라벨 텍스트',
    table: {
      type: { summary: 'string' },
    },
  },
  labelWidth: {
    control: 'text',
    description: '라벨 너비',
    table: {
      type: { summary: 'string' },
    },
  },
  labelTooltip: { control: false, description: '인풋 라벨 툴팁' },
  register: {
    control: false,
    description: 'React Hook Form의 register 객체',
  },
} as const;

export const inputArgs: Args = {
  label: 'InputLabel',
  labelWidth: '80px',
  width: '240px',
  height: '48px',
};
