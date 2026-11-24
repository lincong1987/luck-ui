import { loader } from "fumadocs-core/source";
import { docs, docsZh } from "collections/server";

export const source = loader({
  baseUrl: "/docs",
  source: docs.toFumadocsSource(),
});

export const sourceZh = loader({
  baseUrl: "/zh/docs",
  source: docsZh.toFumadocsSource(),
});
