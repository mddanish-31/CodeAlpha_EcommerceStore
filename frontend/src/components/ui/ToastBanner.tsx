'use client';

import { useStore } from '@/context/StoreContext';
import { LineIcon } from './LineIcon';

export function ToastBanner() {
  const { toastMessage, dismissToast } = useStore();

  if (!toastMessage) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 max-w-sm w-[calc(100vw-2rem)] bg-ink text-surface border border-ink-secondary rounded-image shadow-drawer px-4 py-3 flex items-center justify-between gap-3"
    >
      <div className="flex items-center gap-2.5 min-w-0">
        <span className="w-7 h-7 rounded-pill bg-brand-violet text-surface flex items-center justify-center shrink-0">
          <LineIcon name="check" size={14} />
        </span>
        <p className="text-xs sm:text-sm font-medium leading-snug text-surface truncate m-0">
          {toastMessage}
        </p>
      </div>
      <button
        type="button"
        onClick={dismissToast}
        aria-label="Dismiss notification"
        className="min-w-[36px] min-h-[36px] inline-flex items-center justify-center rounded-lg text-muted hover:text-surface hover:bg-ink-secondary shrink-0 transition-colors"
      >
        <LineIcon name="close" size={14} />
      </button>
    </div>
  );
}
