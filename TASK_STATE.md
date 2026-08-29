# CalCome Task State

Last Updated: 2026-08-30
Current Calculator Count: 100
Target Calculator Count: 100
Remaining to Target: 0

## Active Queue

- [x] SEO-001 DONE — Internal Linking Structure
  - PR: T.B.D.
- [x] SEO-002 DONE — Category Hub and Navigation SEO
  - PR: #314
- [x] SEO-003 DONE — Technical SEO and Indexability Audit
  - PR: #325
- [x] SEO-004 DONE — Calculator Content Depth and Trust Template
  - PR: #326
- [x] SEO-005 DONE — Search Intent and Metadata Optimization
  - PR: #327
- [x] SEO-006 DONE — Internal Linking and Topic Cluster Hubs
  - PR: #328
- [x] SEO-007 DONE — Live SEO Monitoring, Indexation, Crawl and Discovery Checks
  - PR: #329
- [x] SEO-008 DONE — Search Console Query and Cannibalization Feedback Loop
  - PR: #330
- [x] ADS-001 DONE — AdSense Policy and Site Trust Readiness Audit
  - PR: #331
- [x] ADS-002 DONE — Original Guide and Decision-Support Content Program
  - PR: #332
- [x] ADS-003 DONE — Ad Placement Architecture Without Layout Shift
  - PR: #333
- [x] ADS-004 DONE — Consent and Regional Privacy Controls
  - PR: #334
- [x] ADS-005 DONE — AdSense Integration and ads.txt
  - PR: #335
- [ ] OPS-ADS-001 EXTERNAL_WAIT — Production AdSense Activation Verification
  - Verified 2026-08-29: Vercel team discovery succeeds; project deployment listing returns 403 and the current Vercel-bot deployment ID returns 404 through the direct deployment lookup. The public production site is reachable, but connected Gmail contains no AdSense account approval/site-status message or real publisher ID. The account-owner AdSense Sites/publisher-ID evidence required to safely activate Production is therefore unavailable through connected paths.
  - Resume condition: authoritative AdSense account evidence exposes the intended `pub-################` publisher ID and `calcome.com` site status. Never infer, invent, or substitute an ID.
  - This external account-owner wait is not a product/security failure and must not freeze unrelated repository development.
- [x] UX-007 DONE — Full-Site Accessibility and Visual Consistency Regression
  - PR: #337
  - Final regression on latest post-AdSense UI found the newly added privacy controls below the shared 44px touch-target contract. The launcher, consent actions, reset action, and close action now preserve a 44px minimum target, with focused bilingual regression coverage. Existing calculation, routing, SEO, consent semantics, and the 100-calculator inventory are unchanged.
- [ ] SEO-009 EXTERNAL_WAIT — Post-100 Calculator Search Performance and Coverage Review
  - Verified 2026-08-29: Search Console sent current Soft 404 indexation notifications on 2026-08-23, while public Google crawl evidence on 2026-08-29 shows representative current and recently-added CalCome routes being crawled/indexed. A fresh query/page/country/device performance export is not available through connected sources, so no traffic metrics or reprioritization are inferred from stale data.
  - Resume condition: authoritative current Search Console query×page, page, country, device, and Page Indexing evidence is available. See `docs/SEO_POST_100_REVIEW_2026-08-29.md`.
  - This private-account evidence wait is not a confirmed product/indexability failure and must not freeze unrelated repository development.
- [x] SEO-010 DONE — Public Indexability and Search Snippet Regression
  - PR: #339
- [x] SEO-011 DONE — Structured Data and Rich-Result Regression
  - PR: #340
- [x] SEO-012 DONE — Sitemap, Canonical and Hreflang Cross-Source Regression
  - PR: #341
- [x] SEO-013 DONE — Public Route Status and Soft-404 Regression
  - PR: #342
- [x] SEO-014 DONE — Robots, Noindex and Crawl Directive Regression
  - PR: #343
- [x] UX-009 DONE — Global Locale Routing and English Surface Integrity
  - PR: #269
- [x] OPS-STATE-001 DONE — Unique Task Identity and State Ledger Guard
  - PR: #344
- [x] PERF-001 DONE — Core Web Vitals and Runtime Performance Regression
  - PR: #345
- [x] PERF-002 DONE — Client Hydration and Bundle Boundary Regression
- [x] PERF-003 DONE — Third-Party Script and Consent Loading Regression
- [x] PERF-004 DONE — Static Asset, Font and Image Loading Regression
- [x] PERF-005 DONE — Server Rendering and Cache Boundary Regression
  - The root metadata pass and root layout independently read the same request headers and repeated locale/path/country derivation for every server render. A request-scoped React cache now memoizes that shared request context so both consumers reuse one header read while preserving intentional request-dependent locale routing, canonical metadata, AdSense gating, and consent-region behavior.
- [ ] UX-010 OPEN — Contextual Related Calculators and Home Category Entry
  - Scope: implement the existing TASK_QUEUE UX-010 contract using the current calculator source of truth, preserving canonical locale routes, minimal home UX, and deterministic contextual discovery.
