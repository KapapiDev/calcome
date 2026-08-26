export type TotalCompensationComparisonLocale = "ko" | "en";

export const totalCompensationComparisonContent = {
  ko: {
    title: "오퍼 총보상 비교 계산기",
    description:
      "두 채용 제안의 기본연봉, 연간 보너스·주식보상·복리후생과 사이닝 보너스를 같은 기간으로 환산해 비교합니다.",
    category: "급여·근로",
    input: "오퍼 조건",
    offerA: "오퍼 A",
    offerB: "오퍼 B",
    baseSalary: "기본연봉",
    annualBonus: "연간 보너스",
    annualEquity: "연간 주식보상",
    annualBenefits: "연간 복리후생 가치",
    signOnBonus: "사이닝 보너스",
    horizonYears: "비교 기간",
    calculate: "총보상 비교하기",
    reset: "초기화",
    result: "비교 결과",
    higherOffer: "더 높은 총보상",
    horizonTotal: "기간 총보상",
    averageAnnual: "연평균 총보상",
    recurringAnnual: "반복 연간 보상",
    difference: "총보상 차이",
    tie: "동일",
    error: "모든 보상 항목에는 0 이상의 금액을, 비교 기간에는 1~10년을 입력해 주세요.",
    note: "세전 명목 보상 비교입니다. 주식의 실제 가치, 보너스 지급 조건, 세금, 퇴직금, 보험료, 통화 환율, 베스팅·클리프·퇴사 조건은 반영하지 않습니다.",
    method:
      "반복 연간 보상은 기본연봉 + 연간 보너스 + 연간 주식보상 + 연간 복리후생 가치입니다. 기간 총보상은 반복 연간 보상 × 비교 기간 + 사이닝 보너스로 계산하고, 이를 비교 기간으로 나눠 연평균 총보상도 보여줍니다.",
    cautions:
      "보너스와 주식보상은 회사가 실제로 지급할 가능성과 조건을 별도로 확인하세요. 서로 다른 통화의 오퍼는 같은 통화로 직접 환산한 뒤 입력해야 하며 이 계산기는 환율 변환을 수행하지 않습니다.",
    metaTitle: "오퍼 총보상 비교 계산기 | 연봉·보너스·주식보상 비교",
  },
  en: {
    title: "Job Offer Total Compensation Comparison Calculator",
    description:
      "Compare two job offers using base salary, annual bonus, equity, benefits, and signing bonus over the same time horizon.",
    category: "Pay & Work",
    input: "Offer details",
    offerA: "Offer A",
    offerB: "Offer B",
    baseSalary: "Base salary",
    annualBonus: "Annual bonus",
    annualEquity: "Annual equity value",
    annualBenefits: "Annual benefits value",
    signOnBonus: "Signing bonus",
    horizonYears: "Comparison horizon",
    calculate: "Compare total compensation",
    reset: "Reset",
    result: "Comparison result",
    higherOffer: "Higher total compensation",
    horizonTotal: "Horizon total compensation",
    averageAnnual: "Average annual compensation",
    recurringAnnual: "Recurring annual compensation",
    difference: "Total compensation difference",
    tie: "Tie",
    error:
      "Enter zero or positive compensation amounts and a comparison horizon from 1 to 10 years.",
    note: "This is a pre-tax nominal compensation comparison. It does not model actual equity value, bonus eligibility, taxes, retirement benefits, insurance, FX conversion, vesting, cliffs, or termination terms.",
    method:
      "Recurring annual compensation equals base salary + annual bonus + annual equity + annual benefits. Horizon compensation equals recurring annual compensation × years + signing bonus. The calculator also annualizes that horizon total for an apples-to-apples view.",
    cautions:
      "Check the probability and conditions of bonus and equity payouts separately. Convert offers to the same currency before entering them; this calculator does not perform foreign-exchange conversion.",
    metaTitle: "Job Offer Total Compensation Comparison Calculator",
  },
} satisfies Record<
  TotalCompensationComparisonLocale,
  Record<string, string>
>;
