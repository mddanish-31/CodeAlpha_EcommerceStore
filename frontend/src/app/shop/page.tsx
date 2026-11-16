'use client';

import { Suspense, useMemo, useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { DEPARTMENTS, SAMPLE_PRODUCTS } from '@/data/products';
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs';
import { SearchFilterBar } from '@/components/forms/SearchFilterBar';
import { FilterDrawer, type SortOption } from '@/components/navigation/FilterDrawer';
import { ProductGrid } from '@/components/product/ProductGrid';
import { StateFeedbackCard } from '@/components/ui/StateFeedbackCard';

function ShopCatalogContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialQuery = searchParams.get('q') ?? '';
  const initialCategory = searchParams.get('category') ?? 'All';
  const initialSort = (searchParams.get('sort') as SortOption) || 'featured';
  const initialStock = searchParams.get('inStock') === 'true';

  const [query, setQuery] = useState(initialQuery);
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState<SortOption>(initialSort);
  const [inStockOnly, setInStockOnly] = useState(initialStock);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  useEffect(() => {
    setQuery(searchParams.get('q') ?? '');
    setActiveCategory(searchParams.get('category') ?? 'All');
    const s = searchParams.get('sort') as SortOption;
    if (s === 'featured' || s === 'price-asc' || s === 'price-desc' || s === 'newest') {
      setSortBy(s);
    }
    setInStockOnly(searchParams.get('inStock') === 'true');
  }, [searchParams]);

  const syncUrlParams = (
    nextQ: string,
    nextCat: string,
    nextSort: SortOption,
    nextStock: boolean
  ) => {
    const params = new URLSearchParams();
    if (nextQ.trim()) params.set('q', nextQ.trim());
    if (nextCat !== 'All') params.set('category', nextCat);
    if (nextSort !== 'featured') params.set('sort', nextSort);
    if (nextStock) params.set('inStock', 'true');
    const qs = params.toString();
    router.replace(qs ? `/shop?${qs}` : '/shop', { scroll: false });
  };

  const handleQueryChange = (val: string) => {
    setQuery(val);
    syncUrlParams(val, activeCategory, sortBy, inStockOnly);
  };

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    syncUrlParams(query, cat, sortBy, inStockOnly);
  };

  const handleSortChange = (val: SortOption) => {
    setSortBy(val);
    syncUrlParams(query, activeCategory, val, inStockOnly);
  };

  const handleInStockChange = (val: boolean) => {
    setInStockOnly(val);
    syncUrlParams(query, activeCategory, sortBy, val);
  };

  const handleReset = () => {
    setQuery('');
    setActiveCategory('All');
    setSortBy('featured');
    setInStockOnly(false);
    router.replace('/shop', { scroll: false });
  };

  const filteredProducts = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = SAMPLE_PRODUCTS.filter((item) => {
      const catMatch = activeCategory === 'All' || item.category === activeCategory;
      const stockMatch = !inStockOnly || item.stockCount > 0;
      const textMatch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.sku.toLowerCase().includes(q) ||
        item.shortDescription.toLowerCase().includes(q);
      return catMatch && stockMatch && textMatch;
    });

    if (sortBy === 'price-asc') {
      return [...list].sort((a, b) => a.price - b.price);
    }
    if (sortBy === 'price-desc') {
      return [...list].sort((a, b) => b.price - a.price);
    }
    if (sortBy === 'newest') {
      return [...list].sort(
        (a, b) => Number(Boolean(b.isNewArrival)) - Number(Boolean(a.isNewArrival))
      );
    }
    return list;
  }, [query, activeCategory, inStockOnly, sortBy]);

  return (
    <div className="store-container pt-6 sm:pt-8 pb-8 space-y-6">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Shop' },
        ]}
      />

      <header className="space-y-2">
        <h1 className="display-hero m-0">Shop All Objects</h1>
        <p className="text-sm sm:text-base text-muted max-w-2xl m-0">
          Browse our 12 curated products across Audio &amp; Desk Craft, Everyday Carry, Home Objects, and Apparel &amp; Goods.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Desktop (>= 1024px) Filter Sidebar */}
        <aside
          aria-label="Product filters"
          className="hidden lg:block lg:col-span-3 surface-card p-5 space-y-6 lg:sticky lg:top-24"
        >
          <div className="space-y-3">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-muted m-0">
              Departments
            </h2>
            <ul className="space-y-1.5 list-none p-0 m-0">
              <li>
                <button
                  type="button"
                  aria-pressed={activeCategory === 'All'}
                  onClick={() => handleCategoryChange('All')}
                  className={`w-full min-h-[40px] px-3 py-2 rounded-control text-sm flex items-center justify-between gap-2 transition-colors ${
                    activeCategory === 'All'
                      ? 'bg-violet-soft text-brand-dark font-semibold border border-violet-border'
                      : 'text-ink-secondary hover:bg-page-bg hover:text-ink border border-transparent'
                  }`}
                >
                  <span>All Products</span>
                  <span className="text-xs tabular-nums opacity-80">{SAMPLE_PRODUCTS.length}</span>
                </button>
              </li>
              {DEPARTMENTS.map((dept) => {
                const selected = activeCategory === dept.name;
                return (
                  <li key={dept.id}>
                    <button
                      type="button"
                      aria-pressed={selected}
                      onClick={() => handleCategoryChange(dept.name)}
                      className={`w-full min-h-[40px] px-3 py-2 rounded-control text-sm flex items-center justify-between gap-2 text-left transition-colors ${
                        selected
                          ? 'bg-violet-soft text-brand-dark font-semibold border border-violet-border'
                          : 'text-ink-secondary hover:bg-page-bg hover:text-ink border border-transparent'
                      }`}
                    >
                      <span className="truncate">{dept.name}</span>
                      <span className="text-xs tabular-nums opacity-80 shrink-0">
                        {dept.itemCount}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="pt-5 border-t border-border-default space-y-3">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-muted m-0">
              Availability
            </h2>
            <label className="flex items-center justify-between gap-3 p-3 rounded-image bg-page-bg border border-border-default cursor-pointer hover:border-brand-violet/40 transition-colors">
              <span className="text-sm font-medium text-ink">In stock only</span>
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => handleInStockChange(e.target.checked)}
                className="w-4 h-4 accent-brand-violet rounded cursor-pointer"
              />
            </label>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={handleReset}
              className="btn-secondary w-full"
            >
              Reset All Filters
            </button>
          </div>
        </aside>

        {/* Main Column: Search / Sort Bar + Grid */}
        <div className="lg:col-span-9 space-y-5 min-w-0">
          <SearchFilterBar
            query={query}
            onQueryChange={handleQueryChange}
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
            inStockOnly={inStockOnly}
            onInStockChange={handleInStockChange}
            sortBy={sortBy}
            onSortChange={handleSortChange}
            onOpenMobileFilters={() => setIsMobileFilterOpen(true)}
            onReset={handleReset}
            resultCount={filteredProducts.length}
            totalCount={SAMPLE_PRODUCTS.length}
          />

          {filteredProducts.length === 0 ? (
            <StateFeedbackCard
              icon="search"
              title="No products match your current filters"
              description="Try clearing your search term, changing categories, or turning off the in-stock filter."
              actionLabel="Reset all filters"
              onAction={handleReset}
            />
          ) : (
            <ProductGrid products={filteredProducts} columns="3" showDescription />
          )}
        </div>
      </div>

      <FilterDrawer
        isOpen={isMobileFilterOpen}
        onClose={() => setIsMobileFilterOpen(false)}
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
        inStockOnly={inStockOnly}
        onInStockChange={handleInStockChange}
        sortBy={sortBy}
        onSortChange={handleSortChange}
        onReset={handleReset}
        resultCount={filteredProducts.length}
      />
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="store-container pt-8 pb-12">
          <div className="surface-card p-8 text-center text-sm text-muted">
            Loading catalog objects...
          </div>
        </div>
      }
    >
      <ShopCatalogContent />
    </Suspense>
  );
}
