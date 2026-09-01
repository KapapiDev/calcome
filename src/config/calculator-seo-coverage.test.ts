import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

import { allPublishedCalculators } from "@/config/calculator-directory";

const ROOT = process.cwd();
const APP_ROOT = path.join(ROOT, "src", "app", "[locale]");
const FEATURES_ROOT = path.join(ROOT, "src", "features");

type RouteMetadata = {
  title?: string | { absolute?: string; default?: string } | null;
  description?: string | null;
};

type RouteModule = {
  generateMetadata?: (props: {
    params: Promise<{ locale: string }>;
  }) => RouteMetadata | Promise<RouteMetadata>;
};

declare global {
  interface ImportMeta {
    glob<TModule = unknown>(
      pattern: string,
    ): Record<string, () => Promise<TModule>>;
  }
}

const routeModules = import.meta.glob<RouteModule>(
  "../app/[locale]/**/page.tsx",
);

function readSource(filePath: string): string {
  return readFileSync(filePath, "utf8");
}

function routePathFromHref(href: string): string {
  return href.replace(/^\/ko\//, "");
}

function importedFeatureNames(source: string): string[] {
  return Array.from(
    source.matchAll(/from\s+["']@\/features\/([^/"']+)(?:\/[^"']*)?["']/g),
    (match) => match[1] as string,
  );
}

function importedMetadataSources(source: string): string[] {
  const featureNames = Array.from(
    source.matchAll(/from\s+["']@\/features\/([^/"']+)\/metadata["']/g),
    (match) => match[1] as string,
  );

  return featureNames
    .map((featureName) => path.join(FEATURES_ROOT, featureName, "metadata.ts"))
    .filter(existsSync)
    .map(readSource);
}

function collectSourceFiles(directory: string): string[] {
  if (!existsSync(directory)) return [];

  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) return collectSourceFiles(entryPath);
    return /\.(?:ts|tsx)$/.test(entry.name) ? [entryPath] : [];
  });
}

function hasMetadataContract(source: string): boolean {
  const requiredTokens = [
    "title",
    "description",
    "alternates",
    "canonical",
    "languages",
    "ko",
    "en",
    "x-default",
  ];

  return requiredTokens.every((token) => source.includes(token));
}

function hasStructuredDataContract(source: string): boolean {
  const sharedStructuredData =
    source.includes("JsonLdScript") &&
    /create[A-Za-z0-9]*StructuredData/.test(source);
  const directJsonLd =
    source.includes('type="application/ld+json"') &&
    source.includes("JSON.stringify");

  return sharedStructuredData || directJsonLd;
}

function titleText(title: RouteMetadata["title"]): string {
  if (typeof title === "string") return title.trim();
  if (title && typeof title === "object") {
    if (typeof title.absolute === "string") return title.absolute.trim();
    if (typeof title.default === "string") return title.default.trim();
  }
  return "";
}

function normalizeSnippet(value: string): string {
  return value.replace(/\s+/g, " ").trim().toLocaleLowerCase();
}

function duplicateValues(entries: Array<[string, string]>): string[] {
  const grouped = new Map<string, string[]>();

  for (const [routeId, value] of entries) {
    const key = normalizeSnippet(value);
    if (!key) continue;
    const current = grouped.get(key) ?? [];
    current.push(routeId);
    grouped.set(key, current);
  }

  return Array.from(grouped.entries())
    .filter(([, routeIds]) => routeIds.length > 1)
    .map(([value, routeIds]) => `${routeIds.join(", ")}: ${value}`);
}

function looksPlaceholder(value: string): boolean {
  const normalized = normalizeSnippet(value);
  return (
    normalized.length === 0 ||
    /\b(?:todo|tbd|placeholder|lorem ipsum|coming soon)\b/i.test(value) ||
    /(?:임시|준비 중|준비중|추후 작성|내용 입력)/.test(value)
  );
}

function snippetQualityIssue(
  title: string,
  description: string,
  locale: "ko" | "en",
): string | null {
  const normalizedTitle = normalizeSnippet(title);
  const normalizedDescription = normalizeSnippet(description);
  const minimumLength = locale === "ko" ? 24 : 48;
  const purposePattern =
    locale === "ko"
      ? /(?:계산|확인|비교|추정|예상|환산|분석|구합니다|알아봅니다)/
      : /\b(?:calculate|calculates|check|compare|compares|convert|converts|estimate|estimates|find|forecast|project|projects|see|show|shows)\b/i;

  if (normalizedDescription.length < minimumLength) {
    return `description shorter than ${minimumLength} characters`;
  }
  if (normalizedDescription === normalizedTitle) {
    return "description duplicates the title";
  }
  if (!purposePattern.test(description)) {
    return "description lacks a clear user-facing calculation purpose";
  }

  return null;
}

