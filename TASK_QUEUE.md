# CalCome TASK_QUEUE

## Operating rules

- Complete exactly one task per scheduled execution.
- Reconcile this queue with actual GitHub Pull Requests, branches, checks, Vercel deployments, and observed production behavior before selecting work.
- GitHub and production state override stale queue text.
- Only the first effectively `OPEN` task may be selected.
- Keep exactly one task `OPEN`; later work remains `BLOCKED` until the previous task is reconciled according to `AUTOMATION.md`.
- Priority order: calculation correctness and critical UX, production/release integrity, site-wide UI/UX consistency, calculator expansion, technical SEO, content quality, then AdSense readiness.
- A confirmed production route, locale, sitemap, canonical, Soft 404, or indexability regression may be inserted ahead of calculator expansion without deleting or narrowing the 100-calculator milestone.
- External Preview or Production inspection/deployment limits alone must not freeze the queue indefinitely; follow the continuity rules in `AUTOMATION.md`, record the limitation, and never invent a product failure from an environment failure.
- Never publish a policy-sensitive calculator without official sources and a visible verification date.
- Never create a near-duplicate calculator merely to increase the count.
- Product strategy: win search coverage through a large inventory of genuinely distinct calculators, then earn repeat use through fast, accurate calculations, clean bilingual UX, predictable interaction patterns, and contextual discovery between related calculators.
- Search Console data may reorder unstarted work and trigger bounded technical fixes, but it must not replace the 100-calculator milestone with a narrow single-topic strategy.
- Currency semantics follow calculator intent, not language replacement alone: generic English financial calculators default to USD while offering major reusable currency choices, generic Korean calculators default to KRW, currency-neutral calculators expose a sensible currency choice when amounts are displayed, and South Korea policy calculators remain KRW with explicit South Korea/KRW labeling in English.

## Product milestone

- Repository `main` currently registers **55 calculators** through the public calculator source of truth.
- Production review on 2026-08-24 observed **53 calculators** in the live directory, so release drift must be reconciled before treating the live count as current.
- Target: **100 distinct production calculators**.
- Original expansion program: P-045 through P-093 adds 49 calculators to the original verified baseline of 51.
- Completed expansion tasks on `main`: **P-089, P-062, P-063, and P-076**.
- Remaining expansion tasks after those four: **45 calculators**.
- P-001 through P-044 are merged and effectively `DONE`.
- SEO-001 XML sitemap and SEO-002 shared JSON-LD foundation are merged.
- Demand ordering is qualitative and documented in `QUEUE_RESEARCH_2026-07-25.md`; exact search volumes must not be invented.
- Search Console baseline exported 2026-07-29: 281 impressions, 1 click, 108 surfaced queries, 38 countries, and first recorded impressions on 2026-07-15. Treat this as an early directional signal, not proof that the broad-inventory strategy should be narrowed.
- The 2026-08-08 Page Indexing baseline recorded 48 indexed and 85 unindexed pages, including 5 `Not found (404)`, 25 `Discovered - currently not indexed`, 17 redirect pages, and 1 `Crawled - currently not indexed`.
- On 2026-08-23 Search Console sent new notifications that sitemap-included CalCome pages and site pages were excluded for `Soft 404`; classify the current affected URLs before changing behavior.
- Early non-brand clusters are CAGR and compound growth, stock average cost, loan comparison and affordability, LTV, and employment/payroll. Use them to accelerate adjacent work while continuing broad inventory growth.

## Completed calculator program

| Tasks               | Status | Evidence                            |
| ------------------- | ------ | ----------------------------------- |
| P-001 through P-043 | DONE   | Matching merged PRs #35 through #89 |
| P-044               | DONE   | PR #91 merged                       |
| P-089               | DONE   | Main commit `1bc45d7`               |
| P-062               | DONE   | Main commit `db16dbf`               |
| P-063               | DONE   | Main commit `a3b5e86`               |
| P-076               | DONE   | Main commit `be8e797`               |

---

