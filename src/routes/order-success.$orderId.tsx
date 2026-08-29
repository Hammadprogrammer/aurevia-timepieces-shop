import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { formatPKR } from "@/data/products";
import { useStore } from "@/store/StoreProvider";

export const Route = createFileRoute("/order-success/$orderId")({
  head: () => ({
    meta: [
      { title: "Order Confirmed — AUREVIA Watches" },
      {
        name: "description",
        content: "Your Aurevia order is confirmed and being prepared at our Karachi atelier.",
      },
      { property: "og:title", content: "Order Confirmed — AUREVIA Watches" },
      { property: "og:description", content: "Thank you for your Aurevia order." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: OrderSuccess,
});

function OrderSuccess() {
  const { orderId } = Route.useParams();
  const { orders, hydrated } = useStore();
  const order = orders.find((o) => o.id === orderId);

  if (!hydrated) {
    return (
      <div className="mx-auto max-w-xl px-4 py-32 text-center">
        <span className="mx-auto block h-8 w-8 animate-spin rounded-full border-2 border-border border-t-gold" />
        <p className="mt-4 text-sm text-muted-foreground">Confirming your order…</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="mx-auto max-w-xl px-4 py-32 text-center">
        <h1 className="font-display text-4xl">We couldn't find that order</h1>
        <Link
          to="/orders"
          className="mt-8 inline-block border border-ink px-8 py-4 text-[11px] tracking-[0.2em] uppercase hover:bg-ink hover:text-champagne"
        >
          View my orders
        </Link>
      </div>
    );
  }

  return (
    <div className="relative min-h-[80vh] bg-ink/95 px-4 py-16">
      <div className="fade-up mx-auto max-w-xl border border-gold/40 bg-background p-8 shadow-2xl sm:p-12">
        <div className="text-center">
          <CheckCircle2 className="mx-auto h-12 w-12 text-gold" />
          <p className="text-eyebrow mt-5 text-gold">Order Confirmed</p>
          <h1 className="font-display mt-3 text-4xl">Thank you for your order</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Your order has been placed successfully. Our team will contact you shortly to confirm
            the delivery of your Aurevia timepiece.
          </p>
        </div>

        <dl className="mt-8 space-y-3 border-y border-border py-6 text-sm">
          <div className="flex justify-between gap-6">
            <dt className="text-muted-foreground">Order ID</dt>
            <dd className="font-medium">{order.id}</dd>
          </div>
          <div className="flex justify-between gap-6">
            <dt className="text-muted-foreground">Total amount</dt>
            <dd className="font-medium">{formatPKR(order.total)}</dd>
          </div>
          <div className="flex justify-between gap-6">
            <dt className="text-muted-foreground">Payment method</dt>
            <dd className="font-medium">{order.info.payment}</dd>
          </div>
          <div className="flex justify-between gap-6">
            <dt className="text-muted-foreground">Delivery address</dt>
            <dd className="max-w-[60%] text-right font-medium">
              {order.info.address}, {order.info.city}, {order.info.province}{" "}
              {order.info.postalCode}
            </dd>
          </div>
          <div className="flex justify-between gap-6">
            <dt className="text-muted-foreground">Estimated delivery</dt>
            <dd className="font-medium">{order.estimatedDelivery}</dd>
          </div>
        </dl>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            to="/orders/$orderId"
            params={{ orderId: order.id }}
            className="flex-1 bg-ink py-4 text-center text-[11px] tracking-[0.24em] text-champagne uppercase hover:opacity-90"
          >
            View Order
          </Link>
          <Link
            to="/shop"
            className="flex-1 border border-ink py-4 text-center text-[11px] tracking-[0.24em] uppercase hover:bg-ink hover:text-champagne"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
