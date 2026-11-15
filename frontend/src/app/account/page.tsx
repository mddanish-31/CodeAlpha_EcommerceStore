'use client';

import Link from 'next/link';
import { useStore } from '@/context/StoreContext';
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs';
import { LineIcon } from '@/components/ui/LineIcon';
import { StateFeedbackCard } from '@/components/ui/StateFeedbackCard';
import { PillBadge } from '@/components/ui/PillBadge';

export default function AccountPage() {
  const { user, orders, signOutDemo, signInDemo } = useStore();

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
          <h1 className="display-hero m-0">Account &amp; Orders</h1>
          <p className="text-sm text-canvas-secondary m-0">
            Demo session profile, saved delivery details, and browser-stored order history.
          </p>
        </div>

        {user ? (
          <button type="button" onClick={signOutDemo} className="btn-secondary">
            Sign Out
          </button>
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Profile + Default Shipping Address */}
          <div className="lg:col-span-4 space-y-4">
            <section className="surface-card p-6 space-y-4" aria-label="Customer profile">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-pill bg-canvas-mist border border-faint-border flex items-center justify-center font-semibold text-base text-ink-black shrink-0">
                  {initials}
                </div>
                <div className="min-w-0">
                  <h2 className="text-base font-semibold text-ink-black truncate m-0">
                    {user.fullName}
                  </h2>
                  <p className="text-xs text-muted-gray truncate m-0">
                    {user.email}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-2 border-t border-faint-border">
                <PillBadge label="Demo Account Active" tone="violet-subtle" />
                <PillBadge label={`Since ${user.joinedDate}`} tone="neutral" />
              </div>

              <p className="text-xs text-muted-gray leading-relaxed m-0">
                Profile and order state remain active in your browser until you sign out or clear storage. Backend JWT accounts launch in Phase 5.
              </p>
            </section>

            <section className="surface-card p-6 space-y-3" aria-label="Saved shipping address">
              <div className="flex items-center justify-between gap-2">
                <h2 className="text-sm font-semibold text-ink-black m-0">
                  Saved Shipping Address
                </h2>
                <span className="text-xs text-muted-gray">Default</span>
              </div>
              <address className="not-italic text-xs sm:text-sm text-muted-gray leading-relaxed space-y-0.5">
                <p className="font-medium text-ink-black m-0">{user.defaultAddress.fullName}</p>
                <p className="m-0">{user.defaultAddress.streetAddress}</p>
                <p className="m-0">
                  {user.defaultAddress.city}, {user.defaultAddress.state}{' '}
                  {user.defaultAddress.postalCode}
                </p>
                <p className="m-0">{user.defaultAddress.country}</p>
                <p className="m-0 tabular-nums">{user.defaultAddress.phone}</p>
              </address>
              <Link href="/checkout" className="btn-secondary w-full mt-2">
                Go to Checkout
              </Link>
            </section>
          </div>

          {/* Right Column: Order History */}
          <section
            aria-label="Order history"
            className="lg:col-span-8 surface-card p-6 sm:p-8 space-y-5"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-faint-border">
              <div className="space-y-0.5">
                <h2 className="text-lg font-semibold tracking-[-0.04em] text-ink-black m-0">
                  Order History
                </h2>
                <p className="text-xs text-muted-gray m-0">
                  Includes sample pre-seeded orders and any simulated orders placed in this browser.
                </p>
              </div>
              <span className="text-xs font-medium text-muted-gray tabular-nums">
                {orders.length} order{orders.length === 1 ? '' : 's'}
              </span>
            </div>

            {orders.length === 0 ? (
              <p className="text-sm text-muted-gray m-0">No orders recorded yet.</p>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <article
                    key={order.orderId}
                    className="p-4 sm:p-5 rounded-image bg-canvas-mist border border-faint-border space-y-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-pure-white">
                      <div className="space-y-0.5">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-sm font-semibold text-ink-black tabular-nums">
                            {order.orderId}
                          </span>
                          <PillBadge
                            label={order.status}
                            tone={order.status === 'Delivered' ? 'dark' : 'light'}
                          />
                        </div>
                        <p className="text-xs text-canvas-secondary m-0 tabular-nums">
                          Placed on {order.createdAt} · Ship to {order.shippingAddress.city}
                        </p>
                      </div>

                      <div className="text-right">
                        <div className="text-base font-semibold text-ink-black tabular-nums">
                          ${order.totalAmount.toFixed(2)}
                        </div>
                        <div className="text-[11px] text-canvas-secondary tabular-nums">
                          {order.shippingCost === 0 ? 'Free shipping' : `$${order.shippingCost} shipping`}
                        </div>
                      </div>
                    </div>

                    <ul className="space-y-1.5 list-none p-0 m-0">
                      {order.items.map((item) => (
                        <li
                          key={item.product.id}
                          className="flex items-center justify-between gap-3 text-xs sm:text-sm"
                        >
                          <Link
                            href={`/shop/${item.product.id}`}
                            className="text-ink-black hover:underline underline-offset-4 truncate inline-flex items-center gap-1.5"
                          >
                            <span>{item.product.title}</span>
                            <span className="text-canvas-secondary">× {item.quantity}</span>
                          </Link>
                          <span className="font-medium text-ink-black tabular-nums shrink-0">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            )}

            <div className="pt-2">
              <Link href="/shop" className="btn-primary">
                <span>Browse More Objects</span>
                <LineIcon name="arrow-right" size={16} />
              </Link>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
