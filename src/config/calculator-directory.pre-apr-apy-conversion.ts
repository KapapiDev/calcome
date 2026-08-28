import type { PublishedCalculator } from "./calculators";
import * as previous from "./calculator-directory.pre-bond-price";

export * from "./calculator-directory.pre-bond-price";

export const bondPriceCalculator = {
  id: "bond-price",
  name: "채권 가격 계산기",
  description:
    "액면가, 표면금리, 시장 요구수익률, 만기와 이자 지급주기로 고정금리 채권의 이론 가격과 프리미엄·할인을 계산합니다.",
  keywords: [
    "채권 가격 계산기",
    "채권 가치 계산기",
    "채권 할인 계산",
    "채권 프리미엄",
    "bond price calculator",
  ],
  category: "금융",
  href: "/ko/finance/bond-price",
} as const satisfies PublishedCalculator;

export const allPublishedCalculators = [
  ...previous.allPublishedCalculators,
  bondPriceCalculator,
] as const satisfies readonly PublishedCalculator[];

export const calculatorDirectoryCategories =
  previous.calculatorDirectoryCategories.map((category) => {
    if (category.id === "investment") {
      return {
        ...category,
        calculatorIds: [...category.calculatorIds, "bond-price"],
      };
    }
    return category;
  }) satisfies readonly previous.CalculatorDirectoryCategory[];

export const directorySearchCalculators = [
  ...previous.directorySearchCalculators,
  {
    ...bondPriceCalculator,
    primaryCategory: "투자",
    keywords: [
      ...bondPriceCalculator.keywords,
      "채권 현재가치",
      "YTM 채권 가격",
      "표면금리 채권 가격",
      "fixed income price calculator",
      "bond valuation calculator",
      "coupon bond price",
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
