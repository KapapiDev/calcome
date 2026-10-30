export const currencyConversionContent = {
  ko: {
    title: "환율 변환 계산기",
    metaTitle: "환율 변환 계산기 | 금액·역환율 계산",
    description:
      "직접 확인한 환율로 외화 금액과 역환율을 계산하세요. 환율 방향, 계산 예시와 수수료 제외 기준을 함께 확인할 수 있습니다.",
    method:
      "변환 금액 = 기준 통화 금액 × 환율입니다. 환율은 기준 통화 1단위당 변환 통화 금액을 입력하며, 역환율 = 1 ÷ 입력 환율입니다.",
    example:
      "가상의 예시 환율이 1 USD = 1,350 KRW일 때 100 USD × 1,350 = 135,000 KRW입니다. 역환율은 1 KRW ≈ 0.00074074 USD입니다. 이 숫자는 현재 환율이 아닙니다.",
    assumptions: [
      "기준·변환 통화를 바꾸면 해당 방향의 환율도 직접 바꿔야 합니다. 통화 선택은 환율을 자동으로 불러오지 않습니다.",
      "금액은 0 이상, 환율은 0보다 큰 값이며 두 통화는 서로 달라야 합니다.",
    ],
    limitations: [
      "은행·카드사·송금업체의 적용 시점과 매수·매도 방향을 확인하세요. ECB 등의 기준환율은 거래 체결 환율과 다를 수 있습니다.",
      "스프레드, 송금·카드 수수료와 세금은 별도로 반영하지 않습니다. 실제 수취액은 제공 기관의 최종 견적을 확인하세요.",
    ],
    guideLabel: "환율 방향과 적용 환율 확인 가이드",
    rateHelp:
      "기본값 1.25는 예시입니다. 선택한 통화의 실제 환율을 직접 입력하세요. 실시간 조회나 자동 역환율 전환은 하지 않습니다.",
  },
  en: {
    title: "Currency Converter Calculator",
    metaTitle: "Currency Converter Calculator | Amount & Inverse Rate",
    description:
      "Convert an amount with an exchange rate you enter. Check the rate direction, inverse rate, worked example and excluded transaction fees.",
    method:
      "Converted amount = base-currency amount × exchange rate. Enter quote-currency units per one base-currency unit. Inverse rate = 1 ÷ entered rate.",
    example:
      "With a hypothetical rate of 1 USD = 0.92 EUR, 100 USD × 0.92 = 92 EUR. The inverse is 1 EUR ≈ 1.08695652 USD. This is an illustration, not a current exchange rate.",
    assumptions: [
      "When you change the base or quote currency, enter the rate for the new direction yourself. Currency selections do not fetch a rate.",
      "The amount must be at least zero, the rate must be positive, and the two currencies must differ.",
    ],
    limitations: [
      "Check the provider's timing and buy/sell direction. Reference rates such as the ECB's can differ from the rate applied to your transaction.",
      "Spreads, transfer/card fees and taxes are not added separately. Confirm the final receivable amount with your provider.",
    ],
    guideLabel: "Check exchange-rate direction and provider rates",
    rateHelp:
      "The default 1.25 is an example. Enter the actual rate for your selected currencies. Rates are not fetched live or inverted automatically.",
  },
} as const;
