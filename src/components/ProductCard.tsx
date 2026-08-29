import { Link } from "@tanstack/react-router";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { toast } from "sonner";
import { formatPKR, type Product } from "@/data/products";
import { useStore } from "@/store/StoreProvider";
import { cn } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const wished = isWishlisted(product.id);

  return (
    <article className="group relative flex flex-col">
      <Link
        to="/product/$productId"
        params={{ productId: product.id }}
        className="relative block overflow-hidden bg-secondary"
      >
        <img
          src={product.image}
          alt={`${product.brand} ${product.name} wristwatch`}
          loading="lazy"
          className="aspect-4/5 w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {product.discount > 0 && (
          <span className="absolute top-3 left-3 bg-ink px-2 py-1 text-[10px] tracking-[0.18em] text-champagne uppercase">
            −{product.discount}%
          </span>
        )}
        {product.stock <= 5 && (
          <span className="absolute top-3 right-3 bg-gold px-2 py-1 text-[10px] tracking-[0.18em] text-ink uppercase">
            {product.stock} left
          </span>
        )}
      </Link>

      <button
        onClick={() => {
          const added = toggleWishlist(product.id);
          toast[added ? "success" : "message"](
            added ? "Saved to wishlist" : "Removed from wishlist",
            { description: product.name },
          );
        }}
        aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
        className="absolute top-3 right-3 hidden h-9 w-9 items-center justify-center rounded-full bg-background/90 opacity-0 shadow-sm transition-opacity group-hover:opacity-100 md:flex"
      >
        <Heart className={cn("h-4 w-4", wished && "fill-gold text-gold")} />
      </button>

      <div className="flex flex-1 flex-col pt-4">
        <p className="text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
          {product.brand}
        </p>
        <Link
          to="/product/$productId"
          params={{ productId: product.id }}
          className="font-display mt-1 text-xl leading-snug hover:text-gold"
        >
          {product.name}
        </Link>
        <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
          <Star className="h-3.5 w-3.5 fill-gold text-gold" />
          {product.rating.toFixed(1)}
          <span>({product.reviews})</span>
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-sm font-semibold">{formatPKR(product.price)}</span>
          <span className="text-xs text-muted-foreground line-through">
            {formatPKR(product.originalPrice)}
          </span>
        </div>
        <button
          onClick={() => {
            addToCart(product.id);
            toast.success("Added to cart", {
              description: `${product.name} — ${formatPKR(product.price)}`,
            });
          }}
          className="mt-4 inline-flex items-center justify-center gap-2 border border-ink px-4 py-2.5 text-[11px] tracking-[0.2em] uppercase transition-colors hover:bg-ink hover:text-champagne"
        >
          <ShoppingBag className="h-3.5 w-3.5" /> Add to Cart
        </button>
      </div>
    </article>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-4/5 w-full bg-secondary" />
      <div className="mt-4 h-3 w-1/3 bg-secondary" />
      <div className="mt-2 h-4 w-3/4 bg-secondary" />
      <div className="mt-2 h-3 w-1/4 bg-secondary" />
      <div className="mt-4 h-10 w-full bg-secondary" />
    </div>
  );
}
