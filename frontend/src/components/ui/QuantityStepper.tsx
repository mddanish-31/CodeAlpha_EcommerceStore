'use client';

import React from 'react';
import { LineIcon } from './LineIcon';

export function QuantityStepper({
  value,
  min = 1,
  max = 10,
  onChange,
  ariaLabel = 'Quantity',
}: {
  value: number;
  min?: number;
  max?: number;
  onChange: (nextQty: number) => void;
  ariaLabel?: string;
}) {
  return (
    <div
      className="inline-flex items-center rounded-pill bg-charred-clove border border-tiger-gold overflow-hidden"
      role="group"
      aria-label={ariaLabel}
    >
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label="Decrease quantity"
        className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center text-tiger-gold hover:bg-tiger-gold hover:text-charred-clove disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-tiger-gold transition-colors cursor-pointer"
      >
        <LineIcon name="minus" size={15} />
      </button>
      <span
        className="min-w-[38px] text-center font-bold text-sm text-parchment-cream tabular-nums px-2"
        aria-live="polite"
      >
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label="Increase quantity"
        className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center text-tiger-gold hover:bg-tiger-gold hover:text-charred-clove disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-tiger-gold transition-colors cursor-pointer"
      >
        <LineIcon name="plus" size={15} />
      </button>
    </div>
  );
}
