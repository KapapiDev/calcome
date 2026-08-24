export type InvestmentFeeImpactLocale = "ko" | "en";

export const investmentFeeImpactContent = {
  ko: {
    title: "투자 수수료 영향 계산기",
    description:
      "장기 투자에서 연간 운용 수수료가 최종 자산에 미치는 영향을 수수료가 없는 경우와 비교합니다.",
    category: "투자 계산기",
    input: "투자 조건",
    initialInvestment: "초기 투자금",
    monthlyContribution: "월 투자금",
    annualReturnPercent: "예상 연 수익률",
    annualFeePercent: "연간 운용 수수료",
    years: "투자 기간",
    calculate: "수수료 영향 계산하기",
    reset: "초기화",
    result: "예상 결과",
    afterFees: "수수료 반영 최종 자산",
    withoutFees: "수수료 미반영 최종 자산",
    feeImpact: "수수료로 인한 자산 차이",
    feeImpactPercent: "최종 자산 감소율",
    totalInvested: "총 투자원금",
    error: "입력값을 확인해 주세요.",
    note: "연 수익률에서 연간 자산 운용 수수료를 차감한 순수익률을 월 단위로 복리 적용하고, 매월 말 동일 금액을 투자한다고 가정합니다.",
    method:
      "같은 투자금과 기간에 대해 수수료가 없는 기준 자산과 수수료 차감 후 자산을 각각 계산한 뒤 두 값의 차이를 장기 수수료 영향으로 표시합니다.",
    cautions:
      "세금, 거래 수수료, 실제 시장 변동, 상품별 수수료 부과 방식은 반영하지 않습니다. 실제 상품의 비용 구조를 반드시 확인하세요.",
    related: "함께 보기",
    metaTitle: "투자 수수료 영향 계산기 | 장기 수수료 비용 계산",
  },
  en: {
    title: "Investment Fee Impact Calculator",
    description:
      "Compare how an annual investment management fee can reduce a portfolio's long-term ending value versus a no-fee scenario.",
    category: "Investment calculator",
    input: "Investment assumptions",
    initialInvestment: "Initial investment",
    monthlyContribution: "Monthly contribution",
    annualReturnPercent: "Expected annual return",
    annualFeePercent: "Annual management fee",
    years: "Investment period",
    calculate: "Calculate fee impact",
    reset: "Reset",
    result: "Estimated results",
    afterFees: "Ending value after fees",
    withoutFees: "Ending value without fees",
    feeImpact: "Value lost to fee drag",
    feeImpactPercent: "Ending-value reduction",
    totalInvested: "Total contributions",
    error: "Check the highlighted inputs.",
    note: "Assumes the annual asset-based fee reduces the stated annual return, compounds monthly, and equal contributions are made at each month end.",
    method:
      "The calculator projects the same cash flows twice: once at the gross expected return and once after subtracting the annual management fee. The difference is shown as estimated fee drag.",
    cautions:
      "Taxes, trading costs, market volatility, and product-specific fee mechanics are excluded. Check the actual fee schedule before making an investment decision.",
    related: "Related calculators",
    metaTitle: "Investment Fee Impact Calculator | Long-Term Fee Drag",
  },
} satisfies Record<InvestmentFeeImpactLocale, Record<string, string>>;
