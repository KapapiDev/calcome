# AUTOMATION

## Purpose

This document defines the permanent rules for autonomous development in CalCome.

The automation must safely complete exactly one eligible implementation task per scheduled execution, validate it, create or update one Pull Request, merge it automatically only when repository gates pass, keep execution state current, and continue future work even when Vercel Preview or Production inspection is blocked only by external environment limits.

No user approval is required for an eligible automation Pull Request that satisfies these rules.

---

## Authority and state files

Read these in this order at every run:

1. latest `origin/main/AUTOMATION.md`
2. latest `origin/main/TASK_STATE.md`
3. latest `origin/main/TASK_QUEUE.md`
4. actual GitHub Pull Requests, branches, merge state, current head SHA, and exact-head GitHub Actions
5. actual Vercel connector and GitHub Vercel-bot evidence

`AUTOMATION.md` is the permanent operating policy. `TASK_STATE.md` is the compact mutable execution ledger. `TASK_QUEUE.md` is the task catalog and detailed scope archive. Actual GitHub state overrides stale text. If actual state and `TASK_STATE.md` disagree, reconcile the state in the same task Pull Request instead of creating a separate cleanup loop.

---

## Non-negotiable rules

1. Never commit directly to `main`.
2. Handle exactly one implementation task per scheduled execution.
3. Never create duplicate task branches or Pull Requests.
4. Start new work from the latest `origin/main`.
5. Preserve unrelated behavior already present on `main`.
6. Run formatter, lint, typecheck, all tests, production build, and `git diff --check` when defined.
7. Never bypass, weaken, remove, ignore, or falsify validation merely to pass.
8. Never merge a failed implementation, unverified calculation, security regression, broken public route, or unusable critical UX.
9. Security, calculation correctness, data preservation, public-route integrity, critical failures, and blocked user flows override feature, SEO, and advertising priority.
10. Never publish policy-sensitive values without actually reading current official sources and recording a visible verification date.
11. Preview or Production inspection limits alone must not freeze the development queue indefinitely.
12. The scheduled automation must never disable itself. Only an explicit user request may disable it.

---

## Startup: call connected tools first

At the beginning of every scheduled run, actually call the connected GitHub and Vercel tools before making any claim about availability, permissions, deployment state, or project existence.

GitHub startup must read latest main, `AUTOMATION.md`, `TASK_STATE.md`, relevant `TASK_QUEUE.md`, open PRs/matching branches, current PR head SHA, and exact-head Actions. Vercel startup must call team discovery first, then relevant project/deployment lookup, with current GitHub Vercel-bot evidence as fallback.

Known fallback identifiers, when corroborated by current evidence:
- team: `team_cuJFcIPj1zvkSmGeDk3hckZd`
- project: `prj_nNXkUJGK9l7vG83KDZE2XOVHHd80`

Do not confuse connector availability with resource visibility. A successful authenticated general call proves the connector is available. A resource-specific 403/404/empty result is a lookup limitation, not total connector failure. A current Vercel-bot Ready Preview is valid evidence. On first failure gather another evidence path. If the same root cause blocks two runs, improve the operating rule, diagnostic path, CI, or repository documentation rather than repeating the same failed sequence. Ask for manual intervention only for truly user-only OAuth, account-owner, billing, or legal approval after tool paths are exhausted.

---

## Effective task state and selection

Effective state order: `IN_REVIEW` open matching PR; `IN_PROGRESS` recoverable task branch; `POST_MERGE_VERIFY` merged/code-gated but Production observation externally limited; `DONE` merged with no known product blocker; `OPEN` the single task marked OPEN in `TASK_STATE.md` when no earlier state applies.

Selection order:
1. newly confirmed security, calculation, public-route, data-loss, or critical UX blocker
2. earliest `IN_REVIEW`
3. earliest recoverable `IN_PROGRESS`
4. single `OPEN` task in `TASK_STATE.md`
5. if state is stale but GitHub proves the OPEN task already merged, reconcile and advance without duplicate work

