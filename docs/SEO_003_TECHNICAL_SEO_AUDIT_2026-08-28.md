# SEO-003 Technical SEO and Indexability Audit

Verified: 2026-08-28

## Scope

This audit covers the post-expansion technical SEO surface after the 100-calculator milestone. It intentionally does not reopen redirect or canonical cleanup already completed by earlier repair tasks unless a current regression is proven.

## Repository findings

- The canonical production origin is `https://www.calcome.com` through `src/config/site.ts`.
- `robots.txt` allows crawling, points at the canonical sitemap, and declares the canonical host.
- `sitemap.xml` is source-driven from `allPublishedCalculators`, emits both Korean and English calculator URLs, and adds reciprocal `ko`, `en`, and `x-default` alternates.
- Static public routes in the sitemap cover the home, calculator directory, about, privacy, terms, and contact surfaces in both supported languages.
- The sitemap does not emit fabricated `lastmod`, `changefreq`, or `priority` values.
- The current repository state has 100 published calculators, so calculator sitemap coverage must remain exactly 200 localized calculator URLs, plus the bilingual static-route entries.
- No repository-level critical indexability defect was confirmed in the audited sitemap/robots source. Existing external Search Console history remains an observation input for later query/content work rather than evidence to re-break already-correct canonical behavior.

## Regression guard added

`src/app/seo-indexability.test.ts` now fails CI if any of these invariants regress:

1. a published calculator disappears from the bilingual sitemap;
2. a calculator or sitemap URL is duplicated;
3. sitemap URLs leave the canonical `https://www.calcome.com` origin or gain query/hash variants;
4. reciprocal `ko`, `en`, or `x-default` alternates disappear;
5. `robots.txt` stops allowing the public site or stops pointing at the canonical sitemap/host.

This turns the audit into an executable release gate instead of a one-time checklist.

## External observation limitation

The automation workspace attempted local repository execution before push, but its container could not resolve `github.com`, so local clone-based lint/typecheck/test/build validation was unavailable in this run. Repository CI remains the required exact-head merge gate. Vercel team discovery succeeded; deployment evidence is checked separately after the PR head exists.

## Result

SEO-003 is complete when the PR containing this audit, executable regression guard, and `TASK_STATE.md` transition passes current-head CI and is merged. The next task is SEO-004 Calculator Content Depth and Trust Template.
