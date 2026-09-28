import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import CheckboxInput from '@/components/CheckboxInput';
import { inputArgTypes } from '@/constants/storybook.const';
import { TaskStatusEnum } from '@/features/project/types/enums';
import { fn } from 'storybook/test';
import { useArgs } from 'storybook/preview-api';

const meta = {
  title: 'components/CheckboxInput',
  component: CheckboxInput,
  tags: ['autodocs'],
  argTypes: {
    ...inputArgTypes,
    value: {
      control: 'text',
      description: '체크박스 값',
    },
    checked: {
      control: false,
      description: '체크 여부',
    },
    onChange: {
      control: false,
      description: '체크 상태가 변경될 때 실행되는 이벤트 핸들러',
    },
  },
  args: {
    label: '대기',
    value: TaskStatusEnum.Todo,
    checked: false,
    onChange: fn(),
  },
} satisfies Meta<typeof CheckboxInput>;

export default meta;

type Story = StoryObj<typeof CheckboxInput>;

export const Default: Story = {
  render: (args) => {
    const [{ checked }, updateArgs] = useArgs();

    return (
      <CheckboxInput
        {...args}
        checked={checked}
        onChange={(e) => {
          updateArgs({ checked: e.target.checked });
          args.onChange?.(e);
        }}
      />
    );
  },
};
