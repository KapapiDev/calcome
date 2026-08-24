# OPS-001 Release Drift Reconciliation — 2026-08-24

## Reconciled repository state

- Latest `main` baseline inspected for this reconciliation: `d94ce93457940bd984a454af460442b0ef6db454`.
- That commit includes P-045 and the canonical `allPublishedCalculators` source now contains 56 calculators.
- P-063 Mortgage Loan Limit and P-076 Savings Goal are both present in the canonical public calculator registry on `main`.
- `src/config/calculator-directory.test.ts` verifies every published calculator is assigned exactly one primary directory category and appears in directory search data.
- `src/app/sitemap.test.ts` verifies both Korean and English canonical URLs for every published calculator, the canonical `https://www.calcome.com` origin, unique sitemap URLs, reciprocal locale alternates, and standards-compliant XML serialization.
- `src/config/redirects.test.ts` verifies locale-less and apex one-hop redirects for every public calculator.

No repository-side evidence was found that P-063 or P-076 is missing from directory, sitemap, redirect, or public-route source-of-truth integration on the latest `main`.

## Vercel reconciliation

The connected Vercel route was attempted before classifying the release drift:

- team discovery succeeds for CalCome: `team_cuJFcIPj1zvkSmGeDk3hckZd`.
- project listing for that team returns an empty project list.
- the project ID recovered from Vercel GitHub bot evidence is `prj_nNXkUJGK9l7vG83KDZE2XOVHHd80`.
- direct project lookup with that ID returns `404 Not Found`.
- deployment listing with the recovered project and team IDs returns `403 Forbidden` (`You don't have permission to list the deployment`).
- direct deployment lookup of the most recent known Ready Preview returns `404 Deployment not found` through the connector.
- protected Vercel URL fetching could not create an authenticated share/fetch route in the current execution environment.

GitHub's Vercel bot nevertheless recorded the P-045/P-076 recovery branch Preview as **Ready** on 2026-08-24, and earlier P-063/P-076 bot records show Ready Preview deployments followed by Hobby-plan `api-deployments-free-per-day` quota failures.

## Conclusion

The previously observed 53-calculator live directory versus repository count is classified as **release/inspection drift, not a demonstrated application-code defect**. The current execution cannot directly prove the production alias SHA because the connected Vercel deployment API is permission-limited, but repository integration is internally consistent and the latest task Preview is deployable according to Vercel's GitHub integration.

Under `AUTOMATION.md` continuity rules, this external deployment-inspection limitation must not freeze calculator development or trigger duplicate calculator work. A future production check may record the actual production SHA when the deployment connector can expose it, but no pending repair task should be created without concrete product-failure evidence.
