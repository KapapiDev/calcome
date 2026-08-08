export type InheritanceTaxLocale = "ko" | "en";
export const inheritanceTaxContent = {
  ko: {
    title: "상속세 계산기",
    metaTitle: "상속세 계산기 | 과세표준·예상 세액 계산",
    category: "세금 계산기",
    description:
      "총상속재산과 채무·장례비용, 확인한 공제액·세율·누진공제액으로 예상 상속세를 계산합니다.",
    intro:
      "상속재산 평가, 상속인 구성, 사전증여와 신고 조건에 맞는 공제·세율을 확인해 직접 입력하세요.",
    input: "상속재산과 적용 세율",
    fields: {
      grossEstate: "총상속재산가액",
      debts: "피상속인 채무",
      funeralExpenses: "장례비용",
      deductibleAmount: "확인한 상속공제액",
      taxRate: "확인한 상속세율",
      progressiveDeduction: "확인한 누진공제액",
      filingCreditRate: "적용할 신고세액공제율",
    },
    calculate: "예상 상속세 계산하기",
    reset: "초기화",
    error: "입력값을 확인해 주세요.",
    result: "예상 상속 결과",
    estimatedTax: "예상 납부세액",
    estateAfterTax: "세금 차감 후 순상속재산",
    taxableEstate: "과세표준",
    details: "계산 상세",
    netEstate: "채무·장례비 차감 후 재산",
    taxBeforeCredit: "신고세액공제 전 세액",
    filingCredit: "신고세액공제액",
    effectiveRate: "순상속재산 대비 실효세율",
    empty: "계산하면 입력값에 따른 과세표준과 예상 세액을 표시합니다.",
    note: "입력한 공제액, 단일 세율, 누진공제액과 신고세액공제율을 적용한 계획용 추정치입니다.",
    explanationTitle: "계산 방법",
    explanation: [
      "순상속재산은 총상속재산가액에서 입력한 채무와 장례비용을 뺀 금액입니다.",
      "과세표준은 순상속재산에서 입력한 상속공제액을 빼고 0원 미만이면 0원으로 처리합니다.",
      "산출세액에서 입력한 누진공제액과 신고세액공제를 차례로 반영해 예상 납부세액을 계산합니다.",
    ],
    cautionsTitle: "중요한 주의사항",
    cautions: [
      "이 계산기는 상속인별 공제, 배우자공제, 일괄공제, 금융재산공제, 사전증여 합산과 세대생략 할증을 자동 판정하지 않습니다.",
      "재산 종류, 평가일, 상속인 구성, 거주 상태와 신고 시점에 따라 과세표준과 적용 세율이 달라질 수 있습니다.",
      "신고 전 국세청 자료나 세무 전문가를 통해 재산 평가액, 채무·비용, 공제액, 누진공제액과 세액공제율을 확인하세요.",
    ],
    faq: [
      [
        "세율과 누진공제액을 왜 직접 입력하나요?",
        "과세표준 구간과 할증 여부에 따라 달라지므로 사용자가 확인한 값을 적용하도록 설계했습니다.",
      ],
      [
        "사전증여재산도 포함되나요?",
        "자동으로 합산하지 않습니다. 합산 대상이면 확인한 재산가액과 세액공제 조건을 입력값에 반영해야 합니다.",
      ],
      [
        "배우자공제를 자동 계산하나요?",
        "아닙니다. 실제 상속분과 법정 요건에 따라 확인한 전체 공제액을 입력하세요.",
      ],
      [
        "이 결과로 바로 신고할 수 있나요?",
        "아닙니다. 계획용 단순 추정치이며 공식 신고 계산을 대신하지 않습니다.",
      ],
    ] as const,
  },
  en: {
    title: "South Korea Inheritance Tax Calculator",
    metaTitle: "South Korea Inheritance Tax Calculator | KRW Estimate",
    category: "Tax calculator",
    description:
      "Estimate South Korean inheritance tax in KRW using gross estate, debts, funeral expenses, and confirmed deductions, rates, and credits.",
    intro:
      "This calculator applies to South Korea. Enter every monetary amount in KRW after confirming the asset valuation, heirs, prior gifts, and filing conditions.",
    input: "South Korea estate amounts (KRW) and rates",
    fields: {
      grossEstate: "Gross estate value (KRW)",
      debts: "Decedent's debts (KRW)",
      funeralExpenses: "Funeral expenses (KRW)",
      deductibleAmount: "Confirmed inheritance deductions (KRW)",
      taxRate: "Confirmed inheritance tax rate",
      progressiveDeduction: "Confirmed progressive deduction (KRW)",
      filingCreditRate: "Applicable filing credit rate",
    },
    calculate: "Calculate estimated inheritance tax",
    reset: "Reset",
    error: "Check the highlighted values.",
    result: "Estimated inheritance result",
    estimatedTax: "Estimated tax due (KRW)",
    estateAfterTax: "Estate after tax (KRW)",
    taxableEstate: "Taxable estate (KRW)",
    details: "Calculation details",
    netEstate: "Estate after debts and funeral costs (KRW)",
    taxBeforeCredit: "Tax before filing credit (KRW)",
    filingCredit: "Filing credit (KRW)",
    effectiveRate: "Effective rate on net estate",
    empty:
      "Calculate to see the taxable estate and estimated tax from your inputs.",
    note: "A South Korea planning estimate in KRW using the entered deductions, single rate, progressive deduction, and filing credit rate.",
    explanationTitle: "How it is calculated",
    explanation: [
      "Net estate equals gross estate minus the entered debts and funeral expenses.",
      "Taxable estate subtracts the entered inheritance deductions from net estate and is floored at zero.",
      "The entered progressive deduction and filing credit are applied in sequence to estimate tax due.",
    ],
    cautionsTitle: "Important cautions",
    cautions: [
      "This calculator does not determine heir-specific, spouse, lump-sum, financial-asset, prior-gift, or generation-skipping treatment.",
      "The tax base and rate may vary by asset, valuation date, heirs, residency, and filing date.",
      "Confirm valuations, debts, expenses, deductions, progressive deduction, and credits with Korea's National Tax Service guidance or a tax professional before filing.",
    ],
    faq: [
      [
        "Why do I enter the rate and progressive deduction?",
        "They depend on the confirmed taxable bracket and any surtax, so the calculator uses values you have verified.",
      ],
      [
        "Are prior gifts included?",
        "No. If aggregation applies, reflect the confirmed estate value and credit treatment in the inputs.",
      ],
      [
        "Is the spouse deduction automatic?",
        "No. Enter the total confirmed deduction based on the actual inheritance and legal requirements.",
      ],
      [
        "Can I file using this result?",
        "No. It is a simplified planning estimate and does not replace an official filing calculation.",
      ],
    ] as const,
  },
} as const;
