import React from 'react';
import Button from '@/components/Button';

interface EmptyStateProps {
  title: string;
  content: string;
  actionText?: string;
  onAction?: () => void;
}

const EmptyState = ({
  title,
  content,
  actionText,
  onAction,
}: EmptyStateProps) => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-3 pt-20">
      <p className="text-2xl font-bold">{title}</p>
      <p>{content}</p>
      {actionText && onAction && (
        <div className="w-36">
          <Button
            text={actionText}
            width="100%"
            height="40px"
            onClick={onAction}
          />
        </div>
      )}
    </div>
  );
};

export default EmptyState;
