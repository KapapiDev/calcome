# AUTOMATION

## Purpose

This document defines the permanent rules for autonomous development in CalCome.

The automation must turn exactly one eligible `TASK_QUEUE.md` entry into a validated Pull Request and may merge it automatically only after the exact head SHA passes repository checks and Vercel Preview verification. After merge, production deployment and public-site UX verification are mandatory before the task may be treated as complete.

No user approval is required for an eligible automation Pull Request that satisfies every rule below.

---

## Non-negotiable rules

1. Never commit directly to `main`.
2. Complete exactly one task per scheduled execution.
3. Never start a second task in the same execution.
4. Never create a duplicate task branch or Pull Request.
5. Start new work from the latest `origin/main`.
6. Preserve all unrelated behavior already present on `main`.
7. Run all configured lint, typecheck, format, tests, production build, and `git diff --check` validation.
8. Never bypass, weaken, remove, or falsify validation.
9. Only explicitly opted-in automation Pull Requests may merge automatically.
10. A failed implementation, unverified calculation, security regression, broken route, or unusable UX must never be merged.
11. Security, calculation correctness, critical production failures, and blocked user flows override normal feature, SEO, and advertising priority.
12. Never publish policy-sensitive tax, pension, labor, insurance, real-estate, or financial values without official sources and a visible verification date.

---

## Startup and effective state

At the start of every scheduled execution:

1. Fetch all origin references.
2. Inspect whether a rebase, merge, cherry-pick, or revert is already in progress.
3. Read `AUTOMATION.md` and `TASK_QUEUE.md` from the latest `origin/main`.
4. Inspect matching GitHub Pull Requests, task branches, checks, and Vercel deployment state.
5. Reconcile the queue with actual repository state. GitHub and deployment state override stale queue text.

Effective task status is determined in this order:

- `DONE`: a matching Pull Request is merged and required production verification passed, or the queue explicitly declares the task `DONE` based on verified evidence.
- `IN_REVIEW`: the task is not `DONE` and has a matching open Draft or normal Pull Request.
- `IN_PROGRESS`: the task is neither `DONE` nor `IN_REVIEW` and has genuinely recoverable branch work without an open Pull Request.
- `OPEN`: the queue declares the task `OPEN` and no matching merged Pull Request, open Pull Request, or recoverable task branch exists.

A stale branch belonging to a merged task is not recoverable work.

If an interrupted operation belongs to a merged task, abort only the stale operation, fast-forward `main`, and continue selection. If it belongs to an open Pull Request, verify and complete that Pull Request first and never create a duplicate.

---

## Task selection

1. Reconcile tasks in `TASK_QUEUE.md` order.
2. Resume the earliest genuinely recoverable `IN_PROGRESS` task if one exists.
3. Otherwise verify and complete the earliest `IN_REVIEW` task that blocks the queue.
4. Otherwise select the first effectively `OPEN` task.
5. Stop scanning after selecting one task.
6. Implement only that task.

If no recoverable, reviewable, or effectively open task exists, reply exactly:

`NO OPEN TASKS`

---

## Branch, architecture, and UI rules

For a new task, create one task-specific branch from the latest `origin/main`. For recoverable work, resume the existing branch.

Implementation must:

- follow the current architecture and existing design system
- inspect and reuse shared components before creating new ones
- remain limited to the selected task
- avoid unrelated refactoring and unnecessary dependencies
- preserve all calculators, routes, redirects, metadata, navigation, tests, sitemap, language switching, structured data, and SEO behavior
- preserve CalCome's finance-calculator focus, high information clarity, trustworthy but not cold product tone
- avoid generic purple gradients, excessive rounded cards, decorative glass effects, meaningless oversized copy, and cloned AI dashboard styling
- avoid evidence-free full redesigns

Before editing shared files, inspect their latest `origin/main` version. Shared registries, redirects, navigation, language selection, sitemap, metadata, structured-data utilities, schemas, tests, configuration, and package files must preserve every unrelated newer entry.

Resolve conflicts by preserving current `main` behavior and reapplying only the selected task. Never accept an entire stale shared-file version or delete newer entries. Use `--force-with-lease` only after rewritten history.

---

## Calculator and SEO integration invariants

When adding or changing a public calculator:

- preserve every existing public URL
- register the route exactly once through the canonical source
- use only `https://www.calcome.com` as the production origin
- preserve standards-compliant XML sitemap behavior
- never add localhost, preview, duplicate, internal, private, or non-canonical URLs
- preserve Korean and English routes and reciprocal language switching
- preserve canonical, hreflang, and x-default behavior
- preserve or add a one-hop locale-less redirect
- include the calculator in home or directory discovery
- assign exactly one valid primary directory category
- document useful aliases and colloquial search terms where relevant
- add contextual related-calculator links where appropriate
- include unique explanatory content and worked examples
- add official sources and verification dates when policy-sensitive
- verify structured data contains each published calculator exactly once

Never fabricate `lastmod`, `changefreq`, `priority`, search volume, legal rules, tax rates, or official policy values.

---

## Local validation gate

Before validation:

