export type ProductCategory =
  | 'Audio & Desk Craft'
  | 'Everyday Carry'
  | 'Home Objects'
  | 'Apparel & Goods';

export interface Product {
  id: string;
  sku: string;
  title: string;
  category: ProductCategory;
  price: number;
  compareAtPrice?: number;
  description: string;
  shortDescription: string;
  stockCount: number;
  badge?: 'BESTSELLER' | 'NEW ARRIVAL' | 'LIMITED DROP';
  specs: Record<string, string>;
  materialsCare: string;
  shippingReturns: string;
  imageSvgId: string;
  featured?: boolean;
  isNewArrival?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  streetAddress: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  notes?: string;
}

export interface OrderSummary {
  orderId: string;
  createdAt: string;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  items: CartItem[];
  subtotal: number;
  shippingCost: number;
  totalAmount: number;
  shippingAddress: ShippingAddress;
}

export interface DemoUser {
  id: string;
  fullName: string;
  email: string;
  role: 'CUSTOMER';
  joinedDate: string;
  defaultAddress: ShippingAddress;
}
