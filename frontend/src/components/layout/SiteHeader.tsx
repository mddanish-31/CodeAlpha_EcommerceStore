'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useStore } from '@/context/StoreContext';
import { MainNavPills } from '@/components/navigation/MainNavPills';
import { LineIcon } from '@/components/ui/LineIcon';

export function SiteHeader() {
  const { cartCount, openCartDrawer, openMobileNav, user } = useStore();
  const [headerQuery, setHeaderQuery] = useState('');
  const router = useRouter();

  const handleHeaderSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = headerQuery.trim();
    router.push(q ? `/shop?q=${encodeURIComponent(q)}` : '/shop');
  };

  return (
    <header className="sticky top-0 z-40 bg-dark-spice border-b border-dotted border-tiger-gold">
      <div className="store-container min-h-[72px] flex items-center justify-between gap-2 sm:gap-3 py-2">
        <Link
          href="/"
          className="inline-flex items-center gap-2 sm:gap-2.5 text-tiger-gold no-underline min-w-0"
          aria-label="Simple E-commerce Store Home"
        >
          <span
            aria-hidden="true"
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-pill bg-charred-clove border border-tiger-gold inline-flex items-center justify-center font-display font-bold text-sm sm:text-base text-tiger-gold shrink-0"
          >
            CA
          </span>
          <span className="min-w-0">
            <span className="block font-display text-lg sm:text-2xl font-bold tracking-tight uppercase text-tiger-gold leading-none truncate">
              SIMPLE E-COMMERCE
            </span>
            <span className="hidden min-[380px]:block font-sans text-[10px] font-semibold tracking-widest text-warm-sand mt-0.5 truncate">
              CODEALPHA STOREFRONT
            </span>
          </span>
        </Link>

        <MainNavPills />

        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <search className="hidden md:block w-52 lg:w-60" title="Header Catalog Search">
            <form onSubmit={handleHeaderSearch} className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-tiger-gold pointer-events-none">
                <LineIcon name="search" size={16} />
              </span>
              <input
                type="search"
                name="q"
                value={headerQuery}
                onChange={(e) => setHeaderQuery(e.target.value)}
                placeholder="Search objects..."
                aria-label="Search store catalog"
                enterKeyHint="search"
                className="input-pill pl-10 pr-3 py-2 text-xs"
              />
            </form>
          </search>

          <Link
            href={user ? '/account' : '/auth/login'}
            className="btn btn-ghost hidden sm:inline-flex px-3.5"
            aria-label={user ? 'Customer Account' : 'Sign In'}
          >
            <LineIcon name="user" size={16} />
            <span className="hidden xl:inline">{user ? 'Account' : 'Sign In'}</span>
          </Link>

          <button
            type="button"
            onClick={openCartDrawer}
            aria-label={`Open shopping cart drawer, ${cartCount} items`}
            className="inline-flex items-center gap-1.5 sm:gap-2 rounded-pill bg-charred-clove border border-tiger-gold text-tiger-gold hover:bg-tiger-gold hover:text-charred-clove px-2.5 sm:px-3.5 min-h-[44px] min-w-[44px] font-sans text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
          >
            <LineIcon name="bag" size={17} />
            <span className="hidden sm:inline">CART</span>
            <span className="rounded-pill bg-tiger-gold text-charred-clove px-2 py-0.5 text-[11px] font-bold tabular-nums">
              {cartCount}
            </span>
          </button>

          <button
            type="button"
            onClick={openMobileNav}
            aria-label="Open mobile navigation menu"
            className="btn-icon lg:hidden"
          >
            <LineIcon name="menu" size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}
