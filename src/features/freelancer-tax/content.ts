export type FreelancerTaxLocale = "ko" | "en";

export const freelancerTaxContent = {
  ko: {
    title: "프리랜서 3.3% 세금 계산기",
    metaTitle: "프리랜서 3.3% 세금 계산기 | 원천징수·실수령액",
    category: "세금 계산기",
    description:
      "프리랜서 지급액에 소득세 3%와 지방소득세 0.3%를 적용해 예상 원천징수액과 실수령액을 계산합니다.",
    intro: "3.3% 원천징수 대상 사업소득인지 먼저 확인하세요.",
    input: "지급액 입력",
    grossPayment: "총 지급액",
    expenseAmount: "확인한 원천징수 제외 금액",
    calculate: "3.3% 세금 계산하기",
    reset: "초기화",
    error: "입력값을 확인해 주세요.",
    result: "예상 원천징수 결과",
    total: "예상 총 원천징수세",
    net: "예상 실수령액",
    taxable: "원천징수 적용 지급액",
    national: "소득세 3%",
    local: "지방소득세 0.3%",
    effective: "총 지급액 대비 실효세율",
    empty: "계산하면 예상 원천징수액과 실수령액을 표시합니다.",
    note: "사업소득 3.3% 원천징수의 단순 추정치이며 최종 세액을 의미하지 않습니다.",
    explanationTitle: "계산 방법",
    explanation: [
      "총 지급액에서 확인한 제외 금액을 뺍니다.",
      "적용 지급액에 소득세 3%와 지방소득세 0.3%를 각각 계산합니다.",
      "두 세금을 지급액에서 빼 예상 실수령액을 계산합니다.",
    ],
    cautionsTitle: "중요한 주의사항",
    cautions: [
      "모든 프리랜서 지급액에 3.3%가 적용되는 것은 아닙니다.",
      "제외 금액은 계약과 세무 자료로 확인한 경우에만 입력하세요.",
      "종합소득세 신고 시 비용·공제·기납부세액에 따라 환급 또는 추가 납부가 생길 수 있습니다.",
    ],
    faq: [
      [
        "3.3%는 어떻게 구성되나요?",
        "사업소득 원천징수 소득세 3%와 그 지급액 기준 지방소득세 0.3%를 합한 값입니다.",
      ],
      [
        "이 금액이 최종 세금인가요?",
        "아닙니다. 원천징수된 기납부세액이며 최종 세액은 신고 결과에 따라 달라질 수 있습니다.",
      ],
      [
        "제외 금액은 무엇인가요?",
        "지급액 중 원천징수 대상이 아니라고 계약·증빙으로 확인한 금액만 입력합니다.",
      ],
      [
        "부가가치세도 포함되나요?",
        "이 계산기는 부가가치세를 판정하거나 계산하지 않습니다.",
      ],
    ] as const,
  },
  en: {
    title: "South Korea Freelancer 3.3% Tax Calculator",
    metaTitle: "South Korea Freelancer 3.3% Tax Calculator | KRW Estimate",
    category: "Tax calculator",
    description:
      "Estimate South Korean freelancer withholding and net payment in KRW using 3% income tax plus 0.3% local income tax.",
    intro:
      "This calculator applies to South Korea. Enter every monetary amount in KRW after confirming that the payment is business income subject to 3.3% withholding.",
    input: "South Korea payment amounts (KRW)",
    grossPayment: "Gross payment (KRW)",
    expenseAmount: "Confirmed amount excluded from withholding (KRW)",
    calculate: "Calculate 3.3% withholding",
    reset: "Reset",
    error: "Check the highlighted values.",
    result: "Estimated withholding",
    total: "Estimated total withholding (KRW)",
    net: "Estimated net payment (KRW)",
    taxable: "Payment subject to withholding (KRW)",
    national: "Income tax (3%, KRW)",
    local: "Local income tax (0.3%, KRW)",
    effective: "Effective rate on gross payment",
    empty: "Calculate to see estimated withholding and net payment.",
    note: "A South Korea planning estimate in KRW for 3.3% business-income withholding, not a final tax assessment.",
    explanationTitle: "How it is calculated",
    explanation: [
      "Subtract the confirmed excluded amount from gross payment.",
      "Calculate 3% national income tax and 0.3% local income tax on that amount.",
      "Subtract both taxes from gross payment to estimate net payment.",
    ],
    cautionsTitle: "Important cautions",
    cautions: [
      "Not every freelancer payment is subject to 3.3% withholding.",
      "Enter an excluded amount only when supported by the contract and tax records.",
      "A comprehensive income tax return may produce a refund or additional payment after expenses, deductions, and prepaid tax.",
    ],
    faq: [
      [
        "What makes up 3.3%?",
        "It combines 3% business-income withholding and 0.3% local income tax on the payment.",
      ],
      [
        "Is this the final tax?",
        "No. It is prepaid withholding; the final amount can change on the income tax return.",
      ],
      [
        "What is the excluded amount?",
        "Enter only an amount confirmed by contract or evidence as outside the withholding base.",
      ],
      [
        "Does this include VAT?",
        "No. This calculator does not determine or calculate VAT.",
      ],
    ] as const,
  },
} as const;
