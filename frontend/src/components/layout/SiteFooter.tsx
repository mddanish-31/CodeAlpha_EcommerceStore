import React from 'react';
import Link from 'next/link';
import { PillBadge } from '@/components/ui/PillBadge';
import { DottedDivider } from './DottedDivider';

export function SiteFooter() {
  return (
    <footer className="bg-charred-clove border-t border-dotted border-tiger-gold pt-16 pb-10 mt-auto">
      <div className="store-container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="font-display text-2xl font-bold tracking-tight uppercase text-tiger-gold">
              SIMPLE E-COMMERCE STORE
            </div>
            <p className="text-xs text-warm-sand mt-3 leading-relaxed max-w-xs">
              CodeAlpha Full Stack Development Internship storefront built with Next.js App Router, TypeScript, and Tailwind CSS using the Editorial Craft Market design system.
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              <PillBadge tone="spice">NEXT.JS APP ROUTER</PillBadge>
              <PillBadge tone="spice">TYPESCRIPT</PillBadge>
              <PillBadge tone="spice">TAILWIND CSS</PillBadge>
            </div>
          </div>

          <div>
            <h2 className="text-[11px] font-semibold uppercase tracking-widest text-tiger-gold mb-3">
              SHOP DEPARTMENTS
            </h2>
            <ul className="space-y-2.5 text-xs text-warm-sand">
              <li>
                <Link href="/shop?category=Audio+%26+Desk+Craft" className="hover:text-tiger-gold transition-colors">
                  01 / Audio &amp; Desk Craft
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Everyday+Carry" className="hover:text-tiger-gold transition-colors">
                  02 / Everyday Carry
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Home+Objects" className="hover:text-tiger-gold transition-colors">
                  03 / Home Objects
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Apparel+%26+Goods" className="hover:text-tiger-gold transition-colors">
                  04 / Apparel &amp; Goods
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-[11px] font-semibold uppercase tracking-widest text-tiger-gold mb-3">
              CUSTOMER JOURNEY
            </h2>
            <ul className="space-y-2.5 text-xs text-warm-sand">
              <li>
                <Link href="/shop" className="hover:text-tiger-gold transition-colors">
                  All Products Catalog
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-tiger-gold transition-colors">
                  Shopping Cart
                </Link>
              </li>
              <li>
                <Link href="/checkout" className="hover:text-tiger-gold transition-colors">
                  Demo Checkout Flow
                </Link>
              </li>
              <li>
                <Link href="/account" className="hover:text-tiger-gold transition-colors">
                  Customer Account &amp; Orders
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-[11px] font-semibold uppercase tracking-widest text-tiger-gold mb-3">
              STOREFRONT &amp; SUPPORT
            </h2>
            <ul className="space-y-2.5 text-xs text-warm-sand">
              <li>
                <Link href="/about" className="hover:text-tiger-gold transition-colors">
                  About the Project
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-tiger-gold transition-colors">
                  Contact &amp; Support FAQ
                </Link>
              </li>
              <li>
                <Link href="/auth/login" className="hover:text-tiger-gold transition-colors">
                  Customer Sign In
                </Link>
              </li>
              <li>
                <Link href="/auth/register" className="hover:text-tiger-gold transition-colors">
                  Create Customer Account
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <DottedDivider />

        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-warm-sand">
          <span>
            © 2026 MD DANISH RAZA (@mddanish-31) • CodeAlpha Full Stack Development Internship • MIT License
          </span>
          <span>
            Phase 4B Frontend Implementation — Sample Catalog &amp; Demo Checkout
          </span>
        </div>
      </div>
    </footer>
  );
}
