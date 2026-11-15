import React from 'react';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs';
import { PillBadge } from '@/components/ui/PillBadge';
import { DottedDivider } from '@/components/layout/DottedDivider';
import { LineIcon } from '@/components/ui/LineIcon';

export default function AboutPage() {
  return (
    <div className="store-container py-10 sm:py-14 space-y-12">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'About the Storefront' },
        ]}
      />

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 min-w-0">
          <div className="flex flex-wrap gap-2 mb-4">
            <PillBadge tone="gold">EDITORIAL CRAFT MARKET</PillBadge>
            <PillBadge tone="spice">CODEALPHA FULL STACK INTERNSHIP</PillBadge>
          </div>
          <h1 className="heading-xl">
            DESIGNED FOR
            <br />
            CLARITY &amp; CRAFT
          </h1>
          <p className="text-sm sm:text-base text-parchment-cream leading-relaxed mt-5 max-w-2xl">
            <strong>Simple E-commerce Store</strong> is a full-stack e-commerce web application developed for the <strong>CodeAlpha Full Stack Development Internship</strong> by MD Danish Raza (<code>@mddanish-31</code>).
          </p>
          <p className="text-sm text-warm-sand leading-relaxed mt-3 max-w-2xl">
            Our storefront pairs an editorial warm-monochrome visual identity—built on Ember Rust (<code>#823513</code>), Dark Spice (<code>#402011</code>), Charred Clove (<code>#281006</code>), and Tiger Gold (<code>#FAAE33</code>)—with accessible catalog filtering, instant cart management, and responsive ergonomics.
          </p>
          <div className="flex flex-wrap gap-3 mt-7">
            <Link href="/shop" className="btn btn-primary">
              <span>Explore Catalog</span>
              <LineIcon name="arrow-right" size={16} />
            </Link>
            <Link href="/contact" className="btn btn-ghost">
              Contact &amp; Support
            </Link>
          </div>
        </div>

        <div className="lg:col-span-5 surface-card border-tiger-gold p-6 space-y-4">
          <h2 className="heading-card text-tiger-gold">
            PROJECT ARCHITECTURE SUMMARY
          </h2>
          <ul className="space-y-3 text-xs text-parchment-cream">
            <li className="pb-2.5 border-b border-dotted border-tiger-gold/40">
              <strong className="text-tiger-gold block">
                Frontend (Implemented in Phase 4B):
              </strong>
              Next.js App Router, React, TypeScript, Tailwind CSS, local self-hosted <code>Antonio</code> &amp; <code>Inter</code> typography, and accessible native HTML <code>&lt;dialog&gt;</code>, <code>&lt;details&gt;</code>, and <code>&lt;search&gt;</code> landmarks.
            </li>
            <li className="pb-2.5 border-b border-dotted border-tiger-gold/40">
              <strong className="text-tiger-gold block">
                Backend REST API (Planned — Phase 5):
              </strong>
              Node.js + Express.js modular controllers, input validation, and JWT authentication.
            </li>
            <li>
              <strong className="text-tiger-gold block">
                Database Persistence (Planned — Phase 6):
              </strong>
              MongoDB Atlas + Mongoose schemas for Users, Products, Carts, and Orders.
            </li>
          </ul>
        </div>
      </section>

      <DottedDivider />

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="surface-card p-6">
          <PillBadge tone="gold">01 // TYPOGRAPHY</PillBadge>
          <h3 className="heading-card mt-3">POSTER-SCALE HIERARCHY</h3>
          <p className="text-xs text-warm-sand mt-2 leading-relaxed">
            Condensed uppercase <code>Antonio</code> display headlines anchor each viewport, while <code>Inter</code> with tabular numerals ensures effortless reading of product specs and prices.
          </p>
        </div>

        <div className="surface-card p-6">
          <PillBadge tone="gold">02 // SURFACES</PillBadge>
          <h3 className="heading-card mt-3">ZERO-SHADOW 3-TIER DEPTH</h3>
          <p className="text-xs text-warm-sand mt-2 leading-relaxed">
            Elevation is communicated purely through warm surface progression (<code>#823513</code> → <code>#402011</code> → <code>#281006</code>) and crisp <code>1px</code> borders.
          </p>
        </div>

        <div className="surface-card p-6">
          <PillBadge tone="gold">03 // ACCESSIBILITY</PillBadge>
          <h3 className="heading-card mt-3">WCAG 2.1 AA COMPLIANT</h3>
          <p className="text-xs text-warm-sand mt-2 leading-relaxed">
            Every interactive control enforces a minimum <code>44px × 44px</code> touch target and an explicit <code>2px solid #FAAE33</code> keyboard focus ring.
          </p>
        </div>
      </section>
    </div>
  );
}

