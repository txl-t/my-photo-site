import { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import Navbar from '@/components/Navbar';
import CatButton from '@/components/CatButton';
import './globals.css';

export const metadata: Metadata = {
  title: 'Yezismile',
  description: '极简个人技术展示网站',
  openGraph: {
    title: 'Yezismile',
    description: '极简个人技术展示网站',
    type: 'website',
    url: 'https://example.com',
    images: [
      {
        url: 'https://example.com/api/og?title=Yezismile&description=极简个人技术展示网站',
        width: 1200,
        height: 630,
        alt: 'Yezismile',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Yezismile',
    description: '极简个人技术展示网站',
    images: [
      'https://example.com/api/og?title=Yezismile&description=极简个人技术展示网站',
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className="bg-white dark:bg-black text-gray-900 dark:text-white">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <Navbar />
          <main className="container mx-auto px-4 pt-24 pb-16">
            {children}
          </main>
          <CatButton />
        </ThemeProvider>
      </body>
    </html>
  );
}