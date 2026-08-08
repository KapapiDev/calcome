export type WithholdingTaxLocale = "ko" | "en";

export const withholdingTaxContent = {
  ko: {
    title: "원천징수세 계산기",
    metaTitle: "원천징수세 계산기 | 소득세·지방소득세 계산",
    category: "세금 계산기",
    description:
      "지급액과 확인한 비과세 금액·원천징수세율로 예상 소득세, 지방소득세와 실수령액을 계산합니다.",
    intro:
      "소득 종류, 지급 시기와 거주 상태에 맞는 원천징수세율을 확인한 뒤 입력하세요.",
    input: "지급액과 적용 세율",
    fields: {
      grossPayment: "총 지급액",
      nonTaxableAmount: "확인한 비과세 금액",
      nationalTaxRate: "확인한 소득세 원천징수세율",
      localIncomeTaxRate: "지방소득세율(소득세 대비)",
    },
    calculate: "예상 원천징수세 계산하기",
    reset: "초기화",
    error: "입력값을 확인해 주세요.",
    result: "예상 원천징수 결과",
    totalWithholding: "예상 총 원천징수세",
    netPayment: "예상 실수령액",
    taxablePayment: "과세 대상 지급액",
    details: "계산 상세",
    nationalIncomeTax: "소득세",
    localIncomeTax: "지방소득세",
    effectiveRate: "총 지급액 대비 실효세율",
    empty: "계산하면 과세 대상 지급액과 예상 원천징수세를 표시합니다.",
    note: "입력한 세율을 적용한 계획용 추정치이며 공식 원천징수 계산을 대체하지 않습니다.",
    explanationTitle: "계산 방법",
    explanation: [
      "총 지급액에서 확인한 비과세 금액을 빼 과세 대상 지급액을 계산합니다.",
      "과세 대상 지급액에 입력한 소득세 원천징수세율을 적용합니다.",
      "소득세에 입력한 지방소득세율을 적용하고 두 세금을 지급액에서 차감합니다.",
    ],
    cautionsTitle: "중요한 주의사항",
    cautions: [
      "이 계산기는 근로소득 간이세액표, 일용근로·사업·기타·이자·배당소득 구분이나 조세조약을 자동 판정하지 않습니다.",
      "원천징수세율과 비과세 범위는 소득 종류, 귀속 연도, 거주 상태와 지급 조건에 따라 달라질 수 있습니다.",
      "지급 또는 신고 전 국세청 자료나 세무 전문가를 통해 적용 세율과 신고 의무를 확인하세요.",
    ],
    faq: [
      [
        "왜 원천징수세율을 직접 입력하나요?",
        "소득 종류와 개인·계약 조건에 따라 세율과 계산 방식이 달라 확인한 값을 적용하도록 설계했습니다.",
      ],
      [
        "지방소득세 10%는 지급액의 10%인가요?",
        "아닙니다. 일반적으로 원천징수한 소득세를 기준으로 계산하므로 이 계산기도 소득세에 입력 비율을 적용합니다.",
      ],
      [
        "근로소득 월급에도 사용할 수 있나요?",
        "간이세액표에서 확인한 실제 소득세를 단일 세율로 정확히 환산하기 어려울 수 있어 급여 원천징수 확인용으로는 공식 간이세액표를 우선하세요.",
      ],
      [
        "원천징수세가 최종 세금인가요?",
        "아닐 수 있습니다. 연말정산이나 종합소득세 신고에서 최종 세액과 납부·환급액이 달라질 수 있습니다.",
      ],
    ] as const,
  },
  en: {
    title: "South Korea Withholding Tax Calculator",
    metaTitle: "South Korea Withholding Tax Calculator | KRW Estimate",
    category: "Tax calculator",
    description:
      "Estimate South Korean national and local withholding tax and net payment in KRW using a confirmed taxable amount and withholding rate.",
    intro:
      "This calculator applies to South Korea. Enter every monetary amount in KRW after confirming the rate for the income type, payment date, and residency status.",
    input: "South Korea payment (KRW) and applicable rates",
    fields: {
      grossPayment: "Gross payment (KRW)",
      nonTaxableAmount: "Confirmed non-taxable amount (KRW)",
      nationalTaxRate: "Confirmed national withholding rate",
      localIncomeTaxRate: "Local income tax rate (of national tax)",
    },
    calculate: "Calculate estimated withholding",
    reset: "Reset",
    error: "Check the highlighted values.",
    result: "Estimated withholding",
    totalWithholding: "Estimated total withholding (KRW)",
    netPayment: "Estimated net payment (KRW)",
    taxablePayment: "Taxable payment (KRW)",
    details: "Calculation details",
    nationalIncomeTax: "National income tax (KRW)",
    localIncomeTax: "Local income tax (KRW)",
    effectiveRate: "Effective rate on gross payment",
    empty: "Calculate to see taxable payment and estimated withholding.",
    note: "A South Korea planning estimate in KRW using the entered rates; it does not replace an official withholding calculation.",
    explanationTitle: "How it is calculated",
    explanation: [
      "Taxable payment equals gross payment minus the confirmed non-taxable amount.",
      "The entered national withholding rate is applied to the taxable payment.",
      "Local income tax is calculated from national tax, then both taxes are deducted from the gross payment.",
    ],
    cautionsTitle: "Important cautions",
    cautions: [
      "This calculator does not select payroll tables or classify daily work, business, other, interest, or dividend income, and it does not apply tax treaties.",
      "Rates and exemptions vary by income type, tax year, residency, and payment conditions.",
      "Confirm the applicable rate and filing duty with Korea's National Tax Service guidance or a tax professional before payment or filing.",
    ],
    faq: [
      [
        "Why do I enter the withholding rate?",
        "Rates and methods vary by income type and circumstances, so the calculator uses a rate you have verified.",
      ],
      [
        "Is a 10% local rate 10% of the payment?",
        "No. Local income tax is generally based on national income tax, so this calculator applies the entered percentage to national tax.",
      ],
      [
        "Can I use this for monthly payroll?",
        "A single rate may not reproduce the payroll withholding table; use the official simplified tax table for payroll confirmation.",
      ],
      [
        "Is withholding the final tax?",
        "Not necessarily. Year-end settlement or an income tax return may change the final payment or refund.",
      ],
    ] as const,
  },
} as const;
