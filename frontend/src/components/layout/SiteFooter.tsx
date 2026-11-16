import Link from 'next/link';
import { DEPARTMENTS } from '@/data/products';
import { LineIcon } from '@/components/ui/LineIcon';

export function SiteFooter() {
  return (
    <footer className="bg-surface border-t border-border-default mt-16 lg:mt-20">
      <div className="store-container py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-border-default">
          <div className="space-y-3 sm:col-span-2 lg:col-span-1">
            <Link
              href="/"
              aria-label="CodeAlpha Store Home"
              className="inline-flex items-center gap-2.5 text-lg font-semibold tracking-tight text-ink"
            >
              <span
                className="w-8 h-8 rounded-lg bg-brand-violet text-surface inline-flex items-center justify-center shrink-0"
                aria-hidden="true"
              >
                <LineIcon name="layers" size={16} />
              </span>
              <span>
                CodeAlpha <span className="font-normal text-muted">Store</span>
              </span>
            </Link>
            <p className="text-sm text-muted max-w-xs leading-relaxed m-0">
              Curated Everyday Objects for Work, Home and Life across Audio &amp; Desk Craft, Everyday Carry, Home Objects, and Apparel.
            </p>
            <p className="text-xs font-medium text-brand-dark bg-violet-soft border border-violet-border inline-flex px-2.5 py-1 rounded-pill m-0">
              Frontend Demo Store · Browser Storage
            </p>
          </div>

          <nav aria-label="Catalog departments footer" className="space-y-3">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-ink m-0">
              Departments
            </h2>
            <ul className="space-y-2 text-sm text-muted list-none p-0 m-0">
              {DEPARTMENTS.map((dept) => (
                <li key={dept.id}>
                  <Link
                    href={`/shop?category=${encodeURIComponent(dept.name)}`}
                    className="hover:text-brand-violet transition-colors py-0.5 inline-block"
                  >
                    {dept.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Storefront links footer" className="space-y-3">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-ink m-0">
              Storefront
            </h2>
            <ul className="space-y-2 text-sm text-muted list-none p-0 m-0">
              <li>
                <Link href="/" className="hover:text-brand-violet transition-colors py-0.5 inline-block">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-brand-violet transition-colors py-0.5 inline-block">
                  Shop All Objects
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-brand-violet transition-colors py-0.5 inline-block">
                  Shopping Cart
                </Link>
              </li>
              <li>
                <Link href="/checkout" className="hover:text-brand-violet transition-colors py-0.5 inline-block">
                  Simulated Checkout
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Account and support footer" className="space-y-3">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-ink m-0">
              Account &amp; Info
            </h2>
            <ul className="space-y-2 text-sm text-muted list-none p-0 m-0">
              <li>
                <Link href="/about" className="hover:text-brand-violet transition-colors py-0.5 inline-block">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-brand-violet transition-colors py-0.5 inline-block">
                  Contact &amp; FAQ
                </Link>
              </li>
              <li>
                <Link href="/account" className="hover:text-brand-violet transition-colors py-0.5 inline-block">
                  Account &amp; Orders
                </Link>
              </li>
              <li>
                <Link href="/auth/login" className="hover:text-brand-violet transition-colors py-0.5 inline-block">
                  Sign In / Register
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-muted">
          <p className="m-0">
            © 2026 CodeAlpha Store · Simple E-commerce Store Internship Project. Cart and demo orders persist locally in browser storage.
          </p>
          <p className="m-0 font-medium text-ink-secondary tabular-nums">
            Free shipping above $75 · $8 standard rate
          </p>
        </div>
      </div>
    </footer>
  );
}
