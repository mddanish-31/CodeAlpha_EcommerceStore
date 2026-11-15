import React from 'react';
import { PillBadge } from '@/components/ui/PillBadge';

export function AnnouncementBar() {
  return (
    <div
      role="region"
      aria-label="Storefront Status Announcement"
      className="bg-charred-clove border-b border-dotted border-tiger-gold px-4 py-2 text-center text-[11px] font-semibold tracking-wider uppercase text-tiger-gold flex items-center justify-center gap-3 flex-wrap"
    >
      <PillBadge tone="gold">CODEALPHA INTERNSHIP</PillBadge>
      <span>
        SIMPLE E-COMMERCE STORE • FREE STANDARD SHIPPING ON ORDERS OVER $75 • SAMPLE DEMO CATALOG
      </span>
    </div>
  );
}
