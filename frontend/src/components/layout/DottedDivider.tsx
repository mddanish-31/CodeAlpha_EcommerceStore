export function DottedDivider({ className = '' }: { className?: string }) {
  return (
    <div
      className={`hairline-rule ${className}`}
      role="separator"
      aria-hidden="true"
    />
  );
}
