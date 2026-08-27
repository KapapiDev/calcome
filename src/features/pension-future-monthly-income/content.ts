export type PensionFutureMonthlyIncomeLocale = "ko" | "en";

type Copy = {
  title: string;
  description: string;
  category: string;
  input: string;
  currentBalance: string;
  monthlyContribution: string;
  yearsUntilRetirement: string;
  accumulationReturn: string;
  payoutYears: string;
  payoutReturn: string;
  calculate: string;
  reset: string;
  result: string;
  monthlyIncome: string;
  retirementBalance: string;
  annualIncome: string;
  totalContributions: string;
  investmentGrowth: string;
  error: string;
  note: string;
  method: string;
  cautions: string;
  metaTitle: string;
};

export const pensionFutureMonthlyIncomeContent: Record<
  PensionFutureMonthlyIncomeLocale,
  Copy
> = {
  ko: {
    title: "연금 미래 월소득 계산기",
    description:
      "현재 연금자산, 월 납입액, 은퇴까지 남은 기간과 예상 수익률을 바탕으로 은퇴 시점 예상 자산과 일정 기간 받을 수 있는 월소득을 추정합니다.",
    category: "저축·연금 계산기",
    input: "연금 적립·수령 가정",
    currentBalance: "현재 연금자산",
    monthlyContribution: "월 납입액",
    yearsUntilRetirement: "은퇴까지 남은 기간",
    accumulationReturn: "적립기 예상 연 수익률",
    payoutYears: "수령 기간",
    payoutReturn: "수령기 예상 연 수익률",
    calculate: "미래 월소득 계산하기",
    reset: "초기화",
    result: "연금 미래 월소득 결과",
    monthlyIncome: "예상 월소득",
    retirementBalance: "은퇴 시점 예상 자산",
    annualIncome: "예상 연소득",
    totalContributions: "총 원금·납입액",
    investmentGrowth: "예상 투자 성장분",
    error: "입력값을 확인해 주세요.",
    note: "이 계산은 입력한 수익률이 일정하고 매월 말 납입하며, 수령기에도 일정 수익률로 정액 인출한다고 가정한 단순 계획 모델입니다. 실제 연금상품의 세금, 수수료, 보증조건, 물가와 시장 변동은 반영하지 않습니다.",
    method:
      "적립기에는 연 수익률을 월 수익률로 환산해 기존 자산에 적용한 뒤 월 납입액을 더합니다. 은퇴 시점 예상 자산을 계산한 뒤, 선택한 수령 기간과 수령기 수익률을 사용해 해당 자산을 기간 말에 소진하는 정액 월수령액을 추정합니다.",
    cautions:
      "이 결과는 특정 연금상품의 실제 지급액이나 공적연금 급여를 계산하지 않습니다. 실제 수령액은 상품 규정, 세금, 수수료, 수익률 변동, 납입 시점과 인출 방식에 따라 달라질 수 있습니다.",
    metaTitle: "연금 미래 월소득 계산기 | 은퇴 월수령액 추정",
  },
  en: {
    title: "Pension Future Monthly Income Calculator",
    description:
      "Project a retirement balance from current savings, monthly contributions, time to retirement, and return assumptions, then estimate a level monthly income over a chosen payout period.",
    category: "Savings calculator",
    input: "Pension accumulation and payout assumptions",
    currentBalance: "Current pension balance",
    monthlyContribution: "Monthly contribution",
    yearsUntilRetirement: "Years until retirement",
    accumulationReturn: "Accumulation annual return",
    payoutYears: "Payout period",
    payoutReturn: "Payout annual return",
    calculate: "Calculate future monthly income",
    reset: "Reset",
    result: "Future pension income results",
    monthlyIncome: "Estimated monthly income",
    retirementBalance: "Projected retirement balance",
    annualIncome: "Estimated annual income",
    totalContributions: "Total principal and contributions",
    investmentGrowth: "Projected investment growth",
    error: "Check your inputs.",
    note: "This is a simplified planning model with constant returns, end-of-month contributions, and level withdrawals during retirement. It does not include product-specific taxes, fees, guarantees, inflation, or market volatility.",
    method:
      "During accumulation, the entered annual return is converted to a monthly rate, applied to the balance, and the monthly contribution is added. The projected retirement balance is then converted into a level monthly payout over the selected period using the retirement return assumption.",
    cautions:
      "This does not calculate an actual payment from a specific pension product or public pension system. Real income depends on product rules, taxes, fees, changing returns, contribution timing, and withdrawal structure.",
    metaTitle:
      "Pension Future Monthly Income Calculator | Retirement Income Projection",
  },
};
