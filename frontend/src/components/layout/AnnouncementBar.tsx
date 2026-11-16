export function AnnouncementBar() {
  return (
    <div className="bg-ink text-surface py-2 px-4 text-center text-xs sm:text-[13px]">
      <div className="store-container flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
        <span className="inline-flex items-center gap-2 font-medium">
          <span
            className="w-2 h-2 rounded-pill bg-brand-violet shrink-0"
            aria-hidden="true"
          />
          <span>Free shipping on orders above $75</span>
        </span>
        <span className="hidden sm:inline text-muted" aria-hidden="true">
          ·
        </span>
        <span className="text-surface-subtle">
          $8 flat standard shipping below $75 · Local demo storefront
        </span>
      </div>
    </div>
  );
}
