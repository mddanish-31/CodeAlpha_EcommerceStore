'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useStore } from '@/context/StoreContext';
import { LineIcon } from '@/components/ui/LineIcon';
import { DEPARTMENTS } from '@/data/products';

export function MobileNavDrawer() {
  const { isMobileNavOpen, closeMobileNav, cartCount, user } = useStore();
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const dlg = dialogRef.current;
    if (!dlg) return;
    if (isMobileNavOpen && !dlg.open) {
      dlg.showModal();
    } else if (!isMobileNavOpen && dlg.open) {
      dlg.close();
    }
  }, [isMobileNavOpen]);

  // Close mobile drawer when route changes
  useEffect(() => {
    closeMobileNav();
  }, [pathname, closeMobileNav]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    const dlg = dialogRef.current;
    if (!dlg || e.target !== dlg) return;
    if (e.clientX === 0 && e.clientY === 0) return;
    const rect = dlg.getBoundingClientRect();
    const clickedInDialog =
      rect.top <= e.clientY &&
      e.clientY <= rect.top + rect.height &&
      rect.left <= e.clientX &&
      e.clientX <= rect.left + rect.width;
    if (!clickedInDialog) {
      closeMobileNav();
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = searchQuery.trim();
    closeMobileNav();
    router.push(trimmed ? `/shop?q=${encodeURIComponent(trimmed)}` : '/shop');
  };

  return (
    <dialog
      ref={dialogRef}
      id="mobile-nav-dialog"
      className="drawer-dialog"
      onClose={closeMobileNav}
      onClick={handleBackdropClick}
      aria-labelledby="mobile-nav-title"
      {...({ closedby: 'any' } as Record<string, string>)}
    >
      <div className="flex flex-col h-full justify-between gap-6">
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-dotted border-tiger-gold">
            <h2 id="mobile-nav-title" className="heading-card text-tiger-gold">
              STOREFRONT MENU
            </h2>
            <button
              type="button"
              onClick={closeMobileNav}
              className="btn-icon"
              aria-label="Close mobile navigation menu"
            >
              <LineIcon name="close" size={18} />
            </button>
          </div>

          <search className="my-4" title="Mobile Storefront Search">
            <form onSubmit={handleSearchSubmit} className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-tiger-gold pointer-events-none">
                <LineIcon name="search" size={16} />
              </span>
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products or departments..."
                aria-label="Search store catalog"
                enterKeyHint="search"
                className="input-pill pl-11 pr-4"
              />
            </form>
          </search>

          <nav aria-label="Mobile Primary Navigation" className="space-y-2.5">
            <Link href="/" className="btn btn-ghost w-full justify-between">
              <span>01 // HOME</span>
              <LineIcon name="arrow-right" size={16} />
            </Link>
            <Link href="/shop" className="btn btn-primary w-full justify-between">
              <span>02 // SHOP ALL PRODUCTS</span>
              <LineIcon name="arrow-right" size={16} />
            </Link>
            <Link href="/cart" className="btn btn-ghost w-full justify-between">
              <span>03 // SHOPPING CART ({cartCount})</span>
              <LineIcon name="arrow-right" size={16} />
            </Link>
            <Link href="/account" className="btn btn-ghost w-full justify-between">
              <span>04 // {user ? 'MY ACCOUNT & ORDERS' : 'ACCOUNT OVERVIEW'}</span>
              <LineIcon name="arrow-right" size={16} />
            </Link>
            <Link href="/about" className="btn btn-ghost w-full justify-between">
              <span>05 // ABOUT THE STORE</span>
              <LineIcon name="arrow-right" size={16} />
            </Link>
            <Link href="/contact" className="btn btn-ghost w-full justify-between">
              <span>06 // CONTACT &amp; FAQ</span>
              <LineIcon name="arrow-right" size={16} />
            </Link>
          </nav>

          <div className="mt-6 pt-4 border-t border-dotted border-tiger-gold">
            <div className="text-[11px] font-semibold uppercase tracking-widest text-warm-sand mb-3">
              BROWSE BY DEPARTMENT
            </div>
            <div className="flex flex-wrap gap-2">
              {DEPARTMENTS.map((dept) => (
                <Link
                  key={dept.id}
                  href={`/shop?category=${encodeURIComponent(dept.name)}`}
                  className="btn btn-ghost text-xs py-1.5 px-3"
                >
                  {dept.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-dotted border-tiger-gold flex items-center justify-between gap-2">
          <Link href="/auth/login" className="btn btn-ghost flex-1">
            Sign In
          </Link>
          <Link href="/auth/register" className="btn btn-primary flex-1">
            Register
          </Link>
        </div>
      </div>
    </dialog>
  );
}

