'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useStore } from '@/context/StoreContext';
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs';
import { PillBadge } from '@/components/ui/PillBadge';
import { StateFeedbackCard } from '@/components/ui/StateFeedbackCard';
import { DottedDivider } from '@/components/layout/DottedDivider';

export default function AccountPage() {
  const { user, orders, signOutDemo, signInDemo } = useStore();
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'ORDERS' | 'PROFILE'>(
    'OVERVIEW'
  );

  if (!user) {
    return (
      <div className="store-container py-10 sm:py-14">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Customer Account' },
          ]}
        />
        <StateFeedbackCard
          status="empty"
          badgeText="DEMO SESSION SIGNED OUT"
          title="PLEASE SIGN IN TO VIEW YOUR ACCOUNT"
          message="Sign in with any email and 8+ character password, or restore the default demo customer session below."
          actionLabel="Restore Demo Customer Session"
          onAction={() =>
            signInDemo('danish.demo@codealpha-store.example', 'MD Danish Raza')
          }
        />
        <div className="text-center mt-4">
          <Link href="/auth/login" className="btn-link">
            Or go to Customer Sign In Page →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="store-container py-10 sm:py-14">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Customer Account' },
        ]}
      />

      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <PillBadge tone="gold">{user.role}</PillBadge>
            <PillBadge tone="spice">FRONTEND DEMO SESSION</PillBadge>
          </div>
          <h1 className="heading-section">HELLO, {user.fullName}</h1>
        </div>

        <button
          type="button"
          onClick={signOutDemo}
          className="btn btn-ghost self-start sm:self-auto"
        >
          Sign Out of Demo Session
        </button>
      </div>

      {/* Account Navigation Pills */}
      <div
        role="group"
        aria-label="Account Sections"
        className="flex items-center gap-2 flex-wrap mb-8 pb-4 border-b border-dotted border-tiger-gold"
      >
        <button
          type="button"
          aria-pressed={activeTab === 'OVERVIEW'}
          onClick={() => setActiveTab('OVERVIEW')}
          className="btn btn-ghost text-xs"
        >
          01 // Overview
        </button>
        <button
          type="button"
          aria-pressed={activeTab === 'ORDERS'}
          onClick={() => setActiveTab('ORDERS')}
          className="btn btn-ghost text-xs"
        >
          02 // Order History ({orders.length})
        </button>
        <button
          type="button"
          aria-pressed={activeTab === 'PROFILE'}
          onClick={() => setActiveTab('PROFILE')}
          className="btn btn-ghost text-xs"
        >
          03 // Personal &amp; Address Info
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {(activeTab === 'OVERVIEW' || activeTab === 'PROFILE') && (
          <section
            aria-labelledby="personal-info-heading"
            className={
              activeTab === 'PROFILE'
                ? 'lg:col-span-12 surface-card p-6'
                : 'lg:col-span-4 surface-card p-6'
            }
          >
            <h2
              id="personal-info-heading"
              className="heading-card text-tiger-gold mb-4"
            >
              PERSONAL INFORMATION
            </h2>

            <div className="space-y-3 text-xs break-words">
              <div>
                <div className="text-warm-sand uppercase tracking-wider text-[11px]">
                  Full Name
                </div>
                <div className="font-semibold text-sm text-parchment-cream mt-0.5">
                  {user.fullName}
                </div>
              </div>

              <div>
                <div className="text-warm-sand uppercase tracking-wider text-[11px]">
                  Registered Email
                </div>
                <div className="font-semibold text-sm text-parchment-cream mt-0.5">
                  {user.email}
                </div>
              </div>

              <div>
                <div className="text-warm-sand uppercase tracking-wider text-[11px]">
                  Member Since
                </div>
                <div className="text-parchment-cream mt-0.5">
                  {user.joinedDate}
                </div>
              </div>

              <DottedDivider className="my-3" />

              <div>
                <div className="text-warm-sand uppercase tracking-wider text-[11px] mb-1">
                  Default Delivery Address
                </div>
                <p className="text-parchment-cream leading-relaxed">
                  {user.defaultAddress.streetAddress}
                  <br />
                  {user.defaultAddress.city}, {user.defaultAddress.state}{' '}
                  {user.defaultAddress.postalCode}
                  <br />
                  {user.defaultAddress.country}
                  <br />
                  Tel: {user.defaultAddress.phone}
                </p>
              </div>
            </div>
          </section>
        )}

        {(activeTab === 'OVERVIEW' || activeTab === 'ORDERS') && (
          <section
            aria-labelledby="order-history-heading"
            className={
              activeTab === 'ORDERS' ? 'lg:col-span-12' : 'lg:col-span-8'
            }
          >
            <div className="flex items-center justify-between mb-4">
              <h2
                id="order-history-heading"
                className="heading-card text-tiger-gold"
              >
                ORDER HISTORY ({orders.length})
              </h2>
              <Link href="/shop" className="btn-link text-xs">
                + New Order
              </Link>
            </div>

            {orders.length === 0 ? (
              <StateFeedbackCard
                status="empty"
                badgeText="NO ORDERS YET"
                title="NO COMPLETED ORDERS FOUND"
                message="Your completed demo orders will appear here with full item snapshots and delivery tracking."
                actionLabel="Start Shopping"
                actionHref="/shop"
              />
            ) : (
              <div className="space-y-4">
                {orders.map((order, idx) => (
                  <article
                    key={order.orderId}
                    className="surface-card p-5 space-y-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-dotted border-tiger-gold">
                      <div>
                        <div className="text-[11px] uppercase tracking-wider text-warm-sand">
                          PLACED ON {order.createdAt}
                        </div>
                        <div className="heading-card text-parchment-cream">
                          ORDER #{order.orderId}
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <PillBadge
                          tone={
                            order.status === 'Cancelled'
                              ? 'alert'
                              : order.status === 'Delivered'
                              ? 'gold'
                              : 'spice'
                          }
                        >
                          {order.status.toUpperCase()}
                        </PillBadge>
                        <span className="font-display text-2xl font-bold text-tiger-gold tabular-nums">
                          ${order.totalAmount.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <details open={idx === 0}>
                      <summary className="list-none flex items-center justify-between cursor-pointer text-xs font-semibold uppercase tracking-wider text-tiger-gold py-1">
                        <span>
                          Inspect Order Items ({order.items.length}) &amp;
                          Delivery Details
                        </span>
                        <span aria-hidden="true">+</span>
                      </summary>

                      <div className="pt-3 space-y-3 text-xs">
                        <div className="space-y-2">
                          {order.items.map((line) => (
                            <div
                              key={line.product.id}
                              className="flex items-center justify-between bg-charred-clove border border-cardamom-brown rounded-[4px] p-3"
                            >
                              <div>
                                <Link
                                  href={`/shop/${line.product.id}`}
                                  className="font-semibold text-parchment-cream hover:text-tiger-gold"
                                >
                                  {line.product.title}
                                </Link>
                                <div className="text-[11px] text-warm-sand">
                                  Qty: {line.quantity} × $
                                  {line.product.price.toFixed(2)}
                                </div>
                              </div>
                              <div className="font-bold text-tiger-gold tabular-nums">
                                $
                                {(line.product.price * line.quantity).toFixed(
                                  2
                                )}
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="bg-charred-clove border border-cardamom-brown rounded-[4px] p-3 text-warm-sand">
                          <strong className="text-parchment-cream block mb-0.5">
                            Shipping Destination:
                          </strong>
                          {order.shippingAddress.fullName} —{' '}
                          {order.shippingAddress.streetAddress},{' '}
                          {order.shippingAddress.city},{' '}
                          {order.shippingAddress.country}
                        </div>
                      </div>
                    </details>
                  </article>
                ))}
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
}

