'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { DEPARTMENTS, SAMPLE_PRODUCTS } from '@/data/products';
import { useStore } from '@/context/StoreContext';
import { LineIcon, type IconName } from '@/components/ui/LineIcon';
import { ProductIllustration, getProductStage } from '@/components/ui/ProductIllustration';
import { ProductGrid } from '@/components/product/ProductGrid';
import { NewsletterForm } from '@/components/forms/NewsletterForm';

const CATEGORY_ICONS: Record<string, IconName> = {
  All: 'grid',
  'Audio & Desk Craft': 'home',
  'Everyday Carry': 'bag',
  'Home Objects': 'clock',
  'Apparel & Goods': 'filter',
};

const CONSTELLATION_LABELS: Record<string, string> = {
  'chrono-brass-desk-lamp': 'Lamp',
  'tactile-field-chronograph': 'Watch',
  'copper-gooseneck-kettle': 'Kettle',
  'waxed-canvas-utility-tote': 'Tote',
  'monolith-mechanical-keypad': 'Keypad',
  'studio-monitor-isolation-stands': 'Stands',
  'machined-brass-bolt-pen': 'Pen',
  'modular-cordura-tech-pouch': 'Pouch',
};

const SPOTLIGHT_LAMP = SAMPLE_PRODUCTS[0];

const LAMP_SWATCHES = [
  {
    key: 'front' as const,
    label: 'Front',
    caption: 'View: Front Studio Elevation',
    bgClass: 'bg-canvas-mist',
    dark: false,
    svgOverride: 'lamp',
  },
  {
    key: 'profile' as const,
    label: 'Clockwork',
    caption: 'View: Brass Canopy Finish',
    bgClass: 'bg-faint-border',
    dark: false,
    svgOverride: 'clock',
  },
  {
    key: 'darkroom' as const,
    label: 'Darkroom',
    caption: 'View: Low-Glare Dark Stage',
    bgClass: 'bg-slate-ink',
    dark: true,
    svgOverride: 'lamp',
  },
];

