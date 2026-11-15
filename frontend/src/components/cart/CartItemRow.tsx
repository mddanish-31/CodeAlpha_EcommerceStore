'use client';

import Link from 'next/link';
import type { CartItem } from '@/types/store';
import { useStore } from '@/context/StoreContext';
import { QuantityStepper } from '@/components/ui/QuantityStepper';
import { LineIcon } from '@/components/ui/LineIcon';
import { ProductIllustration, getProductStage } from '@/components/ui/ProductIllustration';

interface CartItemRowProps {
  item: CartItem;
  compact?: boolean;
  onNavigate?: () => void;
}

export function CartItemRow({ item, compact = false, onNavigate }: CartItemRowProps) {
  const { updateQuantity, removeFromCart } = useStore();
  const { product, quantity } = item;
  const stage = getProductStage(product.imageSvgId);
  const lineTotal = product.price * quantity;

  return (
    <div
      className={`rounded-image bg-pure-white border border-faint-border flex ${
        compact ? 'items-center gap-3 p-3' : 'flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-5'
      }`}
    >
      <div className="flex items-center gap-3.5 min-w-0 flex-1">
        <Link
          href={`/shop/${product.id}`}
          onClick={onNavigate}
          aria-label={`View ${product.title}`}
          className={`shrink-0 ${
            compact ? 'w-14 h-14 rounded-tile p-2' : 'w-20 h-20 rounded-image p-2.5'
          } ${stage.bgClass} flex items-center justify-center transition-opacity hover:opacity-90`}
        >
          <ProductIllustration
            svgId={product.imageSvgId}
            darkBackdrop={stage.darkBackdrop}
            className="w-full h-full"
          />
        </Link>

        <div className="min-w-0 flex-1 space-y-0.5">
          <p className="text-[11px] font-medium uppercase tracking-wide text-muted-gray truncate m-0">
            {product.category}
          </p>
          <Link
            href={`/shop/${product.id}`}
            onClick={onNavigate}
            className="block text-sm font-medium text-ink-black hover:underline underline-offset-4 truncate"
          >
            {product.title}
          </Link>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-muted-gray tabular-nums">
            <span>${product.price.toFixed(0)} each</span>
            <span aria-hidden="true">·</span>
            <span>SKU {product.sku}</span>
          </div>
        </div>
      </div>

      <div
        className={`flex items-center ${
          compact ? 'gap-2 shrink-0' : 'justify-between sm:justify-end gap-4 pt-2 sm:pt-0 border-t sm:border-t-0 border-faint-border'
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
            <span className="min-w-[4.5rem] text-right text-base font-semibold text-ink-black tabular-nums">
              ${lineTotal.toFixed(2)}
            </span>
          ) : null}
          <button
            type="button"
            onClick={() => removeFromCart(product.id)}
            aria-label={`Remove ${product.title} from bag`}
            className="min-w-[40px] min-h-[40px] inline-flex items-center justify-center rounded-pill border border-faint-border text-muted-gray hover:text-ink-black hover:border-ink-black hover:bg-canvas-mist transition-colors"
          >
            <LineIcon name="trash" size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
