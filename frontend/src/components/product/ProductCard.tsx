'use client';

import Link from 'next/link';
import type { Product } from '@/types/store';
import { useStore } from '@/context/StoreContext';
import { PillBadge, type BadgeTone } from '@/components/ui/PillBadge';
import { LineIcon } from '@/components/ui/LineIcon';
import { ProductIllustration, getProductStage } from '@/components/ui/ProductIllustration';

interface ProductCardProps {
  product: Product;
  showDescription?: boolean;
}

function getBadgeConfig(product: Product): { label: string; tone: BadgeTone } | null {
  if (product.stockCount === 0) {
    return { label: 'Sold Out', tone: 'soldout' };
  }
  if (product.badge === 'BESTSELLER') {
    return { label: 'Bestseller', tone: 'dark' };
  }
  if (product.badge === 'LIMITED DROP') {
    return { label: 'Limited Drop', tone: 'violet-subtle' };
  }
  if (product.badge === 'NEW ARRIVAL') {
    return { label: 'New Arrival', tone: 'light' };
  }
  return null;
}

export function ProductCard({ product, showDescription = false }: ProductCardProps) {
  const { addToCart } = useStore();
  const stage = getProductStage(product.imageSvgId);
  const badgeConfig = getBadgeConfig(product);
  const soldOut = product.stockCount === 0;
  const lowStock = !soldOut && product.stockCount <= 3;

  return (
    <article className="surface-card hover-lift p-2 flex flex-col justify-between gap-2.5 h-full">
      <div className="space-y-3">
        <Link
          href={`/shop/${product.id}`}
          aria-label={`Inspect ${product.title}`}
          className={`relative block product-stage-inner ${stage.bgClass} p-6 flex items-center justify-center group`}
        >
          {badgeConfig ? (
            <div className="absolute top-3 left-3 z-10">
              <PillBadge label={badgeConfig.label} tone={badgeConfig.tone} />
            </div>
          ) : null}

          <ProductIllustration
            svgId={product.imageSvgId}
            darkBackdrop={stage.darkBackdrop}
            className="w-28 h-28 sm:w-32 sm:h-32 transition-transform duration-200 group-hover:scale-[1.03]"
          />
        </Link>

        <div className="px-2 space-y-1.5">
          <div className="flex items-center justify-between gap-2 text-[11px] text-muted-gray">
            <span className="truncate">{product.category}</span>
            <span className="tabular-nums shrink-0">{product.sku}</span>
          </div>

          <h3 className="text-sm font-medium text-ink-black leading-snug m-0">
            <Link
              href={`/shop/${product.id}`}
              className="hover:underline underline-offset-4 focus-visible:underline"
            >
              {product.title}
            </Link>
          </h3>

          {showDescription ? (
            <p className="text-xs text-muted-gray line-clamp-2 m-0 leading-relaxed">
              {product.description}
            </p>
          ) : null}

          <p className="text-[11px] m-0 flex items-center gap-1.5">
            {soldOut ? (
              <span className="font-medium text-slate-ink inline-flex items-center gap-1">
                <LineIcon name="alert" size={12} />
                <span>Currently unavailable</span>
              </span>
            ) : lowStock ? (
              <span className="font-medium text-slate-ink tabular-nums">
                Low stock ({product.stockCount} left)
              </span>
            ) : (
              <span className="text-muted-gray tabular-nums">
                In stock ({product.stockCount})
              </span>
            )}
          </p>
        </div>
      </div>

      <div className="px-2 pb-1.5 pt-2 flex items-center justify-between gap-2 border-t border-faint-border">
        <div className="flex items-baseline gap-1.5 min-w-0">
          <span className="text-base font-semibold text-ink-black tabular-nums">
            ${product.price}
          </span>
          {product.compareAtPrice ? (
            <span className="text-xs text-muted-gray line-through tabular-nums">
              ${product.compareAtPrice}
            </span>
          ) : null}
        </div>

        <button
          type="button"
          disabled={soldOut}
          onClick={() => addToCart(product, 1)}
          aria-label={soldOut ? `${product.title} is sold out` : `Add ${product.title} to bag`}
          className="min-h-[44px] px-4 py-2 rounded-pill text-xs font-medium tracking-[-0.01em] transition-colors shrink-0 inline-flex items-center gap-1.5 bg-ink-black text-pure-white hover:bg-slate-ink disabled:bg-pure-white disabled:text-slate-ink disabled:border disabled:border-ink-black/30 disabled:cursor-not-allowed"
        >
          {soldOut ? (
            <span>Sold Out</span>
          ) : (
            <>
              <LineIcon name="plus" size={13} />
              <span>Add</span>
            </>
          )}
        </button>
      </div>
    </article>
  );
}
