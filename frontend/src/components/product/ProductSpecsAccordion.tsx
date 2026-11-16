import type { Product } from '@/types/store';
import { LineIcon } from '@/components/ui/LineIcon';

export function ProductSpecsAccordion({ product }: { product: Product }) {
  const specEntries = Object.entries(product.specs);

  return (
    <div className="surface-card overflow-hidden divide-y divide-border-default">
      <details name="pdp-details" open className="group">
        <summary className="list-none cursor-pointer flex items-center justify-between gap-4 px-6 py-4 text-sm font-semibold text-ink hover:bg-page-bg transition-colors">
          <span>Specifications &amp; Dimensions</span>
          <span className="text-brand-violet transition-transform duration-200 group-open:rotate-45">
            <LineIcon name="plus" size={16} />
          </span>
        </summary>
        <div className="px-6 pb-5 pt-1 text-sm text-muted space-y-2 leading-relaxed">
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 m-0">
            {specEntries.map(([key, val]) => (
              <div
                key={key}
                className="flex items-baseline justify-between sm:block border-b border-border-default pb-2 sm:border-b-0 sm:pb-0"
              >
                <dt className="text-xs font-semibold text-ink">{key}</dt>
                <dd className="m-0 text-xs text-muted">{val}</dd>
              </div>
            ))}
          </dl>
        </div>
      </details>

      <details name="pdp-details" className="group">
        <summary className="list-none cursor-pointer flex items-center justify-between gap-4 px-6 py-4 text-sm font-semibold text-ink hover:bg-page-bg transition-colors">
          <span>Materials &amp; Care Instructions</span>
          <span className="text-brand-violet transition-transform duration-200 group-open:rotate-45">
            <LineIcon name="plus" size={16} />
          </span>
        </summary>
        <div className="px-6 pb-5 pt-1 text-sm text-muted leading-relaxed">
          <p className="m-0">{product.materialsCare}</p>
        </div>
      </details>

      <details name="pdp-details" className="group">
        <summary className="list-none cursor-pointer flex items-center justify-between gap-4 px-6 py-4 text-sm font-semibold text-ink hover:bg-page-bg transition-colors">
          <span>Shipping &amp; Returns</span>
          <span className="text-brand-violet transition-transform duration-200 group-open:rotate-45">
            <LineIcon name="plus" size={16} />
          </span>
        </summary>
        <div className="px-6 pb-5 pt-1 text-sm text-muted leading-relaxed space-y-1.5">
          <p className="m-0">{product.shippingReturns}</p>
          <p className="m-0 text-xs">
            Catalog demo item (`SKU {product.sku}`): client-side simulation stored in browser storage until backend API integration.
          </p>
        </div>
      </details>
    </div>
  );
}
