import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

import { allPublishedCalculators } from "@/config/calculator-directory";

const ROOT = process.cwd();
const APP_ROOT = path.join(ROOT, "src", "app", "[locale]");
const FEATURES_ROOT = path.join(ROOT, "src", "features");
const CONTENT_GUIDE_FILE = path.join(
  ROOT,
  "src",
  "components",
  "calculators",
  "calculator-content-guide.tsx",
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

function collectSourceFiles(directory: string): string[] {
  if (!existsSync(directory)) return [];

  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) return collectSourceFiles(entryPath);
    return /\.(?:ts|tsx)$/.test(entry.name) ? [entryPath] : [];
  });
}

function hasCompleteContentGuideUsage(source: string): boolean {
  if (!source.includes("<CalculatorContentGuide")) return true;

  return [
    "method=",
    "example=",
    "assumptions=",
    "limitations=",
    "reviewedAt=",
  ].every((token) => source.includes(token));
}

describe("published calculator content trust coverage", () => {
  it("keeps the shared trust template explicit about method, example, assumptions, limitations, and review date", () => {
    const source = readSource(CONTENT_GUIDE_FILE);

    for (const token of [
      "method: ReactNode",
      "example: ReactNode",
      "assumptions: readonly ReactNode[]",
      "limitations: readonly ReactNode[]",
      "reviewedAt: string",
      "How it works",
      "Worked example",
      "Key assumptions",
      "Limits and checks",
      "Content reviewed",
      "dateTime={reviewedAt}",
    ]) {
      expect(source, `shared trust template missing ${token}`).toContain(token);
    }
  });

  it("audits published calculator sources and prevents partial trust-template adoption", () => {
    const incompleteAdoptions: string[] = [];
    const adoptedCalculators: string[] = [];

    for (const calculator of allPublishedCalculators) {
      const relativeRoute = routePathFromHref(calculator.href);
      const routeFile = path.join(APP_ROOT, relativeRoute, "page.tsx");
      if (!existsSync(routeFile)) continue;

      const routeSource = readSource(routeFile);
      const sources = [
        routeSource,
        ...importedFeatureNames(routeSource).flatMap((featureName) =>
          collectSourceFiles(path.join(FEATURES_ROOT, featureName)).map(
            readSource,
          ),
        ),
      ];
      const guideSources = sources.filter((source) =>
        source.includes("CalculatorContentGuide"),
      );

      if (guideSources.length === 0) continue;
      adoptedCalculators.push(calculator.id);

      if (!guideSources.every(hasCompleteContentGuideUsage)) {
        incompleteAdoptions.push(`${calculator.id}: ${relativeRoute}`);
      }
    }

    expect(
      adoptedCalculators,
      "the established Business Cash Runway trust-template adoption must remain published",
    ).toContain("business-cash-runway");
    expect(
      incompleteAdoptions,
      "published calculators using CalculatorContentGuide must provide all required trust signals",
    ).toEqual([]);
  });
});
