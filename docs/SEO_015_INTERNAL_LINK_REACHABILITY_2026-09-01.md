# SEO-015 Internal-Link Reachability Audit

Verified: 2026-09-01

## Scope

Audit the 100-calculator bilingual inventory for deterministic discovery from the shared calculator directory/category source, shared search inventory, and the canonical sitemap source used by Korean and English calculator routes.

## Result

No source-level orphaned calculator was found on current `main`.

The published calculator inventory, directory category assignments, and directory/search inventory resolve to the same 100 stable calculator IDs. Each published Korean calculator href is unique, each search entry points to the same canonical Korean href, and each canonical Korean href deterministically produces the paired English href in the shared sitemap source.

Because no proven orphaned or unnecessarily deep calculator route was found, this task does not add speculative navigation links or alter calculator formulas, public URLs, policy-sensitive values, stored-data behavior, canonical metadata, or hreflang behavior.

## Regression guard

`src/config/calculator-directory.test.ts` now fails if a published calculator:

- disappears from category discovery,
- disappears from the shared search inventory,
- points to a different search href,
- duplicates another published href,
- violates the canonical locale/category/slug href shape, or
- loses either its Korean or English canonical sitemap entry.

This keeps the 100-calculator inventory directly discoverable through the shared directory/search path and prevents a future registration from silently becoming source-level orphaned.
