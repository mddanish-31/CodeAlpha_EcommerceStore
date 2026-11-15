import Link from 'next/link';
import { LineIcon } from '@/components/ui/LineIcon';

export default function NotFound() {
  return (
    <div className="store-container py-12 sm:py-20">
      <div className="surface-card p-8 sm:p-12 max-w-lg mx-auto text-center space-y-5">
        <div className="text-5xl sm:text-6xl font-semibold tracking-[-0.055em] leading-none text-ink-black">
          <span>404</span>
          <span className="wordmark-dot" aria-hidden="true" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-[-0.045em] text-ink-black m-0">
            Studio Page Not Found
          </h1>
          <p className="text-sm text-muted-gray max-w-sm mx-auto m-0 leading-relaxed">
            The route or catalog object you requested is unavailable or has moved in this storefront layout.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Link href="/" className="btn-primary flex-1">
            <LineIcon name="home" size={16} />
            <span>Return Home</span>
          </Link>
          <Link href="/shop" className="btn-secondary flex-1">
            <span>Browse Catalog</span>
            <LineIcon name="arrow-right" size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
