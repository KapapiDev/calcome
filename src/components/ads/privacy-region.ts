import type { AdPrivacyRegion } from "./ad-consent";

const GOOGLE_CERTIFIED_CMP_COUNTRIES = new Set([
  "AT",
  "BE",
  "BG",
  "CH",
  "CY",
  "CZ",
  "DE",
  "DK",
  "EE",
  "ES",
  "FI",
  "FR",
  "GB",
  "GR",
  "HR",
  "HU",
  "IE",
  "IS",
  "IT",
  "LI",
  "LT",
  "LU",
  "LV",
  "MT",
  "NL",
  "NO",
  "PL",
  "PT",
  "RO",
  "SE",
  "SI",
  "SK",
]);

export function classifyGoogleConsentRegion(
  countryCode: string | null | undefined,
): AdPrivacyRegion {
  const normalized = countryCode?.trim().toUpperCase();
  if (!normalized || !/^[A-Z]{2}$/.test(normalized)) return "unknown";

  return GOOGLE_CERTIFIED_CMP_COUNTRIES.has(normalized)
    ? "regulated"
    : "other";
}
