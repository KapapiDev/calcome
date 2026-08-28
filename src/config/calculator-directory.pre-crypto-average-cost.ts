import type { PublishedCalculator } from "./calculators";
import * as previous from "./calculator-directory.pre-apr-apy-conversion";

export * from "./calculator-directory.pre-apr-apy-conversion";

export const aprApyConversionCalculator = {
  id: "apr-apy-conversion",
  name: "APR·APY 변환 계산기",
  description:
    "명목 연이율(APR)과 복리 효과를 포함한 연환산수익률(APY)을 복리 주기에 맞춰 서로 변환합니다.",
  keywords: [
    "APR APY 계산기",
    "APR APY 변환",
    "유효 연이율 계산기",
    "명목 이율 변환",
    "apr to apy calculator",
  ],
  category: "금융",
  href: "/ko/finance/apr-apy-conversion",
} as const satisfies PublishedCalculator;

export const allPublishedCalculators = [
  ...previous.allPublishedCalculators,
  aprApyConversionCalculator,
] as const satisfies readonly PublishedCalculator[];

export const calculatorDirectoryCategories =
  previous.calculatorDirectoryCategories.map((category) => {
    if (category.id === "savings") {
      return {
        ...category,
        calculatorIds: [...category.calculatorIds, "apr-apy-conversion"],
      };
    }
    return category;
  }) satisfies readonly previous.CalculatorDirectoryCategory[];

export const directorySearchCalculators = [
  ...previous.directorySearchCalculators,
  {
    ...aprApyConversionCalculator,
    primaryCategory: "저축·연금",
    keywords: [
      ...aprApyConversionCalculator.keywords,
      "APY APR 계산기",
      "연이율 복리 계산",
      "effective annual rate",
      "nominal annual rate",
      "annual percentage yield",
      "annual percentage rate",
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