export default function HomePage() {
  const router = useRouter();
  const { addToCart } = useStore();

  const [heroQuery, setHeroQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [spotlightView, setSpotlightView] = useState<'front' | 'profile' | 'darkroom'>('front');

  const leftWing = SAMPLE_PRODUCTS.slice(0, 4);
  const rightWing = SAMPLE_PRODUCTS.slice(4, 8);

  const visibleFeatured = useMemo(() => {
    if (selectedCategory === 'All') {
      return SAMPLE_PRODUCTS.filter((p) => p.featured).slice(0, 4);
    }
    return SAMPLE_PRODUCTS.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  const newArrivals = useMemo(
    () => SAMPLE_PRODUCTS.filter((p) => p.isNewArrival).slice(0, 4),
    []
  );

  const activeSwatch =
    LAMP_SWATCHES.find((s) => s.key === spotlightView) ?? LAMP_SWATCHES[0];

  const handleHeroSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (heroQuery.trim()) params.set('q', heroQuery.trim());
    if (selectedCategory !== 'All') params.set('category', selectedCategory);
    const qs = params.toString();
    router.push(qs ? `/shop?${qs}` : '/shop');
  };

  return (
    <div className="store-container pt-6 sm:pt-10 lg:pt-12 pb-6 space-y-16 lg:space-y-20">
      {/* SECTION 1: Floating Shopping Constellation Hero */}
      <section aria-label="Storefront discovery hero">
        <div className="grid grid-cols-1 xl:grid-cols-[minmax(190px,230px)_minmax(480px,600px)_minmax(190px,230px)] gap-6 items-center">
          {/* Left Wing (Desktop >= 1280px left flank, Mobile 2x2 / Tablet 4-col ribbon below hero) */}
          <div className="order-2 xl:order-none grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-2 gap-3">
            {leftWing.map((product, index) => {
              const stage = getProductStage(product.imageSvgId);
              const shortLabel = CONSTELLATION_LABELS[product.id] ?? product.title;
              return (
                <Link
                  key={product.id}
                  href={`/shop/${product.id}`}
                  aria-label={`${product.title}, $${product.price}`}
                  className={`surface-card hover-lift p-1.5 flex flex-col gap-1.5 rounded-[22px] ${
                    index % 2 === 1 ? 'xl:translate-y-4' : ''
                  }`}
                >
                  <div
                    className={`w-full aspect-square rounded-[16px] ${stage.bgClass} p-3 flex items-center justify-center`}
                  >
                    <ProductIllustration
                      svgId={product.imageSvgId}
                      darkBackdrop={stage.darkBackdrop}
                      className="w-16 h-16"
                    />
                  </div>
                  <div className="px-1.5 pb-1 flex items-center justify-between gap-1.5 text-xs">
                    <span className="font-medium text-ink-black truncate">
                      {shortLabel}
                    </span>
                    <span className="text-muted-gray tabular-nums shrink-0">
                      ${product.price}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Center Search & Identity Column (Always first on Mobile / Tablet) */}
          <div className="order-1 xl:order-none flex flex-col items-center text-center gap-4 max-w-[600px] w-full mx-auto">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-pill bg-pure-white border border-faint-border shadow-sm-soft text-xs font-medium text-slate-ink">
              <span className="w-2 h-2 rounded-pill bg-shop-violet shrink-0" aria-hidden="true" />
              <span>White Canvas Studio · 12 Curated Objects</span>
            </span>

            <div className="space-y-2.5">
              <div className="text-[28px] sm:text-[34px] font-semibold tracking-[-0.055em] leading-none text-ink-black">
                <span>simple</span>
                <span className="wordmark-dot" aria-hidden="true" />
              </div>
              <h1 className="display-hero m-0">
                Thoughtful everyday objects, framed in studio clarity.
              </h1>
              <p className="text-sm sm:text-base text-canvas-secondary max-w-md mx-auto m-0 leading-relaxed">
                Functional desk craft, tactile carry goods, and studio vessels organized on a quiet white canvas.
              </p>
            </div>

            <search role="search" className="w-full max-w-[580px] pt-1">
              <form
                onSubmit={handleHeroSearchSubmit}
                className="flex items-center gap-2 min-h-[56px] pl-5 pr-1.5 py-1 rounded-pill bg-pure-white border border-ink-black/20 shadow-sm-soft focus-within:border-shop-violet focus-within:ring-2 focus-within:ring-violet-wash/50"
              >
                <label htmlFor="hero-catalog-search" className="sr-only">
                  Search Simple Store catalog
                </label>
                <LineIcon name="search" size={18} className="text-muted-gray shrink-0" />
                <input
                  id="hero-catalog-search"
                  name="q"
                  type="search"
                  value={heroQuery}
                  onChange={(e) => setHeroQuery(e.target.value)}
                  placeholder="Search brass lamp, chronograph, kettle..."
                  className="flex-1 min-w-0 bg-transparent border-0 text-base text-ink-black placeholder:text-muted-gray focus:outline-none py-2"
                />
                {heroQuery ? (
                  <button
                    type="button"
                    onClick={() => setHeroQuery('')}
                    aria-label="Clear hero search"
                    className="min-w-[36px] min-h-[36px] inline-flex items-center justify-center rounded-pill text-muted-gray hover:text-ink-black hover:bg-canvas-mist"
                  >
                    <LineIcon name="close" size={15} />
                  </button>
                ) : null}
                <button
                  type="submit"
                  aria-label="Search store catalog"
                  className="btn-search-submit"
                >
                  <LineIcon name="arrow-right" size={18} />
                </button>
              </form>
            </search>

            <nav aria-label="Catalog departments" className="w-full pt-1">
              <div className="flex flex-wrap items-center justify-center gap-2">
                {['All', ...DEPARTMENTS.map((d) => d.name)].map((cat) => {
                  const active = selectedCategory === cat;
                  const iconName = CATEGORY_ICONS[cat] ?? 'grid';
                  return (
                    <button
                      key={cat}
                      type="button"
                      aria-pressed={active}
                      onClick={() => setSelectedCategory(cat)}
                      className={`inline-flex items-center gap-2 min-h-[44px] px-4 py-2 rounded-pill text-sm transition-colors ${
                        active
                          ? 'bg-ink-black text-pure-white border border-ink-black font-medium'
                          : 'bg-pure-white text-ink-black border border-faint-border shadow-sm-soft hover:border-ink-black/40 font-normal'
                      }`}
                    >
                      <LineIcon name={iconName} size={15} />
                      <span>{cat === 'All' ? 'All Objects' : cat}</span>
                    </button>
                  );
                })}
              </div>
            </nav>
          </div>

          {/* Right Wing (Desktop >= 1280px symmetric flank) */}
          <div className="hidden xl:grid xl:grid-cols-2 gap-3">
            {rightWing.map((product, index) => {
              const stage = getProductStage(product.imageSvgId);
              const shortLabel = CONSTELLATION_LABELS[product.id] ?? product.title;
              return (
                <Link
                  key={product.id}
                  href={`/shop/${product.id}`}
                  aria-label={`${product.title}, $${product.price}`}
                  className={`surface-card hover-lift p-1.5 flex flex-col gap-1.5 rounded-[22px] ${
                    index % 2 === 0 ? '-translate-y-4' : ''
                  }`}
                >
                  <div
                    className={`w-full aspect-square rounded-[16px] ${stage.bgClass} p-3 flex items-center justify-center`}
                  >
                    <ProductIllustration
                      svgId={product.imageSvgId}
                      darkBackdrop={stage.darkBackdrop}
                      className="w-16 h-16"
                    />
                  </div>
                  <div className="px-1.5 pb-1 flex items-center justify-between gap-1.5 text-xs">
                    <span className="font-medium text-ink-black truncate">
                      {shortLabel}
                    </span>
                    <span className="text-muted-gray tabular-nums shrink-0">
                      ${product.price}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 2: Curated Spotlight Duo */}
      <section aria-label="Curated studio spotlights">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {/* Dark Slate Spotlight */}
          <article className="surface-card-slate p-6 sm:p-8 flex flex-col justify-between gap-6">
            <div className="space-y-2">
              <span className="text-xs font-medium text-violet-wash">
                Curated Department · Studio Precision
              </span>
              <h2 className="display-section text-pure-white m-0">
                Audio &amp; Desk Craft Built to Endure
              </h2>
              <p className="text-sm text-faint-border max-w-md m-0 leading-relaxed">
                Weighted spun brass lighting, gasket-mounted anodized typing hardware, and acoustic isolation stands.
              </p>
            </div>

            <div className="rounded-image bg-ash-veil p-4 flex items-center justify-between gap-4">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-tile bg-pure-white text-ink-black text-xs font-medium">
                <span className="w-2 h-2 rounded-pill bg-shop-violet" aria-hidden="true" />
                <span>AT Series · 3 Objects</span>
              </span>
              <ProductIllustration
                svgId="lamp"
                darkBackdrop
                className="w-16 h-16 shrink-0"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <Link
                href="/shop?category=Audio+%26+Desk+Craft"
                className="btn-white"
              >
                <span>Explore Desk Craft</span>
                <LineIcon name="arrow-right" size={15} />
              </Link>
              <span className="text-xs text-cool-stone tabular-nums">
                Starting at $92 USD
              </span>
            </div>
          </article>

          {/* Interactive White Mini-Swatch Spotlight */}
          <article className="surface-card p-6 sm:p-8 flex flex-col justify-between gap-6">
            <div className="space-y-2">
              <span className="text-xs font-medium text-muted-gray">
                Featured Object · Multi-Perspective Preview
              </span>
              <h2 className="display-section text-ink-black m-0">
                {SPOTLIGHT_LAMP.title}
              </h2>
              <p className="text-sm text-muted-gray max-w-md m-0 leading-relaxed">
                {SPOTLIGHT_LAMP.shortDescription}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-[152px_1fr] gap-4 items-center">
              <div
                className={`w-full aspect-square rounded-image ${activeSwatch.bgClass} p-4 flex items-center justify-center transition-colors`}
                aria-live="polite"
              >
                <ProductIllustration
                  svgId={activeSwatch.svgOverride}
                  darkBackdrop={activeSwatch.dark}
                  className="w-24 h-24"
                />
              </div>

              <div className="space-y-3">
                <p className="text-xs font-medium text-muted-gray m-0">
                  {activeSwatch.caption}
                </p>

                <div
                  className="flex flex-wrap gap-2"
                  role="group"
                  aria-label="Chrono Brass Desk Lamp studio perspectives"
                >
                  {LAMP_SWATCHES.map((sw) => {
                    const active = spotlightView === sw.key;
                    return (
                      <button
                        key={sw.key}
                        type="button"
                        aria-pressed={active}
                        aria-label={sw.label}
                        onClick={() => setSpotlightView(sw.key)}
                        className={`w-12 h-12 rounded-tile ${sw.bgClass} p-1.5 flex items-center justify-center border transition-colors ${
                          active
                            ? 'border-shop-violet ring-2 ring-violet-wash/70'
                            : 'border-faint-border hover:border-ink-black/40'
                        }`}
                      >
                        <ProductIllustration
                          svgId={sw.svgOverride}
                          darkBackdrop={sw.dark}
                          className="w-full h-full"
                        />
                      </button>
                    );
                  })}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-semibold text-ink-black tabular-nums">
                      ${SPOTLIGHT_LAMP.price}
                    </span>
                    {SPOTLIGHT_LAMP.compareAtPrice ? (
                      <span className="text-xs text-muted-gray line-through tabular-nums">
                        ${SPOTLIGHT_LAMP.compareAtPrice}
                      </span>
                    ) : null}
                  </div>
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/shop/${SPOTLIGHT_LAMP.id}`}
                      className="btn-secondary"
                    >
                      Inspect
                    </Link>
                    <button
                      type="button"
                      onClick={() => addToCart(SPOTLIGHT_LAMP, 1)}
                      className="btn-primary"
                    >
                      Add to Bag
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* SECTION 3: Featured / Selected Department Row */}
      <section aria-labelledby="featured-collection-heading" className="space-y-5">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 id="featured-collection-heading" className="heading-row m-0">
              {selectedCategory === 'All' ? 'Featured Collection' : selectedCategory}
            </h2>
            <p className="text-xs text-canvas-secondary m-0 tabular-nums">
              {selectedCategory === 'All'
                ? '4 curated highlights across all departments'
                : `${visibleFeatured.length} objects in ${selectedCategory}`}
            </p>
          </div>

          <Link
            href={
              selectedCategory === 'All'
                ? '/shop'
                : `/shop?category=${encodeURIComponent(selectedCategory)}`
            }
            aria-label="View full catalog"
            className="min-w-[44px] min-h-[44px] w-11 h-11 rounded-pill bg-pure-white border border-faint-border shadow-lg-soft flex items-center justify-center text-ink-black hover:border-ink-black transition-colors shrink-0"
          >
            <LineIcon name="chevron-right" size={18} />
          </Link>
        </div>

        <ProductGrid products={visibleFeatured} columns="4" />
      </section>

      {/* SECTION 4: New Releases Grid */}
      <section aria-labelledby="new-releases-heading" className="space-y-5">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 id="new-releases-heading" className="heading-row m-0">
              New Studio Releases
            </h2>
            <p className="text-xs text-canvas-secondary m-0">
              Latest machined brass, stoneware, and tactile carry additions
            </p>
          </div>

          <Link href="/shop?sort=newest" className="btn-secondary shrink-0">
            <span>Browse All</span>
            <LineIcon name="arrow-right" size={15} />
          </Link>
        </div>

        <ProductGrid products={newArrivals} columns="4" />
      </section>

      {/* SECTION 5: White Canvas Pillars & Studio Newsletter */}
      <section aria-label="Store commitments and updates">
        <div className="surface-card p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-image bg-canvas-mist border border-faint-border space-y-1.5">
              <p className="text-sm font-semibold text-ink-black m-0">
                Concentric White Canvas
              </p>
              <p className="text-xs text-canvas-secondary m-0 leading-relaxed">
                Clean studio geometry designed to foreground product craft without visual noise.
              </p>
            </div>
            <div className="p-4 rounded-image bg-canvas-mist border border-faint-border space-y-1.5">
              <p className="text-sm font-semibold text-ink-black m-0">
                Free Delivery at $75
              </p>
              <p className="text-xs text-canvas-secondary m-0 leading-relaxed">
                Live bag shipping progress bar calculates threshold automatically ($8 flat under $75).
              </p>
            </div>
            <div className="p-4 rounded-image bg-canvas-mist border border-faint-border space-y-1.5">
              <p className="text-sm font-semibold text-ink-black m-0">
                Local Session State
              </p>
              <p className="text-xs text-canvas-secondary m-0 leading-relaxed">
                Cart, account demo, and sample orders persist cleanly across browser reloads.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-3">
            <div className="space-y-1">
              <h2 className="text-lg font-semibold tracking-[-0.04em] text-ink-black m-0">
                Studio Release Notes
              </h2>
              <p className="text-xs text-muted-gray m-0">
                Demo email opt-in for new object drops (stored client-side only).
              </p>
            </div>
            <NewsletterForm />
          </div>
        </div>
      </section>
    </div>
  );
}
