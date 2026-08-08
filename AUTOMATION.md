# AUTOMATION

## Purpose

This document defines the permanent rules for autonomous development in CalCome.

The automation must complete exactly one eligible `TASK_QUEUE.md` task per scheduled execution, validate it, create or update one Pull Request, merge it automatically when code and repository gates pass, and continue future work even when Preview or production inspection is blocked only by external environment limits.

No user approval is required for an eligible automation Pull Request that satisfies these rules.

---

## Non-negotiable rules

1. Never commit directly to `main`.
2. Handle exactly one task per scheduled execution.
3. Never create duplicate task branches or Pull Requests.
4. Start new work from the latest `origin/main`.
5. Preserve unrelated behavior already present on `main`.
6. Run lint, typecheck, format verification, all tests, production build, and `git diff --check`.
7. Never bypass, weaken, remove, or falsify validation.
8. Never merge a failed implementation, unverified calculation, security regression, broken route, or unusable UX.
9. Security, calculation correctness, critical failures, and blocked user flows override feature, SEO, and advertising priority.
10. Never publish policy-sensitive values without official sources and a visible verification date.
11. Preview or production inspection limits alone must not freeze the development queue indefinitely.

---

## Startup and effective state

At every scheduled execution:

1. Fetch all origin references.
2. Read the latest `AUTOMATION.md` and `TASK_QUEUE.md` from `origin/main`.
3. Inspect matching Pull Requests, branches, and merge state through GitHub. External CI and deployment state are advisory only.
4. Reconcile queue text with actual repository state.
5. Resume the earliest existing task before starting a new one.

Effective status order:

- `IN_REVIEW`: matching open Pull Request exists.
- `IN_PROGRESS`: recoverable task branch exists without an open Pull Request.
- `POST_MERGE_VERIFY`: task Pull Request is merged, code gates passed, but production UX has not yet been observed because deployment propagation or inspection-environment limits prevented it.
- `DONE`: implementation is merged and either production UX passed or production observation remains unavailable only because of a documented external inspection limitation after required retries, with no evidence of a product failure.
- `OPEN`: queue marks the task open and no earlier effective state applies.

GitHub, Vercel, and actual branch state override stale queue text.

A merged task awaiting only external production observation must not be treated as a recoverable coding task and must not cause duplicate branches or Pull Requests.

---

## Task selection and continuity

Use this order:

1. Repair or finish the earliest `IN_REVIEW` task.
2. Resume the earliest recoverable `IN_PROGRESS` task.
3. Select the first effectively `OPEN` task. Do not wait for external verification.

A `POST_MERGE_VERIFY` check is optional historical context only and must never be attempted before implementation work or block queue progress.

After the required retries:

- If production is reachable, complete the UX check and record the result.
- If a real product defect is found, fix or roll back before new feature work.
- If production cannot be inspected only because of DNS, timeout, administrator blocking, Vercel protection, execution-network policy, or similar external limitations, record the evidence and continue to the first effectively `OPEN` task in the same execution.

The one-task rule applies to implementation work. A lightweight pending production inspection does not count as a second implementation task.

---

## Branch, architecture, and UI rules

For a new task, create one task-specific branch from latest `origin/main`. For recoverable work, resume the existing branch.

Implementation must:

- follow the current architecture and design system
- inspect and reuse shared components first
- stay limited to the selected task
- avoid unrelated refactoring and unnecessary dependencies
- preserve calculators, routes, redirects, metadata, navigation, tests, sitemap, language switching, structured data, and SEO behavior
- preserve CalCome's finance-calculator focus, high information clarity, and trustworthy but not cold product tone
- avoid generic purple gradients, excessive rounded cards, decorative glass effects, meaningless oversized copy, and cloned AI dashboard styling
- avoid evidence-free redesigns

Before editing shared files, inspect their latest `origin/main` version and preserve every unrelated newer entry.

Task scope must be meaningful and root-cause complete:

- Do not split one proven shared regression into one-file Pull Requests merely to satisfy the one-task rule.
- When the same defect and safe fix repeat across multiple components, treat the complete affected set as one implementation task and fix it in one bounded Pull Request.
- Search the repository for the full pattern before editing, update all confirmed affected files together, and add a small representative regression test rather than duplicating tests for every file.
- Keep unrelated behavior out, but prefer a complete shared-pattern correction over serial micro-fixes that waste scheduled executions.
- A one-file task is acceptable only when the defect is genuinely isolated or the broader pattern cannot be safely proven.

---

## Calculator and SEO integration invariants

When adding or changing a public calculator:

- preserve every existing public URL
- register the route exactly once through the canonical source
- use only `https://www.calcome.com` as the production origin
- preserve standards-compliant XML sitemap behavior
- preserve Korean and English routes and reciprocal language switching
- preserve canonical, hreflang, and x-default behavior
- preserve or add a one-hop locale-less redirect
- include the calculator in home or directory discovery
- assign exactly one valid primary directory category
- document useful aliases where relevant
- add contextual related-calculator links where appropriate
- include unique explanatory content and worked examples
- add official sources and verification dates when policy-sensitive
- verify structured data contains each calculator exactly once

Never fabricate search volume, legal rules, tax rates, policy values, `lastmod`, `changefreq`, or `priority`.

---

## Validation gate

Use layered verification without depending on one provider:

