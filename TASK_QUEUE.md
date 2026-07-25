# CalCome TASK_QUEUE

## Operating rules

- Complete exactly one task per scheduled execution.
- Reconcile this queue with actual GitHub Pull Requests, branches, checks, and Vercel deployments before selecting work.
- GitHub and production state override stale queue text.
- Only the first effectively `OPEN` task may be selected.
- Keep exactly one task `OPEN`; all later work remains `BLOCKED` until the previous task passes production verification.
- Priority order: calculation correctness and critical UX, site-wide UI/UX consistency, technical SEO, content quality, AdSense readiness, then calculator expansion.
- Never publish a policy-sensitive calculator without official sources and a visible verification date.
- Never create a near-duplicate calculator merely to increase the count.

## Product milestone

- Published calculator registry: 50 calculators.
- Separately published P-044 Dividend Yield Calculator: 1 calculator.
- Current verified public total: **51 calculators**.
- Target: **100 public calculators**.
- Required expansion: **49 calculators**, represented by P-045 through P-093.
- P-001 through P-044 are merged and effectively `DONE`.
- SEO-001 XML sitemap and SEO-002 shared JSON-LD foundation are merged.
- Demand ordering is qualitative and documented in `QUEUE_RESEARCH_2026-07-25.md`; exact search volumes must not be invented.

## Completed calculator program

| Tasks | Status | Evidence |
|---|---|---|
| P-001 through P-043 | DONE | Matching merged PRs #35 through #89 |
| P-044 | DONE | PR #91 merged |

---

# Phase 1: Site-wide UI/UX audit

UX-001

Title: Shared Calculator Shell and Production Entry Audit

Status: OPEN

Priority: CRITICAL

Goal: Establish a verified inventory and shared UX baseline across all 51 public calculators before adding more pages.

Scope:

- Verify home search, calculator directory, category discovery, direct URL entry, locale-less redirects, Korean and English switching, theme persistence, refresh, back navigation, and URL restoration.
- Inspect shared calculator workspace, input controls, validation, reset, result scrolling, disclosures, tables, charts, mobile keyboard behavior, focus indicators, reduced motion, and long-number containment.
- Produce a route-by-route audit matrix with severity, reproduction steps, screenshots when possible, and reusable fixes.
- Fix shared critical defects in the same task; do not redesign without evidence.

Acceptance:

- Every published route is inventoried and reachable.
- No shared critical blocker remains.
- `npm run check`, `npm run build`, and `git diff --check` pass.
- Desktop and mobile production evidence is recorded.

---

UX-002

Title: Employment and Payroll Calculator UX Audit

Status: BLOCKED

Priority: CRITICAL

Scope: Audit every employment, salary, wage, benefit, leave, insurance, and pension calculator for input clarity, official-rate disclosure, result interpretation, mobile usability, accessibility, and bilingual consistency.

---

UX-003

Title: Loan and Credit Calculator UX Audit

Status: BLOCKED

Priority: CRITICAL

Scope: Audit every loan, mortgage, DSR, DTI, LTV, repayment, refinancing, credit-card, and affordability calculator, including amortization tables, comparison states, impossible-payment errors, and long schedules.

---

UX-004

Title: Tax and Payroll Filing Calculator UX Audit

Status: BLOCKED

Priority: CRITICAL

Scope: Audit VAT, withholding, comprehensive income, freelancer, property, acquisition, capital-gains, gift, inheritance, and holding-tax flows for source dates, assumptions, error prevention, result caveats, and user comprehension.

---

UX-005

Title: Housing and Real-Estate Calculator UX Audit

Status: BLOCKED

Priority: HIGH

Scope: Audit brokerage, rent conversion, jeonse-to-rent, housing payment, property-tax, and transaction-cost journeys across desktop and mobile.

---

UX-006

Title: Savings and Investment Calculator UX Audit

Status: BLOCKED

Priority: HIGH

Scope: Audit compound interest, savings, fixed deposit, CAGR, stocks, dividends, and investment-related flows, including charts, tables, result comparison, large values, and bilingual terminology.

---

UX-007

Title: Full-Site Accessibility and Visual Consistency Regression

Status: BLOCKED

Priority: HIGH

Scope:

- Run keyboard-only, focus-order, accessible-name, contrast, zoom, reduced-motion, touch-target, mobile overflow, light-mode, and dark-mode regression checks.
- Standardize only proven inconsistencies in typography, spacing, inputs, buttons, error messages, result hierarchy, tables, charts, and disclosures.
- Record shared UI rules to prevent future drift.

---

# Phase 2: SEO growth and AdSense readiness

SEO-003

Title: Technical SEO and Indexability Audit

Status: BLOCKED

Priority: HIGH

