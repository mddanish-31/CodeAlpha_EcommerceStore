import React from 'react';

export type BadgeTone = 'gold' | 'spice' | 'charred' | 'alert';

export function PillBadge({
  tone = 'gold',
  children,
  className = '',
}: {
  tone?: BadgeTone;
  children: React.ReactNode;
  className?: string;
}) {
  const toneClass =
    tone === 'gold'
      ? 'badge-gold'
      : tone === 'alert'
      ? 'badge-alert'
      : tone === 'charred'
      ? 'badge-charred'
      : 'badge-spice';

  return <span className={`badge ${toneClass} ${className}`}>{children}</span>;
}
