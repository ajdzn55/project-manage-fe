import './globals.css';
import ReactQueryProvider from '@/lib/ReactQueryProvider';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Suspense } from 'react';
import { ClipLoader } from 'react-spinners';

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="flex min-h-full flex-col font-sans">
        <ReactQueryProvider>
          <Suspense
            fallback={
              <div
                className="flex min-h-screen w-full items-center justify-center"
                role="status"
                aria-label="페이지 로딩 중"
              >
                <ClipLoader color="var(--color-primary)" loading size={48} />
              </div>
            }
          >
            {children}
          </Suspense>

          {process.env.NODE_ENV === 'development' && <ReactQueryDevtools />}
        </ReactQueryProvider>
      </body>
    </html>
  );
}
