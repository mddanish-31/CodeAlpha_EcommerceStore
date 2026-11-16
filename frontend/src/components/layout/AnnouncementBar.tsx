export function AnnouncementBar() {
  return (
    <div className="bg-surface border-b border-border">
      <div className="store-container flex flex-wrap items-center justify-center gap-x-3 gap-y-1 px-4 py-2">
        <span className="inline-flex items-center gap-2 font-medium text-ink-secondary">
          <span className="w-2 h-2 rounded-pill bg-accent shrink-0" aria-hidden="true" />
          <span>Free shipping on orders above $75</span>
        </span>
        <span className="hidden sm:inline text-ink-muted" aria-hidden="true">
          ·
        </span>
        <span className="text-ink-secondary">
          $8 flat standard shipping below $75 · Local demo storefront
        </span>
      </div>
    </div>
  );
}