1. Confirm the branch contains the latest `origin/main`.
2. Inspect the complete diff against `origin/main`.
3. Confirm only the selected task is included.
4. Confirm no existing entry or behavior disappeared.
5. Confirm no Git operation remains unresolved.
6. Remove only repository-local generated build output when necessary.

Run the repository's configured validation, including at minimum:

- lint
- typecheck
- format verification
- all tests
- relevant route, redirect, sitemap, metadata, SEO, structured-data, accessibility, and integration tests
- production build
- `git diff --check`

`npm run check` and `npm run build` remain mandatory when defined by the repository.

For calculators, manually verify representative examples, boundary values, units, rounding, monthly versus annual conversion, tax treatment, and invalid inputs. Record expected and actual results.

A first validation failure is not terminal. Diagnose, fix, and rerun until successful or a genuine blocker is proven. Never weaken or delete a legitimate test merely to pass.

---

## Pull Request and automatic merge

After local validation succeeds:

1. Review the complete diff against latest `origin/main`.
2. Commit only the selected task.
3. Push one task branch.
4. Create exactly one non-Draft Pull Request against `main` unless a critical unresolved issue requires Draft status.
5. Include the exact task ID in title and body.
6. Include the exact standalone line `AUTO_MERGE: true` only when fully eligible.
7. Record implementation, integration, manual calculation verification, and all validation results.
8. Verify the exact head SHA, base branch, body marker, checks, mergeability, and Vercel Preview state.

Automatic squash merge is allowed only when all are true:

- base is `main`
- head belongs to this repository
- Pull Request is not Draft
- body contains exact `AUTO_MERGE: true`
- latest main is included without conflict
- GitHub Actions succeeded for the exact final head SHA
- Vercel Preview is `READY` for the exact final head SHA
- lint, typecheck, format, all tests, production build, and `git diff --check` passed
- calculation accuracy and required integration were verified
- no unresolved review, security, regression, route, or UX blocker remains

A Preview blocked only by the execution environment's network or protection policy must not cause infinite waiting when Preview itself is `READY` and all code validation passed. Record the limitation precisely. Do not use this exception for application errors or failed deployment state.

---

## Post-merge production deployment gate

After merge:

1. Verify the final merge SHA and latest `main` checks.
2. Verify Vercel production deployment reaches `READY`.
3. Verify the Production Smoke workflow when available.
4. Test all of the following public paths:
   - `https://www.calcome.com`
   - `https://www.calcome.com/ko`
   - every selected-task target route
5. Prefer cross-checking with both an HTTP client such as `curl` and an actual browser.

An initial DNS lookup failure, `ERR_NAME_NOT_RESOLVED`, `ERR_CONNECTION_RESET`, timeout, or transient execution-network failure is not automatically a product outage.

Within the same execution:

- retry public access up to three times
- wait approximately 5 to 15 seconds between retries
- test the root, `/ko`, and target route independently
- continue when any valid production path confirms the public site is reachable
- record the failing tool, error code, retry results, and any successful alternative path

When browser, HTTP, Vercel, GitHub Actions, and known user access evidence conflict, classify the result first as a possible inspection-environment limitation rather than declaring a site outage. Continue with every available production-verification method.

---

## Mandatory production UX verification

Use `agent-browser`, Playwright, Chromium, or an equivalent real browser after production is `READY`.

Verify desktop and mobile widths, starting from the homepage or calculator directory and navigating to the target route. Test as applicable:

- normal input and calculation
- representative manual result comparison
- invalid input and understandable error messages
- reset
- Korean and English switching
- refresh and back navigation
- locale-less redirect
- URL or state restoration when designed
- long numbers, tables, charts, and small-screen overflow
- mobile keyboard behavior
- keyboard-only navigation and visible focus
- accessible labels and result announcements
- touch target size
- light and dark mode
- directory search, aliases, categories, and target discovery

When possible, save desktop and mobile screenshots and record URL, viewport, inputs, expected result, and actual result in the Pull Request or follow-up report.

Production access that remains unavailable after all retries does not become a false product failure. Record code validation and deployment success, keep the task incomplete, and prioritize production UX verification in the next execution.

---

## Production defects and queue transition

If production verification finds a critical error, blocked flow, incorrect calculation, mobile unusability, accessibility blocker, broken language switching, route failure, or layout collapse:

- do not mark the task `DONE`
- fix it in the same execution when safe
- create or update a correction branch and Draft Pull Request when more work is needed
- roll back only when clearly safer and authorized

For minor visual or wording defects, record reproduction steps, user impact, and acceptance criteria as a follow-up UX task.

Only after production deployment and production UX verification succeed may the completed task become `DONE`, the immediately following task become the single `OPEN` task, and all later tasks remain `BLOCKED`.

Do not edit queue status merely to claim progress. Every transition must be supported by verified GitHub, deployment, and production evidence.

---

## Final reporting

Report in Korean and include only verified facts:

- selected task and effective starting status
- branch and Pull Request
- code and integration changes
- validation and manual calculation results
- exact GitHub Actions and Vercel states
- production retry and UX verification evidence
- whether the task is complete, incomplete, blocked, or requires correction

Never describe pending work as completed and never start a second task in the same execution.
