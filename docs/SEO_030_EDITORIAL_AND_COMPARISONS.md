# SEO/GEO clarity, verification and comparison release

Authorized by the owner on 2026-11-02 after the site-preparedness assessment. One bounded implementation task and one PR cover all confirmed on-site findings; SEO-027's outcome-review gate remains separate.

## Changes

- English home now uses the existing explicit names, descriptions, primary categories and search aliases rather than generated title-case names and repeated placeholder descriptions. Search receives the English locale. The six popular calculator descriptions explain the actual task and model. Home and English info pages receive language-specific social metadata.
- Removed embedded branding from the five metadata factories affected by the same root-template duplication: earned-income withholding, ISA, year-end settlement, pension savings credit and retirement-income tax, in both languages. The root template continues to add the brand once.
- Added Korean `/editorial-policy` and English `/en/editorial-policy`, with reciprocal language metadata, sitemap discovery, a permanent Korean-prefix alias redirect and shared footer/home/calculator/guide links. The canonical sitemap grows from 224 to 226 URLs; all existing URLs remain.
- Expanded both About pages with CalCome editorial responsibility, the verifiable public `KapapiDev/calcome` development history, calculation scope and reporting links. The English contact page now exposes the same established support email and privacy guidance as Korean.
- The editorial policy explains source selection, input units/timing, reproducible examples, applicable boundary tests, review versus effective dates and corrections. It records the two real 2026-10-30 payroll corrections with official references. No person's legal identity, professional credential, independent review, certification or response-time promise was invented.
- Added five bilingual comparison tables to existing guides and connected four relevant calculator identities (CAGR, currency conversion, bond YTM and bond price). The comparisons isolate changed assumptions and distinguish math from forecasts, live quotes, eligibility and real fees.
- Guides now include visible editorial/policy attribution and matching Article/WebPage/Breadcrumb data, with their actual original publication date (2026-10-30), this substantive revision date and source citations. The existing shared calculator schema stays unchanged, including its prohibitions on unsupported product/rating/FAQ or organizational claims. The guide's CalCome organization author represents its visible house editorial credit, not an expert credential.

## Source and example review

Read on 2026-11-02 before publishing the additions:

- [FINRA returns and annualization](https://syndication.finra.org/content/how-are-your-investments-doing-returns-explained): compounding, period comparability, fees and total returns.
- [Fidelity bond prices/rates/yields](https://www.fidelity.com/learning-center/investment-products/fixed-income-bonds/bond-prices-rates-yields): current yield versus YTM and purchase-price effects. Fidelity is a provider's educational source, not a regulator.
- [SEC fixed-rate bond interest-rate risk](https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins-86): inverse price/yield relation and model limitations.
- [ECB reference rates](https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.en.html) and [CFPB transfer guidance](https://www.consumerfinance.gov/consumer-tools/sending-money/): reference versus applied rates, transfer costs and received amounts. All new numeric quotes are hypothetical, not copied as live rates.
- [NTS child credits](https://g.nts.go.kr/nts/cm/cntnts/cntntsView.do?cntntsId=7875&mi=6596) and [MOEL maternity cap](https://1350.moel.go.kr/rtmview.do?id=1000325544): cross-checked the historical correction entries. No calculation formula or legal rate is changed in this release.

Independent regression cases reproduce the comparison scenarios with the actual CAGR, bond price, bond YTM and currency engines. The fee deduction is explicitly separate arithmetic because the currency converter does not model fees. Examples include the 50% loss/100% recovery, short-period annualization, premium-bond current-yield/YTM difference, zero required yield and a higher FX quote producing less after a fee.

## Validation and release

The PR/release record must capture the exact-head full preflight, local/production canonical-route checks, the complete 200-calculator content check and targeted browser journeys. Additional release checks cover brand duplication, English home/search, editorial links and fragments, guide provenance/comparisons, sitemap and language round trips. New policy URLs must return canonical 200 responses and the alias must redirect once.

Some earlier link tests compared entire href strings with sitemap paths; they now compare URL pathnames and retain language checks. The new tests separately require the `#updates` target to exist. The sitemap static count changes from 14 to 16, and substantive guide revision dates advance to 2026-11-02. No old test or validation command is removed.

Site-preparedness scores are editorial judgments, not Google, Lighthouse or AI citation measurements. No search-position, traffic, independent referring-domain or citation uplift is claimed. External outreach, new identity claims, automatic monitoring and the quota-limited indexing operation are outside this implementation; none is silently activated.
