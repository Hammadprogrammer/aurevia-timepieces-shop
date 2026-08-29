import { createFileRoute, Link } from "@tanstack/react-router";
import { Package } from "lucide-react";
import { formatPKR } from "@/data/products";
import { ORDER_STAGES, useStore } from "@/store/StoreProvider";
import { currentStageIndex } from "@/components/OrderTimeline";

export const Route = createFileRoute("/orders/")({
  head: () => ({
    meta: [
      { title: "My Orders — AUREVIA Watches" },
      {
        name: "description",
        content: "Track every Aurevia order, from confirmation at the atelier to delivery.",
      },
      { property: "og:title", content: "My Orders — AUREVIA Watches" },
      { property: "og:description", content: "Your Aurevia order history and delivery tracking." },
    ],
  }),
  component: Orders,
});

function Orders() {
  const { orders, hydrated } = useStore();

  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <p className="text-eyebrow text-gold">Your Account</p>
      <h1 className="font-display mt-2 text-5xl">My Orders</h1>

      {!hydrated ? (
        <div className="mt-12 space-y-4">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="h-40 animate-pulse border border-border bg-secondary/50" />
          ))}
        </div>
      ) : orders.length === 0 ? (
        <div className="py-28 text-center">
          <Package className="mx-auto h-10 w-10 text-gold" />
          <h2 className="font-display mt-6 text-3xl">No orders yet</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            When you place an order it will appear here with live delivery tracking.
          </p>
          <Link
            to="/shop"
            className="mt-8 inline-block border border-ink px-8 py-4 text-[11px] tracking-[0.2em] uppercase hover:bg-ink hover:text-champagne"
          >
            Start shopping
          </Link>
        </div>
      ) : (
        <div className="fade-up mt-12 space-y-6">
          {orders.map((order) => {
            const stage = ORDER_STAGES[currentStageIndex(order)];
            return (
              <article key={order.id} className="border border-border p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
                      Order {order.id}
                    </p>
                    <p className="mt-1 text-sm">
                      Placed{" "}
                      {new Date(order.placedAt).toLocaleDateString("en-PK", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}{" "}
                      · {order.items.reduce((n, i) => n + i.qty, 0)} item(s) · {order.info.payment}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {order.info.address}, {order.info.city}, {order.info.province}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="bg-gold px-3 py-1 text-[10px] tracking-[0.18em] text-ink uppercase">
                      {stage}
                    </span>
                    <p className="font-display mt-2 text-2xl">{formatPKR(order.total)}</p>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-3">
                  {order.items.map((i) => (
                    <img
                      key={i.productId}
                      src={i.image}
                      alt={i.name}
                      className="h-16 w-12 bg-secondary object-cover"
                    />
                  ))}
                  <Link
                    to="/orders/$orderId"
                    params={{ orderId: order.id }}
                    className="ml-auto border border-ink px-6 py-3 text-[11px] tracking-[0.2em] uppercase hover:bg-ink hover:text-champagne"
                  >
                    View details
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
