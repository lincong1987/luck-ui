import { createFileRoute } from "@tanstack/react-router";
import { ComponentCanvas } from "../components/home/component-canvas";
import { buildSeoMeta, ogImageUrl } from "../lib/seo";

const PAGE_TITLE = "Luck UI";
const PAGE_DESCRIPTION = "Luck UI —— 一个有温度的组件库。";

export const Route = createFileRoute("/zh/")({
  head: () => ({
    meta: [
      { title: PAGE_TITLE },
      ...buildSeoMeta({
        title: PAGE_TITLE,
        description: PAGE_DESCRIPTION,
        image: ogImageUrl({ title: PAGE_TITLE, description: PAGE_DESCRIPTION }),
      }),
    ],
  }),
  component: ChineseHomePage,
});

function ChineseHomePage() {
  return <ComponentCanvas locale="zh" />;
}
