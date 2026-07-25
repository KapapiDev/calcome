# CalCome Calculator Directory Specification

## Purpose

Replace the flat all-calculators card wall with a scalable category-first directory before expanding from 51 to 100 calculators.

## Required information architecture

The localized calculator directory must provide:

- a prominent calculator search field
- Korean and English calculator-name and synonym matching
- category navigation for All, Employment and Payroll, Loans and Credit, Tax, Housing and Real Estate, Savings and Pension, Investment, Business, and General Utilities
- popular and recently added calculator sections
- category sections that initially expose a manageable subset rather than rendering every calculator as one undifferentiated grid
- clear links to a complete category view
- deterministic sorting such as Popular, Name, and Recently Added when supported by real data
- concise cards with calculator name, one-line purpose, category, and only meaningful badges
- responsive single-column mobile presentation and accessible category controls

## Category pages

Create localized category landing pages when implementation begins:

- `/ko/calculators/employment`
- `/ko/calculators/loans`
- `/ko/calculators/tax`
- `/ko/calculators/real-estate`
- `/ko/calculators/savings`
- `/ko/calculators/investment`
- `/ko/calculators/business`
- `/ko/calculators/utilities`

Provide corresponding English routes. Each category page must explain its purpose, expose popular calculators, distinguish similar tools, and link to relevant guides without generating filler.

## Data model requirements

The canonical calculator registry must support at least:

- stable ID
- localized name and description
- canonical route
- primary category
- search keywords and common synonyms
- optional popularity rank based on real usage data
- optional release or update date
- related calculator IDs

Every current calculator must belong to exactly one primary category. Secondary discovery may use related links or search keywords rather than duplicating canonical cards across every category.

## Search behavior

Search must handle common user language such as:

- 물타기 → stock average cost
- 복비 → real-estate brokerage fee
- 연봉 실수령 → net salary
- 주담대 → mortgage and mortgage-limit tools
- 3.3 → freelancer withholding tax
- 종부세 → comprehensive real-estate holding tax

Empty results must offer spelling recovery, category suggestions, or nearby calculators instead of a dead end.

## UX acceptance

- Users can locate a known calculator without scanning the entire inventory.
- A user can reach a relevant calculator within three meaningful interactions from the directory.
- Desktop and mobile layouts do not render 51 or 100 undifferentiated cards at once.
- Category and search state work with keyboard navigation, screen readers, light and dark modes, refresh, and browser back navigation.
- Korean and English category navigation preserve equivalent destinations.
- No calculator is orphaned or omitted from directory and search discovery.

## Expansion invariant

Every calculator added through P-045 to P-093 must declare category, localized search keywords, synonyms, and related calculators in the canonical registry. A new calculator task is incomplete if it appears only as another flat card or is missing from category discovery.
