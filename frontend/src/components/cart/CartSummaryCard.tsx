'use client';

import Link from 'next/link';
import { useStore } from '@/context/StoreContext';
import { LineIcon } from '@/components/ui/LineIcon';
import { FreeShippingBar } from './FreeShippingBar';

interface CartSummaryCardProps {
  showCheckoutCta?: boolean;
}

export function CartSummaryCard({ showCheckoutCta = true }: CartSummaryCardProps) {
  const { cartCount, subtotal, shippingCost, totalAmount } = useStore();

  return (
    <aside
      aria-label="Order summary"
      className="surface-card p-6 space-y-5 lg:sticky lg:top-8"
    >
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-lg font-semibold tracking-[-0.04em] text-ink-black">
          Order Summary
        </h2>
        <span className="text-xs font-medium text-muted-gray tabular-nums">
          {cartCount} item{cartCount === 1 ? '' : 's'}
        </span>
      </div>

      <FreeShippingBar />

      <dl className="space-y-2.5 text-sm border-t border-b border-faint-border py-4 m-0">
        <div className="flex items-center justify-between gap-2">
          <dt className="text-muted-gray">Subtotal</dt>
          <dd className="m-0 font-medium text-ink-black tabular-nums">
            ${subtotal.toFixed(2)}
          </dd>
        </div>

        <div className="flex items-center justify-between gap-2">
          <dt className="text-muted-gray">Estimated Shipping</dt>
          <dd className="m-0 font-medium text-ink-black tabular-nums">
            {cartCount === 0
              ? '$0.00'
              : shippingCost === 0
              ? 'Free'
              : `$${shippingCost.toFixed(2)}`}
          </dd>
        </div>

        <div className="flex items-center justify-between gap-2 pt-2 border-t border-faint-border">
          <dt className="text-base font-semibold text-ink-black">Estimated Total</dt>
          <dd className="m-0 text-lg font-semibold text-ink-black tabular-nums">
            ${totalAmount.toFixed(2)}
          </dd>
        </div>
      </dl>

      {showCheckoutCta ? (
        <div className="space-y-2.5">
          {cartCount > 0 ? (
            <Link href="/checkout" className="btn-primary w-full justify-between">
              <span>Proceed to Checkout</span>
              <LineIcon name="arrow-right" size={16} />
            </Link>
          ) : (
            <button type="button" disabled className="btn-primary w-full">
              Add an item to checkout
            </button>
          )}
          <Link href="/shop" className="btn-secondary w-full">
            Continue Browsing
          </Link>
        </div>
      ) : null}

      <p className="text-xs text-muted-gray leading-relaxed m-0">
        Static preview calculation. No real payment processing or external API requests occur during checkout.
      </p>
    </aside>
  );
}
