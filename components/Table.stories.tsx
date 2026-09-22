import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { type ComponentProps, useState } from 'react';
import { fn } from 'storybook/test';
import Table from '@/components/Table';
import { storybookColumns, storybookData } from '@/constants/storybook.const';

type StoryRow = (typeof storybookData)[number];
/**
 * Storybook은 제네릭 컴포넌트의 행 타입을 자동으로 추론할 수 없으므로, 이 스토리에서 사용할 샘플 데이터 타입을 StoryRow로 지정한다.
 * 실제 Table 컴포넌트는 다양한 행 타입을 사용할 수 있는 제네릭 컴포넌트이다.
 */
const StoryTable = (props: ComponentProps<typeof Table<StoryRow>>) => (
  <Table<StoryRow> {...props} />
);

const meta = {
  title: 'components/Table',
  component: StoryTable, // Storybook 메타에 제네릭 Table을 직접 등록하면 행 타입이 object로 추론된다.
  tags: ['autodocs'],
  argTypes: {
    columns: {
      control: false,
      description: '테이블 열 정의 배열',
      table: {
        type: { summary: 'TableColumn<T>[]' },
      },
    },
    data: {
      control: false,
      description: '테이블에 표시할 행 데이터',
      table: {
        type: { summary: 'T[]' },
      },
    },
    rowKey: {
      control: false,
      description: '각 행의 Key (기본값: "id")',
    },
    onRowClick: {
      control: false,
      description: '행 클릭 시 실행되는 이벤트 핸들러',
    },
    selectedRowId: {
      control: 'text',
      description: '선택 상태로 표시할 행 ID',
    },
    showFooter: {
      control: 'boolean',
      description: '테이블 푸터 표시 여부',
    },
    footer: {
      control: 'text',
      description: '테이블 푸터에 표시할 콘텐츠',
    },
    tableBorder: {
      control: 'boolean',
      description: '테이블 외곽선 표시 여부',
    },
    isLoading: {
      control: 'boolean',
      description: '스켈레톤 로딩 상태 표시 여부',
    },
    skeletonRowCount: {
      control: 'number',
      description: '로딩 상태에서 표시할 스켈레톤 행 개수',
    },
    onDoubleClick: {
      control: false,
      description: '행 더블 클릭 시 실행되는 이벤트 핸들러',
    },
  },
  args: {
    columns: storybookColumns,
    data: storybookData,
    tableBorder: true,
    showFooter: false,
    isLoading: false,
    skeletonRowCount: 3,
    onDoubleClick: fn(),
  },
} satisfies Meta<typeof StoryTable>;

export default meta;

type Story = StoryObj<typeof meta>;

// 기본 상태
export const Default: Story = {};

// 행 선택 상태
export const Selectable: Story = {
  args: { onRowClick: fn() },
  render: (args) => {
    const [selectedRowId, setSelectedRowId] = useState<string>();

    return (
      <StoryTable
        {...args}
        selectedRowId={selectedRowId}
        onRowClick={(row) => {
          setSelectedRowId(row.id);
          args.onRowClick?.(row);
        }}
      />
    );
  },
};

// 푸터 표시 상태
export const WithFooter: Story = {
  args: { showFooter: true },
};

// 로딩 상태
export const Loading: Story = {
  args: { isLoading: true, skeletonRowCount: 4 },
};
