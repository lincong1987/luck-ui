import { useRouterState } from "@tanstack/react-router";
import { getLocaleFromPath, getMessages } from "../../lib/i18n";
import { CodeBlock } from "./code-block";

export function ComponentSource({
  code,
  language = "tsx",
  title,
}: {
  code: string;
  language?: string;
  title?: string;
}) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const copy = getMessages(getLocaleFromPath(pathname));

  return <CodeBlock code={code} language={language} title={title ?? copy.source} />;
}

ComponentSource.displayName = "ComponentSource";