1. Run repository-defined local formatter, lint, typecheck, tests, build, and diff checks.
2. Apply relevant verification, Next.js, React, UI/UX, accessibility, security, and Korean-language skills after reading their instructions.
3. Use agent-browser, computer-use, or another available browser tool when reachable.
4. Use GitHub repository and merge-state evidence as the external source of record.
5. If any tool is missing, blocked, protected, or unavailable, record its function, input, error, and the next successful fallback; never wait or repeat the same failure.

Browser unavailability may be covered by focused component tests, accessibility attributes, responsive and overflow assertions, route and metadata integration tests, redirect tests, and a production build. Vercel-specific access is never required.

Before validation:

1. Confirm latest `origin/main` is included without conflict.
2. Inspect the complete diff against `origin/main`.
3. Confirm only the selected task is included.
4. Confirm no existing entry or behavior disappeared.
5. Confirm no Git operation remains unresolved.

Run at minimum:

- lint
- typecheck
- format verification
- all tests
- relevant route, redirect, sitemap, metadata, SEO, structured-data, accessibility, and integration tests
- production build
- `git diff --check`

`npm run check` and `npm run build` remain mandatory when defined.

For calculators, manually verify representative examples, boundary values, units, rounding, monthly versus annual conversion, tax treatment, and invalid inputs. Record expected and actual results.

A first failure is not terminal. Diagnose, fix, and rerun. Never weaken a legitimate test merely to pass.

---

## Pull Request and automatic merge

After validation succeeds:

1. Review the final diff against latest `origin/main`.
2. Commit only the selected task.
3. Push one task branch.
4. Create or update exactly one non-Draft Pull Request against `main` unless a real unresolved defect requires Draft status.
5. Include the exact task ID in title and body.
6. Include the standalone line `AUTO_MERGE: true` only when eligible.
7. Record implementation, integration, calculation verification, and validation results.
8. Verify head SHA, base, and mergeability through GitHub. Do not wait for GitHub Actions or deployment state.

Automatic squash merge is allowed when:

- base is `main`
- head belongs to this repository
- Pull Request is not Draft
- body contains `AUTO_MERGE: true`
- latest main is included without conflict
- GitHub Actions state is advisory and is never awaited or required for merge
- lint, typecheck, format, all tests, production build, and `git diff --check` passed
- calculation accuracy and required integration were verified
- no security, regression, route, calculation, or known UX blocker remains

### Preview continuity rule

Preview browser access is optional and is never a merge gate. Check it at most once without waiting or retrying.

Merge may continue when all code and GitHub gates pass and Preview cannot be observed only because of:

- Vercel free-plan deployment quota or rate limit
- administrator or protection-policy blocking
- Preview authentication or access protection unavailable to the execution environment
- DNS, timeout, connection reset, or execution-network restriction
- browser tooling failure unrelated to the application

Record the exact Preview state, tool, failure code, retry result, and why it is classified as an external limitation.

Do not use this exception when:

- Preview build failed because of application code
- GitHub Actions failed
- production build failed
- tests failed
- routes or public entry points are missing
- calculation accuracy is unverified
- a known critical UX or security defect exists

A Vercel Preview marked `READY` strengthens the merge decision, but absence of a viewable Preview must not stall otherwise validated work indefinitely.

---

## Post-merge production verification

After merge:

1. Verify final merge SHA and latest `main` checks.
2. Check Vercel production deployment state when available.
3. Check Production Smoke when available.
4. Test independently:
   - `https://www.calcome.com`
   - `https://www.calcome.com/ko`
   - selected-task target routes
5. Prefer both HTTP and browser checks.

For DNS failure, `ERR_NAME_NOT_RESOLVED`, `ERR_CONNECTION_RESET`, timeout, deployment propagation, or execution-network failure, record the first result and continue immediately without waiting or retrying.

Do not declare a product outage from inspection-environment failure alone.

### Production continuity rule

When production cannot be inspected and there is no concrete product-failure evidence:

- record `POST_MERGE_VERIFY` evidence
- do not create duplicate repair work
- do not hold the entire queue indefinitely
- do not create or retain pending production-verification work
- continue with the next effectively `OPEN` task immediately

A real production failure, incorrect calculation, broken route, blocked flow, mobile unusability, accessibility blocker, language-switching failure, or layout collapse remains a hard blocker and must be fixed before new feature work.

---

## Browser UX verification

When Preview or production is reachable, use an actual browser at desktop and mobile widths and test as applicable:

- navigation from homepage or calculator directory
- normal input and calculation
- manual result comparison
- invalid input and error messages
- reset
- Korean and English switching
- refresh and back navigation
- locale-less redirect
- URL or state restoration when designed
- long numbers, tables, charts, and small-screen overflow
- mobile keyboard behavior
- keyboard navigation and focus visibility
- accessible labels and result announcements
- touch target size
- light and dark mode
- directory search, aliases, categories, and target discovery

Save screenshots and evidence when possible.

Minor visual defects become follow-up UX tasks. Critical defects block progress.

---

## Queue transition

After a merged task:

- After merge, mark the task `DONE` and open the next task unless a concrete verified product defect remains.
- Keep exactly one implementation task `OPEN`.
- Never claim an unperformed browser check succeeded.
- Never let the same external Preview or production inspection limitation freeze all future development runs.

---

## Final reporting

Report in Korean and separate:

- verified implementation facts
- exact GitHub Actions and Vercel states
- Preview and production attempts
- external inspection limitations
- known product defects
- whether merge occurred
- whether queue work continues
- pending production regression evidence

Never describe pending inspection as completed, but do not confuse an inspection-environment limitation with a product failure.
