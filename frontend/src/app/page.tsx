'use client';

import Link from 'next/link';
import { DEPARTMENTS, SAMPLE_PRODUCTS } from '@/data/products';
import {
  DEPARTMENT_COVER_PRODUCT_ID,
  HERO_STUDIO_MEDIA,
  PRODUCT_MEDIA_BY_ID,
} from '@/data/productMedia';
import { ProductMedia } from '@/components/ui/ProductMedia';
import { LineIcon } from '@/components/ui/LineIcon';
import { ProductGrid } from '@/components/product/ProductGrid';
import { NewsletterForm } from '@/components/forms/NewsletterForm';

export default function HomePage() {
  const bestSellers = SAMPLE_PRODUCTS.filter((p) => p.featured).slice(0, 4);
  const newArrivals = SAMPLE_PRODUCTS.filter((p) => p.isNewArrival).slice(0, 4);

  return (
    <div className="space-y-16 lg:space-y-20 pb-8">
      {/* SECTION B: Editorial Product Hero */}
      <section aria-label="Featured storefront hero" className="bg-surface border-b border-border-default">
        <div className="store-container py-10 sm:py-14 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-pill bg-violet-soft border border-violet-border text-xs font-semibold text-brand-dark">
              <span className="w-2 h-2 rounded-pill bg-brand-violet shrink-0" aria-hidden="true" />
              <span>CodeAlpha Store · 12 Curated Studio Goods</span>
            </span>

            <div className="space-y-4">
              <h1 className="display-hero m-0">
                Curated Everyday Objects for Work, Home and Life
              </h1>
              <p className="text-base sm:text-lg text-muted max-w-xl m-0 leading-relaxed">
                Thoughtful tools, durable essentials and timeless goods for a better everyday.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link href="/shop" className="btn-primary">
                <span>Shop Collection</span>
                <LineIcon name="arrow-right" size={16} />
              </Link>
              <a href="#departments" className="btn-secondary">
                Explore Categories
              </a>
            </div>

            <dl className="grid grid-cols-3 gap-4 pt-6 border-t border-border-default m-0 max-w-lg">
              <div>
                <dt className="text-xs text-muted">Departments</dt>
                <dd className="m-0 text-lg font-semibold text-ink tabular-nums">4 Curated</dd>
              </div>
              <div>
                <dt className="text-xs text-muted">Catalog Items</dt>
                <dd className="m-0 text-lg font-semibold text-ink tabular-nums">12 Objects</dd>
              </div>
              <div>
                <dt className="text-xs text-muted">Free Shipping</dt>
                <dd className="m-0 text-lg font-semibold text-ink tabular-nums">Above $75</dd>
              </div>
            </dl>
          </div>

          <div className="lg:col-span-6">
            <div className="surface-card p-2 sm:p-3 overflow-hidden">
              <div className="aspect-[4/3] rounded-image bg-surface-subtle overflow-hidden">
                <ProductMedia
                  src={HERO_STUDIO_MEDIA.src}
                  alt={HERO_STUDIO_MEDIA.alt}
                  width={HERO_STUDIO_MEDIA.width}
                  height={HERO_STUDIO_MEDIA.height}
                  priority
                  sizes="(max-width: 1023px) 100vw, 50vw"
                  fallbackLabel="CodeAlpha Store Hero Collection"
                />
              </div>
              <div className="px-2 pt-3 pb-1 flex flex-wrap items-center justify-between gap-2 text-xs text-muted">
                <span className="font-medium text-ink-secondary">
                  Featured Desk Setup: Chrono Brass Lamp · Monolith 65% Keyboard · Copper Kettle
                </span>
                <Link
                  href="/shop/chrono-brass-desk-lamp"
                  className="font-semibold text-brand-violet hover:text-brand-dark inline-flex items-center gap-1 shrink-0"
                >
                  <span>Inspect Lamp</span>
                  <LineIcon name="chevron-right" size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION C: Truthful Storefront Benefits */}
      <section aria-label="Shopping benefits" className="store-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          <div className="surface-card p-6 flex items-start gap-4">
            <div className="w-10 h-10 rounded-control bg-violet-soft border border-violet-border text-brand-violet flex items-center justify-center shrink-0">
              <LineIcon name="truck" size={20} />
            </div>
            <div className="space-y-1">
              <h2 className="text-sm font-semibold text-ink m-0">Free Shipping Above $75</h2>
              <p className="text-xs sm:text-sm text-muted m-0 leading-relaxed">
                Orders over $75 qualify automatically for $0 shipping ($8 flat standard shipping below $75).
              </p>
            </div>
          </div>

          <div className="surface-card p-6 flex items-start gap-4">
            <div className="w-10 h-10 rounded-control bg-violet-soft border border-violet-border text-brand-violet flex items-center justify-center shrink-0">
              <LineIcon name="grid" size={20} />
            </div>
            <div className="space-y-1">
              <h2 className="text-sm font-semibold text-ink m-0">Four Curated Departments</h2>
              <p className="text-xs sm:text-sm text-muted m-0 leading-relaxed">
                Browse balanced desk craft, carry tools, home brew gear, and utilitarian canvas goods.
              </p>
            </div>
          </div>

          <div className="surface-card p-6 flex items-start gap-4">
            <div className="w-10 h-10 rounded-control bg-violet-soft border border-violet-border text-brand-violet flex items-center justify-center shrink-0">
              <LineIcon name="check" size={20} />
            </div>
            <div className="space-y-1">
              <h2 className="text-sm font-semibold text-ink m-0">Saved Local Session State</h2>
              <p className="text-xs sm:text-sm text-muted m-0 leading-relaxed">
                Shopping cart, demo profile, and simulated orders persist across reloads in browser storage.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION D: Shop by Department (4 Exact Departments) */}
      <section
        id="departments"
        aria-labelledby="departments-heading"
        className="store-container space-y-6 scroll-mt-24"
      >
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="space-y-1">
            <h2 id="departments-heading" className="display-section m-0">
              Shop by Department
            </h2>
            <p className="text-sm text-muted m-0">
              Explore all 4 curated departments across our 12-item catalog
            </p>
          </div>
          <Link
            href="/shop"
            className="text-sm font-semibold text-brand-violet hover:text-brand-dark inline-flex items-center gap-1"
          >
            <span>Browse all products</span>
            <LineIcon name="arrow-right" size={15} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {DEPARTMENTS.map((dept) => {
            const coverId = DEPARTMENT_COVER_PRODUCT_ID[dept.name];
            const media = PRODUCT_MEDIA_BY_ID[coverId];
            return (
              <Link
                key={dept.id}
                href={`/shop?category=${encodeURIComponent(dept.name)}`}
                className="surface-card card-hover-lift overflow-hidden flex flex-col group"
              >
                <div className="aspect-[4/3] bg-surface-subtle overflow-hidden">
                  {media ? (
                    <ProductMedia
                      src={media.src}
                      alt={`${dept.name} department featuring ${media.alt}`}
                      width={media.width}
                      height={media.height}
                      sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw"
                      imgClassName="transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  ) : null}
                </div>
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between gap-2">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-base font-semibold text-ink group-hover:text-brand-violet transition-colors m-0">
                        {dept.name}
                      </h3>
                      <span className="text-xs font-medium text-brand-dark bg-violet-soft px-2 py-0.5 rounded-pill shrink-0 tabular-nums">
                        {dept.itemCount} items
                      </span>
                    </div>
                    <p className="text-xs text-muted m-0 line-clamp-2 leading-relaxed">
                      {dept.tagline}
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-brand-violet inline-flex items-center gap-1 pt-1">
                    <span>Explore {dept.name}</span>
                    <LineIcon name="chevron-right" size={14} />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* SECTION E: Best Sellers (Existing Featured Products) */}
      <section aria-labelledby="best-sellers-heading" className="store-container space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="space-y-1">
            <h2 id="best-sellers-heading" className="display-section m-0">
              Best Sellers
            </h2>
            <p className="text-sm text-muted m-0">
              Highlighted catalog favorites ready for immediate dispatch simulation
            </p>
          </div>
          <Link href="/shop" className="btn-secondary">
            <span>View Full Shop</span>
            <LineIcon name="arrow-right" size={15} />
          </Link>
        </div>

        <ProductGrid products={bestSellers} columns="4" />
      </section>

      {/* SECTION F: Discovery / New Arrivals (Existing isNewArrival Flags) */}
      <section aria-labelledby="new-arrivals-heading" className="store-container space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="space-y-1">
            <h2 id="new-arrivals-heading" className="display-section m-0">
              New Arrivals
            </h2>
            <p className="text-sm text-muted m-0">
              Fresh studio releases across mechanical input, pour-over brewing, and desk timekeeping
            </p>
          </div>
          <Link
            href="/shop?sort=newest"
            className="text-sm font-semibold text-brand-violet hover:text-brand-dark inline-flex items-center gap-1"
          >
            <span>See all new arrivals</span>
            <LineIcon name="arrow-right" size={15} />
          </Link>
        </div>

        <ProductGrid products={newArrivals} columns="4" />
      </section>

      {/* SECTION G: Studio Updates & Demo Newsletter */}
      <section aria-label="Newsletter updates" className="store-container">
        <div className="surface-card p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          <div className="lg:col-span-6 space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-violet">
              Store Updates
            </span>
            <h2 className="display-section m-0">
              Follow upcoming studio releases
            </h2>
            <p className="text-sm text-muted m-0 leading-relaxed">
              Sign up for release notifications on restocks and seasonal drops. Emails validate client-side as a frontend demo.
            </p>
          </div>
          <div className="lg:col-span-6">
            <NewsletterForm />
          </div>
        </div>
      </section>
    </div>
  );
}
