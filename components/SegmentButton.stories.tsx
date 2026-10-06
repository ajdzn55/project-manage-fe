import SegmentButton, { type SegmentItem } from '@/components/SegmentButton';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { TaskViewTypeDesc } from '@/features/project/constants/task.const';
import { TaskViewTypeEnum } from '@/features/project/types/enums';
import { BoardIcon, ListIcon } from '@/components/icons/SegmentIcons';
import { fn } from 'storybook/test';
import { useArgs } from 'storybook/preview-api';
import type { ComponentProps } from 'react';

const segmentList = [
  {
    label: TaskViewTypeDesc[TaskViewTypeEnum.List],
    value: TaskViewTypeEnum.List,
    icon: <ListIcon />,
  },
  {
    label: TaskViewTypeDesc[TaskViewTypeEnum.Board],
    value: TaskViewTypeEnum.Board,
    icon: <BoardIcon />,
  },
] satisfies SegmentItem<TaskViewTypeEnum>[];

const StorySegmentButton = (
  props: ComponentProps<typeof SegmentButton<TaskViewTypeEnum>>,
) => <SegmentButton<TaskViewTypeEnum> {...props} />;

const meta = {
  title: 'components/SegmentButton',
  component: StorySegmentButton,
  tags: ['autodocs'],
  argTypes: {
    segmentList: {
      control: false,
      description: '버튼별 라벨, 값, 아이콘으로 구성된 배열',
      table: {
        type: {
          summary: '{ label: string; value: T, icon: ReactNode }[]',
        },
      },
    },
    selected: {
      control: 'select',
      options: segmentList.map((v) => v.value),
      description: '현재 선택된 버튼 값',
    },
    onChange: {
      control: false,
      description: '버튼 클릭(변경) 시 실행되는 이벤트 핸들러',
    },
    width: {
      control: 'text',
      description: '버튼 가로 너비 (예: "224px")',
    },
    height: {
      control: 'text',
      description: '버튼 세로 높이 (예: "40px")',
    },
  },
  args: {
    segmentList,
    selected: TaskViewTypeEnum.List,
    onChange: fn(),
    width: '224px',
    height: '40px',
  },
} satisfies Meta<typeof StorySegmentButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [{ selected }, updateArgs] = useArgs();

    return (
      <StorySegmentButton
        {...args}
        selected={selected}
        onChange={(value) => {
          updateArgs({ selected: value });
          args.onChange(value);
        }}
      />
    );
  },
};
