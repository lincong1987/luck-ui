export type Locale = "en" | "zh";

export function getLocaleFromPath(pathname: string): Locale {
  return pathname === "/zh" || pathname.startsWith("/zh/") ? "zh" : "en";
}

export function getLocalizedPath(pathname: string, locale: Locale) {
  const path =
    pathname === "/zh" ? "/" : pathname.startsWith("/zh/") ? pathname.slice(3) : pathname;
  if (locale === "zh") return path === "/" ? "/zh" : `/zh${path}`;
  return path;
}

export function getLocaleTogglePath(pathname: string) {
  const locale = getLocaleFromPath(pathname);
  return getLocalizedPath(pathname, locale === "zh" ? "en" : "zh");
}

export const messages = {
  en: {
    uiLibrary: "UI Library",
    closeNavigation: "Close documentation navigation",
    documentationNavigation: "Documentation navigation",
    docsPages: "Docs pages",
    collapse: "Collapse",
    expand: "Expand",
    onThisPage: "On this page",
    tableOfContents: "Table of contents",
    pageSections: "Page sections",
    copyCode: "Copy code",
    showLess: "Show less",
    showMore: "Show more",
    packageManager: "Package manager",
    copyCommand: "Copy command",
    componentView: "Component view",
    preview: "Preview",
    source: "Source",
    propsUnavailable: "PropsTable not available for",
    noAdditionalProps: "This component does not add any props on top of",
    addsProps: "props and adds the following:",
    prop: "Prop",
    type: "Type",
    default: "Default",
    description: "Description",
    language: "切换到简体中文",
    notFoundTitle: "Page not found",
    notFoundDescription: "This page does not exist.",
    openDocs: "Open docs",
  },
  zh: {
    uiLibrary: "组件库",
    closeNavigation: "关闭文档导航",
    documentationNavigation: "文档导航",
    docsPages: "文档页面",
    collapse: "收起",
    expand: "展开",
    onThisPage: "本页内容",
    tableOfContents: "目录",
    pageSections: "页面章节",
    copyCode: "复制代码",
    showLess: "收起",
    showMore: "展开更多",
    packageManager: "包管理器",
    copyCommand: "复制命令",
    componentView: "组件视图",
    preview: "预览",
    source: "源码",
    propsUnavailable: "未找到组件属性表：",
    noAdditionalProps: "该组件没有在此基础上扩展属性：",
    addsProps: "属性，并新增以下属性：",
    prop: "属性",
    type: "类型",
    default: "默认值",
    description: "说明",
    language: "Switch to English",
    notFoundTitle: "页面不存在",
    notFoundDescription: "找不到这个页面。",
    openDocs: "打开文档",
  },
} satisfies Record<Locale, Record<string, string>>;

export function getMessages(locale: Locale) {
  return messages[locale];
}
