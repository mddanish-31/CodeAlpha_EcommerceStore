import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs';
import { LineIcon } from '@/components/ui/LineIcon';

export const metadata: Metadata = {
  title: 'About Simple Store',
  description:
    'White Canvas Commerce philosophy, studio departments, and CodeAlpha internship engineering scope.',
};

export default function AboutPage() {
  return (
    <div className="store-container pt-6 sm:pt-8 pb-8 space-y-10">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'About' },
        ]}
      />

      <header className="space-y-3 max-w-3xl">
        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-pill bg-pure-white border border-faint-border shadow-sm-soft text-xs font-medium text-slate-ink">
          <span className="w-2 h-2 rounded-pill bg-shop-violet" aria-hidden="true" />
          <span>CodeAlpha Internship · Simple E-commerce Store</span>
        </span>
        <h1 className="display-hero m-0">
          Minimalist industrial goods, organized with quiet geometry.
        </h1>
        <p className="text-sm sm:text-base text-canvas-secondary leading-relaxed m-0">
          simple. brings together everyday carry tools, desk instruments, tactile drinkware, and utilitarian studio garments under a calm White Canvas Commerce interface.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <article className="surface-card p-6 space-y-2.5">
          <p className="text-xs font-medium text-muted-gray m-0">01 · Material Clarity</p>
          <h2 className="text-lg font-semibold tracking-[-0.04em] text-ink-black m-0">
            Tactile Hardware &amp; Craft
          </h2>
          <p className="text-sm text-muted-gray leading-relaxed m-0">
            Catalog fixtures highlight machined brass, bead-blasted steel, dry-waxed duck canvas, and raw matte stoneware without visual clutter.
          </p>
        </article>

        <article className="surface-card p-6 space-y-2.5">
          <p className="text-xs font-medium text-muted-gray m-0">02 · Concentric Geometry</p>
          <h2 className="text-lg font-semibold tracking-[-0.04em] text-ink-black m-0">
            White Canvas System
          </h2>
          <p className="text-sm text-muted-gray leading-relaxed m-0">
            Generous 28px white cards float above a soft Canvas Mist backdrop via dual-layer ambient shadows, with accessible contrast on every control.
          </p>
        </article>

        <article className="surface-card p-6 space-y-2.5">
          <p className="text-xs font-medium text-muted-gray m-0">03 · Honest Architecture</p>
          <h2 className="text-lg font-semibold tracking-[-0.04em] text-ink-black m-0">
            Frontend Scope First
          </h2>
          <p className="text-sm text-muted-gray leading-relaxed m-0">
            This Phase 4D storefront runs interactively in Next.js, TypeScript, and Tailwind CSS with local browser storage ahead of Phase 5 REST APIs.
          </p>
        </article>
      </div>

      <section className="surface-card-slate p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        <div className="lg:col-span-8 space-y-2.5">
          <span className="text-xs font-medium text-violet-wash">
            Architecture &amp; Stack Roadmap
          </span>
          <h2 className="display-section text-pure-white m-0">
            Prepared for Express.js &amp; MongoDB Atlas Integration
          </h2>
          <p className="text-sm text-faint-border max-w-2xl leading-relaxed m-0">
            Right now catalog items, demo sign-in, shopping bag items, and demo orders operate locally in your browser (`localStorage`). Phase 5 and Phase 6 will wire live backend endpoints, JWT authentication, and persistent Atlas records.
          </p>
        </div>
        <div className="lg:col-span-4 flex flex-wrap lg:justify-end gap-3">
          <Link href="/shop" className="btn-white">
            <span>Explore Catalog</span>
            <LineIcon name="arrow-right" size={16} />
          </Link>
          <Link href="/contact" className="btn-secondary">
            Contact &amp; FAQ
          </Link>
        </div>
      </section>
    </div>
  );
}
