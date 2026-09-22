import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

const read = (relativePath: string) =>
  readFileSync(join(process.cwd(), relativePath), "utf8");

const rootLayoutSource = read("src/app/layout.tsx");
const privacyRegionRouteSource = read("src/app/api/privacy-region/route.ts");
const privacyControlSource = read("src/components/ads/privacy-control.tsx");

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
    expect(rootLayoutSource).toContain(
      "{adsense.enabled ? <PrivacyControl /> : null}",
    );
  });

  it("resolves the consent region in an isolated request-scoped handler", () => {
    // Keeping the geo lookup here is what lets every page stay static.
    expect(privacyRegionRouteSource).toContain(
      'requestHeaders.get("x-vercel-ip-country")',
    );
    expect(privacyRegionRouteSource).toContain("classifyGoogleConsentRegion(");
    expect(privacyControlSource).toContain('fetch("/api/privacy-region")');
  });

  it("defaults to the certified-CMP path until the real region is known", () => {
    // requiresCertifiedCmp("unknown") is true, so ads stay gated while the
    // region request is still in flight.
    expect(privacyControlSource).toContain("useState<AdPrivacyRegion>(");
    expect(privacyControlSource).toContain('?? "unknown"');
    expect(privacyControlSource).toContain("requiresCertifiedCmp(region)");
  });
});
