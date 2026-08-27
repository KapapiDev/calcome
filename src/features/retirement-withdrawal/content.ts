export type RetirementWithdrawalLocale = "ko" | "en";

type Copy = {
  title: string;
  description: string;
  category: string;
  input: string;
  startingPortfolio: string;
  monthlyWithdrawal: string;
  expectedReturn: string;
  retirementYears: string;
  calculate: string;
  reset: string;
  result: string;
  endingBalance: string;
  annualWithdrawal: string;
  withdrawalRate: string;
  totalWithdrawn: string;
  depletion: string;
  error: string;
  note: string;
  method: string;
  cautions: string;
  metaTitle: string;
};

export const retirementWithdrawalContent: Record<
  RetirementWithdrawalLocale,
  Copy
> = {
  ko: {
    title: "은퇴 인출 계산기",
    description:
      "은퇴 시작 자산, 월 인출액, 예상 수익률과 은퇴 기간을 입력해 예상 잔액, 총 인출액, 초기 인출률과 자산 고갈 시점을 계산합니다.",
    category: "저축·연금 계산기",
    input: "은퇴 인출 계획",
    startingPortfolio: "은퇴 시작 자산",
    monthlyWithdrawal: "월 인출액",
    expectedReturn: "예상 연 수익률",
    retirementYears: "은퇴 기간",
    calculate: "인출 계획 계산하기",
    reset: "초기화",
    result: "은퇴 인출 결과",
    endingBalance: "예상 종료 잔액",
    annualWithdrawal: "첫해 기준 연 인출액",
    withdrawalRate: "초기 인출률",
    totalWithdrawn: "기간 중 총 인출액",
    depletion: "자산 고갈 예상",
    error: "입력값을 확인해 주세요.",
    note: "이 계산은 수익률과 인출액이 일정하다고 가정한 단순 시뮬레이션입니다. 실제 시장 변동, 물가, 세금, 수수료와 인출 시점에 따라 결과는 크게 달라질 수 있습니다.",
    method:
      "매월 입력한 연 수익률을 월 수익률로 환산해 자산에 반영한 뒤 월 인출액을 차감합니다. 설정한 은퇴 기간까지 반복해 잔액과 총 인출액을 계산하고, 잔액이 0이 되면 고갈 시점을 표시합니다.",
    cautions:
      "특정 인출률을 안전하다고 보장하지 않습니다. 은퇴 기간, 자산배분, 물가, 세금, 시장 하락 순서와 기타 소득원을 함께 검토하세요.",
    metaTitle: "은퇴 인출 계산기 | 은퇴자산 지속기간 계산",
  },
  en: {
    title: "Retirement Withdrawal Calculator",
    description:
      "Model retirement withdrawals from a starting portfolio, monthly spending, expected return, and retirement horizon to estimate ending balance and depletion timing.",
    category: "Savings calculator",
    input: "Withdrawal plan assumptions",
    startingPortfolio: "Starting retirement portfolio",
    monthlyWithdrawal: "Monthly withdrawal",
    expectedReturn: "Expected annual return",
    retirementYears: "Retirement horizon",
    calculate: "Calculate withdrawal plan",
    reset: "Reset",
    result: "Retirement withdrawal results",
    endingBalance: "Projected ending balance",
    annualWithdrawal: "First-year annual withdrawal",
    withdrawalRate: "Initial withdrawal rate",
    totalWithdrawn: "Total withdrawals",
    depletion: "Estimated depletion",
    error: "Check your inputs.",
    note: "This is a simplified constant-return, constant-withdrawal model. Real results can differ materially because of market volatility, inflation, taxes, fees, and withdrawal timing.",
    method:
      "Each month, the entered annual return is converted to a monthly rate, applied to the portfolio, and the monthly withdrawal is subtracted. The model runs through the selected retirement horizon or until the portfolio reaches zero.",
    cautions:
      "The calculator does not claim that any withdrawal rate is universally safe. Consider retirement length, asset allocation, inflation, taxes, sequence risk, and other income sources.",
    metaTitle: "Retirement Withdrawal Calculator | Portfolio Drawdown Planner",
  },
};
