import Link from 'next/link';

export function SiteFooter() {
  return (
    <footer className="bg-ink-black text-pure-white mt-16 lg:mt-20">
      <div className="store-container py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-slate-ink">
          <div className="space-y-3 sm:col-span-2 lg:col-span-1">
            <Link
              href="/"
              aria-label="simple. Store Home"
              className="inline-flex items-center text-[28px] font-semibold tracking-[-0.055em] text-pure-white leading-none"
            >
              <span>simple</span>
              <span className="wordmark-dot" aria-hidden="true" />
            </Link>
            <p className="text-sm text-cool-stone max-w-xs leading-relaxed">
              Floating Shopping Constellation — curated Everyday Carry, Home Objects, Desk Craft, and Studio Apparel.
            </p>
            <p className="text-xs text-violet-wash">
              CodeAlpha Internship — Frontend Storefront (Demo State)
            </p>
          </div>

          <nav aria-label="Catalog departments footer" className="space-y-3">
            <h2 className="text-xs font-medium tracking-[-0.01em] uppercase text-violet-wash">
              Departments
            </h2>
            <ul className="space-y-2 text-sm text-cool-stone list-none p-0 m-0">
              <li>
                <Link href="/shop?category=Audio+%26+Desk+Craft" className="hover:text-pure-white transition-colors py-0.5 inline-block">
                  Audio &amp; Desk Craft
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Everyday+Carry" className="hover:text-pure-white transition-colors py-0.5 inline-block">
                  Everyday Carry
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Home+Objects" className="hover:text-pure-white transition-colors py-0.5 inline-block">
                  Home Objects
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Apparel+%26+Goods" className="hover:text-pure-white transition-colors py-0.5 inline-block">
                  Apparel &amp; Goods
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Storefront links footer" className="space-y-3">
            <h2 className="text-xs font-medium tracking-[-0.01em] uppercase text-violet-wash">
              Storefront
            </h2>
            <ul className="space-y-2 text-sm text-cool-stone list-none p-0 m-0">
              <li>
                <Link href="/shop" className="hover:text-pure-white transition-colors py-0.5 inline-block">
                  Shop All Objects
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-pure-white transition-colors py-0.5 inline-block">
                  Shopping Bag
                </Link>
              </li>
              <li>
                <Link href="/checkout" className="hover:text-pure-white transition-colors py-0.5 inline-block">
                  Simulated Checkout
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-pure-white transition-colors py-0.5 inline-block">
                  About Us
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Account and support footer" className="space-y-3">
            <h2 className="text-xs font-medium tracking-[-0.01em] uppercase text-violet-wash">
              Account &amp; Help
            </h2>
            <ul className="space-y-2 text-sm text-cool-stone list-none p-0 m-0">
              <li>
                <Link href="/auth/login" className="hover:text-pure-white transition-colors py-0.5 inline-block">
                  Sign In
                </Link>
              </li>
              <li>
                <Link href="/auth/register" className="hover:text-pure-white transition-colors py-0.5 inline-block">
                  Create Account
                </Link>
              </li>
              <li>
                <Link href="/account" className="hover:text-pure-white transition-colors py-0.5 inline-block">
                  Account &amp; Orders
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-pure-white transition-colors py-0.5 inline-block">
                  Contact &amp; FAQ
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-cool-stone">
          <p className="m-0">
            © 2026 simple. Storefront — White Canvas Commerce. Interactive frontend preview (orders &amp; cart persisted in local browser storage).
          </p>
          <p className="m-0 text-cool-stone tabular-nums">
            Free shipping at $75 USD
          </p>
        </div>
      </div>
    </footer>
  );
}
