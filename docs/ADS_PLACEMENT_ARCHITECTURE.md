# ADS-003 Ad Placement Architecture

## Goal

Reserve advertisement space before an ad payload arrives so monetization cannot push calculator controls, results, or decision-support content after first paint.

## Approved placements

- `calculator-after-result`: only after the complete calculator interaction/result experience and before supporting editorial content.
- `content-break`: only between substantial content sections. Never insert inside a paragraph, table, FAQ answer, form, result card, or navigation group.
- `desktop-sidebar`: desktop-only rail outside calculator controls and result panels.

All approved placements are defined in `src/components/ads/ad-placements.ts`. `AdSlot` consumes only those typed names and always applies a deterministic minimum height. Do not create page-local ad dimensions or ad-slot names.

## Safety rules

1. Never place ads between a field and its label, between calculator inputs, adjacent to primary calculate/reset/share controls, or inside result/comparison/history panels.
2. Never make an advertisement look like a calculator action, recommendation, download, navigation item, or result.
3. Reserve slot height before third-party code runs. A provider integration may fill the reserved area but must not remove this layout reservation during loading.
4. Mobile uses content-flow placements only. The sidebar is not rendered below the `lg` breakpoint.
5. Do not load an ad network script in this task. ADS-005 owns AdSense integration and `ads.txt`; ADS-004 owns consent and regional privacy controls.
6. If a future ad format cannot fit an approved reservation without layout movement, change the central placement definition and its regression test before rollout instead of patching individual pages.

## Rollout gate

ADS-005 may connect provider code only through `AdSlot`. Before enabling a placement broadly, verify desktop and mobile screenshots, calculator input/result flows, CLS behavior, consent behavior where applicable, and current AdSense policy requirements.
