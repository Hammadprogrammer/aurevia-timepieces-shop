import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Gem, ShieldCheck, Truck } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { categoryMeta, products } from "@/data/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AUREVIA Watches — Timeless Craft. Modern Elegance." },
      {
        name: "description",
        content:
          "Discover Aurevia's premium watch collections: luxury complications, dive-rated sports watches, connected smart watches and refined dress pieces, priced in PKR.",
      },
      { property: "og:title", content: "AUREVIA Watches — Timeless Craft. Modern Elegance." },
      {
        property: "og:description",
        content: "Premium Pakistani watch house. Free nationwide delivery above ₨20,000.",
      },
    ],
  }),
  component: Home,
});

const HERO =
  "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?auto=format&fit=crop&w=1600&q=80";

function Home() {
  const featured = products.filter((p) => p.featured);
  const bestSellers = [...products].sort((a, b) => b.reviews - a.reviews).slice(0, 8);
  const deals = [...products].sort((a, b) => b.discount - a.discount).slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-ink text-champagne">
        <img
          src={HERO}
          alt="Close-up of a luxury Aurevia automatic wristwatch"
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div className="relative mx-auto flex min-h-[78vh] max-w-7xl flex-col justify-center px-4 py-24 sm:px-6">
          <p className="text-eyebrow fade-up text-gold">Est. Karachi · Aurevia Maison</p>
          <h1 className="font-display fade-up mt-4 max-w-3xl text-5xl leading-[1.05] md:text-7xl">
            Timeless Craft.
            <br />
            Modern Elegance.
          </h1>
          <p className="fade-up mt-6 max-w-md text-sm text-champagne/80">
            Forty-two references across five collections — hand-regulated movements, sapphire
            crystals and pricing in rupees, delivered anywhere in Pakistan.
          </p>
          <div className="fade-up mt-10 flex flex-wrap gap-3">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 bg-gold px-8 py-4 text-[11px] tracking-[0.24em] text-ink uppercase transition-opacity hover:opacity-90"
            >
              Explore the collection <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/luxury"
              className="border border-champagne/40 px-8 py-4 text-[11px] tracking-[0.24em] uppercase transition-colors hover:bg-champagne/10"
            >
              The Maison line
            </Link>
          </div>
        </div>
      </section>

      {/* Assurances */}
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-3">
          {[
            { icon: ShieldCheck, t: "2–5 Year Warranty", d: "International coverage on every movement." },
            { icon: Truck, t: "Nationwide Delivery", d: "Complimentary above ₨20,000, 3–5 working days." },
            { icon: Gem, t: "Atelier Finishing", d: "Every piece inspected and regulated before dispatch." },
          ].map(({ icon: Icon, t, d }) => (
            <div key={t} className="flex items-start gap-4">
              <Icon className="mt-0.5 h-5 w-5 text-gold" />
              <div>
                <p className="text-sm font-medium">{t}</p>
                <p className="text-xs text-muted-foreground">{d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Collections */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <p className="text-eyebrow text-gold">Five Collections</p>
        <h2 className="font-display mt-2 text-4xl">Find your register</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {(Object.keys(categoryMeta) as (keyof typeof categoryMeta)[]).map((key, i) => {
            const meta = categoryMeta[key];
            const hero = products.find((p) => p.category === key)!;
            return (
              <Link
                key={key}
                to={meta.path}
                className={`group relative block overflow-hidden bg-secondary ${i < 2 ? "md:col-span-1" : ""}`}
              >
                <img
                  src={hero.image}
                  alt={meta.title}
                  loading="lazy"
                  className="aspect-4/3 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-ink/80 to-transparent" />
                <div className="absolute bottom-0 p-6 text-champagne">
                  <h3 className="font-display text-2xl">{meta.title}</h3>
                  <p className="mt-1 max-w-xs text-xs text-champagne/75">{meta.blurb}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured */}
      <section className="bg-secondary/60 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-eyebrow text-gold">Curated</p>
              <h2 className="font-display mt-2 text-4xl">Signature pieces</h2>
            </div>
            <Link to="/shop" className="text-[11px] tracking-[0.2em] uppercase hover:text-gold">
              View all
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Deals */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <p className="text-eyebrow text-gold">Atelier Offers</p>
        <h2 className="font-display mt-2 text-4xl">Biggest savings this season</h2>
        <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
          {deals.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Editorial */}
      <section className="bg-ink text-champagne">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-24 sm:px-6 md:grid-cols-2">
          <img
            src="https://images.unsplash.com/photo-1533139143976-30918502365b?auto=format&fit=crop&w=1200&q=80"
            alt="Watchmaker assembling a movement at the Aurevia bench"
            loading="lazy"
            className="aspect-4/3 w-full object-cover"
          />
          <div>
            <p className="text-eyebrow text-gold">The Bench</p>
            <h2 className="font-display mt-3 text-4xl">
              Forty hours of hand-finishing, before it ever meets a wrist
            </h2>
            <p className="mt-4 text-sm text-champagne/75">
              Bridges are chamfered by hand, every balance is regulated in five positions, and each
              case is polished in three stages. It is slow work, and it is the only reason an
              Aurevia keeps its rhythm decades later.
            </p>
            <Link
              to="/about"
              className="mt-8 inline-flex items-center gap-2 border border-champagne/40 px-8 py-4 text-[11px] tracking-[0.24em] uppercase hover:bg-champagne/10"
            >
              Our story <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Best sellers */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <p className="text-eyebrow text-gold">Most Worn</p>
        <h2 className="font-display mt-2 text-4xl">Best sellers</h2>
        <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
          {bestSellers.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
