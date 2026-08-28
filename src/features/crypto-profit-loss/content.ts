export type CryptoProfitLossLocale = "ko" | "en";

export const cryptoProfitLossContent = {
  ko: {
    title: "암호화폐 손익 계산기",
    description:
      "보유 수량, 평균 매수가, 현재 가격과 거래 수수료를 입력해 코인 평가손익, 수익률, 손익분기 가격을 계산합니다.",
    category: "투자",
    input: "손익 계산 입력",
    quantity: "보유 수량",
    averageEntryPrice: "평균 매수가",
    currentPrice: "현재 가격",
    buyFeePercent: "매수 수수료율 (%)",
    sellFeePercent: "매도 수수료율 (%)",
    calculate: "손익 계산하기",
    reset: "초기화",
    result: "손익 계산 결과",
    profitLoss: "예상 순손익",
    returnPercent: "예상 수익률",
    netCurrentValue: "매도 수수료 차감 후 평가금액",
    totalCostBasis: "매수 수수료 포함 투자원금",
    breakEvenPrice: "손익분기 가격",
    estimatedSellFee: "예상 매도 수수료",
    error:
      "수량과 가격을 올바르게 입력해 주세요. 수량과 평균 매수가는 0보다 커야 하며 수수료율은 100% 미만이어야 합니다.",
    note: "입력한 매수·매도 수수료만 반영합니다. 세금, 슬리피지, 펀딩비, 스프레드, 환율 변동은 포함하지 않습니다. 표시 통화 변경은 환전이 아닙니다.",
    method:
      "평균 매수가 기준 투자원금에 매수 수수료를 더하고, 현재 평가금액에서 예상 매도 수수료를 뺀 뒤 두 금액의 차이를 손익으로 계산합니다. 손익분기 가격은 매도 수수료까지 회수하는 가격입니다.",
    tips: "거래소별 수수료율과 실제 체결 가격은 다를 수 있습니다. 결과는 투자 성과를 정리하는 보조 계산으로 사용하고 실제 거래 명세와 함께 확인하세요.",
    metaTitle: "암호화폐 손익 계산기 | 코인 수익률·손익분기 가격",
  },
  en: {
    title: "Cryptocurrency Profit and Loss Calculator",
    description:
      "Calculate crypto profit or loss, return percentage, net current value, and break-even price from quantity, average entry price, current price, and trading fees.",
    category: "Investing",
    input: "Profit and loss inputs",
    quantity: "Quantity held",
    averageEntryPrice: "Average entry price",
    currentPrice: "Current price",
    buyFeePercent: "Buy fee (%)",
    sellFeePercent: "Sell fee (%)",
    calculate: "Calculate profit or loss",
    reset: "Reset",
    result: "Profit and loss results",
    profitLoss: "Estimated net profit/loss",
    returnPercent: "Estimated return",
    netCurrentValue: "Net current value after sell fee",
    totalCostBasis: "Cost basis including buy fee",
    breakEvenPrice: "Break-even price",
    estimatedSellFee: "Estimated sell fee",
    error:
      "Enter valid quantities and prices. Quantity and average entry price must be greater than zero, and fee rates must be below 100%.",
    note: "Only the buy and sell fees you enter are included. Taxes, slippage, funding fees, spreads, and FX movement are excluded. Changing display currency does not perform FX conversion.",
    method:
      "The calculator adds the buy fee to the average-entry cost basis, subtracts the estimated sell fee from current market value, and compares the two amounts. Break-even price includes the sell fee needed to recover the full cost basis.",
    tips: "Actual exchange fees and execution prices can differ. Use this as a position-performance aid and compare the result with your exchange transaction records.",
    metaTitle: "Crypto Profit and Loss Calculator | ROI & Break-Even Price",
  },
} satisfies Record<CryptoProfitLossLocale, Record<string, string>>;
