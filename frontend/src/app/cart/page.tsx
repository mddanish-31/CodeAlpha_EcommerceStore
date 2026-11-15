'use client';

import React from 'react';
import { useStore } from '@/context/StoreContext';
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs';
import { FreeShippingBar } from '@/components/cart/FreeShippingBar';
import { CartItemRow } from '@/components/cart/CartItemRow';
import { CartSummaryCard } from '@/components/cart/CartSummaryCard';
import { StateFeedbackCard } from '@/components/ui/StateFeedbackCard';
import { PillBadge } from '@/components/ui/PillBadge';

export default function CartPage() {
  const { cart, cartCount, clearCart } = useStore();

  return (
    <div className="store-container py-10 sm:py-14">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Shopping Cart' },
        ]}
      />

      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-widest text-tiger-gold block mb-1.5">
            ORDER PREPARATION
          </span>
          <h1 className="heading-section">SHOPPING CART</h1>
        </div>
        <div className="flex items-center gap-3">
          <PillBadge tone="charred">{cartCount} ITEMS IN CART</PillBadge>
          {cart.length > 0 && (
            <button
              type="button"
              onClick={clearCart}
              className="btn-link text-xs"
            >
              Clear Cart
            </button>
          )}
        </div>
      </div>

      {cart.length === 0 ? (
        <StateFeedbackCard
          status="empty"
          badgeText="EMPTY SHOPPING CART"
          title="YOUR CART IS CURRENTLY EMPTY"
          message="Browse our curated departments to add desk lighting, field watches, pour-over kettles, or utility goods."
          actionLabel="Explore Store Catalog"
          actionHref="/shop"
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-4 min-w-0">
            <div className="surface-card p-4">
              <FreeShippingBar />
            </div>

            {cart.map((item) => (
              <CartItemRow key={item.product.id} item={item} />
            ))}
          </div>

          <div className="lg:col-span-4 sticky top-24">
            <CartSummaryCard showCheckoutCta />
          </div>
        </div>
      )}
    </div>
  );
}

