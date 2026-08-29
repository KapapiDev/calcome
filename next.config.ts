import type { NextConfig } from "next";

import { allPublishedCalculators } from "./src/config/calculator-directory";

const localeRedirects = [
  {
    source: "/ko",
    destination: "/",
    permanent: true,
  },
  ...allPublishedCalculators.map((calculator) => ({
    source:
      calculator.id === "deposit"
        ? "/finance/deposit"
        : calculator.href.replace(/^\/ko/, ""),
    destination: calculator.href,
    permanent: true,
  })),
] as const;

const nextConfig: NextConfig = {
  async redirects() {
    return [
      ...localeRedirects.map(({ source, destination, permanent }) => ({
        source,
        destination: `https://www.calcome.com${destination}`,
        permanent,
        has: [{ type: "host" as const, value: "calcome.com" }],
      })),
      {
        source: "/:path*",
        destination: "https://www.calcome.com/:path*",
        permanent: true,
        has: [{ type: "host", value: "calcome.com" }],
      },
      ...localeRedirects,
    ];
  },
};

export default nextConfig;
