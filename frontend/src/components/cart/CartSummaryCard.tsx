'use client';

import Link from 'next/link';
import { useStore } from '@/context/StoreContext';
import { getProductMedia } from '@/data/productMedia';
import { ProductMedia } from '@/components/ui/ProductMedia';
import { LineIcon } from '@/components/ui/LineIcon';
import { FreeShippingBar } from './FreeShippingBar';

interface CartSummaryCardProps {
  showCheckoutCta?: boolean;
  showItemThumbnails?: boolean;
}

export function CartSummaryCard({
  showCheckoutCta = true,
  showItemThumbnails = false,
}: CartSummaryCardProps) {
  const { cart, cartCount, subtotal, shippingCost, totalAmount } = useStore();

  return (
    <aside
      aria-label="Order summary"
      className="surface-card p-6 space-y-5 lg:sticky lg:top-24"
    >
      <div className="flex items-center justify-between gap-2">
        <h2 className="heading-sub m-0">Order Summary</h2>
        <span className="text-xs font-medium text-ink-muted tabular-nums">
          {cartCount} item{cartCount === 1 ? '' : 's'}
        </span>
      </div>

      {showItemThumbnails && cart.length > 0 ? (
        <ul className="space-y-3 list-none p-0 m-0 pt-2 border-t border-border">
          {cart.map((item) => {
            const media = getProductMedia(item.product);
            return (
              <li key={item.product.id} className="flex items-center gap-3 text-sm">
                <div className="w-12 h-12 rounded-control bg-surface-subtle border border-border overflow-hidden shrink-0">
                  <ProductMedia
                    src={media.src}
                    alt={media.alt}
                    width={96}
                    height={96}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-ink truncate m-0">
                    {item.product.title}
                  </p>
                  <p className="text-[11px] text-ink-muted m-0 tabular-nums">
                    Qty {item.quantity} × ${item.product.price}
                  </p>
                </div>
                <span className="text-xs font-semibold text-ink tabular-nums shrink-0">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </span>
              </li>
            );
          })}
        </ul>
      ) : null}

      <FreeShippingBar />

      <dl className="space-y-2.5 text-sm border-t border-b border-border py-4 m-0">
        <div className="flex items-center justify-between gap-2">
          <dt className="text-ink-muted">Subtotal</dt>
          <dd className="m-0 font-medium text-ink tabular-nums">
            ${subtotal.toFixed(2)}
          </dd>
        </div>

        <div className="flex items-center justify-between gap-2">
          <dt className="text-ink-muted">Estimated Shipping</dt>
          <dd className="m-0 font-medium text-ink tabular-nums">
            {cartCount === 0
              ? '$0.00'
              : shippingCost === 0
              ? 'Free'
              : `$${shippingCost.toFixed(2)}`}
          </dd>
        </div>

        <div className="flex items-center justify-between gap-2 pt-2 border-t border-border">
          <dt className="text-base font-semibold text-ink">Total</dt>
          <dd className="m-0 text-lg font-bold text-ink tabular-nums">
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
            Continue Shopping
          </Link>
        </div>
      ) : null}

      <p className="text-xs text-ink-muted leading-relaxed m-0">
        Demo storefront calculation. Free shipping threshold is $75 ($8 flat rate otherwise). No real payment occurs.
      </p>
    </aside>
  );
}
