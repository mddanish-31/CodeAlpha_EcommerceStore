export function AnnouncementBar() {
  return (
    <div className="bg-pure-white border-b border-faint-border min-h-[44px] py-2 px-4 flex items-center justify-center">
      <div className="store-container flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center text-xs tracking-[-0.01em] text-slate-ink">
        <span className="inline-flex items-center gap-2 font-medium text-ink-black">
          <span
            className="w-2 h-2 rounded-pill bg-shop-violet shrink-0"
            aria-hidden="true"
          />
          <span>Free shipping on orders over $75</span>
        </span>
        <span className="hidden sm:inline text-muted-gray" aria-hidden="true">
          ·
        </span>
        <span className="text-slate-ink">
          CodeAlpha Storefront — Static Demo Catalog &amp; Browser-Saved Cart
        </span>
      </div>
    </div>
  );
}
