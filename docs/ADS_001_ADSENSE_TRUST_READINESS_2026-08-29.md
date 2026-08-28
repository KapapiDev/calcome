# ADS-001 AdSense Policy and Site Trust Readiness Audit

Verified: 2026-08-29

## Goal

Assess whether CalCome's current product and trust surface is ready to proceed toward AdSense monetization without prematurely adding ad code, consent UI, or layout changes that belong to later tasks.

## Official policy evidence reviewed

Current Google primary-source policy pages were checked during this run:

- AdSense programme policies: https://support.google.com/adsense/answer/48182
- Google Publisher Policies: https://support.google.com/adsense/answer/10502938

The reviewed policies prohibit artificial clicks or impressions, misleading encouragement to click ads, deceptive navigation, and ad placements that interfere with content or user actions. They also require publishers to keep declarations materially accurate. These constraints are treated as product requirements for later ad-placement and integration tasks, not as reasons to add advertisements in this audit.

## Current CalCome trust surface

Repository review confirms that CalCome already exposes bilingual trust routes for About, Privacy, Terms, and Contact through the shared localized information route. The Korean privacy page explicitly states that AdSense and other advertising services are not currently active and that the policy and user choices will be updated when advertising or analytics is introduced.

The existing trust copy also states that calculator outputs are informational estimates rather than financial, investment, tax, or legal advice, and the Contact surface asks users to include reproducible inputs and official-source evidence when reporting calculation or policy errors.

## Readiness assessment

### PASS now

- About, Privacy, Terms, and Contact surfaces exist and are available through Korean and English routing.
- Calculator limitations and non-advisory status are disclosed.
- Privacy copy does not falsely claim that AdSense is already active.
- Current product architecture is content-first and calculator-first; this audit found no repository evidence of click encouragement, fake navigation, forced ad interaction, or pages published solely to display ads.
- Existing SEO/content work provides unique calculator explanations, assumptions, examples, and contextual discovery rather than a thin ad-only shell.

### Required before ads are activated

The following remain intentionally deferred to their dedicated tasks and are not represented as complete by ADS-001:

- ADS-002: strengthen original guide and decision-support content where useful.
- ADS-003: define ad slots that cannot be mistaken for navigation or calculator actions and that do not cause harmful layout shift.
- ADS-004: implement consent and regional privacy controls where required before applicable storage or advertising technology is activated.
- ADS-005: integrate AdSense and ads.txt only after the preceding readiness gates are satisfied.

Before ADS-005 enables advertising, re-check the then-current Google policies and update the privacy disclosure to accurately name the advertising/cookie behavior actually deployed. Do not pre-state cookies, vendors, consent behavior, or ad serving that does not yet exist.

## Hard guardrails for later monetization work

- Never ask users to click, view, or support the site through ads.
- Never place ads where they can be mistaken for calculator buttons, navigation, downloads, results, or recommended tools.
- Never obscure calculator content or require ad interaction to continue using a calculator.
- Preserve clear content hierarchy, mobile usability, accessibility, and route integrity.
- Keep publisher/account/site declarations accurate and complete.
- Treat a real policy or product regression as a blocker; do not treat an external inspection limitation as proof of a product failure.

## Conclusion

ADS-001 passes as a readiness audit. CalCome has the minimum trust/navigation foundation needed to continue the monetization sequence, while actual ad architecture, consent controls, and AdSense integration remain gated behind ADS-002 through ADS-005.

Current-head repository CI remains the merge gate for this audit PR.
