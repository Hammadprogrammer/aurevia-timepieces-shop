import { createFileRoute } from "@tanstack/react-router";
import { CatalogView } from "@/components/CatalogView";
import { byCategory, categoryMeta } from "@/data/products";

export const Route = createFileRoute("/men")({
  head: () => ({
    meta: [
      { title: "Men's Watches — AUREVIA" },
      {
        name: "description",
        content:
          "Men's automatics, chronographs, GMTs and divers from Aurevia, from ₨6,499 with 2-year international warranty.",
      },
      { property: "og:title", content: "Men's Watches — AUREVIA" },
      {
        property: "og:description",
        content: "Dress classics, chronographs and divers engineered for a lifetime of wear.",
      },
    ],
  }),
  component: () => (
    <CatalogView
      title={categoryMeta.men.title}
      blurb={categoryMeta.men.blurb}
      source={byCategory("men")}
    />
  ),
});
