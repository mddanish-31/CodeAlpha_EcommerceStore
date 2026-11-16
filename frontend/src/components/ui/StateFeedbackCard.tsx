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
      <div className="w-12 h-12 rounded-pill bg-surface-subtle border border-border text-ink-secondary flex items-center justify-center">
        <LineIcon name={icon} size={22} />
      </div>
      <div className="space-y-1.5">
        <h2 className="heading-sub m-0">{title}</h2>
        <p className="text-sm text-ink-muted max-w-md mx-auto m-0 leading-relaxed">
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
