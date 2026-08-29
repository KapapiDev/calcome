# PERF-004 Static Asset, Font and Image Loading Regression

Verified: 2026-08-30

## Reproduced overhead

The App Router already generates a 32x32 PNG icon from `src/app/icon.tsx`, and `manifest.ts` uses `/icon` as the normal application icon. The same app root also contained a legacy `src/app/favicon.ico` weighing 25,931 bytes. Keeping both icon conventions exposed redundant brand-icon metadata/transfer paths without adding a distinct product image or accessibility benefit.

No `public` asset directory exists, the shared CSS uses a local/system font fallback stack, and the shared styles contain no remote font URL import. No broader image or font rewrite is justified by current repository evidence.

## Change

- Remove the redundant 25,931-byte `favicon.ico`.
- Keep the existing generated 32x32 `/icon` and 180x180 `/apple-icon` paths, including the PWA manifest references.
- Add a source-contract regression test that prevents the duplicate legacy favicon from returning and prevents remote render-blocking font imports from being introduced into the shared stylesheet.

## Preserved invariants

Brand initials/colors, accessible document structure, responsive layout, canonical/SEO metadata, theme behavior, and visual stability are unchanged. No calculator formula, route, locale, AdSense, or consent behavior changes in this task.

## Validation policy

The container clone path was attempted before repository writes but outbound GitHub network access was unavailable. Current-head GitHub Actions therefore remains the authoritative full lint, typecheck, formatting, test, audit, and production-build gate before merge.
