import type { Metadata, Viewport } from 'next';
import './globals.css';
import { PT_Mono } from 'next/font/google';
import { ConvexClientProvider } from './ConvexClientProvider';
import { Toaster } from '@/components/ui/toaster';

const ptMono = PT_Mono({
  subsets: ['latin'],
  variable: '--font-pt-mono',
  weight: '400',
});

export const metadata: Metadata = {
  title: 'Asteroid Apocalypse',
  description: 'MIT Negociation',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${ptMono.className} antialiased`}>
        <ConvexClientProvider>{children}</ConvexClientProvider>
        <Toaster />
      </body>
    </html>
  );
}