# Phase 1: Site-wide UI/UX audit and directory architecture

UX-001

Title: Shared Calculator Shell, Categorized Directory, and Production Entry Audit

Status: DONE

Priority: CRITICAL

Goal: Establish a verified shared UX baseline across all public calculators and replace the flat all-calculator wall with a scalable category-based directory before adding more pages.

Scope:

- Verify home search, calculator directory, category discovery, direct URL entry, locale-less redirects, Korean and English switching, theme persistence, refresh, back navigation, and URL restoration.
- Inspect shared calculator workspace, input controls, validation, reset, result scrolling, disclosures, tables, charts, mobile keyboard behavior, focus indicators, reduced motion, and long-number containment.
- Rebuild the `모든 계산기` experience so calculators are organized by clear user-goal categories instead of rendering all cards as one undifferentiated grid.
- Use the initial category model: `급여·근로`, `대출·신용`, `세금`, `부동산·주거`, `저축·연금`, `투자`, `사업·생활`.
- Add category navigation near the top of the directory. On mobile it must remain usable without wrapping into an unreadable control wall.
- Keep a prominent calculator search that matches calculator names, common abbreviations, synonyms, and colloquial terms such as `주담대`, `복비`, `물타기`, `연봉 실수령`, and `3.3`.
- Show a concise popular-calculator section and category sections with meaningful headings, descriptions, counts, and predictable ordering.
- Avoid rendering the complete present or future inventory as one uninterrupted card grid on initial view.
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
- Desktop and mobile production evidence is recorded when reachable.

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

Status: DONE

Priority: CRITICAL

Scope: Audit VAT, withholding, comprehensive income, freelancer, property, acquisition, capital-gains, gift, inheritance, and holding-tax flows for source dates, assumptions, error prevention, result caveats, user comprehension, and correct directory placement.

Evidence: PRs #135 through #146 audited and hardened all 10 tax and filing calculators, including invalid-resubmission state clearing, validation accessibility, representative calculation checks, exact-head GitHub Actions, and Vercel Preview evidence.

---

UX-005

Title: Housing and Real-Estate Calculator UX Audit

Status: DONE

Priority: HIGH

Scope: Audit brokerage, rent conversion, jeonse-to-rent, housing payment, property-tax, and transaction-cost journeys across desktop and mobile, including category discovery.

Evidence: PRs #147 through #150 completed the housing and real-estate audit, including validation-state hardening, representative calculation checks, and final completion reconciliation.

---

UX-006

Title: Savings and Investment Calculator UX Audit

Status: DONE

Priority: HIGH

Scope: Audit compound interest, savings, fixed deposit, CAGR, stocks, dividends, and investment-related flows, including charts, tables, result comparison, large values, bilingual terminology, and category discovery. Search Console makes CAGR and stock-average-cost the first two audit targets: verify their canonical locale routes, metadata, related-calculator paths, result clarity, comparison depth, and repeat-use flow without delaying completion of the remaining category audit.

Evidence: PRs #151–#153 and #161, #166–#168 completed the savings and investment audit across CAGR, stocks, compound interest, fixed deposit, dividends, and savings, including stale-result handling and accessibility hardening.

---

UX-007

Title: Full-Site Accessibility and Visual Consistency Regression

Status: BLOCKED

Priority: HIGH

Scope:

- Run keyboard-only, focus-order, accessible-name, contrast, zoom, reduced-motion, touch-target, mobile overflow, light-mode, and dark-mode regression checks.
- Standardize only proven inconsistencies in typography, spacing, inputs, buttons, error messages, result hierarchy, tables, charts, disclosures, directory cards, category controls, and search states.
- Include the post-fix home, bilingual navigation, related-calculator graph, and all currently published calculator families so new fixes do not create visual or accessibility drift.
- Record shared UI rules to prevent future drift.

---

UX-008

Title: Bilingual Currency Semantics and Money Formatting Audit

Status: DONE

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
- `npm run check`, `npm run build`, focused currency tests, and `git diff --check` pass.

