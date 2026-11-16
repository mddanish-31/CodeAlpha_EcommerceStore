'use client';

import { LineIcon } from '@/components/ui/LineIcon';
import type { SortOption } from '@/components/navigation/FilterDrawer';

interface SearchFilterBarProps {
  query: string;
  onQueryChange: (q: string) => void;
  activeCategory: string;
  onCategoryChange: (cat: string) => void;
  inStockOnly: boolean;
  onInStockChange: (val: boolean) => void;
  sortBy: SortOption;
  onSortChange: (val: SortOption) => void;
  onOpenMobileFilters: () => void;
  onReset: () => void;
  resultCount: number;
  totalCount: number;
}

export function SearchFilterBar({
  query,
  onQueryChange,
  activeCategory,
  onCategoryChange,
  inStockOnly,
  onInStockChange,
  sortBy,
  onSortChange,
  onOpenMobileFilters,
  onReset,
  resultCount,
  totalCount,
}: SearchFilterBarProps) {
  const hasFilters =
    query.trim() !== '' || activeCategory !== 'All' || inStockOnly || sortBy !== 'featured';

  return (
    <div className="space-y-3">
      <div className="surface-card p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <search role="search" className="w-full sm:flex-1 sm:max-w-md">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex items-center gap-2 h-11 pl-3.5 pr-1.5 rounded-control bg-background border border-border focus-within:border-accent focus-within:bg-surface focus-within:ring-1 focus-within:ring-accent transition-colors"
          >
            <label htmlFor="shop-search-input" className="sr-only">
              Search store products
            </label>
            <LineIcon name="search" size={17} className="text-ink-muted shrink-0" />
            <input
              id="shop-search-input"
              name="q"
              type="search"
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              placeholder="Search brass lamp, watch, kettle, SKU..."
              className="flex-1 min-w-0 bg-transparent border-0 text-base sm:text-sm text-ink placeholder:text-ink-secondary focus:outline-none py-1"
            />
            {query ? (
              <button
                type="button"
                onClick={() => onQueryChange('')}
                aria-label="Clear search query"
                className="min-w-[36px] min-h-[36px] inline-flex items-center justify-center rounded-lg text-ink-muted hover:text-ink hover:bg-surface-subtle transition-colors"
              >
                <LineIcon name="close" size={15} />
              </button>
            ) : null}
          </form>
        </search>

        <div className="grid grid-cols-1 sm:flex sm:flex-wrap sm:items-center sm:justify-end gap-2.5">
          <button
            type="button"
            onClick={onOpenMobileFilters}
            className="lg:hidden btn-secondary w-full sm:w-auto"
          >
            <LineIcon name="filter" size={16} />
            <span>Filter &amp; Sort</span>
          </button>

          <div className="flex items-center gap-2 w-full sm:w-auto min-w-0">
            <label htmlFor="shop-sort-select" className="sr-only">
              Sort products
            </label>
            <select
              id="shop-sort-select"
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              className="w-full sm:w-auto min-h-[44px] px-3.5 py-2 rounded-control bg-surface border border-border text-sm font-medium text-ink focus:border-accent focus:outline-none cursor-pointer"
            >
              <option value="featured">Sort: Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="newest">New Arrivals</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-ink-muted px-0.5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="tabular-nums font-medium text-ink-secondary">
            Showing {resultCount} of {totalCount} items
          </span>
          {activeCategory !== 'All' ? (
            <button
              type="button"
              onClick={() => onCategoryChange('All')}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-pill bg-surface-subtle border border-border text-ink-secondary font-medium"
            >
              <span>{activeCategory}</span>
              <LineIcon name="close" size={12} />
            </button>
          ) : null}
          {inStockOnly ? (
            <button
              type="button"
              onClick={() => onInStockChange(false)}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-pill bg-surface-subtle border border-border text-ink-secondary font-medium"
            >
              <span>In stock only</span>
              <LineIcon name="close" size={12} />
            </button>
          ) : null}
        </div>

        {hasFilters ? (
          <button
            type="button"
            onClick={onReset}
            className="text-accent font-medium hover:text-accent-hover underline underline-offset-4 min-h-[36px] px-1"
          >
            Reset all filters
          </button>
        ) : null}
      </div>
    </div>
  );
}
