'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useStore } from '@/context/StoreContext';
import { useTheme } from '@/context/ThemeContext';
import { LineIcon } from '@/components/ui/LineIcon';

const HEADER_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/shop', label: 'Shop' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
      title={theme === 'light' ? 'Dark mode' : 'Light mode'}
      className="min-w-[40px] min-h-[40px] sm:min-w-[44px] sm:min-h-[44px] inline-flex items-center justify-center rounded-control border border-border bg-surface text-ink hover:bg-background transition-colors"
    >
      {theme === 'light' ? (
        <LineIcon name="moon" size={18} className="text-ink-secondary shrink-0" />
      ) : (
        <LineIcon name="sun" size={18} className="text-accent shrink-0" />
      )}
      <span className="sr-only">
        {theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
      </span>
    </button>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { cartCount, openCartDrawer, openMobileNav, user } = useStore();
  const [headerQuery, setHeaderQuery] = useState('');

  const isRouteActive = (href: string) =>
    href === '/'
      ? pathname === '/'
      : pathname === href || pathname.startsWith(`${href}/`);

  const handleHeaderSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = headerQuery.trim();
    router.push(trimmed ? `/shop?q=${encodeURIComponent(trimmed)}` : '/shop');
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface">
      <div className="store-container h-16 flex items-center justify-between gap-3">
        {/* Left: Brand Wordmark + Primary Desktop Links */}
        <div className="flex items-center gap-6 lg:gap-8 shrink-0">
          <Link
            href="/"
            aria-label="CodeAlpha Store Home"
            className="inline-flex items-center gap-2 min-h-[44px] py-1 shrink-0 text-ink hover:opacity-90 transition-opacity"
          >
            <span
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-accent text-surface inline-flex items-center justify-center shrink-0"
              aria-hidden="true"
            >
              <LineIcon name="layers" size={16} />
            </span>
            <span className="text-[15px] sm:text-lg font-semibold tracking-tight leading-none whitespace-nowrap">
              CodeAlpha{' '}
              <span className="hidden sm:inline font-normal text-ink-secondary">Store</span>
            </span>
          </Link>

          <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-1">
            {HEADER_LINKS.map((item) => {
              const active = isRouteActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={`inline-flex items-center min-h-[40px] px-3.5 py-2 rounded-control text-sm font-semibold transition-colors whitespace-nowrap ${active ? 'text-accent bg-surface-subtle' : 'text-ink-secondary hover:text-ink hover:bg-background'}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right: Search Bar (lg+), Quick Search Link (<lg), Theme, Account & Cart */}
        <div className="flex items-center gap-0.5 sm:gap-2 shrink-0">
          <search role="search" className="hidden lg:block w-56 xl:w-64">
            <form
              onSubmit={handleHeaderSearch}
              className="flex items-center h-10 pl-3 pr-1 rounded-control bg-background border border-border focus-within:border-accent focus-within:bg-surface focus-within:ring-1 focus-within:ring-accent transition-colors"
            >
              <label htmlFor="header-catalog-search" className="sr-only">
                Search products
              </label>
              <LineIcon name="search" size={16} className="text-ink-muted shrink-0 mr-2" />
              <input
                id="header-catalog-search"
                name="q"
                type="search"
                value={headerQuery}
                onChange={(e) => setHeaderQuery(e.target.value)}
                placeholder="Search products..."
                className="flex-1 min-w-0 bg-transparent border-0 text-sm text-ink placeholder:text-ink-secondary focus:outline-none py-1"
              />
              {headerQuery ? (
                <button
                  type="button"
                  onClick={() => setHeaderQuery('')}
                  aria-label="Clear header search"
                  className="w-7 h-7 inline-flex items-center justify-center rounded-md text-ink-muted hover:text-ink"
                >
                  <LineIcon name="close" size={13} />
                </button>
              ) : null}
            </form>
          </search>

          <Link
            href="/shop"
            aria-label="Search store catalog"
            className="lg:hidden min-w-[38px] sm:min-w-[44px] min-h-[40px] sm:min-h-[44px] inline-flex items-center justify-center rounded-control text-ink hover:bg-background transition-colors"
          >
            <LineIcon name="search" size={18} />
          </Link>

          <ThemeToggle />

          <Link
            href={user ? '/account' : '/auth/login'}
            aria-label={user ? `Account profile (${user.fullName})` : 'Sign in to account'}
            aria-current={isRouteActive('/account') || isRouteActive('/auth') ? 'page' : undefined}
            className={`relative min-w-[38px] sm:min-w-[44px] min-h-[40px] sm:min-h-[44px] inline-flex items-center justify-center rounded-control transition-colors ${
              isRouteActive('/account') || isRouteActive('/auth')
                ? 'text-accent bg-surface-subtle'
                : 'text-ink-secondary hover:text-ink hover:bg-background'
            }`}
          >
            <LineIcon name="user" size={18} />
          </Link>

          <button
            type="button"
            onClick={openCartDrawer}
            aria-label={`Open shopping cart, ${cartCount} item${cartCount === 1 ? '' : 's'}`}
            className="relative min-w-[44px] min-h-[40px] sm:min-h-[44px] px-1.5 sm:px-2.5 inline-flex items-center justify-center gap-1 sm:gap-1.5 rounded-control text-ink hover:bg-background transition-colors"
          >
            <LineIcon name="bag" size={18} />
            <span
              className={`min-w-[19px] h-5 px-1.5 rounded-pill text-[11px] font-semibold leading-none inline-flex items-center justify-center tabular-nums ${
                cartCount > 0 ? 'bg-accent text-surface' : 'bg-surface-subtle text-ink-secondary'
              }`}
            >
              {cartCount}
            </span>
          </button>

          <button
            type="button"
            onClick={openMobileNav}
            aria-label="Open navigation menu"
            className="lg:hidden min-w-[40px] sm:min-w-[44px] min-h-[40px] sm:min-h-[44px] inline-flex items-center justify-center rounded-control border border-border bg-surface text-ink hover:bg-background transition-colors"
          >
            <LineIcon name="menu" size={19} />
          </button>
        </div>
      </div>
    </header>
  );
}
