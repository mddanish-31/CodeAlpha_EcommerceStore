'use client';

import React from 'react';
import { useStore } from '@/context/StoreContext';

export function FreeShippingBar() {
  const { subtotal, freeShippingThreshold } = useStore();
  const remaining = Math.max(0, freeShippingThreshold - subtotal);
  const progressPct = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  return (
    <div className="my-3.5">
      <div className="flex items-center justify-between text-xs text-warm-sand mb-1.5">
        <span>
          {remaining === 0
            ? 'Unlocked: Free Standard Shipping ($75+)'
            : `Add $${remaining.toFixed(2)} more for FREE Standard Shipping`}
        </span>
        <strong className="text-tiger-gold tabular-nums">{progressPct}%</strong>
      </div>
      <div className="w-full h-2 bg-dark-spice rounded-pill overflow-hidden border border-cardamom-brown">
        <div
          className="h-full bg-tiger-gold rounded-pill transition-all duration-200"
          style={{ width: `${progressPct}%` }}
        />
      </div>
    </div>
  );
}
