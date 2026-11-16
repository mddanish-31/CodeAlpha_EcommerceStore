'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Product } from '@/types/store';
import { useStore } from '@/context/StoreContext';
import { QuantityStepper } from '@/components/ui/QuantityStepper';
import { LineIcon } from '@/components/ui/LineIcon';

export function ProductBuyBox({ product }: { product: Product }) {
  const { addToCart, openCartDrawer, cartCount } = useStore();
  const [quantity, setQuantity] = useState(1);

  const soldOut = product.stockCount === 0;
  const lowStock = !soldOut && product.stockCount <= 3;

  const handleAdd = () => {
    if (soldOut) return;
    addToCart(product, quantity);
  };

  return (
    <div className="surface-card p-6 sm:p-8 space-y-5">
      <div className="space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
          <span className="font-semibold uppercase tracking-wider text-ink-secondary">
            {product.category}
          </span>
          <span className="tabular-nums text-ink-muted">SKU {product.sku}</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-ink leading-tight m-0">
          {product.title}
        </h1>
      </div>

      <div className="flex flex-wrap items-baseline gap-3">
        <span className="text-2xl sm:text-3xl font-bold text-ink tabular-nums">
          ${product.price.toFixed(2)}
        </span>
        {product.compareAtPrice ? (
          <span className="text-base text-ink-muted line-through tabular-nums">
            ${product.compareAtPrice.toFixed(2)}
          </span>
        ) : null}
      </div>

      <div className="flex items-center gap-2 text-xs sm:text-sm">
        {soldOut ? (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-pill bg-surface-subtle border border-border text-ink-secondary font-medium">
            <LineIcon name="alert" size={14} />
            <span>Sold Out — Currently Unavailable</span>
          </span>
        ) : lowStock ? (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-pill bg-accent text-surface border border-accent font-medium tabular-nums">
            <LineIcon name="check" size={14} className="text-surface" />
            <span>Low Stock · Only {product.stockCount} remaining</span>
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-pill bg-surface-subtle border border-border text-ink font-medium tabular-nums">
            <LineIcon name="check" size={14} className="text-ink-secondary" />
            <span>In Stock ({product.stockCount} available)</span>
          </span>
        )}
      </div>

      <p className="text-sm sm:text-base text-ink-secondary leading-relaxed m-0">
        {product.description}
      </p>

      <div className="pt-4 border-t border-border space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          {!soldOut ? (
            <QuantityStepper
              value={quantity}
              min={1}
              max={product.stockCount}
              ariaLabel={`Select quantity for ${product.title}`}
              onChange={setQuantity}
            />
          ) : null}

          <button
            type="button"
            disabled={soldOut}
            onClick={handleAdd}
            className="btn-primary flex-1 min-w-[200px]"
          >
            {soldOut ? (
              <span>Sold Out</span>
            ) : (
              <>
                <LineIcon name="bag" size={16} />
                <span>Add to Cart — ${(product.price * quantity).toFixed(0)}</span>
              </>
            )}
          </button>
        </div>

        {cartCount > 0 ? (
          <div className="flex flex-wrap gap-2.5">
            <button
              type="button"
              onClick={openCartDrawer}
              className="btn-secondary flex-1"
            >
              View Cart ({cartCount})
            </button>
            <Link href="/checkout" className="btn-secondary flex-1">
              Proceed to Checkout
            </Link>
          </div>
        ) : null}
      </div>

      <div className="p-4 rounded-image bg-surface-subtle border border-border text-xs text-ink-secondary space-y-1">
        <p className="font-semibold text-ink m-0 flex items-center gap-1.5">
          <LineIcon name="truck" size={15} className="text-ink-secondary" />
          <span>Shipping Policy</span>
        </p>
        <p className="text-ink-muted m-0">
          Free shipping above $75; flat $8 standard rate otherwise. Items and cart state persist in browser storage.
        </p>
      </div>
    </div>
  );
}
