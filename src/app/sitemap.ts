import type { MetadataRoute } from "next";

import { allPublishedCalculators } from "@/config/calculator-directory";
import type { PublishedCalculator } from "@/config/calculators";
import { absoluteUrl } from "@/config/site";

const publicStaticPaths = [
  "/",
  "/calculators",
  "/about",
  "/privacy",
  "/terms",
  "/contact",
] as const;
export function calculatorSitemapEntries(
  calculators: readonly Pick<
    PublishedCalculator,
    "href"
  >[] = allPublishedCalculators,
): MetadataRoute.Sitemap {
  return calculators.flatMap(({ href }) => {
    const englishHref = href.replace(/^\/ko\//, "/en/");
    const languages = {
      ko: absoluteUrl(href),
      en: absoluteUrl(englishHref),
      "x-default": absoluteUrl(href),
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
