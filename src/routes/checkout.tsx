import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Lock } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { formatPKR } from "@/data/products";
import { cities, paymentMethods, provinces } from "@/data/pakistan";
import { useStore, type CheckoutInfo, type PaymentMethod } from "@/store/StoreProvider";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Secure Checkout — AUREVIA Watches" },
      {
        name: "description",
        content:
          "Complete your Aurevia order with Cash on Delivery, Easypaisa, JazzCash, bank transfer or card, delivered across Pakistan.",
      },
      { property: "og:title", content: "Secure Checkout — AUREVIA Watches" },
      { property: "og:description", content: "Delivery details and payment for your Aurevia order." },
    ],
  }),
  component: Checkout,
});

type Errors = Partial<Record<keyof CheckoutInfo, string>>;

function validate(info: CheckoutInfo): Errors {
  const e: Errors = {};
  if (info.fullName.trim().length < 3) e.fullName = "Enter your full name.";
  if (!/^(\+92|0)?3\d{2}[ -]?\d{7}$/.test(info.phone.replace(/\s/g, "")))
    e.phone = "Enter a valid Pakistani mobile number, e.g. 0300 1234567.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(info.email)) e.email = "Enter a valid email address.";
  if (info.address.trim().length < 10) e.address = "Enter your complete street address.";
  if (!info.city) e.city = "Select your city.";
  if (!info.province) e.province = "Select your province.";
  if (!/^\d{5}$/.test(info.postalCode)) e.postalCode = "Postal code must be 5 digits.";
  return e;
}

