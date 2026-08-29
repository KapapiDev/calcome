# PERF-001 Runtime Performance Regression

Verified: 2026-08-29

## Scope

Audit the shared 100-calculator directory/search surface for deterministic runtime work that scales with the full registry. No calculator formula, route, SEO metadata, accessibility contract, ad layout, or locale behavior is changed.

## Reproduced regressions

### Client search interaction

`CalculatorSearch` rebuilt and lowercased `name + description + keywords` for every calculator on every query change. At the 100-calculator milestone, each keystroke repeated 100 string joins and 100 locale-aware lowercasing operations before matching.

The searchable corpus is invariant for the lifetime of the passed calculator list, so this work belongs in a memoized index rather than the keystroke path.

Fix: build `{ calculator, searchableText }` once per calculator-list identity and make each query update perform only normalized-query creation plus substring checks.

### English directory server render

`/en/calculators` localized the complete search registry for the search component, then each rendered category card performed a linear `directorySearchCalculators.find(...)` and localized the same calculator again.

With 100 published calculators, that produced repeated linear registry scans while rendering the directory and duplicated English transformation work for the same records.

Fix: create the English localized directory once at module scope and index it by calculator ID. Search and category cards now reuse the same objects, while card lookup is constant-time by ID.

## Preserved invariants

- 100 published calculators remain unchanged.
- Korean and English canonical routes remain unchanged.
- Search matching semantics remain case-insensitive and preserve Korean partial/alias matching.
- Directory categories, card order, structured data, hreflang/canonical behavior, accessibility labels, and ad layout are unchanged.
- No new dependency or client-visible feature is introduced.

## Validation gate

The runtime container attempted a fresh repository clone before remote writes but could not resolve `github.com`, so local npm execution was unavailable in this run. Current-head GitHub Actions remains mandatory before merge and must pass dependency audit, lint, typecheck, format, task-state validation, tests, and production build.
