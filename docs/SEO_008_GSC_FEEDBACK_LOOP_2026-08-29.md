# SEO-008 Search Console Query and Cannibalization Feedback Loop

Verified: 2026-08-29

## Goal

Turn Google Search Console evidence into a repeatable prioritization loop without inventing live traffic data or treating two ranking pages as automatic proof that canonical consolidation is correct.

## Existing baselines

`TASK_QUEUE.md` records the evidence currently available in the repository:

- 2026-07-29 Search Console baseline: 281 impressions, 1 click, 108 surfaced queries, 38 countries, with first recorded impressions on 2026-07-15.
- 2026-08-08 Page Indexing baseline: 48 indexed and 85 unindexed pages, including 5 Not found (404), 25 Discovered - currently not indexed, 17 redirect pages, and 1 Crawled - currently not indexed.
- 2026-08-23 Search Console notifications reported sitemap-included pages and site pages excluded as Soft 404.

The original query-by-page CSV exports behind those dates are not stored in the repository, so this task does not manufacture historical query/page rows or claim a live comparison that cannot be reproduced.

## Repeatable export analysis

Export Search Console Search results with both `query` and `page` dimensions plus clicks, impressions, CTR, and position, then run:

```bash
node scripts/gsc-feedback.mjs path/to/current-query-page.csv --output gsc-report.json
```

When a previous query-by-page export is available, compare the same dimensions with:

```bash
node scripts/gsc-feedback.mjs path/to/current-query-page.csv \
  --baseline path/to/previous-query-page.csv \
  --output gsc-report.json
```

The parser accepts standard English column names and common Korean Search Console export labels. It uses no new dependency and never sends Search Console data to an external service.

Default review thresholds are intentionally conservative and configurable:

- high-impression / low-CTR opportunity: at least 10 impressions and CTR at or below 2%;
- cannibalization review candidate: the same query has at least two pages with at least 5 impressions each.

These are triage thresholds, not ranking truths. Override them with `--min-impressions`, `--max-ctr`, and `--min-page-impressions` when the dataset grows.

## Output and decision rules

The JSON report contains:

- high-impression / low-CTR queries with the leading page;
- query-level cannibalization review candidates with every materially visible page;
- optional deltas against a previous export for impressions, clicks, CTR, and page count;
- explicit guardrails for follow-up work.

Use validated findings to reorder only unstarted metadata, content-depth, internal-linking, or expansion work. Before canonical consolidation, confirm that the pages truly serve the same intent and cross-check the live canonical/indexability state. Search Console evidence must not alter calculator formulas or cause a broad page family to be collapsed merely because two URLs appeared for one query.

SEO-007 already provides the production crawl/indexability monitor needed to cross-check canonical and discovery behavior. The 2026-08-08 indexing and 2026-08-23 Soft 404 baselines remain historical comparison points until a new official Search Console export is supplied; no recovery claim is made without that evidence.

## Validation

Before the initial remote push, the script was executed locally against a synthetic test-only query-by-page CSV and a synthetic baseline CSV. It correctly produced a low-CTR opportunity, one two-page cannibalization review candidate, and baseline deltas; `node --check` also passed. The synthetic rows are not committed and are not represented as CalCome traffic.

Current-head repository CI remains the merge gate for this implementation PR.
