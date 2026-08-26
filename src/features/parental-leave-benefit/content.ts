export type ParentalLeaveBenefitLocale = "ko" | "en";

export const parentalLeaveBenefitContent = {
  ko: {
    title: "육아휴직 급여 계산기",
    description:
      "월 통상임금과 육아휴직 기간으로 2026년 일반 육아휴직급여의 월 구간별 지급액과 총 예상 급여를 계산합니다.",
    category: "급여·근로",
    input: "육아휴직 조건",
    monthlyOrdinaryWage: "월 통상임금",
    leaveMonths: "육아휴직 개월 수",
    calculate: "육아휴직 급여 계산하기",
    reset: "초기화",
    result: "예상 육아휴직 급여",
    totalBenefit: "총 예상 급여",
    averageMonthly: "월평균 급여",
    firstThree: "1~3개월 월 지급액",
    monthsFourToSix: "4~6개월 월 지급액",
    monthSevenPlus: "7개월 이후 월 지급액",
    error:
      "월 통상임금은 0보다 크게, 육아휴직 기간은 1~18개월의 정수로 입력해 주세요.",
    note: "이 계산기는 2026년 일반 육아휴직급여 기준의 계획용 추정치입니다. 부모함께육아휴직제 특례, 한부모 특례, 1개월 미만 일할계산, 개인별 수급요건과 실제 승인 결과는 별도로 확인해야 합니다. 12개월을 넘는 육아휴직은 법정 연장요건을 충족하는 경우에만 가능합니다.",
    method:
      "고용보험법 시행령 제95조의 2026년 기준을 적용합니다. 1~3개월은 월 통상임금 100%를 월 70만~250만원 범위에서, 4~6개월은 월 통상임금 100%를 월 70만~200만원 범위에서, 7개월 이후는 월 통상임금 80%를 월 70만~160만원 범위에서 계산합니다.",
    sources: "2026년 공식 기준",
    verified: "검증일: 2026-08-26",
    metaTitle: "육아휴직 급여 계산기 | 2026 월별 상한·하한",
  },
  en: {
    title: "South Korea Parental Leave Benefit Calculator",
    description:
      "Estimate 2026 South Korea general parental-leave benefits in KRW from monthly ordinary wage and leave duration.",
    category: "Employment & Pay",
    input: "Parental-leave assumptions",
    monthlyOrdinaryWage: "Monthly ordinary wage (KRW)",
    leaveMonths: "Parental-leave duration (months)",
    calculate: "Calculate benefit",
    reset: "Reset",
    result: "Estimated parental-leave benefit",
    totalBenefit: "Estimated total benefit",
    averageMonthly: "Average monthly benefit",
    firstThree: "Monthly benefit, months 1–3",
    monthsFourToSix: "Monthly benefit, months 4–6",
    monthSevenPlus: "Monthly benefit, month 7 onward",
    error:
      "Enter monthly ordinary wage above zero and a whole-number leave duration from 1 to 18 months.",
    note: "This is a planning estimate for South Korea's 2026 general parental-leave benefit in KRW. It excludes the Parents Together special scheme, single-parent special rules, partial-month proration, individual eligibility checks, and final agency determinations. Leave beyond 12 months is available only when statutory extension conditions are met.",
    method:
      "The calculator applies Article 95 of the Enforcement Decree of the Employment Insurance Act. Months 1–3 pay 100% of monthly ordinary wage, bounded by KRW 700,000 and KRW 2,500,000. Months 4–6 use the same 100% base with a KRW 2,000,000 cap. Month 7 onward pays 80%, bounded by KRW 700,000 and KRW 1,600,000.",
    sources: "Official 2026 references",
    verified: "Verified: 2026-08-26",
    metaTitle: "South Korea Parental Leave Benefit Calculator",
  },
} satisfies Record<ParentalLeaveBenefitLocale, Record<string, string>>;
