'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useStore } from '@/context/StoreContext';
import { LineIcon } from '@/components/ui/LineIcon';

const DRAWER_LINKS = [
  { href: '/', label: 'Home', description: 'Featured objects & departments' },
  { href: '/shop', label: 'Shop All Objects', description: 'Browse & filter 12 curated items' },
  { href: '/cart', label: 'Shopping Cart', description: 'Review items & shipping calculation' },
  { href: '/account', label: 'Account & Orders', description: 'Demo profile & order history' },
  { href: '/about', label: 'About CodeAlpha Store', description: 'Curated hardware & craft overview' },
  { href: '/contact', label: 'Contact & FAQ', description: 'Questions & support policies' },
];

export function MobileNavDrawer() {
  const { isMobileNavOpen, closeMobileNav, openCartDrawer, cartCount, user } = useStore();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();
  const prevPathnameRef = useRef(pathname);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isMobileNavOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isMobileNavOpen && dialog.open) {
      dialog.close();
    }
  }, [isMobileNavOpen]);

  useEffect(() => {
    if (prevPathnameRef.current !== pathname) {
      prevPathnameRef.current = pathname;
      if (isMobileNavOpen) {
        closeMobileNav();
      }
    }
  }, [pathname, isMobileNavOpen, closeMobileNav]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    const dialog = dialogRef.current;
    if (!dialog || ('closedBy' in HTMLDialogElement.prototype)) return;
    if (e.target !== dialog) return;
    if (e.clientX === 0 && e.clientY === 0) return;

    const rect = dialog.getBoundingClientRect();
    const isInside =
      rect.top <= e.clientY &&
      e.clientY <= rect.top + rect.height &&
      rect.left <= e.clientX &&
      e.clientX <= rect.left + rect.width;

    if (!isInside) {
      dialog.close();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      id="mobile-nav-dialog"
      closedby="any"
      aria-labelledby="mobile-nav-title"
      onClose={closeMobileNav}
      onClick={handleBackdropClick}
      className="drawer-dialog drawer-left"
    >
      <div className="flex flex-col h-full bg-surface text-ink">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border-default">
          <div id="mobile-nav-title" className="inline-flex items-center gap-2 text-lg font-semibold tracking-tight">
            <span
              className="w-7 h-7 rounded-lg bg-brand-violet text-surface inline-flex items-center justify-center"
              aria-hidden="true"
            >
              <LineIcon name="layers" size={15} />
            </span>
            <span>CodeAlpha Store</span>
          </div>
          <button
            type="button"
            onClick={closeMobileNav}
            aria-label="Close navigation menu"
            className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-control bg-page-bg border border-border-default text-ink hover:bg-surface-subtle transition-colors"
          >
            <LineIcon name="close" size={18} />
          </button>
        </div>

        <nav aria-label="Mobile menu navigation" className="flex-1 overflow-y-auto p-4 space-y-2">
          {DRAWER_LINKS.map((item) => {
            const active =
              item.href === '/'
                ? pathname === '/'
                : pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMobileNav}
                aria-current={active ? 'page' : undefined}
                className={`flex items-center justify-between p-3.5 rounded-image border transition-colors ${
                  active
                    ? 'bg-violet-soft border-brand-violet text-brand-dark'
                    : 'bg-surface border-border-default text-ink hover:bg-page-bg'
                }`}
              >
                <div>
                  <div className="text-sm font-semibold">{item.label}</div>
                  <div className={`text-xs ${active ? 'text-brand-dark/80' : 'text-muted'}`}>
                    {item.description}
                  </div>
                </div>
                <LineIcon
                  name="chevron-right"
                  size={16}
                  className={active ? 'text-brand-violet shrink-0' : 'text-muted shrink-0'}
                />
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border-default bg-page-bg space-y-2.5">
          <button
            type="button"
            onClick={() => {
              closeMobileNav();
              openCartDrawer();
            }}
            className="btn-primary w-full justify-between"
          >
            <span className="inline-flex items-center gap-2">
              <LineIcon name="bag" size={16} />
              <span>Open Shopping Cart</span>
            </span>
            <span className="px-2 py-0.5 rounded-pill bg-surface text-brand-dark text-xs font-semibold tabular-nums">
              {cartCount}
            </span>
          </button>

          <Link
            href={user ? '/account' : '/auth/login'}
            onClick={closeMobileNav}
            className="btn-secondary w-full"
          >
            <LineIcon name="user" size={16} />
            <span>{user ? `${user.fullName} (Account)` : 'Sign In or Register'}</span>
          </Link>
        </div>
      </div>
    </dialog>
  );
}
