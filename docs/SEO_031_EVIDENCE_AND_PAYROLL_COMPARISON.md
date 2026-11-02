# Payroll model comparison and source transparency

Owner-authorized on 2026-11-02 after the SEO 90 / GEO 85 site-readiness review. The owner explicitly requested GPT-6 Astra and GPT-6.1 Sol debate the priorities and implement their agreed improvements.

## Decision and review

Astra initially proposed more reproducible scenario records for the existing investment guides. Sol challenged that priority because the guides already contain numerical assumptions, comparison tables and engine regression checks. Sol proposed an uncovered question: why the take-home estimator's income-tax line differs from the monthly withholding-table calculator. Astra accepted this as more useful than another verification portal or repeated tables.

Both models inspected the two engines independently. They identified the different family-count conventions and simplified annual deductions/credits, not just rounding. Astra independently checked the official NTS source and numeric cases; Sol implemented the bilingual guide and regression checks. The integrating agent reviewed the source scopes and release. AI model cross-review is not independent professional certification.

## Published scope

- Add one bilingual `net-salary-vs-withholding` guide, discoverable from both guide indexes and both relevant calculators. Preserve all existing canonical URLs and the 100-calculator inventory; sitemap grows from 226 to 228 canonical URLs.
- Align the hypothetical employee: monthly KRW 3.5m, no bonus, no non-taxable allowance, no other dependents or eligible children. Net-salary family input is 0 (excludes employee); withholding-table input is 1 (includes employee). Disable insurance only to isolate the tax calculation; this is not an assertion of insurance exemption or actual take-home pay.
- Compare income tax and local income tax, never take-home pay against a tax amount. Simplified estimate: 195,208 + 19,520 = 214,728 KRW. Table at 100%: 127,220 + 12,720 = 139,940 KRW. Table choices at 80% and 120% give 111,940 and 167,920 KRW total, respectively. Those choices change withholding, not the final annual liability.
- Explain that the simplified model's deductions/credit caps differ from the statutory annual calculation; the numeric gap is not a discovered overpayment, entitlement or error amount. No engine, tax rate, insurance rate or policy constant changes in this release.
- Annotate each guide source with the precise concept or table row it supports, distinguishing public authority, self-regulator and financial provider. Keep CalCome hypothetical arithmetic separate from external validation and actual market quotes.
- Disclose AI-assisted drafting, translation, code and example review in the bilingual editorial policy without inventing human review or expert qualifications.
- Give the new guide its actual 2026-11-02 publication date; retain the five prior guides' 2026-10-30 publication dates.

## Source evidence checked on 2026-11-02

- [NTS monthly withholding guide](https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?cntntsId=7862&mi=6583): employee-inclusive family count, 80%/100%/120% choice and KRW 3,500,000–below 3,520,000 one-person row of KRW 127,220. The page still displays older child adjustments; this child-free comparison does not adopt those amounts or certify all of the page as current. Applicable payroll date and individual conditions remain separate.
- [NTS annual credits](https://g.nts.go.kr/nts/cm/cntnts/cntntsView.do?cntntsId=7875&mi=6596): wage-dependent earned-income credit limits, supporting the boundary of the simplified estimator; not used as a monthly withholding table.
- [FINRA returns](https://syndication.finra.org/content/how-are-your-investments-doing-returns-explained): annualization and costs/distributions.
- [Fidelity bond yields](https://www.fidelity.com/learning-center/investment-products/fixed-income-bonds/bond-prices-rates-yields): current yield versus YTM, purchase price and coupon/repayment.
- [SEC bond interest-rate risk](https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins-86): inverse fixed-rate bond price/yield relationship.
- [ECB reference rates](https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.en.html): information reference versus transaction rate; no live quote is copied into the hypothetical table.
- [CFPB remittances](https://www.consumerfinance.gov/consumer-tools/sending-money/): comparing total cost, rate and received amount; U.S. legal guidance is not generalized to Korea.

[Google AI-feature guidance](https://developers.google.com/search/docs/appearance/ai-features) supports ordinary crawlable textual content, internal discovery and visible/schema consistency; it does not require an AI-specific file or promise inclusion. [Helpful-content guidance](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) supports original useful analysis and truthful authorship/process information. These inform the work, not a ranking guarantee.

## Acceptance and outcome boundaries

Preserve the full preflight, formula tests, locale/canonical checks and bundle budget. Validate all 228 production URLs, 200 calculator screens, twelve guide screens and their sources, and manually test the payroll guide/calculator journey on desktop and mobile. Release records carry exact implementation SHA, checks, Preview and production deployment evidence.

SEO-027 remains the only OPEN evidence-gated task. For pages revised by this release, use complete post-release coverage from November 3–16, preferably through November 30, shifted if deployment is later; retain the older windows only for unchanged pages. There is no automatic monitoring, indexing retry, outreach or traffic/citation improvement claim. Preparedness scores remain a subjective rubric rather than Google/AI measurements.
