import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: process.env.NEXT_PUBLIC_TITLE || 'Jarvis'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" className="dark">
      <body className="bg-gray-900 text-gray-100 font-sans">
        <div className="min-h-screen flex flex-col">
          <header className="p-4 border-b border-gray-700 flex items-center justify-between">
            <h1 className="text-xl font-bold">Jarvis</h1>
            <nav className="space-x-4 text-sm">
              <a href="/" className="hover:underline">Chat</a>
              <a href="/admin" className="hover:underline">Admin</a>
            </nav>
          </header>
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
