import { type Dispatch, type SetStateAction, useEffect, useState } from 'react';

type StorageValue = string | boolean;

/**
 * 상태 값을 로컬 스토리지로 관리해야하는 경우 사용하는 커스텀 훅
 * @param {string} key - 스토리지 식별 KEY
 * @param {T} initialValue - 상태 초기값
 */
export const useStorage = <T extends StorageValue>(
  key: string,
  initialValue: T,
): [T, Dispatch<SetStateAction<T>>] => {
  const [state, setState] = useState<T>(initialValue);

  const changeState: Dispatch<SetStateAction<T>> = (value) => {
    setState((prev) => {
      // value의 타입에 따라 다음값을 결정
      const nextValue = typeof value === 'function' ? value(prev) : value;

      if (Object.is(prev, nextValue)) {
        return prev;
      }

      localStorage.setItem(key, JSON.stringify(nextValue));
      return nextValue;
    });
  };

  useEffect(() => {
    const restoreStorage = window.setTimeout(() => {
      const storedValue = localStorage.getItem(key);

      if (storedValue !== null) {
        setState(JSON.parse(storedValue) as T);
      }
    }, 0);

    return () => window.clearTimeout(restoreStorage);
  }, [key]);

  return [state, changeState];
};