function Checkout() {
  const { cartDetailed, totals, checkout, setCheckout, coupon, placeOrder, hydrated } = useStore();
  const [errors, setErrors] = useState<Errors>({});
  const [placing, setPlacing] = useState(false);
  const navigate = useNavigate();

  const set = (patch: Partial<CheckoutInfo>) => setCheckout({ ...checkout, ...patch });

  if (hydrated && cartDetailed.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-28 text-center sm:px-6">
        <h1 className="font-display text-4xl">There is nothing to check out yet</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Add a timepiece to your cart and we'll take it from there.
        </p>
        <Link
          to="/shop"
          className="mt-8 inline-block border border-ink px-8 py-4 text-[11px] tracking-[0.2em] uppercase hover:bg-ink hover:text-champagne"
        >
          Browse the collection
        </Link>
      </div>
    );
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const found = validate(checkout);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      toast.error("Please complete your delivery details", {
        description: Object.values(found)[0],
      });
      return;
    }
    setPlacing(true);
    setTimeout(() => {
      const order = placeOrder();
      setPlacing(false);
      navigate({ to: "/order-success/$orderId", params: { orderId: order.id } });
    }, 900);
  };

  const field = (name: keyof CheckoutInfo) =>
    cn(
      "w-full border-b bg-transparent py-3 text-sm outline-none focus:border-gold",
      errors[name] ? "border-destructive" : "border-border",
    );

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <p className="text-eyebrow text-gold">Step 2 of 2</p>
      <h1 className="font-display mt-2 text-5xl">Secure Checkout</h1>

      <form onSubmit={submit} className="mt-12 grid gap-14 lg:grid-cols-[1fr_380px]">
        <div className="space-y-12">
          <section>
            <h2 className="font-display text-2xl">Delivery details</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div>
                <input
                  className={field("fullName")}
                  placeholder="Full name"
                  value={checkout.fullName}
                  onChange={(e) => set({ fullName: e.target.value })}
                />
                {errors.fullName && (
                  <p className="mt-1 text-xs text-destructive">{errors.fullName}</p>
                )}
              </div>
              <div>
                <input
                  className={field("phone")}
                  placeholder="Mobile number (0300 1234567)"
                  value={checkout.phone}
                  onChange={(e) => set({ phone: e.target.value })}
                />
                {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone}</p>}
              </div>
              <div className="md:col-span-2">
                <input
                  className={field("email")}
                  placeholder="Email address"
                  value={checkout.email}
                  onChange={(e) => set({ email: e.target.value })}
                />
                {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
              </div>
              <div className="md:col-span-2">
                <input
                  className={field("address")}
                  placeholder="Full address (house, street, area)"
                  value={checkout.address}
                  onChange={(e) => set({ address: e.target.value })}
                />
                {errors.address && (
                  <p className="mt-1 text-xs text-destructive">{errors.address}</p>
                )}
              </div>
              <div>
                <select
                  className={field("city")}
                  value={checkout.city}
                  onChange={(e) => set({ city: e.target.value })}
                >
                  <option value="">Select city</option>
                  {cities.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                {errors.city && <p className="mt-1 text-xs text-destructive">{errors.city}</p>}
              </div>
              <div>
                <select
                  className={field("province")}
                  value={checkout.province}
                  onChange={(e) => set({ province: e.target.value })}
                >
                  <option value="">Select province</option>
                  {provinces.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
                {errors.province && (
                  <p className="mt-1 text-xs text-destructive">{errors.province}</p>
                )}
              </div>
              <div>
                <input
                  className={field("postalCode")}
                  placeholder="Postal code (e.g. 75500)"
                  value={checkout.postalCode}
                  onChange={(e) => set({ postalCode: e.target.value })}
                />
                {errors.postalCode && (
                  <p className="mt-1 text-xs text-destructive">{errors.postalCode}</p>
                )}
              </div>
              <div className="md:col-span-2">
                <textarea
                  className={`${field("notes")} min-h-24 resize-none`}
                  placeholder="Delivery notes (landmark, preferred timing, gift message)"
                  value={checkout.notes}
                  onChange={(e) => set({ notes: e.target.value })}
                />
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-display text-2xl">Payment method</h2>
            <div className="mt-6 grid gap-3">
              {paymentMethods.map((m) => (
                <label
                  key={m.value}
                  className={cn(
                    "flex cursor-pointer items-start gap-3 border p-4 transition-colors",
                    checkout.payment === m.value
                      ? "border-gold bg-gold/10"
                      : "border-border hover:border-gold",
                  )}
                >
                  <input
                    type="radio"
                    name="payment"
                    className="mt-1 accent-[var(--gold)]"
                    checked={checkout.payment === m.value}
                    onChange={() => set({ payment: m.value as PaymentMethod })}
                  />
                  <span>
                    <span className="block text-sm font-medium">{m.value}</span>
                    <span className="block text-xs text-muted-foreground">{m.hint}</span>
                  </span>
                </label>
              ))}
            </div>
          </section>
        </div>

        <aside className="h-fit border border-border p-7 lg:sticky lg:top-28">
          <h2 className="font-display text-2xl">Your order</h2>
          <ul className="mt-5 space-y-4 border-b border-border pb-5">
            {cartDetailed.map(({ product, qty, color }) => (
              <li key={product.id} className="flex gap-3">
                <img src={product.image} alt={product.name} className="h-16 w-12 object-cover" />
                <div className="flex-1 text-xs">
                  <p className="font-medium">{product.name}</p>
                  <p className="text-muted-foreground">
                    {color} · Qty {qty}
                  </p>
                </div>
                <p className="text-xs font-semibold">{formatPKR(product.price * qty)}</p>
              </li>
            ))}
          </ul>
          <dl className="mt-5 space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Subtotal</dt>
              <dd>{formatPKR(totals.subtotal)}</dd>
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
          <button
            type="submit"
            disabled={placing}
            className="mt-7 flex w-full items-center justify-center gap-2 bg-gold py-4 text-[11px] tracking-[0.24em] text-ink uppercase transition-opacity hover:opacity-90 disabled:opacity-70"
          >
            {placing ? (
              <>
                <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-ink/40 border-t-ink" />
                Placing order…
              </>
            ) : (
              <>
                <Lock className="h-3.5 w-3.5" /> Place Order
              </>
            )}
          </button>
          <p className="mt-3 text-center text-[11px] text-muted-foreground">
            Your details are kept private and used only for this delivery.
          </p>
        </aside>
      </form>
    </div>
  );
}
