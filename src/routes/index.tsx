import { createFileRoute } from "@tanstack/react-router";
import { ComponentCanvas } from "../components/home/component-canvas";
import { brandImageUrl, buildSeoMeta } from "../lib/seo";

const HOME_TITLE = "Luck UI";
const HOME_DESCRIPTION = "Luck UI — a warm component library.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: HOME_TITLE },
      ...buildSeoMeta({
        title: HOME_TITLE,
        description: HOME_DESCRIPTION,
        image: brandImageUrl(),
      }),
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return <ComponentCanvas locale="en" />;
}
