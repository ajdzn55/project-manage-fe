'use client';
import { useEffect } from 'react';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // if (process.env.NODE_ENV !== 'production') {
    console.error(error);
    // }
  }, [error]);

  return (
    <div className="flex h-full min-h-0 w-full flex-col items-center justify-center gap-3 px-6 text-center">
      <div className="flex size-14 items-center justify-center rounded-full bg-red-50 text-red-500">
        <svg
          aria-hidden="true"
          className="size-7"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            d="M12 9v3.5m0 3.5h.01M10.3 4.8 2.9 18a1.5 1.5 0 0 0 1.3 2.2h15.6a1.5 1.5 0 0 0 1.3-2.2L13.7 4.8a2 2 0 0 0-3.4 0Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.8"
          />
        </svg>
      </div>
      <h2 className="text-2xl font-bold">데이터를 불러오지 못했습니다.</h2>
      <p className="text-sm text-slate-500">잠시 후 다시 시도해주세요.</p>
      <button
        onClick={reset}
        className="mt-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
      >
        다시 시도
      </button>
    </div>
  );
}
