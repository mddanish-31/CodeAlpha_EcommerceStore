import React from 'react';

export type IconName =
  | 'bag'
  | 'search'
  | 'user'
  | 'menu'
  | 'close'
  | 'check'
  | 'alert'
  | 'arrow-right'
  | 'eye'
  | 'eye-off'
  | 'trash'
  | 'filter'
  | 'plus'
  | 'minus';

export function LineIcon({
  name,
  size = 18,
  className = '',
}: {
  name: IconName;
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={`shrink-0 ${className}`}
    >
      {name === 'bag' && (
        <>
          <path d="M6 7h12l1 13H5L6 7z" />
          <path d="M9 7V5a3 3 0 0 1 6 0v2" />
        </>
      )}
      {name === 'search' && (
        <>
          <circle cx="11" cy="11" r="7" />
          <line x1="20" y1="20" x2="16.2" y2="16.2" />
        </>
      )}
      {name === 'user' && (
        <>
          <circle cx="12" cy="8" r="4" />
          <path d="M4 20c1.8-3.8 5-6 8-6s6.2 2.2 8 6" />
        </>
      )}
      {name === 'menu' && (
        <>
          <line x1="4" y1="7" x2="20" y2="7" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="17" x2="20" y2="17" />
        </>
      )}
      {name === 'close' && (
        <>
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </>
      )}
      {name === 'check' && <polyline points="20 6 9 17 4 12" />}
      {name === 'alert' && (
        <>
          <circle cx="12" cy="12" r="9" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </>
      )}
      {name === 'arrow-right' && (
        <>
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="13 6 19 12 13 18" />
        </>
      )}
      {name === 'eye' && (
        <>
          <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7z" />
          <circle cx="12" cy="12" r="3" />
        </>
      )}
      {name === 'eye-off' && (
        <>
          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 19c-6.4 0-10-7-10-7a18.45 18.45 0 0 1 5.06-5.94" />
          <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c6.4 0 10 7 10 7a18.5 18.5 0 0 1-2.16 3.19" />
          <line x1="2" y1="2" x2="22" y2="22" />
        </>
      )}
      {name === 'trash' && (
        <>
          <polyline points="3 6 5 6 21 6" />
          <path d="M19 6l-1 14H6L5 6" />
          <path d="M10 11v6" />
          <path d="M14 11v6" />
          <path d="M9 6V4h6v2" />
        </>
      )}
      {name === 'filter' && (
        <>
          <line x1="4" y1="6" x2="20" y2="6" />
          <line x1="7" y1="12" x2="17" y2="12" />
          <line x1="10" y1="18" x2="14" y2="18" />
        </>
      )}
      {name === 'plus' && (
        <>
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </>
      )}
      {name === 'minus' && <line x1="5" y1="12" x2="19" y2="12" />}
    </svg>
  );
}
