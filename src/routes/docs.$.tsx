import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { AnchorProvider, TOCItem, useActiveAnchor } from "fumadocs-core/toc";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "registry/default/ui/select";
import { ScrollArea } from "registry/default/ui/scroll-area";
import { DocsShell, type DocsTocItem } from "../components/site/docs-shell";
import { docsClientLoader } from "../lib/docs-client-loader";
import { getDocPage } from "../lib/docs-page-data";
import { brandImageUrl, buildSeoMeta, SITE_NAME } from "../lib/seo";
import { getMessages } from "../lib/i18n";
import { cn } from "registry/default/lib/utils";

const getDoc = createServerFn({ method: "GET" })
  .validator((slugs: Array<string>) => slugs)
  .handler(async ({ data: slugs }) => getDocPage(slugs));

export const Route = createFileRoute("/docs/$")({
  loader: async ({ params }) => {
    const slugs = params._splat?.split("/").filter(Boolean) ?? [];
    const data = await getDoc({ data: slugs });

    await docsClientLoader.preload(data.path);

    return data;
  },
  head: ({ loaderData }) => {
    const title = loaderData?.title ?? "Docs";
    const description = loaderData?.description ?? "Component documentation page.";

    return {
      meta: [
        { title: `${title} - ${SITE_NAME}` },
        ...buildSeoMeta({ title, description, image: brandImageUrl() }),
      ],
    };
  },
  component: DocsPage,
});

function DocsPage() {
  const data = Route.useLoaderData();

  return (
    <AnchorProvider toc={data.toc} single>
      <DocsShell
        mobileToc={<DocsMobileToc toc={data.toc} />}
        sideToc={<DocsSideToc toc={data.toc} />}
      >
        {docsClientLoader.useContent(data.path)}
      </DocsShell>
    </AnchorProvider>
  );
}

function DocsMobileToc({ toc }: { toc: Array<DocsTocItem> }) {
  const copy = getMessages("en");
  const activeAnchor = useActiveAnchor();

  if (toc.length === 0) return null;

  const activeUrl = activeAnchor ? `#${activeAnchor}` : "";
  const items = toc.map((item) => ({ label: item.title, value: item.url }));

  return (
    <div className="z-10 border-b border-border bg-background/95 p-4 pb-3 backdrop-blur-md md:hidden">
      <Select
        items={items}
        value={activeUrl || null}
        onValueChange={(value) => {
          if (typeof value === "string") {
            window.location.hash = value;
          }
        }}
      >
        <SelectTrigger aria-label={copy.onThisPage} className="w-full">
          <SelectValue placeholder={copy.onThisPage} className="min-w-0 flex-1 truncate" />
        </SelectTrigger>
        <SelectContent>
          {toc.map((item) => (
            <SelectItem key={item.url} value={item.url}>
              <span className="truncate">{item.title}</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

function DocsSideToc({ toc }: { toc: Array<DocsTocItem> }) {
  const copy = getMessages("en");
  if (toc.length === 0) return null;

  return (
    <aside
      className="sticky top-0 hidden h-[calc(100dvh-3.5rem-1px)] min-h-0 [@media(min-width:1340px)]:block"
      aria-label={copy.tableOfContents}
    >
      <ScrollArea className="h-full min-h-0">
        <div className="p-4 pt-8">
          <p className="m-0 mb-6 text-xs font-bold text-muted-foreground uppercase">
            {copy.onThisPage}
          </p>

          <DocsTocNav toc={toc} />
        </div>
      </ScrollArea>
    </aside>
  );
}

function DocsTocNav({ toc, className }: { toc: Array<DocsTocItem>; className?: string }) {
  const copy = getMessages("en");
  return (
    <nav className={cn("grid gap-3", className)} aria-label={copy.pageSections}>
      {toc.map((item) => (
        <TOCItem
          key={item.url}
          href={item.url}
          className="block text-xs text-muted-foreground no-underline hover:text-accent data-[active=true]:border-accent data-[active=true]:font-semibold data-[active=true]:text-accent"
          style={{
            paddingLeft: `${Math.max(0, item.depth - 2) * 8}px`,
          }}
        >
          {item.title}
        </TOCItem>
      ))}
    </nav>
  );
}
