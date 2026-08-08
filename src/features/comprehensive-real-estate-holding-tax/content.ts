export type ComprehensiveRealEstateHoldingTaxLocale = "ko" | "en";

export const comprehensiveRealEstateHoldingTaxContent = {
  ko: {
    title: "종합부동산세 계산기",
    metaTitle: "종합부동산세 계산기 | 과세표준·예상 세액 계산",
    category: "세금 계산기",
    description:
      "전국 합산 공시가격과 확인한 공제액·공정시장가액비율·세율로 예상 종합부동산세를 계산합니다.",
    intro:
      "주택·종합합산토지·별도합산토지 구분과 과세연도에 맞는 공제액, 비율, 세율, 누진공제액과 공제할 재산세액을 공식 안내에서 확인해 입력하세요.",
    input: "합산 공시가격과 적용 값",
    fields: {
      aggregateAssessedValue: "전국 합산 공시가격",
      basicDeduction: "확인한 기본공제액",
      fairMarketValueRate: "확인한 공정시장가액비율",
      taxRate: "확인한 종합부동산세율",
      progressiveDeduction: "확인한 누진공제액",
      deductiblePropertyTax: "공제할 재산세액",
    },
    calculate: "예상 종합부동산세 계산하기",
    reset: "초기화",
    error: "입력값을 확인해 주세요.",
    result: "예상 종합부동산세 결과",
    totalTax: "예상 총 세액",
    comprehensiveTax: "종합부동산세 본세",
    taxBase: "과세표준",
    details: "계산 상세",
    amountAfterDeduction: "기본공제 후 금액",
    taxBeforePropertyTaxCredit: "재산세액 공제 전 세액",
    specialRuralTax: "농어촌특별세",
    effectiveRate: "합산 공시가격 대비 실효세율",
    empty: "계산하면 입력값에 따른 과세표준과 예상 세액을 표시합니다.",
    note: "입력한 단일 세율과 누진공제액을 적용하고 공제할 재산세액을 뺀 뒤, 농어촌특별세를 본세의 20%로 계산한 계획용 추정치입니다.",
    explanationTitle: "계산 방법",
    explanation: [
      "전국 합산 공시가격에서 입력한 기본공제액을 뺀 금액에 공정시장가액비율을 곱해 과세표준을 계산합니다.",
      "과세표준에 입력한 세율을 적용하고 누진공제액과 공제할 재산세액을 차례로 뺍니다.",
      "종합부동산세 본세의 20%인 농어촌특별세를 더해 예상 총 세액을 계산합니다.",
    ],
    cautionsTitle: "중요한 주의사항",
    cautions: [
      "이 계산기는 납세자 유형, 세대·법인 구분, 합산배제, 공동명의 특례, 고령·장기보유 세액공제와 세부담 상한을 자동 판정하지 않습니다.",
      "공제액, 공정시장가액비율, 세율과 재산세액 공제는 부동산 구분, 보유 현황과 과세연도에 따라 달라질 수 있습니다.",
      "신고·납부 전 국세청 안내, 홈택스 모의계산 또는 세무 전문가를 통해 적용 값을 확인하세요.",
    ],
    faq: [
      [
        "공시가격은 어떻게 입력하나요?",
        "같은 과세 구분에 속하는 전국 보유분의 과세연도 공시가격을 합산해 입력합니다.",
      ],
      [
        "세율과 공제액을 왜 직접 입력하나요?",
        "납세자·부동산 구분과 과세연도별 규정이 달라 공식 자료에서 확인한 값을 적용하기 위해서입니다.",
      ],
      [
        "재산세도 함께 계산되나요?",
        "아닙니다. 종합부동산세에서 공제할 것으로 확인한 재산세액만 입력받습니다.",
      ],
      [
        "이 결과로 신고할 수 있나요?",
        "아닙니다. 계획용 추정치이며 실제 신고·납부액은 홈택스와 공식 고지 내용을 확인해야 합니다.",
      ],
    ] as const,
  },
  en: {
    title: "South Korea Comprehensive Real Estate Holding Tax Calculator",
    metaTitle:
      "South Korea Comprehensive Real Estate Holding Tax Calculator | KRW Estimate",
    category: "Tax calculator",
    description:
      "Estimate South Korea's comprehensive real estate holding tax in KRW using aggregate official values and confirmed deductions, ratio, and rate.",
    intro:
      "This calculator applies to South Korea. Enter every monetary amount in KRW after confirming the values for the property class, taxpayer, holdings, and tax year.",
    input: "South Korea aggregate value (KRW) and confirmed inputs",
    fields: {
      aggregateAssessedValue: "Aggregate officially assessed value (KRW)",
      basicDeduction: "Confirmed basic deduction (KRW)",
      fairMarketValueRate: "Confirmed fair-market-value ratio",
      taxRate: "Confirmed holding tax rate",
      progressiveDeduction: "Confirmed progressive deduction (KRW)",
      deductiblePropertyTax: "Deductible property tax (KRW)",
    },
    calculate: "Calculate estimated holding tax",
    reset: "Reset",
    error: "Check the highlighted values.",
    result: "Estimated holding tax",
    totalTax: "Estimated total tax",
    comprehensiveTax: "Comprehensive holding tax",
    taxBase: "Tax base",
    details: "Calculation details",
    amountAfterDeduction: "Amount after basic deduction",
    taxBeforePropertyTaxCredit: "Tax before property-tax credit",
    specialRuralTax: "Special rural tax",
    effectiveRate: "Effective rate on aggregate value",
    empty: "Calculate to see the tax base and estimated tax from your inputs.",
    note: "A planning estimate using one entered rate and progressive deduction, less deductible property tax; special rural tax is 20% of the resulting holding tax.",
    explanationTitle: "How it is calculated",
    explanation: [
      "The basic deduction is subtracted from the aggregate official value, then the entered fair-market-value ratio produces the tax base.",
      "The entered rate and progressive deduction produce tax before the confirmed deductible property tax is subtracted.",
      "Special rural tax equal to 20% of comprehensive holding tax is added for the estimated total.",
    ],
    cautionsTitle: "Important cautions",
    cautions: [
      "This calculator does not determine taxpayer classification, household or corporate rules, aggregation exclusions, joint-owner relief, age or holding-period credits, or tax caps.",
      "Deductions, ratios, rates, and property-tax credits can vary by property class, holdings, taxpayer, and tax year.",
      "Confirm applicable values with Korea's National Tax Service, Hometax simulation, or a tax professional before filing or payment.",
    ],
    faq: [
      [
        "What official value should I enter?",
        "Enter the tax-year official values aggregated nationwide for properties in the same tax classification.",
      ],
      [
        "Why do I enter the rate and deductions?",
        "Rules vary by taxpayer, property class, and tax year, so the calculator uses values you have confirmed.",
      ],
      [
        "Does this calculate property tax too?",
        "No. It only accepts the property-tax amount confirmed as deductible from this tax.",
      ],
      [
        "Can I file using this result?",
        "No. It is a planning estimate; verify the official notice or Hometax calculation before filing.",
      ],
    ] as const,
  },
} as const;
