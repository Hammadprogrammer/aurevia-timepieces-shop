import { useEffect, useMemo, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { ProductCard, ProductCardSkeleton } from "@/components/ProductCard";
import { brands, formatPKR, products as allProducts, type Product } from "@/data/products";
import { cn } from "@/lib/utils";

type Sort = "featured" | "price-asc" | "price-desc" | "rating" | "discount";

const SORTS: { value: Sort; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
  { value: "discount", label: "Biggest Savings" },
];

const PRICE_BANDS = [
  { label: "Under ₨10,000", min: 0, max: 9999 },
  { label: "₨10,000 – ₨19,999", min: 10000, max: 19999 },
  { label: "₨20,000 – ₨29,999", min: 20000, max: 29999 },
  { label: "₨30,000 and above", min: 30000, max: Infinity },
];

export function CatalogView({
  title,
  blurb,
  source = allProducts,
  initialQuery = "",
}: {
  title: string;
  blurb: string;
  source?: Product[];
  initialQuery?: string;
}) {
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState(initialQuery);
  const [sort, setSort] = useState<Sort>("featured");
  const [brandFilter, setBrandFilter] = useState<string[]>([]);
  const [band, setBand] = useState<number | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => setQuery(initialQuery), [initialQuery]);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 420);
    return () => clearTimeout(t);
  }, [source, query, sort, brandFilter, band]);

  const availableBrands = useMemo(
    () => brands.filter((b) => source.some((p) => p.brand === b)),
    [source],
  );

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = source.filter((p) => {
      const matchesQuery =
        !q || `${p.name} ${p.brand} ${p.collection} ${p.movement}`.toLowerCase().includes(q);
      const matchesBrand = brandFilter.length === 0 || brandFilter.includes(p.brand);
      const b = band === null ? null : PRICE_BANDS[band];
      const matchesBand = !b || (p.price >= b.min && p.price <= b.max);
      return matchesQuery && matchesBrand && matchesBand;
    });
    list = [...list].sort((a, b) => {
      switch (sort) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "discount":
          return b.discount - a.discount;
        default:
          return Number(!!b.featured) - Number(!!a.featured) || b.reviews - a.reviews;
      }
    });
    return list;
  }, [source, query, sort, brandFilter, band]);

  const clearAll = () => {
    setBrandFilter([]);
    setBand(null);
    setQuery("");
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <header className="max-w-2xl">
        <p className="text-eyebrow text-gold">Aurevia Collection</p>
        <h1 className="font-display mt-2 text-4xl md:text-5xl">{title}</h1>
        <p className="mt-3 text-sm text-muted-foreground">{blurb}</p>
      </header>

      <div className="mt-10 flex flex-col gap-4 border-y border-border py-4 md:flex-row md:items-center">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search this collection…"
          className="w-full border-b border-border bg-transparent py-2 text-sm outline-none focus:border-gold md:max-w-xs"
        />
        <button
          onClick={() => setShowFilters((v) => !v)}
          className="inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase md:ml-auto"
        >
          <SlidersHorizontal className="h-4 w-4" /> Filters
        </button>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as Sort)}
          className="border border-border bg-background px-3 py-2 text-xs tracking-[0.12em] uppercase outline-none focus:border-gold"
        >
          {SORTS.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      {showFilters && (
        <div className="fade-up grid gap-8 border-b border-border py-6 md:grid-cols-3">
          <div>
            <h3 className="text-eyebrow text-muted-foreground">Brand</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {availableBrands.map((b) => (
                <button
                  key={b}
                  onClick={() =>
                    setBrandFilter((prev) =>
                      prev.includes(b) ? prev.filter((x) => x !== b) : [...prev, b],
                    )
                  }
                  className={cn(
                    "border px-3 py-1.5 text-xs transition-colors",
                    brandFilter.includes(b)
                      ? "border-gold bg-gold/15 text-foreground"
                      : "border-border text-muted-foreground hover:border-gold",
                  )}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-eyebrow text-muted-foreground">Price</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {PRICE_BANDS.map((p, i) => (
                <button
                  key={p.label}
                  onClick={() => setBand(band === i ? null : i)}
                  className={cn(
                    "border px-3 py-1.5 text-xs transition-colors",
                    band === i
                      ? "border-gold bg-gold/15 text-foreground"
                      : "border-border text-muted-foreground hover:border-gold",
                  )}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-end">
            <button onClick={clearAll} className="text-xs text-gold underline underline-offset-4">
              Clear all filters
            </button>
          </div>
        </div>
      )}

      <p className="mt-6 text-xs text-muted-foreground">
        {loading ? "Curating pieces…" : `${results.length} timepieces`}
        {results.length > 0 && !loading && (
          <>
            {" · from "}
            {formatPKR(Math.min(...results.map((r) => r.price)))}
          </>
        )}
      </p>

      {loading ? (
        <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      ) : results.length === 0 ? (
        <div className="py-24 text-center">
          <h2 className="font-display text-2xl">Nothing matches that search</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Try a different model name, or clear your filters to see the full collection.
          </p>
          <button
            onClick={clearAll}
            className="mt-6 border border-ink px-6 py-3 text-[11px] tracking-[0.2em] uppercase hover:bg-ink hover:text-champagne"
          >
            Reset filters
          </button>
        </div>
      ) : (
        <div className="fade-up mt-6 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
          {results.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
