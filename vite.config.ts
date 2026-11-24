import { cloudflare } from "@cloudflare/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import mdx from "fumadocs-mdx/vite";
import { defineConfig } from "vite";
import * as MdxConfig from "./source.config";

// A sub-directory deploy (e.g. GitHub Pages project sites) is enabled by
// building with VITE_BASE_PATH=luck-ui. Static HTML generation for hosts
// without a server runtime is enabled with VITE_STATIC_BUILD=true.
const siteBasePath = process.env.VITE_BASE_PATH
  ? `/${process.env.VITE_BASE_PATH.replace(/^\/+|\/+$/g, "")}`
  : "/";
const isStaticBuild = process.env.VITE_STATIC_BUILD === "true";

export default defineConfig({
  server: {
    port: 3000,
  },
  preview: {
    host: "127.0.0.1",
  },
  base: siteBasePath,
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [
    cloudflare({ viteEnvironment: { name: "ssr" } }),
    tanstackStart({
      router: { basepath: siteBasePath },
      prerender: {
        enabled: isStaticBuild,
        crawlLinks: true,
      },
    }),
    mdx(MdxConfig),
    tailwindcss(),
    react(),
  ],
});
