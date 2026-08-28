# CalCome TASK_STATE

This file is the compact mutable execution ledger for autonomous development.

`AUTOMATION.md` defines operating policy. `TASK_QUEUE.md` remains the detailed task catalog and historical scope archive. Actual GitHub state overrides stale text here, but every merged implementation PR must update this file so `main` stays self-reconciling.

## Reconciliation baseline

- Reconciled date: 2026-08-28
- Reconciled base `main`: post-P-087
- Current public-calculator count derived from the 51-calculator original baseline plus 44 completed expansion tasks: **95**
- Target: **100**
- Completed expansion tasks: **44 / 49**
- Remaining expansion tasks: **5**
- Exactly one task is OPEN below.

## Current execution state

- OPS-001 — DONE — CRITICAL — release-drift reconciliation merged.
- OPS-002 — DONE — CRITICAL — autonomous-development reliability rules and mutable state ledger installed.
- UX-007, UX-009, UX-010, SEO-FIX-002 — DONE — shared accessibility, locale, discovery, and indexability repair gates merged.
- SEC-001 — DONE — CRITICAL — patched dependency set and permanent production high-severity audit gate merged.
- P-045 through P-085 — DONE except no gaps among expansion tasks already listed as complete in prior state.
- REG-EXP-001 through REG-EXP-006 — DONE — required expansion regression gates completed through the P-083–P-086 batch.
- P-086 — DONE — MEDIUM — Cryptocurrency Average Cost Calculator added with bilingual routes, shared-currency semantics, investment-directory integration, weighted average entry-price calculation, explanatory content, and regression tests.
- P-087 — DONE — MEDIUM — Cryptocurrency Profit and Loss Calculator added with bilingual routes, fee-aware profit/loss and return calculations, break-even price, investment-directory integration, explanatory content, and regression tests.
- P-088 — OPEN — MEDIUM — Staking Reward Calculator; next calculator after P-087.
- P-089 — DONE — previously merged on main.

All later uncompleted catalog tasks remain ordered by `TASK_QUEUE.md` and are effectively BLOCKED until they become the single OPEN task here.

## Vercel connector state

- General Vercel connector access is available when team discovery succeeds.
- CalCome team: `team_cuJFcIPj1zvkSmGeDk3hckZd` on Hobby.
- GitHub Vercel-bot evidence identifies project `prj_nNXkUJGK9l7vG83KDZE2XOVHHd80` and continues to be the deployment-state fallback when direct resource lookup is permission-limited.
- Direct project/deployment lookup may return empty results, `403`, or `404`; classify these as resource-level visibility limitations unless application-failure evidence exists.
- Production observation may lag repository `main`; release drift alone does not block repository development when current-head CI and application validation pass.

## Expansion continuation

REG-EXP-006 completed the required regression gate after P-083 through P-086. P-087 is complete and P-088 is the single next OPEN task. Continue the remaining expansion program in `TASK_QUEUE.md` order, skipping tasks already DONE here.

Each calculator PR must update this file in the same PR:

- mark its own task DONE
- increment the public-calculator count by one only for a genuinely new public calculator
- decrement the remaining expansion count accordingly
- make exactly one next eligible task OPEN

After every four additional calculator merges, insert the repository-defined Search Console, locale, directory, production, and indexability regression gate before the next calculator batch.