Pending Production observation is not a second implementation task and does not block the next run absent concrete product-failure evidence.

---

## Task granularity and product-progress rule

`one execution = one implementation task` remains a safety boundary, but a task must represent a meaningful product increment rather than the smallest test or file change that can be named.

When planning, extending, or advancing the queue:

- Do not create a separate follow-up task whose only independent value is one additional regression assertion, source-contract assertion, locale-parity assertion, alias guard, normalization guard, ranking guard, route guard, or similarly narrow test for the same feature area.
- Bundle closely related regression coverage and safe fixes for the same user-facing feature into one bounded task and one PR whenever they can be validated together without weakening safety.
- If 2 or more consecutive queued tasks touch the same feature area and primarily add tests/guards rather than distinct user-visible value, consolidate the remaining unstarted work into one larger hardening task before implementation.
- Prefer tasks that produce a measurable user or business outcome: improved calculator usefulness, discoverability, search/navigation UX, SEO/indexability, performance, accessibility, monetization readiness, or a confirmed defect repair.
- A test-only task is eligible only when it closes a concrete high-value regression risk that is not reasonably part of an adjacent implementation task, or when required to prevent recurrence of a proven defect.
- Do not manufacture future tasks merely to keep the queue non-empty. After a feature area is sufficiently guarded, move to the next highest-value product area.
- Queue detail may contain subtasks/checklists, but those subtasks do not each require their own branch or PR.
- When consolidation changes future task IDs or scopes, update `TASK_STATE.md` and the relevant `TASK_QUEUE.md` scope in the same implementation PR so exactly one next OPEN task remains.

This rule reduces CI/Preview churn and PR inflation while preserving the exact-head CI, security, calculation, route, data, and critical-UX gates below.

---

## Branch and implementation discipline

For a new task, create one task-specific branch from latest `origin/main`; recover existing work when present. Follow current architecture/design, reuse shared components, stay within selected scope, avoid unrelated refactoring/dependencies, preserve calculators/routes/redirects/metadata/navigation/tests/sitemap/language switching/structured data/SEO, preserve CalCome's fast high-clarity direction, and avoid evidence-free redesigns. Before editing shared files inspect latest main and preserve unrelated newer entries. When the same proven defect and safe fix repeat across several files, fix the complete confirmed affected set in one bounded task instead of serial micro-fixes.

---

## Vercel Hobby deployment budget

Treat Preview deployments as limited. Before first push, attempt any available executable workspace; inspect formatter config/scripts/style; run formatter/checks on touched files; run as much lint/typecheck/focused tests/build/diff validation as possible; review the complete diff and group corrections. Prefer one validated implementation push. Do not push speculative intermediate states, no-op trigger commits, or one-line formatter fixes. After a CI failure collect the complete failure set and correct all same-root-cause issues in one pass. Never rerun the same failed head unchanged. Reducing Preview count never weakens validation.

---

## Policy-sensitive calculation rule

For South Korea tax, payroll, benefits, labor law, regulated lending, housing policy, subsidy, pension, or other policy-sensitive calculators, verify current official primary sources before implementation. Record source URL, effective date when available, verification date, formulas, thresholds, rates, rounding, exceptions, and boundaries; prefer official worked examples; implement only after current rules are understood; expose source/verification information when policy-sensitive. Secondary sources cannot override primary sources. If current official evidence is inaccessible, do not merge remembered/old values. English routes for Korea-specific calculations must state South Korea and KRW scope.

---

## Dependency and security triage

New high/critical signals require advisory, dependency path, installed/fixed versions, and runtime-vs-dev classification. Run full and production-only audits when supported. Fix confirmed production-impact high/critical issues before ordinary features when safely possible. Prefer minimal compatible upgrades. Do not use force fixes or breaking majors without proof and validation. Record residual classifications. Vulnerability count alone does not prove live vulnerability; confirmed production-impact risk is a hard blocker.

---

## Calculator and SEO integration invariants

