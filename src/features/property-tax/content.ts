export type PropertyTaxLocale = "ko" | "en";
export const propertyTaxContent = {
  ko: {
    title: "재산세 계산기",
    metaTitle: "재산세 계산기 | 과세표준·예상 세액 계산",
    category: "세금 계산기",
    description:
      "시가표준액과 확인한 공정시장가액비율·세율·누진공제액으로 예상 재산세와 부가세를 계산합니다.",
    intro:
      "주택·건축물·토지의 구분과 과세연도에 맞는 공정시장가액비율, 세율과 누진공제액을 고지서나 공식 안내에서 확인해 입력하세요.",
    input: "재산가액과 적용 세율",
    fields: {
      assessedValue: "시가표준액",
      taxBaseRate: "확인한 공정시장가액비율",
      propertyTaxRate: "확인한 재산세율",
      progressiveDeduction: "확인한 누진공제액",
      cityAreaTaxRate: "도시지역분 적용 세율",
    },
    calculate: "예상 재산세 계산하기",
    reset: "초기화",
    error: "입력값을 확인해 주세요.",
    result: "예상 재산세 결과",
    totalTax: "예상 총 세액",
    propertyTax: "재산세 본세",
    taxBase: "과세표준",
    details: "계산 상세",
    cityAreaTax: "도시지역분",
    localEducationTax: "지방교육세",
    effectiveRate: "시가표준액 대비 실효세율",
    empty: "계산하면 입력값에 따른 과세표준과 예상 세액을 표시합니다.",
    note: "입력한 단일 세율과 누진공제액을 적용하며 지방교육세는 재산세 본세의 20%로 계산한 계획용 추정치입니다.",
    explanationTitle: "계산 방법",
    explanation: [
      "과세표준은 시가표준액에 입력한 공정시장가액비율을 곱해 계산합니다.",
      "재산세 본세는 과세표준에 입력한 세율을 적용하고 누진공제액을 뺀 금액입니다.",
      "도시지역분과 지방교육세를 본세에 더해 예상 총 세액을 계산합니다.",
    ],
    cautionsTitle: "중요한 주의사항",
    cautions: [
      "이 계산기는 재산 종류, 1세대 1주택 특례, 세부담 상한, 공동명의 지분과 분납 조건을 자동 판정하지 않습니다.",
      "과세표준 비율과 세율은 재산 구분, 소재지, 과세연도와 정책에 따라 달라질 수 있습니다.",
      "납부 전 관할 지방자치단체 고지서나 위택스 공식 안내에서 적용 값을 확인하세요.",
    ],
    faq: [
      [
        "세율을 왜 직접 입력하나요?",
        "주택·건축물·토지 구분과 과세표준 구간에 따라 달라지므로 확인한 값을 적용합니다.",
      ],
      [
        "도시지역분은 항상 부과되나요?",
        "아닙니다. 적용 대상이 아니면 세율에 0을 입력하세요.",
      ],
      [
        "종합부동산세도 포함되나요?",
        "포함되지 않습니다. 재산세와 입력한 부가세만 계산합니다.",
      ],
      [
        "이 결과로 바로 납부할 수 있나요?",
        "아닙니다. 계획용 추정치이며 실제 납부액은 공식 고지서를 확인해야 합니다.",
      ],
    ] as const,
  },
  en: {
    title: "South Korea Property Tax Calculator",
    metaTitle: "South Korea Property Tax Calculator | KRW Estimate",
    category: "Tax calculator",
    description:
      "Estimate South Korean property tax and related local taxes in KRW using the assessed value and confirmed tax-base ratio, rate, and deduction.",
    intro:
      "This calculator applies to South Korea. Enter every monetary amount in KRW after confirming the applicable values for the property type, location, and tax year.",
    input: "South Korea property value (KRW) and rates",
    fields: {
      assessedValue: "Officially assessed value (KRW)",
      taxBaseRate: "Confirmed fair-market-value ratio",
      propertyTaxRate: "Confirmed property tax rate",
      progressiveDeduction: "Confirmed progressive deduction (KRW)",
      cityAreaTaxRate: "City-area tax rate",
    },
    calculate: "Calculate estimated property tax",
    reset: "Reset",
    error: "Check the highlighted values.",
    result: "Estimated property tax",
    totalTax: "Estimated total tax (KRW)",
    propertyTax: "Property tax (KRW)",
    taxBase: "Tax base (KRW)",
    details: "Calculation details",
    cityAreaTax: "City-area portion (KRW)",
    localEducationTax: "Local education tax (KRW)",
    effectiveRate: "Effective rate on assessed value",
    empty: "Calculate to see the tax base and estimated tax from your inputs.",
    note: "A South Korea planning estimate in KRW using one entered rate and deduction; local education tax is calculated as 20% of property tax.",
    explanationTitle: "How it is calculated",
    explanation: [
      "Tax base equals assessed value multiplied by the entered fair-market-value ratio.",
      "Property tax applies the entered rate and then subtracts the progressive deduction.",
      "The city-area portion and local education tax are added for the estimated total.",
    ],
    cautionsTitle: "Important cautions",
    cautions: [
      "This calculator does not determine property classification, single-home relief, tax caps, ownership shares, or installment eligibility.",
      "Ratios and rates can vary by property, location, tax year, and policy.",
      "Confirm applicable values with the local government notice or Korea's official local-tax service before payment.",
    ],
    faq: [
      [
        "Why do I enter the rate?",
        "It varies by property classification and tax-base bracket, so the calculator uses a value you have confirmed.",
      ],
      [
        "Does city-area tax always apply?",
        "No. Enter zero when the property is not subject to it.",
      ],
      [
        "Is comprehensive real estate holding tax included?",
        "No. This calculator covers property tax and the entered related local taxes only.",
      ],
      [
        "Can I pay using this result?",
        "No. It is a planning estimate; use the official notice for payment.",
      ],
    ] as const,
  },
} as const;
