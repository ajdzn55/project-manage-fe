import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import SelectInput, { type SelectInputOption } from '@/components/SelectInput';
import { inputArgs, inputArgTypes } from '@/constants/storybook.const';
import { useState } from 'react';
import type { LabelTooltip } from '@/components/InputLabel';

const meta = {
  title: 'components/SelectInput',
  component: SelectInput,
  tags: ['autodocs'],
  argTypes: {
    ...inputArgTypes,
    options: {
      control: 'select',
      description:
        '옵션 배열<br />' +
        '• label: 화면에 표시될 텍스트<br />' +
        '• value: 서버로 전송되거나 코드에서 사용할 값',
    },
    width: {
      control: 'text',
      description: '인풋 너비 (예: "240px")',
    },
    height: {
      control: 'text',
      description: '인풋 높이 (예: "48px")',
    },
  },
  args: {
    ...inputArgs,
    options: [
      { label: 'option1', value: 1 },
      { label: 'option2', value: 2 },
      { label: 'option3', value: 3 },
    ],
    width: '240px',
    height: '48px',
  },
} satisfies Meta<typeof SelectInput>;

export default meta;

type Story = StoryObj<typeof SelectInput>;

export const Default: Story = {
  render: (args) => {
    const [selected, setSelected] = useState<SelectInputOption['value']>(
      args.options![0].value,
    );
    const labelTooltip: LabelTooltip | undefined = selected
      ? {
          id: 'storybook-tooltip',
          content: `현재 선택된 값 : ${String(selected)}`,
          type: 'info',
        }
      : undefined;

    return (
      <SelectInput
        {...args}
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        labelTooltip={labelTooltip}
      />
    );
  },
};
