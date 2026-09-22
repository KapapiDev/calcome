import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

const read = (relativePath: string) =>
  readFileSync(join(process.cwd(), relativePath), "utf8");

const rootLayoutSource = read("src/app/layout.tsx");
const siteChromeSource = read("src/components/layout/site-chrome.tsx");
const siteHeaderSource = read("src/components/layout/site-header.tsx");
const siteFooterSource = read("src/components/layout/site-footer.tsx");
const localeLayoutSource = read("src/app/[locale]/layout.tsx");

describe("root client hydration boundary", () => {
  it("keeps theme initialization without a global client provider wrapper", () => {
    expect(rootLayoutSource).toContain("themeInitializationScript");
    expect(rootLayoutSource).not.toContain("ThemeProvider");
    expect(rootLayoutSource).toContain("<PrivacyControl");
  });

  it("keeps the site chrome server-rendered", () => {
    // The chrome moved out of the root layout so that locale can come from
    // route params, but it must stay on the server.
    expect(siteChromeSource).toContain("<SiteHeader");
    expect(siteChromeSource).toContain("<SiteFooter");
    expect(siteChromeSource).not.toContain("use client");
    expect(siteHeaderSource).not.toContain("use client");
    expect(siteFooterSource).not.toContain("use client");
  });
});

describe("static rendering guard", () => {
  it("keeps the root layout free of request-scoped APIs", () => {
    // A dynamic API here opts the entire App Router tree out of static
    // generation, which previously produced 115 serverless functions.
    expect(rootLayoutSource).not.toContain("next/headers");
    expect(rootLayoutSource).not.toContain("cookies(");
    expect(rootLayoutSource).not.toContain("force-dynamic");
    expect(rootLayoutSource).toContain("export const metadata");
  });

  it("declares locale params once so the whole subtree prerenders", () => {
    expect(localeLayoutSource).toContain("generateStaticParams");
    expect(localeLayoutSource).toContain("dynamicParams = false");
  });
});
