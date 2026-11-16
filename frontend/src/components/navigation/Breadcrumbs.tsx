import Link from 'next/link';
import { LineIcon } from '@/components/ui/LineIcon';

interface CrumbItem {
  label: string;
  href?: string;
}

export function Breadcrumbs({ items }: { items: CrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-5">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs sm:text-sm text-ink-muted list-none p-0 m-0">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={`${item.label}-${idx}`} className="inline-flex items-center gap-1.5">
              {idx > 0 ? (
                <LineIcon name="chevron-right" size={14} className="text-ink-muted shrink-0" />
              ) : null}
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="text-ink-muted hover:text-accent underline-offset-4 hover:underline transition-colors py-1"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="font-medium text-ink" aria-current={isLast ? 'page' : undefined}>
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
