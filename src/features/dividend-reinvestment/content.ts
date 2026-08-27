export type DividendReinvestmentLocale = "ko" | "en";

type Copy = {
  title: string;
  description: string;
  category: string;
  input: string;
  initialInvestment: string;
  dividendYield: string;
  priceGrowth: string;
  dividendGrowth: string;
  years: string;
  calculate: string;
  reset: string;
  result: string;
  reinvestedEndingValue: string;
  cashDividendEndingValue: string;
  reinvestmentAdvantage: string;
  reinvestedDividends: string;
  cashDividends: string;
  finalDividendIncome: string;
  error: string;
  note: string;
  method: string;
  cautions: string;
  metaTitle: string;
};

export const dividendReinvestmentContent: Record<
  DividendReinvestmentLocale,
  Copy
> = {
  ko: {
    title: "배당 재투자 계산기",
    description:
      "초기 투자금, 배당수익률, 주가 성장률, 배당 성장률과 투자기간을 바탕으로 배당을 재투자했을 때와 현금으로 받은 경우의 장기 결과를 비교합니다.",
    category: "투자 계산기",
    input: "배당 재투자 가정",
    initialInvestment: "초기 투자금",
    dividendYield: "초기 연 배당수익률",
    priceGrowth: "연 주가 성장률",
    dividendGrowth: "연 배당 성장률",
    years: "투자 기간",
    calculate: "배당 재투자 효과 계산하기",
    reset: "초기화",
    result: "배당 재투자 결과",
    reinvestedEndingValue: "재투자 시 최종 자산",
    cashDividendEndingValue: "현금 배당 시 총 가치",
    reinvestmentAdvantage: "재투자 효과 차이",
    reinvestedDividends: "재투자된 누적 배당",
    cashDividends: "현금으로 받은 누적 배당",
    finalDividendIncome: "마지막 해 예상 연 배당",
    error: "입력값을 확인해 주세요.",
    note: "이 계산은 배당이 매년 말 지급되고 즉시 같은 자산에 재투자되며, 입력한 주가 성장률과 배당 성장률이 매년 일정하다고 가정합니다. 세금, 수수료, 환율, 배당 삭감과 시장 변동은 반영하지 않습니다.",
    method:
      "초기 가격을 기준값 1로 두고 초기 투자금을 보유 수량으로 환산합니다. 매년 주가와 주당 배당을 각각 입력한 성장률만큼 조정하고, 재투자 시나리오는 받은 배당으로 해당 연도 말 가격에 추가 수량을 매수합니다. 현금 배당 시나리오는 초기 수량을 유지한 채 배당을 현금으로 누적해 두 결과를 비교합니다.",
    cautions:
      "배당수익률과 배당 성장률은 보장되지 않으며 실제 배당은 감소하거나 중단될 수 있습니다. 이 결과는 투자수익을 보장하거나 특정 종목 매수를 권유하지 않는 단순 장기 시뮬레이션입니다.",
    metaTitle: "배당 재투자 계산기 | DRIP 복리 효과 비교",
  },
  en: {
    title: "Dividend Reinvestment Calculator",
    description:
      "Compare the long-term outcome of reinvesting dividends versus taking them in cash using an initial investment, dividend yield, price growth, dividend growth, and holding period.",
    category: "Investment calculator",
    input: "Dividend reinvestment assumptions",
    initialInvestment: "Initial investment",
    dividendYield: "Initial annual dividend yield",
    priceGrowth: "Annual price growth",
    dividendGrowth: "Annual dividend growth",
    years: "Investment period",
    calculate: "Calculate dividend reinvestment",
    reset: "Reset",
    result: "Dividend reinvestment results",
    reinvestedEndingValue: "Ending value with reinvestment",
    cashDividendEndingValue: "Total value taking cash dividends",
    reinvestmentAdvantage: "Reinvestment difference",
    reinvestedDividends: "Cumulative dividends reinvested",
    cashDividends: "Cumulative cash dividends",
    finalDividendIncome: "Estimated final-year dividend income",
    error: "Check your inputs.",
    note: "This model assumes annual dividends are paid at year-end and immediately reinvested into the same asset, with constant price-growth and dividend-growth assumptions. Taxes, fees, FX, dividend cuts, and market volatility are not included.",
    method:
      "The model normalizes the starting share price to 1 and treats the initial investment as the starting share count. Each year it grows the share price and dividend per share by the entered assumptions. The reinvestment scenario buys additional shares at year-end with that year's dividend, while the cash-dividend scenario keeps the original shares and accumulates dividends separately.",
    cautions:
      "Dividend yield and dividend growth are not guaranteed, and dividends can be reduced or suspended. This is a planning simulation, not a return guarantee or recommendation to buy any security.",
    metaTitle: "Dividend Reinvestment Calculator | DRIP Compounding",
  },
};
