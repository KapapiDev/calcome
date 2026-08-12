import { describe, expect, it } from "vitest";

import { allPublishedCalculators } from "@/config/calculator-directory";

import nextConfig from "../../next.config";

describe("canonical redirects", () => {
  it("permanently redirects locale aliases to the canonical root", async () => {
    expect(nextConfig.redirects).toBeTypeOf("function");

    const redirects = await nextConfig.redirects!();

    expect(redirects).toContainEqual({
      source: "/ko",
      destination: "/",
      permanent: true,
    });
    expect(redirects).toContainEqual({
      source: "/en",
      destination: "/",
      permanent: true,
    });
  });

  it("redirects the apex host directly to the final canonical host and locale", async () => {
    const redirects = await nextConfig.redirects!();

    expect(redirects).toContainEqual({
      source: "/finance/cagr",
      destination: "https://www.calcome.com/ko/finance/cagr",
      permanent: true,
      has: [{ type: "host", value: "calcome.com" }],
    });
    expect(redirects).toContainEqual({
      source: "/:path*",
      destination: "https://www.calcome.com/:path*",
      permanent: true,
      has: [{ type: "host", value: "calcome.com" }],
    });
  });

  it("covers every public calculator with locale-less and apex one-hop redirects", async () => {
    const redirects = await nextConfig.redirects!();

    for (const calculator of allPublishedCalculators) {
      const source =
        calculator.id === "deposit"
          ? "/finance/deposit"
          : calculator.href.replace(/^\/ko/, "");

      expect(redirects).toContainEqual({
        source,
        destination: calculator.href,
        permanent: true,
      });
      expect(redirects).toContainEqual({
        source,
        destination: `https://www.calcome.com${calculator.href}`,
        permanent: true,
        has: [{ type: "host", value: "calcome.com" }],
      });
    }
  });
});
