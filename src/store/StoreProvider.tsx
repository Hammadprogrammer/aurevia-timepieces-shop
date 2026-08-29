import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { products, type Product } from "@/data/products";

export type CartItem = {
  productId: string;
  qty: number;
  color: string;
  strap: string;
};

export type CheckoutInfo = {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  notes: string;
  payment: PaymentMethod;
};

export type PaymentMethod =
  | "Cash on Delivery"
  | "Easypaisa"
  | "JazzCash"
  | "Bank Transfer"
  | "Credit / Debit Card";

export type OrderItem = CartItem & {
  name: string;
  brand: string;
  image: string;
  price: number;
  sku: string;
};

export type OrderStatus =
  | "Order Placed"
  | "Confirmed"
  | "Packed"
  | "Shipped"
  | "Out for Delivery"
  | "Delivered";

export const ORDER_STAGES: OrderStatus[] = [
  "Order Placed",
  "Confirmed",
  "Packed",
  "Shipped",
  "Out for Delivery",
  "Delivered",
];

export type Order = {
  id: string;
  placedAt: string;
  items: OrderItem[];
  subtotal: number;
  savings: number;
  couponCode: string | null;
  couponDiscount: number;
  delivery: number;
  total: number;
  info: CheckoutInfo;
  status: OrderStatus;
  estimatedDelivery: string;
};

export const emptyCheckout: CheckoutInfo = {
  fullName: "",
  phone: "",
  email: "",
  address: "",
  city: "",
  province: "",
  postalCode: "",
  notes: "",
  payment: "Cash on Delivery",
};

export const COUPONS: Record<string, { type: "percent" | "flat"; value: number; label: string }> = {
  AUREVIA10: { type: "percent", value: 10, label: "10% off your order" },
  WELCOME500: { type: "flat", value: 500, label: "₨500 off your order" },
};

export const DELIVERY_FEE = 350;
export const FREE_DELIVERY_THRESHOLD = 20000;

const KEYS = {
  cart: "aurevia.cart",
  wishlist: "aurevia.wishlist",
  orders: "aurevia.orders",
  checkout: "aurevia.checkout",
  coupon: "aurevia.coupon",
};

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable */
  }
}

type Totals = {
  subtotal: number;
  savings: number;
  couponDiscount: number;
  delivery: number;
  total: number;
};

