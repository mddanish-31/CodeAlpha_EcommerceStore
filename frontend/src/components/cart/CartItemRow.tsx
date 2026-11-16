'use client';

import Link from 'next/link';
import type { CartItem } from '@/types/store';
import { useStore } from '@/context/StoreContext';
import { getProductMedia } from '@/data/productMedia';
import { ProductMedia } from '@/components/ui/ProductMedia';
import { QuantityStepper } from '@/components/ui/QuantityStepper';
import { LineIcon } from '@/components/ui/LineIcon';

interface CartItemRowProps {
  item: CartItem;
  compact?: boolean;
  onNavigate?: () => void;
}

export function CartItemRow({ item, compact = false, onNavigate }: CartItemRowProps) {
  const { updateQuantity, removeFromCart } = useStore();
  const { product, quantity } = item;
  const media = getProductMedia(product);
  const lineTotal = product.price * quantity;

  return (
    <div
      className={`rounded-card bg-surface border border-border flex ${
        compact
          ? 'items-center gap-3 p-3'
          : 'flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-5'
      }`}
    >
      <div className="flex items-center gap-3.5 min-w-0 flex-1">
        <Link
          href={`/shop/${product.id}`}
          onClick={onNavigate}
          aria-label={`View ${product.title}`}
          className={`shrink-0 overflow-hidden bg-surface-subtle border border-border block transition-opacity hover:opacity-90 ${
            compact ? 'w-16 h-16 rounded-control' : 'w-20 h-20 rounded-image'
          }`}
        >
          <ProductMedia
            src={media.src}
            alt={media.alt}
            width={160}
            height={160}
            fallbackLabel={product.sku}
          />
        </Link>

        <div className="min-w-0 flex-1 space-y-0.5">
          <p className="text-[11px] font-medium uppercase tracking-wider text-ink-muted truncate m-0">
            {product.category}
          </p>
          <Link
            href={`/shop/${product.id}`}
            onClick={onNavigate}
            className="block text-sm font-semibold text-ink hover:text-accent hover:underline underline-offset-4 truncate transition-colors"
          >
            {product.title}
          </Link>
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-0.5 text-xs text-ink-muted tabular-nums">
            <span>${product.price.toFixed(0)} each</span>
            <span aria-hidden="true">·</span>
            <span>SKU {product.sku}</span>
          </div>
        </div>
      </div>

      <div
        className={`flex items-center ${
          compact
            ? 'gap-2 shrink-0'
            : 'justify-between sm:justify-end gap-4 pt-3 sm:pt-0 border-t sm:border-t-0 border-border'
        }`}
      >
        <QuantityStepper
          compact={compact}
          value={quantity}
          min={1}
          max={Math.max(1, product.stockCount)}
          ariaLabel={`Quantity for ${product.title}`}
          onChange={(nextQty) => updateQuantity(product.id, nextQty)}
        />

        <div className="flex items-center gap-2 shrink-0">
          {!compact ? (
            <span className="min-w-[4.5rem] text-right text-base font-semibold text-ink tabular-nums">
              ${lineTotal.toFixed(2)}
            </span>
          ) : null}
          <button
            type="button"
            onClick={() => removeFromCart(product.id)}
            aria-label={`Remove ${product.title} from cart`}
            className="min-w-[40px] min-h-[40px] inline-flex items-center justify-center rounded-control border border-border text-ink-muted hover:text-ink hover:border-ink-secondary hover:bg-background transition-colors"
          >
            <LineIcon name="trash" size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
