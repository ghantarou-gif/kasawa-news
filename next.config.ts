import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Keep the search tool reachable even if .html is stripped or a locale
      // prefix was applied (those paths used to 404).
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
    ];
  },
};

export default nextConfig;
