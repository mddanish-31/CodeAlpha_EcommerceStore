import { Product, ProductCategory, OrderSummary, DemoUser } from '@/types/store';

export const DEPARTMENTS: {
  id: string;
  code: string;
  name: ProductCategory;
  tagline: string;
  itemCount: number;
}[] = [
  {
    id: 'audio-desk',
    code: 'DEPT // 01',
    name: 'Audio & Desk Craft',
    tagline: 'Task lighting, tactile mechanical keyboards & studio acoustic stands',
    itemCount: 3,
  },
  {
    id: 'everyday-carry',
    code: 'DEPT // 02',
    name: 'Everyday Carry',
    tagline: 'Machined brass pens, titanium field watches & modular organizers',
    itemCount: 3,
  },
  {
    id: 'home-objects',
    code: 'DEPT // 03',
    name: 'Home Objects',
    tagline: 'Precision pour-over kettles, stoneware vessels & analog desk clocks',
    itemCount: 3,
  },
  {
    id: 'apparel-goods',
    code: 'DEPT // 04',
    name: 'Apparel & Goods',
    tagline: '18oz waxed canvas totes, chore coats & vegetable-tanned folios',
    itemCount: 3,
  },
];

/**
 * Sample catalog data for Phase 4B Frontend Implementation.
 * Clearly identified as sample/demo store catalog content.
 */
