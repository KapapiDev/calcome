export type InflationPurchasingPowerLocale = "ko" | "en";

export const inflationPurchasingPowerContent = {
  ko: {
    title: "물가상승·구매력 계산기",
    description:
      "현재 금액과 예상 연 물가상승률, 기간을 입력해 미래의 같은 소비에 필요한 금액과 현재 돈의 실질 구매력을 비교합니다.",
    category: "저축·연금",
    input: "가정 입력",
    currentAmount: "현재 금액",
    annualInflationPercent: "예상 연 물가상승률",
    years: "기간",
    calculate: "계산하기",
    reset: "초기화",
    result: "구매력 변화",
    futurePurchasingPower: "미래 실질 구매력",
    purchasingPowerLoss: "구매력 감소액",
    purchasingPowerLossPercent: "구매력 변화율",
    futureNominalCost: "같은 소비에 필요한 미래 금액",
    cumulativeInflation: "누적 물가 변화율",
    error: "입력값을 확인해 주세요.",
    note: "입력한 물가상승률이 매년 동일하게 복리로 이어진다고 가정한 단순 비교입니다.",
    method:
      "물가상승률을 연 복리로 누적해 같은 상품·서비스를 미래에 구매하는 데 필요한 명목 금액을 계산하고, 현재 금액을 같은 물가 수준으로 할인해 실질 구매력을 보여줍니다.",
    cautions:
      "실제 소비자물가는 품목과 지역에 따라 다르고 매년 변합니다. 이 계산기는 사용자가 입력한 물가상승률을 적용한 시나리오 도구이며 미래 물가를 예측하지 않습니다.",
    related: "관련 계산기",
    metaTitle: "물가상승·구매력 계산기 | 미래 돈의 가치",
  },
  en: {
    title: "Inflation and Purchasing Power Calculator",
    description:
      "Enter a current amount, expected annual inflation rate, and time horizon to compare future prices with the real purchasing power of today's money.",
    category: "Savings & Retirement",
    input: "Assumptions",
    currentAmount: "Current amount",
    annualInflationPercent: "Expected annual inflation",
    years: "Time horizon",
    calculate: "Calculate",
    reset: "Reset",
    result: "Purchasing-power change",
    futurePurchasingPower: "Future real purchasing power",
    purchasingPowerLoss: "Purchasing-power change",
    purchasingPowerLossPercent: "Purchasing-power change rate",
    futureNominalCost: "Future cost for the same spending",
    cumulativeInflation: "Cumulative inflation",
    error: "Check the entered values.",
    note: "This is a simplified scenario that assumes the entered inflation rate compounds at the same rate each year.",
    method:
      "The calculator compounds the annual inflation assumption to estimate the future nominal cost of the same basket, then discounts today's amount by that factor to show its real purchasing power.",
    cautions:
      "Actual inflation varies over time, by location, and by spending category. This calculator applies your chosen assumption and does not forecast future inflation.",
    related: "Related calculators",
    metaTitle: "Inflation and Purchasing Power Calculator | Future Money Value",
  },
} satisfies Record<InflationPurchasingPowerLocale, Record<string, string>>;
