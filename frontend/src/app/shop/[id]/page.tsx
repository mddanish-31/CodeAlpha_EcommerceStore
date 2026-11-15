import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SAMPLE_PRODUCTS } from '@/data/products';
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs';
import { ProductGallery } from '@/components/product/ProductGallery';
import { ProductBuyBox } from '@/components/product/ProductBuyBox';
import { ProductCard } from '@/components/product/ProductCard';
import { DottedDivider } from '@/components/layout/DottedDivider';

export function generateStaticParams() {
  return SAMPLE_PRODUCTS.map((p) => ({ id: p.id }));
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = SAMPLE_PRODUCTS.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  const relatedProducts = SAMPLE_PRODUCTS.filter(
    (p) => p.id !== product.id && p.category === product.category
  ).slice(0, 4);

  const fallbackRelated =
    relatedProducts.length < 4
      ? [
          ...relatedProducts,
          ...SAMPLE_PRODUCTS.filter(
            (p) =>
              p.id !== product.id &&
              !relatedProducts.some((r) => r.id === p.id)
          ),
        ].slice(0, 4)
      : relatedProducts;

  return (
    <div>
      <section className="store-container py-10 sm:py-14">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Shop', href: '/shop' },
            {
              label: product.category,
              href: `/shop?category=${encodeURIComponent(product.category)}`,
            },
            { label: product.title },
          ]}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-6">
            <ProductGallery product={product} />
          </div>
          <div className="lg:col-span-6">
            <ProductBuyBox product={product} />
          </div>
        </div>
      </section>

      <DottedDivider />

      <section
        aria-labelledby="related-products-heading"
        className="store-container py-12 sm:py-16"
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-widest text-tiger-gold block mb-1.5">
              COMPLEMENTARY OBJECTS
            </span>
            <h2 id="related-products-heading" className="heading-section">
              YOU MAY ALSO LIKE
            </h2>
          </div>
          <Link href="/shop" className="btn btn-ghost self-start sm:self-auto">
            Back to Full Catalog
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {fallbackRelated.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
