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

function resetHandlerNames(source: string) {
  return [...source.matchAll(/function\s+([\w$]*reset[\w$]*)\s*\(/gi)].map(
    (match) => match[1],
  );
}

function auditFormContract(path: string) {
  const source = readFileSync(path, "utf8");
  const issues: string[] = [];

  if (!/\<form[\s\S]*?onSubmit=\{[^}]+\}/m.test(source))
    issues.push("form has no React onSubmit handler");
  if (!/type=["']submit["']/.test(source))
    issues.push("form has no semantic submit control");

  const resetHandlers = resetHandlerNames(source);
  const sharedReset = /onReset=\{[^}]+\}/.test(source);
  const localReset = resetHandlers.some((handler) =>
    new RegExp(`onClick=\\{${handler}\\}`).test(source),
  );
  const nativeReset = /type=["']reset["']/.test(source);

  if (!sharedReset && !localReset && !nativeReset)
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
