import type { Product, ProductCategory } from '@/types/store';

export interface ProductMediaEntry {
  src: string;
  alt: string;
  width: number;
  height: number;
  department: ProductCategory;
  caption: string;
}

export const HERO_STUDIO_MEDIA = {
  src: '/images/hero-editorial.webp',
  alt: 'Brushed brass architectural desk lamp, dark anodized 65% mechanical keyboard, leather A5 folio, and brushed copper pour-over kettle on a sunlit limestone workspace desk',
  width: 1200,
  height: 900,
};

export const PRODUCT_MEDIA_BY_ID: Record<string, ProductMediaEntry> = {
  'chrono-brass-desk-lamp': {
    src: '/images/products/chrono-brass-desk-lamp.webp',
    alt: 'Brushed C36000 brass architectural desk lamp with cylindrical base, knurled dimmer dial, and matte terracotta-rust shade on neutral gray background',
    width: 900,
    height: 900,
    department: 'Audio & Desk Craft',
    caption: 'Brushed C36000 brass frame with matte Ember Rust aluminum shade',
  },
  'monolith-mechanical-keypad': {
    src: '/images/products/monolith-mechanical-keypad.webp',
    alt: 'Compact 65 percent mechanical keyboard in dark anodized aluminum housing with cream and charcoal keycaps and knurled brass rotary knob',
    width: 900,
    height: 900,
    department: 'Audio & Desk Craft',
    caption: 'CNC 6063 anodized aluminum case with brass rotary encoder',
  },
  'studio-monitor-isolation-stands': {
    src: '/images/products/studio-monitor-isolation-stands.webp',
    alt: 'Pair of angled dark-charcoal powder-coated steel desktop speaker isolation stands topped with natural cork pads',
    width: 900,
    height: 900,
    department: 'Audio & Desk Craft',
    caption: 'Laser-cut 5mm steel C-frame pedestals with cork damping pads',
  },
  'tactile-field-chronograph': {
    src: '/images/products/tactile-field-chronograph.webp',
    alt: 'Matte bead-blasted titanium 38mm field chronograph wristwatch featuring slate dial, gold numerals, and stitched tan leather strap',
    width: 900,
    height: 900,
    department: 'Everyday Carry',
    caption: 'Grade-2 titanium 38mm case with domed AR sapphire crystal',
  },
  'machined-brass-bolt-pen': {
    src: '/images/products/machined-brass-bolt-pen.webp',
    alt: 'Lathe-turned solid brushed brass bolt-action pen with machined grip rings and brushed steel pocket clip',
    width: 900,
    height: 900,
    department: 'Everyday Carry',
    caption: 'Solid C36000 lathe-turned brass body with J-channel bolt',
  },
  'modular-cordura-tech-pouch': {
    src: '/images/products/modular-cordura-tech-pouch.webp',
    alt: 'Structured dark charcoal 1000D ballistic Cordura tech cable organizer pouch with waterproof zipper and paracord pull',
    width: 900,
    height: 900,
    department: 'Everyday Carry',
    caption: '1000D weather-resistant Cordura clamshell organizer',
  },
  'copper-gooseneck-kettle': {
    src: '/images/products/copper-gooseneck-kettle.webp',
    alt: 'Brushed copper 900ml pour-over gooseneck kettle featuring lid analog thermometer dial and contoured American walnut handle',
    width: 900,
    height: 900,
    department: 'Home Objects',
    caption: '900ml brushed copper kettle with analog brew thermometer',
  },
  'silent-sweep-atelier-clock': {
    src: '/images/products/silent-sweep-atelier-clock.webp',
    alt: 'Square minimalist brushed dark-bronze desk clock with off-white dial, dark baton markers, and slim gold sweep hand',
    width: 900,
    height: 900,
    department: 'Home Objects',
    caption: 'Die-cast warm bronze bezel with silent sweep quartz movement',
  },
  'fluted-stoneware-carafe-set': {
    src: '/images/products/fluted-stoneware-carafe-set.webp',
    alt: 'Wheel-thrown fluted speckled warm clay stoneware bedside water carafe with inverted matching tumbler cup lid',
    width: 900,
    height: 900,
    department: 'Home Objects',
    caption: 'High-fired iron stoneware carafe and nesting tumbler set',
  },
  'waxed-canvas-utility-tote': {
    src: '/images/products/waxed-canvas-utility-tote.webp',
    alt: 'Standing olive-charcoal 18oz dry-waxed canvas utility tote bag with chestnut leather handles, brass rivets, and front pockets',
    width: 900,
    height: 900,
    department: 'Apparel & Goods',
    caption: '18oz dry-waxed Scottish cotton canvas and bridle leather',
  },
  'heavyweight-canvas-chore-coat': {
    src: '/images/products/heavyweight-canvas-chore-coat.webp',
    alt: 'Front studio view of 14oz garment-dyed deep espresso duck canvas chore jacket with corduroy collar and antique brass buttons',
    width: 900,
    height: 900,
    department: 'Apparel & Goods',
    caption: '14oz organic cotton duck canvas with triple-stitched seams',
  },
  'full-grain-leather-field-folio': {
    src: '/images/products/full-grain-leather-field-folio.webp',
    alt: 'Saddle-chestnut full-grain vegetable-tanned leather A5 notebook folio angled open showing dot-grid insert and pen loop',
    width: 900,
    height: 900,
    department: 'Apparel & Goods',
    caption: '2.0mm vegetable-tanned cowhide stitched with waxed linen',
  },
};

export const DEPARTMENT_COVER_PRODUCT_ID: Record<ProductCategory, string> = {
  'Audio & Desk Craft': 'chrono-brass-desk-lamp',
  'Everyday Carry': 'tactile-field-chronograph',
  'Home Objects': 'copper-gooseneck-kettle',
  'Apparel & Goods': 'waxed-canvas-utility-tote',
};

export function getProductMedia(product: Pick<Product, 'id' | 'title' | 'category'>): ProductMediaEntry {
  return (
    PRODUCT_MEDIA_BY_ID[product.id] ?? {
      src: '/images/products/chrono-brass-desk-lamp.webp',
      alt: `${product.title} studio product view`,
      width: 900,
      height: 900,
      department: product.category,
      caption: product.category,
    }
  );
}