Evidence: UX-008 changes were merged across the shared currency-selector work and calculator-specific scope passes from PR/commit series #210 through #259, including generic USD-default reusable currency selection and explicit South Korea/KRW labeling. The 2026-08-24 live review reconfirmed representative generic and South Korea policy-specific behavior.

---

# Phase 1.25: Release, bilingual routing, and indexability repair before further expansion

OPS-001

Title: Production/Main Release Drift Reconciliation

Status: OPEN

Priority: CRITICAL

Trigger evidence:

- Repository `main` at commit `be8e797df374b267a422f3b54cec7ba564e0712e` registers 55 calculators.
- The 2026-08-24 live directory review exposed 53 calculators, with `Mortgage Loan Limit` and `Savings Goal` present on `main` but not observed in the live directory.
- Vercel bot comments on the P-063 and P-076 work recorded successful Preview deployments followed by Hobby-plan `api-deployments-free-per-day` rate-limit failures, so release drift must be distinguished from application-code failure.

Scope:

- Reconcile latest GitHub `main`, public calculator registry, sitemap source, live directory, direct calculator routes, and the production deployment/alias SHA.
- Determine whether P-063 and P-076 are missing only from the directory, missing from production entirely, or present behind a stale production alias.
- Inspect Vercel through the connected plugin first. If project listing is empty or returns 403/404, retry using the known CalCome team, project ID, deployment URL/ID, Vercel bot comment, and GitHub head/merge SHA before classifying the limitation.
- If a real repository or deployment configuration defect prevents current `main` from reaching production, fix the shared root cause without reverting already merged calculators.
- If the only blocker is an external free-plan deployment quota or inspection limitation, record it under the continuity rules in `AUTOMATION.md`; do not create duplicate implementation work or falsely mark application code broken.
- Add or strengthen repository-side release/source-of-truth checks where useful so public registry, directory, sitemap, and redirect coverage cannot silently disagree.

Acceptance:

- The source-of-truth calculator count is deterministic and the live count is explained.
- Every calculator registered as public on `main` has a canonical Korean and English route, correct directory/search registration, sitemap inclusion, and redirect coverage in repository tests.
- Production is either confirmed on the intended latest deployable `main` state or the exact external deployment limitation is documented with no unresolved application defect.
- No calculator is removed or duplicated merely to make counts match.
- `npm run check`, `npm run build`, relevant registry/sitemap/route tests, and `git diff --check` pass for any code change.

---

UX-009

Title: Global Locale Routing and English Surface Integrity

Status: BLOCKED

Priority: CRITICAL

Trigger evidence:

- The 2026-08-24 live review found the homepage `English` action reaching `/en` and returning to the Korean root experience instead of preserving an English home context.
- English calculator pages were observed linking global destinations such as Calculators, About, Privacy, Terms, and Contact back to Korean/non-locale pages.
- English server-rendered output was observed containing the Korean fallback string `페이지를 불러오는 중입니다.`.
- The previously confirmed weekly-holiday-pay calculator identity-switch bug is now fixed, so this task must preserve that improvement while closing the remaining shared locale gaps.

Scope:

- Audit and fix locale preservation across `/ko`, `/en`, home, calculator directory, every public calculator, About, Privacy, Terms, Contact, header, footer, breadcrumbs, related links, and loading/fallback surfaces.
- Language switching must preserve the current page identity whenever an equivalent locale route exists; never fall through to an unrelated calculator.
- Global navigation from an English route must remain in the English surface unless the user explicitly switches locale.
- The language control must clearly reflect the current locale and intended switch action without leaving a stale Korean label after entering English.
- Remove unintended Korean strings from English server-rendered HTML, loading states, metadata, structured data, and shared accessibility labels except where Korean terminology is intentionally being explained.
- Build a data-driven route matrix for every public calculator and static page so new pages cannot ship without a valid reciprocal locale target.
- Preserve canonical, hreflang, x-default, sitemap, and locale-less redirect invariants from SEO-FIX-001.

