'use client';

import React from 'react';
import { Product } from '@/types/store';
import { ProductCard } from './ProductCard';
import { StateFeedbackCard } from '@/components/ui/StateFeedbackCard';

export function ProductGrid({
  products,
  emptyTitle = 'NO MATCHING PRODUCTS FOUND',
  emptyMessage = 'Try adjusting your search keywords, department filter, or price range.',
  onResetFilters,
}: {
  products: Product[];
  emptyTitle?: string;
  emptyMessage?: string;
  onResetFilters?: () => void;
}) {
  if (products.length === 0) {
    return (
      <StateFeedbackCard
        status="empty"
        badgeText="EMPTY CATALOG VIEW"
        title={emptyTitle}
        message={emptyMessage}
        actionLabel={onResetFilters ? 'Reset All Filters' : 'Browse All Products'}
        onAction={onResetFilters}
        actionHref={onResetFilters ? undefined : '/shop'}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
