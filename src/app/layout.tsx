import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from './Header';
import Main from './Main';
import Provider from './Provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'チャットアプリ',
  description: 'リアルタイムのチャットアプリケーション',
};

type Props = { children: React.ReactNode };

export default function RootLayout({ children }: Props) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <Provider>
          <Header />
          <Main>{children}</Main>
        </Provider>
      </body>
    </html>
  );
}
