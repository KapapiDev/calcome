# TASK_QUEUE category-directory patch

This file is a temporary queue amendment and is authoritative for UX-001 until its contents are merged into `TASK_QUEUE.md`.

## UX-001 amendment

The current OPEN task `UX-001 Shared Calculator Shell and Production Entry Audit` must also implement the category-first calculator directory defined in `QUEUE_CATEGORY_DIRECTORY_SPEC.md`.

Required work:

- replace the flat all-calculators card wall with category-first discovery
- provide localized search with calculator names, common abbreviations, colloquial names, and synonyms
- group all 51 current calculators into exactly one primary category
- add category navigation for employment/payroll, loans/credit, tax, housing/real estate, savings/pension, investment, business, and general utilities
- show manageable popular and recent subsets instead of all cards at once
- provide category-specific complete views and localized category routes
- support keyboard navigation, screen readers, mobile layouts, dark mode, refresh, and back navigation
- ensure every current route remains discoverable through search and category navigation
- update the canonical registry so P-045 through P-093 inherit category, keyword, synonym, and related-calculator requirements

Acceptance additions:

- users can reach a known calculator within three meaningful directory interactions
- the directory never renders 51 or 100 undifferentiated cards as its default information architecture
- all current calculators are classified and no calculator is orphaned
- new calculator tasks are incomplete without category and synonym metadata
- desktop and mobile production evidence covers category navigation, search, empty results, and bilingual destination preservation

## Queue order

This amendment remains part of UX-001 and does not create a second OPEN task. UX-002 and all later work stay BLOCKED until the category-first directory and the original UX-001 acceptance criteria pass production verification.
