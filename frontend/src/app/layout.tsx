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

const inter = localFont({
  src: [
    { path: '../fonts/inter-latin-400-normal.woff2', weight: '400', style: 'normal' },
    { path: '../fonts/inter-latin-500-normal.woff2', weight: '500', style: 'normal' },
    { path: '../fonts/inter-latin-600-normal.woff2', weight: '600', style: 'normal' },
    { path: '../fonts/inter-latin-700-normal.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'CodeAlpha Store — Curated Everyday Objects & Desk Craft',
    template: '%s | CodeAlpha Store',
  },
  description:
    'Modern online storefront for Audio & Desk Craft, Everyday Carry, Home Objects, and Apparel & Goods.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans bg-page-bg text-ink antialiased selection:bg-violet-soft selection:text-brand-dark">
        <a href="#main-content" className="sr-only skip-link">
          Skip to main content
        </a>

        <StoreProvider>
          <div className="min-h-screen flex flex-col">
            <AnnouncementBar />
            <SiteHeader />
            <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
              {children}
            </main>
            <SiteFooter />
          </div>

          <CartDrawer />
          <MobileNavDrawer />
          <ToastBanner />
        </StoreProvider>
      </body>
    </html>
  );
}
