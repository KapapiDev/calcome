import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

import { allPublishedCalculators } from "@/config/calculator-directory";

const ROOT = process.cwd();
const APP_ROOT = path.join(ROOT, "src", "app", "[locale]");
const FEATURES_ROOT = path.join(ROOT, "src", "features");

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
  return (
    source.includes("JsonLdScript") &&
    /create[A-Za-z0-9]*StructuredData/.test(source)
  );
}

describe("published calculator SEO coverage", () => {
  it("keeps deterministic bilingual metadata and calculator structured data on every published route", () => {
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
      "published calculator routes missing calculator JSON-LD coverage",
    ).toEqual([]);
  });
});
