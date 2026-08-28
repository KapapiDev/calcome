import type { MetadataRoute } from "next";

import { allPublishedCalculators } from "@/config/calculator-directory";
import type { PublishedCalculator } from "@/config/calculators";
import { absoluteUrl } from "@/config/site";

const publicStaticRoutes = [
  { ko: "/", en: "/en" },
  { ko: "/calculators", en: "/en/calculators" },
  { ko: "/about", en: "/en/about" },
  { ko: "/guides", en: "/en/guides" },
  { ko: "/privacy", en: "/en/privacy" },
  { ko: "/terms", en: "/en/terms" },
  { ko: "/contact", en: "/en/contact" },
] as const;

function localizedEntries(
  koPath: string,
  enPath: string,
): MetadataRoute.Sitemap {
  const languages = {
    ko: absoluteUrl(koPath),
    en: absoluteUrl(enPath),
    "x-default": absoluteUrl(koPath),
  };

  return [
    { url: languages.ko, alternates: { languages } },
    { url: languages.en, alternates: { languages } },
  ];
}

export function staticSitemapEntries(): MetadataRoute.Sitemap {
  return publicStaticRoutes.flatMap(({ ko, en }) => localizedEntries(ko, en));
}

export function calculatorSitemapEntries(
  calculators: readonly Pick<
    PublishedCalculator,
    "href"
  >[] = allPublishedCalculators,
): MetadataRoute.Sitemap {
  return calculators.flatMap(({ href }) => {
    const englishHref = href.replace(/^\/ko\//, "/en/");
    return localizedEntries(href, englishHref);
  });
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [...staticSitemapEntries(), ...calculatorSitemapEntries()];
}
