# Measured guide cluster — SEO-023

## Scope and release baseline

Complete existing PR #427 with five distinct topics in Korean and English: CAGR versus arithmetic return, compound annualization, YTM versus current yield, bond price/yield, and currency quote direction. Ten new canonical guide URLs extend the existing 214-URL sitemap to 224; calculator inventory remains 100. Guide indexes link to all localized articles, each article links to a published calculator and back to its index.

The 2026-10-02 implementation lacked sources, complete numerical examples, and current-head local verification. Guide language switching also dropped the locale prefix and led to a missing route. The completed batch includes exact/rounded example distinctions, stated assumptions, source links, a visible review date, page-specific social metadata, and working index/article language round trips. A localized shared-footer link makes the guide indexes reachable from the existing site. It preserves main's SEO-026 repairs and the queue reconciliation.

## Source review — 2026-10-30

All listed sources were opened and read during this release review. Illustrative figures are independently calculated examples, not live rates, product performance, recommendations, or current legal thresholds. No policy-sensitive rates are introduced.

| Topic                | Primary reference                                                                                                                                                                                                        | What it supports                                                                                                    |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------- |
| CAGR / annualization | [FINRA, Returns, Explained](https://syndication.finra.org/content/how-are-your-investments-doing-returns-explained)                                                                                                      | Compounding, time horizons, and interpreting annualized versus simple averages                                      |
| YTM / current yield  | [Fidelity, Bond & CD prices, rates, and yields](https://www.fidelity.com/learning-center/investment-products/fixed-income-bonds/bond-prices-rates-yields)                                                                | Annual coupon divided by price, maturity cash flows, reinvestment, premium/discount distinctions                    |
| Bond price / yield   | [SEC Investor.gov, Interest Rate Risk](https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins-86)                                                             | Inverse price/yield relationship for fixed-rate bonds and interest-rate risk                                        |
| Currency             | [ECB reference rates](https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.en.html), [CFPB money transfers](https://www.consumerfinance.gov/consumer-tools/sending-money/) | Base/quote interpretation, informational reference rates versus transaction rates, fees and final recipient amounts |

## Calculation and integration verification

The guide journey suite verifies actual rendered links, both guide indexes, unique sitemap entries, canonical/hreflang/social metadata, locale round trips, unsupported-route 404 behavior, source links, and the visible review date. It reproduces the published examples with existing calculator engines:

- 100 to 121 over two years: CAGR 10%, total growth 21%.
- 100 to 102 over one month: compound annualization approximately 26.824179456%.
- Face 1,000, annual coupon 5%, one year, one payment: prices 950 / 1,000 / 1,050 yield approximately 10.526315789% / 5% / 0%; current yield at 950 is approximately 5.263157895%.
- 100 USD at an illustrative 1,350 KRW/USD becomes 135,000 KRW; the reciprocal converts it back to 100 USD before fees.

Release requires the full `npm run automation:preflight`, local built-route SEO checks, and production verification after merge. Execution results, exact commit SHA, and deployment evidence are recorded in PR #427; these gates are not replaced by this document.

## Follow-up

SEO-025 is selected next: capture fresh dated Search Console evidence for established pages and choose at most three justified improvements. New-guide observation is 14–28 days from the 2026-10-30 production release (2026-11-13 to 2026-11-27); adjust that baseline if deployment is delayed. No ranking or traffic gain is asserted, and no scheduled monitor was created. The twelve quota-deferred indexing requests and AdSense account wait remain separate operational tasks.
