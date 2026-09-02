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
  - Repeat-use shortcuts now self-heal retired or malformed stored calculator IDs against the current public registry, expose clear-favorites, clear-recent, and clear-all management actions, and show a compact shortcut count while continuing to store only calculator identity/order on the device.
- [x] UX-057 DONE — Favorites-First Directory Discovery Upgrade
  - The bilingual calculator directory now surfaces device-local favorites ahead of popular/category sections when favorites exist, preserves favorite order and stable localized routes, records recent use on shortcut navigation, and leaves the complete server-rendered 100-calculator directory and structured data unchanged.
- [x] UX-058 DONE — Directory Search Recovery and Keyboard Discovery Upgrade
  - Directory search now exposes deterministic full-directory recovery for zero or weak matches, preserves alias/category result ranking, supports Escape-to-clear without losing keyboard focus, and keeps the complete bilingual server-rendered directory as the recovery target instead of introducing client-only routes or duplicate URLs.
- [x] UX-059 DONE — Shared Calculator Result Copy and Share Upgrade
  - Shared result context now offers bilingual result reuse through native sharing when available and clipboard fallback otherwise, sharing only the calculator identity and currently displayed result summary without persisting inputs or adding result URLs; stale results remain blocked until recalculation.
- [x] UX-060 DONE — Shared Result Actions Accessibility and Mobile Regression
  - Shared scenario, copy/share, print/PDF, and previous-result behavior now has one integrated regression covering deterministic keyboard order, 44px mobile action targets, narrow-screen stacking, polite status announcements, stale-result blocking, bilingual copy, and result-only privacy boundaries without changing formulas, storage, or routes.
- [x] UX-061 DONE — Favorite Ordering and Repeat-Use Shortcut Personalization Upgrade
  - Device-local favorite shortcuts now support deliberate earlier/later ordering with bilingual keyboard-accessible 44px controls, preserve stable calculator-ID-only storage and localized routes, leave recent history independent, and retain the complete server-rendered directory and structured data unchanged.
- [x] UX-062 DONE — Repeat-Use Personalization Cross-Surface Consistency Regression
  - One integrated bilingual regression now keeps device-local favorite order synchronized between repeat-use shortcuts and favorites-first directory discovery through stale-ID reconciliation, reordering, localized route identity, removal/clear actions, keyboard focusability, and 44px mobile targets without storing calculator inputs/results or changing server-rendered directory/structured-data coverage.
- [x] UX-063 DONE — Shared Calculator Keyboard Submit and Reset Interaction Upgrade
  - Shared calculator forms now validate keyboard-style form submission through the same path as submit-button activation, reset clears shared stale-result/action state, and reset/recalculate return focus predictably to the first usable control without changing formulas, routes, storage, or mobile result behavior.
- [x] UX-064 DONE — Shared Calculator Form Interaction Cross-Calculator Regression
  - Representative date/general and business-finance calculators now adopt the shared bilingual form-action contract, including keyboard validation recovery, stale-result reset semantics, and first-control focus return; the regression is executable while compound-interest retains its already-covered explicit validation/focus behavior.
- [x] UX-065 DONE — Shared Calculator Form Contract Full-Fleet Adoption Audit
  - Every form-bearing `*-calculator.tsx` implementation is now guarded by a self-discovering CI audit requiring semantic form submission plus an explicit reset action wired to either shared or local reset behavior; equivalent existing action components remain valid and formulas, routes, policy values, and storage remain unchanged.
- [x] UX-066 DONE — Shared Calculator Mobile Input Ergonomics Full-Fleet Audit
  - Published calculator text-entry inputs are now guarded by a self-discovering CI audit for mobile-readable sizing, bounded touch-target sizing, fluid-width overflow protection, and explicit keyboard/date semantics without changing formulas, routes, policy values, or stored data.
- [x] UX-067 DONE — Shared Calculator Mobile Input Runtime Regression
  - Representative numeric, formatted-money, and native date inputs are now covered at rendered runtime across Korean and English surfaces for intended mobile keyboard semantics, mobile-readable sizing, fluid width, and formatted-money behavior without changing formulas, routes, policy values, or stored data.
- [x] UX-068 DONE — Shared Calculator Mobile Result Readability and Overflow Full-Fleet Audit
  - Every published `*-calculator.tsx` result surface is now guarded by a self-discovering CI audit requiring the shared mobile-safe `PrimaryResults` contract for narrow-screen stacking, long-value wrapping, stable numeric alignment, and result hierarchy without changing formulas, routes, policy values, or stored data.

## Active queue

- [ ] UX-069 OPEN — Shared Calculator Mobile Result Readability Runtime Regression
  - Scope: verify representative long numeric and localized result values render through the shared result contract across Korean and English calculator surfaces, preserving narrow-screen containment and readable hierarchy without changing formulas, routes, policy values, or stored data.

## Security gate

- No confirmed unresolved production-impact high/critical dependency blocker is recorded on current `main`. New audit signals must still be classified under `AUTOMATION.md` before merge.

## Ledger policy

`TASK_STATE.md` intentionally keeps current waits, recent completed work, milestone counts, security state, and exactly one next OPEN task. Detailed historical task scope remains in `TASK_QUEUE.md` and Git history.
