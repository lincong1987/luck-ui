import { notFound } from "@tanstack/react-router";
import type { Locale } from "./i18n";
import { getDocsTocItems } from "./docs-navigation";
import { source, sourceZh } from "./source";

export function getDocPage(slugs: Array<string>, locale: Locale = "en") {
  const docsSource = locale === "zh" ? sourceZh : source;
  const page = docsSource.getPage(slugs);

  if (!page) {
    throw notFound();
  }

  return {
    path: page.path,
    url: page.url,
    title: page.data.title,
    description: page.data.description,
    toc: getDocsTocItems(page.data.toc),
  };
}
