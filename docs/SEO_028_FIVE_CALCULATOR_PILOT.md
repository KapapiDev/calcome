# SEO-028 — Five-calculator improvement and usage pilot

The owner explicitly requested a GPT-6.1 Sol pilot on five calculator identities before estimating the work for all 100. This bounded implementation is authorized separately from SEO-027's search-observation gate; it does not start the remaining fleet work or claim that the October 30 releases improved rankings.

## Sample and scope

Five identities cover ten Korean/English calculator routes. These are five additional identities, separate from SEO-025's three improvements.

| Calculator           | Observed gap and resulting behavior                                                                                                                                                                                                                            | Stratum            |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| Currency conversion  | Adds an explicit amount/rate-direction/inverse example, identifies the default rate as illustrative at the input, aligns social metadata, and links to the published rate-check guide. Selecting currencies still requires the user to enter the correct rate. | General            |
| CAGR                 | Gives the percent formula and reproducible 100 → 121 over two years example; distinguishes 10% CAGR from total growth divided by years; connects both CAGR/annualization guides. Preserves the existing useful FAQ and assumptions.                            | General            |
| Work-hours converter | Shows weekly → monthly and reverse calculations, four-week versus calendar-average hours, and the distinction from Korea's 209 paid-hour wage basis.                                                                                                           | General            |
| Weekly holiday pay   | Explains the four-week average-hours/attendance assumptions and the conventional 40-hour, five-day proportional model beside the input. Shows allowance versus total pay and clarifies that the monthly result covers holiday pay alone.                       | South Korea policy |
| Minimum wage         | Shows the actual entered-hours monthly estimate beside the official 209-hour minimum, explains why they differ, makes the 2026 applicability period explicit, and associates eligibility guidance with the hours input.                                        | South Korea policy |

Selection used the October 30 established-page evidence captured for SEO-025: KO currency 0 clicks / 76 impressions / position 13.7; KO CAGR 0 / 70 / 10.9; EN work-hours 0 / 62 / 7.2; KO weekly holiday pay 0 / 56 / 26.2; KO minimum wage 0 / 38 / 27.0 in the 28-day period ending October 27. Page-level demand is not attributed to unobserved queries. The three-general/two-policy sample is deliberate and not random or guaranteed representative of the whole fleet.

All five expose server-rendered methods, worked examples, assumptions, limitations, source links and the actual content review date (2026-10-30) through the existing content-guide component. Localized breadcrumbs and relevant links remain on published localized routes. No new calculator, guide route, URL change, live rate feed, engine formula or policy rate is introduced. The sitemap remains 224 canonical URLs.

## Sources checked on 2026-10-30

- [Minimum Wage Commission annual decisions](https://www.minimumwage.go.kr/minWage/policy/decisionMain.do): the 2026 row applies January 1–December 31, gives KRW 10,320 hourly, KRW 82,560 for eight hours, and KRW 2,156,880 on the official 209-hour basis. The table also lists 2027; this pilot deliberately retains the calculator's explicit 2026 scope.
- [Ministry of Employment and Labor consultation](https://1350.moel.go.kr/rtmview.do?id=1000278825): distinguishes scheduled from actual hours, the four-week average exclusion below 15 hours, completed scheduled workdays, and the difference between regular-day pay and a 40-hour proportional approach. The answer is dated July 31, 2024 and is contextual guidance, not a universal factual eligibility decision for every contract. The calculator discloses its simplified reference schedule.
- [ECB reference-rate explanation](https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.en.html): quotes against the euro and states that its reference rates are informational, rather than transaction rates. Examples on our pages are hypothetical, not today's quotes.
- [FINRA return and rate of return](https://syndication.finra.org/content/key-concepts-return-and-rate-return): distinguishes return, percentage return and annualization. CAGR arithmetic examples are independently reproduced with the existing engine.
- [US Naval Observatory Gregorian calendar](https://aa.usno.navy.mil/faq/calendars): the 400-year leap rule implies (400 × 365 + 97) / 400 = 365.2425 days. The converter uses this calendar average; the two wage tools retain their existing, separately disclosed 365-day and rounded 4.345 comparison models.

## Reproducible acceptance examples

- Currency: hypothetical 100 USD × 1,350 = 135,000 KRW; separate EN illustration 100 USD × 0.92 = 92 EUR, inverse 1 / 0.92 ≈ 1.08695652.
- CAGR: (121 / 100)^(1 / 2) − 1 = 10%; total growth 21% is not divided by two.
- Hours: 40 × 4.348125 = 173.925 average monthly hours, 2,087.1 annual hours; dividing 173.925 by 4.348125 returns 40. This does not include paid weekly holidays or create an official 209-hour payroll basis.
- Minimum wage: 10,320 × (40 + 8) = 495,360 weekly; × 365 / 7 / 12 ≈ 2,152,457 monthly, distinct from 10,320 × 209 = 2,156,880 official monthly.
- Holiday pay: 10,320 × (20 / 5) = 41,280 allowance; 206,400 work pay + 41,280 = 247,680 weekly total; allowance alone × 4.345 = 179,361.6, rounded to 179,362.

Tests reproduce these examples with the actual engines, verify bilingual rendered examples and existing-route links, check rate/help associations, exercise manual currency selection and errors/reset, and reverse the hours example. Existing policy boundary and attendance tests remain required. The complete current-head preflight, built-site interaction checks and canonical-route checks are recorded in the implementation PR.

## Usage measurement and interpretation

The active thread's session metadata confirms `gpt-6.1-sol` with `high` reasoning. The native Codex account limit at the implementation baseline (2026-10-30 07:35:07 UTC) reports 21% used / 79% remaining in a 10,080-minute window, reset Unix timestamp 1793778747. The initial pre-reading snapshot was also 21% used. No alternate model, delegated agent or new chat is used.

The local output record stores before/after snapshots, release evidence and any extrapolation. Account usage is shared across chats/models; integer display precision, reporting delay, overlapping research and deployment setup prevent exact per-calculator attribution. Do not treat an unchanged meter as zero consumption or convert API token prices into subscription percentages. A positive observed percentage-point delta can be scaled by 100 / 5 for a same-scope scenario, while the outstanding 95 would use 95 / 5. Such scaling is a scenario, not a confidence interval or a promise that all future work fits before reset.

SEO-027 remains the single OPEN next task and keeps its complete post-release data gate. This pilot supplies a work/usage sample, not post-release traffic evidence or permission to execute the other 95 automatically.
