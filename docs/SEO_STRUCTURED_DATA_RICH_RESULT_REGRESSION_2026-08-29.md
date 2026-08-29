# SEO-011 — Structured Data and Rich-Result Regression

Verified: 2026-08-29

## Reproduced defect

- The Korean home emitted the canonical `WebSite` JSON-LD entity, while the equivalent English `/en` home omitted structured data entirely.
- The Korean `/calculators` hub emitted a `CollectionPage` with a 100-item `ItemList`, while `/en/calculators` rendered the equivalent visible directory without any JSON-LD.
- Representative calculator-family tests already covered localized canonical `WebPage`, `BreadcrumbList`, language, unique IDs, production-origin URLs, and avoidance of unsupported rich-result claims.

## Fix

- `/en` now emits the same canonical CalCome `WebSite` entity used by the Korean home.
- `/en/calculators` now emits an English `CollectionPage` on its own canonical URL with `inLanguage: en-US` and exactly one `ListItem` for each of the 100 published calculators.
- English directory item URLs point to the corresponding `/en/...` calculator routes and remain on `https://www.calcome.com`.
- Focused regression tests lock the 100-item count, unique URLs, sequential positions, canonical production origin, and absence of Preview/localhost origins.

## Rich-result guardrails

This task does not claim or fabricate Google rich-result eligibility. CalCome continues to avoid unsupported `FAQPage`, `HowTo`, `Product`, `Offer`, ratings, reviews, or other schema solely for search appearance. Structured data must describe visible content and canonical routes; private Search Console enhancement data remains separate evidence.
