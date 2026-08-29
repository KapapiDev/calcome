# CalCome Task State

Last Updated: 2026-08-29
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
  - Public search-title evidence reproduced duplicate branding on the retirement-pension / IRP calculator because both its page metadata and the shared root title template appended `CalCome`. Child metadata now owns only the descriptive title while the root template owns branding once; focused tests preserve the bilingual canonical and hreflang targets. See `docs/SEO_PUBLIC_INDEXABILITY_SNIPPET_REGRESSION_2026-08-29.md`.
- [x] SEO-011 DONE — Structured Data and Rich-Result Regression
  - PR: #340
  - Reproduced a bilingual hub regression: `/` and `/calculators` emitted structured data, while equivalent `/en` and `/en/calculators` hubs omitted it. English home now emits the canonical WebSite entity and the English directory emits its own canonical CollectionPage with exactly 100 unique localized ListItems. Existing representative calculator-family JSON-LD guards remain intact. See `docs/SEO_STRUCTURED_DATA_RICH_RESULT_REGRESSION_2026-08-29.md`.
- [x] SEO-012 DONE — Sitemap, Canonical and Hreflang Cross-Source Regression
  - PR: #341
  - Reproduced a cross-source contradiction where the sitemap and English metadata exposed `/en` as an indexable English canonical while `next.config.ts` permanently redirected `/en` to `/`. Removed only that conflicting locale redirect and added registry-driven regression coverage proving no localized sitemap canonical is also a locale redirect source, while preserving all 100 locale-less calculator redirects and the `/ko` compatibility redirect.
- [x] SEO-013 DONE — Public Route Status and Soft-404 Regression
  - PR: #342
  - Repository route-contract coverage now proves all 100 published calculator canonicals are backed by real shared locale route modules, representative static/directory/info/not-found routes remain source-backed, and locale-less aliases only redirect to real canonical calculator pages. Public home and directory content were observable; ambiguous external fetch errors were not misclassified as product Soft 404s. See `docs/SEO_PUBLIC_ROUTE_STATUS_SOFT404_REGRESSION_2026-08-29.md`.
- [x] SEO-014 DONE — Robots, Noindex and Crawl Directive Regression
  - PR: #343
  - Current repository sources have no crawl-directive contradiction: robots allows the canonical public surface, shared metadata opts public content into index/follow, sitemap entries stay on the canonical production host, and technical error/not-found surfaces stay out of the sitemap. Added cross-source regression coverage without changing valid crawl behavior. See `docs/SEO_ROBOTS_NOINDEX_CRAWL_DIRECTIVE_REGRESSION_2026-08-29.md`.
- [x] UX-009 DONE — Global Locale Routing and English Surface Integrity
  - PR: #269
  - Actual GitHub history proves this task merged on 2026-08-24 with exact-head CI success. The stale OPEN reintroduced after SEO-014 is reconciled here instead of recreating the old implementation or branch.
- [x] OPS-STATE-001 DONE — Unique Task Identity and State Ledger Guard
  - PR: #344
  - Adds a repository check requiring exactly one OPEN task and unique task IDs in TASK_STATE.md so a historically completed task cannot be reintroduced as a second ledger entry under the same ID.
- [x] PERF-001 DONE — Core Web Vitals and Runtime Performance Regression
  - PR: pending
  - At the 100-calculator scale, directory search repeated full record joins and locale-aware normalization on every keystroke, while the English directory repeatedly scanned and relocalized the registry while rendering cards. Search now memoizes an invariant normalized index and the English directory reuses one module-level localized map, removing repeated per-interaction and per-render work without changing search semantics, routes, SEO, accessibility, calculator logic, or ad layout. See `docs/PERF_001_RUNTIME_PERFORMANCE_REGRESSION_2026-08-29.md`.
- [ ] PERF-002 OPEN — Client Hydration and Bundle Boundary Regression
  - Scope: inspect shared 100-calculator surfaces for unnecessary client hydration and oversized shared client boundaries; reduce only reproducible client JavaScript or hydration work while preserving theme, language switching, privacy controls, calculator interaction, SEO, accessibility, and ad-consent behavior.
