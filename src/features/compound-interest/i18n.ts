export const compoundLocales = ["ko", "en"] as const;
export type CompoundLocale = (typeof compoundLocales)[number];

export function isCompoundLocale(value: string): value is CompoundLocale {
  return compoundLocales.includes(value as CompoundLocale);
}

const ko = {
  page: {
    title: "복리 계산기",
    metaTitle: "복리 계산기 - 적립식 투자와 예상 이자",
    metaDescription:
      "초기 투자금과 정기 납입액, 기간, 연이율을 입력해 복리로 늘어나는 예상 자산과 이자를 계산해 보세요.",
    description:
      "복리의 미래를 경험해보세요. 시간이 지날수록 자산이 기하급수적으로 성장합니다.",
    home: "홈",
    breadcrumbLabel: "현재 위치",
    method: "계산 방법",
    methodParagraphs: [
      "초기 투자금은 선택한 복리 주기마다 이자가 붙는다고 가정합니다. 정기 납입액은 월 또는 연 단위로, 선택한 납입 시점에 추가됩니다.",
      "미래가치 = 초기 투자금의 복리 가치 + 정기 납입금의 복리 가치",
      "세금 옵션은 최종 시점의 양수 이자에만 한 번 적용합니다. 물가상승률 옵션은 세후 예상 잔액을 현재가치로 환산하기 위한 단순 추정입니다.",
    ],
    cautions: "계산 전 확인하세요",
    cautionItems: [
      "첫 버전의 투자 기간은 1년 단위로만 입력할 수 있습니다.",
      "이율과 납입액은 전체 기간 동안 변하지 않는다고 가정합니다.",
      "수수료, 중도 인출, 시장 변동, 금융상품별 과세 규정은 반영하지 않습니다.",
      "예상 자산 배수는 납입 원금 대비 추정 자산의 배수이며 수익률이 아닙니다.",
    ],
    faqTitle: "자주 묻는 질문",
    faq: [
      [
        "복리란 무엇인가요?",
        "원금뿐 아니라 이전 기간에 쌓인 이자에도 다시 이자가 붙는 계산 방식입니다. 같은 수익률이라도 기간이 길수록 단리와의 차이가 커질 수 있습니다.",
      ],
      [
        "월 납입과 연 납입은 어떻게 다른가요?",
        "월 납입은 매달, 연 납입은 매년 같은 금액을 납입한다고 가정합니다. 납입 시점과 횟수가 달라 예상 잔액도 달라질 수 있습니다.",
      ],
      [
        "기간 초 납입과 기간 말 납입은 어떻게 다른가요?",
        "기간 초 납입은 각 납입금이 기간 말 납입보다 한 번 더 이자가 붙는다고 가정합니다. 이율과 납입액이 양수라면 기간 초 납입의 예상 잔액이 더 큽니다.",
      ],
      [
        "복리 주기는 결과에 어떤 영향을 주나요?",
        "같은 명목 연이율이라면 일반적으로 이자를 계산하는 횟수가 많을수록 예상 잔액이 커집니다. 이 계산기는 연, 반기, 분기, 월, 일 복리를 지원합니다.",
      ],
      [
        "세금과 물가상승률은 어떻게 적용되나요?",
        "선택한 기간 끝의 양수 이자에 간이 세율을 한 번 적용한 뒤, 해당 세후 잔액을 물가상승률로 할인합니다. 실제 세법이나 금융상품별 과세 방식과는 다를 수 있습니다.",
      ],
      [
        "실제 결과가 계산값과 달라질 수 있는 이유는 무엇인가요?",
        "실제 이율, 납입 시점, 수수료, 세법, 물가와 시장 상황은 시간에 따라 달라질 수 있습니다. 계산기는 입력 조건이 고정된 단순 시나리오이며 예측이나 보장이 아닙니다.",
      ],
    ],
    related: "관련 계산기",
    relatedDescription:
      "관련 금융 계산기는 검증을 마친 뒤 순차적으로 제공할 예정입니다.",
    currencyNotice: "통화 선택은 표시 형식만 바꾸며 환율을 변환하지 않습니다.",
  },
  calculator: {
    inputTitle: "입력 정보",
    inputDescription: "미래의 자산을 계산하기 위한 정보를 입력하세요.",
    errorSummary: "입력값을 확인해 주세요. 첫 번째 오류 항목으로 이동했습니다.",
    initialPrincipal: "초기 투자금",
    initialHelp: "처음 투자하거나 저축하는 금액",
    initialPlaceholder: "예: 10,000,000",
    contribution: "정기 납입액",
    contributionHelp: "선택한 주기마다 추가하는 고정 금액",
    contributionPlaceholder: "예: 500,000",
    contributionFrequency: "납입 주기",
    monthly: "매월",
    yearly: "매년",
    duration: "투자 기간",
    yearsUnit: "년",
    durationHelp: "첫 버전은 1~100년의 정수만 지원합니다.",
    durationPlaceholder: "예: 10",
    annualRate: "연 이자율",
    annualRateHelp: "기간 내내 동일하다고 가정하는 명목 연 이자율",
    annualRatePlaceholder: "예: 5",
    compoundingFrequency: "복리 주기",
    semiannually: "반기",
    quarterly: "분기",
    daily: "매일(연 365회)",
    timing: "납입 시점",
    end: "기간 말",
    beginning: "기간 초",
    calculate: "예상 결과 계산하기",
    reset: "초기화",
    advanced: "고급 설정(선택): 물가·간이 세금",
    entered: " (입력됨)",
    advancedHelp:
      "기본값은 적용 안 함입니다. 실제 물가와 세법을 예측하지 않습니다.",
    inflation: "연 물가상승률",
    inflationHelp: "비워 두면 현재가치 조정을 하지 않습니다.",
    inflationPlaceholder: "예: 2.5",
    tax: "수익 간이 세율",
    taxHelp: "비워 두면 세금을 적용하지 않습니다. 법정 세율이 아닙니다.",
    taxPlaceholder: "예: 15.4",
    results: "예상 결과",
    assets: "예상 자산",
    principal: "총 납입 금액",
    gain: "총 이자 금액",
    details: "상세 내역 보기",
    tableCaption: "연도별 복리 계산 상세 내역",
    tableHeadings: ["연도", "연말 자산", "연간 납입", "연간 이자", "누적 원금"],
    yearSuffix: "년",
    emptyDetails:
      "계산 후 연도별 원금, 이자, 예상 잔액을 표로 확인할 수 있습니다.",
    additional: "추가 결과와 적용 가정",
    additionalLabels: [
      "세전 예상 잔액",
      "예상 세전 이자",
      "예상 간이 세금",
      "물가 반영 현재가치",
    ],
    multiplier: "예상 자산 배수 (납입 원금 대비)",
    assumptions: "적용 가정",
    timingPrefix: "납입 시점:",
    inflationApplied: "물가",
    inflationNone: "물가 미반영",
    taxApplied: "간이 세율",
    taxNone: "세금 미반영",
    complete: (amount: string) =>
      `계산이 완료되었습니다. 예상 최종 금액은 ${amount}입니다.`,
    resetAnnouncement: "입력값과 계산 결과를 초기화했습니다.",
    won: "원",
  },
  chart: {
    seriesPrincipal: "누적 납입 원금",
    seriesInterest: "이자 금액",
    seriesAssets: "예상 총자산",
    title: "자산 성장 그래프",
    description:
      "누적 납입 원금과 예상 총자산의 간격으로 복리 수익이 커지는 흐름을 보여 줍니다. 정확한 금액은 아래 연도별 상세 내역에서 확인할 수 있습니다.",
    legend: "차트 범례",
    legendAssets: "예상 자산",
    legendPrincipal: "납입 금액",
    legendInterest: "이자 금액",
    tooltipPrincipal: "누적 납입 원금",
    tooltipAssets: "예상 총자산",
    tooltipInterest: "누적 이자",
    empty: "값을 입력하고 계산하면 자산 성장 그래프가 표시됩니다.",
  },
  validation: {
    moneyInvalid: (label: string) =>
      `${label}을(를) 정수 금액으로 입력해 주세요.`,
    moneyRange: (label: string) =>
      `${label}은(는) 0 이상 허용 범위 이하여야 합니다.`,
    percentInvalid: (label: string) =>
      `${label}을(를) 0%에서 100% 사이의 숫자로 입력해 주세요.`,
    percentRange: (label: string) =>
      `${label}은(는) 0%에서 100% 사이여야 합니다.`,
    duration: "투자 기간은 1년에서 100년 사이의 정수여야 합니다.",
    contributionFrequency: "지원하는 납입 주기를 선택해 주세요.",
    compoundingFrequency: "지원하는 복리 주기를 선택해 주세요.",
    timing: "납입 시점을 선택해 주세요.",
    positiveMoney: "초기 원금과 정기 납입액 중 하나는 0보다 커야 합니다.",
    requiredPrincipal: "초기 원금을 입력해 주세요.",
    requiredContribution: "정기 납입액을 입력해 주세요.",
    requiredDuration: "투자 기간을 입력해 주세요.",
    requiredRate: "연 이자율을 입력해 주세요.",
    principalLabel: "초기 원금",
    contributionLabel: "정기 납입액",
    rateLabel: "연 이자율",
    inflationLabel: "물가상승률",
    taxLabel: "간이 세율",
  },
};

