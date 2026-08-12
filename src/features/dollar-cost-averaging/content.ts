import type { DollarCostAveragingLocale } from "./validation";

type DollarCostAveragingCopy = {
  title: string;
  description: string;
  category: string;
  input: string;
  initialInvestment: string;
  monthlyContribution: string;
  annualReturnPercent: string;
  years: string;
  calculate: string;
  reset: string;
  result: string;
  endingBalance: string;
  totalInvested: string;
  estimatedGain: string;
  months: string;
  error: string;
  note: string;
  method: string;
  cautions: string;
  metaTitle: string;
};

export const dollarCostAveragingContent: Record<
  DollarCostAveragingLocale,
  DollarCostAveragingCopy
> = {
  ko: {
    title: "적립식 투자 계산기",
    description:
      "초기 투자금과 매월 적립액, 예상 연 수익률, 투자 기간으로 적립식 투자 결과를 계산합니다.",
    category: "투자 계산기",
    input: "투자 조건",
    initialInvestment: "초기 투자금",
    monthlyContribution: "매월 투자금",
    annualReturnPercent: "예상 연 수익률",
    years: "투자 기간",
    calculate: "적립식 투자 계산하기",
    reset: "초기화",
    result: "예상 결과",
    endingBalance: "예상 최종 자산",
    totalInvested: "총 투자원금",
    estimatedGain: "예상 투자수익",
    months: "총 투자 개월",
    error: "입력값을 확인해 주세요.",
    note: "매월 말 동일 금액을 투자하고 수익률이 일정하다고 가정합니다.",
    method:
      "연 수익률을 월 수익률로 환산해 초기 투자금과 매월 말 납입액을 월복리로 계산합니다.",
    cautions:
      "세금, 거래 수수료, 환율, 실제 시장 변동성은 반영하지 않으며 미래 수익을 보장하지 않습니다.",
    metaTitle: "적립식 투자 계산기 | DCA 복리 수익 계산",
  },
  en: {
    title: "Dollar-Cost Averaging Calculator",
    description:
      "Estimate a DCA investment balance from an initial investment, monthly contribution, expected annual return, and investment period.",
    category: "Investment calculator",
    input: "Investment assumptions",
    initialInvestment: "Initial investment",
    monthlyContribution: "Monthly contribution",
    annualReturnPercent: "Expected annual return",
    years: "Investment period",
    calculate: "Calculate DCA growth",
    reset: "Reset",
    result: "Estimated results",
    endingBalance: "Estimated ending balance",
    totalInvested: "Total invested",
    estimatedGain: "Estimated investment gain",
    months: "Total months",
    error: "Check your inputs.",
    note: "Assumes equal contributions at the end of each month and a constant return.",
    method:
      "The annual return is converted to a monthly rate, then the initial investment and month-end contributions are compounded monthly.",
    cautions:
      "Taxes, fees, FX, and market volatility are excluded. The estimate does not guarantee future returns.",
    metaTitle: "Dollar-Cost Averaging Calculator | DCA Investment Growth",
  },
};
