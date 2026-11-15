'use client';

import React from 'react';
import { useStore } from '@/context/StoreContext';
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs';
import { CheckoutForm } from '@/components/forms/CheckoutForm';
import { StateFeedbackCard } from '@/components/ui/StateFeedbackCard';
import { PillBadge } from '@/components/ui/PillBadge';

export default function CheckoutPage() {
  const { cart } = useStore();

  return (
    <div className="store-container py-10 sm:py-14">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Cart', href: '/cart' },
          { label: 'Checkout' },
        ]}
      />

      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-widest text-tiger-gold block mb-1.5">
            STEP 02 // DELIVERY &amp; ORDER REVIEW
          </span>
          <h1 className="heading-section">CHECKOUT</h1>
        </div>
        <PillBadge tone="spice">FRONTEND DEMO CHECKOUT</PillBadge>
      </div>

      {cart.length === 0 ? (
        <StateFeedbackCard
          status="empty"
          badgeText="NO ITEMS FOR CHECKOUT"
          title="YOUR CART IS EMPTY"
          message="Add one or more products from the catalog before proceeding to checkout."
          actionLabel="Return to Shop"
          actionHref="/shop"
        />
      ) : (
        <CheckoutForm />
      )}
    </div>
  );
}
