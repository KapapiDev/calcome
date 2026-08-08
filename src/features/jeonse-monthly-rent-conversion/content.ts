export type JeonseMonthlyRentConversionLocale = "ko" | "en";

export const jeonseMonthlyRentConversionContent = {
  ko: {
    title: "전세 월세 전환 계산기",
    metaTitle: "전세 월세 전환 계산기 | 예상 월세 계산",
    description:
      "전세 보증금과 월세 보증금, 확인한 연 전환율로 예상 월세를 계산합니다.",
    category: "부동산 계산기",
    intro:
      "전세 보증금 일부를 월세로 전환할 때 예상되는 보증금과 월세 조건을 비교해 보세요.",
    input: "전환 조건",
    jeonseDeposit: "전세 보증금",
    monthlyDeposit: "월세 보증금",
    annualRate: "연 전환율",
    calculate: "예상 월세 계산하기",
    reset: "초기화",
    error: "입력값을 확인해 주세요.",
    result: "계산된 월세 조건",
    monthlyRent: "예상 월세",
    annualRent: "연간 월세 합계",
    convertedDeposit: "전환된 보증금 차액",
    monthlyRate: "월 전환율",
    details: "계산 상세",
    empty: "계산하면 예상 월세와 전환 금액이 표시됩니다.",
    note: "입력한 연 전환율을 보증금 차액에 적용한 단순 환산 결과입니다.",
    explanationTitle: "계산 방법",
    explanation: [
      "전세 보증금에서 희망 월세 보증금을 빼 전환할 보증금 차액을 구합니다.",
      "보증금 차액에 입력한 연 전환율을 곱해 연간 월세 합계를 구합니다.",
      "연간 월세 합계를 12로 나눠 예상 월세를 계산합니다.",
    ],
    cautionsTitle: "중요한 주의사항",
    cautions: [
      "전환율은 계약 시점과 조건에 맞는 값을 직접 확인해 입력해야 하며, 이 계산기는 법정 상한을 자동 판단하지 않습니다.",
      "계산 결과는 비교용 추정치이며 임대인과 임차인 사이의 실제 계약 조건을 결정하지 않습니다.",
      "관리비, 대출 이자, 보증금 운용수익, 세금과 중개비는 계산에 포함되지 않습니다.",
    ],
    faq: [
      [
        "전세를 월세로 어떻게 환산하나요?",
        "전세 보증금과 월세 보증금의 차액에 연 전환율을 적용한 뒤 12개월로 나눕니다.",
      ],
      [
        "어떤 전환율을 입력해야 하나요?",
        "계약 시점의 최신 법령, 지역과 주택 조건, 실제 제안을 확인해 적용할 연 전환율을 입력하세요.",
      ],
      [
        "월세 보증금을 0원으로 입력할 수 있나요?",
        "네. 전세 보증금 전액을 월세로 전환하는 조건도 계산할 수 있습니다.",
      ],
      [
        "계산된 월세가 법적으로 허용되는 금액인가요?",
        "아니요. 법정 상한과 적용 요건은 별도로 확인해야 합니다.",
      ],
    ] as const,
  },
  en: {
    title: "South Korea Jeonse to Monthly Rent Conversion Calculator",
    metaTitle: "South Korea Jeonse to Monthly Rent Calculator | KRW Estimate",
    description:
      "Estimate monthly rent in KRW from a South Korean jeonse deposit, target rent deposit, and confirmed annual conversion rate.",
    category: "Real estate calculator",
    intro:
      "This calculator applies to South Korea. Enter every monetary amount in KRW to compare an offer when part of a jeonse deposit is converted to monthly rent.",
    input: "South Korea conversion assumptions (KRW)",
    jeonseDeposit: "Jeonse deposit (KRW)",
    monthlyDeposit: "Monthly-rent deposit (KRW)",
    annualRate: "Annual conversion rate",
    calculate: "Estimate monthly rent",
    reset: "Reset",
    error: "Check the highlighted values.",
    result: "Calculated monthly-rent terms",
    monthlyRent: "Estimated monthly rent (KRW)",
    annualRent: "Annual rent (KRW)",
    convertedDeposit: "Converted deposit difference (KRW)",
    monthlyRate: "Monthly conversion rate",
    details: "Calculation details",
    empty: "Calculate to see the estimated rent and converted amount.",
    note: "A South Korea planning estimate in KRW that applies your annual rate to the deposit difference.",
    explanationTitle: "How it is calculated",
    explanation: [
      "The target monthly-rent deposit is subtracted from the jeonse deposit.",
      "The entered annual conversion rate is applied to that deposit difference.",
      "The resulting annual rent is divided by 12 to estimate monthly rent.",
    ],
    cautionsTitle: "Important cautions",
    cautions: [
      "Confirm the rate that applies to the contract date and terms; this calculator does not automatically determine a statutory cap.",
      "The result is a comparison estimate and does not determine the actual agreement between landlord and tenant.",
      "Maintenance, financing, deposit returns, taxes, and brokerage costs are excluded.",
    ],
    faq: [
      [
        "How is jeonse converted to monthly rent?",
        "Apply the annual conversion rate to the difference between the jeonse and rent deposits, then divide by 12.",
      ],
      [
        "Which conversion rate should I enter?",
        "Verify current rules, the property and location, and the actual offer for the contract date.",
      ],
      [
        "Can the monthly-rent deposit be zero?",
        "Yes. You can estimate a conversion of the full jeonse deposit.",
      ],
      [
        "Is the estimated rent legally permitted?",
        "Not necessarily. Verify the current cap and eligibility separately.",
      ],
    ] as const,
  },
} as const;
