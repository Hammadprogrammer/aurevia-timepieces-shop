import { createFileRoute, Link } from "@tanstack/react-router";
import { formatPKR } from "@/data/products";
import { ORDER_STAGES, useStore } from "@/store/StoreProvider";
import { OrderTimeline, currentStageIndex } from "@/components/OrderTimeline";

export const Route = createFileRoute("/orders/$orderId")({
  head: () => ({
    meta: [
      { title: "Order Details — AUREVIA Watches" },
      {
        name: "description",
        content: "Full details and delivery timeline for your Aurevia order.",
      },
      { property: "og:title", content: "Order Details — AUREVIA Watches" },
      { property: "og:description", content: "Items, payment and delivery timeline." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: OrderDetails,
});

function OrderDetails() {
  const { orderId } = Route.useParams();
  const { orders, hydrated } = useStore();
  const order = orders.find((o) => o.id === orderId);

  if (!hydrated) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-28 text-center">
        <span className="mx-auto block h-8 w-8 animate-spin rounded-full border-2 border-border border-t-gold" />
        <p className="mt-4 text-sm text-muted-foreground">Loading your order…</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="mx-auto max-w-xl px-4 py-28 text-center">
        <h1 className="font-display text-4xl">Order not found</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          This order isn't on this device. Check the order ID and try again.
        </p>
        <Link
          to="/orders"
          className="mt-8 inline-block border border-ink px-8 py-4 text-[11px] tracking-[0.2em] uppercase hover:bg-ink hover:text-champagne"
        >
          Back to my orders
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <Link to="/orders" className="text-xs tracking-[0.16em] uppercase hover:text-gold">
        ← All orders
      </Link>
      <p className="text-eyebrow mt-6 text-gold">Order {order.id}</p>
      <h1 className="font-display mt-2 text-4xl">
        {ORDER_STAGES[currentStageIndex(order)]}
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Placed{" "}
        {new Date(order.placedAt).toLocaleString("en-PK", {
          day: "numeric",
          month: "long",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}{" "}
        · Estimated delivery {order.estimatedDelivery}
      </p>

      <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_340px]">
        <div>
          <h2 className="font-display text-2xl">Items</h2>
          <ul className="mt-4 divide-y divide-border border-y border-border">
            {order.items.map((i) => (
              <li key={i.productId} className="flex gap-4 py-5">
                <img src={i.image} alt={i.name} className="h-24 w-20 bg-secondary object-cover" />
                <div className="flex-1">
                  <p className="text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
                    {i.brand}
                  </p>
                  <Link
                    to="/product/$productId"
                    params={{ productId: i.productId }}
                    className="font-display text-xl hover:text-gold"
                  >
                    {i.name}
                  </Link>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {i.color} · {i.strap} · {i.sku} · Qty {i.qty}
                  </p>
                </div>
                <p className="text-sm font-semibold">{formatPKR(i.price * i.qty)}</p>
              </li>
            ))}
          </ul>

          <h2 className="font-display mt-12 text-2xl">Delivery timeline</h2>
          <OrderTimeline order={order} />
        </div>

        <aside className="h-fit space-y-8 border border-border p-7">
          <div>
            <h3 className="text-eyebrow text-muted-foreground">Payment summary</h3>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Subtotal</dt>
                <dd>{formatPKR(order.subtotal)}</dd>
              </div>
              {order.couponDiscount > 0 && (
                <div className="flex justify-between text-gold">
                  <dt>Coupon {order.couponCode}</dt>
                  <dd>−{formatPKR(order.couponDiscount)}</dd>
                </div>
              )}
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Delivery</dt>
                <dd>{order.delivery === 0 ? "Complimentary" : formatPKR(order.delivery)}</dd>
              </div>
              <div className="flex justify-between border-t border-border pt-3 text-base font-semibold">
                <dt>Total</dt>
                <dd>{formatPKR(order.total)}</dd>
              </div>
              <p className="pt-2 text-xs text-muted-foreground">Paid via {order.info.payment}</p>
            </dl>
          </div>

          <div>
            <h3 className="text-eyebrow text-muted-foreground">Delivery address</h3>
            <address className="mt-3 text-sm not-italic">
              {order.info.fullName}
              <br />
              {order.info.address}
              <br />
              {order.info.city}, {order.info.province} {order.info.postalCode}
              <br />
              {order.info.phone}
              <br />
              {order.info.email}
            </address>
            {order.info.notes && (
              <p className="mt-3 text-xs text-muted-foreground">Notes: {order.info.notes}</p>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
