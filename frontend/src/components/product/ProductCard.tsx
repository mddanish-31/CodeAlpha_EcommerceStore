'use client';

import Link from 'next/link';
import type { Product } from '@/types/store';
import { useStore } from '@/context/StoreContext';
import { getProductMedia } from '@/data/productMedia';
import { ProductMedia } from '@/components/ui/ProductMedia';
import { PillBadge, type BadgeTone } from '@/components/ui/PillBadge';
import { LineIcon } from '@/components/ui/LineIcon';

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
    return { label: 'Limited Drop', tone: 'violet' };
  }
  if (product.badge === 'NEW ARRIVAL') {
    return { label: 'New Arrival', tone: 'light' };
  }
  return null;
}

export function ProductCard({ product, showDescription = false }: ProductCardProps) {
  const { addToCart } = useStore();
  const media = getProductMedia(product);
  const badgeConfig = getBadgeConfig(product);
  const soldOut = product.stockCount === 0;
  const lowStock = !soldOut && product.stockCount <= 3;

  return (
    <article className="surface-card card-hover-lift overflow-hidden flex flex-col justify-between h-full">
      <div>
        <Link
          href={`/shop/${product.id}`}
          aria-label={`View ${product.title}`}
          className="relative block aspect-square bg-surface-subtle overflow-hidden group"
        >
          {badgeConfig ? (
            <div className="absolute top-3 left-3 z-10">
              <PillBadge label={badgeConfig.label} tone={badgeConfig.tone} />
            </div>
          ) : null}

          <ProductMedia
            src={media.src}
            alt={media.alt}
            width={media.width}
            height={media.height}
            sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw"
            imgClassName="transition-transform duration-300 group-hover:scale-[1.03]"
            fallbackLabel={product.title}
          />
        </Link>

        <div className="p-4 sm:p-5 space-y-2">
          <div className="flex items-center justify-between gap-2 text-xs text-muted">
            <span className="font-medium text-brand-dark truncate">{product.category}</span>
            <span className="tabular-nums shrink-0">{product.sku}</span>
          </div>

          <h3 className="text-base font-semibold text-ink leading-snug m-0">
            <Link
              href={`/shop/${product.id}`}
              className="hover:text-brand-violet transition-colors focus-visible:underline"
            >
              {product.title}
            </Link>
          </h3>

          <p className="text-xs sm:text-sm text-muted line-clamp-2 m-0 leading-relaxed">
            {showDescription ? product.description : product.shortDescription}
          </p>

          <p className="text-xs m-0 pt-0.5 flex items-center gap-1.5">
            {soldOut ? (
              <span className="font-medium text-ink-secondary inline-flex items-center gap-1">
                <LineIcon name="alert" size={13} className="text-muted" />
                <span>Out of stock</span>
              </span>
            ) : lowStock ? (
              <span className="font-medium text-brand-dark tabular-nums">
                Low stock · {product.stockCount} left
              </span>
            ) : (
              <span className="text-muted tabular-nums">
                In stock ({product.stockCount})
              </span>
            )}
          </p>
        </div>
      </div>

      <div className="px-4 sm:px-5 pb-4 pt-3 flex items-center justify-between gap-2 border-t border-border-default">
        <div className="flex items-baseline gap-1.5 min-w-0">
          <span className="text-lg font-bold text-ink tabular-nums">
            ${product.price}
          </span>
          {product.compareAtPrice ? (
            <span className="text-xs text-muted line-through tabular-nums">
              ${product.compareAtPrice}
            </span>
          ) : null}
        </div>

        <button
          type="button"
          disabled={soldOut}
          onClick={() => addToCart(product, 1)}
          aria-label={soldOut ? `${product.title} is sold out` : `Add ${product.title} to cart`}
          className="min-h-[44px] px-3.5 py-2 rounded-control text-xs font-semibold transition-colors shrink-0 inline-flex items-center gap-1.5 bg-brand-violet text-surface hover:bg-brand-dark disabled:bg-surface-subtle disabled:text-muted disabled:border disabled:border-border-default disabled:cursor-not-allowed"
        >
          {soldOut ? (
            <span>Sold Out</span>
          ) : (
            <>
              <LineIcon name="plus" size={13} />
              <span>Add to Cart</span>
            </>
          )}
        </button>
      </div>
    </article>
  );
}
