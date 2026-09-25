# CalCome Task State

Last Updated: 2026-09-25
Current Calculator Count: 100
Target Calculator Count: 100
Remaining to Target: 0

## External waits

- [ ] OPS-ADS-001 EXTERNAL_WAIT — Production AdSense Activation Verification
  - Verified 2026-08-29: Vercel team discovery succeeds; project deployment listing returns 403 and the current Vercel-bot deployment ID returns 404 through the direct deployment lookup. The public production site is reachable, but connected Gmail contains no AdSense account approval/site-status message or real publisher ID.
  - Resume condition: authoritative AdSense account evidence exposes the intended publisher ID and `calcome.com` site status. This account-owner wait is not a product/security failure and must not freeze unrelated repository development.

## Recent completed work

- [x] SEO-009 DONE — Post-100 Calculator Search Performance and Coverage Review
  - Fresh 2026-09-25 Search Console exports are now available and reviewed: 19 clicks / 3,537 impressions over the last 3 months; the latest 7 days improved to 9 clicks / 271 impressions / 3.32% CTR / 22.38 average position versus 3 clicks / 344 impressions / 0.87% CTR / 28.49 average position in the prior 7 days.
  - Page Indexing reached 193 indexed and 55 not indexed on 2026-09-21. The 55 exclusions are 22 redirects, 1 alternate canonical, 18 discovered-not-indexed, 6 crawled-not-indexed, 6 404, and 2 Soft 404.
  - Search Generative AI Features recorded 219 impressions in the 3-month export; 154 occurred in the latest 28 days versus 61 in the prior 28 days.
  - Data-backed growth work is queued after UX-072 in `TASK_QUEUE.md`; do not manufacture additional UX tasks merely to keep the queue non-empty.

- [x] SEO-015 through SEO-020 DONE — Post-100 internal-link, metadata, snippet, helpful-content, and trust-template coverage remains executable in CI.
- [x] PERF-007 through PERF-008 DONE — Shared and route-level client bundle budgets remain executable in CI.
- [x] UX-053 through UX-062 DONE — Scenario comparison, repeat-use shortcuts, directory discovery, result reuse, and cross-surface personalization are shipped and regression-covered.
- [x] UX-063 DONE — Shared Calculator Keyboard Submit and Reset Interaction Upgrade
  - Shared calculator forms validate keyboard-style submission through the same path as submit-button activation; reset clears stale-result/action state and restores predictable focus.
- [x] UX-064 DONE — Shared Calculator Form Interaction Cross-Calculator Regression
  - Representative calculator families adopt the shared bilingual form-action contract.
- [x] UX-065 DONE — Shared Calculator Form Contract Full-Fleet Adoption Audit
  - Every form-bearing calculator is guarded by a self-discovering semantic submit/reset contract audit.
- [x] UX-066 DONE — Shared Calculator Mobile Input Ergonomics Full-Fleet Audit
  - Published calculator text-entry inputs are guarded for mobile-readable sizing, touch targets, fluid width, and explicit keyboard/date semantics.
- [x] UX-067 DONE — Shared Calculator Mobile Input Runtime Regression
  - Representative numeric, formatted-money, and native date inputs are covered at rendered runtime across Korean and English surfaces.
- [x] UX-068 DONE — Shared Calculator Mobile Result Readability and Overflow Full-Fleet Audit
  - Published calculator result surfaces are guarded by the shared mobile-safe `PrimaryResults` contract.
- [x] UX-069 DONE — Shared Calculator Mobile Result Readability Runtime Regression
  - Representative Korean and English long localized result values are covered at rendered runtime.
- [x] UX-070 DONE — Post-100 Shared Interaction and Accessibility Hardening
  - Result focus/announcements, reduced-motion behavior, shared action wrapping, and shared button motion are hardened without changing formulas, routes, or storage.
- [x] UX-071 DONE — Full-Site Accessibility and Visual Consistency Regression
  - The broader shared-shell regression reconfirmed bilingual skip-link, primary/footer navigation, theme control, accessible names, keyboard focus treatment, and 44px shared navigation targets. The remaining proven inconsistency was the language menu options, which now use the same 44px minimum target and visible focus-ring contract in both locales. Calculator-specific mobile input/result and reduced-motion contracts remain covered by UX-066 through UX-070.

## Active queue

- [ ] UX-072 OPEN — Post-100 Home and Directory Conversion and Discovery Upgrade
  - Scope: improve the bilingual home-to-calculator and directory-to-calculator journeys using the existing 100-calculator inventory, search, category, favorites, and recent-use primitives; prioritize clearer high-intent entry points and measurable discovery value without adding duplicate routes, fabricated demand claims, or new persistent financial data.
  - Post-merge transition: if UX-072 merges without a higher-priority blocker, the next OPEN task is SEO-021 from the 2026-09-25 Search Growth Program. Do not extend the UX sequence by default.

## Security gate

- No confirmed unresolved production-impact high/critical dependency blocker is recorded on current `main`. New audit signals must still be classified under `AUTOMATION.md` before merge.

## Ledger policy

`TASK_STATE.md` intentionally keeps current waits, recent completed work, milestone counts, security state, and exactly one next OPEN task. Detailed historical task scope remains in `TASK_QUEUE.md` and Git history.
