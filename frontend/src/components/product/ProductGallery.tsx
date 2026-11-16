'use client';

import { useState } from 'react';
import type { Product } from '@/types/store';
import { getProductMedia } from '@/data/productMedia';
import { ProductMedia } from '@/components/ui/ProductMedia';
import { PillBadge } from '@/components/ui/PillBadge';

type GalleryView = 'studio' | 'detail' | 'angled';

const GALLERY_VIEWS: Array<{
  key: GalleryView;
  label: string;
  caption: string;
  imgTransform: string;
}> = [
  {
    key: 'studio',
    label: 'Full Studio',
    caption: 'Primary Studio Perspective',
    imgTransform: 'scale-100',
  },
  {
    key: 'detail',
    label: 'Close-Up',
    caption: 'Material & Finish Detail',
    imgTransform: 'scale-[1.22]',
  },
  {
    key: 'angled',
    label: 'Alternate Crop',
    caption: 'Secondary Hardware Frame',
    imgTransform: 'scale-110 -translate-y-2',
  },
];

export function ProductGallery({ product }: { product: Product }) {
  const media = getProductMedia(product);
  const [view, setView] = useState<GalleryView>('studio');
  const activeView = GALLERY_VIEWS.find((v) => v.key === view) ?? GALLERY_VIEWS[0];

  const badgeLabel =
    product.stockCount === 0
      ? 'Sold Out'
      : product.badge === 'BESTSELLER'
      ? 'Bestseller'
      : product.badge === 'LIMITED DROP'
      ? 'Limited Drop'
      : product.badge === 'NEW ARRIVAL'
      ? 'New Arrival'
      : null;

  return (
    <div className="space-y-3">
      <div className="surface-card p-2 sm:p-3">
        <div
          className="relative aspect-square rounded-image bg-surface-subtle overflow-hidden"
          aria-live="polite"
        >
          {badgeLabel ? (
            <div className="absolute top-3.5 left-3.5 z-10">
              <PillBadge
                label={badgeLabel}
                tone={
                  product.stockCount === 0
                    ? 'soldout'
                    : product.badge === 'LIMITED DROP'
                    ? 'violet'
                    : 'dark'
                }
              />
            </div>
          ) : null}

          <ProductMedia
            src={media.src}
            alt={media.alt}
            width={media.width}
            height={media.height}
            priority
            sizes="(max-width: 1023px) 100vw, 55vw"
            imgClassName={`transition-transform duration-300 ${activeView.imgTransform}`}
            fallbackLabel={product.title}
          />

          <span className="absolute bottom-3 left-3 px-3 py-1 rounded-pill bg-surface/95 text-ink border border-border-default text-xs font-medium shadow-card-subtle">
            {activeView.caption}
          </span>
        </div>
      </div>

      <div
        className="grid grid-cols-3 gap-2.5"
        role="group"
        aria-label={`Studio perspectives for ${product.title}`}
      >
        {GALLERY_VIEWS.map((item) => {
          const active = view === item.key;
          return (
            <button
              key={item.key}
              type="button"
              aria-pressed={active}
              onClick={() => setView(item.key)}
              className={`flex items-center gap-2.5 p-2 rounded-control bg-surface border text-left transition-colors ${
                active
                  ? 'border-brand-violet ring-2 ring-violet-border'
                  : 'border-border-default hover:border-ink-secondary/40'
              }`}
            >
              <span className="w-11 h-11 rounded-lg bg-surface-subtle overflow-hidden shrink-0">
                <ProductMedia
                  src={media.src}
                  alt=""
                  width={120}
                  height={120}
                  imgClassName={item.imgTransform}
                />
              </span>
              <span className="text-xs font-medium text-ink truncate">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
