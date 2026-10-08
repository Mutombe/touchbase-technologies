import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { productById } from '../data/products';

const storage = createJSONStorage(() => {
  try {
    localStorage.setItem('__tb', '1');
    localStorage.removeItem('__tb');
    return localStorage;
  } catch {
    const mem = {};
    return { getItem: (k) => mem[k] ?? null, setItem: (k, v) => (mem[k] = v), removeItem: (k) => delete mem[k] };
  }
});

// Demo promo codes
export const COUPONS = {
  TOUCHBASE5: { label: '5% off equipment', pct: 5 },
  CONNECT10: { label: '10% off (orders over $2,000)', pct: 10, min: 2000 },
};

// Resolve a cart line to its display data
export function resolveLine(line) {
  const p = productById[line.id];
  if (!p) return null;
  return { ...line, product: p, name: p.name, price: p.price, subtitle: p.brand, href: `/shop/${p.id}` };
}

export const useCart = create(
  persist(
    (set, get) => ({
      lines: [],
      coupon: null,
      drawerOpen: false,
      openDrawer: () => set({ drawerOpen: true }),
      closeDrawer: () => set({ drawerOpen: false }),
      add: (id, qty = 1) =>
        set((s) => {
          const existing = s.lines.find((l) => l.id === id);
          const lines = existing ? s.lines.map((l) => (l.id === id ? { ...l, qty: l.qty + qty } : l)) : [...s.lines, { key: id, id, qty }];
          return { lines, drawerOpen: true };
        }),
      setQty: (key, qty) => set((s) => ({ lines: s.lines.map((l) => (l.key === key ? { ...l, qty: Math.max(1, qty) } : l)) })),
      remove: (key) => set((s) => ({ lines: s.lines.filter((l) => l.key !== key) })),
      clear: () => set({ lines: [], coupon: null }),
      applyCoupon: (code) => {
        const c = COUPONS[code?.trim().toUpperCase()];
        if (!c) return { ok: false, message: 'That code isn’t valid.' };
        const { subtotal } = get().totals();
        if (c.min && subtotal < c.min) return { ok: false, message: `Needs a subtotal of $${c.min.toLocaleString()} or more.` };
        set({ coupon: code.trim().toUpperCase() });
        return { ok: true, message: c.label };
      },
      removeCoupon: () => set({ coupon: null }),
      totals: () => {
        const lines = get().lines.map(resolveLine).filter(Boolean);
        const subtotal = lines.reduce((s, l) => s + l.price * l.qty, 0);
        const count = lines.reduce((s, l) => s + l.qty, 0);
        const c = COUPONS[get().coupon];
        const discount = c && (!c.min || subtotal >= c.min) ? (subtotal * c.pct) / 100 : 0;
        return { lines, subtotal, count, discount };
      },
    }),
    { name: 'touchbase-cart', storage, partialize: (s) => ({ lines: s.lines, coupon: s.coupon }) },
  ),
);

export const useWishlist = create(
  persist(
    (set) => ({
      ids: [],
      toggle: (id) => set((s) => ({ ids: s.ids.includes(id) ? s.ids.filter((x) => x !== id) : [...s.ids, id] })),
    }),
    { name: 'touchbase-wishlist', storage },
  ),
);

// Compare tray (max 4 products)
export const useCompare = create(
  persist(
    (set) => ({
      products: [],
      toggle: (id) => set((s) => (s.products.includes(id) ? { products: s.products.filter((x) => x !== id) } : { products: [...s.products, id].slice(-4) })),
      clear: () => set({ products: [] }),
    }),
    { name: 'touchbase-compare', storage },
  ),
);

export const useOrders = create(
  persist(
    (set) => ({
      orders: [],
      place: (order) => set((s) => ({ orders: [order, ...s.orders] })),
    }),
    { name: 'touchbase-orders', storage },
  ),
);
