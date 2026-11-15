'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/shop', label: 'Shop' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export function MainNavPills({ className = '' }: { className?: string }) {
  const pathname = usePathname();

  return (
    <nav aria-label="Main storefront links" className={`flex flex-wrap items-center gap-2 ${className}`}>
      {NAV_LINKS.map((item) => {
        const isActive =
          item.href === '/'
            ? pathname === '/'
            : pathname === item.href || pathname.startsWith(`${item.href}/`);

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive ? 'page' : undefined}
            className={`inline-flex items-center min-h-[44px] px-4 py-2 rounded-pill text-sm font-medium tracking-[-0.014em] transition-colors ${
              isActive
                ? 'bg-ink-black text-pure-white border border-ink-black'
                : 'bg-pure-white text-ink-black border border-faint-border shadow-sm-soft hover:border-ink-black/40'
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
