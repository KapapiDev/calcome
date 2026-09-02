import { readdirSync, readFileSync } from "node:fs";
import { extname, join, relative, resolve } from "node:path";
import { describe, expect, it } from "vitest";

const featuresRoot = resolve(process.cwd(), "src/features");

function walk(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });
}

function calculatorInputFiles() {
  return walk(featuresRoot)
    .filter(
      (path) =>
        extname(path) === ".tsx" &&
        path.endsWith("-calculator.tsx") &&
        readFileSync(path, "utf8").includes("<input"),
    )
    .sort();
}

function constantClasses(source: string) {
  return new Map(
    [
      ...source.matchAll(
        /const\s+([A-Za-z_$][\w$]*)\s*=\s*["']([^"']+)["'];?/g,
      ),
    ].map((match) => [match[1], match[2]]),
  );
}

function resolveClasses(source: string, input: string) {
  const classes = constantClasses(source);
  const resolved: string[] = [];
  const literal = input.match(/className=["']([^"']+)["']/)?.[1];
  if (literal) resolved.push(literal);

  const expression = input.match(/className=\{([\s\S]*?)\}/)?.[1] ?? "";
  for (const identifier of expression.matchAll(/\b([A-Za-z_$][\w$]*)\b/g)) {
    const value = classes.get(identifier[1]);
    if (value) resolved.push(value);
  }
  const templateLiterals = expression.match(/`([^`]+)`/)?.[1];
  if (templateLiterals)
    resolved.push(templateLiterals.replace(/\$\{[^}]+\}/g, ""));

  return resolved.join(" ").split(/\s+/).filter(Boolean);
}

function isTextEntryInput(input: string) {
  const type = input.match(/type=["']([^"']+)["']/)?.[1] ?? "text";
  return !["checkbox", "radio", "hidden", "range", "file", "color"].includes(
    type,
  );
}

function auditInput(source: string, input: string) {
  if (!isTextEntryInput(input)) return [];

  const issues: string[] = [];
  const tokens = resolveClasses(source, input);
  const type = input.match(/type=["']([^"']+)["']/)?.[1] ?? "text";
  const inputMode = input.match(/inputMode=["']([^"']+)["']/)?.[1];

  const hasMobileReadableText = tokens.some((token) =>
    ["text-base", "text-lg", "text-xl", "text-2xl"].includes(token),
  );
  const hasUsableTarget = tokens.some(
    (token) =>
      ["h-10", "h-11", "h-12", "min-h-10", "min-h-11", "min-h-12"].includes(
        token,
      ) || /^py-(2|2\.5|3|3\.5|4)$/.test(token),
  );
  const hasFluidWidth =
    tokens.includes("w-full") || tokens.includes("max-w-full");

  if (!hasMobileReadableText)
    issues.push("text-entry input lacks a mobile text-base-or-larger size");
  if (!hasUsableTarget)
    issues.push(
      "text-entry input lacks a bounded mobile touch-target height/padding",
    );
  if (!hasFluidWidth)
    issues.push("text-entry input lacks fluid-width overflow protection");

  if (
    inputMode &&
    !["numeric", "decimal", "tel", "email", "url", "search", "text"].includes(
      inputMode,
    )
  )
    issues.push(`unsupported inputMode ${inputMode}`);

  if (type === "text" && !inputMode)
    issues.push("text input has no explicit mobile keyboard hint");

  if (
    ["date", "month", "week", "time", "datetime-local"].includes(type) &&
    inputMode
  )
    issues.push(
      "native date/time input should keep its native keyboard semantics",
    );

  return issues;
}

describe("calculator mobile input ergonomics full-fleet audit", () => {
  it("keeps published calculator text-entry inputs mobile-safe", () => {
    const files = calculatorInputFiles();
    expect(files.length).toBeGreaterThan(0);

    const drift = files.flatMap((path) => {
      const source = readFileSync(path, "utf8");
      const inputs = source.match(/<input\b[\s\S]*?\/>/gm) ?? [];
      const displayPath = relative(process.cwd(), path).replaceAll("\\", "/");

      return inputs.flatMap((input, index) =>
        auditInput(source, input).map(
          (issue) => `${displayPath} input#${index + 1}: ${issue}`,
        ),
      );
    });

    expect(drift, drift.join("\n")).toEqual([]);
  });
});
