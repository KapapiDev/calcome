# CalCome TASK_STATE

This file is the compact mutable execution ledger for autonomous development.

`AUTOMATION.md` defines operating policy. `TASK_QUEUE.md` remains the detailed task catalog and historical scope archive. Actual GitHub state overrides stale text here, but every merged implementation PR must update this file so `main` stays self-reconciling.

## Reconciliation baseline

- Reconciled date: 2026-08-26
- Reconciled `main`: `09032afea81dcde1f64742b3802f3b0402a120cc`
- Current public-calculator count derived from the 51-calculator original baseline plus 15 completed expansion tasks: **66**
- Target: **100**
- Completed expansion tasks: **15 / 49**
- Remaining expansion tasks: **34**
- Exactly one task is OPEN below.

## Current execution state

| Task        | Status  | Priority | Evidence / next action                                                                       |
| ----------- | ------- | -------- | -------------------------------------------------------------------------------------------- |
| OPS-001     | DONE    | CRITICAL | PR #268 merged; release-drift evidence recorded.                                             |
| OPS-002     | DONE    | CRITICAL | PR #283 merged; autonomous-development reliability rules and mutable state ledger installed. |
| UX-009      | DONE    | CRITICAL | PR #269 merged.                                                                              |
| SEO-FIX-002 | DONE    | CRITICAL | PR #270 merged.                                                                              |
| UX-010      | DONE    | HIGH     | PR #271 merged.                                                                              |
| UX-007      | DONE    | HIGH     | PR #272 merged.                                                                              |
| P-045       | DONE    | HIGH     | PR #266 merged.                                                                              |
| P-046       | DONE    | HIGH     | PR #273 merged.                                                                              |
| P-047       | DONE    | HIGH     | PR #274 merged.                                                                              |
| P-048       | DONE    | HIGH     | PR #275 merged.                                                                              |
| P-049       | DONE    | HIGH     | PR #276 merged.                                                                              |
| P-050       | DONE    | HIGH     | PR #277 merged.                                                                              |
| P-051       | DONE    | HIGH     | PR #278 merged.                                                                              |
| P-052       | DONE    | HIGH     | PR #279 merged.                                                                              |
| P-053       | DONE    | HIGH     | PR #280 merged.                                                                              |
| P-054       | DONE    | HIGH     | PR #281 merged.                                                                              |
| P-055       | DONE    | HIGH     | PR #282 merged.                                                                              |
| P-062       | DONE    | HIGH     | Previously merged on main.                                                                   |
| P-063       | DONE    | HIGH     | Previously merged on main.                                                                   |
| P-076       | DONE    | HIGH     | Previously merged on main.                                                                   |
| P-089       | DONE    | HIGH     | Previously merged on main.                                                                   |
| SEC-001     | OPEN    | CRITICAL | Classify the dependency vulnerabilities reported by CI before continuing ordinary expansion. |
| P-056       | BLOCKED | HIGH     | Next calculator after SEC-001 is resolved.                                                   |

All later uncompleted catalog tasks remain ordered by `TASK_QUEUE.md` and are effectively BLOCKED until they become the single OPEN task here.

## SEC-001 — Dependency Vulnerability Triage

Trigger evidence:

- P-055 CI run #980 reported `11 vulnerabilities (2 moderate, 9 high)` during `npm ci`.
- The count alone does not prove a production exploit, but security priority requires classification before ordinary feature expansion continues.

Scope:

1. Run the full package audit and a production-only audit such as `npm audit --omit=dev` when supported.
2. Record every high/critical advisory, dependency path, installed version, fixed version, and whether the dependency is production/runtime or dev/build-only.
3. Determine whether any high/critical advisory is reachable or materially relevant to the deployed Next.js application.
4. Apply the smallest safe compatible dependency updates for confirmed production-impact issues.
5. Do not use `npm audit fix --force` or speculative breaking major upgrades merely to reduce the count.
6. If remaining advisories are dev-only, unreachable, already mitigated, or have no safe upstream fix, document that classification as a durable baseline so identical advisories do not reopen a blocker every run.
7. Run repository formatter, lint, typecheck, all tests, production build, `git diff --check`, and current-head GitHub Actions after any dependency change.
8. Inspect Vercel through the normal connector/bot fallback path, but do not make resource-level 403/404 a security or merge failure by itself.

Acceptance:

- Production dependency risk is explicitly separated from dev/build-only audit noise.
- No known safely-fixable high/critical production-impact dependency issue remains unresolved.
- Any residual high/critical advisory has a documented package path, impact classification, and reason it is not silently fixed.
- No forced breaking dependency upgrade is introduced without necessity and full validation.
- Current-head CI is green for any changed head.
- This file transitions `SEC-001` to DONE and `P-056` to the single OPEN task in the same PR that completes SEC-001.

## Vercel connector state

Current operating interpretation:

- General Vercel connector access is available when team discovery succeeds.
- CalCome team: `team_cuJFcIPj1zvkSmGeDk3hckZd` on Hobby.
- GitHub Vercel-bot evidence identifies project `prj_nNXkUJGK9l7vG83KDZE2XOVHHd80` and has continued to report working Preview deployments.
- Direct project/deployment lookup may return empty results, `403`, or `404` from the connected Vercel resource path. Treat that as resource-level visibility/permission limitation, not as proof that the connector, project, or deployment does not exist.
- This limitation does not block repository development when current-head CI and application validation pass and no Vercel application-code failure is evidenced.

## Expansion continuation

After SEC-001 is DONE, resume the expansion program at P-056 and continue in `TASK_QUEUE.md` order, skipping tasks already marked DONE here.

Each calculator PR must update this file in the same PR:

- mark its own task DONE
- increment the public-calculator count by one only when a genuinely new public calculator is added
- decrement the remaining expansion count accordingly
- make exactly one next eligible task OPEN

After every four additional calculator merges, insert the repository-defined Search Console, locale, directory, production, and indexability regression gate before the next calculator batch.
