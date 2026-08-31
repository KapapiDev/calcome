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

`AUTOMATION.md` is the permanent operating policy.

`TASK_STATE.md` is the compact mutable execution ledger. It records the current OPEN task, completed recent tasks, calculator milestone count, security gates, and the next intended task.

`TASK_QUEUE.md` is the task catalog and detailed scope archive. Its historical status labels may be stale and are not the primary execution-state source.

Actual GitHub state overrides stale text in either state file. If actual state and `TASK_STATE.md` disagree, reconcile the state in the same task Pull Request instead of creating a separate cleanup loop.

---

## Non-negotiable rules

1. Never commit directly to `main`.
2. Handle exactly one implementation task per scheduled execution.
3. Never create duplicate task branches or Pull Requests.
4. Start new work from the latest `origin/main`.
5. Preserve unrelated behavior already present on `main`.
6. Run formatter, lint, typecheck, all tests, production build, and `git diff --check` when the repository defines them.
7. Never bypass, weaken, remove, ignore, or falsify validation merely to pass.
8. Never merge a failed implementation, unverified calculation, security regression, broken public route, or unusable critical UX.
9. Security, calculation correctness, data preservation, public-route integrity, critical failures, and blocked user flows override feature, SEO, and advertising priority.
10. Never publish policy-sensitive values without actually reading current official sources and recording a visible verification date.
11. Preview or Production inspection limits alone must not freeze the development queue indefinitely.
12. The scheduled automation must never disable itself. Only an explicit user request may disable it.

---

## Startup: call connected tools first

At the beginning of every scheduled run, actually call the connected GitHub and Vercel tools before making any claim about availability, permissions, deployment state, or project existence.

### GitHub startup

At minimum:

- read latest `main`
- read `AUTOMATION.md`, `TASK_STATE.md`, and relevant `TASK_QUEUE.md` scope
- inspect open Pull Requests and matching task branches
- inspect the current PR head SHA when one exists
- inspect GitHub Actions associated with that exact current head

### Vercel startup

At minimum:

- call team discovery first
- attempt project/deployment lookup when relevant
- use GitHub Vercel-bot comments as a first-class fallback source for project ID, deployment ID/URL, Preview URL, and deployment state

Known CalCome identifiers may be used as fallback evidence when still corroborated by current repository or bot state:

- team: `team_cuJFcIPj1zvkSmGeDk3hckZd`
- project historically observed through Vercel bot: `prj_nNXkUJGK9l7vG83KDZE2XOVHHd80`

### Connector truth rule

Do not confuse connector availability with resource visibility.

- If an authenticated general call succeeds, such as Vercel team discovery, the connector is available.
- `403`, `404`, or an empty project/deployment list for one resource means that specific lookup is unavailable, hidden, stale, or permission-limited. It does not mean the entire Vercel connector is unavailable.
- A GitHub Vercel-bot `Ready` Preview is valid deployment evidence even when direct Vercel project/deployment lookup is permission-limited.
- Do not describe a connector as unusable until actual calls have failed across the relevant general and resource-specific paths.

On the first failure, gather another evidence path. Do not stop after one empty result or one error.

If the same root cause blocks two runs, do not repeat the same failed sequence. Improve the operating rule, diagnostic path, CI, or repository documentation so the third run uses a different effective fallback.

Only ask the user for manual intervention when a platform truly requires a user-only OAuth, account-owner, billing, or legal approval after tool-based paths have been exhausted.

---

## Effective task state and selection

Use this effective-state order:

- `IN_REVIEW`: matching open Pull Request exists.
- `IN_PROGRESS`: recoverable task branch exists without an open Pull Request.
- `POST_MERGE_VERIFY`: task is merged and code gates passed, while Production observation remains unavailable only because of deployment propagation or an external inspection limitation.
- `DONE`: implementation is merged and no known product blocker remains.
- `OPEN`: task is marked OPEN in `TASK_STATE.md` and no earlier effective state applies.

