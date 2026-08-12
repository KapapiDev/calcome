export type StressDsrLocale = "ko" | "en";

export const stressDsrContent = {
  ko: {
    title: "스트레스 DSR 계산기",
    metaTitle: "스트레스 DSR 계산기 | 가산금리 적용 DSR 비교",
    description:
      "연소득과 대출 조건, 스트레스 가산금리를 입력해 기본 DSR과 스트레스 DSR을 비교합니다.",
    category: "대출·신용 계산기",
    intro:
      "대한민국 스트레스 DSR 제도의 원리를 기준으로 한 계획용 계산기입니다. 실제 적용 가산금리는 시기와 대출 유형에 따라 달라질 수 있습니다.",
    annualIncome: "연소득",
    existingDebt: "기존 연간 원리금 상환액",
    newLoan: "신규 대출금",
    interestRate: "신규 대출 연이율",
    stressRate: "스트레스 가산금리",
    termYears: "상환 기간",
    calculate: "스트레스 DSR 계산하기",
    reset: "초기화",
    baseDsr: "기본 DSR",
    stressedDsr: "스트레스 DSR",
    increase: "DSR 증가폭",
    basePayment: "기본 월 상환액",
    stressedPayment: "스트레스 적용 월 상환액",
    note: "금액은 KRW 기준입니다. 스트레스 금리는 실제 대출금리에 더해 납부하는 금리가 아니라 한도 심사를 위한 가산금리입니다.",
    caution:
      "금융기관의 인정소득, 대출 종류, 상환방식, 예외 규정과 최신 정책에 따라 실제 심사 결과는 달라질 수 있습니다.",
  },
  en: {
    title: "South Korea Stress DSR Calculator",
    metaTitle: "South Korea Stress DSR Calculator",
    description:
      "Compare base and stressed debt service ratios using South Korea-style stress-rate assumptions. Monetary inputs and results are in KRW.",
    category: "Loan and credit calculator",
    intro:
      "This planning tool models the mechanics of South Korea's Stress DSR framework. The applicable stress add-on can vary by period and loan type.",
    annualIncome: "Annual income (KRW)",
    existingDebt: "Existing annual debt service (KRW)",
    newLoan: "New loan amount (KRW)",
    interestRate: "New loan annual interest rate",
    stressRate: "Stress-rate add-on",
    termYears: "Repayment term",
    calculate: "Calculate Stress DSR",
    reset: "Reset",
    baseDsr: "Base DSR",
    stressedDsr: "Stress DSR",
    increase: "DSR increase",
    basePayment: "Base monthly payment",
    stressedPayment: "Stressed monthly payment",
    note: "All monetary values are KRW. The stress add-on is used for borrowing-limit assessment and is not an extra interest rate charged on the actual loan.",
    caution:
      "Actual lender assessments can differ because recognized income, loan type, repayment method, exemptions, and current South Korean policy rules may vary.",
  },
} as const;
