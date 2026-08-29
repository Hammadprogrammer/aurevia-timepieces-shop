import { createFileRoute } from "@tanstack/react-router";
import { CatalogView } from "@/components/CatalogView";

type ShopSearch = { q?: string };

export const Route = createFileRoute("/shop")({
  validateSearch: (search: Record<string, unknown>): ShopSearch => ({
    q: typeof search.q === "string" && search.q ? search.q : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Shop All Watches — AUREVIA" },
      {
        name: "description",
        content:
          "Browse all 42 Aurevia timepieces. Filter by brand, price and collection, sorted by savings or rating, with PKR pricing.",
      },
      { property: "og:title", content: "Shop All Watches — AUREVIA" },
      {
        property: "og:description",
        content: "Every Aurevia reference in one place, with filters, search and sorting.",
      },
    ],
  }),
  component: Shop,
});

function Shop() {
  const { q } = Route.useSearch();
  return (
    <CatalogView
      title="The Complete Collection"
      blurb="Every Aurevia reference — dress, dive, connected and complicated — in one place."
      initialQuery={q ?? ""}
    />
  );
}
