import { createFileRoute } from "@tanstack/react-router";
import { CatalogView } from "@/components/CatalogView";
import { byCategory, categoryMeta } from "@/data/products";

export const Route = createFileRoute("/luxury")({
  head: () => ({
    meta: [
      { title: "Luxury Watches — AUREVIA Maison" },
      {
        name: "description",
        content:
          "Tourbillons, perpetual calendars and hand-finished skeletons from the Aurevia Maison workshops, with 5-year warranty.",
      },
      { property: "og:title", content: "Luxury Watches — AUREVIA Maison" },
      {
        property: "og:description",
        content: "Hand-finished complications from the Aurevia Maison workshops.",
      },
    ],
  }),
  component: () => (
    <CatalogView
      title={categoryMeta.luxury.title}
      blurb={categoryMeta.luxury.blurb}
      source={byCategory("luxury")}
    />
  ),
});
