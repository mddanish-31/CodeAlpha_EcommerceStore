export function DottedDivider({ className = '' }: { className?: string }) {
  return (
    <div
      className={`h-px w-full bg-border ${className}`}
      role="separator"
      aria-hidden="true"
    />
  );
}
