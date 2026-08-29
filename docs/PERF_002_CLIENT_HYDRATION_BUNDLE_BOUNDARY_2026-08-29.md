# PERF-002 Client Hydration and Bundle Boundary Regression

Verified: 2026-08-29

## Reproduced regression

The root layout wrapped every public route in `ThemeProvider`, a client component whose only runtime responsibility was reapplying the preferred theme in a layout effect. The same preferred theme is already applied before paint by `themeInitializationScript`, while the always-present `ThemeToggle` subscribes to theme and system-preference changes directly.

That made the provider wrapper redundant while still introducing a site-wide client hydration boundary on every one of the 100 calculator surfaces and static pages.

## Fix

- Keep the pre-paint theme initialization script unchanged.
- Remove only the global `ThemeProvider` wrapper from the root layout.
- Leave the isolated interactive client islands for language switching, theme toggling, privacy controls, calculator inputs, and directory search unchanged.
- Add a regression check that prevents the global provider wrapper from being reintroduced while requiring the theme initializer, site header, and privacy control to remain present.

## Preserved behavior

Theme persistence and system preference behavior remain owned by the existing theme module and `ThemeToggle`. Locale routing, privacy controls, ad-consent semantics, SEO metadata, accessibility structure, calculator logic, and the 100-calculator public inventory are unchanged.
