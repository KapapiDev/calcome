# CalCome TASK_QUEUE

## Operating rules

- Complete exactly one task per scheduled execution.
- Reconcile this queue with actual GitHub Pull Requests, branches, checks, and Vercel deployments before selecting work.
- GitHub and production state override stale queue text.
- Only the first effectively `OPEN` task may be selected.
- Keep exactly one task `OPEN`; later work remains `BLOCKED` until the previous task passes production verification.
- Priority order: calculation correctness and critical UX, site-wide UI/UX consistency, calculator expansion, technical SEO, content quality, then AdSense readiness.
- Never publish a policy-sensitive calculator without official sources and a visible verification date.
- Never create a near-duplicate calculator merely to increase the count.
- Product strategy: win search coverage through a large inventory of genuinely distinct calculators, then earn repeat use through fast, accurate calculations, clean bilingual UX, and predictable interaction patterns.
- Search Console data may reorder unstarted work and trigger bounded technical fixes, but it must not replace the 100-calculator milestone with a narrow single-topic strategy.
- Currency semantics follow calculator intent, not language replacement alone: generic English financial calculators default to USD while offering major reusable currency choices, generic Korean calculators default to KRW, currency-neutral calculators expose a sensible currency choice when amounts are displayed, and South Korea policy calculators remain KRW with explicit South Korea/KRW labeling in English.

## Product milestone

- Current verified public total: **51 calculators**.
- Target: **100 public calculators**.
- Required expansion: **49 calculators**, represented by P-045 through P-093.
- P-001 through P-044 are merged and effectively `DONE`.
- SEO-001 XML sitemap and SEO-002 shared JSON-LD foundation are merged.
- Demand ordering is qualitative and documented in `QUEUE_RESEARCH_2026-07-25.md`; exact search volumes must not be invented.
- Search Console baseline exported 2026-07-29: 281 impressions, 1 click, 108 surfaced queries, 38 countries, and first recorded impressions on 2026-07-15. Treat this as an early directional signal, not proof that the broad-inventory strategy should be narrowed.
- Early non-brand clusters are CAGR and compound growth, stock average cost, loan comparison and affordability, LTV, and employment/payroll. Use them to accelerate adjacent work while continuing broad inventory growth.

## Completed calculator program

| Tasks               | Status | Evidence                            |
| ------------------- | ------ | ----------------------------------- |
| P-001 through P-043 | DONE   | Matching merged PRs #35 through #89 |
| P-044               | DONE   | PR #91 merged                       |

---

# Phase 1: Site-wide UI/UX audit and directory architecture

UX-001

Title: Shared Calculator Shell, Categorized Directory, and Production Entry Audit

Status: DONE

Priority: CRITICAL

Goal: Establish a verified shared UX baseline across all 51 public calculators and replace the flat all-calculator wall with a scalable category-based directory before adding more pages.

Scope:

- Verify home search, calculator directory, category discovery, direct URL entry, locale-less redirects, Korean and English switching, theme persistence, refresh, back navigation, and URL restoration.
- Inspect shared calculator workspace, input controls, validation, reset, result scrolling, disclosures, tables, charts, mobile keyboard behavior, focus indicators, reduced motion, and long-number containment.
- Rebuild the `모든 계산기` experience so calculators are organized by clear user-goal categories instead of rendering all cards as one undifferentiated grid.
- Use the initial category model: `급여·근로`, `대출·신용`, `세금`, `부동산·주거`, `저축·연금`, `투자`, `사업·생활`.
- Add category navigation near the top of the directory. On mobile it must remain usable without wrapping into an unreadable control wall.
- Keep a prominent calculator search that matches calculator names, common abbreviations, synonyms, and colloquial terms such as `주담대`, `복비`, `물타기`, `연봉 실수령`, and `3.3`.
- Show a concise popular-calculator section and category sections with meaningful headings, descriptions, counts, and predictable ordering.
- Avoid rendering all 51 or future 100 calculators as one uninterrupted card grid on initial view.
- Every calculator must belong to exactly one primary directory category and may have additional search keywords without creating duplicate cards.
- Make the category source data-driven so every new calculator automatically requires a valid category and appears in the correct section.
- Preserve canonical calculator URLs. Category filters or anchors must not create duplicate indexable calculator pages.
- Ensure keyboard navigation, focus visibility, screen-reader headings, touch targets, dark mode, 200% zoom, and small-screen layouts remain usable.
- Produce a route-by-route audit matrix with severity, reproduction steps, screenshots when possible, and reusable fixes.
- Fix shared critical defects in the same task; do not perform an evidence-free visual redesign.

