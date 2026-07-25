import type { DividendYieldRateLocale } from "./validation";

type DividendYieldRateCopy = {
  title: string;
  description: string;
  category: string;
  input: string;
  sharePrice: string;
  annualDividendPerShare: string;
  investmentAmount: string;
  calculate: string;
  reset: string;
  result: string;
  dividendYield: string;
  estimatedAnnualDividend: string;
  estimatedMonthlyAverage: string;
  estimatedShares: string;
  error: string;
  note: string;
  method: string;
  cautions: string;
  metaTitle: string;
};

export const dividendYieldRateContent: Record<
  DividendYieldRateLocale,
  DividendYieldRateCopy
> = {
  ko: {
    title: "배당수익률 계산기",
    description:
      "현재 주가와 주당 연간 배당금으로 배당수익률과 투자금 기준 예상 배당금을 계산합니다.",
    category: "투자 계산기",
    input: "배당 조건",
    sharePrice: "현재 주가",
    annualDividendPerShare: "주당 연간 배당금",
    investmentAmount: "투자금액",
    calculate: "배당수익률 계산하기",
    reset: "초기화",
    result: "예상 결과",
    dividendYield: "배당수익률",
    estimatedAnnualDividend: "예상 연간 배당금",
    estimatedMonthlyAverage: "월평균 환산 배당금",
    estimatedShares: "예상 매수 가능 수량",
    error: "입력값을 확인해 주세요.",
    note:
      "세금, 환율, 거래 수수료와 배당 변경 가능성은 반영하지 않습니다.",
    method: "배당수익률은 주당 연간 배당금을 현재 주가로 나눈 값입니다.",
    cautions:
      "실제 배당금은 기업 정책과 지급 시점의 보유 수량에 따라 달라질 수 있습니다.",
    metaTitle: "배당수익률 계산기 | 예상 배당금 계산",
  },
  en: {
    title: "Dividend Yield Calculator",
    description:
      "Calculate dividend yield and estimated dividend income from share price and annual dividend per share.",
    category: "Investment calculator",
    input: "Dividend assumptions",
    sharePrice: "Current share price",
    annualDividendPerShare: "Annual dividend per share",
    investmentAmount: "Investment amount",
    calculate: "Calculate dividend yield",
    reset: "Reset",
    result: "Estimated results",
    dividendYield: "Dividend yield",
    estimatedAnnualDividend: "Estimated annual dividend",
    estimatedMonthlyAverage: "Monthly average equivalent",
    estimatedShares: "Estimated shares",
    error: "Check your inputs.",
    note: "Taxes, FX, fees, and dividend changes are excluded.",
    method:
      "Dividend yield equals annual dividend per share divided by the current share price.",
    cautions:
      "Actual dividends depend on company policy and shares held on the record date.",
    metaTitle: "Dividend Yield Calculator | Estimate Dividend Income",
  },
};
