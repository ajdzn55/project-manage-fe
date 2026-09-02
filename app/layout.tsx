import './globals.css';
import ReactQueryProvider from '@/lib/ReactQueryProvider';
import AuthProvider from '@/features/auth/contexts/AuthContext';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="flex min-h-full flex-col font-sans">
        <ReactQueryProvider>
          <AuthProvider>{children}</AuthProvider>
          {process.env.NODE_ENV === 'development' && <ReactQueryDevtools />}
        </ReactQueryProvider>
      </body>
    </html>
  );
}
