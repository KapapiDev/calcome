import { absoluteUrl } from "@/config/site";
import {
  createBreadcrumbListStructuredData,
  createWebPageStructuredData,
  createWebsiteStructuredData,
  type JsonLdDocument,
} from "./structured-data";
import {
  guideContent,
  guidePublishedOn,
  guideReviewedOn,
  guideSources,
  type GuideLocale,
  type GuideSlug,
} from "@/content/guides";

export function createGuideStructuredData(
  locale: GuideLocale,
  slug: GuideSlug,
): JsonLdDocument {
  const copy = guideContent[slug][locale];
  const path = `/${locale}/guides/${slug}`;
  const author = {
    "@type": "Organization",
    name: "CalCome",
    url: absoluteUrl(locale === "ko" ? "/about" : "/en/about"),
    publishingPrinciples: absoluteUrl(
      locale === "ko" ? "/editorial-policy" : "/en/editorial-policy",
    ),
  };
  return {
    "@context": "https://schema.org",
    "@graph": [
      createWebsiteStructuredData(),
      createWebPageStructuredData({
        name: copy.title,
        description: copy.description,
        path,
        locale,
      }),
      createBreadcrumbListStructuredData({
        path,
        items: [
          {
            name: locale === "ko" ? "홈" : "Home",
            path: locale === "ko" ? "/" : "/en",
          },
          {
            name: locale === "ko" ? "가이드" : "Guides",
            path: locale === "ko" ? "/guides" : "/en/guides",
          },
          { name: copy.title, path },
        ],
      }),
      {
        "@type": "Article",
        "@id": absoluteUrl(path) + "#article",
        headline: copy.title,
        description: copy.description,
        inLanguage: locale === "ko" ? "ko-KR" : "en-US",
        mainEntityOfPage: { "@id": absoluteUrl(path) + "#webpage" },
        author,
        publisher: author,
        datePublished: guidePublishedOn[slug],
        dateModified: guideReviewedOn,
        citation: guideSources[slug].map((source) => source.href),
      },
    ],
  };
}
