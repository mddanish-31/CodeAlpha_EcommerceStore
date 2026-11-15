import React from 'react';
import Link from 'next/link';
import { PillBadge } from '@/components/ui/PillBadge';
import { LineIcon } from '@/components/ui/LineIcon';

export default function NotFound() {
  return (
    <div className="store-container py-16 sm:py-24 text-center">
      <div className="max-w-xl mx-auto surface-card border-tiger-gold p-8 sm:p-12">
        <div className="flex justify-center mb-4">
          <PillBadge tone="alert">HTTP 404 // ROUTE NOT FOUND</PillBadge>
        </div>

        <h1 className="display-hero mb-2">404</h1>
        <h2 className="heading-card text-parchment-cream mb-3">
          PAGE LOST IN THE BAZAAR
        </h2>
        <p className="text-xs sm:text-sm text-warm-sand mb-8 leading-relaxed">
          The product or page you requested could not be found in the Simple E-commerce Store catalog.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/shop" className="btn btn-primary w-full sm:w-auto">
            <span>Browse All Products</span>
            <LineIcon name="arrow-right" size={16} />
          </Link>
          <Link href="/" className="btn btn-ghost w-full sm:w-auto">
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
