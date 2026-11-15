'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useStore } from '@/context/StoreContext';
import { LineIcon } from '@/components/ui/LineIcon';

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { cartCount, openCartDrawer, openMobileNav, user } = useStore();

  const isRouteActive = (href: string) =>
    href === '/'
      ? pathname === '/'
      : pathname === href || pathname.startsWith(`${href}/`);

  const handleRailSearch = () => {
    const heroSearchInput = document.getElementById('hero-catalog-search') as HTMLInputElement | null;
    if (pathname === '/' && heroSearchInput) {
      heroSearchInput.scrollIntoView({ behavior: 'auto', block: 'center' });
      heroSearchInput.focus();
      return;
    }
    router.push('/shop');
  };

  const initials = user?.fullName
    ? user.fullName
        .split(' ')
        .map((part) => part[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : '';

  return (
    <>
      {/* Desktop (>= 1024px) Fixed 64px White Navigation Rail */}
      <aside
        aria-label="Desktop navigation rail"
        className="hidden lg:flex fixed inset-y-0 left-0 z-40 w-[64px] bg-pure-white border-r border-faint-border flex-col items-center justify-between py-4 px-2"
      >
        <div className="flex flex-col items-center gap-3 w-full">
          <Link
            href="/"
            aria-label="simple. Store Home"
            className="w-11 h-11 rounded-pill flex items-center justify-center text-ink-black hover:bg-canvas-mist transition-colors"
          >
            <span className="text-[19px] font-semibold tracking-[-0.055em] leading-none">
              s<span className="wordmark-dot" aria-hidden="true" />
            </span>
          </Link>

          <nav aria-label="Primary store rail" className="w-full">
            <ul className="flex flex-col items-center gap-1.5 list-none m-0 p-0">
              <li>
                <Link
                  href="/"
                  aria-label="Home"
                  aria-current={isRouteActive('/') ? 'page' : undefined}
                  className={`group relative w-12 h-12 rounded-[20px] flex items-center justify-center transition-colors ${
                    isRouteActive('/')
                      ? 'bg-canvas-mist text-shop-violet'
                      : 'text-slate-ink hover:bg-canvas-mist hover:text-ink-black'
                  }`}
                >
                  <LineIcon name="home" size={20} />
                  <span
                    role="tooltip"
                    className="pointer-events-none opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity absolute left-[58px] top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-pill bg-ink-black text-pure-white text-xs font-medium whitespace-nowrap shadow-card-soft z-50"
                  >
                    Home
                  </span>
                </Link>
              </li>

              <li>
                <Link
                  href="/shop"
                  aria-label="Shop Catalog"
                  aria-current={isRouteActive('/shop') ? 'page' : undefined}
                  className={`group relative w-12 h-12 rounded-[20px] flex items-center justify-center transition-colors ${
                    isRouteActive('/shop')
                      ? 'bg-canvas-mist text-shop-violet'
                      : 'text-slate-ink hover:bg-canvas-mist hover:text-ink-black'
                  }`}
                >
                  <LineIcon name="grid" size={20} />
                  <span
                    role="tooltip"
                    className="pointer-events-none opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity absolute left-[58px] top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-pill bg-ink-black text-pure-white text-xs font-medium whitespace-nowrap shadow-card-soft z-50"
                  >
                    Catalog
                  </span>
                </Link>
              </li>

              <li>
                <button
                  type="button"
                  onClick={handleRailSearch}
                  aria-label="Search store products"
                  className="group relative w-12 h-12 rounded-[20px] flex items-center justify-center text-slate-ink hover:bg-canvas-mist hover:text-ink-black transition-colors"
                >
                  <LineIcon name="search" size={20} />
                  <span
                    role="tooltip"
                    className="pointer-events-none opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity absolute left-[58px] top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-pill bg-ink-black text-pure-white text-xs font-medium whitespace-nowrap shadow-card-soft z-50"
                  >
                    Search
                  </span>
                </button>
              </li>

              <li>
                <Link
                  href="/account"
                  aria-label="Account and Orders"
                  aria-current={isRouteActive('/account') || isRouteActive('/auth') ? 'page' : undefined}
                  className={`group relative w-12 h-12 rounded-[20px] flex items-center justify-center transition-colors ${
                    isRouteActive('/account') || isRouteActive('/auth')
                      ? 'bg-canvas-mist text-shop-violet'
                      : 'text-slate-ink hover:bg-canvas-mist hover:text-ink-black'
                  }`}
                >
                  <LineIcon name="user" size={20} />
                  <span
                    role="tooltip"
                    className="pointer-events-none opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity absolute left-[58px] top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-pill bg-ink-black text-pure-white text-xs font-medium whitespace-nowrap shadow-card-soft z-50"
                  >
                    Account
                  </span>
                </Link>
              </li>

              <li>
                <button
                  type="button"
                  onClick={openCartDrawer}
                  aria-label={`Open shopping bag, ${cartCount} item${cartCount === 1 ? '' : 's'}`}
                  className="group relative w-12 h-12 rounded-[20px] flex items-center justify-center text-slate-ink hover:bg-canvas-mist hover:text-ink-black transition-colors"
                >
                  <LineIcon name="bag" size={20} />
                  {cartCount > 0 ? (
                    <span className="absolute top-1.5 right-1.5 min-w-[18px] h-[18px] px-1 rounded-pill bg-shop-violet text-pure-white text-[10px] font-medium leading-none flex items-center justify-center tabular-nums">
                      {cartCount}
                    </span>
                  ) : null}
                  <span
                    role="tooltip"
                    className="pointer-events-none opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity absolute left-[58px] top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-pill bg-ink-black text-pure-white text-xs font-medium whitespace-nowrap shadow-card-soft z-50"
                  >
                    Bag ({cartCount})
                  </span>
                </button>
              </li>

              <li>
                <Link
                  href="/about"
                  aria-label="About Simple Store"
                  aria-current={isRouteActive('/about') ? 'page' : undefined}
                  className={`group relative w-12 h-12 rounded-[20px] flex items-center justify-center transition-colors ${
                    isRouteActive('/about')
                      ? 'bg-canvas-mist text-shop-violet'
                      : 'text-slate-ink hover:bg-canvas-mist hover:text-ink-black'
                  }`}
                >
                  <LineIcon name="info" size={20} />
                  <span
                    role="tooltip"
                    className="pointer-events-none opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity absolute left-[58px] top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-pill bg-ink-black text-pure-white text-xs font-medium whitespace-nowrap shadow-card-soft z-50"
                  >
                    About
                  </span>
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  aria-label="Contact Support"
                  aria-current={isRouteActive('/contact') ? 'page' : undefined}
                  className={`group relative w-12 h-12 rounded-[20px] flex items-center justify-center transition-colors ${
                    isRouteActive('/contact')
                      ? 'bg-canvas-mist text-shop-violet'
                      : 'text-slate-ink hover:bg-canvas-mist hover:text-ink-black'
                  }`}
                >
                  <LineIcon name="mail" size={20} />
                  <span
                    role="tooltip"
                    className="pointer-events-none opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity absolute left-[58px] top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-pill bg-ink-black text-pure-white text-xs font-medium whitespace-nowrap shadow-card-soft z-50"
                  >
                    Contact
                  </span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <Link
          href={user ? '/account' : '/auth/login'}
          aria-label={user ? `Signed in as ${user.fullName}` : 'Sign in to account'}
          className="group relative min-w-[44px] min-h-[44px] rounded-pill flex items-center justify-center"
        >
          <span className="w-9 h-9 rounded-pill bg-canvas-mist border border-faint-border group-hover:border-shop-violet flex items-center justify-center text-xs font-semibold text-ink-black transition-colors">
            {initials || <LineIcon name="user" size={16} />}
          </span>
          <span
            role="tooltip"
            className="pointer-events-none opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity absolute left-[58px] top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-pill bg-ink-black text-pure-white text-xs font-medium whitespace-nowrap shadow-card-soft z-50"
          >
            {user ? user.fullName : 'Sign in'}
          </span>
        </Link>
      </aside>

      {/* Mobile & Tablet (< 1024px) Sticky White Top Bar */}
      <header className="lg:hidden sticky top-0 z-40 bg-pure-white border-b border-faint-border min-h-[56px] px-3 py-1.5 flex items-center justify-between gap-2">
        <Link
          href="/"
          aria-label="simple. Store Home"
          className="inline-flex items-center min-h-[44px] px-2 text-2xl font-semibold tracking-[-0.055em] text-ink-black leading-none shrink-0"
        >
          <span>simple</span>
          <span className="wordmark-dot" aria-hidden="true" />
        </Link>

        <nav aria-label="Mobile quick actions" className="flex items-center gap-1">
          <Link
            href="/shop"
            aria-label="Search store catalog"
            className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-pill bg-canvas-mist border border-faint-border text-ink-black hover:border-ink-black transition-colors"
          >
            <LineIcon name="search" size={18} />
          </Link>

          <button
            type="button"
            onClick={openCartDrawer}
            aria-label={`Open shopping bag, ${cartCount} item${cartCount === 1 ? '' : 's'}`}
            className="relative min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-pill bg-canvas-mist border border-faint-border text-ink-black hover:border-ink-black transition-colors"
          >
            <LineIcon name="bag" size={18} />
            {cartCount > 0 ? (
              <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-pill bg-shop-violet text-pure-white text-[10px] font-medium leading-none flex items-center justify-center tabular-nums">
                {cartCount}
              </span>
            ) : null}
          </button>

          <button
            type="button"
            onClick={openMobileNav}
            aria-label="Open navigation menu"
            className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-pill bg-canvas-mist border border-faint-border text-ink-black hover:border-ink-black transition-colors"
          >
            <LineIcon name="menu" size={20} />
          </button>
        </nav>
      </header>
    </>
  );
}
