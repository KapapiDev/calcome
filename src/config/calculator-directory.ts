import type { PublishedCalculator } from "./calculators";
import * as base from "./calculator-directory.base";

export * from "./calculator-directory.base";

export const totalCompensationComparisonCalculator = {
  id: "total-compensation-comparison",
  name: "오퍼 총보상 비교 계산기",
  description:
    "두 채용 제안의 연봉, 보너스, 주식보상, 복리후생과 사이닝 보너스를 같은 기간으로 환산해 비교합니다.",
  keywords: ["오퍼 비교", "총보상 비교", "연봉 비교", "채용 제안 비교", "total compensation comparison"],
  category: "금융",
  href: "/ko/employment/total-compensation-comparison",
} as const satisfies PublishedCalculator;

export const salaryNegotiationTargetCalculator = {
  id: "salary-negotiation-target",
  name: "연봉 협상 목표 계산기",
  description: "현재 연봉과 최소·목표·도전 인상률을 기준으로 협상에 사용할 연봉 구간과 인상 금액을 계산합니다.",
  keywords: ["연봉 협상", "연봉 인상", "희망 연봉", "목표 연봉", "salary negotiation"],
  category: "금융",
  href: "/ko/employment/salary-negotiation-target",
} as const satisfies PublishedCalculator;

export const employerTotalLaborCostCalculator = {
  id: "employer-total-labor-cost",
  name: "사업주 총 인건비 계산기",
  description: "월 보수에 2026년 사업주 부담 사회보험과 퇴직급여 충당액을 더해 총 인건비를 추정합니다.",
  keywords: ["사업주 인건비", "총 인건비", "4대보험 사업주 부담", "직원 고용 비용", "employer labor cost"],
  category: "금융",
  href: "/ko/employment/employer-total-labor-cost",
} as const satisfies PublishedCalculator;

export const parentalLeaveBenefitCalculator = {
  id: "parental-leave-benefit",
  name: "육아휴직 급여 계산기",
  description: "월 통상임금과 육아휴직 기간으로 2026년 일반 육아휴직급여의 월별 지급액과 총 예상 급여를 계산합니다.",
  keywords: ["육아휴직 급여", "육아휴직 수당", "육아휴직 계산기", "육아휴직 250만원", "parental leave benefit"],
  category: "금융",
  href: "/ko/employment/parental-leave-benefit",
} as const satisfies PublishedCalculator;

export const maternityLeaveBenefitCalculator = {
  id: "maternity-leave-benefit",
  name: "출산전후휴가 급여 계산기",
  description: "월 통상임금과 사업장 유형으로 현행 출산전후휴가의 고용보험 지원액과 사업주 지급액을 추정합니다.",
  keywords: ["출산전후휴가 급여", "출산휴가 급여", "출산휴가 계산기", "다태아 출산휴가", "maternity leave benefit korea"],
  category: "금융",
  href: "/ko/employment/maternity-leave-benefit",
} as const satisfies PublishedCalculator;

export const jeonseLoanLimitCalculator = {
  id: "jeonse-loan-limit",
  name: "전세대출 한도 계산기",
  description: "HF 일반전세자금보증의 보증과목·소요자금·상환능력 기준으로 예상 전세자금 보증한도를 계산합니다.",
  keywords: ["전세대출 한도", "전세자금대출 한도", "전세 보증한도", "HF 전세자금보증", "jeonse loan limit"],
  category: "금융",
  href: "/ko/finance/jeonse-loan-limit",
} as const satisfies PublishedCalculator;

export const rentAffordabilityCalculator = {
  id: "rent-affordability",
  name: "월세 적정 예산 계산기",
  description: "월 순소득, 고정지출, 남기고 싶은 금액과 목표 주거비 비율로 감당 가능한 월세 상한을 계산합니다.",
  keywords: ["월세 적정", "월세 예산", "월세 한도", "주거비 비율", "rent affordability"],
  category: "금융",
  href: "/ko/finance/rent-affordability",
} as const satisfies PublishedCalculator;

