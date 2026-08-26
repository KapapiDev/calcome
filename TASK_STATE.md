# CalCome TASK_STATE

This file is the compact mutable execution ledger for autonomous development.

`AUTOMATION.md` defines operating policy. `TASK_QUEUE.md` remains the detailed task catalog and historical scope archive. Actual GitHub state overrides stale text here, but every merged implementation PR must update this file so `main` stays self-reconciling.

## Reconciliation baseline

- Reconciled date: 2026-08-26
- Reconciled base `main`: `6bcc971fca4729f61dd7081820cbb717bd2cc480`
- Current public-calculator count derived from the 51-calculator original baseline plus 20 completed expansion tasks: **71**
- Target: **100**
- Completed expansion tasks: **20 / 49**
- Remaining expansion tasks: **29**
- Exactly one task is OPEN below.

## Current execution state

| Task        | Status | Priority | Evidence / next action                                                                                                                                        |
| ----------- | ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| OPS-001     | DONE   | CRITICAL | PR #268 merged; release-drift evidence recorded.                                                                                                              |
| OPS-002     | DONE   | CRITICAL | PR #283 merged; autonomous-development reliability rules and mutable state ledger installed.                                                                  |
| UX-009      | DONE   | CRITICAL | PR #269 merged.                                                                                                                                               |
| SEO-FIX-002 | DONE   | CRITICAL | PR #270 merged.                                                                                                                                               |
| UX-010      | DONE   | HIGH     | PR #271 merged.                                                                                                                                               |
| UX-007      | DONE   | HIGH     | PR #272 merged.                                                                                                                                               |
| P-045       | DONE   | HIGH     | PR #266 merged.                                                                                                                                               |
| P-046       | DONE   | HIGH     | PR #273 merged.                                                                                                                                               |
| P-047       | DONE   | HIGH     | PR #274 merged.                                                                                                                                               |
| P-048       | DONE   | HIGH     | PR #275 merged.                                                                                                                                               |
| P-049       | DONE   | HIGH     | PR #276 merged.                                                                                                                                               |
| P-050       | DONE   | HIGH     | PR #277 merged.                                                                                                                                               |
| P-051       | DONE   | HIGH     | PR #278 merged.                                                                                                                                               |
| P-052       | DONE   | HIGH     | PR #279 merged.                                                                                                                                               |
| P-053       | DONE   | HIGH     | PR #280 merged.                                                                                                                                               |
| P-054       | DONE   | HIGH     | PR #281 merged.                                                                                                                                               |
| P-055       | DONE   | HIGH     | PR #282 merged.                                                                                                                                               |
| P-056       | DONE   | HIGH     | Weekly and Monthly Work-Hours Converter added with bilingual routes, directory/search integration, and conversion regression coverage.                        |
| P-057       | DONE   | HIGH     | Calculator added with bilingual routes, shared-currency semantics, directory/search integration, and tests.                                                   |
| P-058       | DONE   | HIGH     | Salary Negotiation Target Calculator added with bilingual routes, shared-currency semantics, directory/search integration, and regression tests.              |
| P-059       | DONE   | HIGH     | Employer Total Labor Cost Calculator added with 2026 official-source rates, bilingual routes, directory/search integration, and regression tests.             |
| P-060       | DONE   | HIGH     | Parental Leave Benefit Calculator added with 2026 statutory rates, bilingual routes, official sources, and tests.                                             |
| P-061       | OPEN   | HIGH     | Next calculator: Maternity Leave Benefit Calculator.                                                                                                          |
| P-062       | DONE   | HIGH     | Previously merged on main.                                                                                                                                    |
| P-063       | DONE   | HIGH     | Previously merged on main.                                                                                                                                    |
| P-076       | DONE   | HIGH     | Previously merged on main.                                                                                                                                    |
| P-089       | DONE   | HIGH     | Previously merged on main.                                                                                                                                    |
| SEC-001     | DONE   | CRITICAL | PR #284 upgrades Next.js 16.2.10 to patched 16.3.3, applies compatible non-forced transitive fixes, and adds a permanent production high-severity audit gate. |

All later uncompleted catalog tasks remain ordered by `TASK_QUEUE.md` and are effectively BLOCKED until they become the single OPEN task here.

## SEC-001 — Dependency Vulnerability Triage

Resolution recorded 2026-08-26:

- Initial CI production audit reproduced **11 vulnerabilities: 2 moderate, 9 high** in the production dependency tree, so the signal was not dismissed as dev-only noise.
- Direct runtime dependency `next` 16.2.10 was affected by high-severity advisories. npm identified 16.3.3 as the compatible non-major patched release, so Next.js was upgraded to 16.3.3 without `--force`.
- After the Next.js patch, the audit dropped to 8 vulnerabilities. The remaining production advisories were transitive `brace-expansion`, `fast-uri`, `ip-address`, `js-yaml`, `nanoid`, `undici`, plus moderate `hono` / `@hono/node-server` findings; npm reported compatible fixes for all of them.
- `npm audit fix --package-lock-only` was used without `--force` to update only the lockfile-resolved transitive versions. The resulting production audit passed the high-severity gate.
- The permanent CI keeps `npm audit --json` as diagnostic output and blocks on `npm audit --omit=dev --audit-level=high` before lint, typecheck, format, tests, and build.
- No forced breaking dependency upgrade was used. No known safely-fixable high/critical production dependency blocker remains from this baseline.

## Vercel connector state

Current operating interpretation:

- General Vercel connector access is available when team discovery succeeds.
- CalCome team: `team_cuJFcIPj1zvkSmGeDk3hckZd` on Hobby.
- GitHub Vercel-bot evidence identifies project `prj_nNXkUJGK9l7vG83KDZE2XOVHHd80` and has continued to report Preview deployments.
- Direct project/deployment lookup may return empty results, `403`, or `404` from the connected Vercel resource path. Treat that as resource-level visibility/permission limitation, not as proof that the connector, project, or deployment does not exist.
- This limitation does not block repository development when current-head CI and application validation pass and no Vercel application-code failure is evidenced.

## Expansion continuation

P-061 is the single current OPEN task. Continue the expansion program in `TASK_QUEUE.md` order, skipping tasks already marked DONE here.

Each calculator PR must update this file in the same PR:

- mark its own task DONE
- increment the public-calculator count by one only when a genuinely new public calculator is added
- decrement the remaining expansion count accordingly
- make exactly one next eligible task OPEN

After every four additional calculator merges, insert the repository-defined Search Console, locale, directory, production, and indexability regression gate before the next calculator batch.
