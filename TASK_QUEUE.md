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

## Product milestone

- Current verified public total: **51 calculators**.
- Target: **100 public calculators**.
- Required expansion: **49 calculators**, represented by P-045 through P-093.
- P-001 through P-044 are merged and effectively `DONE`.
- SEO-001 XML sitemap and SEO-002 shared JSON-LD foundation are merged.
- Demand ordering is qualitative and documented in `QUEUE_RESEARCH_2026-07-25.md`; exact search volumes must not be invented.

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

Status: OPEN

Priority: CRITICAL

Scope: Audit every loan, mortgage, DSR, DTI, LTV, repayment, refinancing, credit-card, and affordability calculator, including amortization tables, comparison states, impossible-payment errors, long schedules, and correct directory placement.

---

UX-004

Title: Tax and Payroll Filing Calculator UX Audit

Status: BLOCKED

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

Scope: Audit compound interest, savings, fixed deposit, CAGR, stocks, dividends, and investment-related flows, including charts, tables, result comparison, large values, bilingual terminology, and category discovery.

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

# Phase 2: Expansion from 51 to 100 calculators

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
| P-089 | Dollar-Cost Averaging Calculator          | 투자                       | BLOCKED | MEDIUM   |
| P-090 | Foreign-Currency Average Cost Calculator  | 투자                       | BLOCKED | MEDIUM   |
| P-091 | Break-Even Sales Calculator               | 사업·생활                  | BLOCKED | MEDIUM   |
| P-092 | Gross Margin and Markup Calculator        | 사업·생활                  | BLOCKED | MEDIUM   |
| P-093 | Business Cash Runway Calculator           | 사업·생활                  | BLOCKED | MEDIUM   |

## 100-calculator completion rule

- P-045 through P-093 add exactly 49 calculators to the current verified total of 51.
- The milestone is complete only when production contains 100 distinct, usable calculators.
- Every new calculator must provide Korean and English routes, canonical and hreflang behavior, one-hop locale-less redirect, sitemap discovery, home search discovery, exactly one primary directory category, documented aliases, contextual related links, unique explanatory content, tests, manual verification, and desktop/mobile production evidence.
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
SEO-008 Search Console Query and Cannibalization Feedback Loop — BLOCKED — HIGH

ADS-001 AdSense Policy and Site Trust Readiness Audit — BLOCKED — HIGH
ADS-002 Original Guide and Decision-Support Content Program — BLOCKED — HIGH
ADS-003 Ad Placement Architecture Without Layout Shift — BLOCKED — HIGH
ADS-004 Consent and Regional Privacy Controls — BLOCKED — MEDIUM
ADS-005 AdSense Integration and ads.txt — BLOCKED — MEDIUM

## Final sequence

1. Complete the full 51-calculator UI/UX audit and categorized directory architecture.
2. Apply the verified shared UX and directory rules while adding P-045 through P-093 in demand order.
3. Reach 100 distinct production calculators with recurring UX and directory regression gates.
4. Run whole-site SEO optimization for top-ranking search goals.
5. Strengthen AdSense policy readiness and advertisement architecture.
