'use client';

import { Suspense, useMemo, useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { SAMPLE_PRODUCTS } from '@/data/products';
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
      return [...list].sort((a, b) => Number(Boolean(b.isNewArrival)) - Number(Boolean(a.isNewArrival)));
    }
    return list;
  }, [query, activeCategory, inStockOnly, sortBy]);

  return (
    <div className="store-container pt-6 sm:pt-8 pb-8 space-y-6">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Shop All Objects' },
        ]}
      />

      <header className="space-y-2">
        <h1 className="display-hero m-0">Shop All Studio Objects</h1>
        <p className="text-sm sm:text-base text-canvas-secondary max-w-2xl m-0">
          Browse every item across Audio &amp; Desk Craft, Everyday Carry, Home Objects, and Apparel &amp; Goods. Filter cleanly by department, availability, or search term.
        </p>
      </header>

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
          title="No objects match your current filters"
          description="Try clearing the search term, switching departments, or disabling the in-stock toggle."
          actionLabel="Reset all filters"
          onAction={handleReset}
        />
      ) : (
        <ProductGrid products={filteredProducts} columns="4" showDescription />
      )}

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
          <div className="surface-card p-8 text-center text-sm text-muted-gray">
            Loading catalog objects...
          </div>
        </div>
      }
    >
      <ShopCatalogContent />
    </Suspense>
  );
}
