export type MortgageLoanLimitLocale = "ko" | "en";

export const mortgageLoanLimitContent = {
  ko: {
    title: "주택담보대출 한도 계산기",
    metaTitle: "주택담보대출 한도 계산기 | LTV·DSR 비교",
    description:
      "주택가격, 연소득, 기존 원리금, 금리와 LTV·DSR 한도를 입력해 예상 주택담보대출 한도를 계산합니다.",
    category: "대출·신용 계산기",
    intro:
      "LTV 기준 한도와 DSR 상환여력 기준 한도 중 더 낮은 값을 예상 한도로 제시합니다. 실제 금융기관 심사와 정책 적용 결과는 달라질 수 있습니다.",
    homePrice: "주택가격",
    annualIncome: "연소득",
    existingDebt: "기존 연간 원리금 상환액",
    interestRate: "예상 대출 연이율",
    termYears: "상환 기간",
    ltvRate: "적용 LTV 한도",
    dsrRate: "적용 DSR 한도",
    calculate: "대출 한도 계산하기",
    reset: "초기화",
    loanLimit: "예상 대출 한도",
    ltvLimit: "LTV 기준 한도",
    dsrLimit: "DSR 기준 한도",
    monthlyPayment: "예상 월 상환액",
    limitingFactor: "한도를 결정한 기준",
    note: "금액은 KRW 기준이며 원리금균등상환을 가정합니다. LTV·DSR 비율은 최신 정책과 본인 조건에 맞는 값을 직접 입력하세요.",
    caution:
      "실제 한도는 지역, 주택 유형, 소득 인정 방식, 기존 부채, 스트레스 DSR, 금융기관 심사와 예외 규정에 따라 달라질 수 있습니다.",
  },
  en: {
    title: "South Korea Mortgage Loan Limit Calculator",
    metaTitle: "South Korea Mortgage Loan Limit Calculator",
    description:
      "Estimate a South Korea mortgage borrowing limit by comparing user-entered LTV and DSR constraints. Monetary inputs and results are in KRW.",
    category: "Loan and credit calculator",
    intro:
      "This planning tool compares the LTV-based cap with the borrowing amount supported by DSR repayment capacity and uses the lower amount as the estimate.",
    homePrice: "Home price (KRW)",
    annualIncome: "Annual income (KRW)",
    existingDebt: "Existing annual debt service (KRW)",
    interestRate: "Expected annual loan rate",
    termYears: "Repayment term",
    ltvRate: "LTV limit",
    dsrRate: "DSR limit",
    calculate: "Calculate loan limit",
    reset: "Reset",
    loanLimit: "Estimated loan limit",
    ltvLimit: "LTV-based limit",
    dsrLimit: "DSR-based limit",
    monthlyPayment: "Estimated monthly payment",
    limitingFactor: "Binding constraint",
    note: "All monetary values are KRW and the loan assumes level monthly principal-and-interest payments. Enter LTV and DSR limits that match the policy and borrower conditions you want to model.",
    caution:
      "Actual lender limits can differ because location, property type, recognized income, existing debt, Stress DSR, lender underwriting, exemptions, and current South Korean rules may vary.",
  },
} as const;
