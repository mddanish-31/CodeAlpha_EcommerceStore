'use client';

import React from 'react';
import Link from 'next/link';
import { Product } from '@/types/store';
import { useStore } from '@/context/StoreContext';
import { PillBadge } from '@/components/ui/PillBadge';
import { ProductIllustration } from '@/components/ui/ProductIllustration';

export function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useStore();
  const isOutOfStock = product.stockCount <= 0;
  const isLowStock = product.stockCount > 0 && product.stockCount <= 3;
  const discountPct =
    product.compareAtPrice && product.compareAtPrice > product.price
      ? Math.round(
          ((product.compareAtPrice - product.price) / product.compareAtPrice) * 100
        )
      : null;

  return (
    <article className="surface-card-interactive p-3.5 flex flex-col justify-between h-full">
      <div>
        <Link
          href={`/shop/${product.id}`}
          aria-label={`View ${product.title} details`}
          className="block rounded-[4px] bg-charred-clove border border-cardamom-brown aspect-[4/3.2] relative flex items-center justify-center p-4 mb-3.5 overflow-hidden group"
          style={{
            backgroundImage:
              'radial-gradient(circle at 50% 50%, rgba(250, 174, 51, 0.14) 0%, transparent 70%)',
          }}
        >
          <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-1.5 pointer-events-none">
            <span>
              {product.badge && (
                <PillBadge
                  tone={product.badge === 'LIMITED DROP' ? 'alert' : 'gold'}
                >
                  {product.badge}
                </PillBadge>
              )}
            </span>
            <span>
              {isOutOfStock ? (
                <PillBadge tone="spice">SOLD OUT</PillBadge>
              ) : isLowStock ? (
                <PillBadge tone="alert">ONLY {product.stockCount} LEFT</PillBadge>
              ) : discountPct ? (
                <PillBadge tone="alert">-{discountPct}% SALE</PillBadge>
              ) : null}
            </span>
          </div>

          <div className="transition-transform duration-200 group-hover:scale-105">
            <ProductIllustration
              svgId={product.imageSvgId}
              className="w-32 h-28"
            />
          </div>
        </Link>

        <div className="text-[11px] uppercase tracking-wider text-warm-sand mb-1">
          {product.category} •{' '}
          {isOutOfStock
            ? 'Out of Stock'
            : `In Stock (${product.stockCount})`}
        </div>

        <h3 className="heading-card">
          <Link
            href={`/shop/${product.id}`}
            className="text-parchment-cream hover:text-tiger-gold transition-colors no-underline"
          >
            {product.title}
          </Link>
        </h3>

        <p className="text-xs text-warm-sand mt-1.5 mb-3.5 leading-relaxed">
          {product.shortDescription}
        </p>
      </div>

      <div className="flex items-center justify-between gap-2.5 pt-3 border-t border-dotted border-tiger-gold/50 mt-auto">
        <div className="tabular-nums">
          <span className="text-lg font-bold text-tiger-gold">
            ${product.price.toFixed(2)}
          </span>
          {product.compareAtPrice && (
            <span className="text-xs text-warm-sand line-through ml-1.5">
              ${product.compareAtPrice.toFixed(2)}
            </span>
          )}
        </div>

        <button
          type="button"
          disabled={isOutOfStock}
          onClick={() => addToCart(product, 1, true)}
          className="btn btn-primary px-4 py-2 text-xs"
        >
          {isOutOfStock ? 'Sold Out' : 'Add to Cart'}
        </button>
      </div>
    </article>
  );
}