Acceptance:

- Every published calculator is inventoried, reachable, searchable, and assigned to exactly one primary category.
- The directory no longer presents the entire inventory as one undifferentiated grid.
- Users can reach a category and a target calculator without scanning the complete inventory.
- Search handles calculator names and documented aliases consistently.
- The directory structure remains practical at the 100-calculator milestone without another structural rewrite.
- No shared critical blocker, broken route, duplicate canonical target, mobile overflow, inaccessible category control, or hidden calculator remains.
- Existing CollectionPage and ItemList structured data still contains every published calculator exactly once.
- `npm run check`, `npm run build`, and `git diff --check` pass.
- Desktop and mobile production evidence is recorded.

Evidence: PR #96 merged with exact-head CI and Vercel Preview success. Production observation remains recorded as external `POST_MERGE_VERIFY`; PR #98 subsequently fixed the confirmed site-wide language-switching regression with 51-calculator round-trip coverage and successful exact-head CI and Preview.

---

UX-002

Title: Employment and Payroll Calculator UX Audit

Status: DONE

Priority: CRITICAL

Scope: Audit every employment, salary, wage, benefit, leave, insurance, and pension calculator for input clarity, official-rate disclosure, result interpretation, mobile usability, accessibility, bilingual consistency, and correct directory placement.

Evidence: PRs #100 and #102 through #118 audited and hardened all 16 `급여·근로` calculators, including category and search discovery, bilingual route integrity, invalid-resubmission state clearing, validation accessibility, calculation regression coverage, exact-head GitHub Actions, Vercel Preview evidence, and Production verification through merge SHA `eb594f0240e9928db8252dee35d480309007ebf1` on deployment `dpl_H3NzusK8w8JmDbkaQADF17rrP2dz` (`READY`).

---

UX-003

Title: Loan and Credit Calculator UX Audit

Status: DONE

Priority: CRITICAL

Scope: Audit every loan, mortgage, DSR, DTI, LTV, repayment, refinancing, credit-card, and affordability calculator, including amortization tables, comparison states, impossible-payment errors, long schedules, and correct directory placement.

Evidence: PRs #120 through #133 audited and hardened all 14 `대출·신용` calculators, including invalid-resubmission state clearing, validation accessibility, amortization and comparison-state regression coverage, bilingual route integrity, directory and search discovery, exact-head GitHub Actions, Vercel Preview evidence, and Production verification through merge SHA `089c9084ee1574a307215ae92a755cf0b21801de` on deployment `dpl_4jiQtFPhn6Ea65aGZAfMBAki9PqC` (`READY`).

---

UX-004

Title: Tax and Payroll Filing Calculator UX Audit

Status: OPEN

Priority: CRITICAL

Scope: Audit VAT, withholding, comprehensive income, freelancer, property, acquisition, capital-gains, gift, inheritance, and holding-tax flows for source dates, assumptions, error prevention, result caveats, user comprehension, and correct directory placement.

---

UX-005

Title: Housing and Real-Estate Calculator UX Audit

Status: BLOCKED

Priority: HIGH

Scope: Audit brokerage, rent conversion, jeonse-to-rent, housing payment, property-tax, and transaction-cost journeys across desktop and mobile, including category discovery.

---

UX-006

Title: Savings and Investment Calculator UX Audit

Status: BLOCKED

Priority: HIGH

