export type PortfolioRebalancingLocale = "ko" | "en";

type Copy = {
  title: string;
  description: string;
  category: string;
  input: string;
  currentValue: string;
  targetWeight: string;
  calculate: string;
  reset: string;
  result: string;
  totalValue: string;
  totalBuy: string;
  totalSell: string;
  turnover: string;
  allocation: string;
  currentWeight: string;
  targetValue: string;
  trade: string;
  buy: string;
  sell: string;
  hold: string;
  error: string;
  note: string;
  method: string;
  cautions: string;
  metaTitle: string;
  assetNames: string[];
};

export const portfolioRebalancingContent: Record<
  PortfolioRebalancingLocale,
  Copy
> = {
  ko: {
    title: "포트폴리오 리밸런싱 계산기",
    description:
      "현재 자산별 금액과 목표 비중을 입력해 목표 포트폴리오에 맞추기 위해 자산별로 얼마를 사고팔아야 하는지 계산합니다.",
    category: "투자 계산기",
    input: "현재 포트폴리오와 목표 비중",
    currentValue: "현재 금액",
    targetWeight: "목표 비중",
    calculate: "리밸런싱 계산하기",
    reset: "초기화",
    result: "리밸런싱 결과",
    totalValue: "현재 포트폴리오 총액",
    totalBuy: "필요 매수액",
    totalSell: "필요 매도액",
    turnover: "리밸런싱 회전율",
    allocation: "자산별 조정안",
    currentWeight: "현재 비중",
    targetValue: "목표 금액",
    trade: "조정 금액",
    buy: "매수",
    sell: "매도",
    hold: "유지",
    error: "현재 금액은 0 이상이어야 하고 목표 비중의 합은 정확히 100%여야 합니다.",
    note: "매수액과 매도액은 세금, 거래 수수료, 최소 주문 단위, 현금 유입·유출을 반영하지 않은 이론적 조정액입니다.",
    method:
      "현재 자산 금액을 합산해 포트폴리오 총액을 구한 뒤 각 목표 비중을 곱해 목표 금액을 계산합니다. 목표 금액에서 현재 금액을 뺀 값이 양수면 매수, 음수면 매도 금액입니다. 회전율은 전체 절대 조정액의 절반을 현재 총액으로 나눠 계산합니다.",
    cautions:
      "목표 비중은 투자 성향과 위험 수준에 따라 달라질 수 있습니다. 실제 주문 전에는 세금, 수수료, 매매 가능 단위, 계좌별 제한과 시장 가격 변동을 확인하세요.",
    metaTitle: "포트폴리오 리밸런싱 계산기 | 목표 비중 매수·매도 계산",
    assetNames: ["자산 1", "자산 2", "자산 3", "자산 4"],
  },
  en: {
    title: "Portfolio Rebalancing Calculator",
    description:
      "Enter current asset values and target weights to calculate how much of each asset to buy or sell to reach your target allocation.",
    category: "Investment calculator",
    input: "Current portfolio and target allocation",
    currentValue: "Current value",
    targetWeight: "Target weight",
    calculate: "Calculate rebalancing trades",
    reset: "Reset",
    result: "Rebalancing results",
    totalValue: "Current portfolio value",
    totalBuy: "Required buys",
    totalSell: "Required sells",
    turnover: "Rebalancing turnover",
    allocation: "Asset-by-asset adjustments",
    currentWeight: "Current weight",
    targetValue: "Target value",
    trade: "Adjustment",
    buy: "Buy",
    sell: "Sell",
    hold: "Hold",
    error: "Current values must be zero or greater and target weights must add up to exactly 100%.",
    note: "Buy and sell amounts are theoretical adjustments before taxes, trading fees, minimum order sizes, and external cash flows.",
    method:
      "The calculator totals the current asset values, multiplies that total by each target weight, and compares the resulting target value with the current value. Positive differences are buys and negative differences are sells. Turnover equals half of total absolute trades divided by current portfolio value.",
    cautions:
      "Target allocations depend on your goals and risk tolerance. Before trading, consider taxes, fees, tradable lot sizes, account restrictions, and market-price movement.",
    metaTitle: "Portfolio Rebalancing Calculator | Buy and Sell Targets",
    assetNames: ["Asset 1", "Asset 2", "Asset 3", "Asset 4"],
  },
};
