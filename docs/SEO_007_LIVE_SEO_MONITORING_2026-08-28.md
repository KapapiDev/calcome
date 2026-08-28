# SEO-007 Live SEO Monitoring, Indexation, Crawl and Discovery Checks

Verified: 2026-08-28

## Goal

Turn the post-100-calculator technical SEO baseline into a repeatable production check without spending Vercel Hobby Preview deployments as a monitoring loop.

## Implementation

`node scripts/live-seo-check.mjs` checks the canonical production origin directly with native Node APIs and no new dependency.

The check verifies:

- `robots.txt` is reachable and still advertises the canonical host and sitemap;
- `sitemap.xml` is reachable, contains no duplicate/query/hash/off-origin URLs, and does not fall below the current 212-URL bilingual baseline;
- every URL currently emitted by the live sitemap returns directly instead of redirecting;
- every sitemap page remains HTML, indexable, and has a non-empty title;
- every sitemap page exposes exactly one self-canonical URL;
- every sitemap page exposes `ko`, `en`, and `x-default` hreflang alternates;
- failures include the exact affected URL and reason so a crawl/indexability regression can be triaged without guessing.

The checker uses bounded concurrency and a per-request timeout so one slow route cannot hang the monitor indefinitely.

## Monitoring workflow

`.github/workflows/live-seo-monitor.yml` runs the production checker daily and can also be dispatched manually. It uses only GitHub-hosted execution and production HTTP requests, so the monitor itself does not create a Vercel Preview deployment.

The existing repository CI remains the Pull Request merge gate. A live-monitor failure is production evidence to investigate; an external DNS/network failure by the runner must still be distinguished from an application defect under `AUTOMATION.md`.

## Baseline and external observation

The repository-side SEO-003 audit established 100 published calculators, 200 localized calculator URLs, and 12 localized static URLs, for a current minimum live sitemap baseline of 212 URLs. The monitor intentionally treats 212 as a floor rather than an exact forever-count so future legitimate expansion does not create a false failure.

During this implementation run, the local container was actually attempted before the remote push but could not resolve `github.com`, so clone-based local lint/typecheck/test/build execution was unavailable. Current-head repository CI therefore remains mandatory before merge.

## Result

SEO-007 is complete when this monitor, documentation, and the `TASK_STATE.md` transition pass current-head CI and merge. The next OPEN task is SEO-008 Search Console Query and Cannibalization Feedback Loop.
