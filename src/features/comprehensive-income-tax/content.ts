export type ComprehensiveIncomeTaxLocale = "ko" | "en";

export const comprehensiveIncomeTaxContent = {
  ko: {
    title: "종합소득세 계산기",
    metaTitle: "종합소득세 계산기 | 과세표준·예상 세액 계산",
    category: "세금 계산기",
    description:
      "총수입금액과 필요경비, 확인한 공제액·세율·세액공제로 예상 종합소득세와 지방소득세를 계산합니다.",
    intro:
      "소득 종류별 수입과 필요경비를 합산하고, 신고 연도와 본인 조건에 맞는 공제·세율을 확인해 입력하세요.",
    input: "소득과 적용 세율",
    fields: {
      grossIncome: "총수입금액",
      necessaryExpenses: "필요경비",
      incomeDeduction: "확인한 소득공제액",
      taxRate: "확인한 종합소득세율",
      progressiveDeduction: "확인한 누진공제액",
      taxCredit: "확인한 세액공제액",
      localIncomeTaxRate: "지방소득세율(소득세 대비)",
    },
    calculate: "예상 종합소득세 계산하기",
    reset: "초기화",
    error: "입력값을 확인해 주세요.",
    result: "예상 종합소득세 결과",
    totalTax: "예상 총 세액",
    incomeAfterTax: "세후 소득",
    taxableIncome: "과세표준",
    details: "계산 상세",
    adjustedIncome: "필요경비 차감 후 소득",
    nationalTaxBeforeCredit: "세액공제 전 소득세",
    nationalIncomeTax: "종합소득세",
    localIncomeTax: "지방소득세",
    effectiveRate: "필요경비 차감 후 실효세율",
    empty: "계산하면 입력값에 따른 과세표준과 예상 세액을 표시합니다.",
    note: "입력한 단일 세율, 누진공제액, 세액공제액을 적용한 계획용 추정치입니다.",
    explanationTitle: "계산 방법",
    explanation: [
      "총수입금액에서 입력한 필요경비를 빼 종합소득금액을 추정합니다.",
      "종합소득금액에서 확인한 소득공제를 빼고 0원 미만이면 0원으로 처리합니다.",
      "과세표준에 입력 세율과 누진공제액을 적용한 뒤 세액공제와 지방소득세를 순서대로 반영합니다.",
    ],
    cautionsTitle: "중요한 주의사항",
    cautions: [
      "이 계산기는 소득 종류별 필요경비 인정, 결손금, 공동사업, 중간예납, 원천징수세액을 자동 판정하지 않습니다.",
      "신고 연도, 소득 종류, 거주 상태와 개인별 공제 요건에 따라 과세표준과 세액이 달라질 수 있습니다.",
      "신고 전 국세청 자료나 세무 전문가를 통해 수입·경비·공제·세율·기납부세액을 확인하세요.",
    ],
    faq: [
      [
        "왜 세율과 누진공제액을 직접 입력하나요?",
        "과세표준 구간과 신고 연도에 따라 달라지므로 확인한 값을 적용하도록 설계했습니다.",
      ],
      [
        "원천징수한 세금도 반영되나요?",
        "자동 반영하지 않습니다. 이 결과는 산출세액 추정치이며 실제 납부·환급액은 기납부세액에 따라 달라집니다.",
      ],
      [
        "근로소득과 사업소득을 함께 넣을 수 있나요?",
        "합산 대상 소득의 총수입과 인정 필요경비를 확인해 입력할 수 있지만 소득별 계산 규칙은 자동 판정하지 않습니다.",
      ],
      [
        "이 결과로 바로 신고해도 되나요?",
        "아닙니다. 단순 계획용 추정치이며 공식 신고 계산을 대체하지 않습니다.",
      ],
    ] as const,
  },
  en: {
    title: "South Korea Comprehensive Income Tax Calculator",
    metaTitle: "South Korea Comprehensive Income Tax Calculator | KRW Estimate",
    category: "Tax calculator",
    description:
      "Estimate South Korean comprehensive income tax and local income tax in KRW using gross income, expenses, and confirmed deductions, rates, and credits.",
    intro:
      "This calculator applies to South Korea. Enter every monetary amount in KRW after confirming deductions and rates for the filing year.",
    input: "South Korea income amounts (KRW) and applicable rates",
    fields: {
      grossIncome: "Gross income (KRW)",
      necessaryExpenses: "Necessary expenses (KRW)",
      incomeDeduction: "Confirmed income deductions (KRW)",
      taxRate: "Confirmed income tax rate",
      progressiveDeduction: "Confirmed progressive deduction (KRW)",
      taxCredit: "Confirmed tax credits (KRW)",
      localIncomeTaxRate: "Local income tax rate (of national tax)",
    },
    calculate: "Calculate estimated income tax",
    reset: "Reset",
    error: "Check the highlighted values.",
    result: "Estimated comprehensive income tax",
    totalTax: "Estimated total tax",
    incomeAfterTax: "Income after tax",
    taxableIncome: "Taxable income",
    details: "Calculation details",
    adjustedIncome: "Income after necessary expenses",
    nationalTaxBeforeCredit: "National tax before credits",
    nationalIncomeTax: "Comprehensive income tax",
    localIncomeTax: "Local income tax",
    effectiveRate: "Effective rate on adjusted income",
    empty:
      "Calculate to see taxable income and estimated tax from your inputs.",
    note: "A planning estimate using the entered single rate, progressive deduction, and tax credits.",
    explanationTitle: "How it is calculated",
    explanation: [
      "Adjusted income equals gross income minus the entered necessary expenses.",
      "Taxable income subtracts confirmed income deductions and is floored at zero.",
      "The entered rate and progressive deduction are applied before tax credits and local income tax.",
    ],
    cautionsTitle: "Important cautions",
    cautions: [
      "This calculator does not determine expense eligibility, loss carryforwards, partnerships, interim payments, or withholding credits.",
      "Taxable income and tax vary by filing year, income type, residency, and individual deduction eligibility.",
      "Confirm income, expenses, deductions, rates, and prepaid tax with Korea's National Tax Service guidance or a tax professional before filing.",
    ],
    faq: [
      [
        "Why do I enter the rate and progressive deduction?",
        "They depend on the taxable bracket and filing year, so the calculator uses values you have verified.",
      ],
      [
        "Does this include withheld tax?",
        "No. This estimates assessed tax; actual payment or refund depends on prepaid tax.",
      ],
      [
        "Can I combine employment and business income?",
        "You can enter confirmed combined income and allowable expenses, but the calculator does not determine each income type's rules.",
      ],
      [
        "Can I file using this result?",
        "No. It is a simplified planning estimate and does not replace an official filing calculation.",
      ],
    ] as const,
  },
} as const;