Acceptance:

- `/en` is a stable English entry surface and does not silently collapse to the Korean home experience.
- Every English global navigation and static-page link retains English locale context.
- Every public calculator passes KO→EN→KO identity round-trip coverage.
- No shared English SSR/loading surface contains unintended Korean UI copy.
- Unknown locale routes still fail correctly rather than redirecting to an unrelated page.
- Representative desktop and mobile navigation flows pass when browser access is available.
- `npm run check`, `npm run build`, full locale-route regression tests, metadata/hreflang tests, and `git diff --check` pass.

---

SEO-FIX-002

Title: Search Console Soft 404, 404, and Indexability Reconciliation

Status: BLOCKED

Priority: CRITICAL

Trigger evidence:

- Search Console notifications dated 2026-08-23 reported a new `Soft 404` exclusion reason for CalCome pages and for pages included in the sitemap.
- The 2026-08-08 baseline reported 48 indexed and 85 unindexed pages, including 5 404s, 25 discovered-not-indexed pages, 17 redirect pages, and 1 crawled-not-indexed page.
- The user subsequently observed 51 unindexed pages. This count must be classified by reason; it must not be interpreted as 51 valid calculators being rejected without URL-level evidence.

Scope:

- Inventory the current Search Console exclusion categories and, when URL examples are available, map every affected URL to canonical public page, intended redirect, legitimate 404, duplicate/noncanonical URL, or suspicious Soft 404.
- Treat redirect and duplicate exclusions as potentially correct behavior when they point to the intended canonical URL; do not “fix” correct exclusions by making duplicates indexable.
- Every URL emitted by the current sitemap must return a meaningful canonical page with a successful status, substantive page content, self-referencing canonical, correct hreflang cluster, and internal discovery path.
- Unknown/deleted routes with no replacement must return a true 404/410 rather than a thin `200` shell or unrelated homepage redirect.
- Detect catch-all routing, stale static generation, loading-only HTML, missing calculator content, or deployment drift that could cause a valid canonical URL to look empty to Google.
- Reconcile sitemap entries against the same public calculator source of truth used by directory and route tests.
- Compare the current exclusion set against the 2026-08-08 baseline and explicitly separate historical URL cleanup from active defects.
- Fix shared root causes in one bounded task rather than opening one task per affected URL.

Acceptance:

- No current canonical sitemap URL is a true or Soft 404 under reproducible inspection.
- Legitimate redirect/duplicate exclusions remain non-indexable and resolve to the intended canonical target.
- Legitimate missing pages return 404/410 and are absent from sitemap/internal canonical links.
- The report identifies which part of the remaining unindexed count is expected cleanup versus actionable indexing failure.
- Representative canonical URLs across employment, loan, tax, housing, savings, and investment families pass status, canonical, hreflang, structured-data, and substantive-content checks.
- `npm run check`, `npm run build`, sitemap/canonical/route tests, and `git diff --check` pass.

---

UX-010

Title: Contextual Related Calculators and Home Category Entry

Status: BLOCKED

Priority: HIGH

Goal: Turn the growing calculator inventory from isolated pages into a coherent discovery graph without cluttering the minimalist home experience or creating duplicate indexable category/filter URLs.

Scope:

- Add concise category entry points near the home search for `급여·근로`, `대출·신용`, `세금`, `부동산·주거`, `저축·연금`, `투자`, and future visible `사업·생활`, with localized English equivalents.
- Keep category counts and links derived from the calculator directory source of truth.
- Replace placeholder or empty related-calculator sections with contextual, data-driven recommendations that preserve locale.
- Prioritize meaningful user journeys such as compound interest → savings/deposit/savings goal/CAGR/DCA and loan → LTV/DSR/Stress DSR/mortgage limit/refinancing.
- Avoid reciprocal-link spam, duplicate cards, giant page-end walls, and keyword-stuffed anchor text.
- Ensure every published calculator has useful inbound discovery from directory/search and at least one contextual path where semantically appropriate.
- Preserve canonical URLs; category controls, anchors, or filters must not create new indexable duplicates.
- Keep the home visually minimal: category entry improves orientation and perceived inventory depth without turning the hero into a control dashboard.

