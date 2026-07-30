# UX-005 Housing and Real-Estate Calculator UX Audit Completion

Date: 2026-07-30

## Effective-state reconciliation

- No open Pull Request existed when this audit was recorded.
- The latest merged implementation is PR #149 at merge SHA `407d531f13080af4e9de25f54e50eaffb86fc776`.
- Vercel production deployment `dpl_5wWrq2r7U217si4JBCTtUpmBFyz9` is `READY` for that exact SHA and serves the `www.calcome.com` alias.
- Production root returned HTTP 200 through `web_fetch_vercel_url`.

## Completed housing and real-estate coverage

The applicable existing calculators have been audited through the merged category work:

- Mortgage payment validation and stale-result handling: PR #130
- Property tax validation and stale-result handling: PR #139
- Real-estate acquisition tax and transaction-cost validation: PR #135
- Real-estate brokerage fee validation: PR #147
- Rent conversion rate validation: PR #148
- Jeonse-to-monthly-rent validation: PR #149

Each implementation preserved formulas and public route integration while adding or confirming invalid-resubmission state clearing, result-scroll cancellation, validation-summary accessibility, focused regression coverage, exact-head GitHub Actions, and Vercel deployment evidence.

## Production regression evidence

- `https://www.calcome.com`: HTTP 200
- Korean calculator directory data includes the housing calculators once with the expected primary categories and canonical locale paths.
- The production document exposes the Korean-to-English language entry and canonical `https://www.calcome.com` origin.
- No deployment, alias, build, runtime, route, calculation, or known critical UX failure was observed in this reconciliation.

## Queue conclusion

UX-005 is effectively `DONE` based on merged Pull Requests and exact-SHA production evidence. The stale `TASK_QUEUE.md` status does not override the actual GitHub and Vercel state under `AUTOMATION.md`.

The next effectively eligible phase task is UX-006, Savings and Investment Calculator UX Audit. Its first audit targets remain CAGR and stock-average-cost as documented in the queue.
