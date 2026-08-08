export type RealEstateBrokerageFeeLocale = "ko" | "en";

export const realEstateBrokerageFeeContent = {
  ko: {
    title: "부동산 중개보수 계산기",
    metaTitle: "부동산 중개보수 계산기 | 예상 중개비 계산",
    description:
      "거래금액과 직접 확인한 중개보수율, 부가세율로 예상 중개비를 계산합니다.",
    category: "부동산 계산기",
    intro:
      "매매·임대차 계약에 적용할 요율을 확인한 뒤 예상 중개보수와 부가세를 비교해 보세요.",
    input: "중개보수 조건",
    transactionAmount: "거래금액 또는 환산 보증금",
    feeRate: "확인한 중개보수율",
    vatRate: "부가세율",
    calculate: "예상 중개비 계산하기",
    reset: "초기화",
    error: "입력값을 확인해 주세요.",
    result: "계산된 중개비",
    brokerageFee: "중개보수",
    vat: "부가세",
    totalFee: "예상 총 중개비",
    effectiveRate: "부가세 포함 실효 요율",
    details: "계산 상세",
    empty: "계산하면 중개보수와 부가세가 표시됩니다.",
    note: "입력한 거래금액과 요율을 단순 적용한 추정치입니다.",
    explanationTitle: "계산 방법",
    explanation: [
      "거래 유형과 지역에 맞게 확인한 거래금액과 중개보수율을 입력합니다.",
      "거래금액에 중개보수율을 곱해 중개보수를 계산합니다.",
      "중개보수에 입력한 부가세율을 적용해 총 중개비를 계산합니다.",
    ],
    cautionsTitle: "중요한 주의사항",
    cautions: [
      "이 계산기는 거래 유형별 법정 상한요율이나 지역 조례를 자동 판단하지 않습니다.",
      "월세 거래금액 환산 방식, 상한액, 부가세 과세 여부를 계약 전에 직접 확인하세요.",
      "취득세, 등기비용, 법무사 비용, 이사비와 대출 비용은 포함되지 않습니다.",
    ],
    faq: [
      [
        "어떤 요율을 입력해야 하나요?",
        "거래 유형, 거래금액, 소재지와 계약 시점에 적용되는 상한요율 및 실제 협의 요율을 확인해 입력하세요.",
      ],
      [
        "월세 거래금액은 어떻게 입력하나요?",
        "적용 지역과 계약 조건에 맞는 환산 방식을 확인해 계산된 환산 보증금을 입력하세요.",
      ],
      [
        "부가세는 항상 10%인가요?",
        "사업자 유형과 거래 조건에 따라 달라질 수 있으므로 실제 청구 내용을 확인하세요.",
      ],
      [
        "결과가 법정 상한액인가요?",
        "아니요. 사용자가 입력한 요율의 단순 계산 결과이므로 상한요율과 상한액은 별도로 검토해야 합니다.",
      ],
    ] as const,
  },
  en: {
    title: "South Korea Real Estate Brokerage Fee Calculator",
    metaTitle:
      "South Korea Real Estate Brokerage Fee Calculator | KRW Estimate",
    description:
      "Estimate a South Korean real estate brokerage fee in KRW from the transaction amount, confirmed fee rate, and VAT rate.",
    category: "Real estate calculator",
    intro:
      "This calculator applies to South Korea. Enter every monetary amount in KRW after confirming the rate for your sale or lease.",
    input: "South Korea brokerage assumptions (KRW)",
    transactionAmount: "Transaction amount or converted deposit (KRW)",
    feeRate: "Confirmed brokerage fee rate",
    vatRate: "VAT rate",
    calculate: "Estimate brokerage fee",
    reset: "Reset",
    error: "Check the highlighted values.",
    result: "Calculated brokerage fee",
    brokerageFee: "Brokerage fee (KRW)",
    vat: "VAT (KRW)",
    totalFee: "Estimated total fee (KRW)",
    effectiveRate: "Effective rate including VAT",
    details: "Calculation details",
    empty: "Calculate to see the brokerage fee and VAT.",
    note: "A South Korea planning estimate in KRW using the transaction amount and rates you entered.",
    explanationTitle: "How it is calculated",
    explanation: [
      "Enter the transaction amount and rate confirmed for the property type and location.",
      "The confirmed fee rate is applied to the transaction amount.",
      "The entered VAT rate is applied to the brokerage fee and added to the total.",
    ],
    cautionsTitle: "Important cautions",
    cautions: [
      "This calculator does not determine statutory rate caps or local rules for the transaction.",
      "Confirm the monthly-rent conversion method, fee cap, and VAT treatment before signing.",
      "Acquisition tax, registration, legal, moving, and financing costs are excluded.",
    ],
    faq: [
      [
        "Which fee rate should I enter?",
        "Confirm the cap and negotiated rate for the transaction type, amount, location, and contract date.",
      ],
      [
        "What amount should I enter for monthly rent?",
        "Confirm the applicable conversion method and enter the resulting converted deposit amount.",
      ],
      [
        "Is VAT always 10%?",
        "Not necessarily. Confirm the broker's tax status and the actual invoice.",
      ],
      [
        "Is the result the legal maximum?",
        "No. It is a simple result from your entered rate; verify the applicable cap separately.",
      ],
    ] as const,
  },
} as const;