Scope: Audit compound interest, savings, fixed deposit, CAGR, stocks, dividends, and investment-related flows, including charts, tables, result comparison, large values, bilingual terminology, and category discovery. Search Console makes CAGR and stock-average-cost the first two audit targets: verify their canonical locale routes, metadata, related-calculator paths, result clarity, comparison depth, and repeat-use flow without delaying completion of the remaining category audit.

---

UX-007

Title: Full-Site Accessibility and Visual Consistency Regression

Status: BLOCKED

Priority: HIGH

Scope:

- Run keyboard-only, focus-order, accessible-name, contrast, zoom, reduced-motion, touch-target, mobile overflow, light-mode, and dark-mode regression checks.
- Standardize only proven inconsistencies in typography, spacing, inputs, buttons, error messages, result hierarchy, tables, charts, disclosures, directory cards, category controls, and search states.
- Record shared UI rules to prevent future drift.

---

UX-008

Title: Bilingual Currency Semantics and Money Formatting Audit

Status: BLOCKED

Priority: HIGH

Goal: Ensure an English page never presents unexplained Korean-won inputs or results, while preserving KRW for calculations that are inherently governed by South Korean law, tax, payroll, housing, or benefit rules.

Scope:

- Classify every calculator as generic monetary, currency-neutral with displayed amounts, South Korea policy-specific, or non-monetary.
- Make generic English financial and investment calculators default to USD and generic Korean equivalents default to KRW.
- On eligible English calculators, offer at minimum USD, GBP, EUR, CAD, AUD, KRW, and JPY. Keep USD as the deterministic first-visit default on the shared `/en` route; browser locale may reorder or suggest a likely currency such as GBP for `en-GB`, but must never silently change entered values or override an explicit user choice.
- Persist an explicit currency choice locally and restore it on later eligible calculator visits. Provide a visible way to change or reset the choice, and do not store sensitive financial inputs merely to remember currency.
- For currency-neutral formulas such as CAGR, compound growth, savings goals, stock average cost, and profit/loss, provide a currency selector when it improves reuse; changing currency changes symbols, labels, formatting, charts, tables, shared/restored state, and explanatory copy consistently without pretending to perform foreign-exchange conversion.
- Keep South Korea policy-specific calculators in KRW on both language routes, but label the English title, description, inputs, results, assumptions, and disclosures clearly as South Korea and KRW.
- Keep pure percentage, date, age, ratio, and other genuinely non-monetary calculators free of unnecessary currency controls.
- Use locale-appropriate grouping, decimals, symbols, accessible names, validation messages, examples, metadata, and structured data.
- Never perform silent exchange-rate conversion. Any actual conversion feature must identify the rate source, timestamp, base currency, quote currency, rounding, and unavailable/stale-rate behavior.
- Add shared currency metadata and reusable formatting primitives so future calculators cannot accidentally hard-code KRW into a generic English route.

Acceptance:

- No generic English calculator defaults to or displays unexplained KRW.
- No South Korea policy calculator is misleadingly converted to USD; English users can see before input that the calculation is South Korea-specific and KRW-based.
- Currency selection, where present, survives recalculation, navigation among eligible calculators, later visits, and intended URL/state restoration, and updates every visible and accessible monetary representation.
- A first-time `/en` visitor receives USD unless they explicitly choose another currency; a returning visitor receives the last explicit supported choice. Browser-country or browser-locale inference may suggest or reorder options but cannot silently replace the default or saved choice.
- GBP behavior is covered explicitly because the 2026-07-29 Search Console baseline recorded 58 United Kingdom impressions, compared with 76 United States impressions; this is directional evidence only and does not justify a separate UK formula or locale route.
- Currency changes do not alter dimensionless results such as CAGR or return percentage, except for their related amount displays.
- Representative tests cover generic investment, savings, loan, stock, South Korea tax, employment, housing, and non-monetary calculators in both locales.
- `npm run check`, `npm run build`, focused currency tests, and `git diff --check` pass with desktop and mobile production evidence.

---

# Phase 1.5: Search index consolidation before expansion

SEO-FIX-001

Title: Canonical Host, Locale Route, Hreflang, and Sitemap Consolidation

Status: BLOCKED

Priority: CRITICAL

