'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { SAMPLE_PRODUCTS, DEPARTMENTS } from '@/data/products';
import { useStore } from '@/context/StoreContext';
import { PillBadge } from '@/components/ui/PillBadge';
import { LineIcon } from '@/components/ui/LineIcon';
import { ProductIllustration } from '@/components/ui/ProductIllustration';
import { ProductCard } from '@/components/product/ProductCard';
import { DottedDivider } from '@/components/layout/DottedDivider';
import { NewsletterForm } from '@/components/forms/NewsletterForm';

export default function HomePage() {
  const { addToCart, openCartDrawer, cartCount } = useStore();
  const [activeHomeTab, setActiveHomeTab] = useState<'ALL' | 'BESTSELLERS' | 'LIMITED'>('ALL');

  const flagshipProduct = SAMPLE_PRODUCTS[0];
  const trendingProducts = SAMPLE_PRODUCTS.filter((p) => {
    if (activeHomeTab === 'BESTSELLERS') return p.badge === 'BESTSELLER';
    if (activeHomeTab === 'LIMITED') return p.badge === 'LIMITED DROP' || p.compareAtPrice;
    return p.featured;
  }).slice(0, 4);

  const newArrivals = SAMPLE_PRODUCTS.filter((p) => p.isNewArrival).slice(0, 4);

  return (
    <div>
      {/* 1. EDITORIAL HERO SECTION */}
      <section
        aria-labelledby="hero-heading"
        className="relative py-12 sm:py-20 overflow-hidden"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none opacity-[0.06] overflow-hidden"
        >
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 1440 700"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="1180"
              cy="340"
              r="320"
              stroke="#FAAE33"
              strokeWidth="2"
              strokeDasharray="6 8"
            />
            <circle cx="1180" cy="340" r="220" stroke="#FAAE33" strokeWidth="1.5" />
            <path
              d="M1180 20 L1180 660 M860 340 L1500 340 M954 114 L1406 566 M1406 114 L954 566"
              stroke="#FAAE33"
              strokeWidth="1"
            />
          </svg>
        </div>

        <div className="store-container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 min-w-0">
              <div className="flex items-center flex-wrap gap-2.5 mb-4">
                <PillBadge tone="gold">
                  EDITION 01 // CURATED HARDWARE &amp; GOODS
                </PillBadge>
                <PillBadge tone="spice">SAMPLE DEMO CATALOG</PillBadge>
              </div>

              <h1 id="hero-heading" className="display-hero">
                CRAFTED FOR
                <br />
                DAILY RITUALS
              </h1>

              <p className="text-sm sm:text-base text-parchment-cream leading-relaxed max-w-xl mt-5 mb-7">
                Precision desk instruments, tactile everyday carry, and architectural home objects. Engineered in warm anodized metals and natural materials—built for focus, longevity, and effortless online shopping.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-wrap">
                <Link href="/shop" className="btn btn-primary">
                  <span>Shop Collection</span>
                  <LineIcon name="arrow-right" size={16} />
                </Link>
                <Link
                  href={`/shop/${flagshipProduct.id}`}
                  className="btn btn-ghost"
                >
                  Inspect Flagship Lamp
                </Link>
                <button
                  type="button"
                  onClick={openCartDrawer}
                  className="btn btn-ghost"
                >
                  Cart Drawer ({cartCount})
                </button>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-9 pt-6 border-t border-dotted border-tiger-gold">
                <div>
                  <div className="font-display text-2xl sm:text-3xl font-bold text-tiger-gold">
                    04
                  </div>
                  <div className="text-[11px] uppercase tracking-wider text-warm-sand mt-1">
                    Departments
                  </div>
                </div>
                <div>
                  <div className="font-display text-2xl sm:text-3xl font-bold text-tiger-gold">
                    12
                  </div>
                  <div className="text-[11px] uppercase tracking-wider text-warm-sand mt-1">
                    Curated Objects
                  </div>
                </div>
                <div>
                  <div className="font-display text-2xl sm:text-3xl font-bold text-tiger-gold">
                    48H
                  </div>
                  <div className="text-[11px] uppercase tracking-wider text-warm-sand mt-1">
                    Tracked Dispatch
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Flagship Product Pedestal */}
            <div className="lg:col-span-5 min-w-0">
              <div className="surface-card border-tiger-gold p-4 sm:p-5">
                <Link
                  href={`/shop/${flagshipProduct.id}`}
                  className="block rounded-[4px] bg-charred-clove border border-cardamom-brown aspect-[4/3.3] relative flex items-center justify-center p-6"
                  style={{
                    backgroundImage:
                      'radial-gradient(circle at 50% 45%, rgba(250, 174, 51, 0.16) 0%, transparent 68%)',
                  }}
                >
                  <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2">
                    <PillBadge tone="gold">FLAGSHIP RELEASE</PillBadge>
                    <PillBadge tone="alert">-15% LAUNCH OFFER</PillBadge>
                  </div>
                  <ProductIllustration
                    svgId={flagshipProduct.imageSvgId}
                    className="w-52 h-44 sm:w-60 sm:h-52"
                  />
                </Link>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-4 pt-3.5 border-t border-dotted border-tiger-gold">
                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-warm-sand">
                      {flagshipProduct.category} • SKU {flagshipProduct.sku}
                    </div>
                    <Link
                      href={`/shop/${flagshipProduct.id}`}
                      className="heading-card hover:text-tiger-gold transition-colors block"
                    >
                      {flagshipProduct.title}
                    </Link>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2">
                    <div className="tabular-nums">
                      <span className="font-display text-2xl sm:text-3xl font-bold text-tiger-gold">
                        ${flagshipProduct.price}
                      </span>
                      <span className="text-xs text-warm-sand line-through ml-1.5">
                        ${flagshipProduct.compareAtPrice}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => addToCart(flagshipProduct, 1, true)}
                      className="btn btn-primary px-4 py-2 text-xs"
                    >
                      + Quick Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <DottedDivider />

      {/* 2. FEATURED CATEGORIES SECTION */}
      <section
        id="departments"
        aria-labelledby="departments-heading"
        className="py-12 sm:py-20"
      >
        <div className="store-container">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-9">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-widest text-tiger-gold block mb-2">
                01 // STOREFRONT ARCHITECTURE
              </span>
              <h2 id="departments-heading" className="heading-section">
                BROWSE BY DEPARTMENT
              </h2>
            </div>
            <Link href="/shop" className="btn btn-ghost self-start sm:self-auto">
              View Full Catalog ({SAMPLE_PRODUCTS.length} Items)
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {DEPARTMENTS.map((dept) => (
              <Link
                key={dept.id}
                href={`/shop?category=${encodeURIComponent(dept.name)}`}
                className="surface-card-interactive p-5 flex flex-col justify-between min-h-[175px] no-underline group"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-display text-sm tracking-wider text-tiger-gold">
                    {dept.code}
                  </span>
                  <PillBadge tone="spice">{dept.itemCount} ITEMS</PillBadge>
                </div>

                <div className="flex items-end justify-between gap-3 mt-6">
                  <div>
                    <h3 className="heading-card group-hover:text-tiger-gold transition-colors">
                      {dept.name}
                    </h3>
                    <p className="text-xs text-warm-sand mt-1 leading-relaxed">
                      {dept.tagline}
                    </p>
                  </div>
                  <span
                    aria-hidden="true"
                    className="btn-icon shrink-0 group-hover:bg-tiger-gold group-hover:text-charred-clove"
                  >
                    <LineIcon name="arrow-right" size={16} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <DottedDivider />

      {/* 3. TRENDING & BEST-SELLING PRODUCTS */}
      <section aria-labelledby="trending-heading" className="py-12 sm:py-20">
        <div className="store-container">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-widest text-tiger-gold block mb-2">
                02 // CURATED CATALOG SPOTLIGHT
              </span>
              <h2 id="trending-heading" className="heading-section">
                TRENDING &amp; BEST SELLERS
              </h2>
            </div>

            <div
              role="group"
              aria-label="Filter trending showcase"
              className="flex items-center gap-2 flex-wrap"
            >
              <button
                type="button"
                aria-pressed={activeHomeTab === 'ALL'}
                onClick={() => setActiveHomeTab('ALL')}
                className="btn btn-ghost text-xs py-2 px-4"
              >
                Featured
              </button>
              <button
                type="button"
                aria-pressed={activeHomeTab === 'BESTSELLERS'}
                onClick={() => setActiveHomeTab('BESTSELLERS')}
                className="btn btn-ghost text-xs py-2 px-4"
              >
                Best Sellers
              </button>
              <button
                type="button"
                aria-pressed={activeHomeTab === 'LIMITED'}
                onClick={() => setActiveHomeTab('LIMITED')}
                className="btn btn-ghost text-xs py-2 px-4"
              >
                Limited &amp; Offers
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {trendingProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <DottedDivider />

      {/* 4. EDITORIAL PROMOTIONAL BANNER */}
      <section aria-labelledby="promo-heading" className="py-12 sm:py-20">
        <div className="store-container">
          <div className="rounded-card bg-charred-clove border border-tiger-gold p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <PillBadge tone="alert" className="mb-3.5">
                LIMITED BATCH // ARCHIVE 04
              </PillBadge>
              <h2 id="promo-heading" className="heading-xl">
                BUILT TO OUTLAST
                <br />
                FAST TRENDS
              </h2>
              <p className="text-sm sm:text-[15px] text-parchment-cream max-w-xl my-5 leading-relaxed">
                Every object in our catalog is modular, repairable, and crafted from warm raw brass, anodized aluminum, and heavyweight organic canvas. Orders over $75 qualify automatically for free tracked shipping.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/shop/heavyweight-canvas-chore-coat" className="btn btn-primary">
                  <span>Inspect Chore Coat ($142)</span>
                  <LineIcon name="arrow-right" size={16} />
                </Link>
                <Link href="/about" className="btn btn-ghost">
                  Read Our Craft Ethos
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 surface-card p-6">
              <div className="text-[11px] uppercase tracking-wider text-warm-sand">
                EDITORIAL CRAFT MARKET PALETTE
              </div>
              <h3 className="heading-card text-tiger-gold mt-1">
                WARM MONOCHROME DEPTH &amp; CLARITY
              </h3>
              <p className="text-xs text-warm-sand mt-2 leading-relaxed">
                Designed for effortless catalog scanning with high-contrast Parchment Cream typography, tabular pricing numerals, and instant slide-over cart review.
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                <PillBadge tone="gold">FREE SHIPPING $75+</PillBadge>
                <PillBadge tone="spice">30-DAY RETURNS</PillBadge>
                <PillBadge tone="alert">LIMITED DROPS</PillBadge>
              </div>
            </div>
          </div>
        </div>
      </section>

      <DottedDivider />

      {/* 5. NEW ARRIVALS SECTION */}
      <section aria-labelledby="new-arrivals-heading" className="py-12 sm:py-20">
        <div className="store-container">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-widest text-tiger-gold block mb-2">
                03 // LATEST STUDIO RELEASES
              </span>
              <h2 id="new-arrivals-heading" className="heading-section">
                NEW ARRIVALS
              </h2>
            </div>
            <Link
              href="/shop?sort=NEWEST"
              className="btn btn-ghost self-start sm:self-auto"
            >
              Browse All New Releases
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <DottedDivider />

      {/* 6. TRUST GUARANTEES & NEWSLETTER */}
      <section
        aria-label="Storefront Guarantees and Newsletter"
        className="py-12 sm:py-20"
      >
        <div className="store-container space-y-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="surface-card p-5">
              <PillBadge tone="gold">01 // DISPATCH</PillBadge>
              <h3 className="heading-card mt-3">48-HOUR TRACKED SHIPPING</h3>
              <p className="text-xs text-warm-sand mt-1.5 leading-relaxed">
                Protective plastic-free pulp packaging with real-time order dispatch updates.
              </p>
            </div>
            <div className="surface-card p-5">
              <PillBadge tone="gold">02 // GUARANTEE</PillBadge>
              <h3 className="heading-card mt-3">30-DAY EASY RETURNS</h3>
              <p className="text-xs text-warm-sand mt-1.5 leading-relaxed">
                Straightforward exchanges or full refunds within 30 days of delivery.
              </p>
            </div>
            <div className="surface-card p-5">
              <PillBadge tone="gold">03 // CRAFT</PillBadge>
              <h3 className="heading-card mt-3">VERIFIED MATERIALS</h3>
              <p className="text-xs text-warm-sand mt-1.5 leading-relaxed">
                Solid C36000 brass, grade-2 titanium, and 18oz dry-waxed canvas built to last.
              </p>
            </div>
            <div className="surface-card p-5">
              <PillBadge tone="gold">04 // ACCOUNT</PillBadge>
              <h3 className="heading-card mt-3">ORDER HISTORY TRACKING</h3>
              <p className="text-xs text-warm-sand mt-1.5 leading-relaxed">
                Inspect itemized order summaries and shipping details directly in your account.
              </p>
            </div>
          </div>

          <NewsletterForm />
        </div>
      </section>
    </div>
  );
}
