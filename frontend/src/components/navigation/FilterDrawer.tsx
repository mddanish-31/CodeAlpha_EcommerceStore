'use client';

import React, { useEffect, useRef } from 'react';
import { LineIcon } from '@/components/ui/LineIcon';
import { DEPARTMENTS } from '@/data/products';

export function FilterDrawer({
  isOpen,
  onClose,
  selectedCategory,
  onSelectCategory,
  priceRange,
  onSelectPriceRange,
  onlyInStock,
  onToggleInStock,
  onReset,
}: {
  isOpen: boolean;
  onClose: () => void;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  priceRange: string;
  onSelectPriceRange: (price: string) => void;
  onlyInStock: boolean;
  onToggleInStock: (val: boolean) => void;
  onReset: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    const dlg = dialogRef.current;
    if (!dlg) return;
    if (isOpen && !dlg.open) {
      dlg.showModal();
    } else if (!isOpen && dlg.open) {
      dlg.close();
    }
  }, [isOpen]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    const dlg = dialogRef.current;
    if (!dlg) return;
    const rect = dlg.getBoundingClientRect();
    const clickedInDialog =
      rect.top <= e.clientY &&
      e.clientY <= rect.top + rect.height &&
      rect.left <= e.clientX &&
      e.clientX <= rect.left + rect.width;
    if (!clickedInDialog) {
      onClose();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      id="filter-drawer-dialog"
      className="drawer-dialog"
      onClose={onClose}
      onClick={handleBackdropClick}
      aria-labelledby="filter-drawer-title"
      {...({ closedby: 'any' } as Record<string, string>)}
    >
      <div className="flex flex-col h-full justify-between gap-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-dotted border-tiger-gold">
            <h2 id="filter-drawer-title" className="heading-card text-tiger-gold">
              FILTER CATALOG
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="btn-icon"
              aria-label="Close filter drawer"
            >
              <LineIcon name="close" size={18} />
            </button>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-warm-sand mb-3">
              DEPARTMENT
            </h3>
            <div className="flex flex-col gap-2">
              <button
                type="button"
                aria-pressed={selectedCategory === 'ALL'}
                onClick={() => onSelectCategory('ALL')}
                className="btn btn-ghost w-full justify-start"
              >
                All Departments
              </button>
              {DEPARTMENTS.map((dept) => (
                <button
                  key={dept.id}
                  type="button"
                  aria-pressed={selectedCategory === dept.name}
                  onClick={() => onSelectCategory(dept.name)}
                  className="btn btn-ghost w-full justify-between"
                >
                  <span>{dept.name}</span>
                  <span className="text-[11px] opacity-80">({dept.itemCount})</span>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-dotted border-tiger-gold">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-warm-sand mb-3">
              PRICE CEILING
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'ALL', label: 'All Prices' },
                { id: 'UNDER_75', label: 'Under $75' },
                { id: '75_TO_150', label: '$75 – $150' },
                { id: 'OVER_150', label: '$150+' },
              ].map((p) => (
                <button
                  key={p.id}
                  type="button"
                  aria-pressed={priceRange === p.id}
                  onClick={() => onSelectPriceRange(p.id)}
                  className="btn btn-ghost text-xs"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-dotted border-tiger-gold">
            <label className="flex items-center justify-between gap-3 cursor-pointer min-h-[44px]">
              <span className="text-xs font-semibold uppercase tracking-wider text-parchment-cream">
                In-Stock Items Only
              </span>
              <input
                type="checkbox"
                checked={onlyInStock}
                onChange={(e) => onToggleInStock(e.target.checked)}
                className="w-5 h-5 accent-tiger-gold"
              />
            </label>
          </div>
        </div>

        <div className="pt-4 border-t border-dotted border-tiger-gold flex gap-3">
          <button
            type="button"
            onClick={() => {
              onReset();
              onClose();
            }}
            className="btn btn-ghost flex-1"
          >
            Reset
          </button>
          <button type="button" onClick={onClose} className="btn btn-primary flex-1">
            Apply Filters
          </button>
        </div>
      </div>
    </dialog>
  );
}
