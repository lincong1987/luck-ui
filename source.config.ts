import { rehypeHighlightCodeBlocks } from "@tanstack/highlight/rehype";
import { metaSchema, pageSchema } from "fumadocs-core/source/schema";
import { defineConfig, defineDocs } from "fumadocs-mdx/config";
import { z } from "zod";
import { highlighter } from "./src/lib/highlight";

const docsSchema = pageSchema.extend({
  description: z.string().optional(),
  component: z.string().optional(),
  registry: z.string().optional(),
});

const meta = {
  schema: metaSchema,
};

export const docs = defineDocs({
  dir: "content/docs",
  docs: { schema: docsSchema },
  meta,
});

export const docsZh = defineDocs({
  dir: "content/docs-zh",
  docs: { schema: docsSchema },
  meta,
});

export default defineConfig({
  mdxOptions: {
    rehypeCodeOptions: false,
    rehypePlugins: [[rehypeHighlightCodeBlocks, { highlighter }]],
  },
});
