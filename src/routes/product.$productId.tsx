import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { Check, Heart, Minus, Plus, ShieldCheck, Star, Truck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { ProductCard } from "@/components/ProductCard";
import { categoryMeta, formatPKR, getProduct, products } from "@/data/products";
import { useStore } from "@/store/StoreProvider";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/product/$productId")({
  loader: ({ params }) => {
    const product = getProduct(params.productId);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Timepiece unavailable — AUREVIA" }, { name: "robots", content: "noindex" }],
      };
    }
    const p = loaderData.product;
    return {
      meta: [
        { title: `${p.name} by ${p.brand} — AUREVIA` },
        { name: "description", content: p.description.slice(0, 155) },
        { property: "og:title", content: `${p.name} — AUREVIA` },
        { property: "og:description", content: p.description.slice(0, 155) },
        { property: "og:image", content: p.image },
        { name: "twitter:image", content: p.image },
      ],
    };
  },
  component: ProductDetail,
});

function ProductDetail() {
  const { product } = Route.useLoaderData();
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const navigate = useNavigate();
  const [color, setColor] = useState(product.colors[0]);
  const [strap, setStrap] = useState(product.straps[0]);
  const [qty, setQty] = useState(1);
  const wished = isWishlisted(product.id);

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const specs: [string, string][] = [
    ["Movement", product.movement],
    ["Case Material", product.caseMaterial],
    ["Case Size", product.caseSize],
    ["Water Resistance", product.waterResistance],
    ["Warranty", product.warranty],
    ["SKU", product.sku],
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <nav className="text-xs text-muted-foreground">
        <Link to="/" className="hover:text-gold">
          Home
        </Link>
        {" / "}
        <Link to={categoryMeta[product.category].path} className="hover:text-gold">
          {categoryMeta[product.category].title}
        </Link>
        {" / "}
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="mt-8 grid gap-12 lg:grid-cols-2">
        <div className="fade-up">
          <img
            src={product.image}
            alt={`${product.brand} ${product.name}`}
            className="aspect-4/5 w-full bg-secondary object-cover"
          />
          <div className="mt-4 grid grid-cols-3 gap-4">
            {[product.image, related[0]?.image, related[1]?.image]
              .filter(Boolean)
              .map((src, i) => (
                <img
                  key={i}
                  src={src as string}
                  alt={`${product.name} detail ${i + 1}`}
                  loading="lazy"
                  className="aspect-square w-full bg-secondary object-cover"
                />
              ))}
          </div>
        </div>

        <div className="fade-up">
          <p className="text-[11px] tracking-[0.24em] text-muted-foreground uppercase">
            {product.brand} · {product.collection} Collection
          </p>
          <h1 className="font-display mt-2 text-4xl md:text-5xl">{product.name}</h1>

          <div className="mt-3 flex items-center gap-2 text-sm">
            <span className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-4 w-4",
                    i < Math.round(product.rating) ? "fill-gold text-gold" : "text-border",
                  )}
                />
              ))}
            </span>
            <span className="text-muted-foreground">
              {product.rating.toFixed(1)} · {product.reviews} reviews
            </span>
          </div>

          <div className="mt-6 flex items-baseline gap-3">
            <span className="font-display text-4xl">{formatPKR(product.price)}</span>
            <span className="text-sm text-muted-foreground line-through">
              {formatPKR(product.originalPrice)}
            </span>
            <span className="bg-gold px-2 py-1 text-[10px] tracking-[0.16em] text-ink uppercase">
              Save {product.discount}%
            </span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">Inclusive of all duties and taxes.</p>

          <p className="mt-6 text-sm leading-relaxed text-muted-foreground">{product.description}</p>

          <div className="mt-8">
            <p className="text-eyebrow text-muted-foreground">Dial / Colour</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.colors.map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={cn(
                    "border px-4 py-2 text-xs transition-colors",
                    color === c ? "border-gold bg-gold/15" : "border-border hover:border-gold",
                  )}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <p className="text-eyebrow text-muted-foreground">Strap</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.straps.map((s) => (
                <button
                  key={s}
                  onClick={() => setStrap(s)}
                  className={cn(
                    "border px-4 py-2 text-xs transition-colors",
                    strap === s ? "border-gold bg-gold/15" : "border-border hover:border-gold",
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <div className="flex items-center border border-border">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="px-4 py-3 hover:bg-secondary"
                aria-label="Decrease quantity"
              >
                <Minus className="h-3.5 w-3.5" />
              </button>
              <span className="w-10 text-center text-sm">{qty}</span>
              <button
                onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
                className="px-4 py-3 hover:bg-secondary"
                aria-label="Increase quantity"
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>
            <span className="text-xs text-muted-foreground">
              {product.stock > 5
                ? "In stock, ships within 24 hours"
                : `Only ${product.stock} left at the atelier`}
            </span>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => {
                addToCart(product.id, { qty, color, strap });
                toast.success("Added to cart", {
                  description: `${product.name} · ${color} · ${strap}`,
                });
              }}
              className="flex-1 bg-ink px-8 py-4 text-[11px] tracking-[0.24em] text-champagne uppercase transition-opacity hover:opacity-90"
            >
              Add to Cart
            </button>
            <button
              onClick={() => {
                addToCart(product.id, { qty, color, strap });
                navigate({ to: "/checkout" });
              }}
              className="flex-1 bg-gold px-8 py-4 text-[11px] tracking-[0.24em] text-ink uppercase transition-opacity hover:opacity-90"
            >
              Buy Now
            </button>
            <button
              onClick={() => {
                const added = toggleWishlist(product.id);
                toast[added ? "success" : "message"](
                  added ? "Saved to wishlist" : "Removed from wishlist",
                  { description: product.name },
                );
              }}
              className="flex items-center justify-center border border-border px-5 py-4 hover:border-gold"
              aria-label="Toggle wishlist"
            >
              <Heart className={cn("h-4 w-4", wished && "fill-gold text-gold")} />
            </button>
          </div>

          <div className="mt-8 grid gap-3 border-t border-border pt-6 text-xs text-muted-foreground">
            <p className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-gold" /> Free delivery on orders above ₨20,000 ·
              Cash on Delivery available
            </p>
            <p className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-gold" /> {product.warranty}
            </p>
            <p className="flex items-center gap-2">
              <Check className="h-4 w-4 text-gold" /> Seven-day exchange on unworn pieces
            </p>
          </div>

          <div className="mt-10">
            <h2 className="font-display text-2xl">Specifications</h2>
            <dl className="mt-4 divide-y divide-border border-y border-border text-sm">
              {specs.map(([k, v]) => (
                <div key={k} className="flex justify-between py-3">
                  <dt className="text-muted-foreground">{k}</dt>
                  <dd className="text-right font-medium">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-24">
          <p className="text-eyebrow text-gold">You may also like</p>
          <h2 className="font-display mt-2 text-3xl">
            More from {categoryMeta[product.category].title}
          </h2>
          <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
