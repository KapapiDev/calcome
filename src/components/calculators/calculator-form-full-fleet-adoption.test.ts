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

function hasSharedCalculatorActions(source: string) {
  return /<CalculatorActions\b[\s\S]*?\/>/m.test(source);
}

function hasInlineResetAction(source: string) {
  const buttons = source.match(/<Button\b[\s\S]*?<\/Button>/gm) ?? [];

  return buttons.some((button) => {
    if (!/type=["']button["']/.test(button)) return false;

    const resetHandler =
      /onClick=\{\s*[A-Za-z_$][\w$]*reset[\w$]*\s*\}/i.test(button);
    const localizedResetCopy =
      /onClick=\{/.test(button) && /\{[^}]*\.reset\}/i.test(button);

    return resetHandler || localizedResetCopy;
  });
}

function auditFormContract(path: string) {
  const source = readFileSync(path, "utf8");
  const issues: string[] = [];
  const sharedActions = hasSharedCalculatorActions(source);

  if (!/<form[\s\S]*?onSubmit=\{[^}]+\}/m.test(source))
    issues.push("form has no React onSubmit handler");
  if (!sharedActions && !/type=["']submit["']/.test(source))
    issues.push("form has no semantic submit control");

  const sharedReset =
    sharedActions &&
    /<CalculatorActions\b[\s\S]*?onReset=\{[^}]+\}[\s\S]*?\/>/m.test(source);
  const inlineReset = hasInlineResetAction(source);
  const nativeReset = /type=["']reset["']/.test(source);

  if (!sharedReset && !inlineReset && !nativeReset)
    issues.push("form has no explicit reset action wired to its reset path");

  return issues;
}

describe("calculator form contract full-fleet adoption", () => {
  it("keeps every calculator form on semantic submit and reset behavior", () => {
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
