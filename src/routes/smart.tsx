import { createFileRoute } from "@tanstack/react-router";
import { CatalogView } from "@/components/CatalogView";
import { byCategory, categoryMeta } from "@/data/products";

export const Route = createFileRoute("/smart")({
  head: () => ({
    meta: [
      { title: "Smart Watches — AUREVIA" },
      {
        name: "description",
        content:
          "AMOLED displays, dual-band GPS and hybrid mechanical smart watches from Aurevia Tech, from ₨4,999.",
      },
      { property: "og:title", content: "Smart Watches — AUREVIA" },
      {
        property: "og:description",
        content: "Connected timekeeping that still looks like a watch.",
      },
    ],
  }),
  component: () => (
    <CatalogView
      title={categoryMeta.smart.title}
      blurb={categoryMeta.smart.blurb}
      source={byCategory("smart")}
    />
  ),
});
