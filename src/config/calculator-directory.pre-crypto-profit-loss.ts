import type { PublishedCalculator } from "./calculators";
import * as previous from "./calculator-directory.pre-crypto-average-cost";

export * from "./calculator-directory.pre-crypto-average-cost";

export const cryptoAverageCostCalculator = {
  id: "crypto-average-cost",
  name: "암호화폐 평균단가 계산기",
  description:
    "기존 보유 수량·평균단가와 추가 매수 수량·가격을 합쳐 새로운 평균단가와 총 투자금액을 계산합니다.",
  keywords: [
    "코인 물타기 계산기",
    "암호화폐 평균단가",
    "코인 평단 계산기",
    "crypto average cost calculator",
    "bitcoin average price calculator",
  ],
  category: "금융",
  href: "/ko/finance/crypto-average-cost",
} as const satisfies PublishedCalculator;

export const allPublishedCalculators = [
  ...previous.allPublishedCalculators,
  cryptoAverageCostCalculator,
] as const satisfies readonly PublishedCalculator[];

export const calculatorDirectoryCategories =
  previous.calculatorDirectoryCategories.map((category) => {
    if (category.id === "investment") {
      return {
        ...category,
        calculatorIds: [...category.calculatorIds, "crypto-average-cost"],
      };
    }
    return category;
  }) satisfies readonly previous.CalculatorDirectoryCategory[];

export const directorySearchCalculators = [
  ...previous.directorySearchCalculators,
  {
    ...cryptoAverageCostCalculator,
    primaryCategory: "투자",
    keywords: [
      ...cryptoAverageCostCalculator.keywords,
      "비트코인 평단",
      "이더리움 평단",
      "코인 추가매수",
      "crypto averaging down",
      "average entry price",
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
