import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our Maison — AUREVIA Watches" },
      {
        name: "description",
        content:
          "Aurevia is a Pakistani watch house in Karachi hand-finishing and regulating every timepiece before dispatch.",
      },
      { property: "og:title", content: "Our Maison — AUREVIA Watches" },
      {
        property: "og:description",
        content: "A Karachi atelier making watches for a lifetime, not a season.",
      },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div>
      <section className="relative isolate overflow-hidden bg-ink text-champagne">
        <img
          src="https://images.unsplash.com/photo-1495856458515-0637185db551?auto=format&fit=crop&w=1600&q=80"
          alt="Watchmaking tools on the Aurevia workbench"
          className="absolute inset-0 h-full w-full object-cover opacity-35"
        />
        <div className="relative mx-auto max-w-7xl px-4 py-28 sm:px-6">
          <p className="text-eyebrow text-gold">Since 2014 · Karachi</p>
          <h1 className="font-display mt-4 max-w-3xl text-5xl md:text-6xl">
            A Pakistani house building watches meant to outlive their owners
          </h1>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 md:grid-cols-2">
        <div>
          <h2 className="font-display text-3xl">Our story</h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Aurevia began in a two-bench workshop off Zamzama, assembling and regulating movements
            for collectors who wanted international finishing without an international markup. A
            decade later we design our own cases, dials and bracelets, and every reference is still
            inspected by hand in Karachi before it is boxed.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            We keep five collections and no more. Each one exists because a customer asked for
            something we could not honestly recommend elsewhere — a dress watch under a cuff, a
            dive watch for the Arabian Sea, a smart watch that does not look like a gadget.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            { k: "42", v: "References in the catalogue" },
            { k: "5", v: "Collections, deliberately" },
            { k: "40hrs", v: "Hand-finishing on a Maison piece" },
            { k: "5 yrs", v: "Warranty on Maison movements" },
          ].map((s) => (
            <div key={s.k} className="border border-border p-6">
              <div className="font-display text-4xl text-gold">{s.k}</div>
              <p className="mt-2 text-xs text-muted-foreground">{s.v}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-secondary/60 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="font-display text-3xl">What we promise</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {[
              {
                t: "Honest pricing in rupees",
                d: "Every price is landed, taxed and final. No customs surprises after checkout.",
              },
              {
                t: "Service for life",
                d: "Movement servicing at cost for as long as you own the watch, in-house.",
              },
              {
                t: "Seven-day exchange",
                d: "Wear it a week. If the proportions aren't right, exchange it without argument.",
              },
            ].map((c) => (
              <div key={c.t}>
                <div className="gold-rule h-px w-16" />
                <h3 className="font-display mt-4 text-2xl">{c.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{c.d}</p>
              </div>
            ))}
          </div>
          <Link
            to="/shop"
            className="mt-12 inline-block border border-ink px-8 py-4 text-[11px] tracking-[0.2em] uppercase hover:bg-ink hover:text-champagne"
          >
            Explore the collection
          </Link>
        </div>
      </section>
    </div>
  );
}
