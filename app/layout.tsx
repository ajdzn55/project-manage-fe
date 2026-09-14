import './globals.css';
import ReactQueryProvider from '@/lib/ReactQueryProvider';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import AuthGuard from '@/features/auth/components/AuthGuard';

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="flex min-h-full flex-col font-sans">
        <ReactQueryProvider>
          <AuthGuard>{children}</AuthGuard>
          {process.env.NODE_ENV === 'development' && <ReactQueryDevtools />}
        </ReactQueryProvider>
      </body>
    </html>
  );
}
