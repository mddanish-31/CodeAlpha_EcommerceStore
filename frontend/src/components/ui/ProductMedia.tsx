'use client';

import { useState } from 'react';
import { LineIcon } from '@/components/ui/LineIcon';

interface ProductMediaProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  sizes?: string;
  fallbackLabel?: string;
}

export function ProductMedia({
  src,
  alt,
  width = 900,
  height = 900,
  className = '',
  imgClassName = '',
  priority = false,
  sizes,
  fallbackLabel,
}: ProductMediaProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`w-full h-full flex flex-col items-center justify-center gap-2 bg-surface-subtle text-ink-muted p-4 text-center ${className}`}
      >
        <LineIcon name="grid" size={24} className="text-ink-muted" />
        {fallbackLabel ? (
          <span className="text-xs font-medium text-ink-secondary">{fallbackLabel}</span>
        ) : null}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      fetchPriority={priority ? 'high' : undefined}
      loading={priority ? undefined : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      onError={() => setHasError(true)}
      className={`block w-full h-full object-cover ${imgClassName} ${className}`}
    />
  );
}

