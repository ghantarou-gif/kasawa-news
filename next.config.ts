import type { NextConfig } from "next";
import { githubPages, githubPagesBasePath } from "./src/lib/hosting";

const nextConfig: NextConfig = {
  ...(githubPages
    ? {
        output: "export" as const,
        trailingSlash: true,
        basePath: githubPagesBasePath,
        images: { unoptimized: true },
      }
    : {}),
  env: {
    NEXT_PUBLIC_BASE_PATH: githubPagesBasePath,
  },
  ...(!githubPages
    ? {
        async redirects() {
          return [
            { source: "/search", destination: "/search.html", permanent: false },
            {
              source: "/:locale(ja|en)/search",
              destination: "/search.html",
              permanent: false,
            },
            {
              source: "/:locale(ja|en)/search.html",
              destination: "/search.html",
              permanent: false,
            },
            { source: "/buzz", destination: "/buzz.html", permanent: false },
            {
              source: "/:locale(ja|en)/buzz",
              destination: "/buzz.html",
              permanent: false,
            },
            {
              source: "/:locale(ja|en)/buzz.html",
              destination: "/buzz.html",
              permanent: false,
            },
          ];
        },
      }
    : {}),
};

export default nextConfig;
