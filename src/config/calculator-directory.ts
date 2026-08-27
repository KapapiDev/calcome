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
  keywords: ["나이 계산기", "만 나이", "생년월일 계산", "몇 살", "age calculator"],
  category: "금융",
  href: "/ko/finance/age",
} as const satisfies PublishedCalculator;

export const dDayCalculator = {
  id: "d-day",
  name: "디데이 계산기",
  description:
    "기준일과 목표일로 D-·D+ 표시, 남은·지난 일수, 주 단위 기간과 목표일 요일을 계산합니다.",
  keywords: ["디데이 계산기", "D-Day", "D-day 계산", "날짜 카운트다운", "d day calculator"],
  category: "금융",
  href: "/ko/finance/d-day",
} as const satisfies PublishedCalculator;

export const dateDifferenceCalculator = {
  id: "date-difference",
  name: "날짜 차이 계산기",
  description:
    "두 날짜 사이의 총 일수, 주 단위 기간과 달력 기준 연·월·일 차이를 계산합니다.",
  keywords: ["날짜 차이 계산기", "두 날짜 사이 일수", "기간 계산기", "날짜 간격", "date difference calculator"],
  category: "금융",
  href: "/ko/finance/date-difference",
} as const satisfies PublishedCalculator;

export const emergencyFundCalculator = {
  id: "emergency-fund",
  name: "비상금 계산기",
  description:
    "월 필수지출과 목표 보장 개월 수로 필요한 비상금, 현재 부족액, 생활비 보장 기간과 목표 달성 예상 기간을 계산합니다.",
  keywords: ["비상금 계산기", "비상자금", "생활비 몇개월", "비상금 얼마", "emergency fund calculator"],
  category: "금융",
  href: "/ko/finance/emergency-fund",
} as const satisfies PublishedCalculator;

export const fireRetirementTargetCalculator = {
  id: "fire-retirement-target",
  name: "FIRE 은퇴 목표 계산기",
  description:
    "월 생활비와 목표 인출률로 경제적 자유에 필요한 목표 자산, 부족액, 달성률과 예상 도달 기간을 계산합니다.",
  keywords: ["FIRE 계산기", "파이어족 계산기", "은퇴 목표 자산", "경제적 자유", "fire retirement calculator"],
  category: "금융",
  href: "/ko/finance/fire-retirement-target",
} as const satisfies PublishedCalculator;

export const allPublishedCalculators = [
  ...previous.allPublishedCalculators,
  ageCalculator,
  dDayCalculator,
  dateDifferenceCalculator,
  emergencyFundCalculator,
  fireRetirementTargetCalculator,
] as const satisfies readonly PublishedCalculator[];

export const calculatorDirectoryCategories =
  previous.calculatorDirectoryCategories.map((category) => {
    if (category.id === "business-life") {
      return {
        ...category,
        calculatorIds: [
          ...category.calculatorIds,
          "age",
          "d-day",
          "date-difference",
        ],
      };
    }
    if (category.id === "savings") {
      return {
        ...category,
        calculatorIds: [
          ...category.calculatorIds,
          "emergency-fund",
          "fire-retirement-target",
        ],
      };
    }
    return category;
  }) satisfies readonly previous.CalculatorDirectoryCategory[];

export const directorySearchCalculators = [
  ...previous.directorySearchCalculators,
  {
    ...ageCalculator,
    primaryCategory: "사업·생활",
    keywords: [...ageCalculator.keywords, "만나이 계산기", "생일 계산", "나이 일수", "birthday calculator", "age in days"],
  },
  {
    ...dDayCalculator,
    primaryCategory: "사업·생활",
    keywords: [...dDayCalculator.keywords, "디데이", "D-100", "D+100", "목표일까지 며칠", "days until date", "countdown calculator"],
  },
  {
    ...dateDifferenceCalculator,
    primaryCategory: "사업·생활",
    keywords: [...dateDifferenceCalculator.keywords, "날짜 계산", "며칠 차이", "기간 일수", "days between dates", "calendar duration"],
  },
  {
    ...emergencyFundCalculator,
    primaryCategory: "저축·연금",
    keywords: [...emergencyFundCalculator.keywords, "생활비 3개월", "생활비 6개월", "비상자금 목표", "rainy day fund", "emergency savings", "months of expenses"],
  },
  {
    ...fireRetirementTargetCalculator,
    primaryCategory: "저축·연금",
    keywords: [...fireRetirementTargetCalculator.keywords, "FIRE number", "financial independence number", "4% rule", "25x expenses", "safe withdrawal rate"],
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
