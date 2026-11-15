'use client';

import React, { Suspense, useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { SAMPLE_PRODUCTS } from '@/data/products';
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs';
import { SearchFilterBar } from '@/components/forms/SearchFilterBar';
import { FilterDrawer } from '@/components/navigation/FilterDrawer';
import { ProductGrid } from '@/components/product/ProductGrid';
import { PillBadge } from '@/components/ui/PillBadge';

function UrlParamsSync({
  onCategory,
  onQuery,
  onSort,
}: {
  onCategory: (cat: string) => void;
  onQuery: (q: string) => void;
  onSort: (sort: string) => void;
}) {
  const searchParams = useSearchParams();

  useEffect(() => {
    const urlCat = searchParams.get('category');
    const urlQ = searchParams.get('q');
    const urlSort = searchParams.get('sort');
    if (urlCat !== null) onCategory(urlCat);
    if (urlQ !== null) onQuery(urlQ);
    if (urlSort !== null) onSort(urlSort);
  }, [searchParams, onCategory, onQuery, onSort]);

  return null;
}

export default function ShopPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [priceRange, setPriceRange] = useState('ALL');
  const [sortBy, setSortBy] = useState('FEATURED');
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    const list = SAMPLE_PRODUCTS.filter((p) => {
      if (selectedCategory !== 'ALL' && p.category !== selectedCategory) {
        return false;
      }
      if (onlyInStock && p.stockCount <= 0) {
        return false;
      }
      if (priceRange === 'UNDER_75' && p.price >= 75) {
        return false;
      }
      if (priceRange === '75_TO_150' && (p.price < 75 || p.price > 150)) {
        return false;
      }
      if (priceRange === 'OVER_150' && p.price <= 150) {
        return false;
      }
      if (q) {
        const haystack =
          `${p.title} ${p.category} ${p.shortDescription} ${p.sku}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });

    const sorted = [...list];
    if (sortBy === 'PRICE_ASC') {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'PRICE_DESC') {
      sorted.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'NEWEST') {
      sorted.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
    }
    return sorted;
  }, [searchQuery, selectedCategory, priceRange, sortBy, onlyInStock]);

  const activeFilterCount =
    (selectedCategory !== 'ALL' ? 1 : 0) +
    (priceRange !== 'ALL' ? 1 : 0) +
    (onlyInStock ? 1 : 0) +
    (searchQuery.trim() ? 1 : 0);

  const handleResetAll = () => {
    setSearchQuery('');
    setSelectedCategory('ALL');
    setPriceRange('ALL');
    setSortBy('FEATURED');
    setOnlyInStock(false);
  };

  return (
    <div className="store-container py-10 sm:py-14">
      <Suspense fallback={null}>
        <UrlParamsSync
          onCategory={setSelectedCategory}
          onQuery={setSearchQuery}
          onSort={setSortBy}
        />
      </Suspense>

      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Shop All Products' },
        ]}
      />

      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-widest text-tiger-gold block mb-1.5">
            CURATED STOREFRONT CATALOG (SAMPLE DATA)
          </span>
          <h1 className="heading-section">
            {selectedCategory === 'ALL' ? 'ALL PRODUCTS' : selectedCategory}
          </h1>
        </div>
        <PillBadge tone="charred" className="self-start sm:self-auto">
          SHOWING {filteredProducts.length} OF {SAMPLE_PRODUCTS.length} PRODUCTS
        </PillBadge>
      </div>

      <SearchFilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        priceRange={priceRange}
        onSelectPriceRange={setPriceRange}
        sortBy={sortBy}
        onSelectSort={setSortBy}
        onlyInStock={onlyInStock}
        onToggleInStock={setOnlyInStock}
        activeFilterCount={activeFilterCount}
        onOpenMobileFilters={() => setIsMobileFilterOpen(true)}
        onResetAll={handleResetAll}
      />

      {activeFilterCount > 0 && (
        <div
          aria-live="polite"
          className="flex items-center flex-wrap gap-2 mb-6"
        >
          <span className="text-xs text-warm-sand mr-1">Active Filters:</span>
          {selectedCategory !== 'ALL' && (
            <button
              type="button"
              onClick={() => setSelectedCategory('ALL')}
              className="badge badge-spice hover:border-tiger-gold cursor-pointer"
            >
              <span>Dept: {selectedCategory}</span>
              <span aria-hidden="true">×</span>
            </button>
          )}
          {priceRange !== 'ALL' && (
            <button
              type="button"
              onClick={() => setPriceRange('ALL')}
              className="badge badge-spice hover:border-tiger-gold cursor-pointer"
            >
              <span>Price: {priceRange.replace(/_/g, ' ')}</span>
              <span aria-hidden="true">×</span>
            </button>
          )}
          {onlyInStock && (
            <button
              type="button"
              onClick={() => setOnlyInStock(false)}
              className="badge badge-spice hover:border-tiger-gold cursor-pointer"
            >
              <span>In Stock Only</span>
              <span aria-hidden="true">×</span>
            </button>
          )}
          {searchQuery.trim() && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="badge badge-spice hover:border-tiger-gold cursor-pointer"
            >
              <span>Search: &ldquo;{searchQuery.trim()}&rdquo;</span>
              <span aria-hidden="true">×</span>
            </button>
          )}
        </div>
      )}

      <ProductGrid
        products={filteredProducts}
        onResetFilters={handleResetAll}
      />

      <FilterDrawer
        isOpen={isMobileFilterOpen}
        onClose={() => setIsMobileFilterOpen(false)}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        priceRange={priceRange}
        onSelectPriceRange={setPriceRange}
        onlyInStock={onlyInStock}
        onToggleInStock={setOnlyInStock}
        onReset={handleResetAll}
      />
    </div>
  );
}
