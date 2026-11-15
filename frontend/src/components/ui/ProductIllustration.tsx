import React from 'react';

export function ProductIllustration({
  svgId,
  className = 'w-36 h-32',
}: {
  svgId: string;
  className?: string;
}) {
  switch (svgId) {
    case 'lamp':
      return (
        <svg viewBox="0 0 240 220" fill="none" className={className} aria-hidden="true">
          <ellipse cx="120" cy="196" rx="74" ry="10" fill="#402011" stroke="#FAAE33" strokeWidth="1.5" />
          <rect x="86" y="176" width="68" height="20" rx="4" fill="#823513" stroke="#FAAE33" strokeWidth="2" />
          <line x1="120" y1="176" x2="120" y2="68" stroke="#FAAE33" strokeWidth="5" />
          <circle cx="120" cy="68" r="8" fill="#281006" stroke="#FAAE33" strokeWidth="2.5" />
          <path d="M56 72 L184 72 L162 34 L78 34 Z" fill="#9F531B" stroke="#FAAE33" strokeWidth="2" />
          <path d="M74 74 L166 74 L182 118 L58 118 Z" fill="#FAAE33" fillOpacity="0.14" />
          <circle cx="138" cy="186" r="4" fill="#FAAE33" />
        </svg>
      );
    case 'watch':
      return (
        <svg viewBox="0 0 160 160" fill="none" className={className} aria-hidden="true">
          <rect x="64" y="14" width="32" height="132" rx="6" fill="#402011" stroke="#FAAE33" strokeWidth="2" />
          <circle cx="80" cy="80" r="42" fill="#281006" stroke="#FAAE33" strokeWidth="3" />
          <circle cx="80" cy="80" r="34" stroke="#9F531B" strokeWidth="1.5" strokeDasharray="4 4" />
          <line x1="80" y1="80" x2="80" y2="54" stroke="#FAAE33" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="80" y1="80" x2="102" y2="80" stroke="#FAAE33" strokeWidth="2" strokeLinecap="round" />
          <circle cx="80" cy="80" r="4" fill="#FAAE33" />
        </svg>
      );
    case 'kettle':
      return (
        <svg viewBox="0 0 180 150" fill="none" className={className} aria-hidden="true">
          <path d="M52 122 L128 122 L116 54 L64 54 Z" fill="#823513" stroke="#FAAE33" strokeWidth="2.5" />
          <path d="M72 54 L108 54 L102 42 L78 42 Z" fill="#402011" stroke="#FAAE33" strokeWidth="2" />
          <circle cx="90" cy="36" r="5" fill="#FAAE33" />
          <path d="M122 104 C146 100 148 56 164 50" stroke="#FAAE33" strokeWidth="3" strokeLinecap="round" />
          <path d="M58 64 C34 64 34 108 54 110" stroke="#FAAE33" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
    case 'tote':
      return (
        <svg viewBox="0 0 160 160" fill="none" className={className} aria-hidden="true">
          <rect x="36" y="54" width="88" height="82" rx="5" fill="#823513" stroke="#FAAE33" strokeWidth="2.5" />
          <path d="M58 54 V34 A22 22 0 0 1 102 34 V54" stroke="#FAAE33" strokeWidth="3" />
          <line x1="36" y1="112" x2="124" y2="112" stroke="#FAAE33" strokeWidth="1.5" strokeDasharray="4 4" />
          <rect x="66" y="72" width="28" height="24" rx="2" fill="#402011" stroke="#FAAE33" strokeWidth="1.5" />
        </svg>
      );
    case 'keyboard':
      return (
        <svg viewBox="0 0 200 140" fill="none" className={className} aria-hidden="true">
          <rect x="20" y="42" width="160" height="62" rx="6" fill="#402011" stroke="#FAAE33" strokeWidth="2.5" />
          <rect x="30" y="52" width="18" height="14" rx="2" fill="#823513" stroke="#FAAE33" strokeWidth="1.5" />
          <rect x="54" y="52" width="18" height="14" rx="2" fill="#281006" stroke="#FAAE33" strokeWidth="1.5" />
          <rect x="78" y="52" width="18" height="14" rx="2" fill="#281006" stroke="#FAAE33" strokeWidth="1.5" />
          <rect x="102" y="52" width="18" height="14" rx="2" fill="#281006" stroke="#FAAE33" strokeWidth="1.5" />
          <rect x="126" y="52" width="18" height="14" rx="2" fill="#281006" stroke="#FAAE33" strokeWidth="1.5" />
          <circle cx="160" cy="59" r="8" fill="#FAAE33" />
          <rect x="30" y="74" width="24" height="18" rx="2" fill="#281006" stroke="#FAAE33" strokeWidth="1.5" />
          <rect x="60" y="74" width="76" height="18" rx="2" fill="#9F531B" stroke="#FAAE33" strokeWidth="1.5" />
          <rect x="142" y="74" width="28" height="18" rx="2" fill="#281006" stroke="#FAAE33" strokeWidth="1.5" />
        </svg>
      );
    case 'stands':
      return (
        <svg viewBox="0 0 180 150" fill="none" className={className} aria-hidden="true">
          <path d="M26 116 L80 116 M34 52 L76 44 M54 48 L54 116" stroke="#FAAE33" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M100 116 L154 116 M104 44 L146 52 M126 48 L126 116" stroke="#FAAE33" strokeWidth="3.5" strokeLinecap="round" />
          <rect x="38" y="24" width="32" height="20" rx="3" fill="#823513" stroke="#FAAE33" strokeWidth="1.5" />
          <rect x="110" y="24" width="32" height="20" rx="3" fill="#823513" stroke="#FAAE33" strokeWidth="1.5" />
        </svg>
      );
    case 'pen':
      return (
        <svg viewBox="0 0 180 140" fill="none" className={className} aria-hidden="true">
          <g transform="rotate(-28 90 70)">
            <rect x="34" y="62" width="102" height="16" rx="4" fill="#9F531B" stroke="#FAAE33" strokeWidth="2.5" />
            <polygon points="136,62 158,70 136,78" fill="#FAAE33" />
            <line x1="56" y1="56" x2="92" y2="56" stroke="#FAAE33" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="52" cy="70" r="3" fill="#281006" stroke="#FAAE33" strokeWidth="1.5" />
          </g>
        </svg>
      );
    case 'pouch':
      return (
        <svg viewBox="0 0 180 150" fill="none" className={className} aria-hidden="true">
          <rect x="30" y="40" width="120" height="76" rx="12" fill="#402011" stroke="#FAAE33" strokeWidth="2.5" />
          <line x1="30" y1="78" x2="150" y2="78" stroke="#FAAE33" strokeWidth="2" strokeDasharray="5 4" />
          <rect x="54" y="54" width="72" height="14" rx="4" fill="#823513" stroke="#FAAE33" strokeWidth="1.5" />
          <circle cx="142" cy="78" r="5" fill="#FAAE33" />
        </svg>
      );
    case 'clock':
      return (
        <svg viewBox="0 0 160 160" fill="none" className={className} aria-hidden="true">
          <rect x="34" y="30" width="92" height="92" rx="14" fill="#823513" stroke="#FAAE33" strokeWidth="2.5" />
          <circle cx="80" cy="76" r="34" fill="#281006" stroke="#FAAE33" strokeWidth="2" />
          <line x1="80" y1="76" x2="80" y2="54" stroke="#FDF6EC" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="80" y1="76" x2="98" y2="86" stroke="#FAAE33" strokeWidth="2" strokeLinecap="round" />
          <rect x="50" y="122" width="60" height="8" rx="3" fill="#402011" stroke="#FAAE33" strokeWidth="1.5" />
        </svg>
      );
    case 'carafe':
      return (
        <svg viewBox="0 0 160 170" fill="none" className={className} aria-hidden="true">
          <path d="M56 142 L104 142 L98 78 L90 48 L70 48 L62 78 Z" fill="#402011" stroke="#FAAE33" strokeWidth="2.5" />
          <rect x="66" y="24" width="28" height="26" rx="4" fill="#823513" stroke="#FAAE33" strokeWidth="2" />
          <line x1="72" y1="84" x2="72" y2="132" stroke="#FAAE33" strokeWidth="1.2" opacity="0.6" />
          <line x1="80" y1="84" x2="80" y2="132" stroke="#FAAE33" strokeWidth="1.2" opacity="0.6" />
          <line x1="88" y1="84" x2="88" y2="132" stroke="#FAAE33" strokeWidth="1.2" opacity="0.6" />
        </svg>
      );
    case 'jacket':
      return (
        <svg viewBox="0 0 180 160" fill="none" className={className} aria-hidden="true">
          <path d="M56 32 L124 32 L148 64 L132 76 L120 58 L120 132 L60 132 L60 58 L48 76 L32 64 Z" fill="#823513" stroke="#FAAE33" strokeWidth="2.5" />
          <line x1="90" y1="32" x2="90" y2="132" stroke="#FAAE33" strokeWidth="1.5" />
          <circle cx="96" cy="56" r="2.5" fill="#FAAE33" />
          <circle cx="96" cy="78" r="2.5" fill="#FAAE33" />
          <circle cx="96" cy="100" r="2.5" fill="#FAAE33" />
          <rect x="66" y="94" width="18" height="22" rx="2" fill="#402011" stroke="#FAAE33" strokeWidth="1.5" />
          <rect x="100" y="94" width="14" height="22" rx="2" fill="#402011" stroke="#FAAE33" strokeWidth="1.5" />
        </svg>
      );
    case 'folio':
    default:
      return (
        <svg viewBox="0 0 160 160" fill="none" className={className} aria-hidden="true">
          <rect x="38" y="24" width="84" height="112" rx="6" fill="#402011" stroke="#FAAE33" strokeWidth="2.5" />
          <line x1="52" y1="24" x2="52" y2="136" stroke="#FAAE33" strokeWidth="1.5" strokeDasharray="4 4" />
          <rect x="64" y="46" width="44" height="24" rx="2" fill="#823513" stroke="#FAAE33" strokeWidth="1.5" />
          <rect x="122" y="64" width="8" height="24" rx="2" fill="#FAAE33" />
        </svg>
      );
  }
}