Trigger evidence:

- The 2026-07-29 Search Console export surfaced the same calculator families across `www/non-www`, locale-less `/finance/*`, Korean `/ko/*`, and English `/en/*` URLs.
- This report contains historical search data, so reproduce the current production behavior before changing redirects or canonical tags. Do not claim a live defect from historical rows alone.

Scope:

- Establish `https://www.calcome.com/ko/*` and `https://www.calcome.com/en/*` as the only indexable calculator route families.
- Verify and, where needed, fix one-hop permanent redirects from `calcome.com/*` to `www.calcome.com/*` and from locale-less calculator routes to the intended locale route.
- Verify self-referencing canonicals for Korean and English pages and reciprocal `ko`, `en`, and appropriate `x-default` hreflang clusters.
- Ensure the XML sitemap contains only canonical locale URLs and never lists redirecting, non-www, locale-less, filtered, or duplicate calculator URLs.
- Ensure internal links, directory cards, related-calculator links, structured data, language switching, and shared metadata emit canonical locale URLs.
- Add automated coverage for representative finance, employment, and directory routes, including query strings, trailing slash behavior, and Korean-English round trips.
- Record a Search Console annotation and retain the 2026-07-29 export as the comparison baseline for later recrawl evaluation.

Acceptance:

- Every tested noncanonical route resolves in one permanent hop to exactly one intended canonical URL.
- Korean and English equivalents remain separately indexable and mutually referenced; neither canonicalizes to the other language.
- No canonical route redirects, no redirecting URL appears in the sitemap, and no internal link intentionally emits a noncanonical variant.
- Existing 51 calculators remain discoverable in both languages and language switching preserves calculator identity.
- `npm run check`, `npm run build`, redirect/canonical/hreflang tests, sitemap tests, and `git diff --check` pass.
- Desktop and mobile production verification covers home, directory, CAGR, stock average cost, loan comparison, and one employment calculator.

---

# Phase 2: Expansion from 51 to 100 calculators

## Data-informed execution order

The 49-calculator inventory remains intact. Search Console changes the order of unstarted work, not the breadth target. When Phase 2 opens, use this initial acceleration order before returning to the remaining Tier A, Tier B, and Tier C sequence:

1. P-089 Dollar-Cost Averaging Calculator — reinforces the surfaced stock-average-cost cluster and repeat-use behavior.
2. P-062 Stress DSR Calculator — extends loan comparison and affordability demand.
3. P-063 Mortgage Loan Limit Calculator — extends loan affordability and LTV demand.
4. P-076 Savings Goal Calculator — connects CAGR and compound-growth discovery to a recurring planning use case.
5. P-045 Investment Fee Impact Calculator — adds a comparison-led investment decision tool.

After every four merged calculators, use fresh Search Console query/page/country/device data to reorder only tasks that are still unstarted. Record the evidence and keep one task OPEN; never remove committed calculators solely because early data is sparse.

## Tier A: Highest commercial and recurring Korean intent

