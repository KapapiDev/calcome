# CalCome 100-Calculator Queue Research

Verified: 2026-07-25

## Current inventory

- `src/config/calculators.ts` contains 50 published calculator entries.
- P-044 Dividend Yield Calculator is separately published and merged through PR #91.
- Current public target count: 51 calculators.
- Remaining calculators required for the 100-calculator milestone: 49.

## Prioritization method

The expansion backlog uses qualitative demand tiers rather than invented monthly search volumes.

Signals considered:

- repeated prominence in Korean calculator search results and competing Korean calculator hubs
- presence in major search-engine built-in calculator experiences
- commercial intent and advertiser relevance
- recurring Korean payroll, tax, loan, housing, savings, and investment decisions
- seasonal search demand such as year-end tax settlement
- ability to provide a distinct calculation instead of a thin duplicate
- availability of official sources for policy-sensitive calculations

Exact keyword volumes must be validated later with Search Console impressions and an authorized keyword-planning source. Queue order may be adjusted using real performance data after indexing.

## Guardrails

- Do not publish a policy-sensitive calculator without official sources and a verification date.
- Do not add near-duplicate calculators merely to reach the count.
- Every new calculator must include Korean and English routes, canonical and hreflang metadata, sitemap registration, a locale-less redirect, search discovery, contextual related links, useful explanatory content, and production UX verification.
- Calculator count must not outrank correctness, site-wide UX, technical SEO, content quality, or AdSense readiness.
