import { type Meta, StoryObj } from '@storybook/nextjs-vite';
import DateInput from '@/components/DateInput';
import { inputArgs, inputArgTypes } from '@/constants/storybook.const';

const meta = {
  title: 'components/DateInput',
  component: DateInput,
  tags: ['autodocs'],
  argTypes: inputArgTypes,
  args: inputArgs,
} satisfies Meta<typeof DateInput>;

export default meta;

type Story = StoryObj<typeof DateInput>;

export const Default: Story = {};
