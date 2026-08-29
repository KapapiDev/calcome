# SEO-014 Robots, Noindex and Crawl Directive Regression

Verified: 2026-08-29

## Scope

This pass reconciles the repository sources that decide whether CalCome public URLs may be crawled and indexed: `robots.ts`, root metadata robots directives, the XML sitemap, canonical production URLs, and technical error/not-found surfaces.

## Findings

No reproducible crawl-directive contradiction exists on current `main`:

- `robots.ts` allows crawling from `/` for all user agents and points to the canonical `https://www.calcome.com/sitemap.xml`.
- The shared public metadata explicitly uses `index: true` and `follow: true`, including the Googlebot directives.
- The sitemap emits only canonical production-host URLs and contains no technical `/404`, `/not-found`, or `/error` surface.
- The application retains dedicated not-found and error boundaries. They remain technical response surfaces rather than sitemap entries; this task does not turn them into indexable content or block crawlers from reaching real public pages.

Because no repository-side contradiction was reproduced, no production crawl behavior was changed merely to manufacture a fix.

## Regression coverage

`src/app/seo-indexability.test.ts` now additionally proves that:

1. no canonical sitemap pathname is covered by a configured robots `disallow` rule;
2. the shared public metadata continues to opt public content into indexing and following;
3. not-found and error boundaries remain present but absent from the sitemap.

Together with the existing canonical-host, bilingual sitemap, reciprocal hreflang, and robots-host assertions, this makes a future robots/noindex/sitemap contradiction fail CI before merge.

## Product conclusion

SEO-014 found no product-side crawl directive blocker. The safe change is regression protection, not a speculative robots or metadata rewrite.