| Task  | Calculator                                         | Primary directory category | Status  | Priority |
| ----- | -------------------------------------------------- | -------------------------- | ------- | -------- |
| P-045 | Investment Fee Impact Calculator                   | 투자                       | BLOCKED | HIGH     |
| P-046 | Inflation and Purchasing Power Calculator          | 저축·연금                  | BLOCKED | HIGH     |
| P-047 | Currency Conversion Calculator                     | 사업·생활                  | BLOCKED | HIGH     |
| P-048 | Pension Savings Tax Credit Calculator              | 저축·연금                  | BLOCKED | HIGH     |
| P-049 | ISA Tax Savings Calculator                         | 투자                       | BLOCKED | HIGH     |
| P-050 | Retirement Pension Tax Credit Calculator           | 저축·연금                  | BLOCKED | HIGH     |
| P-051 | Year-End Tax Settlement Refund Calculator          | 세금                       | BLOCKED | HIGH     |
| P-052 | Retirement Income Tax Calculator                   | 세금                       | BLOCKED | HIGH     |
| P-053 | Earned Income Withholding Tax Calculator           | 세금                       | BLOCKED | HIGH     |
| P-054 | Part-Time Monthly Pay Calculator                   | 급여·근로                  | BLOCKED | HIGH     |
| P-055 | Daily Worker Pay Calculator                        | 급여·근로                  | BLOCKED | HIGH     |
| P-056 | Weekly and Monthly Work-Hours Converter            | 급여·근로                  | BLOCKED | HIGH     |
| P-057 | Job Offer Total Compensation Comparison Calculator | 급여·근로                  | BLOCKED | HIGH     |
| P-058 | Salary Negotiation Target Calculator               | 급여·근로                  | BLOCKED | HIGH     |
| P-059 | Employer Total Labor Cost Calculator               | 사업·생활                  | BLOCKED | HIGH     |
| P-060 | Parental Leave Benefit Calculator                  | 급여·근로                  | BLOCKED | HIGH     |
| P-061 | Maternity Leave Benefit Calculator                 | 급여·근로                  | BLOCKED | HIGH     |
| P-062 | Stress DSR Calculator                              | 대출·신용                  | BLOCKED | HIGH     |
| P-063 | Mortgage Loan Limit Calculator                     | 대출·신용                  | BLOCKED | HIGH     |
| P-064 | Jeonse Loan Limit Calculator                       | 대출·신용                  | BLOCKED | HIGH     |
| P-065 | Rent Affordability Calculator                      | 부동산·주거                | BLOCKED | HIGH     |
| P-066 | Jeonse Deposit vs Monthly Rent Cost Calculator     | 부동산·주거                | BLOCKED | HIGH     |
| P-067 | Home Purchase Total Cost Calculator                | 부동산·주거                | BLOCKED | HIGH     |
| P-068 | Home Sale Net Proceeds Calculator                  | 부동산·주거                | BLOCKED | HIGH     |
| P-069 | Rental Yield Calculator                            | 부동산·주거                | BLOCKED | HIGH     |
| P-070 | Apartment Management Fee Budget Calculator         | 부동산·주거                | BLOCKED | MEDIUM   |

## Tier B: Broad utility searches and personal-finance planning

| Task  | Calculator                               | Primary directory category | Status  | Priority |
| ----- | ---------------------------------------- | -------------------------- | ------- | -------- |
| P-071 | Percentage Calculator                    | 사업·생활                  | BLOCKED | HIGH     |
| P-072 | Discount Rate and Sale Price Calculator  | 사업·생활                  | BLOCKED | HIGH     |
| P-073 | Age Calculator                           | 사업·생활                  | BLOCKED | HIGH     |
| P-074 | D-Day Calculator                         | 사업·생활                  | BLOCKED | HIGH     |
| P-075 | Date Difference Calculator               | 사업·생활                  | BLOCKED | HIGH     |
| P-076 | Savings Goal Calculator                  | 저축·연금                  | BLOCKED | HIGH     |
| P-077 | Emergency Fund Calculator                | 저축·연금                  | BLOCKED | HIGH     |
| P-078 | FIRE Retirement Target Calculator        | 저축·연금                  | BLOCKED | HIGH     |
| P-079 | Retirement Withdrawal Calculator         | 저축·연금                  | BLOCKED | HIGH     |
| P-080 | Pension Future Monthly Income Calculator | 저축·연금                  | BLOCKED | HIGH     |
| P-081 | Dividend Reinvestment Calculator         | 투자                       | BLOCKED | MEDIUM   |
| P-082 | Portfolio Rebalancing Calculator         | 투자                       | BLOCKED | MEDIUM   |
| P-083 | Bond Yield to Maturity Calculator        | 투자                       | BLOCKED | MEDIUM   |
| P-084 | Bond Price Calculator                    | 투자                       | BLOCKED | MEDIUM   |
| P-085 | APR and APY Conversion Calculator        | 저축·연금                  | BLOCKED | MEDIUM   |

## Tier C: Emerging investment and small-business intent

