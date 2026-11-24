import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { DocsLayoutContent } from "./docs";
import { getDocsNavTree } from "../lib/docs-navigation";

const getZhDocsNav = createServerFn({ method: "GET" }).handler(async () => getDocsNavTree("zh"));

export const Route = createFileRoute("/zh/docs")({
  loader: async () => getZhDocsNav(),
  component: ZhDocsLayout,
});

function ZhDocsLayout() {
  return <DocsLayoutContent navTree={Route.useLoaderData()} locale="zh" />;
}
