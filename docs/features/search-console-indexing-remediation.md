# Search Console Indexing Remediation

Status: Implemented

## Scope and acceptance

Authorized by the site owner's 2026-10-30 request to resolve the audited exclusions. This is a bounded correction to existing SEO/discovery behavior, not a new calculator or visual redesign. Keep formulas, policy content, the 100-calculator inventory, and established canonical URLs unchanged.

- Restore reciprocal Korean/English/x-default metadata on the seven canonical Korean static pages; the live SEO check currently fails all seven.
- Redirect the exact duplicated English rent-conversion URL reported by Search Console to its existing canonical English calculator. Include direct apex-host normalization. Do not redirect nonexistent ROI, margin, or dollar-sign URLs to unrelated content; they already return HTTP 404 and noindex.
- Give the audited calculator candidates contextual inbound related-calculator links. The current selector never recommends DTI, bond price, crypto profit/loss, retirement withdrawal, annual leave allowance, parental leave benefit, or loan refinancing savings anywhere in the shared related section.
- Preserve the existing four-link limit, language, uniqueness, and published-route guards.
- Preserve intentional redirects, the `/ko/calculators` alternate, and non-document resource exclusions.
- Run exact-head preflight, live SEO checks, and targeted production HTTP checks. Google indexing is an external outcome; record requests/validation separately from actual index inclusion.

## Implementation and verification

Use the existing metadata helper, shared recommendation map, and Next.js redirect configuration. Regression coverage compares rendered-route metadata exports with the sitemap, verifies recovery of the exact legacy URL, and checks incoming recommendations for all ten calculator identities represented by the fifteen audited localized URLs. Existing UI and formulas are reused.

Search Console baseline: 2026-10-23, 198 indexed and 50 excluded (22 redirect, 6 not found, 2 Soft 404, 1 alternate, 12 discovered, 7 crawled). The current site serves the eighteen desired documents with HTTP 200; four nonexistent addresses remain legitimate 404/noindex. The duplicated-locale address is the fifth 404 and has an exact replacement. DTI passed Google's live URL test on 2026-10-30. The submitted 214-URL sitemap was last read successfully on 2026-10-28.

No new factual financial, tax, employment, or legal claims are introduced.

## Dependency audit classification

The unchanged lockfile was audited with both full and production-only npm audits on 2026-10-30. Existing high/critical advisory counts are not treated as proof of a live exploit. The MCP/Express/proxy/undici/Zod/system-information paths are dependencies of the unused `shadcn` generation CLI, not application imports. The app does not use `use cache`, Server Actions, `next/image`, or attacker-controlled SVG input to `ImageResponse`; its generated icons/social images contain fixed product content. Next.js 16.3.3 and the pinned sharp 0.35.4 still have conditional advisories (including GHSA-vcvr-r3jv-pc5j, GHSA-2464-fhr4-w9xw, GHSA-673q-mjm6-r5xr, and GHSA-wq5f-xc86-pv6w). No exploit path was reproduced or enabled by this SEO patch. Dependency upgrades remain separate work; no audit output is suppressed and no breaking or unrelated upgrade is included.
