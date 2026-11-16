'use client';

import { useStore } from '@/context/StoreContext';
import { LineIcon } from '@/components/ui/LineIcon';

interface FreeShippingBarProps {
  subtotal?: number;
  threshold?: number;
}

export function FreeShippingBar({
  subtotal: propSubtotal,
  threshold: propThreshold,
}: FreeShippingBarProps) {
  const { subtotal: storeSubtotal, freeShippingThreshold } = useStore();
  const subtotal = propSubtotal ?? storeSubtotal;
  const threshold = propThreshold ?? freeShippingThreshold;

  const unlocked = subtotal >= threshold;
  const remaining = Math.max(0, threshold - subtotal);
  const pct = Math.min(100, Math.round((subtotal / threshold) * 100));

  return (
    <div className="p-3.5 rounded-image bg-background border border-border space-y-2">
      <div className="flex items-center justify-between gap-2 text-xs">
        <span className="inline-flex items-center gap-1.5 font-medium text-ink">
          {unlocked ? (
            <LineIcon name="check" size={14} className="text-accent shrink-0" />
          ) : (
            <LineIcon name="truck" size={14} className="text-ink-muted shrink-0" />
          )}
          <span>
            {unlocked
              ? `Free shipping unlocked ($${threshold}+ threshold met)`
              : `Add $${remaining.toFixed(0)} more for free shipping`}
          </span>
        </span>
        <span className="font-medium text-ink-muted tabular-nums shrink-0">
          {pct}%
        </span>
      </div>
      <div
        className="w-full h-2 rounded-pill bg-surface border border-border overflow-hidden"
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Free shipping threshold progress"
      >
        <div
          className="h-full rounded-pill bg-accent transition-all duration-200"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