type StoreValue = {
  hydrated: boolean;
  cart: CartItem[];
  cartCount: number;
  cartDetailed: (CartItem & { product: Product })[];
  wishlist: string[];
  orders: Order[];
  checkout: CheckoutInfo;
  coupon: string | null;
  totals: Totals;
  addToCart: (productId: string, opts?: { qty?: number; color?: string; strap?: string }) => void;
  setQty: (productId: string, qty: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => boolean;
  removeFromWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  setCheckout: (info: CheckoutInfo) => void;
  applyCoupon: (code: string) => { ok: boolean; message: string };
  removeCoupon: () => void;
  placeOrder: () => Order;
  getOrder: (id: string) => Order | undefined;
};

const StoreContext = createContext<StoreValue | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [checkout, setCheckoutState] = useState<CheckoutInfo>(emptyCheckout);
  const [coupon, setCoupon] = useState<string | null>(null);

  useEffect(() => {
    setCart(read<CartItem[]>(KEYS.cart, []));
    setWishlist(read<string[]>(KEYS.wishlist, []));
    setOrders(read<Order[]>(KEYS.orders, []));
    setCheckoutState(read<CheckoutInfo>(KEYS.checkout, emptyCheckout));
    setCoupon(read<string | null>(KEYS.coupon, null));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) write(KEYS.cart, cart);
  }, [cart, hydrated]);
  useEffect(() => {
    if (hydrated) write(KEYS.wishlist, wishlist);
  }, [wishlist, hydrated]);
  useEffect(() => {
    if (hydrated) write(KEYS.orders, orders);
  }, [orders, hydrated]);
  useEffect(() => {
    if (hydrated) write(KEYS.checkout, checkout);
  }, [checkout, hydrated]);
  useEffect(() => {
    if (hydrated) write(KEYS.coupon, coupon);
  }, [coupon, hydrated]);

  const cartDetailed = useMemo(
    () =>
      cart
        .map((item) => {
          const product = products.find((p) => p.id === item.productId);
          return product ? { ...item, product } : null;
        })
        .filter(Boolean) as (CartItem & { product: Product })[],
    [cart],
  );

  const totals = useMemo<Totals>(() => {
    const subtotal = cartDetailed.reduce((sum, i) => sum + i.product.price * i.qty, 0);
    const savings = cartDetailed.reduce(
      (sum, i) => sum + (i.product.originalPrice - i.product.price) * i.qty,
      0,
    );
    let couponDiscount = 0;
    if (coupon && COUPONS[coupon]) {
      const c = COUPONS[coupon];
      couponDiscount = c.type === "percent" ? Math.round((subtotal * c.value) / 100) : c.value;
      couponDiscount = Math.min(couponDiscount, subtotal);
    }
    const afterCoupon = subtotal - couponDiscount;
    const delivery =
      subtotal === 0 || afterCoupon >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
    return { subtotal, savings, couponDiscount, delivery, total: afterCoupon + delivery };
  }, [cartDetailed, coupon]);

  const addToCart = useCallback<StoreValue["addToCart"]>((productId, opts) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;
    setCart((prev) => {
      const existing = prev.find((i) => i.productId === productId);
      if (existing) {
        return prev.map((i) =>
          i.productId === productId
            ? { ...i, qty: Math.min(i.qty + (opts?.qty ?? 1), product.stock) }
            : i,
        );
      }
      return [
        ...prev,
        {
          productId,
          qty: Math.min(opts?.qty ?? 1, product.stock),
          color: opts?.color ?? product.colors[0],
          strap: opts?.strap ?? product.straps[0],
        },
      ];
    });
  }, []);

  const setQty = useCallback<StoreValue["setQty"]>((productId, qty) => {
    setCart((prev) =>
      qty <= 0
        ? prev.filter((i) => i.productId !== productId)
        : prev.map((i) => (i.productId === productId ? { ...i, qty } : i)),
    );
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCart((prev) => prev.filter((i) => i.productId !== productId));
  }, []);

  const toggleWishlist = useCallback((productId: string) => {
    let added = false;
    setWishlist((prev) => {
      if (prev.includes(productId)) return prev.filter((id) => id !== productId);
      added = true;
      return [...prev, productId];
    });
    return !wishlistHas(wishlist, productId);
    function wishlistHas(list: string[], id: string) {
      return list.includes(id);
    }
  }, [wishlist]);

  const applyCoupon = useCallback<StoreValue["applyCoupon"]>((code) => {
    const key = code.trim().toUpperCase();
    if (!key) return { ok: false, message: "Enter a coupon code to continue." };
    if (!COUPONS[key]) return { ok: false, message: `"${key}" is not a valid coupon code.` };
    setCoupon(key);
    return { ok: true, message: `${key} applied — ${COUPONS[key].label}.` };
  }, []);

  const placeOrder = useCallback<StoreValue["placeOrder"]>(() => {
    const now = new Date();
    const id = `AUR-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(
      now.getDate(),
    ).padStart(2, "0")}-${Math.random().toString(36).slice(2, 6).toUpperCase()}${String(
      now.getSeconds(),
    ).padStart(2, "0")}`;
    const eta = new Date(now.getTime() + 4 * 24 * 60 * 60 * 1000);
    const order: Order = {
      id,
      placedAt: now.toISOString(),
      items: cartDetailed.map((i) => ({
        productId: i.productId,
        qty: i.qty,
        color: i.color,
        strap: i.strap,
        name: i.product.name,
        brand: i.product.brand,
        image: i.product.image,
        price: i.product.price,
        sku: i.product.sku,
      })),
      subtotal: totals.subtotal,
      savings: totals.savings,
      couponCode: coupon,
      couponDiscount: totals.couponDiscount,
      delivery: totals.delivery,
      total: totals.total,
      info: checkout,
      status: "Order Placed",
      estimatedDelivery: eta.toLocaleDateString("en-PK", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    };
    setOrders((prev) => [order, ...prev]);
    setCart([]);
    setCoupon(null);
    setCheckoutState(emptyCheckout);
    return order;
  }, [cartDetailed, totals, coupon, checkout]);

  const value: StoreValue = {
    hydrated,
    cart,
    cartCount: cart.reduce((n, i) => n + i.qty, 0),
    cartDetailed,
    wishlist,
    orders,
    checkout,
    coupon,
    totals,
    addToCart,
    setQty,
    removeFromCart,
    clearCart: () => setCart([]),
    toggleWishlist,
    removeFromWishlist: (id) => setWishlist((prev) => prev.filter((w) => w !== id)),
    isWishlisted: (id) => wishlist.includes(id),
    setCheckout: setCheckoutState,
    applyCoupon,
    removeCoupon: () => setCoupon(null),
    placeOrder,
    getOrder: (id) => orders.find((o) => o.id === id),
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}
