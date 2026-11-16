import type { Metadata } from 'next';
import Link from 'next/link';
import { SAMPLE_PRODUCTS } from '@/data/products';
import { getProductMedia } from '@/data/productMedia';
import { ProductMedia } from '@/components/ui/ProductMedia';
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs';
import { LineIcon } from '@/components/ui/LineIcon';

export const metadata: Metadata = {
  title: 'About CodeAlpha Store',
  description:
    'Product curation philosophy, material standards, and CodeAlpha internship frontend architecture.',
};

export default function AboutPage() {
  const showcaseItems = [
    SAMPLE_PRODUCTS[0], // Chrono Brass Desk Lamp
    SAMPLE_PRODUCTS[1], // Tactile Field Chronograph
    SAMPLE_PRODUCTS[2], // Copper Gooseneck Kettle
    SAMPLE_PRODUCTS[11], // Full-Grain Leather A5 Field Folio
  ];

  return (
    <div className="store-container pt-6 sm:pt-8 pb-8 space-y-12">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'About' },
        ]}
      />

      <header className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-6 space-y-4">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-pill bg-violet-soft border border-violet-border text-xs font-semibold text-brand-dark">
            <span className="w-2 h-2 rounded-pill bg-brand-violet shrink-0" aria-hidden="true" />
            <span>CodeAlpha Internship · Simple E-commerce Store</span>
          </span>
          <h1 className="display-hero m-0">
            Thoughtful objects for everyday work, home and utility.
          </h1>
          <p className="text-sm sm:text-base text-muted leading-relaxed m-0">
            CodeAlpha Store showcases a 12-item catalog spanning Audio &amp; Desk Craft, Everyday Carry, Home Objects, and Apparel &amp; Goods, emphasizing tactile durability, legible typography, and straightforward shopping flows.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link href="/shop" className="btn-primary">
              <span>Shop Collection</span>
              <LineIcon name="arrow-right" size={16} />
            </Link>
            <Link href="/contact" className="btn-secondary">
              Contact &amp; FAQ
            </Link>
          </div>
        </div>

        {/* 4-Photo Editorial Catalog Mosaic */}
        <div className="lg:col-span-6 grid grid-cols-2 gap-3 sm:gap-4">
          {showcaseItems.map((item) => {
            const media = getProductMedia(item);
            return (
              <Link
                key={item.id}
                href={`/shop/${item.id}`}
                className="surface-card card-hover-lift overflow-hidden group"
              >
                <div className="aspect-square bg-surface-subtle overflow-hidden">
                  <ProductMedia
                    src={media.src}
                    alt={media.alt}
                    width={450}
                    height={450}
                    imgClassName="transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="p-3 flex items-center justify-between gap-2 text-xs">
                  <span className="font-semibold text-ink truncate group-hover:text-brand-violet transition-colors">
                    {item.title}
                  </span>
                  <span className="text-muted tabular-nums shrink-0">${item.price}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </header>

      <section aria-label="Store principles and materials" className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        <article className="surface-card p-6 space-y-2.5">
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-violet m-0">
            01 · Tactile Materials
          </p>
          <h2 className="heading-sub m-0">Brass, Copper &amp; Heavy Canvas</h2>
          <p className="text-sm text-muted leading-relaxed m-0">
            Catalog specifications center on C36000 machined brass, grade-2 titanium, raw speckled stoneware, 14oz–18oz cotton canvas, and full-grain leather.
          </p>
        </article>

        <article className="surface-card p-6 space-y-2.5">
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-violet m-0">
            02 · Clear Storefront UX
          </p>
          <h2 className="heading-sub m-0">Accessible Responsive Flows</h2>
          <p className="text-sm text-muted leading-relaxed m-0">
            Search, department filtering, stock validation, shopping cart persistence, and native keyboard-dismissible drawers work consistently from 320px to 1440px.
          </p>
        </article>

        <article className="surface-card p-6 space-y-2.5">
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-violet m-0">
            03 · Transparent Demo State
          </p>
          <h2 className="heading-sub m-0">Client Storage Ahead of Backend</h2>
          <p className="text-sm text-muted leading-relaxed m-0">
            Cart items, demo orders, and session state currently run locally in Next.js and browser `localStorage` ahead of planned Express.js and MongoDB Atlas integration.
          </p>
        </article>
      </section>

      <section className="surface-card p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-l-4 border-l-brand-violet">
        <div className="space-y-1 max-w-2xl">
          <h2 className="heading-sub m-0">Truthful Scope &amp; Shipping Terms</h2>
          <p className="text-sm text-muted m-0 leading-relaxed">
            Orders over $75 qualify for free shipping; smaller carts calculate an $8 standard rate. No real payment gateway or server database is active in this frontend release.
          </p>
        </div>
        <Link href="/shop" className="btn-primary shrink-0">
          Browse Full Catalog
        </Link>
      </section>
    </div>
  );
}