export const jeonseVsRentCalculator = {
  id: "jeonse-vs-rent",
  name: "전세 보증금 vs 월세 비용 비교 계산기",
  description: "전세대출 이자와 보증금 기회비용을 월세 보증금 기회비용·월세 납부액과 같은 기간으로 비교합니다.",
  keywords: ["전세 월세 비교", "전세 vs 월세", "전세 기회비용", "월세 비용", "jeonse vs rent"],
  category: "금융",
  href: "/ko/finance/jeonse-vs-rent",
} as const satisfies PublishedCalculator;

export const allPublishedCalculators = [
  ...base.allPublishedCalculators,
  totalCompensationComparisonCalculator,
  salaryNegotiationTargetCalculator,
  employerTotalLaborCostCalculator,
  parentalLeaveBenefitCalculator,
  maternityLeaveBenefitCalculator,
  jeonseLoanLimitCalculator,
  rentAffordabilityCalculator,
  jeonseVsRentCalculator,
] as const satisfies readonly PublishedCalculator[];

export const calculatorDirectoryCategories = base.calculatorDirectoryCategories.map((category) =>
  category.id === "employment"
    ? { ...category, calculatorIds: [...category.calculatorIds, "total-compensation-comparison", "salary-negotiation-target", "parental-leave-benefit", "maternity-leave-benefit"] }
    : category.id === "business-life"
      ? { ...category, calculatorIds: [...category.calculatorIds, "employer-total-labor-cost"] }
      : category.id === "loan"
        ? { ...category, calculatorIds: [...category.calculatorIds, "jeonse-loan-limit"] }
        : category.id === "housing"
          ? { ...category, calculatorIds: [...category.calculatorIds, "rent-affordability", "jeonse-vs-rent"] }
          : category,
) satisfies readonly base.CalculatorDirectoryCategory[];

export const directorySearchCalculators = [
  ...base.directorySearchCalculators,
  { ...totalCompensationComparisonCalculator, primaryCategory: "급여·근로", keywords: [...totalCompensationComparisonCalculator.keywords, "보상 패키지", "오퍼 연봉", "사이닝 보너스 비교", "job offer comparison"] },
  { ...salaryNegotiationTargetCalculator, primaryCategory: "급여·근로", keywords: [...salaryNegotiationTargetCalculator.keywords, "연봉협상 계산기", "인상률 계산", "협상 연봉", "raise target"] },
  { ...employerTotalLaborCostCalculator, primaryCategory: "사업·생활", keywords: [...employerTotalLaborCostCalculator.keywords, "사업주 4대보험", "인건비 계산", "고용 비용", "payroll employer cost"] },
  { ...parentalLeaveBenefitCalculator, primaryCategory: "급여·근로", keywords: [...parentalLeaveBenefitCalculator.keywords, "육아휴직 급여 2026", "육아휴직 상한액", "육아휴직 하한액", "parental leave pay korea"] },
  { ...maternityLeaveBenefitCalculator, primaryCategory: "급여·근로", keywords: [...maternityLeaveBenefitCalculator.keywords, "출산휴가 90일", "출산휴가 120일", "출산전후휴가 상한액", "우선지원 대상기업 출산휴가"] },
  { ...jeonseLoanLimitCalculator, primaryCategory: "대출·신용", keywords: [...jeonseLoanLimitCalculator.keywords, "전세 한도", "전세대출 가능금액", "전세자금 보증", "korea jeonse guarantee"] },
  { ...rentAffordabilityCalculator, primaryCategory: "부동산·주거", keywords: [...rentAffordabilityCalculator.keywords, "월세 적정선", "월세 얼마", "월세 소득 비율", "rent budget"] },
  { ...jeonseVsRentCalculator, primaryCategory: "부동산·주거", keywords: [...jeonseVsRentCalculator.keywords, "전월세 비교", "전세 월세 손익", "보증금 기회비용", "rent versus jeonse"] },
] satisfies readonly base.DirectorySearchCalculator[];

const calculatorsById = new Map<string, PublishedCalculator>(
  allPublishedCalculators.map((calculator) => [calculator.id, calculator] as const),
);

export const groupedCalculatorDirectory = calculatorDirectoryCategories.map((category) => ({
  ...category,
  calculators: category.calculatorIds.map((id) => {
    const calculator = calculatorsById.get(id);
    if (!calculator) throw new Error(`Unknown calculator directory id: ${id}`);
    return calculator;
  }),
}));

export const visibleCalculatorDirectory = groupedCalculatorDirectory.filter(
  (category) => category.calculators.length > 0,
);
