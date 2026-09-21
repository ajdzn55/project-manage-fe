import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import MoreMenuButton from '@/components/MoreMenuButton';
import { dialogAlert } from '@/utils/alert';

const meta = {
  title: 'components/MoreMenuButton',
  component: MoreMenuButton,
  parameters: { componentSubtitle: '추가 액션 메뉴를 제공하는 드롭다운 버튼' },
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
      description: '',
    },
  },
  args: {
    disabled: false,
    onModify: () =>
      dialogAlert({ type: 'question', content: '수정하시겠습니까?' }),
    onDelete: () =>
      dialogAlert({ type: 'warning', content: '삭제하시겠습니까?' }),
  },
} satisfies Meta<typeof MoreMenuButton>;

export default meta;

type Story = StoryObj<typeof MoreMenuButton>;

export const Default: Story = {};
