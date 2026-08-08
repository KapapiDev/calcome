export type GiftTaxLocale = "ko" | "en";

export const giftTaxContent = {
  ko: {
    title: "증여세 계산기",
    metaTitle: "증여세 계산기 | 과세표준·예상 세액 계산",
    description:
      "증여 재산가액과 인수 채무, 확인한 공제액·세율·누진공제액으로 예상 증여세를 계산합니다.",
    category: "세금 계산기",
    intro:
      "증여자와 수증자의 관계, 최근 증여 이력, 재산 평가와 신고 조건에 맞는 값을 확인해 직접 입력하세요.",
    input: "증여 금액과 적용 세율",
    fields: {
      giftValue: "증여 재산가액",
      assumedDebt: "수증자가 인수하는 채무",
      deductibleAmount: "확인한 증여재산 공제액",
      taxRate: "확인한 증여세율",
      progressiveDeduction: "확인한 누진공제액",
      filingCreditRate: "적용할 신고세액공제율",
    },
    calculate: "예상 증여세 계산하기",
    reset: "초기화",
    error: "입력값을 확인해 주세요.",
    result: "예상 증여 결과",
    estimatedTax: "예상 납부세액",
    netReceived: "세금 차감 후 순수증액",
    taxableGift: "과세표준",
    details: "계산 상세",
    netGift: "채무 차감 후 증여가액",
    taxBeforeCredit: "신고세액공제 전 세액",
    filingCredit: "신고세액공제액",
    effectiveRate: "순증여가액 대비 실효세율",
    empty: "계산하면 입력값에 따른 과세표준과 예상 세액을 표시합니다.",
    note: "입력한 공제액, 단일 세율, 누진공제액과 신고세액공제율을 적용한 계획용 추정치입니다.",
    explanationTitle: "계산 방법",
    explanation: [
      "채무 차감 후 증여가액은 증여 재산가액에서 수증자가 실제 인수하는 채무를 뺀 금액입니다.",
      "과세표준은 채무 차감 후 증여가액에서 입력한 증여재산 공제액을 빼고 0원 미만이면 0원으로 처리합니다.",
      "산출세액에서 입력한 누진공제액과 신고세액공제를 차례로 반영해 예상 납부세액을 계산합니다.",
    ],
    cautionsTitle: "중요한 주의사항",
    cautions: [
      "이 계산기는 관계별 공제 한도, 10년 합산, 세대생략 할증, 감정평가와 부담부증여의 양도소득세를 자동 판정하지 않습니다.",
      "재산 종류, 평가일, 증여 이력, 거주 상태와 신고 시점에 따라 과세표준과 적용 세율이 달라질 수 있습니다.",
      "신고 전 국세청 자료나 세무 전문가를 통해 재산 평가액, 공제액, 누진공제액과 세액공제율을 확인하세요.",
    ],
    faq: [
      [
        "세율과 누진공제액을 왜 직접 입력하나요?",
        "과세표준 구간과 할증 여부에 따라 달라지므로 사용자가 확인한 값을 적용하도록 설계했습니다.",
      ],
      [
        "이전에 받은 증여도 포함되나요?",
        "자동으로 합산하지 않습니다. 합산 대상이면 확인한 과세표준과 공제 조건을 입력값에 반영해야 합니다.",
      ],
      [
        "부담부증여의 채무를 입력할 수 있나요?",
        "수증자가 실제 인수하는 채무를 입력할 수 있지만 증여자에게 발생할 수 있는 별도 양도소득세는 계산하지 않습니다.",
      ],
      [
        "이 결과로 바로 신고할 수 있나요?",
        "아닙니다. 계획용 단순 추정치이며 공식 신고 계산을 대신하지 않습니다.",
      ],
    ] as const,
  },
  en: {
    title: "South Korea Gift Tax Calculator",
    metaTitle: "South Korea Gift Tax Calculator | KRW Estimate",
    description:
      "Estimate South Korean gift tax in KRW using gift value, assumed debt, and confirmed deduction, rate, progressive deduction, and filing credit.",
    category: "Tax calculator",
    intro:
      "This calculator applies to South Korea. Enter every monetary amount in KRW after confirming the donor relationship, prior gifts, asset valuation, and filing conditions.",
    input: "South Korea gift amounts (KRW) and rates",
    fields: {
      giftValue: "Gifted asset value (KRW)",
      assumedDebt: "Debt assumed by recipient (KRW)",
      deductibleAmount: "Confirmed gift deduction (KRW)",
      taxRate: "Confirmed gift tax rate",
      progressiveDeduction: "Confirmed progressive deduction (KRW)",
      filingCreditRate: "Applicable filing credit rate",
    },
    calculate: "Calculate estimated gift tax",
    reset: "Reset",
    error: "Check the highlighted values.",
    result: "Estimated gift result",
    estimatedTax: "Estimated tax due (KRW)",
    netReceived: "Net gift after tax (KRW)",
    taxableGift: "Taxable gift (KRW)",
    details: "Calculation details",
    netGift: "Gift after assumed debt (KRW)",
    taxBeforeCredit: "Tax before filing credit (KRW)",
    filingCredit: "Filing credit (KRW)",
    effectiveRate: "Effective rate on net gift",
    empty:
      "Calculate to see the taxable gift and estimated tax from your inputs.",
    note: "A South Korea planning estimate in KRW using the entered deduction, single rate, progressive deduction, and filing credit rate.",
    explanationTitle: "How it is calculated",
    explanation: [
      "Net gift equals the gifted asset value minus debt actually assumed by the recipient.",
      "Taxable gift subtracts the entered gift deduction from the net gift and is floored at zero.",
      "The entered progressive deduction and filing credit are applied in sequence to estimate tax due.",
    ],
    cautionsTitle: "Important cautions",
    cautions: [
      "This calculator does not determine relationship-based limits, ten-year aggregation, generation-skipping surtax, valuations, or separate capital gains tax on a debt-assumed gift.",
      "The tax base and rate may vary by asset, valuation date, prior gifts, residency, and filing date.",
      "Confirm valuation, deductions, progressive deduction, and credits with Korea's National Tax Service guidance or a tax professional before filing.",
    ],
    faq: [
      [
        "Why do I enter the rate and progressive deduction?",
        "They depend on the confirmed taxable bracket and any surtax, so the calculator uses values you have verified.",
      ],
      [
        "Are earlier gifts included?",
        "No. If aggregation applies, reflect the confirmed tax base and deduction treatment in the inputs.",
      ],
      [
        "Can I enter debt for a gift with assumed liabilities?",
        "Yes, but this calculator does not estimate separate capital gains tax that may apply to the donor.",
      ],
      [
        "Can I file using this result?",
        "No. It is a simplified planning estimate and does not replace an official filing calculation.",
      ],
    ] as const,
  },
} as const;
