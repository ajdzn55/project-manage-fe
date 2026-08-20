import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface Props {
  disabled?: boolean;
  onModify?: () => void;
  onDelete?: () => void;
}

const MoreMenuButton = ({ disabled = false, onModify, onDelete }: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [buttonRect, setButtonRect] = useState<DOMRect | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);

  const handleMenuClick = useCallback(() => {
    if (disabled || !buttonRef.current) return;

    if (!isMenuOpen) {
      setButtonRect(buttonRef.current.getBoundingClientRect());
    }
    setIsMenuOpen((prev) => !prev);
  }, [disabled, isMenuOpen]);

  const onModifyClick = () => {
    setIsMenuOpen(false);

    if (onModify) onModify();
  };

  const onDeleteClick = () => {
    setIsMenuOpen(false);

    if (onDelete) onDelete();
  };

  // 팝업메뉴 바깥 클릭 시 닫히도록
  useEffect(() => {
    if (!isMenuOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      // 현재 클릭한 영역이 버튼이나 메뉴에 해당하는 경우 동작하지 않도록
      if (
        buttonRef.current?.contains(target) ||
        menuRef.current?.contains(target)
      )
        return;

      setIsMenuOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <div className="relative">
      <button
        type="button"
        aria-label="관리"
        ref={buttonRef}
        disabled={disabled}
        onClick={handleMenuClick}
        className="inline-flex size-8 items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <svg viewBox="0 0 20 20" fill="currentColor" className="size-4">
          <circle cx="10" cy="4" r="1.5" />
          <circle cx="10" cy="10" r="1.5" />
          <circle cx="10" cy="16" r="1.5" />
        </svg>
      </button>

      {isMenuOpen &&
        buttonRect &&
        createPortal(
          <ul
            ref={menuRef}
            style={{
              top: buttonRect.bottom + 4,
              left: buttonRect.right - 80,
            }}
            className="fixed z-30 w-20 cursor-pointer rounded-md border border-slate-400 bg-white shadow-lg"
          >
            <li>
              <button
                type="button"
                className="hover:bg-surface rounded-t-md p-2"
                onClick={onModifyClick}
              >
                수정
              </button>
            </li>
            <li>
              <button
                type="button"
                className="text-danger hover:bg-surface rounded-b-md p-2"
                onClick={onDeleteClick}
              >
                삭제
              </button>
            </li>
          </ul>,
          document.body,
        )}
    </div>
  );
};

export default MoreMenuButton;
