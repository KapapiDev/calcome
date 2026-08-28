import type { PublishedCalculator } from "./calculators";
import * as previous from "./calculator-directory.pre-portfolio-rebalancing";

export * from "./calculator-directory.pre-portfolio-rebalancing";

export const portfolioRebalancingCalculator = {
  id: "portfolio-rebalancing",
  name: "포트폴리오 리밸런싱 계산기",
  description:
    "현재 자산별 금액과 목표 비중으로 목표 포트폴리오에 맞추기 위한 자산별 매수·매도 금액과 회전율을 계산합니다.",
  keywords: [
    "포트폴리오 리밸런싱 계산기",
    "자산배분 계산기",
    "목표 비중",
    "리밸런싱 매수 매도",
    "portfolio rebalancing calculator",
  ],
  category: "금융",
  href: "/ko/finance/portfolio-rebalancing",
} as const satisfies PublishedCalculator;

export const allPublishedCalculators = [
  ...previous.allPublishedCalculators,
  portfolioRebalancingCalculator,
] as const satisfies readonly PublishedCalculator[];

export const calculatorDirectoryCategories =
  previous.calculatorDirectoryCategories.map((category) => {
    if (category.id === "investment") {
      return {
        ...category,
        calculatorIds: [...category.calculatorIds, "portfolio-rebalancing"],
      };
    }
    return category;
  }) satisfies readonly previous.CalculatorDirectoryCategory[];

export const directorySearchCalculators = [
  ...previous.directorySearchCalculators,
  {
    ...portfolioRebalancingCalculator,
    primaryCategory: "투자",
    keywords: [
      ...portfolioRebalancingCalculator.keywords,
      "포트폴리오 비중 조정",
      "주식 채권 리밸런싱",
      "자산 비중 맞추기",
      "asset allocation rebalancing",
      "rebalance portfolio",
      "buy sell rebalancing",
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
