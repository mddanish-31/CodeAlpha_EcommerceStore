import Link from 'next/link';
import { LineIcon } from '@/components/ui/LineIcon';

export default function NotFound() {
  return (
    <div className="store-container py-16 sm:py-24">
      <div className="surface-card p-8 sm:p-12 max-w-lg mx-auto text-center space-y-6">
        <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-pill bg-surface-subtle border border-border text-sm font-semibold text-ink tabular-nums">
          404 · Not Found
        </div>

        <div className="space-y-2">
          <h1 className="heading-primary m-0">Page not found</h1>
          <p className="text-sm sm:text-base text-ink-secondary max-w-sm mx-auto m-0 leading-relaxed">
            The page or catalog item you requested could not be found in CodeAlpha Store.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Link href="/" className="btn-primary flex-1">
            <LineIcon name="home" size={16} />
            <span>Go to Homepage</span>
          </Link>
          <Link href="/shop" className="btn-secondary flex-1">
            <span>Browse Shop</span>
            <LineIcon name="arrow-right" size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
