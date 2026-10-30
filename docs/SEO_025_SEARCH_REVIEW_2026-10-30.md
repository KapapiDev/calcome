# SEO-025 — Search evidence and bounded page improvements

Observed: 2026-10-30. Property: `sc-domain:calcome.com`. Search type: Web. Source: the authenticated Search Console Performance UI, not a Search Analytics API response or a CSV export. The report said updated four hours earlier, while the displayed current windows ended on 2026-10-27. All positions below retain UI rounding.

## Current and preceding windows

| Window                                       | Clicks | Impressions | CTR from counts | Displayed average position |
| -------------------------------------------- | -----: | ----------: | --------------: | -------------------------: |
| 2026-09-30 to 2026-10-27 (28 days)           |     11 |       1,779 |          0.618% |                         13 |
| 2026-09-02 to 2026-09-29 (preceding 28 days) |     17 |       1,770 |          0.960% |                       29.1 |
| 2026-10-21 to 2026-10-27 (7 days)            |      3 |         488 |          0.615% |                         15 |
| 2026-10-14 to 2026-10-20 (preceding 7 days)  |      4 |         338 |          1.183% |                       12.8 |

The preceding-window totals were read with Search Console's corresponding “compare with previous period” preset (`compare_date=PREV`). Their dates are calculated from the explicitly displayed current windows and the equal-length preceding-period definition; the comparison chart's accessibility date label was malformed and is not date evidence.

Over 28 days, impressions were nearly unchanged (+0.5%) while clicks fell by six (-35.3%). Over seven days, impressions rose 44.4% while clicks fell by one. At this size, individual clicks change CTR materially. Average position also depends on the query/page mix; the 28-day average improvement does not establish a page-level ranking gain. No traffic or ranking effect is attributed to a previous release.

Captured the surfaced 159 query rows / 133 page rows for 28 days and 80 query rows / 72 page rows for seven days by choosing 500 rows in the visible table. These are the rows exposed by the UI, not every actual search. Exact-page query filters were inspected for the selected candidates. Full captures remain in the task's local output `search-performance-2026-10-30.json`; only relevant aggregate evidence is recorded here.

