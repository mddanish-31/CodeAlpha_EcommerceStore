'use client';

import { LineIcon } from './LineIcon';

interface QuantityStepperProps {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
  ariaLabel?: string;
  compact?: boolean;
}

export function QuantityStepper({
  value,
  min = 1,
  max = 99,
  onChange,
  ariaLabel = 'Quantity',
  compact = false,
}: QuantityStepperProps) {
  const canDecrease = value > min;
  const canIncrease = value < max;

  const btnSize = compact ? 'min-w-[40px] min-h-[40px]' : 'min-w-[44px] min-h-[44px]';

  return (
    <div
      className="inline-flex items-center rounded-control bg-surface border border-border p-0.5"
      role="group"
      aria-label={ariaLabel}
    >
      <button
        type="button"
        onClick={() => canDecrease && onChange(value - 1)}
        disabled={!canDecrease}
        aria-label="Decrease quantity"
        className={`${btnSize} inline-flex items-center justify-center rounded-lg text-ink hover:bg-surface-subtle disabled:opacity-35 disabled:cursor-not-allowed transition-colors`}
      >
        <LineIcon name="minus" size={14} />
      </button>
      <span
        className="min-w-[2.25rem] px-1 text-center text-sm font-medium text-ink tabular-nums select-none"
        aria-live="polite"
      >
        {value}
      </span>
      <button
        type="button"
        onClick={() => canIncrease && onChange(value + 1)}
        disabled={!canIncrease}
        aria-label="Increase quantity"
        className={`${btnSize} inline-flex items-center justify-center rounded-lg text-ink hover:bg-surface-subtle disabled:opacity-35 disabled:cursor-not-allowed transition-colors`}
      >
        <LineIcon name="plus" size={14} />
      </button>
    </div>
  );
}
