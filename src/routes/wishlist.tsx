import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, ShoppingBag, X } from "lucide-react";
import { toast } from "sonner";
import { formatPKR, getProduct } from "@/data/products";
import { useStore } from "@/store/StoreProvider";
import { ProductCardSkeleton } from "@/components/ProductCard";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [
      { title: "My Wishlist — AUREVIA Watches" },
      {
        name: "description",
        content: "The Aurevia timepieces you have saved, ready to move into your cart.",
      },
      { property: "og:title", content: "My Wishlist — AUREVIA Watches" },
      { property: "og:description", content: "Your saved Aurevia timepieces." },
    ],
  }),
  component: Wishlist,
});

function Wishlist() {
  const { wishlist, removeFromWishlist, addToCart, hydrated } = useStore();
  const items = wishlist.map(getProduct).filter(Boolean);

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <p className="text-eyebrow text-gold">Saved Pieces</p>
      <h1 className="font-display mt-2 text-5xl">My Wishlist</h1>

      {!hydrated ? (
        <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="py-28 text-center">
          <Heart className="mx-auto h-10 w-10 text-gold" />
          <h2 className="font-display mt-6 text-3xl">Your wishlist is waiting</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Tap the heart on any timepiece to keep it here while you decide.
          </p>
          <Link
            to="/shop"
            className="mt-8 inline-block border border-ink px-8 py-4 text-[11px] tracking-[0.2em] uppercase hover:bg-ink hover:text-champagne"
          >
            Discover watches
          </Link>
        </div>
      ) : (
        <div className="fade-up mt-12 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
          {items.map((p) => (
            <article key={p!.id} className="group relative flex flex-col">
              <Link
                to="/product/$productId"
                params={{ productId: p!.id }}
                className="overflow-hidden bg-secondary"
              >
                <img
                  src={p!.image}
                  alt={p!.name}
                  loading="lazy"
                  className="aspect-4/5 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </Link>
              <button
                onClick={() => {
                  removeFromWishlist(p!.id);
                  toast.message("Removed from wishlist", { description: p!.name });
                }}
                aria-label="Remove from wishlist"
                className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-background/90 shadow-sm"
              >
                <X className="h-4 w-4" />
              </button>
              <p className="mt-4 text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
                {p!.brand}
              </p>
              <Link
                to="/product/$productId"
                params={{ productId: p!.id }}
                className="font-display mt-1 text-xl hover:text-gold"
              >
                {p!.name}
              </Link>
              <p className="mt-1 text-sm font-semibold">{formatPKR(p!.price)}</p>
              <button
                onClick={() => {
                  addToCart(p!.id);
                  toast.success("Added to cart", { description: p!.name });
                }}
                className="mt-4 inline-flex items-center justify-center gap-2 border border-ink px-4 py-2.5 text-[11px] tracking-[0.2em] uppercase hover:bg-ink hover:text-champagne"
              >
                <ShoppingBag className="h-3.5 w-3.5" /> Move to Cart
              </button>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
