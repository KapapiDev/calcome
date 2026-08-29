# SEO-009 — Post-100 Calculator Search Performance and Coverage Review

Verified: 2026-08-29

## Evidence available in this run

- CalCome has reached the 100-calculator repository milestone.
- Google Search Console sent two current indexation notifications on 2026-08-23 reporting a new `Soft 404` exclusion reason, including sitemap-listed pages.
- A fresh query/page/country/device Search Console export is not available through the connected sources in this run. No traffic, CTR, position, country, device, or cannibalization numbers are inferred from older exports or invented.
- Public Google crawl evidence on 2026-08-29 shows the current CalCome home/directory and representative recently-added calculator routes being crawled/indexed, including `/en/employment/minimum-wage`, `/en/employment/unemployment-benefits`, `/en/finance/retirement-pension-tax-credit`, and `/ko/finance/stock-profit-loss`.
- The production home exposes all seven calculator categories and the current 100-calculator inventory through the shared directory/navigation surface.

## Decision

There is not enough fresh private Search Console performance data to make a defensible query/page/country/device reprioritization. The current accessible evidence also does not prove an active site-wide indexability failure: Google is continuing to crawl representative current routes after the 2026-08-23 Soft 404 alert.

Therefore this review does **not** change calculator math, canonicals, redirects, locale routing, or metadata merely to react to historical Search Console rows. SEO-009 is moved to `EXTERNAL_WAIT` until a fresh Search Console performance export is available. Repository development continues with a bounded public indexability/search-snippet regression that can be verified without private account data.

## Resume condition for SEO-009

Resume the private-data portion when an authoritative current Search Console export is available for all of:

1. query × page performance,
2. page performance,
3. country performance,
4. device performance,
5. Page Indexing / exclusion evidence.

Run `scripts/gsc-feedback.mjs` on the current query×page export and compare only against real retained exports. Multiple ranking pages are a review signal, not automatic proof of canonical consolidation.

## Guardrails

- Never fabricate Search Console numbers or search demand.
- Do not narrow the broad 100-calculator strategy from sparse or stale data.
- Do not turn a Search Console exclusion notification into a product failure without reproducing the affected URLs.
- Prefer shared metadata, discovery, content-depth, crawl/indexability, and snippet fixes when current evidence supports them.
- Preserve canonical locale URLs, sitemap integrity, bilingual route identity, and existing public URLs.
