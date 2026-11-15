import type { Product } from '@/types/store';
import { LineIcon } from '@/components/ui/LineIcon';

export function ProductSpecsAccordion({ product }: { product: Product }) {
  const specEntries = Object.entries(product.specs);

  return (
    <div className="surface-card overflow-hidden divide-y divide-faint-border">
      <details name="pdp-details" open className="group">
        <summary className="list-none cursor-pointer flex items-center justify-between gap-4 px-6 py-4 text-sm font-medium text-ink-black hover:bg-canvas-mist transition-colors">
          <span>Specifications &amp; Dimensions</span>
          <span className="text-slate-ink transition-transform duration-200 group-open:rotate-45">
            <LineIcon name="plus" size={16} />
          </span>
        </summary>
        <div className="px-6 pb-5 pt-1 text-sm text-muted-gray space-y-2 leading-relaxed">
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 m-0">
            {specEntries.map(([key, val]) => (
              <div key={key} className="flex items-baseline justify-between sm:block border-b border-faint-border pb-1.5 sm:border-b-0 sm:pb-0">
                <dt className="text-xs font-medium text-ink-black">{key}</dt>
                <dd className="m-0 text-xs text-muted-gray">{val}</dd>
              </div>
            ))}
          </dl>
        </div>
      </details>

      <details name="pdp-details" className="group">
        <summary className="list-none cursor-pointer flex items-center justify-between gap-4 px-6 py-4 text-sm font-medium text-ink-black hover:bg-canvas-mist transition-colors">
          <span>Materials &amp; Care Instructions</span>
          <span className="text-slate-ink transition-transform duration-200 group-open:rotate-45">
            <LineIcon name="plus" size={16} />
          </span>
        </summary>
        <div className="px-6 pb-5 pt-1 text-sm text-muted-gray leading-relaxed">
          <p className="m-0">{product.materialsCare}</p>
        </div>
      </details>

      <details name="pdp-details" className="group">
        <summary className="list-none cursor-pointer flex items-center justify-between gap-4 px-6 py-4 text-sm font-medium text-ink-black hover:bg-canvas-mist transition-colors">
          <span>Shipping &amp; Returns</span>
          <span className="text-slate-ink transition-transform duration-200 group-open:rotate-45">
            <LineIcon name="plus" size={16} />
          </span>
        </summary>
        <div className="px-6 pb-5 pt-1 text-sm text-muted-gray leading-relaxed space-y-1.5">
          <p className="m-0">{product.shippingReturns}</p>
          <p className="m-0 text-xs">
            Preview catalog item (`SKU {product.sku}`): static demo fixtures with local browser storage state until Phase 5 backend APIs.
          </p>
        </div>
      </details>
    </div>
  );
}
