import type { PublishedCalculator } from "./calculators";
import * as previous from "./calculator-directory.pre-crypto-profit-loss";

export * from "./calculator-directory.pre-crypto-profit-loss";

export const cryptoProfitLossCalculator = {
  id: "crypto-profit-loss",
  name: "암호화폐 손익 계산기",
  description:
    "보유 수량·평균 매수가·현재 가격과 매수·매도 수수료를 반영해 평가손익, 수익률, 손익분기 가격을 계산합니다.",
  keywords: [
    "코인 수익률 계산기",
    "암호화폐 손익 계산기",
    "비트코인 수익 계산기",
    "crypto profit loss calculator",
    "crypto roi calculator",
  ],
  category: "금융",
  href: "/ko/finance/crypto-profit-loss",
} as const satisfies PublishedCalculator;

export const allPublishedCalculators = [
  ...previous.allPublishedCalculators,
  cryptoProfitLossCalculator,
] as const satisfies readonly PublishedCalculator[];

export const calculatorDirectoryCategories =
  previous.calculatorDirectoryCategories.map((category) => {
    if (category.id === "investment") {
      return {
        ...category,
        calculatorIds: [...category.calculatorIds, "crypto-profit-loss"],
      };
    }
    return category;
  }) satisfies readonly previous.CalculatorDirectoryCategory[];

export const directorySearchCalculators = [
  ...previous.directorySearchCalculators,
  {
    ...cryptoProfitLossCalculator,
    primaryCategory: "투자",
    keywords: [
      ...cryptoProfitLossCalculator.keywords,
      "코인 손익",
      "코인 평가손익",
      "bitcoin profit calculator",
      "crypto return calculator",
      "break even crypto price",
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
