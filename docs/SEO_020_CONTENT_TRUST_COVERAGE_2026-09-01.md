# SEO-020 Post-100 Content Trust Template Coverage Regression

Verified: 2026-09-01

## Audit conclusion

CalCome's existing `CalculatorContentGuide` remains the correct reusable trust/depth pattern for calculator-specific explanatory content. It exposes calculation method, a worked example, assumptions, limitations/checks, a visible review date, and optional sources.

A blanket insertion across all 100 calculators is intentionally not performed. The template should be used where calculator-specific depth adds real value, while policy-sensitive calculators must continue to use current official primary sources and their stronger verification rules instead of receiving generic or unverified trust copy.

The established Business Cash Runway Calculator remains the representative published adoption. Its current use provides every required trust signal without changing calculation logic.

## Regression coverage

`src/config/calculator-content-trust-coverage.test.ts` now audits the published calculator source graph and fails when:

- the shared template loses method, example, assumption, limitation, or review-date semantics;
- the visible review date stops using semantic `<time dateTime>` markup;
- the established Business Cash Runway adoption disappears from the published calculator graph; or
- any published calculator starts using `CalculatorContentGuide` without all required trust props.

This keeps future adoption complete without forcing boilerplate, fabricated authority, or unverified policy-sensitive claims.

## Product impact

No calculator formulas, rates, thresholds, routes, metadata, structured data, currency semantics, or stored user data are changed by SEO-020.
