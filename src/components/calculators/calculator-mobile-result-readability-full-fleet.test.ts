import { readdirSync, readFileSync } from "node:fs";
import { extname, join, relative, resolve } from "node:path";
import { describe, expect, it } from "vitest";

const featuresRoot = resolve(process.cwd(), "src/features");
const workspacePath = resolve(
  process.cwd(),
  "src/components/calculators/calculator-workspace.tsx",
);

function walk(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });
}

function calculatorFiles() {
  return walk(featuresRoot)
    .filter(
      (path) => extname(path) === ".tsx" && path.endsWith("-calculator.tsx"),
    )
    .sort();
}

function sharedResultContract(source: string) {
  const resultList = source.match(
    /<dl\b[\s\S]*?data-testid=["']primary-results["'][\s\S]*?<\/dl>/m,
  )?.[0];
  if (!resultList) return ["shared PrimaryResults list is missing"];

  const issues: string[] = [];
  const listClass =
    resultList.match(/<dl\b[\s\S]*?className=["']([^"']+)["']/m)?.[1] ?? "";
  const cardClass =
    resultList.match(/<div\b[\s\S]*?className=\{`([^`]+)`\}/m)?.[1] ?? "";
  const valueClass =
    resultList.match(/<dd\b[\s\S]*?className=["']([^"']+)["']/m)?.[1] ?? "";

  if (!listClass.includes("grid"))
    issues.push("shared results do not use a mobile-stackable grid");
  if (!/sm:grid-cols-\d+/.test(listClass))
    issues.push("shared results lack a bounded mobile-to-desktop hierarchy");
  if (!cardClass.includes("min-h-"))
    issues.push("shared result cards lack stable mobile hierarchy sizing");
  if (!valueClass.includes("break-words"))
    issues.push("shared result values lack long-value wrapping");
  if (!valueClass.includes("tabular-nums"))
    issues.push("shared numeric results lack stable tabular number alignment");

  return issues;
}

describe("calculator mobile result readability full-fleet audit", () => {
  it("keeps every published calculator on the shared mobile-safe result contract", () => {
    const files = calculatorFiles();
    expect(files.length).toBeGreaterThan(0);

    const drift = files.flatMap((path) => {
      const source = readFileSync(path, "utf8");
      if (source.includes("<PrimaryResults")) return [];

      return [
        `${relative(process.cwd(), path).replaceAll("\\\\", "/")}: calculator does not use shared PrimaryResults`,
      ];
    });

    expect(drift, drift.join("\n")).toEqual([]);
  });

  it("keeps shared primary results readable and contained on narrow screens", () => {
    const source = readFileSync(workspacePath, "utf8");
    const issues = sharedResultContract(source);
    expect(issues, issues.join("\n")).toEqual([]);
  });
});
