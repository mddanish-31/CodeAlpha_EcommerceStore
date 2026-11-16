export type IconName =
  | 'bag'
  | 'search'
  | 'user'
  | 'menu'
  | 'close'
  | 'check'
  | 'alert'
  | 'arrow-right'
  | 'chevron-right'
  | 'eye'
  | 'eye-off'
  | 'trash'
  | 'filter'
  | 'plus'
  | 'minus'
  | 'home'
  | 'grid'
  | 'info'
  | 'mail'
  | 'clock'
  | 'truck'
  | 'layers';

interface LineIconProps {
  name: IconName;
  size?: number;
  className?: string;
}

export function LineIcon({ name, size = 18, className = '' }: LineIconProps) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.75,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true as const,
    className,
  };

  switch (name) {
    case 'home':
      return (
        <svg {...common}>
          <path d="M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1h-5.5v-6.5h-5V21H4a1 1 0 0 1-1-1v-9.5z" />
        </svg>
      );
    case 'grid':
      return (
        <svg {...common}>
          <rect x="3" y="3" width="7.5" height="7.5" rx="2" />
          <rect x="13.5" y="3" width="7.5" height="7.5" rx="2" />
          <rect x="3" y="13.5" width="7.5" height="7.5" rx="2" />
          <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="2" />
        </svg>
      );
    case 'info':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <line x1="12" y1="16" x2="12" y2="11" />
          <circle cx="12" cy="7.5" r="0.6" fill="currentColor" />
        </svg>
      );
    case 'mail':
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="14" rx="2.5" />
          <path d="m4 7 8 6 8-6" />
        </svg>
      );
    case 'clock':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <polyline points="12 7 12 12 15 14" />
        </svg>
      );
    case 'bag':
      return (
        <svg {...common}>
          <path d="M6 8h12l1 12H5L6 8z" />
          <path d="M9 8V6a3 3 0 0 1 6 0v2" />
        </svg>
      );
    case 'search':
      return (
        <svg {...common}>
          <circle cx="11" cy="11" r="7" />
          <line x1="16.5" y1="16.5" x2="21" y2="21" />
        </svg>
      );
    case 'user':
      return (
        <svg {...common}>
          <circle cx="12" cy="8" r="4" />
          <path d="M4.5 20a7.5 7.5 0 0 1 15 0" />
        </svg>
      );
    case 'menu':
      return (
        <svg {...common}>
          <line x1="4" y1="7" x2="20" y2="7" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="17" x2="20" y2="17" />
        </svg>
      );
    case 'close':
      return (
        <svg {...common}>
          <line x1="6" y1="6" x2="18" y2="18" />
          <line x1="18" y1="6" x2="6" y2="18" />
        </svg>
      );
    case 'check':
      return (
        <svg {...common}>
          <polyline points="5 12.5 9.5 17 19 7.5" />
        </svg>
      );
    case 'alert':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <line x1="12" y1="8" x2="12" y2="13" />
          <circle cx="12" cy="16.5" r="0.6" fill="currentColor" />
        </svg>
      );
    case 'arrow-right':
      return (
        <svg {...common}>
          <line x1="4" y1="12" x2="19" y2="12" />
          <polyline points="13 6 19 12 13 18" />
        </svg>
      );
    case 'chevron-right':
      return (
        <svg {...common}>
          <polyline points="9 6 15 12 9 18" />
        </svg>
      );
    case 'eye':
      return (
        <svg {...common}>
          <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6z" />
          <circle cx="12" cy="12" r="2.8" />
        </svg>
      );
    case 'eye-off':
      return (
        <svg {...common}>
          <path d="M3 3l18 18" />
          <path d="M10.6 10.6a2.5 2.5 0 0 0 3.5 3.5" />
          <path d="M6.4 6.4C4.2 7.8 2.6 10 2 12c1.6 3.2 5 6 10 6 1.9 0 3.6-.5 5-1.3" />
          <path d="M9.9 4.2A10.6 10.6 0 0 1 12 4c5 0 8.4 2.8 10 6-.6 1.2-1.5 2.4-2.6 3.4" />
        </svg>
      );
    case 'trash':
      return (
        <svg {...common}>
          <polyline points="4 7 20 7" />
          <path d="M9 7V4h6v3" />
          <path d="M6 7l1 13h10l1-13" />
        </svg>
      );
    case 'filter':
      return (
        <svg {...common}>
          <line x1="4" y1="6" x2="20" y2="6" />
          <line x1="7" y1="12" x2="17" y2="12" />
          <line x1="10" y1="18" x2="14" y2="18" />
        </svg>
      );
    case 'plus':
      return (
        <svg {...common}>
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      );
    case 'minus':
      return (
        <svg {...common}>
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      );
    case 'truck':
      return (
        <svg {...common}>
          <rect x="2" y="6" width="12" height="10" rx="1.5" />
          <path d="M14 9h4.5L21 12v4h-7V9Z" />
          <circle cx="6.5" cy="18" r="1.75" />
          <circle cx="17.5" cy="18" r="1.75" />
        </svg>
      );
    case 'layers':
      return (
        <svg {...common}>
          <polygon points="12 3 3 8 12 13 21 8 12 3" />
          <polyline points="3 12.5 12 17.5 21 12.5" />
          <polyline points="3 17 12 22 21 17" />
        </svg>
      );
  }
}
