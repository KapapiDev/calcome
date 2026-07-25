import type { MetadataRoute } from "next";

import {
  publishedCalculators,
  type PublishedCalculator,
} from "@/config/calculators";
import { absoluteUrl } from "@/config/site";

const publicStaticPaths = [
  "/",
  "/calculators",
  "/about",
  "/privacy",
  "/terms",
  "/contact",
] as const;
const dividendYieldCalculator = {
  href: "/ko/finance/dividend-yield",
} as const satisfies Pick<PublishedCalculator, "href">;

export function calculatorSitemapEntries(
  calculators: readonly Pick<
    PublishedCalculator,
    "href"
  >[] = [...publishedCalculators, dividendYieldCalculator],
): MetadataRoute.Sitemap {
  return calculators.flatMap(({ href }) => {
    const englishHref = href.replace(/^\/ko\//, "/en/");
    const languages = {
      ko: absoluteUrl(href),
      en: absoluteUrl(englishHref),
    };

    return [
      { url: languages.ko, alternates: { languages } },
      { url: languages.en, alternates: { languages } },
    ];
  });
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...publicStaticPaths.map((path) => ({ url: absoluteUrl(path) })),
    ...calculatorSitemapEntries(),
  ];
}
