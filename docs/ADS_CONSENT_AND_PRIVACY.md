# ADS-004 Consent and Regional Privacy Controls

Verified against current Google AdSense publisher guidance on 2026-08-29.

## Policy boundary

Google requires a Google-certified CMP integrated with the IAB TCF when serving personalized ads to users in the EEA, the UK, and Switzerland. CalCome's own privacy control is not a CMP and must never be treated as one.

## Runtime rules

- `x-vercel-ip-country` is classified only for the Google advertising consent boundary. Missing or malformed country data is `unknown` and fails closed.
- EEA, UK, Switzerland, and `unknown` traffic may receive an ad payload only after a `granted` signal whose source is `certified-cmp`.
- Other regions may load an ad payload by default, but a locally stored user denial blocks optional advertising.
- Malformed or stale stored consent is discarded instead of being upgraded silently.
- The global Privacy choices control lets users reject optional advertising or reset their local preference. In regions requiring a certified CMP it never offers a fake local consent grant.
- ADS-005 must connect AdSense and any certified CMP through these guards rather than bypassing `AdSlot`.

## Source

Google AdSense Help: "Google consent management requirements for serving ads in the EEA, the UK, and Switzerland (for publishers)", verified 2026-08-29.
