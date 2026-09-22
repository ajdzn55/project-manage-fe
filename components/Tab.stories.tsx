import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import Tab from '@/components/Tab';
import { useArgs } from 'storybook/preview-api';

const tabItems = [
  {
    label: '첫번째 탭',
    item: <div className="p-7">첫번째 탭 내용입니다.</div>,
  },
  {
    label: '두번째 탭',
    item: <div className="p-7">두번째 탭 내용입니다.</div>,
  },
  {
    label: '세번째 탭',
    item: <div className="p-7">세번째 탭 내용입니다.</div>,
  },
];

const meta = {
  title: 'components/Tab',
  component: Tab,
  tags: ['autodocs'],
  argTypes: {
    TabItems: {
      control: false,
      description: '탭 라벨과 탭별 콘텐츠로 구성된 배열',
      table: {
        type: { summary: '{ label: string; item: ReactNode }[]' },
      },
    },
    selected: {
      control: 'select',
      options: tabItems.map(({ label }) => label),
      description: '현재 선택된 탭의 라벨',
    },
    setSelected: {
      control: false,
      description: '탭 선택 시 실행되는 이벤트 핸들러',
    },
  },
  args: {
    TabItems: tabItems,
    selected: tabItems[0].label,
    setSelected: fn(),
  },
} satisfies Meta<typeof Tab>;

export default meta;

type Story = StoryObj<typeof Tab>;

// 기본 상태
export const Default: Story = {
  render: (args) => {
    const [{ selected }, updateArgs] = useArgs();

    return (
      <Tab
        {...args}
        selected={selected}
        setSelected={(tabLabel) => {
          // Storybook의 selected args를 해당 값으로 업데이트
          updateArgs({ selected: tabLabel });
          args.setSelected(tabLabel);
        }}
      />
    );
  },
};
