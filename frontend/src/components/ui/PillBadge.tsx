export type BadgeTone = 'accent' | 'subtle' | 'soldout' | 'neutral';

interface PillBadgeProps {
  label: string;
  tone?: BadgeTone;
  className?: string;
}

const TONE_MAP: Record<BadgeTone, string> = {
  accent: 'bg-accent text-surface border border-accent',
  subtle: 'bg-surface-subtle text-ink-secondary border border-border',
  soldout: 'bg-surface-subtle text-ink-secondary border border-border',
  neutral: 'bg-surface-subtle text-ink-secondary border border-border',
};

export function PillBadge({ label, tone = 'neutral', className = '' }: PillBadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-pill text-[11px] font-semibold tracking-wide uppercase leading-none ${TONE_MAP[tone]} ${className}`}
    >
      {label}
    </span>
  );
}
