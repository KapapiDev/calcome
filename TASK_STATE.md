# CalCome TASK_STATE

This file is the compact mutable execution ledger for autonomous development.

`AUTOMATION.md` defines operating policy. `TASK_QUEUE.md` remains the detailed task catalog and historical scope archive. Actual GitHub state overrides stale text here, but every merged implementation PR must update this file so `main` stays self-reconciling.

## Reconciliation baseline

- Reconciled date: 2026-08-27
- Reconciled base `main`: `4c22db4c`
- Current public-calculator count derived from the 51-calculator original baseline plus 31 completed expansion tasks: **82**
- Target: **100**
- Completed expansion tasks: **31 / 49**
- Remaining expansion tasks: **18**
- Exactly one task is OPEN below.

## Current execution state

- OPS-001 — DONE — CRITICAL — PR #268 merged; release-drift evidence recorded.
- OPS-002 — DONE — CRITICAL — PR #283 merged; autonomous-development reliability rules and mutable state ledger installed.
- UX-009 — DONE — CRITICAL — PR #269 merged.
- SEO-FIX-002 — DONE — CRITICAL — PR #270 merged.
- UX-010 — DONE — HIGH — PR #271 merged.
- UX-007 — DONE — HIGH — PR #272 merged.
- P-045 — DONE — HIGH — PR #266 merged.
- P-046 — DONE — HIGH — PR #273 merged.
- P-047 — DONE — HIGH — PR #274 merged.
- P-048 — DONE — HIGH — PR #275 merged.
- P-049 — DONE — HIGH — PR #276 merged.
- P-050 — DONE — HIGH — PR #277 merged.
- P-051 — DONE — HIGH — PR #278 merged.
- P-052 — DONE — HIGH — PR #279 merged.
- P-053 — DONE — HIGH — PR #280 merged.
- P-054 — DONE — HIGH — PR #281 merged.
- P-055 — DONE — HIGH — PR #282 merged.
- P-056 — DONE — HIGH — Weekly and Monthly Work-Hours Converter added with bilingual routes, directory/search integration, and conversion regression coverage.
- P-057 — DONE — HIGH — Calculator added with bilingual routes, shared-currency semantics, directory/search integration, and tests.
- P-058 — DONE — HIGH — Salary Negotiation Target Calculator added with bilingual routes, shared-currency semantics, directory/search integration, and regression tests.
- P-059 — DONE — HIGH — Employer Total Labor Cost Calculator added with 2026 official-source rates, bilingual routes, directory/search integration, and regression tests.
- P-060 — DONE — HIGH — Parental Leave Benefit Calculator added with 2026 statutory rates, bilingual routes, official sources, and tests.
- P-061 — DONE — HIGH — Maternity Leave Benefit Calculator added with current official 90/120-day rules, employer-type split, current cap, bilingual routes, sources, and tests.
- REG-EXP-001 — DONE — HIGH — Expansion regression gate completed 2026-08-27; current-head CI passed, Vercel Preview was Ready, connector resource limitations were classified, and no verified product blocker was found. See `docs/REG_EXP_001_2026-08-27.md`.
- P-062 — DONE — HIGH — Previously merged on main.
- P-063 — DONE — HIGH — Previously merged on main.
- P-064 — DONE — HIGH — Jeonse Loan Limit Calculator added from the current HF general jeonse guarantee limit rules, with bilingual routes, official-source disclosure, directory/search integration, and regression tests.
- P-065 — DONE — HIGH — Rent Affordability Calculator added with ratio and cash-flow budget constraints, shared-currency semantics, bilingual routes, directory/search integration, and regression tests.
- P-066 — DONE — HIGH — Jeonse Deposit vs Monthly Rent Cost Calculator added with financing/opportunity-cost comparison, shared-currency semantics, bilingual routes, directory/search integration, and regression tests.
- P-067 — DONE — HIGH — Home Purchase Total Cost Calculator added with user-entered transaction costs, shared-currency semantics, bilingual routes, directory/search integration, and regression tests.
- P-068 — DONE — HIGH — Home Sale Net Proceeds Calculator added with mortgage payoff and seller-cost settlement, shared-currency semantics, bilingual routes, directory/search integration, and regression tests.
- P-069 — DONE — HIGH — Rental Yield Calculator added with gross/net yield, vacancy, NOI, shared-currency semantics, bilingual routes, directory/search integration, and regression tests.
- REG-EXP-002 — DONE — HIGH — Expansion regression gate completed 2026-08-27; repository CI and latest Preview are healthy, while fresh public observation records Production inventory lag behind current main. See `docs/REG_EXP_002_2026-08-27.md`.
- P-070 — DONE — MEDIUM — Apartment Management Fee Budget Calculator added with recurring and annual fee budgeting, shared-currency semantics, bilingual routes, directory/search integration, and regression tests.
- P-071 — DONE — HIGH — Percentage Calculator added with percent-of-value, part-of-whole, and percentage-change modes, bilingual routes, directory/search integration, and regression tests.
- P-072 — DONE — HIGH — Discount Rate and Sale Price Calculator added with unit sale price, per-item savings, quantity totals, shared-currency semantics, bilingual routes, directory/search integration, and regression tests.
- P-073 — DONE — HIGH — Age Calculator added with completed-age, elapsed-day/week, next-birthday calculation, bilingual routes, directory/search integration, and leap-day regression coverage.
- REG-EXP-003 — DONE — HIGH — Expansion regression gate completed 2026-08-27 after P-070 through P-073; exact-head CI and latest Preview are healthy, Production has advanced to 78 calculators but remains four behind repository main, and no verified product blocker was found. See `docs/REG_EXP_003_2026-08-27.md`.
- P-074 — OPEN — HIGH — D-Day Calculator.
- P-076 — DONE — HIGH — Previously merged on main.
- P-089 — DONE — HIGH — Previously merged on main.
- SEC-001 — DONE — CRITICAL — PR #284 upgrades Next.js 16.2.10 to patched 16.3.3, applies compatible non-forced transitive fixes, and adds a permanent production high-severity audit gate.

All later uncompleted catalog tasks remain ordered by `TASK_QUEUE.md` and are effectively BLOCKED until they become the single OPEN task here.

## Vercel connector state

Current operating interpretation:

- General Vercel connector access is available when team discovery succeeds.
- CalCome team: `team_cuJFcIPj1zvkSmGeDk3hckZd` on Hobby.
- GitHub Vercel-bot evidence identifies project `prj_nNXkUJGK9l7vG83KDZE2XOVHHd80` and has continued to report Preview deployments.
- Direct project/deployment lookup may return empty results, `403`, or `404` from the connected Vercel resource path. Treat that as resource-level visibility/permission limitation, not as proof that the connector, project, or deployment does not exist.
- Fresh public observation during REG-EXP-003 found Production serving 78 calculators while repository `main` contains 82; this is improved propagation from the prior 72/78 gate but remains release-drift evidence until Production catches up or a concrete deployment defect is identified.
- This limitation does not block repository development when current-head CI and application validation pass and no Vercel application-code failure is evidenced.

## Expansion continuation

REG-EXP-003 is complete. P-074 is the single next OPEN task. Continue the expansion program in `TASK_QUEUE.md` order, skipping tasks already marked DONE here.

Each calculator PR must update this file in the same PR:

- mark its own task DONE
- increment the public-calculator count by one only when a genuinely new public calculator is added
- decrement the remaining expansion count accordingly
- make exactly one next eligible task OPEN

After every four additional calculator merges, insert the repository-defined Search Console, locale, directory, production, and indexability regression gate before the next calculator batch.
