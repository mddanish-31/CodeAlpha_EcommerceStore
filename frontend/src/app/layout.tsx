import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { StoreProvider } from '@/context/StoreContext';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { MobileNavDrawer } from '@/components/navigation/MobileNavDrawer';
import { ToastBanner } from '@/components/ui/ToastBanner';

const antonio = localFont({
  src: [
    {
      path: '../fonts/antonio-latin-500-normal.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../fonts/antonio-latin-700-normal.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-antonio',
  display: 'swap',
});

const inter = localFont({
  src: [
    {
      path: '../fonts/inter-latin-400-normal.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/inter-latin-500-normal.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../fonts/inter-latin-600-normal.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../fonts/inter-latin-700-normal.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Simple E-commerce Store — Editorial Craft Market | CodeAlpha Internship',
  description:
    'Curated desk instruments, everyday carry, home objects, and utility goods. CodeAlpha Full Stack Development Internship storefront built with Next.js, TypeScript, and Tailwind CSS.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${antonio.variable} ${inter.variable}`}>
      <body>
        <StoreProvider>
          <AnnouncementBar />
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
          <CartDrawer />
          <MobileNavDrawer />
          <ToastBanner />
        </StoreProvider>
      </body>
    </html>
  );
}
