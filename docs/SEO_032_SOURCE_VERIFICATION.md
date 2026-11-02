# Source verification, accountability and original comparisons

Explicit owner request on 2026-11-02: implement feasible SEO/GEO improvements, excluding external expert review, and identify the operator/content responsibility as 칼컴 (CalCome) with the existing hello@calcome.com contact. This continues the authorized Astra and GPT-6.1 Sol collaboration; neither model is a qualified external reviewer.

## Changes and limits

- About, contact and editorial policy identify the service publishing name and an actionable email. No personal/legal identity, professional license, named expert or response-time promise is fabricated.
- All 100 calculator identities receive specific source applicability or an explicit arithmetic basis, in both languages. The source notes distinguish general education, Korean policy, provider-specific conditions, hypothetical rates and calculation verification. Existing explanation dates are preserved; the scope-note review date is separate from a policy's effective date.
- Twelve payroll/tax/benefit calculators publish reproducible inputs, fixed expected results, source links, review date and the exact boundary of the check. Published official examples, independently computed rule-based cases and assumption-based arithmetic are different labels. This is not a certification of all formulas, every threshold or individual eligibility.
- Confirmed net-salary fixes: replace the fixed KRW 740,000 earned-income credit cap with wage-dependent limits; cap earned-income deduction at KRW 20m. At annual taxable employment pay KRW 42m, the credit cap is KRW 668,000. The tax-only monthly KRW 3.5m case becomes income tax KRW 201,208 plus local tax KRW 20,120, total KRW 221,328. Linked payroll guide figures are updated together. Independent boundary expectations cover salary transitions and the deduction ceiling.
- Annual child-credit eligibility wording is corrected from a blanket age 8–20 statement after checking the 2026 amendment and transitional provisions. Eligibility is not inferred from a count input. Annual-credit law and the monthly-withholding annex are separate sources and are not substituted for one another.
- Three original bilingual comparisons isolate loan term versus total interest, refinancing costs versus simple cash-payment payback, and annual investment fees versus compound growth. Inputs, exclusions, rounding, source scope and calculator return links accompany every table. The loan/refinancing/fee calculators link back to the corresponding analysis.
- The existing 228 canonical URLs remain; six new guide routes make 234 URLs, 200 calculator screens and 18 guide screens. The five original guides retain October 30 publication dates; the payroll and three cost guides use November 2.

## Primary evidence checked on 2026-11-02

- [NTS earned-income deduction](https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?cntntsId=7871&mi=6592): progressive deduction and KRW 20m ceiling.
- [NTS annual tax credits](https://g.nts.go.kr/nts/cm/cntnts/cntntsView.do?cntntsId=7875&mi=6596): salary-dependent earned-income credit limits. Its child-age wording is not treated as current law without checking the amendment.
- [Income Tax Act amendment history](https://www.law.go.kr/LSW/lsRvsDocListP.do?chrClsCd=010102&lsId=001565): Act 21548, April 21, 2026, Article 59-2 and supplementary Article 2. The transition and birth-year exclusion matter; a bare “13+” statement is also incomplete.
- [NTS monthly withholding](https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?cntntsId=7862&mi=6583): the child-free 3.5m–below 3.52m, one-family-member row. Older child amounts in that overview are not reused or certified.
- Other source URLs, reviewed inputs and scope are recorded in `src/content/calculator-reference-checks.ts` and checked against the twelve actual engines in its companion test. Insurance rates, benefit caps and personal eligibility are not interchangeable; arithmetic examples are not actual billing records.
- [CFPB loan terms](https://www.consumerfinance.gov/owning-a-home/explore/understand-the-different-kinds-of-loans-available/): conceptual term/payment/interest tradeoff, not Korean approval rules.
- [Federal Reserve refinancing education](https://www.federalreserve.gov/pubs/refinancings/default.htm): archived education for simple cost/payment-savings payback only. No current regulation or historical fee amount is adopted. Early-payoff balance differences and the time value of money are explicitly excluded from simple payback.
- [SEC investment fees](https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins/updated): costs reduce capital available to compound. Our monthly model and numerical table are independently specified, not copied SEC examples or expected product returns.

## Acceptance and deferred evidence

The implementation must pass the complete repository preflight, including lint, types, formatting, task-state consistency, all tests, production build, client bundle budget and whitespace checks. Inspect all 234 local and production canonical pages for metadata, 100 bilingual source-scope disclosures, 24 reference-case screens, 18 guide screens, source provenance and operator contact. Exercise reference disclosure, corrected payroll output, new guide/calculator navigation and a mobile comparison in a browser.

The implementation PR and local release report record exact revisions, checks and deployment observations. Current ranking, indexing, backlinks, real-user performance and AI citation rates are not measured by these implementation checks. The readiness rubric is a subjective assessment, not a Google or AI score. Brand accountability and AI cross-review do not replace independent professional review. SEO-027 remains the sole OPEN task; use complete November 3–16 post-release data, preferably through November 30, adjusted to actual production date. No automatic monitoring, outreach or indexing retry is created.
