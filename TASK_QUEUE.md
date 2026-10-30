# CalCome Task Queue

Reconciled: 2026-10-30, at the owner's request.

This file contains current work and explicit waits. Historical scopes and obsolete status labels are preserved in [the archived queue](docs/archive/task-queue-2026-10-30.md). Use `TASK_STATE.md` and actual GitHub state to select work; never restart an archived proposal because its old snapshot says OPEN or BLOCKED.

## Priority and execution rules

- A reproduced security, calculation, data-loss, public-route, or critical usability defect overrides this order. An advisory count or an inspection failure alone is not proof of such a defect.
- Finish the existing implementation PR before starting another implementation branch. The owner-requested queue reconciliation is documentation maintenance, not a second product implementation.
- Keep one selected OPEN task in `TASK_STATE.md`. An existing PR makes its effective state IN_REVIEW; OPEN is the checker-compatible selection slot, not permission to create a duplicate PR.
- External waits run independently of development. A Google quota or an AdSense account wait must not freeze the current guide work.
- Prefer fixes justified by current search or user evidence. Do not add calculators, generic articles, redesigns, or tiny guard-only tasks merely to keep the queue occupied.
- Preserve formulas, published URLs, Korean/English behavior, the 100-calculator inventory, and all existing validation gates.

## Current priorities

| Track              | Priority                     | Task                                                                      | Actual state               | Next action                                                                                     |
| ------------------ | ---------------------------- | ------------------------------------------------------------------------- | -------------------------- | ----------------------------------------------------------------------------------------------- |
| Development 1      | HIGH                         | SEO-023 — Finish the existing guide batch                                 | IN_REVIEW, PR #427         | Include latest main, review the five topics, run full verification, merge and verify production |
| Operations 1       | HIGH when eligible           | OPS-INDEX-001 — Finish individual indexing requests                       | EXTERNAL_WAIT, daily quota | Resume only the remaining 12 URLs after quota permits; no automatic schedule was authorized     |
| Development 2      | HIGH                         | SEO-025 — Search performance review and evidence-backed improvement batch | BLOCKED on SEO-023 release | Refresh search evidence before selecting at most three existing-page improvements               |
| Account operations | MEDIUM when evidence arrives | OPS-ADS-001 — Verify AdSense activation                                   | EXTERNAL_WAIT              | Confirm approval/site status and the intended publisher ID before production ad activation      |

## SEO-023 — Finish the existing guide batch

Status: OPEN selection slot; effective state IN_REVIEW.

