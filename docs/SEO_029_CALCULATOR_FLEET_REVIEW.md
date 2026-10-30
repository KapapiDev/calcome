# Remaining 95 calculator review

Review date: 2026-10-30. The owner explicitly authorized the remaining 95 calculators after the five-calculator SEO-028 pilot, in one implementation PR. This is separate from the evidence-gated SEO-027 ranking review.

## Delivered scope

- Reviewed all 95 remaining identities and both language routes, against the existing 100-calculator directory. The five SEO-028 calculators are excluded from this batch.
- Added 91 individually written bilingual explanations with reproducible inputs/results, interpretation, model boundaries and contextual next-calculation links. Existing formulas, FAQs and explanations remain available.
- Retained the adequate worked examples and limitations on operating profit, part-time monthly pay, bond YTM and business cash runway. Repaired the cash-runway page's English breadcrumb destinations without re-dating its unchanged mathematical content.
- Corrected confirmed stale values in take-home salary and maternity benefits, with regression tests and primary references below.
- Corrected locale-specific breadcrumb links and breadcrumb structured data on the affected pages. Preserved all calculator URLs, canonical/hreflang behavior, the five guides and 224 sitemap URLs.

The review matrix is [SEO_029_CALCULATOR_REVIEW.csv](SEO_029_CALCULATOR_REVIEW.csv). `src/content/calculator-examples.ts` contains the published bilingual content and source registry. Its shared component renders on the server after the calculator; it adds no client dependency, network fetch or live-rate claim.

## Confirmed calculation repairs

### Take-home salary child credit

The simplified annualized withholding estimate still used monthly child credits of KRW 12,500 / 29,160 / +25,000. Updated these to KRW 20,830 for one eligible child, 45,830 for two, and +33,330 for each additional child, consistent with the dedicated monthly withholding calculator already in the repository.

The [NTS earned-income credits guidance](https://g.nts.go.kr/nts/cm/cntnts/cntntsView.do?cntntsId=7875&mi=6596), read on 2026-10-30, specifies annual KRW 250,000 for one eligible child, 550,000 for two, and an additional 400,000 for each child above two. Regression cases hold family circumstances constant while checking one, two and three children. The product continues to disclose that this calculator is a simplified estimate; it links to the statutory monthly withholding-table calculator.

### Maternity benefit cap

Updated the government cap from KRW 2.1 million to KRW 2.2 million per 30 days. [MOEL's 2026 guidance](https://1350.moel.go.kr/rtmview.do?id=1000325544), answered 2026-07-28 and read on 2026-10-30, explicitly gives the cap effective from 2026-01-01, including KRW 6.6 million for 90 supported days and 3.3 million for 45 days.

For KRW 3 million ordinary monthly wage and ordinary 90-day singleton leave at a priority-supported employer, the corrected result is KRW 6.6 million government support, 1.6 million employer top-up and 8.2 million total. Tests also cover the large-employer 30-day portion, the capped 45-day multiple-birth portion, below-cap wages and invalid wage input. The localized page replaces the obsolete proposal reference and displays the 2026-10-30 verification date. Premature-birth/miscarriage/stillbirth categories and the statutory minimum benefit floor remain explicitly outside this model.

## Source review and model scope

Sources were reviewed before changing policy-sensitive values. Visible reference links support the explanation they accompany; they do not certify every hypothetical input as a statutory rate.

- [NPS](https://www.nps.or.kr/pnsinfo/ntpsklg/getOHAF0097M0.do), [NHIS 2026 rates](https://edi.nhis.or.kr/portal/images/popup/20251204_pop01longdesc.html) and [MOEL employment insurance](https://www.moel.go.kr/info/astmgmt/employ/employList.do): existing 2026 contribution rates remain correct; no rate change was necessary.
- [HF general jeonse guarantee](https://www.hf.go.kr/ko/sub02/sub02_01_02.do): directly read the three limit formulas, existing-guarantee deductions and capital/regulated-area factor. Reconfirmed the unchanged model on 2026-10-30. The repayment expression uses HF-recognized income, not unadjusted gross salary; no invented multiplier was added.
- [MOEL severance calculation](https://1350.moel.go.kr/home/hp/retirementpaycal/retirementpaycal.jsp), [annual leave](https://1350.moel.go.kr/rtmview.do?id=1000135863), [premium pay](https://1350.moel.go.kr/rtmview.do?id=1000111373) and [parental leave](https://1350.moel.go.kr/rtmview.do?id=1000325830&page=5&type=ALL): disclose eligibility, ordinary/average wage and supported model boundaries alongside examples.
- [MOEL unemployment benefit guidance](https://1350.moel.go.kr/rtmview.do?id=1000320790) and [NTS daily-worker withholding](https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?cntntsId=7863&mi=6584): examples distinguish eligibility from arithmetic. The NTS KRW 200,000/day for five days example gives income tax 6,750 and local tax 670, reproduced by the engine.
- [NTS retirement-income tax](https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?cntntsId=7880): reproduced its KRW 100 million / 20-year example, including national tax KRW 1.12 million. Other tax examples explicitly label user-entered rates and deductions and distinguish national credits from a final refund including local tax.
- [Mirae Asset ISA conditions](https://trading.securities.miraeasset.com/hks/hks4659/n02.do) are issuer terms, not a government citation. The example explains the account type, exemption and excess-profit tax; the ordinary-tax comparison is a stated comparison assumption.
- SEC, FINRA and CFPB references explain compounding, fees, diversification, lending ratios and risk. They are not evidence for a South Korea statutory lending threshold or a promised return. Mathematical examples use hypothetical inputs and disclose timing, fee, currency and inflation conventions.

Several government pages expose tabbed content incompletely to direct text retrieval. Primary indexed content was used where available (including daily-worker and unemployment detail); a primary search result was not described as a full statutory-text review. The Chungcheongbuk-do local-education-tax page intermittently failed direct retrieval, so its indexed scope was cross-checked against other local-government guidance. No guessed new legal rate was introduced from those access limitations. The review date labels explanation review, not a blanket legal certification of every calculator.

## Acceptance and release evidence

- The 91 new published examples have independently specified input/output regression fixtures using the real calculation engines, including Decimal revival, null results and explicit rounding tolerances. Tests also check exact inventory coverage, both rendered locales, source references and localized related destinations.
- Existing pilot, retained-guide, feature, route, metadata, structured-data and boundary tests remain part of the complete preflight. No validation gate or test was removed or relaxed.
- The exact implementation head must pass `npm run automation:preflight` before its first remote push. Build output is then checked across all 224 canonical routes and all 200 calculator routes, including 182 new-example routes, eight retained-guide routes and ten excluded pilot routes. Representative browser UX checks supplement the complete HTTP/engine checks; no claim is made that every input of all 95 tools was manually exercised in a browser.
- PR discussion and local release artifacts record actual gate counts, SHA, Preview/Production state, browser observations and account-meter snapshots. Account usage is shared and integer-rounded; an unchanged display is not zero consumption.

These changes improve answer clarity, source traceability and task completion. AI citations, Google indexing and higher average position remain external outcomes. SEO-027 retains its post-release data gate and should account for this batch's release when comparing changed pages. The twelve quota-limited indexing requests and AdSense prerequisites remain separate waits; no scheduler was created.
