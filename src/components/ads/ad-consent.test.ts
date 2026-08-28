import { describe, expect, it } from "vitest";

import {
  AD_CONSENT_POLICY_VERSION,
  canLoadAdPayload,
  defaultAdConsent,
  parseStoredAdConsent,
  serializeAdConsent,
  type AdConsentSnapshot,
} from "./ad-consent";

const certifiedGrant: AdConsentSnapshot = {
  version: AD_CONSENT_POLICY_VERSION,
  decision: "granted",
  source: "certified-cmp",
};

const localGrant: AdConsentSnapshot = {
  version: AD_CONSENT_POLICY_VERSION,
  decision: "granted",
  source: "site-control",
};

describe("ad consent policy", () => {
  it("fails closed for regulated and unknown regions without certified CMP consent", () => {
    expect(canLoadAdPayload("regulated", defaultAdConsent)).toBe(false);
    expect(canLoadAdPayload("unknown", localGrant)).toBe(false);
    expect(canLoadAdPayload("regulated", localGrant)).toBe(false);
    expect(canLoadAdPayload("regulated", certifiedGrant)).toBe(true);
  });

  it("allows other regions by default while honoring an explicit denial", () => {
    expect(canLoadAdPayload("other", defaultAdConsent)).toBe(true);
    expect(
      canLoadAdPayload("other", {
        ...defaultAdConsent,
        decision: "denied",
      }),
    ).toBe(false);
  });

  it("round-trips valid state and rejects malformed or stale state", () => {
    expect(parseStoredAdConsent(serializeAdConsent(localGrant))).toEqual(
      localGrant,
    );
    expect(parseStoredAdConsent("not-json")).toEqual(defaultAdConsent);
    expect(
      parseStoredAdConsent(
        JSON.stringify({ ...localGrant, version: AD_CONSENT_POLICY_VERSION + 1 }),
      ),
    ).toEqual(defaultAdConsent);
  });
});
