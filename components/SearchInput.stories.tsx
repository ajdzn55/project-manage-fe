import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import SearchInput from '@/components/SearchInput';
import { inputArgs, inputArgTypes } from '@/constants/storybook.const';

const meta = {
  title: 'components/SearchInput',
  component: SearchInput,
  tags: ['autodocs'],
  argTypes: inputArgTypes,
  args: inputArgs,
} satisfies Meta<typeof SearchInput>;

export default meta;

type Story = StoryObj<typeof SearchInput>;

export const Default: Story = {};
