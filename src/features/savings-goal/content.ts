import type { SavingsGoalLocale } from "./validation";

type SavingsGoalCopy = {
  title: string;
  description: string;
  category: string;
  input: string;
  targetAmount: string;
  initialSavings: string;
  annualReturnPercent: string;
  years: string;
  calculate: string;
  reset: string;
  result: string;
  monthlyContribution: string;
  totalContributions: string;
  estimatedGrowth: string;
  months: string;
  error: string;
  note: string;
  method: string;
  cautions: string;
  metaTitle: string;
};

export const savingsGoalContent: Record<
  SavingsGoalLocale,
  SavingsGoalCopy
> = {
  ko: {
    title: "저축 목표 계산기",
    description:
      "목표 금액과 현재 저축액, 예상 수익률, 기간을 입력해 목표 달성에 필요한 월 저축액을 계산합니다.",
    category: "저축·연금 계산기",
    input: "저축 목표 조건",
    targetAmount: "목표 금액",
    initialSavings: "현재 저축액",
    annualReturnPercent: "예상 연 수익률",
    years: "목표 기간",
    calculate: "필요 월 저축액 계산하기",
    reset: "초기화",
    result: "예상 결과",
    monthlyContribution: "필요 월 저축액",
    totalContributions: "예상 총 납입원금",
    estimatedGrowth: "예상 운용수익",
    months: "목표까지 남은 개월",
    error: "입력값을 확인해 주세요.",
    note:
      "매월 말 동일 금액을 저축하고 입력한 수익률이 일정하게 유지된다고 가정합니다.",
    method:
      "현재 저축액의 미래가치를 먼저 계산한 뒤 부족한 목표 금액을 매월 말 적립하는 연금의 미래가치 공식으로 역산합니다.",
    cautions:
      "세금, 수수료, 환율, 실제 수익률 변동은 반영하지 않으며 계산 결과는 목표 달성을 보장하지 않습니다.",
    metaTitle: "저축 목표 계산기 | 목표 금액 월 저축액 계산",
  },
  en: {
    title: "Savings Goal Calculator",
    description:
      "Calculate the monthly saving needed to reach a target amount from your current savings, expected return, and time horizon.",
    category: "Savings calculator",
    input: "Savings goal assumptions",
    targetAmount: "Target amount",
    initialSavings: "Current savings",
    annualReturnPercent: "Expected annual return",
    years: "Time horizon",
    calculate: "Calculate monthly savings",
    reset: "Reset",
    result: "Estimated results",
    monthlyContribution: "Required monthly savings",
    totalContributions: "Estimated total contributions",
    estimatedGrowth: "Estimated investment growth",
    months: "Months to goal",
    error: "Check your inputs.",
    note:
      "Assumes equal deposits at the end of each month and a constant rate of return.",
    method:
      "The calculator first projects the future value of current savings, then solves the future-value annuity formula for the monthly deposit needed to close the remaining gap.",
    cautions:
      "Taxes, fees, FX, and actual return variability are excluded. The estimate does not guarantee the goal will be reached.",
    metaTitle: "Savings Goal Calculator | Monthly Saving Needed",
  },
};
