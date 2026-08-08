export type AcquisitionTaxLocale = "ko" | "en";

export const acquisitionTaxContent = {
  ko: {
    title: "부동산 취득세 계산기",
    metaTitle: "부동산 취득세 계산기 | 취득 비용 추정",
    description:
      "부동산 취득가액과 적용 세율을 입력해 취득세와 총 취득 비용을 추정합니다.",
    category: "부동산 계산기",
    intro:
      "주택 수, 가격, 면적과 지역에 따라 달라지는 적용 세율을 확인한 뒤 각 세율을 직접 입력하세요.",
    input: "취득가액과 적용 세율",
    acquisitionPrice: "부동산 취득가액",
    acquisitionTaxRate: "취득세율",
    localEducationTaxRate: "지방교육세율",
    ruralSpecialTaxRate: "농어촌특별세율",
    otherCosts: "기타 취득 부대비용",
    calculate: "취득 비용 계산하기",
    reset: "초기화",
    error: "입력값을 확인해 주세요.",
    result: "예상 취득 비용",
    totalTax: "예상 세금 합계",
    totalCost: "세금·비용 포함 총액",
    effectiveRate: "입력 세금의 실효세율",
    details: "세금과 비용 상세",
    acquisitionTax: "취득세",
    localEducationTax: "지방교육세",
    ruralSpecialTax: "농어촌특별세",
    enteredOtherCosts: "기타 부대비용",
    empty: "계산하면 입력한 세율에 따른 세금과 총 취득 비용이 표시됩니다.",
    note: "입력한 각 세율을 취득가액에 직접 적용한 계획용 추정치입니다.",
    explanationTitle: "계산 방법",
    explanation: [
      "각 세금은 취득가액에 사용자가 입력한 해당 세율을 곱해 계산합니다.",
      "예상 세금 합계는 취득세, 지방교육세와 농어촌특별세를 더한 금액입니다.",
      "총 취득 비용은 취득가액, 세금 합계와 입력한 기타 부대비용의 합계입니다.",
    ],
    cautionsTitle: "중요한 주의사항",
    cautions: [
      "이 계산기는 세율을 자동 판정하지 않습니다. 계약일과 신고일에 적용되는 세율을 확인해 입력하세요.",
      "주택 수, 조정대상지역, 법인 여부, 취득 원인, 전용면적과 감면 요건에 따라 세율과 과세표준이 달라질 수 있습니다.",
      "신고·납부 전에는 관할 지방자치단체, 위택스 또는 세무 전문가에게 실제 세액을 확인하세요.",
    ],
    faq: [
      [
        "세율을 왜 직접 입력하나요?",
        "부동산 유형과 보유 주택 수, 지역, 면적, 취득 원인 등에 따라 적용 규칙이 달라지므로 확인한 세율을 입력하도록 설계했습니다.",
      ],
      [
        "기타 부대비용에는 무엇을 넣나요?",
        "중개보수, 법무 비용과 등기 관련 비용 등 별도로 예상한 금액을 입력할 수 있습니다.",
      ],
      [
        "0% 세율도 입력할 수 있나요?",
        "예. 해당 세목이 적용되지 않거나 감면 여부를 별도로 확인한 경우 0을 입력할 수 있습니다.",
      ],
      [
        "결과를 신고 세액으로 사용해도 되나요?",
        "아닙니다. 입력값 기반 추정치이며 실제 과세표준, 감면, 가산세 등은 반영하지 않습니다.",
      ],
    ] as const,
  },
  en: {
    title: "South Korea Real Estate Acquisition Tax Calculator",
    metaTitle:
      "South Korea Real Estate Acquisition Tax Calculator | KRW Estimate",
    description:
      "Estimate South Korean real estate acquisition taxes and total acquisition cost in KRW from the price and rates you enter.",
    category: "Real estate calculator",
    intro:
      "This calculator applies to South Korea. Enter every monetary amount in KRW after confirming the rates that apply to the property and transaction.",
    input: "South Korea acquisition price (KRW) and rates",
    acquisitionPrice: "Real estate acquisition price (KRW)",
    acquisitionTaxRate: "Acquisition tax rate",
    localEducationTaxRate: "Local education tax rate",
    ruralSpecialTaxRate: "Special rural tax rate",
    otherCosts: "Other acquisition costs (KRW)",
    calculate: "Calculate acquisition cost",
    reset: "Reset",
    error: "Check the highlighted values.",
    result: "Estimated acquisition cost",
    totalTax: "Estimated total tax (KRW)",
    totalCost: "Total including price, tax, and costs (KRW)",
    effectiveRate: "Effective rate of entered taxes",
    details: "Tax and cost details",
    acquisitionTax: "Acquisition tax (KRW)",
    localEducationTax: "Local education tax (KRW)",
    ruralSpecialTax: "Special rural tax (KRW)",
    enteredOtherCosts: "Other acquisition costs (KRW)",
    empty:
      "Calculate to see taxes based on the entered rates and the total acquisition cost.",
    note: "A South Korea planning estimate in KRW that applies each rate entered directly to the acquisition price.",
    explanationTitle: "How it is calculated",
    explanation: [
      "Each tax component equals the acquisition price multiplied by the corresponding rate entered.",
      "Estimated total tax adds acquisition, local education, and special rural taxes.",
      "Total acquisition cost adds the price, estimated taxes, and other costs entered.",
    ],
    cautionsTitle: "Important cautions",
    cautions: [
      "This calculator does not determine the applicable rates. Confirm the rates effective for the contract and filing dates.",
      "Rates and tax bases can vary by property count, regulated area, entity type, acquisition method, floor area, and relief eligibility.",
      "Confirm the filing amount with the relevant local authority, Wetax, or a Korean tax professional.",
    ],
    faq: [
      [
        "Why do I enter the rates?",
        "Applicable rules vary by property type, property count, area, size, and acquisition method, so the calculator uses rates you have confirmed.",
      ],
      [
        "What belongs in other costs?",
        "You can include separately estimated brokerage, legal, and registration costs.",
      ],
      [
        "Can a rate be 0%?",
        "Yes. Enter zero when you have confirmed that a tax component does not apply or is relieved.",
      ],
      [
        "Can I use this result as the filing amount?",
        "No. It is an input-based estimate and does not model the official tax base, relief, or penalties.",
      ],
    ] as const,
  },
} as const;