Task-selection order:

1. Fix a newly confirmed security, calculation, public-route, data-loss, or critical UX defect if it is a true product blocker.
2. Repair or finish the earliest `IN_REVIEW` task.
3. Resume the earliest recoverable `IN_PROGRESS` task.
4. Select the single `OPEN` task in `TASK_STATE.md`.
5. If state is stale but actual GitHub evidence proves the OPEN task already merged, reconcile it and advance to the next eligible task without creating a duplicate branch.

A pending Production observation is not a second implementation task and must not block the next run when there is no concrete product-failure evidence.

---

## Task granularity and product-progress rule

`one execution = one implementation task` remains a safety boundary, but a task must represent a meaningful product increment rather than the smallest test or file change that can be named.

When planning, extending, or advancing the queue:

- Do not create a separate follow-up task whose only independent value is one additional regression assertion, source-contract assertion, locale-parity assertion, alias guard, normalization guard, ranking guard, route guard, or similarly narrow test for the same feature area.
- Bundle closely related regression coverage and safe fixes for the same user-facing feature into one bounded task and one PR whenever they can be validated together without weakening safety.
- If 2 or more consecutive queued tasks touch the same feature area and primarily add tests or guards rather than distinct user-visible value, consolidate the remaining unstarted work into one larger hardening task before implementation.
- Prefer tasks that produce a measurable user or business outcome: improved calculator usefulness, discoverability, search/navigation UX, SEO/indexability, performance, accessibility, monetization readiness, or a confirmed defect repair.
- A test-only task is eligible only when it closes a concrete high-value regression risk that is not reasonably part of an adjacent implementation task, or when required to prevent recurrence of a proven defect.
- Do not manufacture future tasks merely to keep the queue non-empty. After a feature area is sufficiently guarded, move to the next highest-value product area.
- Queue detail may contain subtasks or checklists, but those subtasks do not each require their own branch or PR.
- When consolidation changes future task IDs or scopes, update `TASK_STATE.md` and the relevant `TASK_QUEUE.md` scope in the same implementation PR so exactly one next OPEN task remains.

This rule reduces CI/Preview churn and PR inflation while preserving the exact-head CI, security, calculation, route, data, and critical-UX gates below.

---

## Branch and implementation discipline

For a new task, create one task-specific branch from latest `origin/main`. For recoverable work, resume the existing branch.

Implementation must:

- follow the current architecture and design system
- inspect and reuse shared components first
- stay limited to the selected task
- avoid unrelated refactoring and unnecessary dependencies
- preserve calculators, routes, redirects, metadata, navigation, tests, sitemap, language switching, structured data, and SEO behavior
- preserve CalCome's fast, high-clarity calculator product direction
- avoid evidence-free redesigns

Before editing shared files, inspect their latest `origin/main` version and preserve every unrelated newer entry.

When the same proven defect and safe fix repeat across several files, fix the complete confirmed affected set in one bounded task instead of serial micro-fixes.

---

## Vercel Hobby deployment budget

Treat Vercel Preview deployments as a limited Hobby-plan resource.

A remote branch push can trigger a new Preview deployment, so do not use Vercel as a formatting or syntax feedback loop.

Before the first push:

1. Attempt to use any executable workspace that is actually available in the run. Do not assume local/container execution is unavailable without trying it once when the tool exists.
2. Inspect repository formatter configuration, ignore rules, package scripts, and adjacent file style.
3. Run repository formatter/check commands on all touched files when execution is available.
4. Run as much lint, typecheck, focused testing, build, and diff validation as the environment permits.
5. Review the complete diff and group related corrections before creating the remote branch head.

Push discipline:

- Prefer one validated implementation push.
- Do not push speculative intermediate states merely to see what CI or Vercel says.
- Do not create no-op or empty trigger commits when a rerun API or real corrective commit is available.
- If the first CI run fails, collect the complete failure set before making the next push.
- Correct all same-root-cause formatting or lint issues in one pass.
- Never fix one formatting line per scheduled execution.
- Never rerun the same failed head unchanged.