[Google's dimension documentation](https://support.google.com/webmasters/answer/17011259?hl=en) explains anonymized queries, row limits, canonical credit and property-versus-page aggregation. Consequently, do not sum query rows into a supposed property total or infer undisclosed queries. No cannibalization or canonical merger is established by this review.

## Three selected calculator pages

| Measured canonical URL                 | 28-day clicks / impressions / position | 7-day clicks / impressions / position | Evidence and bounded change                                                                                                                                                                                                                                                                                                                                                 |
| -------------------------------------- | -------------------------------------- | ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/ko/finance/operating-profit`         | 0 / 63 / 10.9                          | 0 / 29 / 7.3                          | Exact-page query `영업이익률 계산`: 0 / 30 / 11.0; variant `영업이익율 계산`: 0 / 2 / 9.5. Put the margin intent and percentage formula first, show a worked amount/margin comparison and accounting scope. Remove the existing `/finance/margin` related link after production returned 404. Keep the published break-even link; do not resurrect the retired route.       |
| `/en/employment/part-time-monthly-pay` | 0 / 131 / 8.0                          | 0 / 17 / 8.1                          | Highest-impression non-home, zero-click near-first-page calculator in the captured window. Its exact-page query table showed no rows; no hidden keyword is invented. Clarify gross pay and hourly-to-monthly inputs, show four-week versus average-month pay, disclose the existing 365.2425-day model, deductions/allowance exclusions and display-only currency behavior. |
| `/ko/finance/bond-yield-to-maturity`   | 0 / 40 / 9.2                           | 0 / 18 / 10.1                         | Exact-page queries include `ytm` (0 / 10 / 10.1), `채권 만기수익률 계산기` (0 / 3 / 4.0), and `ytm 뜻` (0 / 1 / 6.0). Make the comparison intent clear, show why 5.26% current yield differs from 10.53% YTM, state nominal annual-rate assumptions, and link to the two relevant published guides.                                                                         |

These are three calculator identities; Korean/English counterpart explanations stay consistent. Existing mathematical engines, input constraints, public URLs, canonical/hreflang metadata, the 100-calculator inventory and 224-URL sitemap remain intact. The shared existing `CalculatorContentGuide` renders examples, assumptions, limitations, primary sources and the review date without new dependencies or a redesign.

## Deferred candidates and historical comparison

- `/en/finance/early-loan-repayment-fee`: 0 clicks / 83 impressions / position 11.7. The exact-page query table showed 55 impressions for `calcome`, versus 12 for `early loan repayment calculator` (position 20.0), two for `calculate early repayment of loan`, and one for `early repayment loan calculator`. Its headline average is heavily influenced by brand traffic; do not present 83 as non-brand calculator demand or broaden a fee estimator into a repayment-savings tool through a misleading title.
- `/ko/finance/d-day`: 5 / 216 / 5.1. Separately, the property-level query table recorded 175 impressions / five clicks for `d+`; these separate dimensions are not a measured query/page join. The page already attracts clicks, so this review does not justify an unrelated rewrite.
- `/ko/finance/currency-conversion` (0 / 76 / 13.7), work-hours, rent-conversion and lower-ranked payroll pages remain possible later opportunities. Three bounded changes are enough for this batch; policy-sensitive claims would require their own current official verification.
- The archived 2026-09-25 baseline recorded 19 clicks / 3,537 impressions over its three-month window and 9 / 271 over its latest seven days. It also recorded English monthly-pay 0 / 99 / 16.11 and English early-fee 4 / 149 / 15.66. Those underlying date-bounded exports are not available in this checkout. They are historical context, not an equal-window control or proof that SEO-022 caused a change. No historical query/page rows are reconstructed.

## Primary-reference review and examples

Opened and read on 2026-10-30:

- [SEC financial-statement guide](https://www.sec.gov/investor/pubs/begfinstmtguide.htm): operating margin compares operating income with net revenue. Existing calculator examples: revenue 100,000,000, cost of goods sold 55,000,000 and operating expenses 25,000,000 produce operating profit 20,000,000 and a 20% margin. No interest/tax or net-margin claim is introduced.
- [US Naval Observatory, Leap Years](https://aa.usno.navy.mil/faq/leap_years): the mean Gregorian year is 365.2425 days. The existing calculator's chosen convention is `weekly pay × 365.2425 / 7 / 12`, not a statutory payroll formula. USD 20/hour × five hours/day × four days/week gives USD 400/week, USD 1,739.25 per average month and USD 20,871/year; four weeks alone give USD 1,600. No minimum-wage threshold, tax rule or entitlement is changed.
- [Fidelity bond education](https://www.fidelity.com/learning-center/investment-products/fixed-income-bonds/bond-prices-rates-yields): current yield, maturity cash flows, price-to-par differences and reinvestment considerations. Illustrative face value 1,000, price 950, annual coupon 5%, one year and one annual payment reproduce current yield 5.263157895% and YTM 10.526315789% in the existing engine.

## Release and observation gate

Run the required full preflight and validate the rendered selected pages, numerical examples, internal links, both locales and live SEO. Exact head, results, Preview and Production evidence are recorded in the implementation PR. No success is inferred from this document alone.

The 2026-10-30 guide release and this batch both postdate the current data end. SEO-025 finishes the evidence review and bounded implementation; it does not claim an increase in clicks. SEO-027 is the next evidence-gated review: wait until Search Console covers at least 2026-10-31 through 2026-11-13, preferably through 2026-11-27, before evaluating the changed pages and new guides. Collect matched pre-release windows (2026-10-16–29 or 2026-10-02–29) when available, use page/query and device/country context, and avoid causal claims from small or shifting samples. Before that gate, do not create a branch, PR, speculative change, repeated audit or automatic monitor merely to keep work active. The owner continues manually. Indexing quota and AdSense waits remain separate.
