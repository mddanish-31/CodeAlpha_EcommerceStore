import type { Product } from '@/types/store';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  columns?: '3' | '4';
  showDescription?: boolean;
}

export function ProductGrid({
  products,
  columns = '4',
  showDescription = false,
}: ProductGridProps) {
  const colClass =
    columns === '3'
      ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
      : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';

  return (
    <div className={`grid ${colClass} gap-3 sm:gap-4`}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          showDescription={showDescription}
        />
      ))}
    </div>
  );
}
