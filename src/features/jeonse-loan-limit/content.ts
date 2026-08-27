export type JeonseLoanLimitLocale = "ko" | "en";

export const JEONSE_LOAN_LIMIT_SOURCE =
  "https://hf.go.kr/ko/sub02/sub02_01_02.do";
export const JEONSE_LOAN_LIMIT_VERIFIED_DATE = "2026-08-27";

export const jeonseLoanLimitContent = {
  ko: {
    title: "전세대출 한도 계산기",
    metaTitle: "전세대출 한도 계산기 | HF 일반전세자금보증 기준",
    description:
      "한국주택금융공사 일반전세자금보증의 보증과목·소요자금·상환능력 한도를 비교해 예상 보증한도를 계산합니다.",
    category: "대출·신용 계산기",
    intro:
      "HF가 공개한 일반전세자금보증 한도식을 그대로 비교하는 계획용 계산기입니다. 실제 대출 가능 여부와 금액은 은행 및 HF 심사에 따라 달라질 수 있습니다.",
    deposit: "임차보증금",
    requestedAmount: "보증신청금액",
    existingBalance: "기 이용 전세자금보증잔액",
    recognizedIncome: "연간인정소득",
    annualDebtService: "연간부채상환 예상액",
    preferenceAmount: "상환방식별 우대금액",
    oneHome: "본인·배우자 합산 1주택",
    capitalOrRegulated: "보증목적물이 수도권·규제지역",
    calculate: "예상 한도 계산하기",
    reset: "초기화",
    finalLimit: "예상 보증한도",
    subjectLimit: "보증과목별 한도",
    fundingLimit: "소요자금별 한도",
    repaymentLimit: "상환능력별 한도",
    factor: "한도를 결정한 기준",
    note: "2026-08-27 한국주택금융공사 일반전세자금보증 안내를 확인했습니다. 수도권·규제지역은 ①~③의 최소 산출결과에 8/9를 적용합니다.",
    caution:
      "이 계산기는 보증한도 추정 도구이며 자격 판정이나 대출 승인을 보장하지 않습니다. 임차보증금 요건, 주택보유 요건, 목적물 요건과 은행 심사는 별도로 확인하세요.",
    source: "한국주택금융공사 일반전세자금보증 공식 안내",
  },
  en: {
    title: "South Korea Jeonse Loan Limit Calculator",
    metaTitle: "South Korea Jeonse Loan Limit Calculator | HF Guarantee",
    description:
      "Estimate the Korea Housing Finance Corporation general jeonse guarantee limit using its published subject, funding-needs, and repayment-capacity formulas. All amounts are KRW.",
    category: "Loan and credit calculator",
    intro:
      "This planning tool compares the published HF general jeonse guarantee limits. Actual loan approval and borrowing can differ after HF and lender underwriting.",
    deposit: "Jeonse deposit (KRW)",
    requestedAmount: "Guarantee amount requested (KRW)",
    existingBalance: "Existing jeonse guarantee balance (KRW)",
    recognizedIncome: "Annual recognized income (KRW)",
    annualDebtService: "Expected annual debt service (KRW)",
    preferenceAmount: "Repayment-method preference amount (KRW)",
    oneHome: "Household owns one home in total",
    capitalOrRegulated: "Property is in the capital or regulated area",
    calculate: "Calculate estimated limit",
    reset: "Reset",
    finalLimit: "Estimated guarantee limit",
    subjectLimit: "Subject-level limit",
    fundingLimit: "Funding-needs limit",
    repaymentLimit: "Repayment-capacity limit",
    factor: "Binding constraint",
    note: "Official HF general jeonse guarantee guidance was verified on 2026-08-27. For capital or regulated areas, HF recognizes 8/9 of the minimum result from the three published limits.",
    caution:
      "This is a guarantee-limit estimate, not an eligibility decision or loan approval. Deposit, homeownership, property, and lender requirements must be checked separately.",
    source: "Korea Housing Finance Corporation general jeonse guarantee guidance",
  },
} as const;
