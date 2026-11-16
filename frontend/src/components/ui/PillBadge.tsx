export type BadgeTone =
  | 'dark'
  | 'light'
  | 'violet'
  | 'soldout'
  | 'neutral';

interface PillBadgeProps {
  label: string;
  tone?: BadgeTone;
  className?: string;
}

const TONE_MAP: Record<BadgeTone, string> = {
  dark: 'bg-ink text-surface border border-ink',
  light: 'bg-surface text-ink border border-border-default shadow-card-subtle',
  violet: 'bg-violet-soft text-brand-dark border border-violet-border',
  soldout: 'bg-surface-subtle text-ink-secondary border border-border-default',
  neutral: 'bg-surface-subtle text-ink-secondary border border-border-default',
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
