# CalCome TASK_STATE

This file is the compact mutable execution ledger for autonomous development.

`AUTOMATION.md` defines operating policy. `TASK_QUEUE.md` remains the detailed task catalog and historical scope archive. Actual GitHub state overrides stale text here, but every merged implementation PR must update this file so `main` stays self-reconciling.

## Reconciliation baseline

- Reconciled date: 2026-08-28
- Reconciled base `main`: post-P-082
- Current public-calculator count derived from the 51-calculator original baseline plus 39 completed expansion tasks: **90**
- Target: **100**
- Completed expansion tasks: **39 / 49**
- Remaining expansion tasks: **10**
- Exactly one task is OPEN below.

## Current execution state

- OPS-001 — DONE — CRITICAL — release-drift reconciliation merged.
- OPS-002 — DONE — CRITICAL — autonomous-development reliability rules and mutable state ledger installed.
- UX-007, UX-009, UX-010, SEO-FIX-002 — DONE — shared accessibility, locale, discovery, and indexability repair gates merged.
- SEC-001 — DONE — CRITICAL — patched dependency set and permanent production high-severity audit gate merged.
- P-045 through P-061 — DONE except no gaps in this range.
- REG-EXP-001 — DONE — expansion regression gate after the first post-repair batch.
- P-062, P-063, P-064, P-065, P-066, P-067, P-068, P-069 — DONE.
- REG-EXP-002 — DONE — expansion regression gate after P-064 through P-069 batch progression.
- P-070, P-071, P-072, P-073 — DONE.
- REG-EXP-003 — DONE — expansion regression gate after P-070 through P-073.
- P-074, P-075, P-076, P-077, P-078 — DONE.
- REG-EXP-004 — DONE — expansion regression gate after P-074, P-075, P-077, and P-078.
- P-079 — DONE — Retirement Withdrawal Calculator merged.
- P-080 — DONE — Pension Future Monthly Income Calculator merged.
- P-081 — DONE — MEDIUM — Dividend Reinvestment Calculator merged.
- P-082 — DONE — MEDIUM — Portfolio Rebalancing Calculator added with bilingual routes, shared-currency semantics, directory/search integration, target-allocation buy/sell guidance, turnover reporting, and regression tests.
- REG-EXP-005 — OPEN — HIGH — expansion regression gate after P-079 through P-082; verify repository integration, locale, directory, indexability, Preview/Production propagation, and Search Console evidence when available before continuing expansion.
- P-089 — DONE — previously merged on main.

All later uncompleted catalog tasks remain ordered by `TASK_QUEUE.md` and are effectively BLOCKED until they become the single OPEN task here.

## Vercel connector state

- General Vercel connector access is available when team discovery succeeds.
- CalCome team: `team_cuJFcIPj1zvkSmGeDk3hckZd` on Hobby.
- GitHub Vercel-bot evidence identifies project `prj_nNXkUJGK9l7vG83KDZE2XOVHHd80` and continues to be the deployment-state fallback when direct resource lookup is permission-limited.
- Direct project/deployment lookup may return empty results, `403`, or `404`; classify these as resource-level visibility limitations unless application-failure evidence exists.
- Production observation may lag repository `main`; release drift alone does not block repository development when current-head CI and application validation pass.

## Expansion continuation

P-082 completes the four-calculator batch after REG-EXP-004. REG-EXP-005 is the single next OPEN task. After that regression gate, continue with P-083 and the remaining expansion program in `TASK_QUEUE.md` order, skipping tasks already DONE here.

Each calculator PR must update this file in the same PR:

- mark its own task DONE
- increment the public-calculator count by one only for a genuinely new public calculator
- decrement the remaining expansion count accordingly
- make exactly one next eligible task OPEN

After every four additional calculator merges, insert the repository-defined Search Console, locale, directory, production, and indexability regression gate before the next calculator batch.
