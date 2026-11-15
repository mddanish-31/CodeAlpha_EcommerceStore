import type { Product } from '@/types/store';

export type StudioStageTone = 'mist' | 'stone' | 'slate' | 'ash';

interface StageConfig {
  bgClass: string;
  darkBackdrop: boolean;
}

const STAGE_BY_SVG: Record<string, StageConfig> = {
  lamp: { bgClass: 'bg-canvas-mist', darkBackdrop: false },
  watch: { bgClass: 'bg-slate-ink', darkBackdrop: true },
  kettle: { bgClass: 'bg-ash-veil', darkBackdrop: true },
  tote: { bgClass: 'bg-faint-border', darkBackdrop: false },
  keyboard: { bgClass: 'bg-slate-ink', darkBackdrop: true },
  stands: { bgClass: 'bg-canvas-mist', darkBackdrop: false },
  pen: { bgClass: 'bg-faint-border', darkBackdrop: false },
  pouch: { bgClass: 'bg-ash-veil', darkBackdrop: true },
  clock: { bgClass: 'bg-canvas-mist', darkBackdrop: false },
  carafe: { bgClass: 'bg-faint-border', darkBackdrop: false },
  jacket: { bgClass: 'bg-slate-ink', darkBackdrop: true },
  folio: { bgClass: 'bg-ash-veil', darkBackdrop: true },
};

export function getProductStage(svgId: Product['imageSvgId']): StageConfig {
  return STAGE_BY_SVG[svgId] ?? STAGE_BY_SVG.lamp;
}

interface ProductIllustrationProps {
  svgId: Product['imageSvgId'];
  className?: string;
  darkBackdrop?: boolean;
}

export function ProductIllustration({
  svgId,
  className = 'w-28 h-28',
  darkBackdrop,
}: ProductIllustrationProps) {
  const isDark = darkBackdrop ?? getProductStage(svgId).darkBackdrop;
  const primary = isDark ? '#FFFFFF' : '#332F2D';
  const secondary = isDark ? '#ACB0AA' : '#665A54';
  const highlight = isDark ? '#CCCCCC' : '#ACB0AA';
  const handStroke = isDark ? '#332F2D' : '#FFFFFF';

  const common = {
    viewBox: '0 0 160 160',
    fill: 'none',
    'aria-hidden': true as const,
    className,
  };

  switch (svgId) {
    case 'watch':
      return (
        <svg {...common}>
          <rect x="64" y="20" width="32" height="120" rx="10" fill={secondary} />
          <circle cx="80" cy="80" r="34" fill={primary} />
          <circle cx="80" cy="80" r="24" fill={highlight} />
          <path d="M80 62v18l12 8" stroke={handStroke} strokeWidth="4" strokeLinecap="round" fill="none" />
        </svg>
      );
    case 'kettle':
      return (
        <svg {...common}>
          <path d="M54 58h52l8 54H46l8-54Z" fill={primary} />
          <path d="M106 72c18 0 22 24 8 34" stroke={secondary} strokeWidth="7" strokeLinecap="round" fill="none" />
          <path d="M50 102c-16-8-22-26-26-44" stroke={highlight} strokeWidth="6" strokeLinecap="round" fill="none" />
          <rect x="64" y="46" width="32" height="10" rx="4" fill={secondary} />
        </svg>
      );
    case 'tote':
      return (
        <svg {...common}>
          <path d="M60 54V42c0-10 8-18 20-18s20 8 20 18v12" stroke={secondary} strokeWidth="7" fill="none" />
          <rect x="40" y="54" width="80" height="72" rx="12" fill={primary} />
          <rect x="54" y="74" width="52" height="30" rx="6" fill={highlight} />
        </svg>
      );
    case 'keyboard':
      return (
        <svg {...common}>
          <rect x="24" y="54" width="112" height="52" rx="10" fill={primary} />
          <rect x="34" y="64" width="92" height="12" rx="3" fill={highlight} />
          <rect x="34" y="82" width="60" height="12" rx="3" fill={secondary} />
          <rect x="98" y="82" width="28" height="12" rx="3" fill={highlight} />
        </svg>
      );
    case 'stands':
      return (
        <svg {...common}>
          <path d="M32 62h38l8 52H26l6-52Z" fill={primary} />
          <path d="M90 62h38l6 52H82l8-52Z" fill={secondary} />
          <rect x="28" y="114" width="48" height="8" rx="4" fill={highlight} />
          <rect x="84" y="114" width="48" height="8" rx="4" fill={highlight} />
        </svg>
      );
    case 'pen':
      return (
        <svg {...common}>
          <rect x="70" y="28" width="20" height="92" rx="8" fill={primary} />
          <path d="M70 116l10 20 10-20H70Z" fill={secondary} />
          <rect x="86" y="42" width="8" height="32" rx="4" fill={highlight} />
        </svg>
      );
    case 'pouch':
      return (
        <svg {...common}>
          <rect x="34" y="48" width="92" height="64" rx="14" fill={primary} />
          <rect x="34" y="72" width="92" height="6" fill={highlight} />
          <circle cx="102" cy="75" r="5" fill={secondary} />
        </svg>
      );
    case 'clock':
      return (
        <svg {...common}>
          <circle cx="80" cy="80" r="46" fill={primary} />
          <circle cx="80" cy="80" r="36" fill={highlight} />
          <path d="M80 54v26l16 10" stroke={handStroke} strokeWidth="5" strokeLinecap="round" fill="none" />
        </svg>
      );
    case 'carafe':
      return (
        <svg {...common}>
          <path d="M62 34h36l6 24 10 58H46l10-58 6-24Z" fill={primary} />
          <rect x="52" y="96" width="56" height="22" rx="8" fill={highlight} />
        </svg>
      );
    case 'jacket':
      return (
        <svg {...common}>
          <path d="M52 38h56l20 26-14 14-8-10v56H54V68l-8 10-14-14 20-26Z" fill={primary} />
          <rect x="64" y="74" width="32" height="36" rx="4" fill={secondary} />
        </svg>
      );
    case 'folio':
      return (
        <svg {...common}>
          <rect x="44" y="34" width="72" height="92" rx="10" fill={primary} />
          <rect x="96" y="54" width="24" height="28" rx="6" fill={highlight} />
          <circle cx="108" cy="68" r="4" fill={secondary} />
        </svg>
      );
    case 'lamp':
    default:
      return (
        <svg {...common}>
          <path d="M56 36h48l16 32H40l16-32Z" fill={primary} />
          <rect x="76" y="68" width="8" height="44" rx="2" fill={secondary} />
          <rect x="52" y="112" width="56" height="10" rx="5" fill={primary} />
          <circle cx="102" cy="84" r="5" fill={highlight} />
        </svg>
      );
  }
}
