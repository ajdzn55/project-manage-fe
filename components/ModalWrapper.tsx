'use client';

import Button from '@/components/Button';
import { type ReactNode, SubmitEventHandler, useEffect, useId } from 'react';

interface Props {
  title: string;
  children: ReactNode;
  onClose: () => void;
  onSubmit?: SubmitEventHandler<HTMLFormElement>;
  submitButtonText: string;
}

const ModalWrapper = ({
  title,
  children,
  onClose,
  onSubmit,
  submitButtonText,
}: Props) => {
  const titleId = useId();

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <>
      <button
        type="button"
        aria-label="모달 닫기"
        onClick={onClose}
        className="fixed inset-0 z-50 bg-slate-950/55 backdrop-blur-[2px]"
      />
      <form
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onSubmit={onSubmit}
        className="fixed top-1/2 left-1/2 z-[60] w-[calc(100%-2rem)] max-w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-5 shadow-2xl"
      >
        <div className="flex items-center justify-between gap-4">
          <h2 id={titleId} className="text-heading text-lg font-bold">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="닫기"
            className="flex size-8 items-center justify-center rounded-md text-xl text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
          >
            ×
          </button>
        </div>

        <div className="mt-5 flex flex-col gap-3">{children}</div>

        <div className="mt-5">
          <Button
            text={submitButtonText}
            width="100%"
            height="40px"
            type="submit"
          />
        </div>
      </form>
    </>
  );
};

export default ModalWrapper;
