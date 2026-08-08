export type CapitalGainsTaxLocale = "ko" | "en";

export const capitalGainsTaxContent = {
  ko: {
    title: "양도소득세 계산기",
    metaTitle: "양도소득세 계산기 | 양도차익·세금 추정",
    description:
      "양도가액과 취득가액, 필요경비, 공제액과 확인한 세율로 예상 양도소득세를 계산합니다.",
    category: "세금 계산기",
    intro:
      "자산 종류, 보유 기간과 거래 조건에 맞는 공제와 세율을 확인한 뒤 직접 입력하세요.",
    input: "거래 금액과 적용 세율",
    fields: {
      salePrice: "양도가액",
      acquisitionPrice: "취득가액",
      deductibleExpenses: "필요경비",
      basicDeduction: "적용 공제액",
      incomeTaxRate: "확인한 양도소득세율",
      localIncomeTaxRate: "지방소득세 비율 (양도소득세 대비)",
    },
    calculate: "예상 세금 계산하기",
    reset: "초기화",
    error: "입력값을 확인해 주세요.",
    result: "예상 양도 결과",
    totalTax: "예상 세금 합계",
    netProceeds: "세금·경비 차감 후 금액",
    afterTaxProfit: "세후 손익",
    details: "계산 상세",
    grossGain: "양도차익",
    taxableGain: "과세대상 양도차익",
    incomeTax: "예상 양도소득세",
    localIncomeTax: "예상 지방소득세",
    effectiveRate: "양도차익 대비 실효세율",
    empty: "계산하면 입력값에 따른 양도차익과 예상 세금이 표시됩니다.",
    note: "입력한 공제액과 단일 세율을 적용한 계획용 추정치입니다.",
    explanationTitle: "계산 방법",
    explanation: [
      "양도차익은 양도가액에서 취득가액과 필요경비를 뺀 금액입니다.",
      "과세대상 양도차익은 양도차익에서 입력한 공제액을 뺀 뒤 0원 미만이면 0원으로 처리합니다.",
      "지방소득세는 예상 양도소득세에 입력한 비율을 적용하고, 세후 손익은 순수령액에서 취득가액을 뺍니다.",
    ],
    cautionsTitle: "중요한 주의사항",
    cautions: [
      "이 계산기는 누진세율, 장기보유특별공제, 비과세, 중과 또는 감면을 자동 판정하지 않습니다.",
      "부동산·주식 등 자산 종류, 보유 기간, 거주 요건, 주택 수와 거래 시점에 따라 과세 규칙이 달라질 수 있습니다.",
      "신고 전에는 국세청 자료 또는 세무 전문가를 통해 과세표준, 공제와 적용 세율을 확인하세요.",
    ],
    faq: [
      [
        "세율을 왜 직접 입력하나요?",
        "거래별 과세표준과 누진세율, 중과·감면 조건이 달라 확인한 세율을 입력하도록 설계했습니다.",
      ],
      [
        "지방소득세 비율은 어디에 적용되나요?",
        "입력한 비율을 계산된 양도소득세에 곱합니다. 과세표준에 직접 곱하지 않습니다.",
      ],
      [
        "손실인 거래도 계산할 수 있나요?",
        "예. 양도차익이 0원 이하이면 이 단순 추정의 과세대상 차익과 세금은 0원입니다.",
      ],
      [
        "결과를 신고 세액으로 사용해도 되나요?",
        "아닙니다. 입력한 단일 세율 기반의 계획용 추정치이며 실제 신고 계산을 대체하지 않습니다.",
      ],
    ] as const,
  },
  en: {
    title: "South Korea Capital Gains Tax Calculator",
    metaTitle: "South Korea Capital Gains Tax Calculator | KRW Estimate",
    description:
      "Estimate South Korean capital gains tax in KRW from sale price, cost basis, expenses, deduction, and confirmed rates.",
    category: "Tax calculator",
    intro:
      "This calculator applies to South Korea. Enter every monetary amount in KRW after confirming the deduction and rates for the transaction.",
    input: "South Korea transaction amounts (KRW) and rates",
    fields: {
      salePrice: "Sale price (KRW)",
      acquisitionPrice: "Acquisition price / cost basis (KRW)",
      deductibleExpenses: "Deductible transaction expenses (KRW)",
      basicDeduction: "Applicable deduction (KRW)",
      incomeTaxRate: "Confirmed capital gains tax rate",
      localIncomeTaxRate: "Local income tax percentage of national tax",
    },
    calculate: "Calculate estimated tax",
    reset: "Reset",
    error: "Check the highlighted values.",
    result: "Estimated sale result",
    totalTax: "Estimated total tax",
    netProceeds: "Net proceeds after expenses and tax",
    afterTaxProfit: "After-tax profit or loss",
    details: "Calculation details",
    grossGain: "Capital gain",
    taxableGain: "Taxable capital gain",
    incomeTax: "Estimated capital gains tax",
    localIncomeTax: "Estimated local income tax",
    effectiveRate: "Effective tax rate on gain",
    empty: "Calculate to see the gain and estimated tax from your inputs.",
    note: "A planning estimate using the deduction and single tax rate entered.",
    explanationTitle: "How it is calculated",
    explanation: [
      "Capital gain equals sale price minus acquisition price and deductible expenses.",
      "Taxable gain subtracts the entered deduction from the gain and is floored at zero.",
      "Local income tax applies the entered percentage to national tax; after-tax profit subtracts cost basis from net proceeds.",
    ],
    cautionsTitle: "Important cautions",
    cautions: [
      "This calculator does not determine progressive brackets, long-term holding deductions, exemptions, surtaxes, or relief.",
      "Rules vary by asset type, holding period, residency conditions, property count, and transaction date.",
      "Confirm the tax base, deductions, and applicable rates with Korea's National Tax Service guidance or a tax professional before filing.",
    ],
    faq: [
      [
        "Why do I enter the tax rate?",
        "Tax bases, progressive brackets, surtaxes, and relief differ by transaction, so the calculator uses a rate you have confirmed.",
      ],
      [
        "How is the local tax percentage applied?",
        "It is multiplied by the calculated national capital gains tax, not directly by taxable gain.",
      ],
      [
        "Can I calculate a loss?",
        "Yes. When the gain is zero or negative, taxable gain and tax are zero in this simplified estimate.",
      ],
      [
        "Can I file using this result?",
        "No. It is a planning estimate based on one entered rate and does not replace an official filing calculation.",
      ],
    ] as const,
  },
} as const;
