import type { PublishedCalculator } from "./calculators";
import * as previous from "./calculator-directory.pre-staking-reward";

export * from "./calculator-directory.pre-staking-reward";

export const stakingRewardCalculator = {
  id: "staking-reward",
  name: "스테이킹 보상 계산기",
  description:
    "스테이킹 수량·연 보상률·기간과 재투자 빈도를 바탕으로 예상 보상 수량, 최종 수량, 기간 수익률을 계산합니다.",
  keywords: [
    "스테이킹 계산기",
    "코인 스테이킹 보상",
    "스테이킹 수익 계산기",
    "staking reward calculator",
    "crypto staking calculator",
  ],
  category: "금융",
  href: "/ko/finance/staking-reward",
} as const satisfies PublishedCalculator;

export const allPublishedCalculators = [
  ...previous.allPublishedCalculators,
  stakingRewardCalculator,
] as const satisfies readonly PublishedCalculator[];

export const calculatorDirectoryCategories =
  previous.calculatorDirectoryCategories.map((category) => {
    if (category.id === "investment") {
      return {
        ...category,
        calculatorIds: [...category.calculatorIds, "staking-reward"],
      };
    }
    return category;
  }) satisfies readonly previous.CalculatorDirectoryCategory[];

export const directorySearchCalculators = [
  ...previous.directorySearchCalculators,
  {
    ...stakingRewardCalculator,
    primaryCategory: "투자",
    keywords: [
      ...stakingRewardCalculator.keywords,
      "스테이킹 apr",
      "스테이킹 apy",
      "스테이킹 복리",
      "staking apr calculator",
      "staking apy calculator",
      "staking compound interest",
    ],
  },
] satisfies readonly previous.DirectorySearchCalculator[];

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
      if (!calculator)
        throw new Error(`Unknown calculator directory id: ${id}`);
      return calculator;
    }),
  }),
);

export const visibleCalculatorDirectory = groupedCalculatorDirectory.filter(
  (category) => category.calculators.length > 0,
);
