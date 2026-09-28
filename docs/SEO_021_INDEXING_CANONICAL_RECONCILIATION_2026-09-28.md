# SEO-021 Search Console Indexing and Canonical Reconciliation

Verified: 2026-09-28

## Baseline

The canonical 2026-09-25 Search Growth Program records 193 indexed and 55 not-indexed pages in Search Console as of 2026-09-21:

- 22 redirect
- 1 alternate canonical
- 18 discovered - currently not indexed
- 6 crawled - currently not indexed
- 6 not found (404)
- 2 Soft 404

The retained repository baseline contains category counts, not the affected Search Console URL examples. This reconciliation therefore does not invent URL-level mappings.

## Reconciliation

### Intentional exclusion classes

The 22 redirect and 1 alternate-canonical rows are not treated as defects without contrary URL-level evidence. Repository tests already require locale-less calculator aliases and the Korean root alias to redirect to canonical destinations, keep canonical sitemap URLs non-redirecting, and keep the canonical host at `https://www.calcome.com`.

### Discovered/crawled opportunity classes

The 18 discovered-not-indexed and 6 crawled-not-indexed rows remain search-growth opportunities rather than proven application failures. Current repository contracts require every published calculator to have both localized route coverage and exactly one sitemap entry per locale. SEO-022 and later measured work may improve snippets, usefulness, and internal discovery where the Search Console baseline supports it.

### 404 and Soft 404 classes

The 6 404 and 2 Soft 404 rows cannot be mapped safely because the retained baseline does not include their URL examples. They are classified as unresolved URL-level Search Console evidence, not as confirmed canonical product defects.

Current repository regression coverage proves:

1. all 100 published calculators are backed by the shared localized route module;
2. every published calculator appears exactly once per locale in the sitemap;
3. sitemap URLs use only the canonical `www` origin and are not redirect sources;
4. locale-less calculator aliases redirect to source-backed Korean canonicals;
5. technical error surfaces are excluded from the sitemap.

No current repository-side canonical 404 or Soft-404 defect was reproduced, so no public URL is resurrected, removed, or redirected speculatively.

## External observation

Vercel team discovery succeeds for CalCome. Project listing currently returns an empty result. The known project lookup is blocked by a connector argument-contract mismatch, so direct deployment inspection is not authoritative in this run. External web fetching of the production sitemap/robots/invalid-path URLs also returned environment-level access errors rather than origin HTTP evidence.

Under `AUTOMATION.md`, these observation limits do not convert into an application failure and do not block repository work.

## Outcome

SEO-021 is complete as a bounded reconciliation pass. The next single OPEN task is SEO-022.

Any later repair of the six 404 or two Soft 404 rows requires fresh URL-level Search Console evidence. Healthy redirect/canonical exclusions must not be made indexable merely to reduce the exclusion count.
