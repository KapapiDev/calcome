import type { CompoundLocale } from "@/features/compound-interest/i18n";

export type DepositLocale = CompoundLocale;

const ko = {
  page: {
    title: "정기예금 계산기",
    metaTitle: "정기예금 계산기 - 단리·월복리 세후 만기액",
    metaDescription:
      "예치 원금과 기간, 연이율을 입력해 정기예금의 단리·월복리 이자, 예상 세금과 세후 만기액을 계산하세요.",
    description:
      "목돈을 일정 기간 맡길 때 원금에 이자가 쌓이는 과정과 예상 세후 만기액을 확인하세요.",
    home: "홈",
    calculators: "계산기",
    breadcrumb: "현재 위치",
    category: "금융 계산기",
    intro:
      "원금과 금리가 만기까지 유지된다는 가정의 추정치입니다. 우대금리, 중도해지, 수수료와 상품별 계산 규칙은 반영하지 않습니다.",
    methodTitle: "계산 방법",
    method: [
      "단리는 처음 맡긴 원금에만 기간 비례 이자를 계산합니다.",
      "월복리는 매월 발생한 이자를 잔액에 더하고 다음 달에는 그 이자에도 이자를 계산합니다.",
      "선택한 간이 세율은 만기 시점의 세전 이자에 한 번 적용하며, 계산 중에는 반올림하지 않습니다.",
    ],
    cautionsTitle: "계산 전 확인하세요",
    cautions: [
      "통화 선택은 표시 형식만 바꾸며 환율을 변환하지 않습니다. 원금과 금리는 전체 기간 동안 일정하다고 가정합니다.",
      "일반과세 15.4%는 이자소득세 14%와 지방소득세 1.4%를 합친 간이 추정입니다.",
      "중도해지이율, 우대금리, 수수료, 재예치와 상품별 실제 일수 계산은 포함하지 않습니다.",
      "결과는 법률·세무·금융 조언이나 특정 금융상품의 지급액 보장이 아닙니다.",
    ],
    faqTitle: "자주 묻는 질문",
    faq: [
      [
        "정기예금과 적금은 어떻게 다른가요?",
        "정기예금은 원금을 한 번에 맡기고, 적금은 일정 금액을 정해진 주기마다 나누어 납입합니다.",
      ],
      [
        "단리와 월복리는 어떻게 다른가요?",
        "단리는 원금에만 이자가 붙고, 월복리는 이미 쌓인 이자에도 다음 달 이자가 붙습니다.",
      ],
      [
        "일반과세 15.4%는 확정 세금인가요?",
        "아닙니다. 일반적인 원천징수 구조를 단순화한 추정이며 가입자와 상품 조건에 따라 달라질 수 있습니다.",
      ],
      [
        "1개월 예금과 중도해지도 계산하나요?",
        "1개월 만기 계산은 지원하지만 중도해지이율과 상품별 실제 일수 계산은 지원하지 않습니다.",
      ],
    ],
    relatedTitle: "관련 계산기",
    related: [
      [
        "/ko/finance/compound-interest",
        "복리 계산기",
        "초기 원금과 정기 납입의 장기 복리 성장을 계산합니다.",
      ],
      [
        "/ko/finance/savings",
        "적금 계산기",
        "정기 납입 적금의 세후 만기액을 계산합니다.",
      ],
    ],
  },
  calculator: {
    inputEyebrow: "입력",
    inputTitle: "정기예금 조건 설정",
    inputDescription: "별표(*) 항목은 필수이며 입력한 고정 조건만 계산합니다.",
    errorSummary: "입력값을 확인해 주세요. 첫 번째 오류 항목으로 이동했습니다.",
    amount: "예치 원금",
    amountHelp: "만기까지 한 번에 맡길 원금",
    amountPlaceholder: "예: 10,000,000",
    period: "예치 기간",
    periodHelp: "최대 100년 또는 1,200개월",
    periodPlaceholder: "예: 12",
    periodUnit: "기간 단위",
    years: "년",
    months: "개월",
    rate: "연 이자율",
    rateHelp: "전체 기간에 동일하게 적용할 명목 연이율",
    ratePlaceholder: "예: 3.5",
    method: "이자 방식",
    simple: "단리",
    compound: "월복리",
    taxOption: "세금 옵션",
    general: "일반과세 15.4%",
    taxFree: "비과세",
    custom: "사용자 지정",
    taxHelp:
      "일반과세는 이자소득세 14%와 지방소득세 1.4%를 합친 간이 추정입니다.",
    customTax: "사용자 지정 간이 세율",
    customTaxHelp: "상품에 적용할 추정 세율을 직접 입력하세요.",
    customTaxPlaceholder: "예: 15.4",
    calculate: "만기 결과 계산하기",
    reset: "초기화",
    resultsEyebrow: "예상 결과",
    resultsTitle: "정기예금 만기 예상 결과",
    maturity: "예상 만기금액",
    principal: "예치 원금",
    interest: "예상 이자",
    notice:
      "고정 조건을 가정한 추정치이며 특정 금융상품의 실제 지급액을 보장하지 않습니다.",
    details: "상세 내역 보기",
    emptyDetails:
      "계산 후 월별 원금, 누적 이자와 예상 잔액을 표로 확인할 수 있습니다.",
    tableCaption: "월별 정기예금 원금, 누적 이자와 예상 잔액",
    tableHeadings: ["기간", "예치 원금", "누적 이자", "예상 잔액"],
    monthSuffix: "개월",
    additional: "추가 결과와 적용 가정",
    additionalLabels: [
      "세전 만기액",
      "세전 이자",
      "예상 간이 세금",
      "원금 대비 세후 이자",
    ],
    assumptions: "적용 가정",
    complete: (amount: string) =>
      `계산이 완료되었습니다. 예상 만기금액은 ${amount}입니다.`,
    resetAnnouncement: "입력값과 계산 결과를 초기화했습니다.",
    won: "원",
  },
  chart: {
    title: "정기예금 성장 그래프",
    description:
      "월별 고정 원금, 누적 이자와 세전 예상 잔액의 변화를 보여 줍니다.",
    legend: "차트 범례",
    principal: "예치 원금",
    interest: "누적 이자",
    balance: "예상 만기 가치",
    empty: "값을 입력하고 계산하면 정기예금 성장 그래프가 표시됩니다.",
  },
  validation: {
    amount:
      "예치 원금은 1만원 이상 1조원 이하의 원 단위 금액으로 입력해 주세요.",
    period: "예치 기간은 1 이상의 정수로 입력해 주세요.",
    periodUnit: "예치 기간 단위를 선택해 주세요.",
    rate: "연 이자율은 0% 이상 100% 이하로 입력해 주세요.",
    method: "이자 방식을 선택해 주세요.",
    tax: "세금 옵션을 선택해 주세요.",
    customTax: "사용자 지정 세율은 0% 이상 100% 이하로 입력해 주세요.",
    maxPeriod: "예치 기간은 최대 1,200개월(100년)까지 입력할 수 있습니다.",
    requiredAmount: "예치 원금을 입력해 주세요.",
    requiredPeriod: "예치 기간을 입력해 주세요.",
    requiredRate: "연 이자율을 입력해 주세요.",
  },
};

