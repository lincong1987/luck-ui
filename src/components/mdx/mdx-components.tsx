import { Link } from "@tanstack/react-router";
import type { MDXComponents } from "mdx/types";
import { CodeBlock } from "../docs/code-block";
import { CodeSnippet, CodeSnippetCommand } from "../docs/code-snippet";
import { ComponentPreview } from "../docs/component-preview";
import { ComponentSource } from "../docs/component-source";
import { ComponentTabs } from "../docs/component-tabs";
import {
  Callout,
  ColorScale,
  ColorSwatch,
  ColorToken,
  ComponentSection,
  KeyboardShortcuts,
  PropsTable,
} from "../docs/docs-helpers";
import { MdxTable, MdxTbody, MdxTd, MdxTh, MdxThead, MdxTr } from "./table-components";

export function getMDXComponents(): MDXComponents {
  return {
    a: MdxLink,
    ComponentPreview,
    ComponentSource,
    ComponentTabs,
    CodeBlock,
    CodeSnippet,
    CodeSnippetCommand,
    Callout,
    ColorScale,
    ColorSwatch,
    ColorToken,
    ComponentSection,
    KeyboardShortcuts,
    PropsTable,
    table: MdxTable,
    thead: MdxThead,
    tbody: MdxTbody,
    tr: MdxTr,
    th: MdxTh,
    td: MdxTd,
    pre: CodeBlock,
    code: InlineCode,
  };
}

function MdxLink(props: React.ComponentProps<"a">) {
  const { href = "#", children, ...rest } = props;
  const isInternal = href.startsWith("/") && !href.startsWith("//");

  if (!isInternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
        {children}
      </a>
    );
  }

  return (
    <Link to={href} {...rest}>
      {children}
    </Link>
  );
}

function InlineCode(props: React.ComponentProps<"code">) {
  return (
    <code
      className="rounded-[5px] bg-muted px-1.5 py-0.5 text-[0.86em] text-foreground"
      {...props}
    />
  );
}
