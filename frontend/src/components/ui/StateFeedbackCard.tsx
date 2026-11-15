import React from 'react';
import Link from 'next/link';
import { LineIcon } from './LineIcon';
import { PillBadge } from './PillBadge';

export function StateFeedbackCard({
  status,
  badgeText,
  title,
  message,
  actionLabel,
  actionHref,
  onAction,
}: {
  status: 'loading' | 'empty' | 'error' | 'success';
  badgeText?: string;
  title: string;
  message: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
}) {
  const isError = status === 'error';
  const isSuccess = status === 'success';

  return (
    <div
      role={isError ? 'alert' : 'status'}
      className={`rounded-card p-8 text-center border ${
        isError
          ? 'bg-charred-clove border-chili-red'
          : isSuccess
          ? 'bg-charred-clove border-tiger-gold'
          : 'bg-dark-spice border-cardamom-brown'
      }`}
    >
      <div className="flex justify-center mb-4">
        <PillBadge tone={isError ? 'alert' : isSuccess ? 'gold' : 'spice'}>
          {badgeText || status.toUpperCase()}
        </PillBadge>
      </div>

      <div className="flex justify-center mb-3 text-tiger-gold">
        <LineIcon
          name={
            isError
              ? 'alert'
              : isSuccess
              ? 'check'
              : status === 'empty'
              ? 'bag'
              : 'search'
          }
          size={28}
        />
      </div>

      <h3 className="heading-card text-tiger-gold mb-2">{title}</h3>
      <p className="text-sm text-warm-sand max-w-md mx-auto mb-6">{message}</p>

      {actionLabel && actionHref && (
        <Link href={actionHref} className="btn btn-primary">
          <span>{actionLabel}</span>
          <LineIcon name="arrow-right" size={16} />
        </Link>
      )}

      {actionLabel && onAction && !actionHref && (
        <button type="button" onClick={onAction} className="btn btn-primary">
          <span>{actionLabel}</span>
        </button>
      )}
    </div>
  );
}
