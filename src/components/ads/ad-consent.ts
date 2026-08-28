export const AD_CONSENT_POLICY_VERSION = 1 as const;
export const AD_CONSENT_STORAGE_KEY = "calcome.ad-consent.v1";

export type AdPrivacyRegion = "regulated" | "other" | "unknown";
export type AdConsentDecision = "unknown" | "granted" | "denied";
export type AdConsentSource = "site-control" | "certified-cmp";

export type AdConsentSnapshot = {
  version: typeof AD_CONSENT_POLICY_VERSION;
  decision: AdConsentDecision;
  source: AdConsentSource;
};

export const defaultAdConsent: AdConsentSnapshot = {
  version: AD_CONSENT_POLICY_VERSION,
  decision: "unknown",
  source: "site-control",
};

export function requiresCertifiedCmp(region: AdPrivacyRegion) {
  return region !== "other";
}

export function canLoadAdPayload(
  region: AdPrivacyRegion,
  consent: AdConsentSnapshot = defaultAdConsent,
) {
  if (consent.decision === "denied") return false;

  if (!requiresCertifiedCmp(region)) return true;

  return (
    consent.decision === "granted" && consent.source === "certified-cmp"
  );
}

export function parseStoredAdConsent(value: string | null): AdConsentSnapshot {
  if (!value) return defaultAdConsent;

  try {
    const parsed = JSON.parse(value) as Partial<AdConsentSnapshot>;
    const validDecision =
      parsed.decision === "unknown" ||
      parsed.decision === "granted" ||
      parsed.decision === "denied";
    const validSource =
      parsed.source === "site-control" || parsed.source === "certified-cmp";

    if (
      parsed.version !== AD_CONSENT_POLICY_VERSION ||
      !validDecision ||
      !validSource
    ) {
      return defaultAdConsent;
    }

    return parsed as AdConsentSnapshot;
  } catch {
    return defaultAdConsent;
  }
}

export function serializeAdConsent(consent: AdConsentSnapshot) {
  return JSON.stringify(consent);
}
