import type { PublishedCalculator } from "./calculators";
import * as base from "./calculator-directory.base";

export * from "./calculator-directory.base";

export const totalCompensationComparisonCalculator = {
  id: "total-compensation-comparison",
  name: "오퍼 총보상 비교 계산기",
  description:
    "두 채용 제안의 연봉, 보너스, 주식보상, 복리후생과 사이닝 보너스를 같은 기간으로 환산해 비교합니다.",
  keywords: [
    "오퍼 비교",
    "총보상 비교",
    "연봉 비교",
    "채용 제안 비교",
    "total compensation comparison",
  ],
  category: "금융",
  href: "/ko/employment/total-compensation-comparison",
} as const satisfies PublishedCalculator;

export const salaryNegotiationTargetCalculator = {
  id: "salary-negotiation-target",
  name: "연봉 협상 목표 계산기",
  description:
    "현재 연봉과 최소·목표·도전 인상률을 기준으로 협상에 사용할 연봉 구간과 인상 금액을 계산합니다.",
  keywords: [
    "연봉 협상",
    "연봉 인상",
    "희망 연봉",
    "목표 연봉",
    "salary negotiation",
  ],
  category: "금융",
  href: "/ko/employment/salary-negotiation-target",
} as const satisfies PublishedCalculator;

export const allPublishedCalculators = [
  ...base.allPublishedCalculators,
  totalCompensationComparisonCalculator,
  salaryNegotiationTargetCalculator,
] as const satisfies readonly PublishedCalculator[];

export const calculatorDirectoryCategories =
  base.calculatorDirectoryCategories.map((category) =>
    category.id === "employment"
      ? {
          ...category,
          calculatorIds: [
            ...category.calculatorIds,
            "total-compensation-comparison",
            "salary-negotiation-target",
          ],
        }
      : category,
  ) satisfies readonly base.CalculatorDirectoryCategory[];

export const directorySearchCalculators = [
  ...base.directorySearchCalculators,
  {
    ...totalCompensationComparisonCalculator,
    primaryCategory: "급여·근로",
    keywords: [
      ...totalCompensationComparisonCalculator.keywords,
      "보상 패키지",
      "오퍼 연봉",
      "사이닝 보너스 비교",
      "job offer comparison",
    ],
  },
  {
    ...salaryNegotiationTargetCalculator,
    primaryCategory: "급여·근로",
    keywords: [
      ...salaryNegotiationTargetCalculator.keywords,
      "연봉협상 계산기",
      "인상률 계산",
      "협상 연봉",
      "raise target",
    ],
  },
] satisfies readonly base.DirectorySearchCalculator[];

const calculatorsById = new Map<string, PublishedCalculator>(
  allPublishedCalculators.map(
    (calculator) => [calculator.id, calculator] as const,
  ),
);

export const groupedCalculatorDirectory = calculatorDirectoryCategories.map(
  (category) => ({
    ...category,
    calculators: category.calculatorIds.map((id) => {
      const calculator = calculatorsById.get(id);
      if (!calculator) {
        throw new Error(`Unknown calculator directory id: ${id}`);
      }
      return calculator;
    }),
  }),
);

export const visibleCalculatorDirectory = groupedCalculatorDirectory.filter(
  (category) => category.calculators.length > 0,
);
