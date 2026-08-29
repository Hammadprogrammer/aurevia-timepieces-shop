import { Link, useNavigate } from "@tanstack/react-router";
import { Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useStore } from "@/store/StoreProvider";
import { products } from "@/data/products";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/men", label: "Men" },
  { to: "/women", label: "Women" },
  { to: "/luxury", label: "Luxury" },
  { to: "/smart", label: "Smart" },
  { to: "/sports", label: "Sports" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

function Badge({ count }: { count: number }) {
  if (!count) return null;
  return (
    <span className="absolute -top-1.5 -right-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold px-1 text-[10px] font-semibold text-ink">
      {count > 99 ? "99+" : count}
    </span>
  );
}

export function Navbar() {
  const { cartCount, wishlist } = useStore();
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [q, setQ] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const suggestions = q.trim()
    ? products
        .filter((p) =>
          `${p.name} ${p.brand} ${p.collection}`.toLowerCase().includes(q.trim().toLowerCase()),
        )
        .slice(0, 5)
    : [];

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchOpen(false);
    setOpen(false);
    navigate({ to: "/shop", search: { q: q.trim() || undefined } });
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-all duration-300",
        scrolled
          ? "border-border bg-background/90 backdrop-blur-xl"
          : "border-transparent bg-background",
      )}
    >
      <div className="hidden bg-ink py-2 text-center text-[11px] tracking-[0.24em] text-champagne uppercase md:block">
        Complimentary nationwide delivery on orders above ₨20,000
      </div>
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6">
        <button
          className="-ml-2 p-2 lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        <Link to="/" className="font-display text-2xl tracking-[0.34em] whitespace-nowrap">
          AUREVIA
        </Link>

        <nav className="mx-auto hidden items-center gap-7 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className="text-[12px] tracking-[0.16em] text-muted-foreground uppercase transition-colors hover:text-foreground"
              activeProps={{ className: "!text-foreground border-b border-gold pb-0.5" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1 lg:ml-0">
          <button
            className="p-2 transition-colors hover:text-gold"
            onClick={() => setSearchOpen((v) => !v)}
            aria-label="Search watches"
          >
            <Search className="h-[18px] w-[18px]" />
          </button>
          <Link
            to="/wishlist"
            className="relative p-2 transition-colors hover:text-gold"
            aria-label="Wishlist"
          >
            <Heart className="h-[18px] w-[18px]" />
            <Badge count={wishlist.length} />
          </Link>
          <Link
            to="/orders"
            className="relative p-2 transition-colors hover:text-gold"
            aria-label="Account and orders"
          >
            <User className="h-[18px] w-[18px]" />
          </Link>
          <Link
            to="/cart"
            className="relative p-2 transition-colors hover:text-gold"
            aria-label="Cart"
          >
            <ShoppingBag className="h-[18px] w-[18px]" />
            <Badge count={cartCount} />
          </Link>
        </div>
      </div>

      {searchOpen && (
        <div className="border-t border-border bg-background">
          <form onSubmit={submitSearch} className="mx-auto max-w-3xl px-4 py-5 sm:px-6">
            <div className="flex items-center gap-3 border-b border-border pb-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                autoFocus
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search by model, brand or collection…"
                className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
              <button type="submit" className="text-eyebrow text-gold">
                Search
              </button>
            </div>
            {suggestions.length > 0 && (
              <ul className="mt-3 space-y-1">
                {suggestions.map((p) => (
                  <li key={p.id}>
                    <Link
                      to="/product/$productId"
                      params={{ productId: p.id }}
                      onClick={() => setSearchOpen(false)}
                      className="flex items-center gap-3 rounded-sm px-2 py-2 text-sm hover:bg-secondary"
                    >
                      <img src={p.image} alt={p.name} className="h-9 w-9 rounded-sm object-cover" />
                      <span>{p.name}</span>
                      <span className="ml-auto text-xs text-muted-foreground">{p.brand}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </form>
        </div>
      )}

      {open && (
        <nav className="border-t border-border bg-background lg:hidden">
          <ul className="mx-auto max-w-7xl px-4 py-2 sm:px-6">
            {NAV.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  onClick={() => setOpen(false)}
                  activeOptions={{ exact: item.to === "/" }}
                  className="block border-b border-border/60 py-3 text-sm tracking-[0.14em] uppercase last:border-0"
                  activeProps={{ className: "text-gold" }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
