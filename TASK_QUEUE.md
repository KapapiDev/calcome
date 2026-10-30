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

The owner authorized SEO-028 as a bounded five-calculator improvement/usage pilot, separate from SEO-027's traffic-observation gate. After the pilot, the owner separately authorized SEO-029 to review all remaining 95 calculators and improve necessary content in one PR. This explicit continuation supersedes the pilot's original scope limit; it does not authorize an early ranking-outcome review. Records: `docs/SEO_028_FIVE_CALCULATOR_PILOT.md` and `docs/SEO_029_CALCULATOR_FLEET_REVIEW.md`.

| Track              | Priority                     | Task                                                | Actual state               | Next action                                                                                 |
| ------------------ | ---------------------------- | --------------------------------------------------- | -------------------------- | ------------------------------------------------------------------------------------------- |
| Operations 1       | HIGH when eligible           | OPS-INDEX-001 — Finish individual indexing requests | EXTERNAL_WAIT, daily quota | Resume only the remaining 12 URLs after quota permits; no automatic schedule was authorized |
| Evidence review    | HIGH when eligible           | SEO-027 — Evaluate the released search changes      | OPEN, evidence-gated       | Wait for complete post-release coverage; do not start speculative implementation            |
| Account operations | MEDIUM when evidence arrives | OPS-ADS-001 — Verify AdSense activation             | EXTERNAL_WAIT              | Confirm approval/site status and the intended publisher ID before production ad activation  |

## SEO-023 — Released guide batch

Status: DONE in [PR #427](https://github.com/KapapiDev/calcome/pull/427).

Five topics (CAGR, annualization, YTM, bond price/yield, currency conversion) provide ten localized routes. The release includes worked examples, assumptions, source links, a visible review date, reciprocal metadata, guide discovery, language switching and sitemap entries. Latest main's SEO-026 repair and the queue reconciliation remain intact. Required checks and production evidence are recorded in the PR; source/release notes are in `docs/features/measured-guide-cluster.md`.

Release baseline: 2026-10-30, 224 canonical sitemap URLs. Review the new guides over 2026-11-13 through 2026-11-27 (14–28 days), using actual production release as the start if delayed. Keep that observation separate from immediately useful established-page analysis; no unrequested monitor is created.

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

## SEO-025 — Completed search review and page improvements

Status: DONE. Search Console review captured on 2026-10-30; verified data ends on 2026-10-27.

Recent 28 days: 11 clicks / 1,779 impressions versus 17 / 1,770 in the preceding window. Recent seven days: 3 / 488 versus 4 / 338. Small samples, anonymized queries, rounded positions and shifting query mix prevent causal performance claims.

Improved three calculator identities: operating profit/margin, part-time monthly pay and bond YTM, with consistent Korean/English explanations. Added worked examples, assumptions, primary references and review dates; removed the retired margin link and added contextual YTM guide links. Mathematical engines and canonical routes remain unchanged. Selection, excluded candidates and before/after rationale: `docs/SEO_025_SEARCH_REVIEW_2026-10-30.md`. Current-head gates and deployment evidence are recorded in the implementation PR.

## SEO-027 — Evaluate the released search changes

Status: OPEN, evidence-gated. This is the next meaningful review, not an instruction to start another code batch immediately.

Eligibility: Search Console must cover complete post-release dates 2026-10-31 through at least 2026-11-13; prefer a 28-day view through 2026-11-27. Adjust dates if production release is delayed. A calendar date alone is insufficient when the report lags. The owner resumes manually; do not create a scheduled monitor.

Scope when eligible:

- Capture dated post-release metrics for the three changed calculators and new guides, comparing matched available pre-release windows (2026-10-16–29 for 14 days, or 2026-10-02–29 for 28 days).
- Separate brand/non-brand evidence where exposed, retain anonymized-query limitations, and account for query, device and country mix. Distinguish the new guides' observation from established-page changes.
- Decide whether to retain the changes, make a narrowly justified correction or record no action. Do not claim causality or invent a statistical win from a few clicks.
- Before the evidence gate, create no branch, PR, repeated full-site audit or speculative page rewrite. A newly reproduced product defect may still override this wait.

Acceptance: dated comparable evidence and a clear next decision; any resulting implementation must follow the normal gates. Do not manufacture another task if no useful change is supported.

## SEO-029 — Remaining calculator fleet review

Status: DONE. The owner's explicit continuation covers all remaining 95 identities / 190 localized routes after the five-calculator pilot. Added 91 bilingual worked-example sections, retained four adequate existing guides, corrected locale breadcrumbs and repaired stale take-home child credits and the maternity benefit cap. Review matrix, sources and model boundaries: `docs/SEO_029_CALCULATOR_FLEET_REVIEW.md`.

All 100 calculator identities now have reviewed example/interpretation coverage. This is a content and correctness release, not evidence of ranking or AI-citation improvement. SEO-027 must use the actual latest release baseline for pages changed by SEO-029; complete post-release coverage and matched windows remain required. No recurring fleet rewrite or automatic indexing retry was authorized.

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
- SEO-023 adds five topics / ten localized guides. SEO-025 completed the dated search review and three calculator improvements; SEO-027 is the next evidence-gated review.
- Home/directory repeat-use and discovery improvements through UX-072; mobile/accessibility and bundle regressions remain covered.
- SEO-021 reconciliation and SEO-022 measured search snippet improvements are merged.
- SEO-026 URL, language metadata, and related-link repairs are merged and deployed in [PR #428](https://github.com/KapapiDev/calcome/pull/428); remaining Google operations are tracked above, not mislabeled as unfinished source code.

Historical detail: [queue snapshot](docs/archive/task-queue-2026-10-30.md), [state snapshot](docs/archive/task-state-2026-10-30.md), and Git history.
