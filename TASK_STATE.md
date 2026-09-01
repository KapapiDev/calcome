# CalCome Task State

Last Updated: 2026-09-01
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

- [x] UX-052 DONE — Shared Calculator Printable Result Summary Upgrade
  - Shared calculated-result guidance offers a bilingual browser print/PDF summary without uploading or automatically persisting calculator inputs or results.
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

## Active queue

- [ ] PERF-007 OPEN — Post-100 Core Web Vitals and Shared Client Bundle Budget Audit
  - Scope: measure current production/build-side performance evidence for the 100-calculator site, identify shared client JavaScript or hydration regressions with concrete evidence, and make only bounded high-confidence improvements that preserve routes, SEO, calculations, accessibility, and current shared UX behavior. Add durable budget/regression coverage where the repository can measure it deterministically; do not perform speculative rewrites merely to reduce an estimated bundle size.

## Security gate

- No confirmed unresolved production-impact high/critical dependency blocker is recorded on current `main`. New audit signals must still be classified under `AUTOMATION.md` before merge.

## Ledger policy

`TASK_STATE.md` intentionally keeps current waits, recent completed work, milestone counts, security state, and exactly one next OPEN task. Detailed historical task scope remains in `TASK_QUEUE.md` and Git history.
