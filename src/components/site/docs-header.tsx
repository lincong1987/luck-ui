import { Link, useRouterState } from "@tanstack/react-router";
import { PanelLeft } from "lucide-react";
import { Button } from "registry/default/ui/button";
import { getLocaleFromPath, getLocaleTogglePath, getMessages } from "../../lib/i18n";
import { useDocsSidebar } from "./docs-sidebar-context";
import { ThemeToggle } from "./theme-toggle";

export function DocsHeader() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const locale = getLocaleFromPath(pathname);
  const copy = getMessages(locale);

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background">
      <div className="flex h-14 items-center justify-between gap-4 px-4 max-md:h-14 max-md:gap-2.5 max-md:px-3.5">
        <div className="flex min-w-0 items-center gap-2.5">
          <DocsSidebarTrigger />
          <Link
            to={locale === "zh" ? "/zh" : "/"}
            className="inline-flex min-h-10 min-w-0 items-center gap-2.5 text-[0.95rem] font-bold"
            activeOptions={{ exact: true }}
          >
            <span className="truncate">Luck UI</span>
          </Link>
        </div>

        <nav className="flex min-w-0 flex-1 items-center justify-end gap-1.5">
          <Button
            nativeButton={false}
            variant="ghost"
            render={
              <a
                href="https://github.com/lincong1987/luck-ui"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub repository"
              />
            }
          >
            @lincong1987/luck-ui
          </Button>
          <Button
            nativeButton={false}
            variant="ghost"
            render={<a href={getLocaleTogglePath(pathname)} aria-label={copy.language} />}
          >
            {locale === "zh" ? "EN" : "中文"}
          </Button>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}

function DocsSidebarTrigger() {
  const { drawerId, isOpen, open } = useDocsSidebar();
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const copy = getMessages(getLocaleFromPath(pathname));

  if (!pathname.startsWith("/docs") && !pathname.startsWith("/zh/docs")) return null;

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className="md:hidden"
      aria-label={copy.documentationNavigation}
      aria-controls={drawerId}
      aria-expanded={isOpen}
      onClick={open}
    >
      <PanelLeft size={18} aria-hidden="true" />
    </Button>
  );
}