Existing PR: [#427](https://github.com/KapapiDev/calcome/pull/427), branch `auto/seo-023`, last inspected head `30e2f7e891366a087bca76d73a1ee15565f3743b`.

Why first: five topics are already implemented and previewed. Completing this bounded release provides more value than starting a second content or audit project.

Remaining scope:

1. Reuse PR #427. Include latest main and resolve its queue/state changes against these current files; preserve SEO-026 and the operational waits.
2. Review the existing five topics: CAGR, annualization, YTM, bond price/yield, and currency conversion. They provide ten localized routes. Verify distinct intent, useful examples, correct calculator links, and factual sources; do not expand the batch to reach a larger article count.
3. Keep concise definitions, assumptions, worked examples, and source/trust cues as release criteria for these guides. Any policy-sensitive factual addition requires current official verification.
4. Run `npm run automation:preflight` on the final head. The 2026-10-02 Vercel Ready preview is useful evidence, but the PR records no completed local preflight and does not include the later indexing repair.
5. Merge only after current-head gates pass, then verify production routes, language pairs, discovery, and sitemap coverage. Counts must match the actual released inventory rather than a fabricated target.

Acceptance:

- The existing five topics, their ten localized routes, guide indexes, calculator links, metadata, and sitemap work together in production.
- Existing calculator behavior, formulas, and public routes remain intact.
- Current-head required checks pass and production evidence is recorded.
- In the same implementation PR, mark SEO-023 DONE and select SEO-025 as the next OPEN task; preserve OPS-INDEX-001 and OPS-ADS-001.
- Do not restore SEO-024 as the next task from the older PR text.

## OPS-INDEX-001 — Finish individual indexing requests

Status: EXTERNAL_WAIT. This is an operational follow-up to completed SEO-026 source changes.

Evidence as of 2026-10-30:

- PR #428 is merged and deployed; its production SEO check passed all 214 canonical URLs.
- Google fix validations were started for all 18 desired excluded documents, and the sitemap was resubmitted successfully.
- Six individual requests were confirmed: English DTI, compound interest, loan refinancing savings, real-estate brokerage fee; Korean annual leave allowance and hourly wage.
- The next attempt returned Google's explicit daily-quota error. reCAPTCHA works in the fresh Chrome tab. No browser/security settings were changed.
- The owner chose to request continuation manually; do not create a scheduled retry or repeatedly retry the exhausted quota.

Remaining URLs, all under `https://www.calcome.com`:

- `/ko/employment/parental-leave-benefit`
- `/ko/finance/bond-price`
- `/ko/finance/crypto-profit-loss`
- `/ko/finance/loan-refinancing-savings`
- `/ko/finance/retirement-withdrawal`
- `/en/employment/hourly-wage`
- `/en/finance/bond-price`
- `/en/finance/crypto-profit-loss`
- `/en/finance/retirement-withdrawal`
- `/en/about`
- `/en/contact`
- `/en/privacy`

Completion means confirmed submission of the remaining eligible requests, or confirmed existing index inclusion where resubmission is unnecessary. Actual index selection remains Google's external outcome. Stop on a quota limit or a user-required authentication challenge; do not change accounts, bypass CAPTCHA, or change healthy redirects/intentional 404s to chase a zero exclusion count.

## SEO-025 — Search performance review and evidence-backed improvement batch

Status: BLOCKED on SEO-023 release; next development task. This replaces the old dependency on a standalone SEO-024 AI-search project.

Why next: the old search baseline is from 2026-09-25. Refreshed evidence should determine the next changes before another broad content rewrite.

Scope:

- Capture fresh Search Console 7-day/28-day page and query metrics, compare established pages with the previous baseline, and classify genuine opportunities by impressions, clicks, CTR, position, and intent. Retain exact date ranges and sources.
- Record the guide release as a new baseline. Review those new guides after a meaningful 14–28 day observation window; do not attribute immediate movements to the release or let that observation window block work supported by established-page data.
- Select at most three existing pages for one coherent improvement batch when evidence supports it. Improve useful answer framing, titles/descriptions, examples, source clarity, or contextual links rather than creating keyword variants.
- Carry the useful answerability/trust requirements from former SEO-024 into those selected pages. Policy-sensitive factual edits still require current official primary sources.
- If no change is supported, record the decision and a clear next evidence trigger instead of manufacturing implementation tasks.

Acceptance:

- A dated source-backed comparison and a justified next-priority decision exist.
- Any changed pages have a before/after rationale, remain distinct and bilingual, and pass relevant checks plus the normal release gate.
- The new-guide observation date/trigger is recorded without inventing traffic or ranking promises and without creating an unrequested automation.

## OPS-ADS-001 — Verify AdSense activation

Status: EXTERNAL_WAIT. Last account-evidence check recorded: 2026-08-29; this is not a fresh claim about current approval.

Resume when authoritative account evidence confirms the intended publisher ID and the `calcome.com` site status. Recheck that evidence when this task is explicitly resumed; do not infer approval from reachable production pages or a Vercel preview. Keep production ad activation dependent on verified account facts, not on this wait's age.

## Removed from the active queue

| Historical work                                                                       | Disposition                                                                                                                                                                                                    |
| ------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| P-001 through P-093 expansion proposal tables                                         | Archived. The actual 100-calculator milestone is complete; archived proposals are not a mandate to resurrect ROI/margin or every historical slug. This does not assert every proposed ID shipped individually. |
| Old OPS-001 / UX-007 / UX-009 / UX-010 / SEO-FIX and repeated full-site audit entries | Archived or superseded by released work and executable regression coverage. Reopen only for a new reproduced defect.                                                                                           |
| SEO-024 standalone AI-search hardening                                                | CONSOLIDATED, not marked DONE. Its useful trust/answerability criteria belong inside SEO-023 and evidence-selected SEO-025 changes; no separate fleet-wide AI SEO rewrite is queued.                           |
| Generic guide expansion, repeated UI/source guards, premature ad-integration tasks    | Not active priorities. Add new work only for observed user/search demand, a reproduced defect, or verified account prerequisites.                                                                              |

## Completed baseline

- 100 registered calculators; the expansion milestone is achieved.
- Home/directory repeat-use and discovery improvements through UX-072; mobile/accessibility and bundle regressions remain covered.
- SEO-021 reconciliation and SEO-022 measured search snippet improvements are merged.
- SEO-026 URL, language metadata, and related-link repairs are merged and deployed in [PR #428](https://github.com/KapapiDev/calcome/pull/428); remaining Google operations are tracked above, not mislabeled as unfinished source code.

Historical detail: [queue snapshot](docs/archive/task-queue-2026-10-30.md), [state snapshot](docs/archive/task-state-2026-10-30.md), and Git history.