export const SAMPLE_PRODUCTS: Product[] = [
  {
    id: 'chrono-brass-desk-lamp',
    sku: 'AT-014',
    title: 'Chrono Brass Desk Lamp',
    category: 'Audio & Desk Craft',
    price: 128,
    compareAtPrice: 150,
    shortDescription: 'Stepless warm-dimmable LED task lamp with solid brushed brass base.',
    description:
      'Machined from solid C36000 architectural brass with a tactile rotary dimmer (2700K warm candle to 4000K studio daylight). Engineered for glare-free asymmetric illumination across wide desk setups.',
    stockCount: 14,
    badge: 'BESTSELLER',
    specs: {
      Height: '420 mm (16.5 in)',
      'Shade Diameter': '210 mm (8.3 in)',
      'Color Temperature': '2700K – 4000K (CRI 97+)',
      Power: '2m Braided Textile USB-C / AC Adapter',
    },
    materialsCare:
      'Unlacquered C36000 brushed brass base and stem; spun aluminum shade finished in matte Ember Rust powder coat. Wipe clean with a dry microfiber cloth.',
    shippingReturns:
      'Ships within 48 hours in molded recyclable pulp packaging. Covered by our 30-day return and exchange guarantee.',
    imageSvgId: 'lamp',
    featured: true,
  },
  {
    id: 'tactile-field-chronograph',
    sku: 'EC-008',
    title: 'Tactile Field Chronograph',
    category: 'Everyday Carry',
    price: 195,
    shortDescription: 'Sandblasted grade-2 titanium case, sapphire crystal & leather strap.',
    description:
      'Built for daily legibility under any lighting condition. Features a bead-blasted titanium case, double-domed anti-reflective sapphire crystal, high-contrast gold numerals, and a vegetable-tanned saddle leather strap.',
    stockCount: 2,
    badge: 'LIMITED DROP',
    specs: {
      'Case Diameter': '38 mm',
      'Case Thickness': '10.2 mm',
      'Water Resistance': '10 ATM / 100 Meters',
      Movement: 'High-Torque Quartz Sweeping Chrono',
    },
    materialsCare:
      'Grade-2 titanium case with 316L screw-down caseback; full-grain Italian vegetable-tanned strap. Avoid prolonged saltwater immersion for the leather band.',
    shippingReturns:
      'Ships in a felt-lined travel cylinder within 48 hours. Eligible for 30-day unworn returns.',
    imageSvgId: 'watch',
    featured: true,
  },
  {
    id: 'copper-gooseneck-kettle',
    sku: 'HO-019',
    title: 'Copper Gooseneck Kettle',
    category: 'Home Objects',
    price: 84,
    shortDescription: 'Precision pour-over spout with stem thermometer and walnut handle.',
    description:
      'Balanced for a steady, laminar water stream during manual coffee and tea brewing. Heavy-gauge stainless steel core clad in warm brushed copper with a counterweighted American walnut grip.',
    stockCount: 9,
    badge: 'NEW ARRIVAL',
    specs: {
      Capacity: '900 ml (30.4 oz)',
      'Base Compatibility': 'Induction, Gas, Electric & Radiant',
      Thermometer: 'Integrated Analog Brew Gauge (60°C–100°C)',
      Weight: '610 g',
    },
    materialsCare:
      'Food-grade 304 stainless steel interior with brushed copper exterior and oiled walnut handle. Hand wash with warm soapy water.',
    shippingReturns:
      'Dispatched within 48 hours. Free standard shipping on combined orders over $75.',
    imageSvgId: 'kettle',
    featured: true,
    isNewArrival: true,
  },
  {
    id: 'waxed-canvas-utility-tote',
    sku: 'AG-004',
    title: 'Waxed Canvas Utility Tote',
    category: 'Apparel & Goods',
    price: 64,
    shortDescription: '18oz water-repellent organic canvas with padded 16-inch laptop sleeve.',
    description:
      'Structured everyday carryall cut from dry-waxed 18oz Scottish cotton canvas. Reinforced with solid brass rivets, bridle leather handles, a suspended 16-inch laptop compartment, and two exterior tool slip pockets.',
    stockCount: 18,
    specs: {
      Dimensions: '400 × 330 × 150 mm (20L)',
      'Laptop Fit': 'Up to 16-inch Notebook',
      Fabric: '18oz Dry-Waxed Organic Cotton Canvas',
      Hardware: 'Solid Cast Brass Rivets & Key Clip',
    },
    materialsCare:
      'Spot clean with cold water and a stiff brush. Do not machine wash or dry-clean; re-wax annually as needed.',
    shippingReturns:
      'Ships flat-packed in recyclable kraft wrap within 48 hours. 30-day return policy.',
    imageSvgId: 'tote',
    featured: true,
  },
  {
    id: 'monolith-mechanical-keypad',
    sku: 'AT-021',
    title: 'Monolith 65% Mechanical Keyboard',
    category: 'Audio & Desk Craft',
    price: 168,
    compareAtPrice: 185,
    shortDescription: 'Gasket-mounted anodized aluminum chassis with warm tactile switches.',
    description:
      'CNC-milled from a solid billet of 6063 aluminum in Dark Spice anodization. Equipped with pre-lubed tactile switches, dye-sublimated PBT keycaps, and a solid brass rotary volume encoder.',
    stockCount: 7,
    badge: 'BESTSELLER',
    specs: {
      Layout: '65% Compact (67 Keys + Brass Rotary Knob)',
      Connectivity: 'Detachable Braided USB-C (QMK/VIA)',
      Case: 'CNC 6063 Anodized Aluminum',
      Weight: '1.42 kg Fully Assembled',
    },
    materialsCare:
      'Anodized aluminum housing and PBT keycaps. Includes braided USB-C cable and keycap puller.',
    shippingReturns: 'Free tracked shipping included. 30-day return window.',
    imageSvgId: 'keyboard',
    isNewArrival: true,
  },
  {
    id: 'studio-monitor-isolation-stands',
    sku: 'AT-032',
    title: 'Acoustic Monitor Isolation Stands (Pair)',
    category: 'Audio & Desk Craft',
    price: 92,
    shortDescription: 'Angled steel desktop speaker pedestals with high-density cork damping.',
    description:
      'Decouples nearfield studio monitors from desk resonance while angling drivers 6 degrees upward toward ear level. Heavy 5mm laser-cut steel plates laminated with natural Portuguese cork.',
    stockCount: 11,
    specs: {
      'Top Plate': '160 × 200 mm',
      'Tilt Angle': '6° Upward Acoustic Alignment',
      'Load Capacity': 'Up to 15 kg per stand',
      Finish: 'Textured Charred Clove Powder Coat + Cork',
    },
    materialsCare: 'Wipe steel surfaces with a damp cloth; cork pads are pre-sealed.',
    shippingReturns: 'Sold as a matched pair. Ships in 48 hours.',
    imageSvgId: 'stands',
  },
  {
    id: 'machined-brass-bolt-pen',
    sku: 'EC-012',
    title: 'Machined Brass Bolt-Action Pen',
    category: 'Everyday Carry',
    price: 48,
    shortDescription: 'Lathe-turned solid brass pocket instrument with smooth J-channel bolt.',
    description:
      'Weighted for effortless low-pressure writing. Micro-grooved grip section prevents slip, while the all-metal bolt mechanism locks reliably in pocket or pack. Develops a unique patina over time.',
    stockCount: 22,
    badge: 'NEW ARRIVAL',
    specs: {
      Length: '134 mm',
      Diameter: '10.5 mm',
      Refill: 'Standard Parker-Style G2 Gel (0.5mm Black)',
      Weight: '54 g',
    },
    materialsCare:
      'Solid C36000 brass body with stainless steel pocket clip. Polish with brass cloth or allow natural patina.',
    shippingReturns: 'Ships in an archival tin box within 48 hours.',
    imageSvgId: 'pen',
    isNewArrival: true,
  },
  {
    id: 'modular-cordura-tech-pouch',
    sku: 'EC-019',
    title: 'Modular Ballistic Tech Organiser',
    category: 'Everyday Carry',
    price: 54,
    compareAtPrice: 64,
    shortDescription: 'Clamshell weatherproof organizer for chargers, cables & SSDs.',
    description:
      'Opens flat at 180 degrees on your desk like a tool roll. Elasticated loops, magnetic slip pockets, and a zippered mesh divider keep power adapters, cables, and memory cards ordered on the move.',
    stockCount: 3,
    specs: {
      Dimensions: '220 × 135 × 65 mm',
      Shell: '1000D Weather-Resistant Cordura Nylon',
      Zippers: 'YKK AquaGuard with Paracord Pulls',
      Pockets: '9 Internal Organiser Compartments',
    },
    materialsCare: 'Spot clean with mild detergent and air dry.',
    shippingReturns: 'Covered by our 30-day return guarantee.',
    imageSvgId: 'pouch',
  },
  {
    id: 'silent-sweep-atelier-clock',
    sku: 'HO-024',
    title: 'Silent Sweep Atelier Desk Clock',
    category: 'Home Objects',
    price: 76,
    shortDescription: 'Compact architectural table clock with continuous non-ticking hands.',
    description:
      'Inspired by mid-century railway instrumentation. Housed in a die-cast warm bronze frame with a matte parchment-toned chapter ring, Tiger Gold second hand, and a completely silent continuous-sweep quartz movement.',
    stockCount: 15,
    badge: 'NEW ARRIVAL',
    specs: {
      Dimensions: '115 × 115 × 48 mm',
      Movement: 'Silent Continuous-Sweep Quartz',
      Lens: 'Hardened Mineral Glass',
      Battery: '1× AA (Included)',
    },
    materialsCare: 'Dust with a soft dry cloth.',
    shippingReturns: 'Ships within 48 hours.',
    imageSvgId: 'clock',
    isNewArrival: true,
  },
  {
    id: 'fluted-stoneware-carafe-set',
    sku: 'HO-031',
    title: 'Fluted Stoneware Carafe & Tumbler',
    category: 'Home Objects',
    price: 58,
    shortDescription: 'Wheel-thrown bedside water vessel with nesting tumbler lid.',
    description:
      'Kiln-fired iron-rich stoneware glazed in a speckled satin spice finish inside and raw tactile clay outside. The matching tumbler doubles as a dust cover for the carafe neck.',
    stockCount: 0,
    specs: {
      'Carafe Volume': '750 ml',
      'Tumbler Volume': '220 ml',
      Material: 'High-Fired Iron Stoneware',
      Care: 'Dishwasher & Microwave Safe',
    },
    materialsCare: 'Lead-free food-safe glaze; dishwasher safe.',
    shippingReturns: 'Double-boxed protective shipping.',
    imageSvgId: 'carafe',
  },
  {
    id: 'heavyweight-canvas-chore-coat',
    sku: 'AG-011',
    title: 'Heavyweight Duck Canvas Chore Coat',
    category: 'Apparel & Goods',
    price: 142,
    compareAtPrice: 165,
    shortDescription: '14oz garment-dyed work jacket with antique brass tack buttons.',
    description:
      'Cut in a relaxed studio silhouette for layering across seasons. Features triple-stitched main seams, corduroy collar facing, three utility patch pockets, and an interior notebook pocket.',
    stockCount: 6,
    badge: 'LIMITED DROP',
    specs: {
      Fabric: '14oz 100% Organic Cotton Duck Canvas',
      Fit: 'Relaxed Boxy Studio Cut (Unisex S–XL)',
      Hardware: 'Custom Antique Brass Shank Buttons',
      Pockets: '3 Exterior Patch + 1 Interior Chest Pocket',
    },
    materialsCare: 'Machine wash cold gentle cycle; hang dry.',
    shippingReturns: 'Free standard shipping & free size exchanges within 30 days.',
    imageSvgId: 'jacket',
  },
  {
    id: 'full-grain-leather-field-folio',
    sku: 'AG-018',
    title: 'Full-Grain Leather A5 Field Folio',
    category: 'Apparel & Goods',
    price: 78,
    shortDescription: 'Refillable vegetable-tanned notebook cover with pen loop & card slots.',
    description:
      'Hand-stitched with waxed linen thread that will never fray. Holds any standard A5 notebook alongside passports, studio access cards, and a fountain or brass bolt pen.',
    stockCount: 12,
    specs: {
      Compatibility: 'Standard A5 Notebooks (148 × 210 mm)',
      Leather: '2.0mm Full-Grain Vegetable-Tanned Cowhide',
      Includes: '1× 96-Page Dot-Grid Fountain-Friendly Insert',
      Stitching: 'Saddle-Stitched Waxed Linen Thread',
    },
    materialsCare: 'Condition occasionally with natural leather balm.',
    shippingReturns: 'Ships in a cotton dust bag within 48 hours.',
    imageSvgId: 'folio',
  },
];

