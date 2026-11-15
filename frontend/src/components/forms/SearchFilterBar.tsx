'use client';

import React from 'react';
import { LineIcon } from '@/components/ui/LineIcon';
import { DEPARTMENTS } from '@/data/products';

export function SearchFilterBar({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  priceRange,
  onSelectPriceRange,
  sortBy,
  onSelectSort,
  onlyInStock,
  onToggleInStock,
  activeFilterCount,
  onOpenMobileFilters,
  onResetAll,
}: {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  priceRange: string;
  onSelectPriceRange: (price: string) => void;
  sortBy: string;
  onSelectSort: (sort: string) => void;
  onlyInStock: boolean;
  onToggleInStock: (val: boolean) => void;
  activeFilterCount: number;
  onOpenMobileFilters: () => void;
  onResetAll: () => void;
}) {
  return (
    <search
      aria-label="Catalog Search, Department Filter, and Sort Controls"
      className="surface-card p-4 mb-6 space-y-4"
    >
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="relative flex-1">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-tiger-gold pointer-events-none">
            <LineIcon name="search" size={16} />
          </span>
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by product title, material, or department..."
            aria-label="Filter catalog by keyword"
            enterKeyHint="search"
            className="input-pill pl-11 pr-10"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              aria-label="Clear search query"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-warm-sand hover:text-tiger-gold p-1 cursor-pointer"
            >
              <LineIcon name="close" size={15} />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            type="button"
            onClick={onOpenMobileFilters}
            className="btn btn-ghost md:hidden"
          >
            <LineIcon name="filter" size={16} />
            <span>
              Filters {activeFilterCount > 0 ? `(${activeFilterCount})` : ''}
            </span>
          </button>

          <div className="hidden md:block">
            <label htmlFor="price-filter-select" className="sr-only">
              Filter by Price Range
            </label>
            <select
              id="price-filter-select"
              value={priceRange}
              onChange={(e) => onSelectPriceRange(e.target.value)}
              className="input-pill py-2 px-4 text-xs uppercase tracking-wider cursor-pointer w-auto"
            >
              <option value="ALL">Price: All</option>
              <option value="UNDER_75">Under $75</option>
              <option value="75_TO_150">$75 – $150</option>
              <option value="OVER_150">$150+</option>
            </select>
          </div>

          <div className="flex-1 min-w-[175px] sm:flex-initial">
            <label htmlFor="sort-select" className="sr-only">
              Sort Products
            </label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => onSelectSort(e.target.value)}
              className="input-pill py-2 px-4 text-xs uppercase tracking-wider cursor-pointer w-full sm:w-auto"
            >
              <option value="FEATURED">Sort: Featured</option>
              <option value="PRICE_ASC">Price: Low to High</option>
              <option value="PRICE_DESC">Price: High to Low</option>
              <option value="NEWEST">Sort: New Arrivals</option>
            </select>
          </div>
        </div>
      </div>

      <div className="hidden md:flex items-center justify-between gap-3 pt-3 border-t border-dotted border-tiger-gold/40 flex-wrap">
        <div
          role="group"
          aria-label="Filter by Department"
          className="flex items-center gap-2 flex-wrap"
        >
          <button
            type="button"
            aria-pressed={selectedCategory === 'ALL'}
            onClick={() => onSelectCategory('ALL')}
            className="btn btn-ghost text-xs py-1.5 px-4"
          >
            All Departments
          </button>
          {DEPARTMENTS.map((dept) => (
            <button
              key={dept.id}
              type="button"
              aria-pressed={selectedCategory === dept.name}
              onClick={() => onSelectCategory(dept.name)}
              className="btn btn-ghost text-xs py-1.5 px-4"
            >
              {dept.name}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <label className="inline-flex items-center gap-2 text-xs text-warm-sand cursor-pointer min-h-[44px]">
            <input
              type="checkbox"
              checked={onlyInStock}
              onChange={(e) => onToggleInStock(e.target.checked)}
              className="w-4 h-4 accent-tiger-gold"
            />
            <span>In Stock Only</span>
          </label>

          {activeFilterCount > 0 && (
            <button
              type="button"
              onClick={onResetAll}
              className="btn-link text-xs"
            >
              Reset All ({activeFilterCount})
            </button>
          )}
        </div>
      </div>
    </search>
  );
}
