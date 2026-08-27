export type EmergencyFundLocale = "ko" | "en";

type Copy = {
  title: string;
  description: string;
  category: string;
  input: string;
  monthlyExpenses: string;
  targetMonths: string;
  currentSavings: string;
  monthlyContribution: string;
  calculate: string;
  reset: string;
  result: string;
  targetFund: string;
  fundingGap: string;
  coverage: string;
  monthsToGoal: string;
  surplus: string;
  error: string;
  note: string;
  method: string;
  cautions: string;
  metaTitle: string;
};

export const emergencyFundContent: Record<EmergencyFundLocale, Copy> = {
  ko: {
    title: "비상금 계산기",
    description: "월 필수지출과 목표 보장 개월 수를 기준으로 필요한 비상금, 현재 부족액, 생활비 보장 기간과 목표 달성 예상 기간을 계산합니다.",
    category: "저축·연금 계산기",
    input: "비상금 계획",
    monthlyExpenses: "월 필수지출",
    targetMonths: "목표 보장 개월",
    currentSavings: "현재 비상금",
    monthlyContribution: "매월 추가 저축",
    calculate: "비상금 계산하기",
    reset: "초기화",
    result: "비상금 계획 결과",
    targetFund: "목표 비상금",
    fundingGap: "현재 부족액",
    coverage: "현재 생활비 보장 기간",
    monthsToGoal: "목표까지 예상 개월",
    surplus: "목표 초과 금액",
    error: "입력값을 확인해 주세요.",
    note: "투자수익, 물가변동, 세금은 반영하지 않은 단순 현금흐름 계획입니다.",
    method: "목표 비상금은 월 필수지출 × 목표 보장 개월로 계산합니다. 현재 비상금이 부족하면 매월 추가 저축액으로 부족액을 채우는 데 필요한 개월 수를 올림해 표시합니다.",
    cautions: "적정 비상금 규모는 고용 안정성, 부양가족, 보험, 부채, 소득 변동성에 따라 달라질 수 있습니다. 이 계산기는 개인 재무계획을 위한 참고 도구입니다.",
    metaTitle: "비상금 계산기 | 생활비 몇 개월치가 필요한지 계산",
  },
  en: {
    title: "Emergency Fund Calculator",
    description: "Estimate an emergency-fund target, current shortfall, expense coverage, and time to goal from essential monthly expenses and savings.",
    category: "Savings calculator",
    input: "Emergency fund plan",
    monthlyExpenses: "Essential monthly expenses",
    targetMonths: "Target months of coverage",
    currentSavings: "Current emergency savings",
    monthlyContribution: "Monthly contribution",
    calculate: "Calculate emergency fund",
    reset: "Reset",
    result: "Emergency fund plan",
    targetFund: "Target emergency fund",
    fundingGap: "Current shortfall",
    coverage: "Current expense coverage",
    monthsToGoal: "Estimated months to goal",
    surplus: "Amount above target",
    error: "Check your inputs.",
    note: "This is a simple cash-flow estimate and excludes investment returns, inflation, and taxes.",
    method: "The target equals essential monthly expenses multiplied by the desired coverage months. If current savings are below target, the calculator divides the shortfall by the planned monthly contribution and rounds up to whole months.",
    cautions: "A suitable emergency fund depends on job stability, dependents, insurance, debt, and income variability. Use this as a planning aid rather than a universal recommendation.",
    metaTitle: "Emergency Fund Calculator | Months of Expenses Target",
  },
};
