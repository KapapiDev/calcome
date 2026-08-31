# CalCome Task State

Last Updated: 2026-08-31
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

- [x] UX-039 DONE — Directory Search Ranking Tier Single-Source Regression
  - PR: #379. Closed the directory-search micro-regression sequence and added the permanent task-granularity/product-progress rule.
- [x] UX-040 DONE — Shared Calculator Result Actions and Repeat-Use Upgrade
  - PR: #380. Added bilingual recalculate, copy-result feedback, and calculator-directory continuation actions.
- [x] UX-041 DONE — Shared Calculator First-Run Guidance and Example Entry Upgrade
  - PR: #381. Added bilingual first-run guidance, safe example filling, reset localization, and accessible feedback.
- [x] UX-042 DONE — Shared Calculator Input Validation and Error Recovery Upgrade
  - PR: #382. Added shared native-constraint recovery, first-invalid focus, and preservation of other entered values.
- [x] UX-043 DONE — Shared Calculator Stale-Result and Recalculation Clarity Upgrade
  - PR: #383. Added stale-result detection, bilingual warning, and stale-copy blocking without changing formulas or stored inputs.
- [x] UX-044 DONE — Calculator Favorites and Recent-Use Shortcuts
  - Shared directory cards now let users explicitly favorite calculators and record recently opened calculator IDs. Korean and English routes share the same calculator identity, repeat-use shortcuts are restored on the directory without storing calculator inputs or financial data, and storage/private-browsing failures remain non-fatal. The same task localizes the English card action and adds focused storage regression coverage.
- [x] UX-045 DONE — Shared Calculator Mobile Completion and Result Navigation Upgrade
  - Successful narrow-screen calculation now moves directly from the shared submit action to the calculated primary results and focuses the result region without adding URL state or storing calculator inputs. Existing invalid-input recovery remains in place, desktop behavior is unchanged, and shared recalculation still returns users to the nearest calculator form.

## Active queue

- [ ] UX-046 OPEN — Shared Calculator Result Explanation and Assumption Clarity Upgrade
  - Scope: improve result comprehension across representative calculator families by pairing the primary result hierarchy with concise bilingual interpretation and assumption/context guidance where the existing shared result surface can do so safely. Do not invent policy assumptions or duplicate long-form page content; preserve formulas, routes, SEO, accessibility, and stored-data boundaries.

## Security gate

- No confirmed unresolved production-impact high/critical dependency blocker is recorded on current `main`. New audit signals must still be classified under `AUTOMATION.md` before merge.

## Ledger policy

`TASK_STATE.md` intentionally keeps current waits, recent completed work, milestone counts, security state, and exactly one next OPEN task. Detailed historical task scope remains in `TASK_QUEUE.md` and Git history.
