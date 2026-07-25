# CalCome TASK_QUEUE

## Operating rules

- Complete exactly one task per scheduled execution.
- Reconcile this file with actual GitHub Pull Requests, branches, checks, and Vercel deployments before selecting work.
- GitHub state overrides stale queue text.
- Only the first effectively `OPEN` task may be selected.
- A task with a merged matching Pull Request is effectively `DONE`.
- A task with an open matching Pull Request is effectively `IN_REVIEW`.
- Keep only one task `OPEN`; later work remains `BLOCKED` until the previous task is completed in production.
- Priorities: critical correctness and UX blockers, SEO growth, AdSense readiness, then additional calculator expansion.

## Current product state

- P-001 through P-044 are merged in production.
- SEO-001 XML sitemap standardization is merged through PR #49.
- SEO-002 shared JSON-LD foundation is merged through PR #51.
- The static statuses in the previous queue were stale and did not reflect merged Pull Requests.
- P-041 through P-044 added four production calculators, so the next task is a required production UX audit before additional growth work.

## Completed calculator program

| Task range | Status | Evidence |
|---|---|---|
| P-001 | DONE | PR #35 merged |
| P-002 | DONE | PR #43 merged |
| P-003 | DONE | PR #58 merged |
| P-004 | DONE | PR #60 merged |
| P-005 | DONE | PR #46 merged |
| P-006 | DONE | PR #47 merged |
| P-007 | DONE | PR #48 merged |
| P-008 | DONE | PR #50 merged |
| P-009 | DONE | PR #52 merged |
| P-010 | DONE | PR #53 merged |
| P-011 | DONE | PR #54 merged |
| P-012 | DONE | PR #55 merged |
| P-013 | DONE | PR #56 merged |
| P-014 | DONE | PR #59 merged |
| P-015 | DONE | PR #61 merged |
| P-016 | DONE | PR #62 merged |
| P-017 | DONE | PR #63 merged |
| P-018 | DONE | PR #64 merged |
| P-019 | DONE | PR #65 merged |
| P-020 | DONE | PR #66 merged |
| P-021 | DONE | PR #67 merged |
| P-022 | DONE | PR #68 merged |
| P-023 | DONE | PR #69 merged |
| P-024 | DONE | PR #70 merged |
| P-025 | DONE | PR #71 merged |
| P-026 | DONE | PR #72 merged |
| P-027 | DONE | PR #73 merged |
| P-028 | DONE | PR #74 merged |
| P-029 | DONE | PR #75 merged |
| P-030 | DONE | PR #76 merged |
| P-031 | DONE | PR #77 merged |
| P-032 | DONE | PR #78 merged |
| P-033 | DONE | PR #79 merged |
| P-034 | DONE | PR #80 merged |
| P-035 | DONE | PR #81 merged |
| P-036 | DONE | PR #82 merged |
| P-037 | DONE | PR #83 merged |
| P-038 | DONE | PR #84 merged |
| P-039 | DONE | PR #85 merged |
| P-040 | DONE | PR #86 merged |
| P-041 | DONE | PR #87 merged |
| P-042 | DONE | PR #88 merged |
| P-043 | DONE | PR #89 merged |
| P-044 | DONE | PR #91 merged |

---

UX-001

Title: Production UX Audit After P-041 Through P-044

Status: OPEN

Priority: CRITICAL

Goal: Verify the newest four calculators and a representative site-wide flow on the public production site before further expansion.

Scope:

- Inspect P-041 stock average cost, P-042 stock profit and loss, P-043 dividend, and P-044 dividend yield.
- Test desktop and mobile entry from home and calculator directory, valid input, invalid input, reset, Korean and English switching, reload, back navigation, locale-less redirects, dark mode, keyboard focus, touch targets, long-number overflow, and result interpretation.
- Manually recalculate representative examples.
- Fix critical or high-impact defects in the same task.
- Record screenshots and exact production URLs when browser tooling permits.

Acceptance:

- No blocked user flow, incorrect result, broken locale switch, mobile overflow, inaccessible primary control, or production-only failure remains.
- `npm run check`, `npm run build`, and `git diff --check` pass.
- Production verification evidence is recorded.

---

SEO-003

Title: Technical SEO and Indexability Audit

Status: BLOCKED

Priority: HIGH

Goal: Ensure Google and Naver can crawl, canonicalize, and index every intended public page without duplicate-route ambiguity.

Scope:

- Audit robots, sitemap XML, canonical, hreflang, x-default, redirects, status codes, noindex directives, metadata-route ownership, and production origin consistency.
- Detect orphaned calculators, duplicate canonical targets, redirect chains, soft-404 behavior, preview or localhost URLs, and locale-less 200 aliases.
- Add automated regression tests and a production audit report.

Acceptance:

- Every published calculator has one Korean canonical, one English canonical, reciprocal hreflang, one-hop locale-less redirect, and sitemap inclusion.
- No unintended indexable duplicates or contradictory signals remain.

---

SEO-004

Title: Calculator Content Depth and Trust Template

Status: BLOCKED

Priority: HIGH

Goal: Reduce low-value-content risk by making calculator pages genuinely useful before and after calculation.

Scope:

- Define reusable page sections for what the result means, formula or method, worked example, assumptions, limitations, FAQ, related calculators, and source verification date.
- Audit existing calculators for thin or duplicated copy.
- Upgrade the highest-search-intent pages first without inventing legal, tax, pension, or financial policy.
- Preserve concise input-first usability while adding useful crawlable content below results.

