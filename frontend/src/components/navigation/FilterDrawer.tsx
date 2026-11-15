'use client';

import { useEffect, useRef } from 'react';
import { DEPARTMENTS } from '@/data/products';
import { LineIcon } from '@/components/ui/LineIcon';

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'newest';

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeCategory: string;
  onCategoryChange: (cat: string) => void;
  inStockOnly: boolean;
  onInStockChange: (val: boolean) => void;
  sortBy: SortOption;
  onSortChange: (val: SortOption) => void;
  onReset: () => void;
  resultCount: number;
}

export function FilterDrawer({
  isOpen,
  onClose,
  activeCategory,
  onCategoryChange,
  inStockOnly,
  onInStockChange,
  sortBy,
  onSortChange,
  onReset,
  resultCount,
}: FilterDrawerProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    const dialog = dialogRef.current;
    if (!dialog || ('closedBy' in HTMLDialogElement.prototype)) return;
    if (e.target !== dialog) return;
    if (e.clientX === 0 && e.clientY === 0) return;

    const rect = dialog.getBoundingClientRect();
    const isInside =
      rect.top <= e.clientY &&
      e.clientY <= rect.top + rect.height &&
      rect.left <= e.clientX &&
      e.clientX <= rect.left + rect.width;

    if (!isInside) {
      dialog.close();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      id="filter-drawer-dialog"
      closedby="any"
      aria-labelledby="filter-drawer-title"
      onClose={onClose}
      onClick={handleBackdropClick}
      className="drawer-dialog"
    >
      <div className="flex flex-col h-full bg-pure-white text-ink-black">
        <div className="flex items-center justify-between px-5 py-4 border-b border-faint-border">
          <div>
            <h2 id="filter-drawer-title" className="text-lg font-semibold tracking-[-0.04em]">
              Filter &amp; Sort
            </h2>
            <p className="text-xs text-muted-gray tabular-nums">
              {resultCount} matching object{resultCount === 1 ? '' : 's'}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close filters"
            className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-pill bg-canvas-mist border border-faint-border text-ink-black hover:border-ink-black transition-colors"
          >
            <LineIcon name="close" size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          <fieldset className="space-y-3 border-0 p-0 m-0">
            <legend className="text-xs font-medium uppercase tracking-wide text-muted-gray mb-2">
              Department
            </legend>
            <div className="flex flex-wrap gap-2">
              {['All', ...DEPARTMENTS.map((d) => d.name)].map((cat) => {
                const selected = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => onCategoryChange(cat)}
                    className={`min-h-[44px] px-4 py-2 rounded-pill text-sm font-medium transition-colors ${
                      selected
                        ? 'bg-ink-black text-pure-white border border-ink-black'
                        : 'bg-pure-white text-ink-black border border-faint-border shadow-sm-soft hover:border-ink-black/40'
                    }`}
                  >
                    {cat === 'All' ? 'All Objects' : cat}
                  </button>
                );
              })}
            </div>
          </fieldset>

          <fieldset className="space-y-2 border-0 p-0 m-0 pt-4 border-t border-faint-border">
            <legend className="text-xs font-medium uppercase tracking-wide text-muted-gray mb-2">
              Availability
            </legend>
            <label className="flex items-center justify-between gap-3 p-3.5 rounded-image bg-canvas-mist border border-faint-border cursor-pointer">
              <span className="text-sm font-medium text-ink-black">
                Show in-stock objects only
              </span>
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => onInStockChange(e.target.checked)}
                className="w-5 h-5 accent-shop-violet rounded cursor-pointer"
              />
            </label>
          </fieldset>

          <fieldset className="space-y-2 border-0 p-0 m-0 pt-4 border-t border-faint-border">
            <legend className="text-xs font-medium uppercase tracking-wide text-muted-gray mb-2">
              Sort Order
            </legend>
            <div className="space-y-2">
              {[
                { value: 'featured' as const, label: 'Featured Selection' },
                { value: 'price-asc' as const, label: 'Price: Low to High' },
                { value: 'price-desc' as const, label: 'Price: High to Low' },
                { value: 'newest' as const, label: 'New Arrivals First' },
              ].map((opt) => (
                <label
                  key={opt.value}
                  className="flex items-center justify-between gap-3 p-3.5 rounded-image border border-faint-border bg-pure-white hover:bg-canvas-mist cursor-pointer transition-colors"
                >
                  <span className="text-sm font-medium text-ink-black">{opt.label}</span>
                  <input
                    type="radio"
                    name="drawer-sort-order"
                    checked={sortBy === opt.value}
                    onChange={() => onSortChange(opt.value)}
                    className="w-4 h-4 accent-shop-violet cursor-pointer"
                  />
                </label>
              ))}
            </div>
          </fieldset>
        </div>

        <div className="p-4 border-t border-faint-border bg-canvas-mist flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              onReset();
              onClose();
            }}
            className="btn-secondary flex-1"
          >
            Reset
          </button>
          <button type="button" onClick={onClose} className="btn-primary flex-1">
            Apply ({resultCount})
          </button>
        </div>
      </div>
    </dialog>
  );
}
