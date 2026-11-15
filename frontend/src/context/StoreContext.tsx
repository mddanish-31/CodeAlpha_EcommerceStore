'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  Product,
  CartItem,
  OrderSummary,
  ShippingAddress,
  DemoUser,
} from '@/types/store';
import {
  INITIAL_DEMO_USER,
  INITIAL_SAMPLE_ORDERS,
} from '@/data/products';

interface StoreContextValue {
  cart: CartItem[];
  cartCount: number;
  subtotal: number;
  shippingCost: number;
  totalAmount: number;
  freeShippingThreshold: number;
  isCartDrawerOpen: boolean;
  isMobileNavOpen: boolean;
  user: DemoUser | null;
  orders: OrderSummary[];
  toastMessage: string | null;
  openCartDrawer: () => void;
  closeCartDrawer: () => void;
  openMobileNav: () => void;
  closeMobileNav: () => void;
  addToCart: (product: Product, quantity?: number, openDrawer?: boolean) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  placeDemoOrder: (address: ShippingAddress) => OrderSummary;
  signInDemo: (email: string, fullName?: string) => void;
  signOutDemo: () => void;
  dismissToast: () => void;
}

const StoreContext = createContext<StoreContextValue | undefined>(undefined);

const STORAGE_KEY_CART = 'codealpha_ecommerce_cart_v1';
const STORAGE_KEY_ORDERS = 'codealpha_ecommerce_orders_v1';
const STORAGE_KEY_USER = 'codealpha_ecommerce_user_v1';
const FREE_SHIPPING_THRESHOLD = 75;
const STANDARD_SHIPPING = 8;

const DEFAULT_CART: CartItem[] = [];

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(DEFAULT_CART);
  const [orders, setOrders] = useState<OrderSummary[]>(INITIAL_SAMPLE_ORDERS);
  const [user, setUser] = useState<DemoUser | null>(INITIAL_DEMO_USER);
  const [isHydrated, setIsHydrated] = useState(false);

  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(STORAGE_KEY_CART);
      if (savedCart) {
        const parsed = JSON.parse(savedCart);
        if (Array.isArray(parsed)) setCart(parsed);
      }
      const savedOrders = localStorage.getItem(STORAGE_KEY_ORDERS);
      if (savedOrders) {
        const parsedOrders = JSON.parse(savedOrders);
        if (Array.isArray(parsedOrders)) setOrders(parsedOrders);
      }
      const savedUser = localStorage.getItem(STORAGE_KEY_USER);
      if (savedUser !== null) {
        setUser(JSON.parse(savedUser));
      }
    } catch {
      // Ignore storage errors in restricted environments
    } finally {
      setIsHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY_CART, JSON.stringify(cart));
    } catch {
      // Ignore storage errors
    }
  }, [cart, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(orders));
    } catch {
      // Ignore storage errors
    }
  }, [orders, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
    } catch {
      // Ignore storage errors
    }
  }, [user, isHydrated]);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
  }, []);

  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => setToastMessage(null), 3500);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  const shippingCost =
    subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING;
  const totalAmount = subtotal + shippingCost;

  const openCartDrawer = useCallback(() => setIsCartDrawerOpen(true), []);
  const closeCartDrawer = useCallback(() => setIsCartDrawerOpen(false), []);
  const openMobileNav = useCallback(() => setIsMobileNavOpen(true), []);
  const closeMobileNav = useCallback(() => setIsMobileNavOpen(false), []);
  const dismissToast = useCallback(() => setToastMessage(null), []);

  const addToCart = useCallback(
    (product: Product, quantity = 1, shouldOpenDrawer = true) => {
      if (product.stockCount <= 0) {
        showToast(`${product.title} is currently out of stock.`);
        return;
      }
      setCart((prev) => {
        const existingIndex = prev.findIndex(
          (item) => item.product.id === product.id
        );
        if (existingIndex > -1) {
          const updated = [...prev];
          const nextQty = Math.min(
            product.stockCount,
            updated[existingIndex].quantity + quantity
          );
          updated[existingIndex] = { ...updated[existingIndex], quantity: nextQty };
          return updated;
        }
        return [
          ...prev,
          { product, quantity: Math.min(product.stockCount, quantity) },
        ];
      });
      showToast(`Added "${product.title}" to cart.`);
      if (shouldOpenDrawer) {
        setIsCartDrawerOpen(true);
      }
    },
    [showToast]
  );

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      setCart((prev) => prev.filter((item) => item.product.id !== productId));
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (item.product.id !== productId) return item;
        const clamped = Math.min(item.product.stockCount || 10, Math.max(1, quantity));
        return { ...item, quantity: clamped };
      })
    );
  }, []);

  const removeFromCart = useCallback(
    (productId: string) => {
      setCart((prev) => prev.filter((item) => item.product.id !== productId));
      showToast('Item removed from cart.');
    },
    [showToast]
  );

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const placeDemoOrder = useCallback(
    (address: ShippingAddress): OrderSummary => {
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      const newOrder: OrderSummary = {
        orderId: `ORD-2026-${randomNum}`,
        createdAt: new Date().toISOString().split('T')[0],
        status: 'Processing',
        items: [...cart],
        subtotal,
        shippingCost,
        totalAmount,
        shippingAddress: address,
      };
      setOrders((prev) => [newOrder, ...prev]);
      setCart([]);
      showToast(`Demo Order ${newOrder.orderId} recorded.`);
      return newOrder;
    },
    [cart, subtotal, shippingCost, totalAmount, showToast]
  );

  const signInDemo = useCallback(
    (email: string, fullName?: string) => {
      const nameToUse =
        fullName && fullName.trim().length > 0
          ? fullName.trim()
          : email.split('@')[0].replace(/[._-]/g, ' ');
      setUser({
        id: 'usr-demo-session',
        fullName: nameToUse,
        email: email.trim(),
        role: 'CUSTOMER',
        joinedDate: 'November 2026',
        defaultAddress: {
          ...INITIAL_DEMO_USER.defaultAddress,
          fullName: nameToUse,
          email: email.trim(),
        },
      });
      showToast(`Signed in as ${nameToUse} (Frontend Demo Session).`);
    },
    [showToast]
  );

  const signOutDemo = useCallback(() => {
    setUser(null);
    showToast('Signed out of demo session.');
  }, [showToast]);

  return (
    <StoreContext.Provider
      value={{
        cart,
        cartCount,
        subtotal,
        shippingCost,
        totalAmount,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        isCartDrawerOpen,
        isMobileNavOpen,
        user,
        orders,
        toastMessage,
        openCartDrawer,
        closeCartDrawer,
        openMobileNav,
        closeMobileNav,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        placeDemoOrder,
        signInDemo,
        signOutDemo,
        dismissToast,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore(): StoreContextValue {
  const ctx = useContext(StoreContext);
  if (!ctx) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return ctx;
}