| Task  | Calculator                                | Primary directory category | Status  | Priority |
| ----- | ----------------------------------------- | -------------------------- | ------- | -------- |
| P-086 | Cryptocurrency Average Cost Calculator    | 투자                       | BLOCKED | MEDIUM   |
| P-087 | Cryptocurrency Profit and Loss Calculator | 투자                       | BLOCKED | MEDIUM   |
| P-088 | Staking Reward Calculator                 | 투자                       | BLOCKED | MEDIUM   |
| P-089 | Dollar-Cost Averaging Calculator          | 투자                       | BLOCKED | HIGH     |
| P-090 | Foreign-Currency Average Cost Calculator  | 투자                       | BLOCKED | MEDIUM   |
| P-091 | Break-Even Sales Calculator               | 사업·생활                  | BLOCKED | MEDIUM   |
| P-092 | Gross Margin and Markup Calculator        | 사업·생활                  | BLOCKED | MEDIUM   |
| P-093 | Business Cash Runway Calculator           | 사업·생활                  | BLOCKED | MEDIUM   |

## 100-calculator completion rule

- P-045 through P-093 add exactly 49 calculators to the current verified total of 51.
- The milestone is complete only when production contains 100 distinct, usable calculators.
- Every new calculator must provide Korean and English routes, canonical and hreflang behavior, one-hop locale-less redirect, sitemap discovery, home search discovery, exactly one primary directory category, documented aliases, contextual related links, unique explanatory content, tests, manual verification, and desktop/mobile production evidence.
- Every new calculator must preserve the repeat-use promise: fast first calculation, clear reset and recalculation, stable result hierarchy, mobile-friendly input, and useful comparison/history/restoration behavior when the calculator's intent benefits from it. Do not add accounts or persistent sensitive-data storage merely to manufacture retention.
- Every new calculator must declare its currency class and follow UX-008: generic English monetary pages default to USD and support the shared eligible currency set, generic Korean monetary pages default to KRW, explicit supported choices persist locally, South Korea policy calculations remain explicitly KRW, and non-monetary pages do not add fake currency controls.
- Adding a calculator without category metadata or placing it in an uncategorized catch-all is a failed integration.
- After every four newly merged calculators, complete a production UX and directory regression before continuing expansion.
- Search Console performance data may reorder unstarted expansion tasks but must not silently delete the 100-calculator milestone.

---

# Phase 3: Whole-site SEO growth and AdSense readiness

SEO-003 Technical SEO and Indexability Audit — BLOCKED — HIGH
SEO-004 Calculator Content Depth and Trust Template — BLOCKED — HIGH
SEO-005 Search Intent and Metadata Optimization — BLOCKED — HIGH
SEO-006 Internal Linking and Topic Cluster Hubs — BLOCKED — HIGH
SEO-007 Core Web Vitals and Crawl Performance Audit — BLOCKED — HIGH
SEO-008 Search Console Query and Cannibalization Feedback Loop — BLOCKED — HIGH — compare against the 2026-07-29 baseline, evaluate canonical consolidation, identify query/page cannibalization, and reorder only unstarted expansion or optimization work.

ADS-001 AdSense Policy and Site Trust Readiness Audit — BLOCKED — HIGH
ADS-002 Original Guide and Decision-Support Content Program — BLOCKED — HIGH
ADS-003 Ad Placement Architecture Without Layout Shift — BLOCKED — HIGH
ADS-004 Consent and Regional Privacy Controls — BLOCKED — MEDIUM
ADS-005 AdSense Integration and ads.txt — BLOCKED — MEDIUM

## Final sequence

1. Complete the full 51-calculator UI/UX audit and categorized directory architecture.
2. Complete UX-008 so existing and future English pages use correct USD/KRW semantics.
3. Complete SEO-FIX-001 so new pages inherit one canonical host and locale architecture.
4. Add P-045 through P-093 using the data-informed acceleration order, then the remaining demand order.
5. Reach 100 distinct production calculators with recurring UX, directory, currency, and four-calculator Search Console feedback gates.
6. Run whole-site SEO optimization for top-ranking search goals.
7. Strengthen AdSense policy readiness and advertisement architecture.