Scope: Audit robots, sitemap XML, canonical, hreflang, x-default, redirects, status codes, noindex, orphan routes, duplicate targets, soft 404s, and production-origin consistency.

---

SEO-004

Title: Calculator Content Depth and Trust Template

Status: BLOCKED

Priority: HIGH

Scope: Add unique result interpretation, method, worked example, assumptions, limitations, FAQ, official sources, verification dates, and useful related calculators without burying inputs.

---

SEO-005

Title: Search Intent and Metadata Optimization

Status: BLOCKED

Priority: HIGH

Scope: Map primary and supporting search intent to each priority page; eliminate duplicate titles, descriptions, H1s, generic copy, and keyword cannibalization.

---

SEO-006

Title: Internal Linking and Topic Cluster Hubs

Status: BLOCKED

Priority: HIGH

Scope: Build useful employment, tax, loan, housing, savings, investment, and business clusters; ensure every calculator has contextual inbound and next-step links.

---

SEO-007

Title: Core Web Vitals and Crawl Performance Audit

Status: BLOCKED

Priority: HIGH

Scope: Measure and improve LCP, CLS, INP, client bundles, charts, fonts, animation, hydration, and crawl efficiency while preserving calculator accuracy and accessibility.

---

SEO-008

Title: Search Console Query and Cannibalization Feedback Loop

Status: BLOCKED

Priority: HIGH

Dependency: Sufficient Google Search Console impression data.

Scope: Use real impressions, queries, positions, CTR, indexed-page status, and duplicate-page signals to reorder P-045 through P-093. Never claim exact search volume without an authorized data source.

---

ADS-001

Title: AdSense Policy and Site Trust Readiness Audit

Status: BLOCKED

Priority: HIGH

Scope: Audit About, Contact, Privacy, Terms, editorial responsibility, financial disclaimers, source transparency, broken links, thin pages, duplicate content, unfinished states, and deceptive-navigation risks.

---

ADS-002

Title: Original Guide and Decision-Support Content Program

Status: BLOCKED

Priority: HIGH

Goal: Reduce tool-site low-value-content risk with original textual resources that help users make financial decisions rather than merely repeat calculator descriptions.

Scope: Create evidence-based guides, worked scenarios, comparison pages, source methodology, update policy, and calculator-linked explanations. Avoid mass-generated filler and unsupported financial advice.

---

ADS-003

Title: Ad Placement Architecture Without Layout Shift

Status: BLOCKED

Priority: HIGH

Scope: Define responsive reserved ad containers away from inputs, validation, calculate/reset controls, and primary results; prevent accidental clicks, obstruction, and CLS. Keep ads disabled until valid configuration exists.

---

ADS-004

Title: Consent and Regional Privacy Controls

Status: BLOCKED

Priority: MEDIUM

Scope: Audit actual cookies, analytics, storage, and scripts; implement accessible and reversible consent only for technologies in use.

---

ADS-005

Title: AdSense Integration and ads.txt

Status: BLOCKED

Priority: MEDIUM

Dependency: Exact verified AdSense publisher ID and integration details supplied by the owner.

Scope: Add production-only configuration, ads.txt, safe script loading, and preview/local safeguards. Never invent a publisher ID.

---

# Phase 3: Expansion from 51 to 100 calculators

## Tier A: Highest commercial and recurring Korean intent

| Task | Calculator | Category | Status | Priority |
|---|---|---|---|---|
| P-045 | Investment Fee Impact Calculator | Investment | BLOCKED | HIGH |
| P-046 | Inflation and Purchasing Power Calculator | Savings | BLOCKED | HIGH |
| P-047 | Currency Conversion Calculator | Foreign exchange | BLOCKED | HIGH |
| P-048 | Pension Savings Tax Credit Calculator | Pension and tax | BLOCKED | HIGH |
| P-049 | ISA Tax Savings Calculator | Investment and tax | BLOCKED | HIGH |
| P-050 | Retirement Pension Tax Credit Calculator | Pension and tax | BLOCKED | HIGH |
| P-051 | Year-End Tax Settlement Refund Calculator | Payroll and tax | BLOCKED | HIGH |
| P-052 | Retirement Income Tax Calculator | Employment and tax | BLOCKED | HIGH |
| P-053 | Earned Income Withholding Tax Calculator | Payroll and tax | BLOCKED | HIGH |
| P-054 | Part-Time Monthly Pay Calculator | Employment | BLOCKED | HIGH |
| P-055 | Daily Worker Pay Calculator | Employment | BLOCKED | HIGH |
| P-056 | Weekly and Monthly Work-Hours Converter | Employment | BLOCKED | HIGH |
| P-057 | Job Offer Total Compensation Comparison Calculator | Employment | BLOCKED | HIGH |
| P-058 | Salary Negotiation Target Calculator | Employment | BLOCKED | HIGH |
| P-059 | Employer Total Labor Cost Calculator | Business and payroll | BLOCKED | HIGH |
| P-060 | Parental Leave Benefit Calculator | Employment benefits | BLOCKED | HIGH |
| P-061 | Maternity Leave Benefit Calculator | Employment benefits | BLOCKED | HIGH |
| P-062 | Stress DSR Calculator | Loan | BLOCKED | HIGH |
| P-063 | Mortgage Loan Limit Calculator | Loan and housing | BLOCKED | HIGH |
| P-064 | Jeonse Loan Limit Calculator | Loan and housing | BLOCKED | HIGH |
| P-065 | Rent Affordability Calculator | Housing | BLOCKED | HIGH |
| P-066 | Jeonse Deposit vs Monthly Rent Cost Calculator | Housing | BLOCKED | HIGH |
| P-067 | Home Purchase Total Cost Calculator | Real estate | BLOCKED | HIGH |
| P-068 | Home Sale Net Proceeds Calculator | Real estate | BLOCKED | HIGH |
| P-069 | Rental Yield Calculator | Real estate and investment | BLOCKED | HIGH |
| P-070 | Apartment Management Fee Budget Calculator | Housing | BLOCKED | MEDIUM |

