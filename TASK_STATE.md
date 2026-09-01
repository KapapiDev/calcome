# CalCome Task State

Last Updated: 2026-09-02
Current Calculator Count: 100
Target Calculator Count: 100
Remaining to Target: 0

## External waits

- [ ] OPS-ADS-001 EXTERNAL_WAIT — Production AdSense Activation Verification
  - Verified 2026-08-29: Vercel team discovery succeeds; project deployment listing returns 403 and the current Vercel-bot deployment ID returns 404 through the direct deployment lookup. The public production site is reachable, but connected Gmail contains no AdSense account approval/site-status message or real publisher ID.
  - Resume condition: authoritative AdSense account evidence exposes the intended publisher ID and `calcome.com` site status. This account-owner wait is not a product/security failure and must not freeze unrelated repository development.
- [ ] SEO-009 EXTERNAL_WAIT — Post-100 Calculator Search Performance and Coverage Review
  - Verified 2026-08-29: current Search Console notifications exist, but a fresh query/page/country/device performance export is unavailable through connected sources.
  - Resume condition: authoritative current Search Console performance and Page Indexing evidence becomes available. This private-account wait is not a confirmed product/indexability failure.

## Recent completed work

- [x] SEO-015 DONE — Post-100 Internal-Link Reachability and Orphan-Route Regression
  - All 100 published calculator IDs remain covered by directory/search discovery and bilingual sitemap registration.
- [x] SEO-016 DONE — Post-100 Metadata and Structured-Data Coverage Regression
  - Published calculator routes retain deterministic metadata, alternates, and calculator structured-data coverage.
- [x] SEO-017 DONE — Post-100 Metadata Uniqueness and Search-Snippet Regression
  - Bilingual metadata uniqueness and placeholder regressions are executable CI failures.
- [x] SEO-018 DONE — Post-100 Search Discovery Quality and Snippet Optimization
  - Thin or purpose-free calculator descriptions are rejected by executable coverage.
- [x] SEO-019 DONE — Post-100 Calculator Content Helpfulness and Explanation Coverage Regression
  - Shared result interpretation, assumptions, and next-step guidance are covered across published calculators.
- [x] SEO-020 DONE — Post-100 Content Trust Template Coverage Regression
  - Reusable method/example/assumption/limitation trust-template adoption remains guarded without blanket boilerplate.
- [x] UX-053 DONE — Shared Calculator Scenario Presets and Side-by-Side Comparison Upgrade
  - Up to three result-only scenarios can be captured and compared in the current page session without persistent input storage.
- [x] UX-054 DONE — Shared Calculator Scenario Labels and Baseline Comparison Upgrade
  - Saved in-session result scenarios support short local labels and one selected comparison baseline. Labels and baseline selection stay bounded to component memory, stale results cannot be selected as a new baseline, removing or clearing a scenario clears any matching baseline, and formulas/input persistence remain unchanged.
- [x] PERF-007 DONE — Post-100 Core Web Vitals and Shared Client Bundle Budget Audit
  - Current Next.js build output now reports shared and aggregate emitted client JavaScript sizes, largest chunks, and enforces deterministic gzip budgets for the root shared client runtime after every CI build without changing routes, calculations, hydration behavior, or public UX.
- [x] PERF-008 DONE — Post-100 Route-Level Client Chunk and Heavy Dependency Regression
  - Build-time bundle auditing now separates non-shared route/feature JavaScript from the shared runtime, reports the largest non-shared chunks, and rejects any single route/feature chunk above a bounded 350 KiB gzip ceiling so unexpectedly eager heavy dependencies become an executable CI regression instead of silently expanding page cost.
- [x] UX-055 DONE — Shared Favorites and Recent Calculator Navigation Upgrade
  - Local favorites and bounded recent-calculator shortcuts retain deterministic calculator identity/order, direct stable routes, explicit removal semantics, and now remain discoverable with bilingual empty-state guidance back to the full calculator directory without storing financial inputs.
- [x] UX-056 DONE — Shared Favorites/Recent Management and Discoverability Upgrade
  - Repeat-use shortcuts now self-heal retired or malformed stored calculator IDs against the current public registry, expose clear favorites/recent/all management actions, and show a compact shortcut count while continuing to store only calculator identity/order on the device.
- [x] UX-057 DONE — Favorites-First Directory Discovery Upgrade
  - The bilingual calculator directory now surfaces device-local favorites ahead of popular/category sections when favorites exist, preserves favorite order and stable localized routes, records recent use on shortcut navigation, and leaves the complete server-rendered 100-calculator directory and structured data unchanged.

## Active queue

- [ ] UX-058 OPEN — Directory Search Recovery and Keyboard Discovery Upgrade
  - Scope: improve recovery when directory search has no or weak matches, keep alias/category discovery clear, and ensure keyboard and screen-reader users can move from search results back into the deterministic full directory without introducing client-only indexability or route duplication.

## Security gate

- No confirmed unresolved production-impact high/critical dependency blocker is recorded on current `main`. New audit signals must still be classified under `AUTOMATION.md` before merge.

## Ledger policy

`TASK_STATE.md` intentionally keeps current waits, recent completed work, milestone counts, security state, and exactly one next OPEN task. Detailed historical task scope remains in `TASK_QUEUE.md` and Git history.
