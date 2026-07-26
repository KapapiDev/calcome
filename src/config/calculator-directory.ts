import {
  publishedCalculators,
  type PublishedCalculator,
} from "@/config/calculators";

export type CalculatorDirectoryCategory = {
  id:
    | "employment"
    | "loan"
    | "tax"
    | "housing"
    | "savings"
    | "investment"
    | "business-life";
  name: string;
  description: string;
  calculatorIds: readonly string[];
};

export const dividendYieldCalculator = {
  id: "dividend-yield",
  name: "배당수익률 계산기",
  description:
    "현재 주가와 주당 연간 배당금으로 배당수익률과 투자금 기준 예상 배당금을 계산합니다.",
  keywords: ["배당수익률", "배당률", "예상 배당금", "dividend yield"],
  category: "금융",
  href: "/ko/finance/dividend-yield",
} as const satisfies PublishedCalculator;

export const allPublishedCalculators = [
  ...publishedCalculators,
  dividendYieldCalculator,
] as const satisfies readonly PublishedCalculator[];

const directoryAliases: Readonly<Record<string, readonly string[]>> = {
  ltv: ["주담대", "담보대출"],
  dsr: ["대출규제", "총부채원리금"],
  "mortgage-payment": ["주담대", "주택 대출"],
  "real-estate-brokerage-fee": ["복비", "중개수수료"],
  "stock-average-cost": ["물타기", "평단", "평단가"],
  "net-salary": ["연봉 실수령", "월급 실수령"],
  "freelancer-3-3-tax": ["3.3", "삼쩜삼"],
};

export const calculatorDirectoryCategories = [
  {
    id: "employment",
    name: "급여·근로",
    description: "급여, 수당, 퇴직, 보험과 근로시간을 계산합니다.",
    calculatorIds: [
      "weekly-holiday-pay",
      "severance-pay",
      "unemployment-benefits",
      "net-salary",
      "hourly-wage",
      "social-insurance",
      "average-wage",
      "salary-raise",
      "salary-conversion",
      "overtime-pay",
      "night-work-pay",
      "holiday-work-pay",
      "minimum-wage",
      "annual-leave-allowance",
      "retirement-pension",
      "gross-up-salary",
    ],
  },
  {
    id: "loan",
    name: "대출·신용",
    description: "대출 한도, 금리, 상환액과 부채 부담을 비교합니다.",
    calculatorIds: [
      "ltv",
      "dsr",
      "loan",
      "loan-interest-comparison",
      "loan-refinancing-savings",
      "balloon-payment",
      "mortgage-payment",
      "jeonse-loan-interest",
      "credit-loan-interest",
      "early-loan-repayment-fee",
      "dti",
      "loan-affordability",
      "debt-repayment-period",
      "credit-card-installment-interest",
    ],
  },
  {
    id: "tax",
    name: "세금",
    description: "소득, 거래와 보유 과정에서 발생하는 세금을 계산합니다.",
    calculatorIds: [
      "real-estate-acquisition-tax",
      "capital-gains-tax",
      "gift-tax",
      "inheritance-tax",
      "property-tax",
      "comprehensive-real-estate-holding-tax",
      "value-added-tax",
      "comprehensive-income-tax",
      "withholding-tax",
      "freelancer-3-3-tax",
    ],
  },
  {
    id: "housing",
    name: "부동산·주거",
    description: "전월세 전환, 중개보수와 주거비를 비교합니다.",
    calculatorIds: [
      "rent-conversion-rate",
      "jeonse-monthly-rent-conversion",
      "real-estate-brokerage-fee",
    ],
  },
  {
    id: "savings",
    name: "저축·연금",
    description: "예금, 적금, 복리와 장기 자산 성장을 계산합니다.",
    calculatorIds: ["deposit", "savings", "compound-interest"],
  },
  {
    id: "investment",
    name: "투자",
    description: "수익률, 평균단가, 배당과 투자 성과를 확인합니다.",
    calculatorIds: [
      "cagr",
      "stock-average-cost",
      "stock-profit-loss",
      "dividend",
      "dividend-yield",
    ],
  },
  {
    id: "business-life",
    name: "사업·생활",
    description: "사업과 생활 금융에 필요한 계산기를 모았습니다.",
    calculatorIds: [],
  },
] as const satisfies readonly CalculatorDirectoryCategory[];

const primaryCategoryNameByCalculatorId = new Map(
  calculatorDirectoryCategories.flatMap((category) =>
    category.calculatorIds.map((id) => [id, category.name] as const),
  ),
);

export const directorySearchCalculators = allPublishedCalculators.map(
  (calculator) => {
    const category = primaryCategoryNameByCalculatorId.get(calculator.id);
    if (!category) {
      throw new Error(`Missing primary directory category: ${calculator.id}`);
    }

    return {
      ...calculator,
      category,
      keywords: [
        ...calculator.keywords,
        ...(directoryAliases[calculator.id] ?? []),
      ],
    };
  },
) satisfies readonly PublishedCalculator[];

const calculatorsById = new Map(
  allPublishedCalculators.map(
    (calculator) => [calculator.id, calculator] as const,
  ),
);

export const groupedCalculatorDirectory = calculatorDirectoryCategories.map(
  (category) => ({
    ...category,
    calculators: category.calculatorIds.map((id) => {
      const calculator = calculatorsById.get(id);
      if (!calculator) {
        throw new Error(`Unknown calculator directory id: ${id}`);
      }
      return calculator;
    }),
  }),
);

export const visibleCalculatorDirectory = groupedCalculatorDirectory.filter(
  (category) => category.calculators.length > 0,
);

export const popularCalculatorIds = [
  "compound-interest",
  "loan",
  "deposit",
  "savings",
  "cagr",
  "severance-pay",
] as const;

export const popularCalculators = popularCalculatorIds.map((id) => {
  const calculator = calculatorsById.get(id);
  if (!calculator) {
    throw new Error(`Unknown popular calculator id: ${id}`);
  }
  return calculator;
});