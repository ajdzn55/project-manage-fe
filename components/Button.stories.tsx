import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Button from './Button';

const meta = {
  title: 'components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: 'text',
      description: '버튼에 표시할 텍스트',
    },
    color: {
      control: 'radio',
      options: ['default', 'gray', 'white'],
      description: '버튼의 배경 및 테마 색상',
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
      description: 'HTML 버튼 타입',
    },
    width: {
      control: 'text',
      description: '버튼 가로 너비 (예: "120px", "100%")',
    },
    height: {
      control: 'text',
      description: '버튼 세로 높이 (예: "48px")',
    },
    disabled: {
      control: 'boolean',
      description: '버튼 비활성화 여부',
    },
    onClick: {
      action: 'clicked',
      description: '버튼 클릭 이벤트 핸들러',
    },
  },
  args: {
    text: 'Button',
    color: 'default',
    type: 'button',
    disabled: false,
    width: '120px',
    height: '48px',
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof Button>;

// 기본 상태
export const Default: Story = {};

// White 테마
export const White: Story = {
  args: {
    text: '취소',
    color: 'white',
  },
};

// Gray 테마
export const Gray: Story = {
  args: {
    text: '보류',
    color: 'gray',
  },
};

// 비활성화(Disabled) 상태
export const Disabled: Story = {
  args: {
    text: '비활성화',
    disabled: true,
  },
};

// 커스텀 크기 지정
export const CustomSize: Story = {
  args: {
    text: '너비 200px, 높이 40px 버튼',
    width: '200px',
    height: '40px',
  },
};
