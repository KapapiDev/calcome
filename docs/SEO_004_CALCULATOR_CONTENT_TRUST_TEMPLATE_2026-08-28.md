# SEO-004 Calculator Content Depth and Trust Template

Verified: 2026-08-28

## Goal

Establish a reusable calculator-content pattern that improves usefulness and trust without manufacturing authority signals, duplicating technical indexability work, or forcing generic claims onto policy-sensitive calculators.

## Template

`CalculatorContentGuide` provides a bilingual structure for:

1. how the calculation works;
2. a concrete worked example;
3. explicit assumptions;
4. limitations and checks the user should make;
5. a visible content-review date; and
6. optional primary-source links when a calculator depends on an external rule, rate, policy, or specification.

The source field is intentionally optional for timeless arithmetic. Policy-sensitive calculators remain governed by `AUTOMATION.md`: they must use current official primary sources, effective dates when available, and visible verification evidence rather than a generic trust badge.

## Trust semantics

- `Content reviewed` means the explanatory copy was reviewed on that date. It does not claim government approval, professional advice, or independent certification.
- Worked examples must be derived from the implemented formula and must not invent legal thresholds or market data.
- Assumptions and limitations should disclose material simplifications instead of hiding them in fine print.
- External sources should identify the actual primary source used for a policy or specification when one is required.
- The component does not add fake ratings, author credentials, review counts, or unsupported freshness claims.

## Initial adoption

The Business Cash Runway Calculator now uses the shared template as the canonical non-policy example. Its content explains the net-burn formula, includes a 120 / 30 / 50 worked example that produces 20 monthly net burn and 6 months of runway, states constant-cash-flow and same-currency assumptions, and discloses omitted one-off cash flows plus the average-month limitation in the projected cash-out date.

This task establishes the reusable template and regression coverage. It does not rewrite all 100 calculators with duplicated boilerplate in one change. Future content optimization should adopt the template where it adds calculator-specific value, while policy-sensitive pages must preserve their stronger official-source requirements.

## Regression coverage

`src/components/calculators/calculator-content-guide.test.tsx` verifies both supported languages, required depth sections, visible review dates, and optional source-link rendering.

## Result

SEO-004 is complete when the shared template, representative adoption, regression coverage, and `TASK_STATE.md` transition pass current-head CI and merge. The next task is SEO-005 Search Intent and Metadata Optimization.
