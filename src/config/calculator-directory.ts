import type { PublishedCalculator } from "./calculators";
import * as previous from "./calculator-directory.pre-foreign-currency-average-cost";

export * from "./calculator-directory.pre-foreign-currency-average-cost";

export const foreignCurrencyAverageCostCalculator = {
  id: "foreign-currency-average-cost",
  name: "외화 평균단가 계산기",
  description:
    "기존 외화 보유량·평균 환율과 추가 매수량·환율을 합쳐 새 가중평균 환율과 총 외화 매입 원가를 계산합니다.",
  keywords: [
    "외화 평균단가 계산기",
    "달러 평단 계산기",
    "환율 평단 계산기",
    "외화 물타기 계산기",
    "foreign currency average cost calculator",
  ],
  category: "금융",
  href: "/ko/finance/foreign-currency-average-cost",
} as const satisfies PublishedCalculator;

export const breakEvenSalesCalculator = {
  id: "break-even-sales",
  name: "손익분기 매출 계산기",
  description:
    "고정비, 단위 판매가격, 단위 변동비로 공헌이익과 손익분기 판매량·매출액을 계산합니다.",
  keywords: [
    "손익분기 매출 계산기",
    "손익분기점 계산기",
    "공헌이익 계산기",
    "break even sales calculator",
    "break even point calculator",
  ],
  category: "금융",
  href: "/ko/finance/break-even-sales",
} as const satisfies PublishedCalculator;

export const operatingProfitCalculator = {
  id: "operating-profit",
  name: "영업이익 계산기",
  description:
    "매출액, 매출원가, 영업비용으로 매출총이익, 영업이익, 영업이익률을 계산합니다.",
  keywords: [
    "영업이익 계산기",
    "영업이익률 계산기",
    "매출총이익 계산기",
    "operating profit calculator",
    "operating margin calculator",
  ],
  category: "금융",
  href: "/ko/finance/operating-profit",
} as const satisfies PublishedCalculator;

export const businessCashRunwayCalculator = {
  id: "business-cash-runway",
  name: "사업 현금 런웨이 계산기",
  description:
    "현재 보유 현금과 월 현금 유입·유출로 월 순소진액, 예상 런웨이와 현금 소진 시점을 계산합니다.",
  keywords: [
    "사업 현금 런웨이 계산기",
    "현금 소진 계산기",
    "번레이트 계산기",
    "business cash runway calculator",
    "cash burn rate calculator",
  ],
  category: "금융",
  href: "/ko/finance/business-cash-runway",
} as const satisfies PublishedCalculator;

export const allPublishedCalculators = [
  ...previous.allPublishedCalculators,
  foreignCurrencyAverageCostCalculator,
  breakEvenSalesCalculator,
  operatingProfitCalculator,
  businessCashRunwayCalculator,
] as const satisfies readonly PublishedCalculator[];

export const calculatorDirectoryCategories =
  previous.calculatorDirectoryCategories.map((category) => {
    if (category.id === "investment") {
      return {
        ...category,
        calculatorIds: [
          ...category.calculatorIds,
          "foreign-currency-average-cost",
        ],
      };
    }
    if (category.id === "business-life") {
      return {
        ...category,
        calculatorIds: [
          ...category.calculatorIds,
          "break-even-sales",
          "operating-profit",
          "business-cash-runway",
        ],
      };
    }
    return category;
  }) satisfies readonly previous.CalculatorDirectoryCategory[];

export const directorySearchCalculators = [
  ...previous.directorySearchCalculators,
  {
    ...foreignCurrencyAverageCostCalculator,
    primaryCategory: "투자",
    keywords: [
      ...foreignCurrencyAverageCostCalculator.keywords,
      "달러 평균 환율",
      "엔화 평단",
      "유로 평단",
      "average exchange rate calculator",
      "weighted average fx rate",
      "currency cost basis calculator",
    ],
  },
  {
    ...breakEvenSalesCalculator,
    primaryCategory: "사업·생활",
    keywords: [
      ...breakEvenSalesCalculator.keywords,
      "손익분기 매출액",
      "손익분기 판매량",
      "공헌이익률",
      "contribution margin calculator",
      "break even revenue calculator",
    ],
  },
  {
    ...operatingProfitCalculator,
    primaryCategory: "사업·생활",
    keywords: [
      ...operatingProfitCalculator.keywords,
      "영업 손익 계산기",
      "영업 마진 계산기",
      "매출 영업이익률",
      "operating income calculator",
      "profit margin calculator",
      "gross profit calculator",
    ],
  },
  {
    ...businessCashRunwayCalculator,
    primaryCategory: "사업·생활",
    keywords: [
      ...businessCashRunwayCalculator.keywords,
      "현금 런웨이",
      "사업자금 소진",
      "월 순소진액",
      "startup runway calculator",
      "cash runway months",
      "monthly burn calculator",
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
