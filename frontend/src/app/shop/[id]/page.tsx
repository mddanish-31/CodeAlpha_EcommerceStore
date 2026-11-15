import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SAMPLE_PRODUCTS } from '@/data/products';
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs';
import { ProductGallery } from '@/components/product/ProductGallery';
import { ProductBuyBox } from '@/components/product/ProductBuyBox';
import { ProductSpecsAccordion } from '@/components/product/ProductSpecsAccordion';
import { ProductGrid } from '@/components/product/ProductGrid';

export async function generateStaticParams() {
  return SAMPLE_PRODUCTS.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = SAMPLE_PRODUCTS.find((p) => p.id === id);
  if (!product) {
    return { title: 'Object Not Found' };
  }
  return {
    title: product.title,
    description: product.shortDescription,
  };
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

  const related = SAMPLE_PRODUCTS.filter(
    (p) => p.id !== product.id && p.category === product.category
  ).slice(0, 3);
  const fallbackRelated =
    related.length >= 3
      ? related
      : [
          ...related,
          ...SAMPLE_PRODUCTS.filter(
            (p) => p.id !== product.id && !related.some((r) => r.id === p.id)
          ).slice(0, 3 - related.length),
        ];

  return (
    <div className="store-container pt-6 sm:pt-8 pb-8 space-y-12">
      <div>
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          <div className="lg:col-span-7">
            <ProductGallery product={product} />
          </div>
          <div className="lg:col-span-5">
            <ProductBuyBox product={product} />
          </div>
        </div>
      </div>

      <section aria-label="Product specifications and care">
        <ProductSpecsAccordion product={product} />
      </section>

      <section aria-labelledby="related-objects-heading" className="space-y-5">
        <h2 id="related-objects-heading" className="heading-row m-0">
          Complementary Studio Objects
        </h2>
        <ProductGrid products={fallbackRelated} columns="3" />
      </section>
    </div>
  );
}
