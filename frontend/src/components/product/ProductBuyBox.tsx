'use client';

import React, { useState } from 'react';
import { Product } from '@/types/store';
import { useStore } from '@/context/StoreContext';
import { PillBadge } from '@/components/ui/PillBadge';
import { QuantityStepper } from '@/components/ui/QuantityStepper';
import { ProductSpecsAccordion } from './ProductSpecsAccordion';

export function ProductBuyBox({ product }: { product: Product }) {
  const { addToCart } = useStore();
  const [quantity, setQuantity] = useState(1);

  const isOutOfStock = product.stockCount <= 0;
  const isLowStock = product.stockCount > 0 && product.stockCount <= 3;
  const discountPct =
    product.compareAtPrice && product.compareAtPrice > product.price
      ? Math.round(
          ((product.compareAtPrice - product.price) / product.compareAtPrice) * 100
        )
      : null;

  return (
    <div className="surface-card p-6 sm:p-7">
      <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
        <PillBadge tone="spice">
          {product.category} • SKU {product.sku}
        </PillBadge>
        {isOutOfStock ? (
          <PillBadge tone="alert">● OUT OF STOCK</PillBadge>
        ) : isLowStock ? (
          <PillBadge tone="alert">
            ● LOW STOCK (ONLY {product.stockCount} LEFT)
          </PillBadge>
        ) : (
          <PillBadge tone="gold">
            ● IN STOCK ({product.stockCount} AVAILABLE)
          </PillBadge>
        )}
      </div>

      <h1 className="heading-section text-parchment-cream">
        {product.title}
      </h1>

      <div className="flex items-baseline flex-wrap gap-3 my-4 tabular-nums">
        <span className="font-display text-3xl font-bold text-tiger-gold">
          ${product.price.toFixed(2)}
        </span>
        {product.compareAtPrice && (
          <span className="text-sm text-warm-sand line-through">
            ${product.compareAtPrice.toFixed(2)}
          </span>
        )}
        {discountPct && <PillBadge tone="alert">-{discountPct}% OFF</PillBadge>}
      </div>

      <p className="text-sm sm:text-[15px] text-parchment-cream leading-relaxed max-w-prose">
        {product.description}
      </p>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 my-6">
        {!isOutOfStock && (
          <QuantityStepper
            value={quantity}
            min={1}
            max={product.stockCount}
            onChange={setQuantity}
            ariaLabel={`Select quantity for ${product.title}`}
          />
        )}

        <button
          type="button"
          disabled={isOutOfStock}
          onClick={() => addToCart(product, quantity, true)}
          className="btn btn-primary flex-1 tabular-nums"
        >
          {isOutOfStock
            ? 'Currently Sold Out'
            : `Add to Cart — $${(product.price * quantity).toFixed(2)}`}
        </button>
      </div>

      <ProductSpecsAccordion product={product} />
    </div>
  );
}
