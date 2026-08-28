export type CryptoAverageCostLocale = "ko" | "en";

export const cryptoAverageCostContent = {
  ko: {
    title: "암호화폐 평균단가 계산기",
    description:
      "현재 보유 수량과 평균단가, 추가 매수 수량과 가격을 입력해 새로운 평균 매수가와 총 투자금액을 계산합니다.",
    category: "투자",
    input: "평균단가 계산 입력",
    currentQuantity: "현재 보유 수량",
    currentAveragePrice: "현재 평균단가",
    additionalQuantity: "추가 매수 수량",
    additionalPrice: "추가 매수 가격",
    calculate: "새 평균단가 계산하기",
    reset: "초기화",
    result: "평균단가 계산 결과",
    newAveragePrice: "새 평균단가",
    totalQuantity: "총 보유 수량",
    totalCost: "총 투자금액",
    additionalCost: "추가 매수금액",
    averagePriceChangePercent: "평균단가 변화율",
    error:
      "수량과 가격을 올바르게 입력해 주세요. 총 수량은 0보다 커야 합니다.",
    note: "거래 수수료, 세금, 슬리피지, 환율 변동은 포함하지 않습니다. 표시 통화는 계산 결과의 단위만 바꾸며 환전하지 않습니다.",
    method:
      "기존 투자금액과 추가 매수금액을 더한 뒤 총 보유 수량으로 나눠 가중평균 매수가를 계산합니다.",
    tips: "추가 매수가 실제 평균단가에 미치는 영향을 확인하는 용도입니다. 계산 결과만으로 매수 결정을 내리기보다 수수료와 변동성도 함께 고려하세요.",
    metaTitle: "암호화폐 평균단가 계산기 | 코인 물타기·평단 계산",
  },
  en: {
    title: "Cryptocurrency Average Cost Calculator",
    description:
      "Combine your current crypto position with an additional purchase to calculate the new weighted average entry price and total cost basis.",
    category: "Investing",
    input: "Average cost inputs",
    currentQuantity: "Current quantity",
    currentAveragePrice: "Current average price",
    additionalQuantity: "Additional quantity",
    additionalPrice: "Additional purchase price",
    calculate: "Calculate new average",
    reset: "Reset",
    result: "Average cost results",
    newAveragePrice: "New average price",
    totalQuantity: "Total quantity",
    totalCost: "Total cost basis",
    additionalCost: "Additional purchase cost",
    averagePriceChangePercent: "Average-price change",
    error:
      "Enter valid nonnegative quantities and prices. Total quantity must be greater than zero.",
    note: "Trading fees, taxes, slippage, and FX movement are excluded. The display currency changes labels and formatting only; no exchange-rate conversion is performed.",
    method:
      "The calculator adds the existing cost basis to the additional purchase cost and divides the combined cost by the combined quantity.",
    tips: "Use this to understand how an additional purchase changes your average entry price. Consider fees and volatility separately before making an investment decision.",
    metaTitle: "Crypto Average Cost Calculator | Weighted Entry Price",
  },
} satisfies Record<CryptoAverageCostLocale, Record<string, string>>;
