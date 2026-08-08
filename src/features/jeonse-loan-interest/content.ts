export type JeonseLoanInterestLocale = "ko" | "en";

export const jeonseLoanInterestContent = {
  ko: {
    title: "전세대출 이자 계산기",
    metaTitle: "전세대출 이자 계산기",
    description:
      "전세보증금, 자기자금, 금리와 기간으로 전세대출의 월 이자와 총이자를 계산합니다.",
    category: "대출 계산기",
    intro:
      "만기일시상환형 전세대출을 기준으로 매월 부담할 이자와 부대비용을 함께 확인하세요.",
    input: "전세대출 조건",
    deposit: "전세보증금",
    ownFunds: "자기자금",
    annualRate: "연이율",
    termYears: "대출 기간",
    monthlyFees: "월 보증료·부대비용",
    years: "년",
    calculate: "전세대출 이자 계산하기",
    reset: "초기화",
    error: "입력값을 확인해 주세요.",
    result: "이자 예상",
    monthlyInterest: "월 이자",
    monthlyCost: "월 예상 부담액",
    totalInterest: "기간 총이자",
    loanAmount: "필요 대출금",
    annualInterest: "연 이자",
    loanRatio: "보증금 대비 대출 비율",
    empty: "조건을 입력하면 월 이자와 기간 전체 이자를 표시합니다.",
    note: "원금은 만기에 상환하고 매월 이자만 납부한다고 가정한 단순 추정치입니다. 실제 보증료와 상환 방식은 금융기관별로 다릅니다.",
    explanationTitle: "계산 방법",
    explanation: [
      "필요 대출금은 전세보증금에서 자기자금을 뺀 금액입니다.",
      "월 이자는 대출금에 연이율을 적용한 뒤 12개월로 나눕니다.",
      "월 예상 부담액은 월 이자에 입력한 보증료와 부대비용을 더합니다.",
    ],
    cautionsTitle: "중요한 주의사항",
    cautions: [
      "계산 결과는 대출 승인이나 실제 금융기관 견적을 보장하지 않습니다.",
      "보증기관의 한도와 보증료, 임대차계약 요건을 별도로 확인하세요.",
      "원금 분할상환이나 변동금리 상품은 실제 납부액이 달라질 수 있습니다.",
    ],
    faq: [
      [
        "원금 상환액도 포함되나요?",
        "아니요. 만기일시상환형을 가정해 월 이자만 계산하며 원금은 만기에 별도로 상환합니다.",
      ],
      [
        "보증료는 어떻게 반영하나요?",
        "월 단위로 환산한 보증료와 기타 비용을 월 부대비용에 입력하세요.",
      ],
      [
        "자기자금은 무엇인가요?",
        "전세보증금 중 대출 없이 직접 마련하는 금액입니다.",
      ],
      [
        "0% 금리도 계산할 수 있나요?",
        "네. 이자는 0원이며 입력한 월 부대비용만 예상 부담액에 반영됩니다.",
      ],
    ],
  },
  en: {
    title: "South Korea Jeonse Loan Interest Calculator",
    metaTitle: "South Korea Jeonse Loan Interest Calculator | KRW Estimate",
    description:
      "Estimate monthly and total interest in KRW for a South Korean jeonse loan from the deposit, own funds, rate, and term.",
    category: "Loan calculator",
    intro:
      "This calculator applies to South Korea. Enter every monetary amount in KRW to review the monthly interest and fees for an interest-only jeonse loan.",
    input: "South Korea jeonse loan inputs (KRW)",
    deposit: "Jeonse deposit (KRW)",
    ownFunds: "Own funds (KRW)",
    annualRate: "Annual interest rate",
    termYears: "Loan term",
    monthlyFees: "Monthly guarantee and other fees (KRW)",
    years: "years",
    calculate: "Calculate interest",
    reset: "Reset",
    error: "Check the highlighted values.",
    result: "Interest estimate",
    monthlyInterest: "Monthly interest (KRW)",
    monthlyCost: "Estimated monthly cost (KRW)",
    totalInterest: "Total interest over term (KRW)",
    loanAmount: "Required loan (KRW)",
    annualInterest: "Annual interest (KRW)",
    loanRatio: "Loan share of deposit",
    empty: "Enter the loan terms to see monthly and total interest.",
    note: "A South Korea planning estimate in KRW assuming interest-only monthly payments and principal repayment at maturity. Actual guarantee fees and repayment terms vary by lender.",
    explanationTitle: "How it is calculated",
    explanation: [
      "Required loan is the jeonse deposit minus your own funds.",
      "Monthly interest applies the annual rate to the loan and divides it by 12.",
      "Estimated monthly cost adds the entered guarantee and other fees.",
    ],
    cautionsTitle: "Important cautions",
    cautions: [
      "The estimate does not guarantee approval or an actual lender quote.",
      "Check guarantee limits, fees, and lease-contract requirements separately.",
      "Amortizing principal or adjustable rates can change actual payments.",
    ],
    faq: [
      [
        "Does this include principal repayment?",
        "No. It assumes interest-only payments and separate principal repayment at maturity.",
      ],
      [
        "How do I include a guarantee fee?",
        "Convert the guarantee fee and other costs to a monthly amount and enter them as monthly fees.",
      ],
      [
        "What are own funds?",
        "The portion of the jeonse deposit you provide without borrowing.",
      ],
      [
        "Can I calculate a zero-percent loan?",
        "Yes. Interest is zero and only entered monthly fees remain in the monthly cost.",
      ],
    ],
  },
} as const;
