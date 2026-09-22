import type { Args, ArgTypes } from '@storybook/nextjs-vite';
import { createTableColumnHelper } from '@/components/Table';
import type { User } from '@/features/user/types/user.type';

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

const columnHelper = createTableColumnHelper<User>();

export const storybookColumns = columnHelper.columns([
  columnHelper.accessor('id', {
    header: '아이디',
    size: 100,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('name', {
    header: '이름',
    size: 100,
    cell: (info) => info.getValue(),
  }),
]);

export const storybookData: User[] = [
  { id: 'test1', name: '테스트1' },
  { id: 'test2', name: '테스트2' },
];
