export type ApartmentManagementFeeBudgetLocale = "ko" | "en";

export const apartmentManagementFeeBudgetContent = {
  ko: {
    title: "아파트 관리비 예산 계산기",
    description:
      "월 관리비, 공과금, 주차·기타비와 연간 특별부과금을 합쳐 월·연간 관리비 예산과 ㎡당 비용, 소득 대비 비율을 계산합니다.",
    category: "부동산·주거",
    input: "관리비 예산 입력",
    monthlyManagementFee: "월 기본 관리비",
    monthlyUtilities: "월 공과금·사용료",
    monthlyParkingAndOtherFee: "월 주차·기타 반복비",
    annualSpecialAssessment: "연간 특별부과금·수선 예산",
    homeSizeSqm: "주택 면적",
    monthlyNetIncome: "월 순소득",
    calculate: "관리비 예산 계산하기",
    reset: "초기화",
    result: "예상 관리비 예산",
    monthlyRecurringCost: "월 반복 관리비 합계",
    monthlySpecialAssessmentEquivalent: "특별부과금 월 환산",
    monthlyBudgetedCost: "월 예산 관리비",
    annualBudgetedCost: "연간 예산 관리비",
    monthlyCostPerSqm: "㎡당 월 관리비",
    incomeSharePercent: "월 순소득 대비 관리비 비율",
    error:
      "비용은 0 이상, 주택 면적과 월 순소득은 0보다 크게 입력해 주세요.",
    note: "실제 관리비 고지액은 계절, 난방·냉방 사용량, 단지별 부과 기준, 장기수선·특별부과금에 따라 달라질 수 있습니다. 이 계산기는 법정 요율을 적용하지 않고 사용자가 입력한 금액만 예산화합니다.",
    method:
      "월 반복 관리비는 기본 관리비, 공과금·사용료, 주차·기타 반복비를 합산합니다. 연간 특별부과금은 12개월로 나눠 월 예산에 반영하며, 이를 기준으로 연간 총액, ㎡당 월 비용, 월 순소득 대비 비율을 계산합니다.",
    tips: "최근 6~12개월 고지서를 평균내 계절 변동을 반영하고, 비정기 수선비나 특별부과금이 예상되면 연간 예산에 포함하세요. 이사 전이라면 중개인이나 관리사무소에서 최근 고지 내역을 확인하는 편이 좋습니다.",
    metaTitle: "아파트 관리비 예산 계산기 | 월·연간·㎡당 관리비",
  },
  en: {
    title: "Apartment Management Fee Budget Calculator",
    description:
      "Combine monthly management fees, utilities, parking and other recurring charges with annual special assessments to estimate monthly and annual apartment costs, cost per square meter, and income share.",
    category: "Housing & Real Estate",
    input: "Management-fee budget inputs",
    monthlyManagementFee: "Monthly base management fee",
    monthlyUtilities: "Monthly utilities and usage charges",
    monthlyParkingAndOtherFee: "Monthly parking and other recurring fees",
    annualSpecialAssessment: "Annual special assessments / repair reserve",
    homeSizeSqm: "Home size",
    monthlyNetIncome: "Monthly net income",
    calculate: "Calculate fee budget",
    reset: "Reset",
    result: "Estimated apartment fee budget",
    monthlyRecurringCost: "Monthly recurring fee total",
    monthlySpecialAssessmentEquivalent: "Special assessments per month",
    monthlyBudgetedCost: "Monthly budgeted apartment cost",
    annualBudgetedCost: "Annual budgeted apartment cost",
    monthlyCostPerSqm: "Monthly cost per m²",
    incomeSharePercent: "Apartment fees as % of net income",
    error:
      "Enter non-negative costs and values above zero for home size and monthly net income.",
    note: "Actual apartment charges vary with season, heating and cooling use, building rules, reserve funding and special assessments. This calculator does not apply statutory rates; it budgets only the amounts you enter.",
    method:
      "Monthly recurring cost combines the base management fee, utilities and usage charges, parking, and other recurring fees. Annual special assessments are spread across 12 months for budgeting. The calculator then shows the annual total, monthly cost per square meter, and share of monthly net income.",
    tips: "Average the most recent 6–12 months of statements to capture seasonal swings. If you are evaluating a new apartment, ask for recent management-fee statements and known upcoming special assessments before setting your budget.",
    metaTitle:
      "Apartment Management Fee Budget Calculator | Monthly & Annual Costs",
  },
} satisfies Record<
  ApartmentManagementFeeBudgetLocale,
  Record<string, string>
>;
