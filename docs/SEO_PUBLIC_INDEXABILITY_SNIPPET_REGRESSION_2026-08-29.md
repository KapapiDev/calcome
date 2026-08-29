# SEO-010 — Public Indexability and Search Snippet Regression

Verified: 2026-08-29

## Reproduced public defect

- Representative current CalCome calculator routes remain publicly discoverable, so there is no evidence in this run of a site-wide indexability outage.
- The South Korea retirement-pension / IRP tax-credit calculator exposed a duplicated brand in public search-title evidence: the page-specific metadata already ended in `| CalCome`, while the root Next.js metadata template also appends `| CalCome`.
- Canonical and bilingual `hreflang` targets for this calculator remain on the intended `/ko/...` and `/en/...` public routes.

## Fix

The page-specific Korean and English titles now contain only the descriptive calculator title. The shared root title template remains the single owner of the CalCome brand suffix, preventing `... | CalCome | CalCome` without changing the public URL, canonical, language alternates, calculation logic, or calculator inventory.

A focused metadata regression test locks the unbranded child-title contract and the existing canonical / hreflang targets.

## Guardrails

- Preserve all 100 calculators and their current public URLs.
- Do not infer private Search Console demand or affected URL counts from unavailable account data.
- Treat search snippets as external observations, not a substitute for repository/current-head CI.
- Keep branding ownership deterministic: child page metadata provides the descriptive title, and the root metadata template applies the site brand once.
