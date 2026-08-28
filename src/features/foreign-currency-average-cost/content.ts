export type ForeignCurrencyAverageCostLocale = "ko" | "en";

export const foreignCurrencyAverageCostContent = {
  ko: {
    title: "외화 평균단가 계산기",
    description:
      "현재 보유한 외화의 수량과 평균 환율, 추가 매수할 외화 수량과 환율을 입력해 새로운 가중평균 환율과 총 매입 원가를 계산합니다.",
    category: "투자",
    input: "외화 매수 조건",
    baseCurrency: "보유 외화",
    quoteCurrency: "결제 통화",
    currentAmount: "현재 외화 보유량",
    currentAverageRate: "현재 평균 환율",
    additionalAmount: "추가 매수 외화량",
    additionalRate: "추가 매수 환율",
    calculate: "새 평균 환율 계산하기",
    reset: "초기화",
    result: "외화 평균단가 결과",
    newAverageRate: "새 평균 환율",
    totalForeignAmount: "총 외화 보유량",
    totalQuoteCost: "총 매입 원가",
    additionalCost: "추가 매입 원가",
    averageRateChangePercent: "평균 환율 변화율",
    error:
      "통화와 수량·환율을 확인해 주세요. 총 외화량은 0보다 커야 하고 실제 보유·매수 수량의 환율은 0보다 커야 합니다.",
    note: "실시간 환율을 조회하거나 환전하지 않습니다. 환율은 '외화 1단위당 결제 통화' 기준으로 직접 입력하며 스프레드·환전 수수료·세금은 포함하지 않습니다.",
    method:
      "기존 외화 매입 원가와 추가 매입 원가를 각각 외화 수량 × 해당 환율로 계산해 더한 뒤, 총 외화 수량으로 나눠 가중평균 환율을 구합니다.",
    tips: "은행·증권사·카드사가 실제 적용한 환율은 기준환율과 다를 수 있습니다. 거래 명세의 적용 환율을 입력해야 실제 평균 매입 환율에 더 가까운 결과를 얻을 수 있습니다.",
    metaTitle: "외화 평균단가 계산기 | 달러·엔화 환율 평단 계산",
  },
  en: {
    title: "Foreign-Currency Average Cost Calculator",
    description:
      "Combine an existing foreign-currency position with an additional purchase to calculate the new weighted average exchange rate and total cost basis.",
    category: "Investing",
    input: "Foreign-currency purchase inputs",
    baseCurrency: "Foreign currency held",
    quoteCurrency: "Payment currency",
    currentAmount: "Current foreign-currency amount",
    currentAverageRate: "Current average exchange rate",
    additionalAmount: "Additional foreign-currency amount",
    additionalRate: "Additional purchase exchange rate",
    calculate: "Calculate new average rate",
    reset: "Reset",
    result: "Foreign-currency average cost results",
    newAverageRate: "New average exchange rate",
    totalForeignAmount: "Total foreign-currency amount",
    totalQuoteCost: "Total cost basis",
    additionalCost: "Additional purchase cost",
    averageRateChangePercent: "Average-rate change",
    error:
      "Check the currencies, amounts, and rates. Total foreign-currency amount must be greater than zero and funded positions require rates above zero.",
    note: "This calculator does not fetch live FX rates or perform conversion. Enter rates as payment-currency units per 1 unit of foreign currency. Spreads, exchange fees, and taxes are excluded.",
    method:
      "It multiplies each foreign-currency amount by its exchange rate to get cost basis, adds the existing and additional costs, and divides the combined cost by the combined foreign-currency amount.",
    tips: "The rate actually applied by a bank, broker, or card provider can differ from a reference market rate. Use the applied transaction rate from your records for a closer cost-basis estimate.",
    metaTitle: "Foreign-Currency Average Cost Calculator | Weighted FX Rate",
  },
} satisfies Record<ForeignCurrencyAverageCostLocale, Record<string, string>>;