export const INITIAL_DEMO_USER: DemoUser = {
  id: 'usr-demo-01',
  fullName: 'MD Danish Raza',
  email: 'danish.demo@codealpha-store.example',
  role: 'CUSTOMER',
  joinedDate: 'November 2026',
  defaultAddress: {
    fullName: 'MD Danish Raza',
    email: 'danish.demo@codealpha-store.example',
    phone: '+91 98765 43210',
    streetAddress: '42 Craft Market Avenue, Suite 4B',
    city: 'New Delhi',
    state: 'Delhi',
    postalCode: '110001',
    country: 'India',
    notes: 'Leave package at reception desk if unavailable.',
  },
};

export const INITIAL_SAMPLE_ORDERS: OrderSummary[] = [
  {
    orderId: 'ORD-2026-0104',
    createdAt: '2026-11-12',
    status: 'Delivered',
    items: [
      {
        product: SAMPLE_PRODUCTS[0],
        quantity: 1,
      },
      {
        product: SAMPLE_PRODUCTS[6],
        quantity: 1,
      },
    ],
    subtotal: 176,
    shippingCost: 0,
    totalAmount: 176,
    shippingAddress: INITIAL_DEMO_USER.defaultAddress,
  },
  {
    orderId: 'ORD-2026-0119',
    createdAt: '2026-11-15',
    status: 'Processing',
    items: [
      {
        product: SAMPLE_PRODUCTS[3],
        quantity: 1,
      },
    ],
    subtotal: 64,
    shippingCost: 8,
    totalAmount: 72,
    shippingAddress: INITIAL_DEMO_USER.defaultAddress,
  },
];
