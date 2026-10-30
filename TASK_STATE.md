# CalCome Task State

Last Updated: 2026-10-30
Current Calculator Count: 100
Target Calculator Count: 100
Remaining to Target: 0

## Current selected task

- [ ] SEO-025 OPEN — Search performance review and evidence-backed improvement batch
  - Refresh Search Console 7-day/28-day evidence for established pages before choosing at most three justified existing-page improvements.
  - Reuse the current queue scope; do not resurrect standalone SEO-024 or archived expansion tasks.
  - No code change is required when evidence supports no useful improvement; record the decision and next evidence trigger.

## Guide observation window

SEO-023's release baseline is 2026-10-30: five topics, ten localized guide routes, and 224 total canonical sitemap URLs. Review the new guides over 2026-11-13 through 2026-11-27 (14–28 days), using the actual production release as the start if delayed. No traffic or ranking outcome is claimed. Established-page analysis may proceed immediately. No automatic monitoring or retry schedule was created.

## Operational waits

- [ ] OPS-INDEX-001 EXTERNAL_WAIT — Finish individual indexing requests
  - Six of eighteen desired URLs were confirmed submitted on 2026-10-30; twelve remain after Google's explicit daily-quota rejection.
  - reCAPTCHA works in the fresh Chrome tab; no browser/security settings were changed. Fix validations and sitemap resubmission were already accepted.
  - Resume only remaining eligible URLs when quota permits and the owner resumes this work. The owner declined an automatic retry schedule.
  - Exact remaining paths and acceptance criteria are in `TASK_QUEUE.md`. Request acceptance and actual Google index inclusion are separate states.

- [ ] OPS-ADS-001 EXTERNAL_WAIT — Verify AdSense activation
  - Last account-evidence verification recorded: 2026-08-29. Fresh authoritative approval/site status and the intended publisher ID remain the resume condition; the old record is not proof of current account status.
  - This account wait does not block guide or search-performance work.

## Recently completed

- [x] SEO-023 DONE — Publish the measured guide batch
  - [PR #427](https://github.com/KapapiDev/calcome/pull/427) includes latest main, preserved SEO-026 and the reconciled queue, and releases five topics / ten localized routes.
  - Added worked examples, explicit assumptions, source links and a visible 2026-10-30 review date; fixed guide index/article language switching and page-specific social metadata.
  - Required current-head preflight, calculator example checks, and local/production route verification are recorded in the PR. Source references and release checks: `docs/features/measured-guide-cluster.md`.

- [x] OPS-QUEUE-001 DONE — Owner-requested queue reconciliation
  - Replaced the historical expansion/audit backlog with current priorities and explicit external waits; preserved original queue/state snapshots under `docs/archive/`.
  - Kept SEO-023 first, moved evidence-backed search work ahead of a standalone AI-search rewrite, and retained the indexing/account facts without creating scheduled work.

- [x] SEO-026 DONE — URL-level Search Console source remediation
  - [PR #428](https://github.com/KapapiDev/calcome/pull/428) merged and deployed; all 214 production canonical URLs passed the live SEO check.
  - Recovered the duplicated English rent-conversion URL, restored language alternates on seven Korean static pages, and repaired absent related-calculator inbound links.
  - Google-side follow-up remains OPS-INDEX-001; healthy redirect/canonical/resource exclusions and intentional 404s remain valid.

- [x] SEO-022 DONE — Measured search snippet improvements
  - English currency conversion, YTM, and Korean CAGR intent improvements merged in PR #426.

- [x] SEO-021 DONE — Search Console exclusion/canonical reconciliation
  - Baseline classification merged in PR #425; subsequent URL-level repairs are SEO-026.

- [x] UX-072 DONE — Home and directory repeat-use/discovery upgrade
  - Bilingual favorites/recent-use entry points and canonical directory recovery are released. Prior UX, accessibility, content/trust, and performance coverage remains part of the executable regression suite.

## Security and execution gates

No new production exploit or application failure is asserted by this queue cleanup. Existing dependency advisories remain classified in `docs/features/search-console-indexing-remediation.md`; a newly confirmed security/calculation/route/data-loss blocker overrides ordinary priorities. Preserve all verification gates.

## State discipline

- Current task scopes and order: `TASK_QUEUE.md`; historical detail: `docs/archive/task-queue-2026-10-30.md` and `docs/archive/task-state-2026-10-30.md`.
- Keep exactly one selected OPEN task and unique task IDs. Reconcile effective IN_REVIEW/IN_PROGRESS states against GitHub before selecting work.
- SEO-023 advances to SEO-025; preserve SEO-026 and the reconciliation. Do not restore old OPEN/BLOCKED labels or SEO-024 as next from the older branch.
- External waits must not create an automatic retry, block unrelated development, or be reported as completed external outcomes.