## Tier B: Broad utility searches and personal-finance planning

| Task | Calculator | Category | Status | Priority |
|---|---|---|---|---|
| P-071 | Percentage Calculator | General utility | BLOCKED | HIGH |
| P-072 | Discount Rate and Sale Price Calculator | Shopping and utility | BLOCKED | HIGH |
| P-073 | Age Calculator | Date utility | BLOCKED | HIGH |
| P-074 | D-Day Calculator | Date utility | BLOCKED | HIGH |
| P-075 | Date Difference Calculator | Date utility | BLOCKED | HIGH |
| P-076 | Savings Goal Calculator | Savings | BLOCKED | HIGH |
| P-077 | Emergency Fund Calculator | Personal finance | BLOCKED | HIGH |
| P-078 | FIRE Retirement Target Calculator | Retirement | BLOCKED | HIGH |
| P-079 | Retirement Withdrawal Calculator | Retirement | BLOCKED | HIGH |
| P-080 | Pension Future Monthly Income Calculator | Pension | BLOCKED | HIGH |
| P-081 | Dividend Reinvestment Calculator | Investment | BLOCKED | MEDIUM |
| P-082 | Portfolio Rebalancing Calculator | Investment | BLOCKED | MEDIUM |
| P-083 | Bond Yield to Maturity Calculator | Investment | BLOCKED | MEDIUM |
| P-084 | Bond Price Calculator | Investment | BLOCKED | MEDIUM |
| P-085 | APR and APY Conversion Calculator | Interest | BLOCKED | MEDIUM |

## Tier C: Emerging investment and small-business intent

| Task | Calculator | Category | Status | Priority |
|---|---|---|---|---|
| P-086 | Cryptocurrency Average Cost Calculator | Digital assets | BLOCKED | MEDIUM |
| P-087 | Cryptocurrency Profit and Loss Calculator | Digital assets | BLOCKED | MEDIUM |
| P-088 | Staking Reward Calculator | Digital assets | BLOCKED | MEDIUM |
| P-089 | Dollar-Cost Averaging Calculator | Investment | BLOCKED | MEDIUM |
| P-090 | Foreign-Currency Average Cost Calculator | Foreign exchange | BLOCKED | MEDIUM |
| P-091 | Break-Even Sales Calculator | Small business | BLOCKED | MEDIUM |
| P-092 | Gross Margin and Markup Calculator | Small business | BLOCKED | MEDIUM |
| P-093 | Business Cash Runway Calculator | Small business | BLOCKED | MEDIUM |

## 100-calculator completion rule

- P-045 through P-093 add exactly 49 calculators to the current verified total of 51.
- The milestone is complete only when the public production inventory contains 100 distinct, usable calculators, not merely 100 task IDs or routes.
- Each new calculator must provide:
  - distinct user intent and non-duplicate calculation logic
  - Korean and English routes
  - canonical, reciprocal hreflang, and x-default behavior
  - one-hop locale-less redirect
  - sitemap and directory discovery
  - home or category search discovery
  - contextual related-calculator links
  - unique explanatory and worked-example content
  - official sources and verification date when policy-sensitive
  - calculation tests, validation tests, metadata tests, integration tests, and manual verification
  - desktop and mobile production UX evidence
- After every four newly merged calculators, insert and complete a production UX regression task before continuing expansion.
- Search Console performance data may reorder unstarted expansion tasks, but must not silently delete the 100-calculator milestone.