describe("published calculator SEO coverage", () => {
  it("keeps deterministic bilingual metadata and structured data on every published route", () => {
    const missingRouteFiles: string[] = [];
    const missingMetadata: string[] = [];
    const missingStructuredData: string[] = [];

    for (const calculator of allPublishedCalculators) {
      const relativeRoute = routePathFromHref(calculator.href);
      const routeFile = path.join(APP_ROOT, relativeRoute, "page.tsx");

      if (!existsSync(routeFile)) {
        missingRouteFiles.push(`${calculator.id}: ${relativeRoute}`);
        continue;
      }

      const routeSource = readSource(routeFile);
      const metadataSources = [
        routeSource,
        ...importedMetadataSources(routeSource),
      ];

      if (
        !routeSource.includes("generateMetadata") ||
        !metadataSources.some(hasMetadataContract)
      ) {
        missingMetadata.push(`${calculator.id}: ${relativeRoute}`);
      }

      const featureSources = importedFeatureNames(routeSource).flatMap(
        (featureName) =>
          collectSourceFiles(path.join(FEATURES_ROOT, featureName)).map(
            readSource,
          ),
      );

      if (![routeSource, ...featureSources].some(hasStructuredDataContract)) {
        missingStructuredData.push(`${calculator.id}: ${relativeRoute}`);
      }
    }

    expect(
      missingRouteFiles,
      "published calculator routes missing page.tsx",
    ).toEqual([]);
    expect(
      missingMetadata,
      "published calculator routes missing title/description/canonical/ko-en-x-default metadata coverage",
    ).toEqual([]);
    expect(
      missingStructuredData,
      "published calculator routes missing JSON-LD coverage",
    ).toEqual([]);
  });

  it("keeps calculator search snippets unique and free of placeholder copy in each locale", async () => {
    const failures: string[] = [];

    for (const locale of ["ko", "en"] as const) {
      const titles: Array<[string, string]> = [];
      const descriptions: Array<[string, string]> = [];
      const placeholders: string[] = [];

      for (const calculator of allPublishedCalculators) {
        const relativeRoute = routePathFromHref(calculator.href);
        const moduleKey = `../app/[locale]/${relativeRoute}/page.tsx`;
        const loadRoute = routeModules[moduleKey];

        if (!loadRoute) {
          failures.push(`${locale}:${calculator.id} missing route module`);
          continue;
        }

        const routeModule = await loadRoute();
        if (!routeModule.generateMetadata) {
          failures.push(`${locale}:${calculator.id} missing generateMetadata`);
          continue;
        }

        const metadata = await routeModule.generateMetadata({
          params: Promise.resolve({ locale }),
        });
        const title = titleText(metadata.title);
        const description =
          typeof metadata.description === "string"
            ? metadata.description.trim()
            : "";

        titles.push([calculator.id, title]);
        descriptions.push([calculator.id, description]);

        if (looksPlaceholder(title)) {
          placeholders.push(`${calculator.id} title: ${title || "<empty>"}`);
        }
        if (looksPlaceholder(description)) {
          placeholders.push(
            `${calculator.id} description: ${description || "<empty>"}`,
          );
        }
      }

      failures.push(
        ...duplicateValues(titles).map(
          (duplicate) => `${locale} duplicate title ${duplicate}`,
        ),
        ...duplicateValues(descriptions).map(
          (duplicate) => `${locale} duplicate description ${duplicate}`,
        ),
        ...placeholders.map(
          (placeholder) => `${locale} placeholder ${placeholder}`,
        ),
      );
    }

    expect(
      failures,
      "published calculator metadata must provide unique, non-placeholder title/description snippets per locale",
    ).toEqual([]);
  }, 15_000);

  it("keeps calculator descriptions useful enough for search-result discovery", async () => {
    const failures: string[] = [];

    for (const locale of ["ko", "en"] as const) {
      for (const calculator of allPublishedCalculators) {
        const relativeRoute = routePathFromHref(calculator.href);
        const moduleKey = `../app/[locale]/${relativeRoute}/page.tsx`;
        const loadRoute = routeModules[moduleKey];

        if (!loadRoute) {
          failures.push(`${locale}:${calculator.id} missing route module`);
          continue;
        }

        const routeModule = await loadRoute();
        if (!routeModule.generateMetadata) {
          failures.push(`${locale}:${calculator.id} missing generateMetadata`);
          continue;
        }

        const metadata = await routeModule.generateMetadata({
          params: Promise.resolve({ locale }),
        });
        const title = titleText(metadata.title);
        const description =
          typeof metadata.description === "string"
            ? metadata.description.trim()
            : "";
        const issue = snippetQualityIssue(title, description, locale);

        if (issue) {
          failures.push(`${locale}:${calculator.id} ${issue}: ${description}`);
        }
      }
    }

    expect(
      failures,
      "calculator metadata descriptions must provide readable, calculator-specific user context instead of thin boilerplate",
    ).toEqual([]);
  }, 15_000);
});
