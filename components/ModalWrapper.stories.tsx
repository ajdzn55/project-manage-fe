import { type Meta, StoryObj } from '@storybook/nextjs-vite';
import ModalWrapper from '@/components/ModalWrapper';
import Table from '@/components/Table';
import { useState } from 'react';
import Button from '@/components/Button';
import { fn } from 'storybook/test';
import { storybookColumns, storybookData } from '@/constants/storybook.const';

const meta = {
  title: 'components/ModalWrapper',
  component: ModalWrapper,
  parameters: {
    componentSubtitle: '모달 기본 컨테이너',
    docs: {
      story: {
        inline: false, // 인라인 렌더링 미사용 (iframe으로 전환)
        iframeHeight: '400px', // 높이 지정
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: '모달 헤더에 표시할 제목',
    },
    onClose: {
      action: 'closed',
      description: '닫기 버튼 클릭, Escape 키 입력 시 실행되는 이벤트',
    },
    onSubmit: {
      description: '폼 제출 이벤트',
    },
    onAction: {
      description: '하단 버튼 클릭 이벤트',
    },
    buttonText: {
      control: 'text',
      description: '하단 버튼에 표시할 텍스트',
    },
    maxWidth: {
      control: 'text',
      description: '모달 최대 너비 (예: "360px")',
    },
    children: {
      control: false,
      description: '모달 내부 콘텐츠 (React Component 또는 JSX)',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
  },
  args: {
    title: '모달 제목',
    buttonText: '확인',
    children: (
      <Table data={storybookData} columns={storybookColumns} tableBorder />
    ),
    onClose: fn(),
  },
} satisfies Meta<typeof ModalWrapper>;

export default meta;

type Story = StoryObj<typeof ModalWrapper>;

// 기본 상태
export const Default: Story = {
  args: { onAction: fn() },
};

// 열고 닫기
export const Toggle: Story = {
  args: { title: '모달 열고 닫기', onAction: fn() },
  render: (args) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
      <>
        {isOpen ? (
          <ModalWrapper {...args} onClose={() => setIsOpen(false)}>
            {args.children}
          </ModalWrapper>
        ) : (
          <Button
            text="모달 열기"
            width="100px"
            height="30px"
            onClick={() => setIsOpen(true)}
          />
        )}
      </>
    );
  },
};

// 폼 제출
export const Submit: Story = {
  args: { title: '폼 제출', buttonText: '선택', onSubmit: fn() },
};