Reducing Preview count must never weaken calculation, security, test, or build validation.

---

## Policy-sensitive calculation rule

For South Korea tax, payroll, benefits, labor-law, regulated lending, housing-policy, subsidy, pension, or other policy-sensitive calculators, source verification happens before implementation, not after it.

Required sequence:

1. Open and read current official government, tax authority, regulator, or statute sources during the run.
2. Record the exact source URL, effective date when available, and verification date.
3. Extract the formula, thresholds, rates, rounding, exceptions, and boundary rules actually required by the calculator.
4. Prefer official worked examples as regression cases when available.
5. Implement only after the current rule is understood.
6. Add visible source and verification information to the product when the value is policy-sensitive.

Secondary sources may help interpretation but may not override an official primary source.

If current official evidence cannot be accessed and the task depends on current legal rates or thresholds, do not merge guessed values from memory or an older PR description.

English routes for South Korea-specific calculations must clearly state South Korea and KRW scope rather than pretending the formula is globally transferable.

---

## Dependency and security triage

Package-manager vulnerability output is a security signal that must be classified, not ignored and not blindly treated as a production outage.

When a new high or critical vulnerability set appears:

- determine the exact advisory, dependency path, installed version, fixed version, and whether it is a production/runtime dependency or dev/build-only dependency
- run both full dependency audit and production-only audit when supported
- fix confirmed production-impact high/critical issues before ordinary feature expansion when a safe fix exists
- prefer minimal compatible upgrades
- do not use `npm audit fix --force` or breaking major upgrades without proving they are necessary and validating the resulting application
- record residual known advisories and their classification so the same unchanged advisory set does not create a new blocker every run

A vulnerability count alone is not enough to claim the live product is vulnerable. A confirmed production-impact security issue is a hard blocker.

---

## Calculator and SEO integration invariants

When adding or changing a public calculator:

- preserve every existing public URL
- register the route exactly once through the canonical public source
- use only `https://www.calcome.com` as the production origin
- preserve standards-compliant XML sitemap behavior
- preserve Korean and English routes and reciprocal language switching
- preserve canonical, hreflang, and x-default behavior
- preserve or add a one-hop locale-less redirect
- include the calculator in directory/home discovery
- assign exactly one valid primary directory category
- add useful aliases where relevant
- add contextual related-calculator links where appropriate
- include unique explanatory content and worked examples
- verify structured data contains each calculator exactly once
- declare the correct currency semantics

Never fabricate search volume, legal rules, tax rates, policy values, `lastmod`, `changefreq`, or `priority`.

---

## Validation gate

Before opening or updating a Pull Request:

1. Confirm latest `origin/main` is included without conflict.
2. Inspect the complete diff against `origin/main`.
3. Confirm only the selected implementation task and its required `TASK_STATE.md` transition are included.
4. Confirm no existing entry or behavior disappeared.
5. Confirm no Git operation remains unresolved.

Run at minimum when defined:

- formatter / format verification
- lint
- typecheck
- all tests
- relevant route, redirect, sitemap, metadata, SEO, structured-data, accessibility, and integration tests
- production build
- `git diff --check`
- `npm run check`
- `npm run build`

For calculators, manually verify representative examples, boundary values, units, rounding, monthly/annual conversion, tax treatment, and invalid inputs. Record expected and actual results.

### Exact-head GitHub Actions gate

When a repository GitHub Actions workflow exists for the Pull Request, the current PR head must receive a successful workflow result before automatic merge.

- Do not merge while the current-head workflow is queued or in progress.
- Do not merge a failed or cancelled current-head workflow.
- A previous head's green run does not validate a newer corrective commit.
- Local checks strengthen the gate but do not replace the current-head CI requirement when CI is configured and running normally.
- If GitHub Actions itself is externally unavailable, leave the Pull Request open for the next run rather than weakening the gate.

Formatting-only failure procedure:

1. Fetch the exact failing job log.
2. Capture every formatter-reported file and exact diff/output.
3. Apply all formatter corrections in one corrective change.
4. Push once.
5. Require a new current-head CI success before merge.

---

## Pull Request and automatic merge

Create or update exactly one non-Draft Pull Request for the selected task unless a real unresolved product defect requires Draft status.

The Pull Request must:

- target `main`
- use a repository-owned head branch
- include the exact task ID in title/body
- explain implementation and calculation verification
- include validation results
- include `AUTO_MERGE: true` only when eligible
- include the `TASK_STATE.md` transition that will be correct if this PR merges

Automatic squash merge is allowed only when:

- current PR head is the intended reviewed head
- latest `main` is included without conflict
- Pull Request is not Draft
- body contains `AUTO_MERGE: true`
- current-head GitHub Actions is successful when configured
- formatter, lint, typecheck, all tests, production build, and `git diff --check` passed
- calculation accuracy and required policy-source checks passed
- no known security, regression, route, calculation, data, or critical UX blocker remains

Use the expected head SHA when merging when the tool supports it so a moved head cannot be merged accidentally.

---

## Preview and Vercel continuity

Vercel Preview browser access is useful but is not a merge gate when repository and current-head CI gates pass.

For each pushed head, inspect deployment evidence once without creating extra pushes merely for inspection.

If direct Vercel resource lookup returns `403`, `404`, or empty results:

1. confirm the general connector call still works
2. use current Vercel-bot PR comments
3. recover project/deployment IDs or URLs from that current evidence
4. retry the relevant resource lookup once through the stronger identifier path
5. record the exact limitation and continue if no application failure is shown

A Vercel Preview marked `Ready` strengthens confidence.

Do not use the external-limit exception when Vercel itself reports a build failure caused by application code or configuration. Investigate and fix a reproducible application deployment failure.

---

## Post-merge verification

After merge:

1. Verify the final merge SHA and latest `main`.
2. Confirm `TASK_STATE.md` on `main` now reflects the completed task and exactly one next OPEN task.
3. Check Vercel Production deployment state when accessible.
4. Check Production Smoke or equivalent when available.
5. Test the target Production route with HTTP/browser tools when reachable.

Do not declare a product outage from DNS, timeout, access protection, connector resource permission, or browser-environment failure alone.

If a real Production defect is confirmed, insert or execute the repair before new feature work.

If Production cannot be observed only because of an external limitation, record `POST_MERGE_VERIFY` evidence and continue future runs.

---

## Browser UX verification

When Preview or Production is reachable, test applicable representative flows at desktop and mobile widths:

- entry from home/directory/search
- normal calculation
- manual result comparison
- invalid input and error messages
- reset and recalculation
- Korean/English round trip preserving calculator identity
- refresh/back navigation
- locale-less redirect
- long-number and small-screen overflow
- keyboard navigation, focus visibility, labels, result announcements, touch targets
- light and dark mode

Minor visual defects may become follow-up tasks. Critical usability defects block merge.

Never claim an unperformed browser check succeeded.

---

## TASK_STATE transition rule

Every implementation Pull Request must keep mutable execution state self-healing.

If the PR merges, its `TASK_STATE.md` must already represent the post-merge truth:

- selected task becomes `DONE`
- calculator count and remaining milestone count are updated if applicable
- exactly one next task becomes `OPEN`
- later tasks remain blocked by order, not by stale historical labels
- new verified security/critical repair work may be inserted ahead of the next feature

Because state changes travel in the same Pull Request as the implementation, they reach `main` only if the implementation actually merges.

Do not create a separate queue-maintenance PR after every feature.

---

## Final reporting

Report in Korean and keep routine automation results concise.

State only the important verified facts:

- task/PR and whether it merged
- current-head CI result
- Vercel Preview/Production result or exact external limitation
- any real product/security blocker
- next OPEN task / whether queue continues

Do not dump long logs unless a failure needs them.
