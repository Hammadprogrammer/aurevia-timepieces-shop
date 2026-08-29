import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { formatPKR } from "@/data/products";
import { FREE_DELIVERY_THRESHOLD, useStore } from "@/store/StoreProvider";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Shopping Cart — AUREVIA Watches" },
      {
        name: "description",
        content: "Review your selected Aurevia timepieces, apply a coupon and proceed to checkout.",
      },
      { property: "og:title", content: "Shopping Cart — AUREVIA Watches" },
      { property: "og:description", content: "Your selected Aurevia timepieces." },
    ],
  }),
  component: Cart,
});

function Cart() {
  const {
    cartDetailed,
    setQty,
    removeFromCart,
    clearCart,
    totals,
    coupon,
    applyCoupon,
    removeCoupon,
    hydrated,
  } = useStore();
  const [code, setCode] = useState("");

  if (hydrated && cartDetailed.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-28 text-center sm:px-6">
        <ShoppingBag className="mx-auto h-10 w-10 text-gold" />
        <h1 className="font-display mt-6 text-4xl">Your cart is empty</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Every great collection starts with one piece.
        </p>
        <Link
          to="/shop"
          className="mt-8 inline-block border border-ink px-8 py-4 text-[11px] tracking-[0.2em] uppercase hover:bg-ink hover:text-champagne"
        >
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <p className="text-eyebrow text-gold">Your Selection</p>
      <h1 className="font-display mt-2 text-5xl">Shopping Cart</h1>

      {!hydrated ? (
        <div className="mt-12 space-y-6">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex animate-pulse gap-6 border-b border-border pb-6">
              <div className="h-32 w-24 bg-secondary" />
              <div className="flex-1 space-y-3">
                <div className="h-4 w-1/3 bg-secondary" />
                <div className="h-3 w-1/4 bg-secondary" />
                <div className="h-8 w-32 bg-secondary" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-12 grid gap-14 lg:grid-cols-[1fr_380px]">
          <div>
            {cartDetailed.map(({ product, qty, color, strap }) => (
              <div key={product.id} className="flex gap-5 border-b border-border py-6">
                <Link to="/product/$productId" params={{ productId: product.id }}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-36 w-28 bg-secondary object-cover"
                  />
                </Link>
                <div className="flex flex-1 flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
                        {product.brand}
                      </p>
                      <Link
                        to="/product/$productId"
                        params={{ productId: product.id }}
                        className="font-display text-xl hover:text-gold"
                      >
                        {product.name}
                      </Link>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {color} · {strap} · {product.sku}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        removeFromCart(product.id);
                        toast.message("Removed from cart", { description: product.name });
                      }}
                      aria-label={`Remove ${product.name}`}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-4">
                    <div className="flex items-center border border-border">
                      <button
                        onClick={() => setQty(product.id, qty - 1)}
                        className="px-3 py-2 hover:bg-secondary"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-9 text-center text-sm">{qty}</span>
                      <button
                        onClick={() => setQty(product.id, Math.min(product.stock, qty + 1))}
                        className="px-3 py-2 hover:bg-secondary"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold">{formatPKR(product.price * qty)}</p>
                      <p className="text-xs text-muted-foreground line-through">
                        {formatPKR(product.originalPrice * qty)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="mt-6 flex items-center justify-between">
              <Link to="/shop" className="text-xs tracking-[0.16em] uppercase hover:text-gold">
                ← Continue shopping
              </Link>
              <button
                onClick={() => {
                  clearCart();
                  toast.message("Cart cleared");
                }}
                className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="h-3.5 w-3.5" /> Clear cart
              </button>
            </div>
          </div>

          <aside className="h-fit border border-border p-7 lg:sticky lg:top-28">
            <h2 className="font-display text-2xl">Order Summary</h2>

            <div className="mt-6 space-y-2">
              {coupon ? (
                <div className="flex items-center justify-between border border-gold bg-gold/10 px-3 py-2 text-xs">
                  <span>Coupon {coupon} applied</span>
                  <button onClick={removeCoupon} className="underline underline-offset-2">
                    Remove
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const res = applyCoupon(code);
                    res.ok ? toast.success(res.message) : toast.error(res.message);
                    if (res.ok) setCode("");
                  }}
                  className="flex gap-2"
                >
                  <input
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Coupon code"
                    className="w-full border border-border bg-transparent px-3 py-2 text-xs uppercase outline-none focus:border-gold"
                  />
                  <button className="border border-ink px-4 text-[10px] tracking-[0.18em] uppercase hover:bg-ink hover:text-champagne">
                    Apply
                  </button>
                </form>
              )}
              <p className="text-[11px] text-muted-foreground">
                Try AUREVIA10 for 10% off, or WELCOME500 for ₨500 off.
              </p>
            </div>

            <dl className="mt-6 space-y-3 border-t border-border pt-6 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Subtotal</dt>
                <dd>{formatPKR(totals.subtotal)}</dd>
              </div>
              <div className="flex justify-between text-gold">
                <dt>Collection discount</dt>
                <dd>−{formatPKR(totals.savings)}</dd>
              </div>
              {totals.couponDiscount > 0 && (
                <div className="flex justify-between text-gold">
                  <dt>Coupon {coupon}</dt>
                  <dd>−{formatPKR(totals.couponDiscount)}</dd>
                </div>
              )}
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Delivery</dt>
                <dd>{totals.delivery === 0 ? "Complimentary" : formatPKR(totals.delivery)}</dd>
              </div>
              <div className="flex justify-between border-t border-border pt-4 text-base font-semibold">
                <dt>Total</dt>
                <dd>{formatPKR(totals.total)}</dd>
              </div>
            </dl>

            {totals.total < FREE_DELIVERY_THRESHOLD && (
              <p className="mt-3 text-[11px] text-muted-foreground">
                Add {formatPKR(FREE_DELIVERY_THRESHOLD - totals.subtotal + totals.couponDiscount)}{" "}
                more to unlock complimentary delivery.
              </p>
            )}

            <Link
              to="/checkout"
              className="mt-7 block bg-ink py-4 text-center text-[11px] tracking-[0.24em] text-champagne uppercase transition-opacity hover:opacity-90"
            >
              Proceed to Checkout
            </Link>
          </aside>
        </div>
      )}
    </div>
  );
}