Acceptance:

- Target pages contain unique, task-specific explanations and examples rather than boilerplate.
- Official sources and verification dates are present where policy or rates matter.
- Content remains readable on mobile and does not bury the calculator.

---

SEO-005

Title: Search Intent Metadata and Landing Page Optimization

Status: BLOCKED

Priority: HIGH

Goal: Align titles, descriptions, headings, and landing-page copy with real Korean and English calculator search intent.

Scope:

- Audit duplicate or generic titles and descriptions.
- Map one primary intent and a small set of supporting intents to each priority page.
- Improve home, calculator directory, employment, loan, tax, real-estate, and investment landing copy where supported by actual routes.
- Keep metadata natural and avoid keyword stuffing.

Acceptance:

- Priority pages have distinct titles, descriptions, H1s, and canonical intent.
- No duplicate metadata clusters remain among audited pages.

---

SEO-006

Title: Internal Linking and Topic Cluster Hubs

Status: BLOCKED

Priority: HIGH

Goal: Help users and crawlers move between related calculators while strengthening topical authority.

Scope:

- Build or improve category hubs for employment, loans, tax, real estate, savings, and investing.
- Add contextual related-calculator links based on user next steps, not arbitrary card grids.
- Prevent orphan pages and excessive repeated links.
- Include breadcrumbs and structured data only where accurate.

Acceptance:

- Every published calculator is reachable through a relevant hub and at least one contextual related link.
- Link labels explain the next user goal.

---

SEO-007

Title: Core Web Vitals and Crawl Performance Audit

Status: BLOCKED

Priority: MEDIUM

Goal: Improve mobile performance, layout stability, and crawl efficiency without degrading calculator UX.

Scope:

- Audit LCP, CLS, INP risks, client bundle weight, chart loading, fonts, images, animation, and hydration.
- Prioritize shared fixes with measurable impact.
- Preserve accessibility, dark mode, and calculation accuracy.

Acceptance:

- No known advertisement or UI placeholder causes layout shift.
- Heavy non-critical calculator visuals are deferred where safe.
- Before-and-after measurements are recorded.

---

ADS-001

Title: AdSense Policy and Site Trust Readiness Audit

Status: BLOCKED

Priority: HIGH

Goal: Remove policy and trust blockers before an AdSense application or re-review.

Scope:

- Audit About, Contact, Privacy Policy, Terms, cookie and consent disclosures, navigation clarity, authorship or editorial responsibility, source transparency, and misleading claims.
- Check for thin pages, unfinished pages, broken links, duplicated content, and unclear financial disclaimers.
- Do not claim approval certainty or fabricate business details.

Acceptance:

- Required trust pages are complete, linked globally, localized where appropriate, and consistent with actual site behavior.
- No obvious low-value, deceptive-navigation, or unfinished-site signals remain.

---

ADS-002

Title: Ad Placement Architecture Without Layout Shift

Status: BLOCKED

Priority: HIGH

Goal: Prepare safe responsive advertisement slots without harming calculation flow or Core Web Vitals.

Scope:

- Define reserved ad containers for desktop and mobile.
- Keep ads away from calculate, reset, input labels, validation messages, and primary results.
- Prevent accidental clicks, deceptive placement, sticky obstruction, and CLS.
- Keep ads disabled until valid publisher configuration is available.

Acceptance:

- Placeholder geometry is responsive and causes no measurable layout shift.
- Calculator interaction remains visually distinct from advertising.

---

ADS-003

Title: Consent and Regional Privacy Controls

Status: BLOCKED

Priority: MEDIUM

Goal: Support lawful ad and analytics behavior for international traffic.

Scope:

- Audit current cookies, analytics, storage, and third-party scripts.
- Add consent handling only for technologies actually used.
- Support regional requirements without blocking essential calculator functionality.

Acceptance:

- Consent state is accessible, reversible, and documented.
- Non-essential scripts respect the applicable consent state.

---

ADS-004

Title: AdSense Integration and ads.txt

Status: BLOCKED

Priority: MEDIUM

Dependency: Valid AdSense publisher ID and approved integration details supplied by the site owner.

Goal: Add production AdSense configuration only after credentials and approval-stage requirements are known.

Scope:

- Add verified publisher configuration, ads.txt, script loading, and environment safeguards.
- Never invent a publisher ID.
- Verify production response and prevent preview or local accidental ad serving.

Acceptance:

- ads.txt and page configuration use the exact verified publisher ID.
- Production-only behavior and failure-safe loading are tested.

---

P-045

Title: Investment Fee Impact Calculator

Status: BLOCKED

Priority: LOW

Reason: Additional calculator expansion is paused until UX-001 and the high-priority SEO and AdSense readiness program are completed.

---

P-046

Title: Inflation Calculator

Status: BLOCKED

Priority: LOW

---

P-047

Title: Currency Conversion Calculator

Status: BLOCKED

Priority: LOW

---

P-048

Title: Pension Savings Tax Credit Calculator

Status: BLOCKED

Priority: LOW

---

P-049

Title: ISA Tax Savings Calculator

Status: BLOCKED

Priority: LOW

---

P-050

Title: Retirement Pension Tax Credit Calculator

Status: BLOCKED

Priority: LOW
