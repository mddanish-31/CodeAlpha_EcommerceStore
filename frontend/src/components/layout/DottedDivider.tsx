import React from 'react';

export function DottedDivider({ className = '' }: { className?: string }) {
  return <hr className={`divider-dotted ${className}`} />;
}
