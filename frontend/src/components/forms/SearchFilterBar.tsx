'use client';

import { DEPARTMENTS } from '@/data/products';
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
  const categories = ['All', ...DEPARTMENTS.map((d) => d.name)];
  const hasFilters =
    query.trim() !== '' || activeCategory !== 'All' || inStockOnly || sortBy !== 'featured';

  return (
    <div className="space-y-4">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        <search role="search" className="w-full lg:max-w-xl">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex items-center gap-2 min-h-[54px] pl-4 pr-1.5 py-1 rounded-pill bg-pure-white border border-ink-black/20 shadow-sm-soft focus-within:border-shop-violet focus-within:ring-2 focus-within:ring-violet-wash/50"
          >
            <label htmlFor="shop-search-input" className="sr-only">
              Search store products
            </label>
            <LineIcon name="search" size={18} className="text-muted-gray shrink-0" />
            <input
              id="shop-search-input"
              name="q"
              type="search"
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              placeholder="Search brass lamp, watch, kettle, SKU..."
              className="flex-1 min-w-0 bg-transparent border-0 text-base text-ink-black placeholder:text-muted-gray focus:outline-none py-1.5"
            />
            {query ? (
              <button
                type="button"
                onClick={() => onQueryChange('')}
                aria-label="Clear search query"
                className="min-w-[38px] min-h-[38px] inline-flex items-center justify-center rounded-pill text-muted-gray hover:text-ink-black hover:bg-canvas-mist transition-colors"
              >
                <LineIcon name="close" size={15} />
              </button>
            ) : null}
            <button
              type="submit"
              aria-label="Apply search filter"
              className="btn-search-submit"
            >
              <LineIcon name="arrow-right" size={18} />
            </button>
          </form>
        </search>

        <div className="flex flex-wrap items-center justify-between lg:justify-end gap-2.5">
          <button
            type="button"
            onClick={onOpenMobileFilters}
            className="lg:hidden btn-secondary flex-1 sm:flex-none"
          >
            <LineIcon name="filter" size={16} />
            <span>Filter &amp; Sort</span>
          </button>

          <label className="hidden lg:inline-flex items-center gap-2 min-h-[44px] px-4 py-2 rounded-pill bg-pure-white border border-faint-border shadow-sm-soft text-xs font-medium text-ink-black cursor-pointer hover:border-ink-black/40 transition-colors">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => onInStockChange(e.target.checked)}
              className="w-4 h-4 accent-shop-violet rounded cursor-pointer"
            />
            <span>In stock only</span>
          </label>

          <div className="flex items-center gap-2 flex-1 sm:flex-none min-w-0">
            <label htmlFor="shop-sort-select" className="sr-only">
              Sort products
            </label>
            <select
              id="shop-sort-select"
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              className="w-full sm:w-auto min-h-[44px] pl-4 pr-8 py-2 rounded-pill bg-pure-white border border-ink-black/20 shadow-sm-soft text-sm font-medium text-ink-black focus:border-shop-violet focus:outline-none cursor-pointer"
            >
              <option value="featured">Sort: Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="newest">New Arrivals</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div
          className="flex flex-wrap items-center gap-2"
          role="group"
          aria-label="Filter by product category"
        >
          {categories.map((cat) => {
            const active = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                aria-pressed={active}
                onClick={() => onCategoryChange(cat)}
                className={`min-h-[44px] px-4 py-2 rounded-pill text-sm transition-colors ${
                  active
                    ? 'bg-ink-black text-pure-white border border-ink-black font-medium'
                    : 'bg-pure-white text-ink-black border border-faint-border shadow-sm-soft hover:border-ink-black/40 font-normal'
                }`}
              >
                {cat === 'All' ? 'All Objects' : cat}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-3 text-xs text-canvas-secondary tabular-nums">
          <span>
            Showing {resultCount} of {totalCount} items
          </span>
          {hasFilters ? (
            <button
              type="button"
              onClick={onReset}
              className="text-ink-black font-medium underline underline-offset-4 hover:text-slate-ink min-h-[36px] px-1"
            >
              Reset all
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
