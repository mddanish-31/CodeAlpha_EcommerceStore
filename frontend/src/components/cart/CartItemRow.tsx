'use client';

import React from 'react';
import Link from 'next/link';
import { CartItem } from '@/types/store';
import { useStore } from '@/context/StoreContext';
import { ProductIllustration } from '@/components/ui/ProductIllustration';
import { QuantityStepper } from '@/components/ui/QuantityStepper';

export function CartItemRow({
  item,
  compact = false,
}: {
  item: CartItem;
  compact?: boolean;
}) {
  const { updateQuantity, removeFromCart, closeCartDrawer } = useStore();
  const { product, quantity } = item;
  const lineSubtotal = product.price * quantity;

  return (
    <div className="surface-card p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3.5">
      <div className="flex items-center gap-3.5 w-full sm:w-auto">
        <Link
          href={`/shop/${product.id}`}
          onClick={closeCartDrawer}
          className="w-16 h-16 rounded-[4px] bg-charred-clove border border-cardamom-brown flex items-center justify-center p-2 shrink-0"
        >
          <ProductIllustration svgId={product.imageSvgId} className="w-12 h-12" />
        </Link>

        <div className="min-w-0 flex-1">
          <div className="text-[11px] uppercase tracking-wider text-warm-sand">
            {product.category}
          </div>
          <Link
            href={`/shop/${product.id}`}
            onClick={closeCartDrawer}
            className="font-semibold text-sm text-parchment-cream hover:text-tiger-gold transition-colors block truncate"
          >
            {product.title}
          </Link>
          <div className="text-xs text-warm-sand mt-0.5 tabular-nums">
            Unit: ${product.price.toFixed(2)}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-dotted border-tiger-gold/30">
        <QuantityStepper
          value={quantity}
          min={1}
          max={product.stockCount || 10}
          onChange={(next) => updateQuantity(product.id, next)}
          ariaLabel={`Quantity for ${product.title}`}
        />

        <div className="text-right min-w-[78px]">
          <div className="font-bold text-base text-tiger-gold tabular-nums">
            ${lineSubtotal.toFixed(2)}
          </div>
          <button
            type="button"
            onClick={() => removeFromCart(product.id)}
            aria-label={`Remove ${product.title} from cart`}
            className="text-xs text-tiger-gold underline decoration-dotted underline-offset-4 hover:text-parchment-cream cursor-pointer py-1"
          >
            {compact ? 'Remove' : 'Remove Item'}
          </button>
        </div>
      </div>
    </div>
  );
}
