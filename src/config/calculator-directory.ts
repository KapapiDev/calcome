import type { PublishedCalculator } from "./calculators";
import * as previous from "./calculator-directory.pre-dividend";

export * from "./calculator-directory.pre-dividend";

export const dividendReinvestmentCalculator = {
  id: "dividend-reinvestment",
  name: "배당 재투자 계산기",
  description:
    "초기 투자금, 배당수익률, 주가·배당 성장률과 투자기간으로 배당 재투자와 현금 배당의 장기 결과를 비교합니다.",
  keywords: [
    "배당 재투자 계산기",
    "배당 복리",
    "DRIP 계산기",
    "배당 성장",
    "dividend reinvestment calculator",
  ],
  category: "금융",
  href: "/ko/finance/dividend-reinvestment",
} as const satisfies PublishedCalculator;

export const allPublishedCalculators = [
  ...previous.allPublishedCalculators,
  dividendReinvestmentCalculator,
] as const satisfies readonly PublishedCalculator[];

export const calculatorDirectoryCategories =
  previous.calculatorDirectoryCategories.map((category) => {
    if (category.id === "investment") {
      return {
        ...category,
        calculatorIds: [...category.calculatorIds, "dividend-reinvestment"],
      };
    }
    return category;
  }) satisfies readonly previous.CalculatorDirectoryCategory[];

export const directorySearchCalculators = [
  ...previous.directorySearchCalculators,
  {
    ...dividendReinvestmentCalculator,
    primaryCategory: "투자",
    keywords: [
      ...dividendReinvestmentCalculator.keywords,
      "배당 재투자",
      "배당금 재투자",
      "배당 복리 효과",
      "dividend reinvestment",
      "DRIP calculator",
      "dividend compounding",
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
