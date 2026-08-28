import { describe, expect, it } from "vitest";

import {
  createGoogleAdsTxtRecord,
  getAdSenseRuntimeConfig,
  normalizeAdSensePublisherId,
} from "./adsense";

describe("AdSense runtime configuration", () => {
  it("normalizes Google publisher IDs and rejects malformed values", () => {
    expect(normalizeAdSensePublisherId("pub-1234567890123456")).toBe(
      "pub-1234567890123456",
    );
    expect(normalizeAdSensePublisherId("ca-pub-1234567890123456")).toBe(
      "pub-1234567890123456",
    );
    expect(normalizeAdSensePublisherId("pub-placeholder")).toBeNull();
  });

  it("never enables real ads outside production", () => {
    expect(
      getAdSenseRuntimeConfig({
        vercelEnv: "preview",
        nodeEnv: "production",
        publisherId: "pub-1234567890123456",
      }),
    ).toMatchObject({ enabled: false, status: "non-production" });
  });

  it("surfaces missing and malformed production publisher settings", () => {
    expect(getAdSenseRuntimeConfig({ vercelEnv: "production" })).toMatchObject({
      enabled: false,
      status: "missing-publisher-id",
    });
    expect(
      getAdSenseRuntimeConfig({
        vercelEnv: "production",
        publisherId: "pub-bad",
      }),
    ).toMatchObject({ enabled: false, status: "invalid-publisher-id" });
  });

  it("builds the Google seller record only for a valid production ID", () => {
    const config = getAdSenseRuntimeConfig({
      vercelEnv: "production",
      publisherId: "pub-1234567890123456",
    });

    expect(config).toMatchObject({
      enabled: true,
      status: "enabled",
      publisherId: "pub-1234567890123456",
      clientId: "ca-pub-1234567890123456",
    });
    expect(createGoogleAdsTxtRecord(config.publisherId!)).toBe(
      "google.com, pub-1234567890123456, DIRECT, f08c47fec0942fa0",
    );
  });
});
