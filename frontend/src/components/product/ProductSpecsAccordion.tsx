import React from 'react';
import { Product } from '@/types/store';

export function ProductSpecsAccordion({ product }: { product: Product }) {
  return (
    <div className="border-t border-dotted border-tiger-gold mt-5">
      <details
        {...({ name: 'pdp-specs' } as Record<string, string>)}
        open
        className="border-b border-dotted border-tiger-gold py-3.5"
      >
        <summary className="list-none flex items-center justify-between cursor-pointer text-xs font-semibold uppercase tracking-wider text-tiger-gold py-1">
          <span>01 // Specifications &amp; Dimensions</span>
          <span aria-hidden="true">+</span>
        </summary>
        <div className="pt-3 text-xs text-parchment-cream leading-relaxed grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {Object.entries(product.specs).map(([key, val]) => (
            <div key={key}>
              <strong className="text-warm-sand">{key}:</strong> {val}
            </div>
          ))}
        </div>
      </details>

      <details
        {...({ name: 'pdp-specs' } as Record<string, string>)}
        className="border-b border-dotted border-tiger-gold py-3.5"
      >
        <summary className="list-none flex items-center justify-between cursor-pointer text-xs font-semibold uppercase tracking-wider text-tiger-gold py-1">
          <span>02 // Materials &amp; Care</span>
          <span aria-hidden="true">+</span>
        </summary>
        <div className="pt-3 text-xs text-parchment-cream leading-relaxed">
          {product.materialsCare}
        </div>
      </details>

      <details
        {...({ name: 'pdp-specs' } as Record<string, string>)}
        className="border-b border-dotted border-tiger-gold py-3.5"
      >
        <summary className="list-none flex items-center justify-between cursor-pointer text-xs font-semibold uppercase tracking-wider text-tiger-gold py-1">
          <span>03 // Shipping &amp; 30-Day Returns</span>
          <span aria-hidden="true">+</span>
        </summary>
        <div className="pt-3 text-xs text-parchment-cream leading-relaxed">
          {product.shippingReturns}
        </div>
      </details>
    </div>
  );
}
