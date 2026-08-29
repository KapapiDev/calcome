import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

const rootLayoutSource = readFileSync(
  join(process.cwd(), "src/app/layout.tsx"),
  "utf8",
);

describe("third-party and consent loading boundaries", () => {
  it("keeps the AdSense network script behind the production runtime gate", () => {
    expect(rootLayoutSource).toContain(
      "{adsense.enabled && adsense.clientId ? (",
    );
    expect(rootLayoutSource).toContain(
      "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js",
    );
  });

  it("does not hydrate privacy controls when the ad runtime is disabled", () => {
    expect(rootLayoutSource).toContain("const privacyRegion = adsense.enabled");
    expect(rootLayoutSource).toContain(
      'country: requestHeaders.get("x-vercel-ip-country")',
    );
    expect(rootLayoutSource).toContain("? classifyGoogleConsentRegion(country)");
    expect(rootLayoutSource).toContain("{privacyRegion ? (");
    expect(rootLayoutSource).toContain("<PrivacyControl");
  });
});