Acceptance:

- Home users can enter a major calculator category without opening the complete directory first.
- Related-calculator sections show real, localized targets and never link English users into Korean pages accidentally.
- Related links are deterministic, source-driven, and covered by tests so a removed/renamed calculator cannot leave broken recommendations.
- Calculator pages form clear topic journeys rather than isolated SEO islands.
- No new duplicate canonical/filter URLs are introduced.
- Desktop/mobile and keyboard navigation remain usable.
- `npm run check`, `npm run build`, internal-link integrity tests, directory tests, and `git diff --check` pass.

---

# Phase 1.5: Search index consolidation before expansion

SEO-FIX-001

Title: Canonical Host, Locale Route, Hreflang, and Sitemap Consolidation

Status: DONE

Priority: CRITICAL

Trigger evidence:

- The 2026-08-08 Search Console Page Indexing screenshot reports 48 indexed pages and 85 unindexed pages, including 5 `Not found (404)`, 25 `Discovered - currently not indexed`, 17 redirect pages, and 1 `Crawled - currently not indexed`. The screenshot provides counts rather than example URLs, so reproduce and classify repository URLs before changing behavior.
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
- Every public calculator remains discoverable in both languages and language switching preserves calculator identity.
- `npm run check`, `npm run build`, redirect/canonical/hreflang tests, sitemap tests, and `git diff --check` pass.
- Desktop and mobile production verification covers home, directory, CAGR, stock average cost, loan comparison, and one employment calculator when reachable.

Evidence: PRs #203–#209 consolidated temporary and missing redirects, canonical root aliases, the `www` host, static-page language links, sitemap `x-default`, and the shared public sitemap source. Repository integration tests now cross-check every public calculator against locale-less and apex one-hop redirects; lint, typecheck, format, all tests, production builds, and diff checks passed. External production inspection was not used as a completion gate under the current automation rules.

---

# Phase 2: Expansion from 55 repository calculators to 100 production calculators

## Data-informed execution order

The original 49-calculator expansion inventory remains intact. Four acceleration tasks are already merged on `main`:

1. P-089 Dollar-Cost Averaging Calculator — DONE.
2. P-062 Stress DSR Calculator — DONE.
3. P-063 Mortgage Loan Limit Calculator — DONE on `main`; production presence is reconciled by OPS-001.
4. P-076 Savings Goal Calculator — DONE on `main`; production presence is reconciled by OPS-001.

The review/fix phase above serves as the required post-four-calculator production, Search Console, and directory regression gate. After OPS-001, UX-009, SEO-FIX-002, UX-010, and UX-007 are complete or externally reconciled under `AUTOMATION.md`, resume expansion with:

1. P-045 Investment Fee Impact Calculator.
2. Remaining Tier A tasks in demand order, subject to fresh Search Console evidence.
3. Tier B and Tier C tasks.

After every four additional merged calculators, use fresh Search Console query/page/country/device data to reorder only tasks that are still unstarted. Record the evidence and keep one task OPEN; never remove committed calculators solely because early data is sparse.

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
| P-062 | Stress DSR Calculator                              | 대출·신용                  | DONE    | HIGH     |
| P-063 | Mortgage Loan Limit Calculator                     | 대출·신용                  | DONE    | HIGH     |
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
| P-076 | Savings Goal Calculator                  | 저축·연금                  | DONE    | HIGH     |
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
| P-089 | Dollar-Cost Averaging Calculator          | 투자                       | DONE    | HIGH     |
| P-090 | Foreign-Currency Average Cost Calculator  | 투자                       | BLOCKED | MEDIUM   |
| P-091 | Break-Even Sales Calculator               | 사업·생활                  | BLOCKED | MEDIUM   |
| P-092 | Gross Margin and Markup Calculator        | 사업·생활                  | BLOCKED | MEDIUM   |
| P-093 | Business Cash Runway Calculator           | 사업·생활                  | BLOCKED | MEDIUM   |

