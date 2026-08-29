import { createFileRoute } from "@tanstack/react-router";
import { CatalogView } from "@/components/CatalogView";
import { byCategory, categoryMeta } from "@/data/products";

export const Route = createFileRoute("/women")({
  head: () => ({
    meta: [
      { title: "Women's Watches — AUREVIA" },
      {
        name: "description",
        content:
          "Women's timepieces with mother-of-pearl dials, ceramic cases and jewellery-grade finishing, priced from ₨5,999.",
      },
      { property: "og:title", content: "Women's Watches — AUREVIA" },
      {
        property: "og:description",
        content: "Refined proportions, mother-of-pearl dials and jewellery-grade finishing.",
      },
    ],
  }),
  component: () => (
    <CatalogView
      title={categoryMeta.women.title}
      blurb={categoryMeta.women.blurb}
      source={byCategory("women")}
    />
  ),
});
