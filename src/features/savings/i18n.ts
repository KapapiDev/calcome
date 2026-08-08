import type { CompoundLocale } from "@/features/compound-interest/i18n";

export type SavingsLocale = CompoundLocale;

const ko = {
  page: {
    title: "적금 계산기",
    metaTitle: "적금 계산기 - 단리·월복리 세후 만기액",
    metaDescription:
      "정기 납입 적금의 단리·월복리 이자, 간이 세금과 세전·세후 만기액을 계산하고 월별 성장 내역을 확인하세요.",
    description:
      "정기적으로 같은 금액을 저축할 때 납입 원금과 이자가 만기액을 만드는 과정을 확인하세요.",
    home: "홈",
    calculators: "계산기",
    breadcrumb: "현재 위치",
    category: "금융 계산기",
    intro:
      "결과는 고정 금리와 규칙적인 납입을 가정한 추정치입니다. 우대금리, 중도해지, 실제 납입일과 상품별 계산 규칙은 반영하지 않습니다.",
    methodTitle: "계산 방법",
    method: [
      "단리는 누적 납입 원금에만 매월 이자를 계산하고, 월복리는 이미 발생한 이자에도 다음 달 이자를 계산합니다.",
      "기간 초 납입은 해당 월 이자를 얻고, 기간 말 납입은 월 이자 계산 뒤에 반영됩니다.",
      "세금은 만기 시점의 세전 이자에 선택한 간이 세율을 한 번 적용합니다. 계산 중에는 반올림하지 않습니다.",
    ],
    cautionsTitle: "계산 전 확인하세요",
    cautions: [
      "통화 선택은 표시 형식만 바꾸며 환율을 변환하지 않습니다. 금리와 납입액은 전체 기간 동안 일정하다고 가정합니다.",
      "일반과세 15.4%는 이자소득세 14%와 지방소득세 1.4%를 합친 간이 추정입니다.",
      "중도해지이율, 우대금리 조건, 수수료, 자유 납입과 상품별 일수 계산은 포함하지 않습니다.",
      "결과는 법률·세무·투자 조언이나 특정 금융상품의 수령액 보장이 아닙니다.",
    ],
    faqTitle: "자주 묻는 질문",
    faq: [
      [
        "적금 금리는 모든 납입금에 1년 내내 적용되나요?",
        "아닙니다. 각 납입금은 납입 시점부터 만기까지 남은 기간만큼 이자를 얻습니다.",
      ],
      [
        "단리와 월복리는 어떻게 다른가요?",
        "단리는 원금에만 이자가 붙고, 월복리는 이미 쌓인 이자에도 다음 달 이자가 붙습니다.",
      ],
      [
        "일반과세 15.4%는 확정 세금인가요?",
        "아닙니다. 일반적인 원천징수 구조를 단순화한 추정이며 상품과 가입자의 과세 조건에 따라 달라질 수 있습니다.",
      ],
      [
        "자유적금이나 중도해지도 계산하나요?",
        "지원하지 않습니다. 같은 금액을 정해진 주기에 납입하고 만기까지 유지하는 시나리오만 계산합니다.",
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
        "/ko/finance/fixed-deposit",
        "예금 계산기",
        "목돈 예치의 세전·세후 만기액을 계산합니다.",
      ],
    ],
  },
  calculator: {
    inputEyebrow: "입력",
    inputTitle: "적금 조건 설정",
    inputDescription:
      "별표(*) 항목은 필수이며 입력한 고정 조건만 계산에 사용합니다.",
    errorSummary: "입력값을 확인해 주세요. 첫 번째 오류 항목으로 이동했습니다.",
    regularDeposit: "정기 납입액",
    regularDepositHelp: "선택한 주기마다 넣는 고정 금액",
    regularDepositPlaceholder: "예: 100,000",
    frequency: "납입 주기",
    monthly: "매월",
    yearly: "매년",
    period: "저축 기간",
    periodHelp: "최대 100년 또는 1,200개월",
    periodPlaceholder: "예: 12",
    periodUnit: "기간 단위",
    years: "년",
    months: "개월",
    annualRate: "연 이자율",
    annualRateHelp: "전체 기간에 동일하게 적용할 명목 연이율",
    annualRatePlaceholder: "예: 3.5",
    interestMethod: "이자 방식",
    simple: "단리",
    compound: "월복리",
    timing: "납입 시점",
    end: "기간 말",
    beginning: "기간 초",
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
    resultsTitle: "적금 만기 예상 결과",
    maturity: "예상 만기 수령액",
    principal: "총 납입 원금",
    interest: "예상 이자",
    resultNotice:
      "고정 조건을 가정한 추정치이며 특정 금융상품의 실제 수령액을 보장하지 않습니다.",
    details: "상세 내역 보기",
    emptyDetails:
      "계산 후 월별 납입 원금, 이자와 예상 잔액을 표로 확인할 수 있습니다.",
    tableCaption: "월별 적금 납입액, 이자와 예상 잔액",
    tableHeadings: [
      "기간",
      "이번 납입액",
      "누적 납입 원금",
      "이번 이자",
      "누적 이자",
      "예상 잔액",
    ],
    monthSuffix: "개월",
    additional: "추가 결과와 적용 가정",
    additionalLabels: [
      "세전 만기액",
      "세전 이자",
      "예상 간이 세금",
      "납입 원금 대비 세후 이자",
    ],
    assumptions: "적용 가정",
    complete: (amount: string) =>
      `계산이 완료되었습니다. 예상 만기 수령액은 ${amount}입니다.`,
    resetAnnouncement: "입력값과 계산 결과를 초기화했습니다.",
    won: "원",
  },
  chart: {
    title: "적금 성장 그래프",
    description:
      "월별 누적 납입 원금, 누적 이자와 예상 잔액의 변화를 보여 줍니다.",
    legend: "차트 범례",
    principal: "누적 납입 원금",
    interest: "누적 이자",
    balance: "예상 잔액",
    empty: "값을 입력하고 계산하면 적금 성장 그래프가 표시됩니다.",
  },
  validation: {
    deposit:
      "정기 납입액은 1천원 이상 10억원 이하의 원 단위 금액으로 입력해 주세요.",
    period: "저축 기간은 1 이상의 정수로 입력해 주세요.",
    periodUnit: "저축 기간 단위를 선택해 주세요.",
    rate: "연 이자율은 0% 이상 100% 이하로 입력해 주세요.",
    frequency: "납입 주기를 선택해 주세요.",
    method: "이자 방식을 선택해 주세요.",
    timing: "납입 시점을 선택해 주세요.",
    tax: "세금 옵션을 선택해 주세요.",
    customTax: "사용자 지정 세율은 0% 이상 100% 이하로 입력해 주세요.",
    maxPeriod: "저축 기간은 최대 1,200개월(100년)까지 입력할 수 있습니다.",
    yearlyPeriod:
      "연 납입은 12개월 이상의 완전한 연 단위 기간만 사용할 수 있습니다.",
    requiredDeposit: "정기 납입액을 입력해 주세요.",
    requiredPeriod: "저축 기간을 입력해 주세요.",
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
    title: "Savings Calculator",
    metaTitle: "Savings Calculator - Recurring Deposit Maturity Estimate",
    metaDescription:
      "Estimate principal, interest, simplified tax, and maturity value for recurring savings with simple or monthly compound interest.",
    description:
      "See how recurring deposits and interest build an estimated maturity value over time.",
    home: "Home",
    calculators: "Calculators",
    breadcrumb: "Breadcrumb",
    category: "Financial calculator",
    intro:
      "Results assume a fixed rate and regular deposits. Preferential rates, early termination, actual deposit dates, and product-specific rules are not included.",
    methodTitle: "How the calculation works",
    method: [
      "Simple interest is calculated on contributed principal. Monthly compound interest also earns interest on previously accumulated interest.",
      "Beginning deposits receive interest for that month; end deposits are added after the monthly interest calculation.",
      "The selected simplified tax rate is applied once to gross interest at maturity. No rounding occurs before presentation.",
    ],
    cautionsTitle: "Before you calculate",
    cautions: [
      "Currency selection changes formatting only and does not convert exchange rates. The rate and deposit amount are assumed constant.",
      "The 15.4% general tax option is a simplified estimate combining 14% income tax and 1.4% local income tax.",
      "Early-termination rates, preferential-rate conditions, fees, flexible deposits, and product-specific day counts are not included.",
      "Results are estimates, not legal, tax, or financial advice or a guarantee from any financial institution.",
    ],
    faqTitle: "Frequently asked questions",
    faq: [
      [
        "Does every deposit earn interest for a full year?",
        "No. Each deposit earns interest only from its deposit timing until maturity.",
      ],
      [
        "How do simple and monthly compound interest differ?",
        "Simple interest applies to principal only. Monthly compounding also applies interest to accumulated interest.",
      ],
      [
        "Is the 15.4% general tax amount definitive?",
        "No. It is a simplified estimate; actual taxation depends on the product and saver.",
      ],
      [
        "Does this support flexible deposits or early termination?",
        "No. It models equal deposits on a fixed schedule held through maturity.",
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
        "/en/finance/fixed-deposit",
        "Deposit Calculator",
        "Estimate before- and after-tax maturity for a lump-sum deposit.",
      ],
    ],
  },
  calculator: {
    inputEyebrow: "Inputs",
    inputTitle: "Savings settings",
    inputDescription:
      "Fields marked with an asterisk are required. Only entered fixed assumptions are calculated.",
    errorSummary: "Check the inputs. Focus moved to the first error.",
    regularDeposit: "Recurring deposit",
    regularDepositHelp: "The fixed amount added at each selected interval",
    regularDepositPlaceholder: "Example: 100,000",
    frequency: "Deposit frequency",
    monthly: "Monthly",
    yearly: "Yearly",
    period: "Savings period",
    periodHelp: "Up to 100 years or 1,200 months",
    periodPlaceholder: "Example: 12",
    periodUnit: "Period unit",
    years: "years",
    months: "months",
    annualRate: "Annual interest rate",
    annualRateHelp: "The nominal annual rate assumed for the full period",
    annualRatePlaceholder: "Example: 3.5",
    interestMethod: "Interest method",
    simple: "Simple",
    compound: "Monthly compound",
    timing: "Deposit timing",
    end: "End of period",
    beginning: "Beginning of period",
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
    resultsTitle: "Estimated savings maturity",
    maturity: "Estimated maturity amount",
    principal: "Total contributions",
    interest: "Estimated interest",
    resultNotice:
      "This fixed-assumption estimate does not guarantee the amount paid by a financial product.",
    details: "View details",
    emptyDetails:
      "After calculation, this table shows monthly contributions, interest, and estimated balances.",
    tableCaption:
      "Monthly savings contributions, interest, and estimated balances",
    tableHeadings: [
      "Period",
      "Period contribution",
      "Cumulative contributions",
      "Period interest",
      "Cumulative interest",
      "Estimated balance",
    ],
    monthSuffix: "months",
    additional: "Additional results and assumptions",
    additionalLabels: [
      "Before-tax maturity",
      "Gross interest",
      "Estimated simplified tax",
      "After-tax interest vs. contributions",
    ],
    assumptions: "Assumptions",
    complete: (amount: string) =>
      `Calculation complete. Estimated maturity amount is ${amount}.`,
    resetAnnouncement: "Inputs and calculated results have been reset.",
    won: "KRW",
  },
  chart: {
    title: "Savings growth chart",
    description:
      "Shows monthly cumulative contributions, accumulated interest, and estimated balance.",
    legend: "Chart legend",
    principal: "Cumulative contributions",
    interest: "Accumulated interest",
    balance: "Estimated balance",
    empty: "Enter values and calculate to display the savings growth chart.",
  },
  validation: {
    deposit:
      "Enter a whole-number recurring deposit from 1,000 to 1,000,000,000 in the selected display currency.",
    period: "Enter a savings period as a whole number of at least 1.",
    periodUnit: "Select a savings period unit.",
    rate: "Enter an annual interest rate from 0% to 100%.",
    frequency: "Select a deposit frequency.",
    method: "Select an interest method.",
    timing: "Select a deposit timing.",
    tax: "Select a tax option.",
    customTax: "Enter a custom tax rate from 0% to 100%.",
    maxPeriod: "Savings period cannot exceed 1,200 months (100 years).",
    yearlyPeriod:
      "Yearly deposits require a complete period of at least 12 months.",
    requiredDeposit: "Enter the recurring deposit.",
    requiredPeriod: "Enter the savings period.",
    requiredRate: "Enter the annual interest rate.",
  },
} satisfies Widen<typeof ko>;

export const savingsDictionaries = { ko, en } as const;

export function getSavingsDictionary(locale: SavingsLocale) {
  return savingsDictionaries[locale];
}
