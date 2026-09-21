import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import TextInput from './TextInput';
import { inputArgs } from '@/constants/storybook.const';

const meta = {
  title: 'components/TextInput',
  component: TextInput,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'number'],
      description: 'HTML 인풋 타입',
    },
    register: {
      control: false,
      description: 'React Hook Form의 register 객체',
    },
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
    hasError: {
      control: 'boolean',
      description: '에러 여부',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
  args: {
    ...inputArgs,
    hasError: false,
  },
} satisfies Meta<typeof TextInput>;

export default meta;

type Story = StoryObj<typeof TextInput>;

// 기본 상태
export const Default: Story = {};

// 필수 입력 상태
export const Required: Story = {
  args: { required: true, placeholder: '입력해주세요.' },
};

// 에러 상태
export const Error: Story = {
  args: { hasError: true },
};

// 비밀번호 입력형
export const Password: Story = {
  args: {
    type: 'password',
    defaultValue: '비밀번호',
  },
};

// 이메일 입력형
export const Email: Story = {
  args: {
    type: 'email',
    label: '이메일',
  },
};
