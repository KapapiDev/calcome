import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

const rootLayoutSource = readFileSync(
  join(process.cwd(), "src/app/layout.tsx"),
  "utf8",
);

describe("root client hydration boundary", () => {
  it("keeps theme initialization without a global client provider wrapper", () => {
    expect(rootLayoutSource).toContain("themeInitializationScript");
    expect(rootLayoutSource).not.toContain("ThemeProvider");
    expect(rootLayoutSource).toContain("<SiteHeader");
    expect(rootLayoutSource).toContain("<PrivacyControl");
  });
});
