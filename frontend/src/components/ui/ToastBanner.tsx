'use client';

import React from 'react';
import { useStore } from '@/context/StoreContext';
import { LineIcon } from './LineIcon';

export function ToastBanner() {
  const { toastMessage, dismissToast } = useStore();

  if (!toastMessage) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-5 right-5 z-50 max-w-sm bg-charred-clove border border-tiger-gold rounded-card px-4 py-3 flex items-center gap-3 text-parchment-cream"
    >
      <span className="text-tiger-gold">
        <LineIcon name="check" size={18} />
      </span>
      <span className="text-xs font-medium flex-1">{toastMessage}</span>
      <button
        type="button"
        onClick={dismissToast}
        aria-label="Dismiss notification"
        className="text-warm-sand hover:text-tiger-gold p-1 cursor-pointer"
      >
        <LineIcon name="close" size={15} />
      </button>
    </div>
  );
}