## 100-calculator completion rule

- P-045 through P-093 represent the committed 49-calculator expansion program; four are already merged and 45 remain.
- The milestone is complete only when production contains 100 distinct, usable calculators.
- Every new calculator must provide Korean and English routes, canonical and hreflang behavior, one-hop locale-less redirect, sitemap discovery, home search discovery, exactly one primary directory category, documented aliases, contextual related links, unique explanatory content, tests, manual verification, and desktop/mobile production evidence when reachable.
- Every new calculator must preserve the repeat-use promise: fast first calculation, clear reset and recalculation, stable result hierarchy, mobile-friendly input, and useful comparison/history/restoration behavior when the calculator's intent benefits from it. Do not add accounts or persistent sensitive-data storage merely to manufacture retention.
- Every new calculator must declare its currency class and follow UX-008: generic English monetary pages default to USD and support the shared eligible currency set, generic Korean monetary pages default to KRW, explicit supported choices persist locally, South Korea policy calculations remain explicitly KRW, and non-monetary pages do not add fake currency controls.
- Every new calculator must be covered by the locale-route matrix from UX-009 and must not introduce untranslated English-surface fallback UI.
- Adding a calculator without category metadata or placing it in an uncategorized catch-all is a failed integration.
- After every four newly merged calculators, complete a production UX, locale, directory, and Search Console/indexability regression before continuing expansion.
- Search Console performance data may reorder unstarted expansion tasks but must not silently delete the 100-calculator milestone.

---

# Phase 3: Whole-site SEO growth and AdSense readiness

SEO-003 Technical SEO and Indexability Audit — BLOCKED — HIGH — run after SEO-FIX-002; do not duplicate already-correct redirect/canonical cleanup.
SEO-004 Calculator Content Depth and Trust Template — BLOCKED — HIGH
SEO-005 Search Intent and Metadata Optimization — BLOCKED — HIGH
SEO-006 Internal Linking and Topic Cluster Hubs — BLOCKED — HIGH — build on UX-010's source-driven related links and expand only where Search Console evidence justifies deeper hubs.
SEO-007 Core Web Vitals and Crawl Performance Audit — BLOCKED — HIGH
SEO-008 Search Console Query and Cannibalization Feedback Loop — BLOCKED — HIGH — compare against the 2026-07-29 and 2026-08-08 baselines, evaluate canonical consolidation and Soft 404 recovery, identify query/page cannibalization, and reorder only unstarted expansion or optimization work.

ADS-001 AdSense Policy and Site Trust Readiness Audit — BLOCKED — HIGH
ADS-002 Original Guide and Decision-Support Content Program — BLOCKED — HIGH
ADS-003 Ad Placement Architecture Without Layout Shift — BLOCKED — HIGH
ADS-004 Consent and Regional Privacy Controls — BLOCKED — MEDIUM
ADS-005 AdSense Integration and ads.txt — BLOCKED — MEDIUM

## Final sequence

1. Complete OPS-001 and reconcile repository `main` with observed Production without confusing external Vercel limits with application defects.
2. Complete UX-009 so `/en`, global navigation, static pages, calculator switching, and English SSR remain consistently English and preserve page identity.
3. Complete SEO-FIX-002 and classify the current Search Console exclusions, fixing active Soft 404/404/sitemap defects while leaving legitimate redirects/duplicates excluded.
4. Complete UX-010 to create source-driven home category entry and contextual related-calculator journeys.
5. Complete UX-007 as a whole-site post-fix accessibility and visual regression gate.
6. Resume P-045 through P-093, skipping the four already-DONE tasks and preserving the 100-calculator target.
7. After every four additional calculators, run fresh Search Console, locale, directory, and production-regression feedback before the next batch.
8. Run whole-site SEO optimization for top-ranking search goals.
9. Strengthen AdSense policy readiness and advertisement architecture.
