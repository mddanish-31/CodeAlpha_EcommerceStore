export type BadgeTone =
  | 'dark'
  | 'light'
  | 'violet-subtle'
  | 'soldout'
  | 'neutral';

interface PillBadgeProps {
  label: string;
  tone?: BadgeTone;
  className?: string;
}

const TONE_MAP: Record<BadgeTone, string> = {
  dark: 'bg-ink-black text-pure-white border border-ink-black',
  light: 'bg-pure-white text-ink-black border border-faint-border shadow-sm-soft',
  'violet-subtle': 'bg-violet-wash/35 text-ink-black border border-shop-violet/35',
  soldout: 'bg-pure-white text-slate-ink border border-ink-black/40',
  neutral: 'bg-canvas-mist text-slate-ink border border-faint-border',
};

export function PillBadge({ label, tone = 'light', className = '' }: PillBadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-pill text-[11px] font-medium tracking-[-0.01em] uppercase leading-none ${TONE_MAP[tone]} ${className}`}
    >
      {label}
    </span>
  );
}
