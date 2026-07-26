# UX-002 Employment and Payroll Calculator UX Audit

Verification date: 2026-07-26

## Scope and evidence

This audit tracks every currently published calculator under the canonical `/employment/` route family. The production homepage payload exposed 16 Korean employment routes, and the same route slugs are expected under `/en/employment/`.

The audit does not treat an HTTP response or a successful deployment as proof that interactive behavior passed. Rows remain pending until the calculator has been exercised for normal calculation, invalid input, stale-result clearing, reset, keyboard and screen-reader behavior, mobile layout, bilingual copy, language switching, and policy disclosure where applicable.

## Canonical inventory

- `weekly-holiday-pay`: `/ko/employment/weekly-holiday-pay` and `/en/employment/weekly-holiday-pay`. Code fix and regression tests added in PR #100; Preview interaction still pending.
- `severance-pay`: `/ko/employment/severance-pay` and `/en/employment/severance-pay`. Pending interactive audit.
- `unemployment-benefits`: `/ko/employment/unemployment-benefits` and `/en/employment/unemployment-benefits`. Pending interactive audit.
- `net-salary`: `/ko/employment/net-salary` and `/en/employment/net-salary`. Pending interactive audit.
- `hourly-wage`: `/ko/employment/hourly-wage` and `/en/employment/hourly-wage`. Pending interactive audit.
- `social-insurance`: `/ko/employment/social-insurance` and `/en/employment/social-insurance`. Pending interactive audit.
- `average-wage`: `/ko/employment/average-wage` and `/en/employment/average-wage`. Pending interactive audit.
- `salary-raise`: `/ko/employment/salary-raise` and `/en/employment/salary-raise`. Pending interactive audit.
- `salary-conversion`: `/ko/employment/salary-conversion` and `/en/employment/salary-conversion`. Pending interactive audit.
- `overtime-pay`: `/ko/employment/overtime-pay` and `/en/employment/overtime-pay`. Pending interactive audit.
- `night-work-pay`: `/ko/employment/night-work-pay` and `/en/employment/night-work-pay`. Pending interactive audit.
- `holiday-work-pay`: `/ko/employment/holiday-work-pay` and `/en/employment/holiday-work-pay`. Pending interactive audit.
- `minimum-wage`: `/ko/employment/minimum-wage` and `/en/employment/minimum-wage`. Pending interactive audit.
- `annual-leave-allowance`: `/ko/employment/annual-leave-allowance` and `/en/employment/annual-leave-allowance`. Pending interactive audit.
- `retirement-pension`: `/ko/employment/retirement-pension` and `/en/employment/retirement-pension`. Pending interactive audit.
- `gross-up-salary`: `/ko/employment/gross-up-salary` and `/en/employment/gross-up-salary`. Pending interactive audit.

## Confirmed defect and repair

### Weekly holiday pay

Before this branch, submitting an invalid value after a successful calculation could leave the previous pay result visible beside the new error. The error was also not programmatically associated with both numeric fields.

PR #100 now:

- cancels pending result scrolling when validation fails
- clears the previous result before displaying the error
- marks both inputs with `aria-invalid`
- connects both inputs to the visible alert with `aria-describedby`
- adds Korean boundary coverage and an English valid-result-to-invalid-result regression test

The calculation formula and policy assumptions were not changed. The representative existing example remains hourly wage KRW 12,000 and 15.5 scheduled weekly hours, producing 3.1 paid holiday hours and KRW 37,200.

## Repository and deployment verification

- Branch: `agent/ux-002-employment-accessibility`
- Exact head before this audit record: `c59c6a8357044324926ce8f7dabbb8e253b175fe`
- GitHub Actions CI run 313 completed successfully for that head.
- Vercel Preview deployment `dpl_7HiPY5xx3iGBFyH2fGeTiUJXjYiq` reached `READY` for that head.
- The protected Preview returned a Vercel SSO redirect when fetched through the available execution tool, so interactive Preview behavior was not claimed as verified.
- Production root returned HTTP 200 through the Vercel connector and exposed the canonical calculator inventory.

## Completion gate

UX-002 must remain in review until every inventory row has been audited and any critical defects are fixed. A green CI run and a `READY` Preview are necessary evidence, but they do not replace calculator-by-calculator interaction and accessibility checks.