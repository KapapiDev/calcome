export type ValueAddedTaxLocale = "ko" | "en";

export const valueAddedTaxContent = {
  ko: {
    title: "부가가치세 계산기",
    metaTitle: "부가가치세 계산기 | 공급가액·부가세 계산",
    category: "세금 계산기",
    description:
      "공급가액에 부가가치세를 더하거나 합계금액에서 공급가액과 부가세를 역산합니다.",
    intro:
      "금액 기준을 선택하고 거래에 적용되는 세율을 확인해 입력하세요. 기본값은 일반적인 10%입니다.",
    input: "금액과 부가가치세율",
    amount: "계산할 금액",
    taxRate: "적용 부가가치세율",
    mode: "금액 기준",
    exclusive: "공급가액 (부가세 별도)",
    inclusive: "합계금액 (부가세 포함)",
    calculate: "부가가치세 계산하기",
    reset: "초기화",
    error: "입력값을 확인해 주세요.",
    result: "부가가치세 계산 결과",
    totalAmount: "합계금액",
    supplyAmount: "공급가액",
    taxAmount: "부가가치세",
    empty: "계산하면 공급가액, 부가가치세와 합계금액을 표시합니다.",
    note: "표시 금액은 원 단위로 반올림한 계획용 추정치입니다. 세금계산서 작성 시 실제 단수 처리 기준을 확인하세요.",
    explanationTitle: "계산 방법",
    explanation: [
      "부가세 별도를 선택하면 공급가액에 입력한 세율을 곱해 부가가치세를 계산합니다.",
      "부가세 포함을 선택하면 합계금액을 1 + 세율로 나누어 공급가액을 역산합니다.",
      "합계금액은 공급가액과 부가가치세의 합입니다.",
    ],
    cautionsTitle: "중요한 주의사항",
    cautions: [
      "면세·영세율 거래인지와 실제 적용 세율은 거래 유형과 법령에 따라 달라질 수 있습니다.",
      "이 계산기는 매입세액 공제, 의제매입세액, 예정·확정신고 세액을 자동 계산하지 않습니다.",
      "신고나 세금계산서 발행 전 국세청 안내 또는 세무 전문가를 통해 적용 기준을 확인하세요.",
    ],
    faq: [
      [
        "부가세 포함 금액은 어떻게 계산하나요?",
        "금액 기준에서 합계금액을 선택하면 공급가액과 부가세를 역산합니다.",
      ],
      [
        "항상 10%를 적용하나요?",
        "아닙니다. 기본값만 10%이며 거래에 맞는 세율을 직접 입력할 수 있습니다.",
      ],
      [
        "소수점 금액은 어떻게 표시되나요?",
        "내부 계산은 정밀하게 수행하고 화면에는 원 단위로 반올림해 표시합니다.",
      ],
      [
        "신고할 부가세도 계산되나요?",
        "아닙니다. 개별 거래 금액의 공급가액과 부가세를 나누는 계획용 계산입니다.",
      ],
    ] as const,
  },
  en: {
    title: "South Korea Value Added Tax Calculator",
    metaTitle: "South Korea VAT Calculator | KRW Supply Amount and Tax",
    category: "Tax calculator",
    description:
      "Add South Korean VAT to a KRW supply amount or extract the supply amount and VAT from a tax-inclusive KRW total.",
    intro:
      "This calculator applies to South Korea. Enter the amount in KRW, choose what it represents, and confirm the rate for the transaction. The default is the common 10% rate.",
    input: "South Korea amount (KRW) and VAT rate",
    amount: "Amount to calculate (KRW)",
    taxRate: "Applicable VAT rate",
    mode: "Amount basis",
    exclusive: "Supply amount (VAT excluded)",
    inclusive: "Total amount (VAT included)",
    calculate: "Calculate VAT",
    reset: "Reset",
    error: "Check the highlighted values.",
    result: "VAT calculation result",
    totalAmount: "Total amount (KRW)",
    supplyAmount: "Supply amount (KRW)",
    taxAmount: "Value added tax (KRW)",
    empty: "Calculate to see the supply amount, VAT, and total amount.",
    note: "Displayed amounts are South Korea planning estimates rounded to the nearest KRW. Confirm the required rounding method when issuing a tax invoice.",
    explanationTitle: "How it is calculated",
    explanation: [
      "For VAT excluded, the supply amount is multiplied by the entered rate to calculate VAT.",
      "For VAT included, the total is divided by one plus the rate to derive the supply amount.",
      "The total amount equals the supply amount plus VAT.",
    ],
    cautionsTitle: "Important cautions",
    cautions: [
      "Exempt or zero-rated treatment and the applicable rate depend on the transaction and current rules.",
      "This calculator does not determine input-tax credits, deemed input tax, or VAT return liability.",
      "Confirm the applicable treatment with Korea's National Tax Service or a tax professional before filing or invoicing.",
    ],
    faq: [
      [
        "How do I calculate from a VAT-inclusive total?",
        "Select total amount to extract the supply amount and VAT.",
      ],
      [
        "Does it always use 10%?",
        "No. Ten percent is only the default; enter the rate applicable to the transaction.",
      ],
      [
        "How are fractional won displayed?",
        "The calculation retains precision internally and displays amounts rounded to the nearest won.",
      ],
      [
        "Does this calculate my VAT return?",
        "No. It separates VAT for one transaction as a planning estimate.",
      ],
    ] as const,
  },
} as const;