type Widen<T> = T extends string
  ? string
  : T extends (...args: infer Args) => infer Result
    ? (...args: Args) => Result
    : T extends readonly (infer Item)[]
      ? readonly Widen<Item>[]
      : { [Key in keyof T]: Widen<T[Key]> };

const en = {
  page: {
    title: "Compound Interest Calculator",
    metaTitle: "Compound Interest Calculator - Recurring Investment Growth",
    metaDescription:
      "Estimate compound growth from an initial investment, recurring contributions, investment period, and annual interest rate in your selected display currency.",
    description:
      "See how an initial investment and recurring contributions may grow through compounding over time.",
    home: "Home",
    breadcrumbLabel: "Breadcrumb",
    method: "How the calculation works",
    methodParagraphs: [
      "The initial investment earns interest at the selected compounding frequency. Recurring contributions are added monthly or yearly at the selected timing.",
      "Future value = compounded initial investment + compounded recurring contributions",
      "The optional simplified tax is applied once to positive interest at the end of the period. The inflation option discounts the after-tax balance to an estimated present value.",
    ],
    cautions: "Before you calculate",
    cautionItems: [
      "The investment period accepts whole years from 1 to 100.",
      "The rate and contribution amount are assumed to stay unchanged for the full period.",
      "Fees, withdrawals, market volatility, and product-specific tax rules are not included.",
      "The estimated asset multiple compares projected assets with contributed principal; it is not a rate of return.",
    ],
    faqTitle: "Frequently asked questions",
    faq: [
      [
        "What is compound interest?",
        "Compound interest earns interest on both principal and previously accumulated interest. Over longer periods, its result can differ substantially from simple interest at the same rate.",
      ],
      [
        "How do monthly and yearly contributions differ?",
        "Monthly contributions are added every month, while yearly contributions are added once a year. Different timing and frequency can produce different projected balances.",
      ],
      [
        "What is the difference between beginning and end contributions?",
        "A beginning-of-period contribution receives one more compounding period than an end-of-period contribution. With positive rates and contributions, beginning contributions produce a higher projected balance.",
      ],
      [
        "How does compounding frequency affect the result?",
        "At the same nominal annual rate, more frequent compounding generally produces a higher projected balance. This calculator supports annual, semiannual, quarterly, monthly, and daily compounding.",
      ],
      [
        "How are tax and inflation applied?",
        "The simplified tax rate is applied once to positive interest at the end of the selected period. The after-tax balance is then discounted by the inflation rate. Actual tax rules and financial products may differ.",
      ],
      [
        "Why can actual results differ?",
        "Rates, contribution timing, fees, tax law, inflation, and market conditions can change. This calculator is a fixed-input scenario, not a forecast or guarantee.",
      ],
    ],
    related: "Related calculators",
    relatedDescription:
      "Other financial calculators are available in Korean while their localized versions are prepared.",
    currencyNotice:
      "Currency selection changes formatting only; it does not convert exchange rates.",
  },
  calculator: {
    inputTitle: "Investment settings",
    inputDescription: "Enter the assumptions used to estimate future assets.",
    errorSummary: "Check the inputs. Focus moved to the first error.",
    initialPrincipal: "Initial investment",
    initialHelp: "The amount invested or saved at the start",
    initialPlaceholder: "Example: 10,000,000",
    contribution: "Recurring contribution",
    contributionHelp: "A fixed amount added at the selected frequency",
    contributionPlaceholder: "Example: 500,000",
    contributionFrequency: "Contribution frequency",
    monthly: "Monthly",
    yearly: "Yearly",
    duration: "Investment period",
    yearsUnit: "years",
    durationHelp: "Enter a whole number from 1 to 100 years.",
    durationPlaceholder: "Example: 10",
    annualRate: "Annual interest rate",
    annualRateHelp: "The nominal annual rate assumed to remain unchanged",
    annualRatePlaceholder: "Example: 5",
    compoundingFrequency: "Compounding frequency",
    semiannually: "Semiannually",
    quarterly: "Quarterly",
    daily: "Daily (365 times a year)",
    timing: "Contribution timing",
    end: "End of period",
    beginning: "Beginning of period",
    calculate: "Calculate estimated results",
    reset: "Reset",
    advanced: "Optional settings: inflation and simplified tax",
    entered: " (entered)",
    advancedHelp:
      "Blank values are not applied. These inputs do not predict inflation or tax law.",
    inflation: "Annual inflation rate",
    inflationHelp: "Leave blank to skip the present-value adjustment.",
    inflationPlaceholder: "Example: 2.5",
    tax: "Simplified tax rate on gains",
    taxHelp: "Leave blank to apply no tax. This is not a statutory tax rate.",
    taxPlaceholder: "Example: 15.4",
    results: "Estimated results",
    assets: "Estimated assets",
    principal: "Total contributed principal",
    gain: "Estimated net gain",
    details: "View details",
    tableCaption: "Year-by-year compound interest details",
    tableHeadings: [
      "Year",
      "Year-end assets",
      "Annual contributions",
      "Annual interest",
      "Cumulative principal",
    ],
    yearSuffix: "",
    emptyDetails:
      "After calculation, this table shows yearly principal, interest, and projected balances.",
    additional: "Additional results and assumptions",
    additionalLabels: [
      "Estimated pre-tax balance",
      "Estimated gross interest",
      "Estimated simplified tax",
      "Inflation-adjusted present value",
    ],
    multiplier: "Estimated asset multiple (vs. contributed principal)",
    assumptions: "Assumptions",
    timingPrefix: "Contribution timing:",
    inflationApplied: "Inflation",
    inflationNone: "Inflation not applied",
    taxApplied: "Simplified tax rate",
    taxNone: "Tax not applied",
    complete: (amount: string) =>
      `Calculation complete. Estimated final assets are ${amount}.`,
    resetAnnouncement: "Inputs and calculated results have been reset.",
    won: "KRW",
  },
  chart: {
    seriesPrincipal: "Cumulative contributed principal",
    seriesInterest: "Interest",
    seriesAssets: "Estimated total assets",
    title: "Asset growth chart",
    description:
      "The widening gap between contributed principal and estimated total assets shows how compound growth develops. Use the year-by-year table below for exact amounts.",
    legend: "Chart legend",
    legendAssets: "Estimated assets",
    legendPrincipal: "Contributed principal",
    legendInterest: "Interest",
    tooltipPrincipal: "Cumulative contributed principal",
    tooltipAssets: "Estimated total assets",
    tooltipInterest: "Cumulative interest",
    empty: "Enter values and calculate to display the asset growth chart.",
  },
  validation: {
    moneyInvalid: (label: string) => `Enter ${label} as a whole-number amount.`,
    moneyRange: (label: string) =>
      `${label} must be zero or more and within the allowed range.`,
    percentInvalid: (label: string) =>
      `Enter ${label} as a number from 0% to 100%.`,
    percentRange: (label: string) => `${label} must be between 0% and 100%.`,
    duration: "Investment period must be a whole number from 1 to 100 years.",
    contributionFrequency: "Select a supported contribution frequency.",
    compoundingFrequency: "Select a supported compounding frequency.",
    timing: "Select a contribution timing.",
    positiveMoney:
      "Either the initial investment or recurring contribution must be greater than zero.",
    requiredPrincipal: "Enter the initial investment.",
    requiredContribution: "Enter the recurring contribution.",
    requiredDuration: "Enter the investment period.",
    requiredRate: "Enter the annual interest rate.",
    principalLabel: "initial investment",
    contributionLabel: "recurring contribution",
    rateLabel: "annual interest rate",
    inflationLabel: "inflation rate",
    taxLabel: "simplified tax rate",
  },
} satisfies Widen<typeof ko>;

export const compoundDictionaries = { ko, en } as const;

export function getCompoundDictionary(locale: CompoundLocale) {
  return compoundDictionaries[locale];
}
