import type { PublishedCalculator } from "./calculators";
import * as previous from "./calculator-directory.pre-bond-yield-to-maturity";

export * from "./calculator-directory.pre-bond-yield-to-maturity";

export const bondYieldToMaturityCalculator = {
  id: "bond-yield-to-maturity",
  name: "채권 만기수익률(YTM) 계산기",
  description:
    "액면가, 시장가격, 표면금리, 만기와 이자 지급주기로 채권의 만기수익률(YTM)과 현재수익률을 계산합니다.",
  keywords: [
    "채권 만기수익률 계산기",
    "YTM 계산기",
    "채권 수익률",
    "현재수익률",
    "bond yield to maturity calculator",
  ],
  category: "금융",
  href: "/ko/finance/bond-yield-to-maturity",
} as const satisfies PublishedCalculator;

export const allPublishedCalculators = [
  ...previous.allPublishedCalculators,
  bondYieldToMaturityCalculator,
] as const satisfies readonly PublishedCalculator[];

export const calculatorDirectoryCategories =
  previous.calculatorDirectoryCategories.map((category) => {
    if (category.id === "investment") {
      return {
        ...category,
        calculatorIds: [...category.calculatorIds, "bond-yield-to-maturity"],
      };
    }
    return category;
  }) satisfies readonly previous.CalculatorDirectoryCategory[];

export const directorySearchCalculators = [
  ...previous.directorySearchCalculators,
  {
    ...bondYieldToMaturityCalculator,
    primaryCategory: "투자",
    keywords: [
      ...bondYieldToMaturityCalculator.keywords,
      "채권 내부수익률",
      "쿠폰 채권 수익률",
      "채권 할인율",
      "bond ytm",
      "bond current yield",
      "fixed income yield calculator",
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
