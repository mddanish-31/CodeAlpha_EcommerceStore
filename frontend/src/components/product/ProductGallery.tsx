'use client';

import React, { useState } from 'react';
import { Product } from '@/types/store';
import { PillBadge } from '@/components/ui/PillBadge';
import { ProductIllustration } from '@/components/ui/ProductIllustration';

const GALLERY_ANGLES = [
  { id: 'front', label: '01 // FRONT' },
  { id: 'detail', label: '02 // DETAIL' },
  { id: 'finish', label: '03 // FINISH' },
  { id: 'scale', label: '04 // SCALE' },
];

export function ProductGallery({ product }: { product: Product }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const discountPct =
    product.compareAtPrice && product.compareAtPrice > product.price
      ? Math.round(
          ((product.compareAtPrice - product.price) / product.compareAtPrice) * 100
        )
      : null;

  return (
    <div>
      <div
        className="rounded-card bg-charred-clove border border-cardamom-brown aspect-[4/3.2] flex items-center justify-center relative p-8"
        style={{
          backgroundImage:
            'radial-gradient(circle at 50% 45%, rgba(250, 174, 51, 0.16) 0%, transparent 68%)',
        }}
      >
        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2">
          <PillBadge tone="gold">
            STUDIO VIEW 0{activeIndex + 1} / 04
          </PillBadge>
          {discountPct && (
            <PillBadge tone="alert">
              SAVE ${(product.compareAtPrice! - product.price).toFixed(2)} (-
              {discountPct}%)
            </PillBadge>
          )}
        </div>

        <div
          className="transition-transform duration-200"
          style={{
            transform:
              activeIndex === 1
                ? 'scale(1.12)'
                : activeIndex === 2
                ? 'rotate(-4deg) scale(1.05)'
                : activeIndex === 3
                ? 'scale(0.92)'
                : 'scale(1)',
          }}
        >
          <ProductIllustration
            svgId={product.imageSvgId}
            className="w-56 h-48 sm:w-64 sm:h-56"
          />
        </div>
      </div>

      <div
        role="group"
        aria-label="Product Gallery Views"
        className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3"
      >
        {GALLERY_ANGLES.map((angle, idx) => {
          const isCurrent = idx === activeIndex;
          return (
            <button
              key={angle.id}
              type="button"
              aria-current={isCurrent ? 'true' : undefined}
              onClick={() => setActiveIndex(idx)}
              className={`rounded-card p-3 min-h-[48px] text-xs font-semibold uppercase tracking-wider border transition-colors cursor-pointer ${
                isCurrent
                  ? 'bg-charred-clove border-tiger-gold text-tiger-gold'
                  : 'bg-dark-spice border-cardamom-brown text-warm-sand hover:border-tiger-gold hover:text-tiger-gold'
              }`}
            >
              {angle.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
