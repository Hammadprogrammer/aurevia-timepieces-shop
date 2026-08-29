import { createFileRoute } from "@tanstack/react-router";
import { CatalogView } from "@/components/CatalogView";
import { byCategory, categoryMeta } from "@/data/products";

export const Route = createFileRoute("/sports")({
  head: () => ({
    meta: [
      { title: "Sports Watches — AUREVIA" },
      {
        name: "description",
        content:
          "Solar, titanium and 300m dive-rated sports watches built for Pakistan's trails, pools and racetracks.",
      },
      { property: "og:title", content: "Sports Watches — AUREVIA" },
      {
        property: "og:description",
        content: "Solar, titanium and dive-rated instruments for the outdoors.",
      },
    ],
  }),
  component: () => (
    <CatalogView
      title={categoryMeta.sports.title}
      blurb={categoryMeta.sports.blurb}
      source={byCategory("sports")}
    />
  ),
});
