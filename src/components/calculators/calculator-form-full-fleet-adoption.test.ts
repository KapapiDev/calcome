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

function calculatorFormFiles() {
  return walk(featuresRoot)
    .filter(
      (path) =>
        extname(path) === ".tsx" &&
        path.endsWith("-calculator.tsx") &&
        readFileSync(path, "utf8").includes("<form"),
    )
    .sort();
}

function auditFormContract(path: string) {
  const source = readFileSync(path, "utf8");
  const issues: string[] = [];

  if (!source.includes("<CalculatorActions"))
    issues.push("does not use shared CalculatorActions");
  if (!/\<form[\s\S]*?onSubmit=\{[^}]+\}/m.test(source))
    issues.push("form has no React onSubmit handler");
  if (/onKey(?:Down|Up|Press)=/.test(source))
    issues.push(
      "implements manual keyboard submission instead of form semantics",
    );
  if (!/onReset=\{[^}]+\}/.test(source))
    issues.push("shared actions have no reset callback");

  return issues;
}

describe("calculator form contract full-fleet adoption", () => {
  it("keeps every calculator form on the shared submit/reset interaction contract", () => {
    const formFiles = calculatorFormFiles();
    expect(formFiles.length).toBeGreaterThan(0);

    const drift = formFiles.flatMap((path) => {
      const issues = auditFormContract(path);
      const displayPath = relative(process.cwd(), path).replaceAll("\\", "/");
      return issues.map((issue) => `${displayPath}: ${issue}`);
    });

    expect(drift, drift.join("\n")).toEqual([]);
  });
});