When adding/changing a public calculator: preserve all public URLs; register route exactly once through canonical source; use only `https://www.calcome.com` as production origin; preserve valid XML sitemap; preserve Korean/English routes and reciprocal language switching; canonical/hreflang/x-default; one-hop locale-less redirect; directory/home discovery; exactly one primary category; useful aliases and contextual related links; unique explanatory content/worked examples; exactly-once structured data; correct currency semantics. Never fabricate search volume, legal rules, tax rates, policy values, `lastmod`, `changefreq`, or `priority`.

---

## Validation gate

Before opening/updating a PR: include latest main without conflict; inspect complete diff; ensure only selected task plus required state/queue transition; ensure nothing unrelated disappeared; ensure no unresolved Git operation. Run defined formatter, lint, typecheck, all tests, relevant route/redirect/sitemap/metadata/SEO/structured-data/accessibility/integration tests, production build, `git diff --check`, `npm run check`, and `npm run build`. For calculators manually verify representative/boundary values, units, rounding, conversions, tax treatment, invalid inputs, expected vs actual.

When Actions exists, the current PR head must have successful CI before automatic merge. Never merge queued/in-progress/failed/cancelled current-head CI; old-head success is invalid; local checks do not replace current-head CI. If Actions is externally unavailable, leave PR open. For formatting-only failure fetch exact job log, capture every reported file/diff, fix all once, push once, then require new-head success.

---

## Pull Request and automatic merge

Create/update exactly one non-Draft PR for the selected task unless a real unresolved product defect requires Draft. Target main, repository-owned branch, exact task ID in title/body, implementation/verification summary, validation results, `AUTO_MERGE: true` only when eligible, and the `TASK_STATE.md` post-merge transition.

Squash merge only when intended current head is reviewed, latest main included, non-Draft, body has `AUTO_MERGE: true`, current-head Actions succeeds, formatter/lint/typecheck/all tests/build/diff pass, calculation/policy checks pass, and no known security/regression/route/calculation/data/critical-UX blocker remains. Use expected head SHA when supported.

---

## Preview and Vercel continuity

Preview browser access is useful but not a merge gate when repository/current-head CI gates pass. Inspect deployment evidence once per pushed head without extra inspection pushes. On 403/404/empty: confirm general connector, use current Vercel-bot comment, recover identifiers/URLs, retry once through stronger identifier, record exact limitation, continue absent app failure. Ready Preview strengthens confidence. A reproducible Vercel build failure caused by app code/config must be investigated and fixed.

---

## Post-merge verification

Verify merge SHA/latest main, confirm `TASK_STATE.md` has completed task and exactly one next OPEN, check Production and smoke when accessible, and test target route when reachable. Do not infer outage from DNS/timeout/protection/permission/browser-environment failure alone. Confirmed Production defects precede new features. External-only observation limits become `POST_MERGE_VERIFY` evidence and do not freeze future runs.

---

## Browser UX verification

When reachable, test applicable desktop/mobile flows: home/directory/search entry, normal calculation, manual comparison, invalid input, reset/recalculation, Korean/English identity-preserving round trip, refresh/back, locale-less redirect, overflow, keyboard/focus/labels/announcements/touch targets, light/dark mode. Minor visual defects may follow; critical usability blocks merge. Never claim an unperformed browser check succeeded.

---

## TASK_STATE transition rule

Every implementation PR must make state self-healing. If merged, `TASK_STATE.md` already shows selected task DONE, calculator counts updated when applicable, exactly one next task OPEN, later tasks ordered, and any verified critical repair inserted ahead when needed. State travels with implementation and reaches main only on merge. Do not create repetitive queue-maintenance PRs. When the product-progress rule consolidates unstarted microtasks, record that consolidation in the same PR rather than spawning a cleanup PR.

---

## Final reporting

Report briefly in Korean: task/PR/merge status, current-head CI, Vercel Preview/Production or exact external limitation, real product/security blocker, and next OPEN/queue continuity. Do not dump long logs unless failure needs them.
