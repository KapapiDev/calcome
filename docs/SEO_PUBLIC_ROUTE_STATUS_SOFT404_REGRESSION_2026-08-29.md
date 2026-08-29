# SEO-013 Public Route Status and Soft-404 Regression

Verified: 2026-08-29

## Scope

This pass verifies that CalCome's public route source-of-truth cannot silently advertise calculator URLs that have no application route module, while preserving intentional locale-less redirects and the existing not-found boundary.

## Public evidence observed

- `https://www.calcome.com/` returned the Korean home content.
- `https://www.calcome.com/calculators` returned the calculator directory with category and calculator content.
- `https://www.calcome.com/en/calculators` returned the English calculator directory.
- The external fetch path observed `https://www.calcome.com/en` redirecting to `/`, which conflicts with the just-merged SEO-012 repository state that intentionally removed that redirect. Because the current Vercel deployment resource remains inaccessible through direct connector lookup (deployment listing 403; recovered deployment ID lookup 404), this is recorded as stale/deployment-observation evidence rather than treated as a new application-code defect.
- Direct external fetches of representative calculator and intentionally invalid paths returned an environment-level `Internal Error` without an authoritative origin HTTP status, so those results are not classified as product 404/Soft-404 failures.

No private Search Console Soft 404 URL classification is inferred in this task.

## Repository regression coverage

`src/app/public-route-status.test.ts` now asserts that:

1. the public calculator registry still contains exactly 100 calculators;
2. every Korean calculator canonical has a real shared `[locale]` route module, which also backs the English counterpart;
3. representative home, directory, informational, and not-found route modules remain present;
4. `/ko` remains the intentional compatibility redirect while `/en` remains canonical and non-redirecting in repository configuration;
5. every locale-less calculator alias redirects to its registry canonical, and each redirect destination is backed by a real route module.

This converts missing-route / accidental redirect drift into a CI failure instead of allowing an indexable-looking URL to degrade into a thin or missing page unnoticed.

## Product conclusion

No reproducible repository-side 404 or Soft-404 application defect was found after SEO-012. The verified repository contract is strengthened without changing public URLs or legitimate redirects. Production `/en` observation should be rechecked after the merged deployment is observable, but it is not evidence sufficient to revert the repository fix.
