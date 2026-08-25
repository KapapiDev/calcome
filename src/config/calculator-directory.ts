import { publishedCalculators, type PublishedCalculator } from "./calculators";

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

export type DirectorySearchCalculator = PublishedCalculator & {
  primaryCategory: string;
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

export const dollarCostAveragingCalculator = {
  id: "dollar-cost-averaging",
  name: "적립식 투자 계산기",
  description:
    "초기 투자금과 매월 적립액, 예상 연 수익률, 투자 기간으로 적립식 투자 결과를 계산합니다.",
  keywords: ["적립식 투자", "DCA", "분할매수", "dollar cost averaging"],
  category: "금융",
  href: "/ko/finance/dollar-cost-averaging",
} as const satisfies PublishedCalculator;

export const stressDsrCalculator = {
  id: "stress-dsr",
  name: "스트레스 DSR 계산기",
  description:
    "기본 대출금리와 스트레스 가산금리를 적용한 DSR과 월 상환액을 비교합니다.",
  keywords: ["스트레스 DSR", "스트레스 금리", "대출 한도", "stress dsr"],
  category: "금융",
  href: "/ko/finance/stress-dsr",
} as const satisfies PublishedCalculator;

export const mortgageLoanLimitCalculator = {
  id: "mortgage-loan-limit",
  name: "주택담보대출 한도 계산기",
  description:
    "주택가격과 소득, LTV·DSR 조건으로 예상 주택담보대출 한도를 계산합니다.",
  keywords: ["주택담보대출 한도", "주담대", "LTV", "DSR", "mortgage limit"],
  category: "금융",
  href: "/ko/finance/mortgage-loan-limit",
} as const satisfies PublishedCalculator;

export const savingsGoalCalculator = {
  id: "savings-goal",
  name: "저축 목표 계산기",
  description:
    "목표 금액과 현재 저축액, 예상 수익률, 기간으로 필요한 월 저축액을 계산합니다.",
  keywords: ["저축 목표", "목표 금액", "월 저축액", "savings goal"],
  category: "금융",
  href: "/ko/finance/savings-goal",
} as const satisfies PublishedCalculator;

export const investmentFeeImpactCalculator = {
  id: "investment-fee-impact",
  name: "투자 수수료 영향 계산기",
  description:
    "연간 운용 수수료가 장기 투자 결과와 최종 자산에 미치는 영향을 비교합니다.",
  keywords: [
    "투자 수수료",
    "운용 보수",
    "수수료 영향",
    "investment fee impact",
  ],
  category: "금융",
  href: "/ko/finance/investment-fee-impact",
} as const satisfies PublishedCalculator;

export const inflationPurchasingPowerCalculator = {
  id: "inflation-purchasing-power",
  name: "물가상승·구매력 계산기",
  description:
    "예상 물가상승률과 기간으로 미래 가격과 현재 돈의 실질 구매력 변화를 계산합니다.",
  keywords: [
    "물가상승",
    "구매력",
    "돈 가치",
    "인플레이션",
    "inflation purchasing power",
  ],
  category: "금융",
  href: "/ko/finance/inflation-purchasing-power",
} as const satisfies PublishedCalculator;

export const currencyConversionCalculator = {
  id: "currency-conversion",
  name: "환율 변환 계산기",
  description:
    "직접 확인한 환율을 입력해 두 통화 사이의 금액과 역환율을 계산합니다.",
  keywords: [
    "환율",
    "통화 변환",
    "외화",
    "currency conversion",
    "exchange rate",
  ],
  category: "금융",
  href: "/ko/finance/currency-conversion",
} as const satisfies PublishedCalculator;

export const pensionSavingsTaxCreditCalculator = {
  id: "pension-savings-tax-credit",
  name: "연금저축 세액공제 계산기",
  description:
    "연금저축과 퇴직연금·IRP 납입액, 소득 기준으로 연금계좌 세액공제 예상액을 계산합니다.",
  keywords: [
    "연금저축 세액공제",
    "연금계좌 세액공제",
    "IRP 세액공제",
    "연말정산 연금저축",
    "pension savings tax credit",
  ],
  category: "금융",
  href: "/ko/finance/pension-savings-tax-credit",
} as const satisfies PublishedCalculator;

export const isaTaxSavingsCalculator = {
  id: "isa-tax-savings",
  name: "ISA 절세 계산기",
  description:
    "ISA 손익통산 후 순이익과 가입 유형으로 비과세 한도, 분리과세액과 예상 절세액을 계산합니다.",
  keywords: [
    "ISA 절세",
    "ISA 세금",
    "ISA 비과세",
    "ISA 분리과세",
    "isa tax savings",
  ],
  category: "금융",
  href: "/ko/finance/isa-tax-savings",
} as const satisfies PublishedCalculator;

export const allPublishedCalculators = [
  ...publishedCalculators,
  dividendYieldCalculator,
  dollarCostAveragingCalculator,
  stressDsrCalculator,
  mortgageLoanLimitCalculator,
  savingsGoalCalculator,
  investmentFeeImpactCalculator,
  inflationPurchasingPowerCalculator,
  currencyConversionCalculator,
  pensionSavingsTaxCreditCalculator,
  isaTaxSavingsCalculator,
] as const satisfies readonly PublishedCalculator[];

const directoryAliases: Readonly<Record<string, readonly string[]>> = {
  ltv: ["주담대", "담보대출"],
  dsr: ["대출규제", "총부채원리금"],
  "stress-dsr": ["가산금리", "스트레스 금리", "대출 규제"],
  "mortgage-loan-limit": ["주담대 한도", "담보대출 한도", "대출 가능 금액"],
  "mortgage-payment": ["주담대", "주택 대출"],
  "real-estate-brokerage-fee": ["복비", "중개수수료"],
  "stock-average-cost": ["물타기", "평단", "평단가"],
  "net-salary": ["연봉 실수령", "월급 실수령"],
  "freelancer-3-3-tax": ["3.3", "삼쩜삼"],
  "dollar-cost-averaging": ["정액매수", "월 적립", "분할 투자"],
  "savings-goal": ["목표저축", "월 저축", "목돈 만들기"],
  "investment-fee-impact": ["운용보수", "펀드 수수료", "장기 수수료"],
  "inflation-purchasing-power": [
    "인플레이션",
    "돈 가치",
    "화폐 가치",
    "실질 구매력",
  ],
  "currency-conversion": ["환전", "외환", "달러 환율", "exchange"],
  "pension-savings-tax-credit": [
    "연금저축",
    "연금 세액공제",
    "IRP",
    "연말정산 연금",
  ],
  "isa-tax-savings": [
    "개인종합자산관리계좌",
    "ISA 비과세",
    "ISA 세금",
    "중개형 ISA",
  ],
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
      "stress-dsr",
      "mortgage-loan-limit",
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
    calculatorIds: [
      "deposit",
      "savings",
      "compound-interest",
      "savings-goal",
      "inflation-purchasing-power",
      "pension-savings-tax-credit",
    ],
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
      "dollar-cost-averaging",
      "investment-fee-impact",
      "isa-tax-savings",
    ],
  },
  {
    id: "business-life",
    name: "사업·생활",
    description: "사업과 생활 금융에 필요한 계산기를 모았습니다.",
    calculatorIds: ["currency-conversion"],
  },
] as const satisfies readonly CalculatorDirectoryCategory[];

const primaryCategoryNameByCalculatorId = new Map(
  calculatorDirectoryCategories.flatMap((category) =>
    category.calculatorIds.map((id) => [id, category.name] as const),
  ),
);

export const directorySearchCalculators = allPublishedCalculators.map(
  (calculator) => {
    const primaryCategory = primaryCategoryNameByCalculatorId.get(
      calculator.id,
    );
    if (!primaryCategory) {
      throw new Error(`Missing primary directory category: ${calculator.id}`);
    }

    return {
      ...calculator,
      primaryCategory,
      keywords: [
        ...calculator.keywords,
        ...(directoryAliases[calculator.id] ?? []),
      ],
    };
  },
) satisfies readonly DirectorySearchCalculator[];

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
