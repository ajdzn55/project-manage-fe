import './globals.css';
import ReactQueryProvider from '@/lib/ReactQueryProvider';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import AuthGuard from '@/features/auth/components/AuthGuard';
import { Suspense } from 'react';
import { ClipLoader } from 'react-spinners';

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="flex min-h-full flex-col font-sans">
        <ReactQueryProvider>
          <Suspense
            fallback={
              <ClipLoader
                color="#fff"
                loading
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            }
          >
            <AuthGuard>{children}</AuthGuard>
          </Suspense>

          {process.env.NODE_ENV === 'development' && <ReactQueryDevtools />}
        </ReactQueryProvider>
      </body>
    </html>
  );
}
