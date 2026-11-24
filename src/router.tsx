import { createRouter, useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";
import { routeTree } from "./routeTree.gen";

const rawBasePath = (import.meta.env.VITE_BASE_PATH ?? "").replace(/^\/+|\/+$/g, "");

export function getRouter() {
  return createRouter({
    routeTree,
    basepath: rawBasePath ? `/${rawBasePath}` : "/",
    defaultErrorComponent: StaticNavErrorFallback,
  });
}

// On fully static hosts (GitHub Pages) client-side navigation cannot reach the
// server-function endpoints that route loaders call. A full page load always
// works there, because every route is prerendered — so fall back to one reload
// per path before showing the error.
function StaticNavErrorFallback() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  useEffect(() => {
    const reloadKey = `luck-ui:nav-reload:${pathname}`;
    try {
      if (!sessionStorage.getItem(reloadKey)) {
        sessionStorage.setItem(reloadKey, "1");
        window.location.reload();
      }
    } catch {
      window.location.reload();
    }
  }, [pathname]);

  return (
    <div className="grid min-h-[60vh] place-items-center p-8 text-sm text-muted-foreground">
      Something went wrong.
    </div>
  );
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
