import Link from 'next/link';
import { LineIcon } from './LineIcon';

interface StateFeedbackCardProps {
  icon?: 'alert' | 'check' | 'search' | 'bag' | 'user';
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  actionHref?: string;
}

export function StateFeedbackCard({
  icon = 'search',
  title,
  description,
  actionLabel,
  onAction,
  actionHref,
}: StateFeedbackCardProps) {
  return (
    <div className="surface-card p-8 sm:p-10 text-center flex flex-col items-center justify-center gap-4 max-w-lg mx-auto">
      <div className="w-12 h-12 rounded-pill bg-canvas-mist border border-faint-border text-ink-black flex items-center justify-center">
        <LineIcon name={icon} size={22} />
      </div>
      <div className="space-y-1.5">
        <h3 className="text-lg font-semibold tracking-[-0.04em] text-ink-black">
          {title}
        </h3>
        <p className="text-sm text-muted-gray max-w-md mx-auto">
          {description}
        </p>
      </div>
      {actionLabel && actionHref ? (
        <Link href={actionHref} className="btn-primary mt-1">
          {actionLabel}
        </Link>
      ) : null}
      {actionLabel && onAction && !actionHref ? (
        <button type="button" onClick={onAction} className="btn-primary mt-1">
          {actionLabel}
        </button>
      ) : null}
    </div>
  );
}
