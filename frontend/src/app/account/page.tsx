'use client';

import Link from 'next/link';
import { useStore } from '@/context/StoreContext';
import { getProductMedia } from '@/data/productMedia';
import { ProductMedia } from '@/components/ui/ProductMedia';
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs';
import { LineIcon } from '@/components/ui/LineIcon';
import { StateFeedbackCard } from '@/components/ui/StateFeedbackCard';
import { PillBadge } from '@/components/ui/PillBadge';

export default function AccountPage() {
  const { user, orders, cartCount, subtotal, openCartDrawer, signOutDemo, signInDemo } =
    useStore();

  const initials = user?.fullName
    ? user.fullName
        .split(' ')
        .map((p) => p[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : 'MD';

  return (
    <div className="store-container pt-6 sm:pt-8 pb-8 space-y-8">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Account & Orders' },
        ]}
      />

      <header className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="heading-primary m-0">Account Dashboard</h1>
          <p className="text-sm sm:text-base text-ink-muted m-0">
            Customer overview, active cart summary, saved delivery preferences, and order history.
          </p>
        </div>

        {user ? (
          <div className="flex flex-wrap items-center gap-2.5">
            <Link href="/shop" className="btn-secondary">
              Browse Shop
            </Link>
            <button type="button" onClick={signOutDemo} className="btn-secondary">
              Sign Out
            </button>
          </div>
        ) : null}
      </header>

      {!user ? (
        <div className="space-y-6">
          <StateFeedbackCard
            icon="user"
            title="You are browsing as a guest"
            description="Sign in with a demo account to review sample order history and saved shipping details."
            actionLabel="Sign In"
            actionHref="/auth/login"
          />
          <div className="text-center">
            <button
              type="button"
              onClick={() => signInDemo('danish.demo@codealpha.dev', 'MD Danish')}
              className="btn-secondary"
            >
              Restore Demo Session
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Top KPI Overview Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="surface-card p-5 space-y-1">
              <p className="text-xs font-medium text-ink-muted m-0">Recorded Orders</p>
              <p className="text-2xl font-bold text-ink m-0 tabular-nums">{orders.length}</p>
              <p className="text-xs text-ink-muted m-0">Stored locally in this browser</p>
            </div>

            <div className="surface-card p-5 flex items-center justify-between gap-3">
              <div className="space-y-1">
                <p className="text-xs font-medium text-ink-muted m-0">Shopping Cart</p>
                <p className="text-2xl font-bold text-ink m-0 tabular-nums">
                  {cartCount} item{cartCount === 1 ? '' : 's'} · ${subtotal.toFixed(2)}
                </p>
                <p className="text-xs text-ink-muted m-0">
                  {subtotal >= 75 ? 'Free shipping unlocked' : 'Free shipping above $75'}
                </p>
              </div>
              <button
                type="button"
                onClick={openCartDrawer}
                className="btn-secondary shrink-0 px-3"
              >
                Open
              </button>
            </div>

            <div className="surface-card p-5 space-y-1">
              <p className="text-xs font-medium text-ink-muted m-0">Account Status</p>
              <p className="text-lg font-semibold text-ink-secondary m-0">Active Demo Session</p>
              <p className="text-xs text-ink-muted m-0">Member since {user.joinedDate}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Profile + Default Shipping Address */}
            <div className="lg:col-span-4 space-y-4">
              <section className="surface-card p-6 space-y-4" aria-label="Customer profile">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-pill bg-surface-subtle border border-border flex items-center justify-center font-semibold text-base text-ink-secondary shrink-0">
                    {initials}
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-base font-semibold text-ink truncate m-0">
                      {user.fullName}
                    </h2>
                    <p className="text-xs text-ink-muted truncate m-0">{user.email}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-2 border-t border-border">
                  <PillBadge label="Demo Customer" tone="subtle" />
                  <PillBadge label={`Since ${user.joinedDate}`} tone="neutral" />
                </div>

                <p className="text-xs text-ink-muted leading-relaxed m-0">
                  Profile and order history stay stored in local browser storage until cleared or signed out.
                </p>
              </section>

              <section className="surface-card p-6 space-y-3" aria-label="Saved shipping address">
                <div className="flex items-center justify-between gap-2">
                  <h2 className="text-sm font-semibold text-ink m-0">
                    Default Delivery Location
                  </h2>
                  <span className="text-xs text-ink-muted">Primary</span>
                </div>
                <address className="not-italic text-xs sm:text-sm text-ink-muted leading-relaxed space-y-0.5">
                  <p className="font-medium text-ink m-0">{user.defaultAddress.fullName}</p>
                  <p className="m-0">{user.defaultAddress.streetAddress}</p>
                  <p className="m-0">
                    {user.defaultAddress.city}, {user.defaultAddress.state}{' '}
                    {user.defaultAddress.postalCode}
                  </p>
                  <p className="m-0">{user.defaultAddress.country}</p>
                </address>
                <Link href="/checkout" className="btn-primary w-full mt-2">
                  Proceed to Checkout
                </Link>
              </section>
            </div>

            {/* Right Column: Order History */}
            <section
              aria-label="Order history"
              className="lg:col-span-8 surface-card p-6 sm:p-8 space-y-5"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-border">
                <div className="space-y-0.5">
                  <h2 className="heading-sub m-0">Recent Orders</h2>
                  <p className="text-xs text-ink-muted m-0">
                    Pre-seeded demo orders paired with any simulated checkouts completed in this browser.
                  </p>
                </div>
                <span className="text-xs font-medium text-ink-muted tabular-nums">
                  {orders.length} order{orders.length === 1 ? '' : 's'}
                </span>
              </div>

              {orders.length === 0 ? (
                <p className="text-sm text-ink-muted m-0">No orders recorded yet.</p>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <article
                      key={order.orderId}
                      className="p-4 sm:p-5 rounded-image bg-background border border-border space-y-3.5"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-border">
                        <div className="space-y-0.5">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-sm font-semibold text-ink tabular-nums">
                              {order.orderId}
                            </span>
                            <PillBadge
                              label={order.status}
                              tone={order.status === 'Delivered' ? 'accent' : 'subtle'}
                            />
                          </div>
                          <p className="text-xs text-ink-muted m-0 tabular-nums">
                            Placed on {order.createdAt} · Ship to {order.shippingAddress.city}
                          </p>
                        </div>

                        <div className="text-right">
                          <div className="text-base font-bold text-ink tabular-nums">
                            ${order.totalAmount.toFixed(2)}
                          </div>
                          <div className="text-[11px] text-ink-muted tabular-nums">
                            {order.shippingCost === 0
                              ? 'Free shipping'
                              : `$${order.shippingCost} shipping`}
                          </div>
                        </div>
                      </div>

                      <ul className="space-y-2.5 list-none p-0 m-0">
                        {order.items.map((item) => {
                          const media = getProductMedia(item.product);
                          return (
                            <li
                              key={item.product.id}
                              className="flex items-center justify-between gap-3 text-xs sm:text-sm"
                            >
                              <div className="flex items-center gap-3 min-w-0">
                                <div className="w-10 h-10 rounded-lg bg-surface-subtle border border-border overflow-hidden shrink-0">
                                  <ProductMedia
                                    src={media.src}
                                    alt={media.alt}
                                    width={80}
                                    height={80}
                                  />
                                </div>
                                <Link
                                  href={`/shop/${item.product.id}`}
                                  className="text-ink font-medium hover:text-accent hover:underline underline-offset-4 truncate inline-flex items-center gap-1.5"
                                >
                                  <span className="truncate">{item.product.title}</span>
                                  <span className="text-ink-muted shrink-0">× {item.quantity}</span>
                                </Link>
                              </div>
                              <span className="font-semibold text-ink tabular-nums shrink-0">
                                ${(item.product.price * item.quantity).toFixed(2)}
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                    </article>
                  ))}
                </div>
              )}

              <div className="pt-2">
                <Link href="/shop" className="btn-primary">
                  <span>Browse More Products</span>
                  <LineIcon name="arrow-right" size={16} />
                </Link>
              </div>
            </section>
          </div>
        </div>
      )}
    </div>
  );
}
