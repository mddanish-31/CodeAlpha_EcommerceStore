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
            className={`inline-flex items-center min-h-[44px] px-4 py-2 rounded-control text-sm font-medium transition-colors ${
              isActive
                ? 'bg-brand-violet text-surface border border-brand-violet'
                : 'bg-surface text-ink border border-border-default shadow-card-subtle hover:bg-page-bg'
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
