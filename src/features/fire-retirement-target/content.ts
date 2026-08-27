export type FireRetirementTargetLocale = "ko" | "en";

type Copy = {
  title: string;
  description: string;
  category: string;
  input: string;
  monthlyExpenses: string;
  withdrawalRate: string;
  currentPortfolio: string;
  monthlyContribution: string;
  expectedReturn: string;
  calculate: string;
  reset: string;
  result: string;
  targetPortfolio: string;
  annualExpenses: string;
  fundingGap: string;
  fundedPercent: string;
  monthsToTarget: string;
  annualWithdrawal: string;
  error: string;
  note: string;
  method: string;
  cautions: string;
  metaTitle: string;
};

export const fireRetirementTargetContent: Record<
  FireRetirementTargetLocale,
  Copy
> = {
  ko: {
    title: "FIRE 은퇴 목표 계산기",
    description:
      "월 생활비와 목표 인출률을 기준으로 경제적 자유에 필요한 목표 자산, 현재 부족액, 달성률과 예상 도달 기간을 계산합니다.",
    category: "저축·연금 계산기",
    input: "FIRE 목표 설정",
    monthlyExpenses: "은퇴 후 예상 월 생활비",
    withdrawalRate: "목표 연간 인출률",
    currentPortfolio: "현재 투자자산",
    monthlyContribution: "매월 추가 투자",
    expectedReturn: "예상 연 수익률",
    calculate: "FIRE 목표 계산하기",
    reset: "초기화",
    result: "FIRE 목표 결과",
    targetPortfolio: "목표 자산",
    annualExpenses: "예상 연 생활비",
    fundingGap: "현재 부족액",
    fundedPercent: "현재 달성률",
    monthsToTarget: "예상 목표 도달 기간",
    annualWithdrawal: "목표 자산 기준 연 인출액",
    error: "입력값을 확인해 주세요.",
    note: "인출률과 기대수익률은 가정값입니다. 세금, 수수료, 물가, 수익률 변동과 실제 은퇴 기간에 따라 필요한 자산은 달라질 수 있습니다.",
    method:
      "목표 자산은 예상 연 생활비를 입력한 연간 인출률로 나눠 계산합니다. 목표까지의 기간은 현재 자산에 월 투자액을 더하고 입력한 연 수익률을 월 복리로 환산해 최대 100년까지 추정합니다.",
    cautions:
      "4% 규칙 같은 인출률은 보장 수익률이나 개인별 적정 은퇴율이 아닙니다. 은퇴 기간, 자산배분, 물가, 세금, 시장 하락 시점과 기타 소득원을 함께 고려하세요.",
    metaTitle: "FIRE 은퇴 목표 계산기 | 경제적 자유 목표 자산 계산",
  },
  en: {
    title: "FIRE Retirement Target Calculator",
    description:
      "Estimate a financial-independence portfolio target, funding gap, progress, and time to goal from spending and a chosen withdrawal rate.",
    category: "Savings calculator",
    input: "FIRE target assumptions",
    monthlyExpenses: "Expected monthly retirement spending",
    withdrawalRate: "Target annual withdrawal rate",
    currentPortfolio: "Current invested portfolio",
    monthlyContribution: "Monthly contribution",
    expectedReturn: "Expected annual return",
    calculate: "Calculate FIRE target",
    reset: "Reset",
    result: "FIRE target results",
    targetPortfolio: "Target portfolio",
    annualExpenses: "Estimated annual spending",
    fundingGap: "Current funding gap",
    fundedPercent: "Current progress",
    monthsToTarget: "Estimated time to target",
    annualWithdrawal: "Annual withdrawal at target",
    error: "Check your inputs.",
    note: "The withdrawal rate and return are assumptions. Taxes, fees, inflation, return volatility, and retirement length can materially change the required portfolio.",
    method:
      "The target portfolio equals estimated annual spending divided by the selected annual withdrawal rate. Time to target compounds the current portfolio at the entered annual return converted to a monthly rate and adds the monthly contribution for up to 100 years.",
    cautions:
      "A rule of thumb such as 4% is not a guaranteed return or a universally safe withdrawal rate. Consider retirement horizon, asset allocation, inflation, taxes, sequence risk, and other income sources.",
    metaTitle:
      "FIRE Retirement Target Calculator | Financial Independence Number",
  },
};
