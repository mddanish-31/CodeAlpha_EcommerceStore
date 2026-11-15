'use client';

import { useState } from 'react';
import type { Product } from '@/types/store';
import { PillBadge } from '@/components/ui/PillBadge';
import { ProductIllustration, getProductStage } from '@/components/ui/ProductIllustration';

type StudioAngle = 'front' | 'detail' | 'darkroom';

const STUDIO_ANGLES: Array<{
  key: StudioAngle;
  label: string;
  caption: string;
}> = [
  { key: 'front', label: 'Front', caption: 'Front Studio Elevation' },
  { key: 'detail', label: 'Profile', caption: 'Secondary Finish View' },
  { key: 'darkroom', label: 'Darkroom', caption: 'High-Contrast Studio Stage' },
];

export function ProductGallery({ product }: { product: Product }) {
  const defaultStage = getProductStage(product.imageSvgId);
  const [angle, setAngle] = useState<StudioAngle>('front');

  const isDarkStage =
    angle === 'darkroom'
      ? true
      : angle === 'detail'
      ? false
      : defaultStage.darkBackdrop;

  const stageBgClass =
    angle === 'darkroom'
      ? 'bg-slate-ink'
      : angle === 'detail'
      ? 'bg-pure-white border border-faint-border'
      : defaultStage.bgClass;

  const currentCaption =
    STUDIO_ANGLES.find((a) => a.key === angle)?.caption ?? 'Front Studio Elevation';

  const badgeLabel =
    product.stockCount === 0
      ? 'Sold Out'
      : product.badge ?? null;

  return (
    <div className="space-y-3">
      <div className="surface-card p-2">
        <div
          className={`relative product-stage-inner ${stageBgClass} p-8 sm:p-12 flex items-center justify-center`}
        >
          {badgeLabel ? (
            <div className="absolute top-4 left-4 z-10">
              <PillBadge
                label={badgeLabel}
                tone={product.stockCount === 0 ? 'soldout' : 'light'}
              />
            </div>
          ) : null}

          <div className="transition-transform duration-200 flex items-center justify-center w-full h-full">
            <ProductIllustration
              svgId={product.imageSvgId}
              darkBackdrop={isDarkStage}
              className={`w-48 h-48 sm:w-64 sm:h-64 ${
                angle === 'detail' ? 'scale-110 -rotate-3' : ''
              }`}
            />
          </div>

          <span className="absolute bottom-3 left-3 px-3 py-1 rounded-tile bg-pure-white/95 text-ink-black border border-faint-border text-xs font-medium shadow-sm-soft">
            {currentCaption}
          </span>
        </div>
      </div>

      <div
        className="flex flex-wrap items-center gap-2.5"
        role="group"
        aria-label={`Studio perspectives for ${product.title}`}
      >
        {STUDIO_ANGLES.map((item) => {
          const active = angle === item.key;
          const swatchDark =
            item.key === 'darkroom'
              ? true
              : item.key === 'detail'
              ? false
              : defaultStage.darkBackdrop;
          const swatchBg =
            item.key === 'darkroom'
              ? 'bg-slate-ink'
              : item.key === 'detail'
              ? 'bg-canvas-mist'
              : defaultStage.bgClass;

          return (
            <button
              key={item.key}
              type="button"
              aria-pressed={active}
              onClick={() => setAngle(item.key)}
              className={`inline-flex items-center gap-2.5 p-1.5 pr-3.5 rounded-[16px] bg-pure-white border transition-colors ${
                active
                  ? 'border-shop-violet ring-2 ring-violet-wash/70'
                  : 'border-faint-border hover:border-ink-black/40'
              }`}
            >
              <span
                className={`w-10 h-10 rounded-tile ${swatchBg} flex items-center justify-center p-1.5 shrink-0`}
              >
                <ProductIllustration
                  svgId={product.imageSvgId}
                  darkBackdrop={swatchDark}
                  className="w-full h-full"
                />
              </span>
              <span className="text-xs font-medium text-ink-black">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
