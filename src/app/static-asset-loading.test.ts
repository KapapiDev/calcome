import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

const appDirectory = join(process.cwd(), "src/app");
const iconSource = readFileSync(join(appDirectory, "icon.tsx"), "utf8");
const manifestSource = readFileSync(join(appDirectory, "manifest.ts"), "utf8");
const globalStyles = readFileSync(join(appDirectory, "globals.css"), "utf8");

describe("static asset loading boundaries", () => {
  it("uses the generated app icon without a duplicate legacy favicon asset", () => {
    expect(existsSync(join(appDirectory, "favicon.ico"))).toBe(false);
    expect(iconSource).toContain("width: 32, height: 32");
    expect(iconSource).toContain('contentType = "image/png"');
    expect(manifestSource).toContain('{ src: "/icon", sizes: "32x32", type: "image/png" }');
  });

  it("keeps the shared font stack free of remote render-blocking font imports", () => {
    expect(globalStyles).not.toMatch(/@import\s+url\(/i);
    expect(globalStyles).not.toMatch(/https?:\/\/[^;]*(?:font|woff)/i);
    expect(globalStyles).toContain('"Pretendard", "Apple SD Gothic Neo", "Noto Sans KR"');
  });
});
