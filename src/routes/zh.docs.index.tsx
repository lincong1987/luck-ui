import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { DocsShell } from "../components/site/docs-shell";
import { docsZhClientLoader } from "../lib/docs-client-loader";
import { getDocPage } from "../lib/docs-page-data";
import { brandImageUrl, buildSeoMeta, SITE_NAME } from "../lib/seo";

const getZhIndexDoc = createServerFn({ method: "GET" }).handler(async () => getDocPage([], "zh"));

export const Route = createFileRoute("/zh/docs/")({
  loader: async () => {
    const data = await getZhIndexDoc();
    await docsZhClientLoader.preload(data.path);
    return data;
  },
  head: ({ loaderData }) => {
    const title = loaderData?.title ?? "文档";
    const description = loaderData?.description ?? "Luck UI 组件文档。";
    return {
      meta: [
        { title: `${title} - ${SITE_NAME}` },
        ...buildSeoMeta({ title, description, image: brandImageUrl() }),
      ],
    };
  },
  component: ZhDocsIndexPage,
});

function ZhDocsIndexPage() {
  const data = Route.useLoaderData();
  return <DocsShell>{docsZhClientLoader.useContent(data.path)}</DocsShell>;
}
