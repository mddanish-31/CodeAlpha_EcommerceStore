'use client';

import React from 'react';
import Link from 'next/link';
import { useStore } from '@/context/StoreContext';
import { DottedDivider } from '@/components/layout/DottedDivider';

export function CartSummaryCard({
  showCheckoutCta = true,
  onNavigate,
}: {
  showCheckoutCta?: boolean;
  onNavigate?: () => void;
}) {
  const { cartCount, subtotal, shippingCost, totalAmount } = useStore();

  return (
    <div className="rounded-card bg-charred-clove border border-tiger-gold p-5">
      <h2 className="heading-card text-tiger-gold mb-4">ORDER SUMMARY</h2>

      <div className="space-y-2.5 text-xs text-warm-sand mb-4">
        <div className="flex items-center justify-between">
          <span>Subtotal ({cartCount} items)</span>
          <span className="text-parchment-cream font-semibold tabular-nums">
            ${subtotal.toFixed(2)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span>Estimated Standard Shipping</span>
          <span className="text-tiger-gold font-semibold tabular-nums">
            {shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}
          </span>
        </div>
      </div>

      <DottedDivider className="my-3.5" />

      <div className="flex items-baseline justify-between my-4">
        <span className="heading-card text-parchment-cream">ORDER TOTAL</span>
        <span className="font-display text-3xl font-bold text-tiger-gold tabular-nums">
          ${totalAmount.toFixed(2)}
        </span>
      </div>

      {showCheckoutCta && (
        <div className="space-y-2.5 mt-4">
          <Link
            href="/checkout"
            onClick={onNavigate}
            className="btn btn-primary w-full"
          >
            Proceed to Checkout
          </Link>
          <Link
            href="/shop"
            onClick={onNavigate}
            className="btn btn-ghost w-full"
          >
            Continue Shopping
          </Link>
        </div>
      )}
    </div>
  );
}