type Widen<T> = T extends string
  ? string
  : T extends (...args: infer A) => infer R
    ? (...args: A) => R
    : T extends readonly (infer I)[]
      ? readonly Widen<I>[]
      : { [K in keyof T]: Widen<T[K]> };

const en = {
  page: {
    title: "Fixed Deposit Calculator",
    metaTitle: "Fixed Deposit Calculator - After-Tax Maturity Estimate",
    metaDescription:
      "Estimate simple or monthly compound interest, simplified tax, and maturity value for a fixed deposit in your selected display currency.",
    description:
      "See how interest accumulates on a lump-sum deposit and estimate its after-tax maturity value.",
    home: "Home",
    calculators: "Calculators",
    breadcrumb: "Breadcrumb",
    category: "Financial calculator",
    intro:
      "Results assume the principal and rate remain unchanged through maturity. Preferential rates, early termination, fees, and product-specific rules are not included.",
    methodTitle: "How the calculation works",
    method: [
      "Simple interest is calculated only on the initial principal in proportion to time.",
      "Monthly compound interest adds each month's interest to the balance before calculating the next month.",
      "The selected simplified tax rate is applied once to gross interest at maturity. No rounding occurs before presentation.",
    ],
    cautionsTitle: "Before you calculate",
    cautions: [
      "Currency selection changes formatting only and does not convert exchange rates. Principal and rate are assumed constant.",
      "The 15.4% general tax option is a simplified estimate combining 14% income tax and 1.4% local income tax.",
      "Early-termination rates, preferential rates, fees, reinvestment, and product-specific day counts are not included.",
      "Results are estimates, not legal, tax, or financial advice or a guarantee from any financial institution.",
    ],
    faqTitle: "Frequently asked questions",
    faq: [
      [
        "How does a fixed deposit differ from recurring savings?",
        "A fixed deposit places one lump sum for the full term, while recurring savings adds deposits over time.",
      ],
      [
        "How do simple and monthly compound interest differ?",
        "Simple interest applies to principal only. Monthly compounding also applies interest to accumulated interest.",
      ],
      [
        "Is the 15.4% general tax definitive?",
        "No. It is a simplified estimate; actual taxation depends on the product and depositor.",
      ],
      [
        "Does this support one-month deposits and early termination?",
        "One-month maturity is supported, but early-termination rates and product-specific day counts are not.",
      ],
    ],
    relatedTitle: "Related calculators",
    related: [
      [
        "/en/finance/compound-interest",
        "Compound Interest Calculator",
        "Estimate long-term compound growth with recurring contributions.",
      ],
      [
        "/en/finance/savings",
        "Savings Calculator",
        "Estimate maturity from recurring savings deposits.",
      ],
    ],
  },
  calculator: {
    inputEyebrow: "Inputs",
    inputTitle: "Fixed deposit settings",
    inputDescription:
      "Fields marked with an asterisk are required. Only entered fixed assumptions are calculated.",
    errorSummary: "Check the inputs. Focus moved to the first error.",
    amount: "Initial deposit",
    amountHelp: "The lump-sum principal held through maturity",
    amountPlaceholder: "Example: 10,000,000",
    period: "Deposit period",
    periodHelp: "Up to 100 years or 1,200 months",
    periodPlaceholder: "Example: 12",
    periodUnit: "Period unit",
    years: "years",
    months: "months",
    rate: "Annual interest rate",
    rateHelp: "The nominal annual rate assumed for the full period",
    ratePlaceholder: "Example: 3.5",
    method: "Interest method",
    simple: "Simple",
    compound: "Monthly compound",
    taxOption: "Tax option",
    general: "General tax 15.4%",
    taxFree: "Tax-free",
    custom: "Custom",
    taxHelp:
      "The general option is a simplified estimate combining 14% income tax and 1.4% local income tax.",
    customTax: "Custom simplified tax rate",
    customTaxHelp: "Enter the estimated rate applicable to the product.",
    customTaxPlaceholder: "Example: 15.4",
    calculate: "Calculate maturity estimate",
    reset: "Reset",
    resultsEyebrow: "Estimated results",
    resultsTitle: "Estimated fixed deposit maturity",
    maturity: "Estimated maturity amount",
    principal: "Initial deposit",
    interest: "Estimated interest",
    notice:
      "This fixed-assumption estimate does not guarantee the amount paid by a financial product.",
    details: "View details",
    emptyDetails:
      "After calculation, this table shows monthly principal, accumulated interest, and estimated balance.",
    tableCaption:
      "Monthly fixed deposit principal, accumulated interest, and estimated balance",
    tableHeadings: [
      "Period",
      "Initial deposit",
      "Accumulated interest",
      "Estimated balance",
    ],
    monthSuffix: "months",
    additional: "Additional results and assumptions",
    additionalLabels: [
      "Before-tax maturity",
      "Gross interest",
      "Estimated simplified tax",
      "After-tax interest vs. principal",
    ],
    assumptions: "Assumptions",
    complete: (amount: string) =>
      `Calculation complete. Estimated maturity amount is ${amount}.`,
    resetAnnouncement: "Inputs and calculated results have been reset.",
    won: "KRW",
  },
  chart: {
    title: "Fixed deposit growth chart",
    description:
      "Shows the flat initial principal, accumulated interest, and estimated before-tax balance by month.",
    legend: "Chart legend",
    principal: "Initial principal",
    interest: "Accumulated interest",
    balance: "Estimated maturity value",
    empty:
      "Enter values and calculate to display the fixed deposit growth chart.",
  },
  validation: {
    amount:
      "Enter a whole-number initial deposit from 10,000 to 1,000,000,000,000 in the selected display currency.",
    period: "Enter a deposit period as a whole number of at least 1.",
    periodUnit: "Select a deposit period unit.",
    rate: "Enter an annual interest rate from 0% to 100%.",
    method: "Select an interest method.",
    tax: "Select a tax option.",
    customTax: "Enter a custom tax rate from 0% to 100%.",
    maxPeriod: "Deposit period cannot exceed 1,200 months (100 years).",
    requiredAmount: "Enter the initial deposit.",
    requiredPeriod: "Enter the deposit period.",
    requiredRate: "Enter the annual interest rate.",
  },
} satisfies Widen<typeof ko>;

export const depositDictionaries = { ko, en } as const;
export function getDepositDictionary(locale: DepositLocale) {
  return depositDictionaries[locale];
}
