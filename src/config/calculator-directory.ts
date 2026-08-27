import type { PublishedCalculator } from "./calculators";
import * as previous from "./calculator-directory.pre-age";

export * from "./calculator-directory.base";
export {
  apartmentManagementFeeBudgetCalculator,
  discountSalePriceCalculator,
  employerTotalLaborCostCalculator,
  homePurchaseTotalCostCalculator,
  homeSaleNetProceedsCalculator,
  jeonseLoanLimitCalculator,
  jeonseVsRentCalculator,
  maternityLeaveBenefitCalculator,
  parentalLeaveBenefitCalculator,
  percentageCalculator,
  rentalYieldCalculator,
  rentAffordabilityCalculator,
  salaryNegotiationTargetCalculator,
  totalCompensationComparisonCalculator,
} from "./calculator-directory.pre-age";

export const ageCalculator = {
  id: "age",
  name: "나이 계산기",
  description:
    "생년월일과 기준일로 만 나이, 총 경과 일수, 주 단위 기간과 다음 생일까지 남은 날짜를 계산합니다.",
  keywords: [
    "나이 계산기",
    "만 나이",
    "생년월일 계산",
    "몇 살",
    "age calculator",
  ],
  category: "금융",
  href: "/ko/finance/age",
} as const satisfies PublishedCalculator;

export const allPublishedCalculators = [
  ...previous.allPublishedCalculators,
  ageCalculator,
] as const satisfies readonly PublishedCalculator[];

export const calculatorDirectoryCategories =
  previous.calculatorDirectoryCategories.map((category) =>
    category.id === "business-life"
      ? {
          ...category,
          calculatorIds: [...category.calculatorIds, "age"],
        }
      : category,
  ) satisfies readonly previous.CalculatorDirectoryCategory[];

export const directorySearchCalculators = [
  ...previous.directorySearchCalculators,
  {
    ...ageCalculator,
    primaryCategory: "사업·생활",
    keywords: [
      ...ageCalculator.keywords,
      "만나이 계산기",
      "생일 계산",
      "나이 일수",
      "birthday calculator",
      "age in days",
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
