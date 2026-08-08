import type { CompoundLocale } from "@/features/compound-interest/i18n";

export type LoanLocale = CompoundLocale;

const ko = {
  page: {
    title: "대출 계산기",
    metaTitle: "대출 계산기 - 원리금균등·원금균등 비교",
    metaDescription:
      "대출 금액, 금리와 기간을 입력해 원리금균등·원금균등·만기일시상환의 월 납부액, 총 이자와 상환 일정을 계산하세요.",
    description:
      "대표 상환 방식을 같은 조건에서 비교하고 매월 원금과 이자가 어떻게 달라지는지 확인하세요.",
    home: "홈",
    calculators: "계산기",
    breadcrumb: "현재 위치",
    category: "금융 계산기",
    intro:
      "고정 금리와 매월 말 상환을 가정한 추정치이며 금융기관의 실제 상환표나 대출 제안이 아닙니다.",
    explanationTitle: "상환 방식 이해하기",
    explanation: [
      "원리금균등은 원금과 이자를 합친 월 납부액이 거의 일정해 월 예산을 계획하기 쉽습니다.",
      "원금균등은 매월 같은 원금을 갚아 첫 납부액이 크지만 잔액과 이자가 빠르게 줄어듭니다.",
      "만기일시상환은 기간 중 이자만 내고 마지막 회차에 원금 전액을 상환합니다.",
    ],
    cautionsTitle: "계산 전 확인하세요",
    cautions: [
      "금리와 상환 조건은 전체 기간 동안 변하지 않는다고 가정합니다.",
      "중도상환수수료, 보증료, 인지세, 취급 비용, 연체이자와 거치 기간은 포함하지 않습니다.",
      "실제 납부일, 일수 계산과 금융기관의 원 단위 조정에 따라 상환표가 달라질 수 있습니다.",
      "결과는 금융 조언이나 특정 대출 계약의 비용 보장이 아닙니다.",
    ],
    faqTitle: "자주 묻는 질문",
    faq: [
      [
        "원리금균등과 원금균등 중 무엇이 유리한가요?",
        "원리금균등은 월 납부액이 일정하고, 원금균등은 초기 부담이 크지만 같은 조건에서 총 이자가 더 적습니다.",
      ],
      [
        "만기일시상환의 월 납부액은 무엇인가요?",
        "만기 전에는 월 이자이며 마지막 회차에는 이자와 원금 전액을 함께 상환합니다.",
      ],
      [
        "중도상환수수료도 포함되나요?",
        "포함되지 않습니다. 수수료와 금리 변동, 거치 기간은 금융기관의 조건을 별도로 확인해야 합니다.",
      ],
      [
        "표의 금액과 총액이 몇 원 다를 수 있나요?",
        "내부 계산은 반올림하지 않고 표시에만 원 단위 반올림을 적용하므로 표시값을 더하면 소액 차이가 날 수 있습니다.",
      ],
    ],
    relatedTitle: "관련 계산기",
    related: [
      ["/ko/finance/compound-interest", "복리 계산기"],
      ["/ko/finance/savings", "적금 계산기"],
      ["/ko/finance/fixed-deposit", "정기예금 계산기"],
    ],
  },
  calculator: {
    inputEyebrow: "입력",
    inputTitle: "대출 조건 설정",
    inputDescription:
      "대출 원금, 고정 연이율과 기간을 기준으로 상환 비용을 계산합니다.",
    errorSummary: "입력값을 확인해 주세요. 첫 번째 오류 항목으로 이동했습니다.",
    amount: "대출 금액",
    amountHelp: "실제로 빌릴 원금",
    amountPlaceholder: "예: 100,000,000",
    rate: "연 이자율",
    rateHelp: "전체 기간에 동일하게 적용할 명목 연이율",
    ratePlaceholder: "예: 4.5",
    period: "대출 기간",
    periodHelp: "최대 100년 또는 1,200개월",
    periodPlaceholder: "예: 30",
    periodUnit: "기간 단위",
    years: "년",
    months: "개월",
    repaymentType: "상환 방식",
    equalPayment: "원리금균등",
    equalPrincipal: "원금균등",
    bullet: "만기일시상환",
    calculate: "상환 결과 계산하기",
    reset: "초기화",
    won: "원",
    resultsEyebrow: "예상 결과",
    resultsTitle: "상환 계산 결과",
    monthlyPayment: "월 납부액",
    firstPayment: "첫 달 납부액",
    bulletPayment: "매월 이자 납부액",
    totalRepayment: "총 상환액",
    totalInterest: "총 이자",
    notice: "금리와 상환 조건이 변하지 않는다는 가정의 원 단위 추정치입니다.",
    comparisonTitle: "상환 방식 비교",
    comparisonDescription:
      "같은 대출 조건에서 원리금균등과 원금균등의 납부 부담과 총 이자를 비교합니다.",
    first: "첫 납부액",
    last: "마지막 납부액",
    cheaper: "총 이자가 더 적음",
    details: "상환 일정 보기",
    emptyDetails:
      "계산 후 선택한 방식의 월별 원금, 이자, 납부액과 남은 잔액을 확인할 수 있습니다.",
    tableCaption: "월별 대출 원금과 이자 상환 일정",
    tableHeadings: ["회차", "납부 시점", "원금", "이자", "납부액", "남은 원금"],
    paymentIndex: (month: number) => `${month}개월`,
    additional: "추가 정보와 적용 가정",
    additionalLabels: ["대출 원금", "총 이자", "상환 기간", "실질 상환 요약"],
    complete: (amount: string) =>
      `계산이 완료되었습니다. 첫 달 납부액은 ${amount}입니다.`,
    resetAnnouncement: "입력값과 계산 결과를 초기화했습니다.",
    summaries: {
      equalPayment: (months: number) =>
        `${months}개월 동안 월 납부액이 거의 일정합니다.`,
      equalPrincipal:
        "첫 달 납부액이 가장 크고 잔액 감소에 따라 매월 납부액이 줄어듭니다.",
      bullet: (months: number) =>
        `${months - 1}개월 동안 이자만 내고 마지막 회차에 원금 전액을 상환합니다.`,
    },
  },
  validation: {
    amount:
      "대출 금액은 1만원 이상 1조원 이하의 원 단위 금액으로 입력해 주세요.",
    rate: "연 이자율은 0% 이상 100% 이하로 입력해 주세요.",
    period: "대출 기간은 1 이상의 정수로 입력해 주세요.",
    periodUnit: "대출 기간 단위를 선택해 주세요.",
    repaymentType: "상환 방식을 선택해 주세요.",
    maxPeriod: "대출 기간은 최대 1,200개월(100년)까지 입력할 수 있습니다.",
    requiredAmount: "대출 금액을 입력해 주세요.",
    requiredRate: "연 이자율을 입력해 주세요.",
    requiredPeriod: "대출 기간을 입력해 주세요.",
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
    title: "Loan Calculator",
    metaTitle: "Loan Calculator - Compare Repayment Methods",
    metaDescription:
      "Calculate monthly payments, total interest, and amortization schedules for equal-payment, equal-principal, and bullet loans.",
    description:
      "Compare common repayment methods under the same loan assumptions and review how principal and interest change each month.",
    home: "Home",
    calculators: "Calculators",
    breadcrumb: "Breadcrumb",
    category: "Financial calculator",
    intro:
      "Results assume a fixed rate and end-of-month payments. They are estimates, not a lender's official amortization schedule or loan offer.",
    explanationTitle: "Understanding repayment methods",
    explanation: [
      "Equal payment keeps the combined monthly principal and interest payment nearly constant.",
      "Equal principal repays the same principal each month, producing a higher first payment but faster interest reduction.",
      "Bullet repayment pays interest during the term and repays all principal in the final installment.",
    ],
    cautionsTitle: "Before you calculate",
    cautions: [
      "The rate and repayment terms are assumed to remain unchanged.",
      "Prepayment penalties, guarantee fees, taxes, origination costs, late interest, and grace periods are not included.",
      "Actual payment dates, day counts, and lender rounding can change an official schedule.",
      "Results are estimates, not financial advice or a guarantee of contract costs.",
    ],
    faqTitle: "Frequently asked questions",
    faq: [
      [
        "Which is better: equal payment or equal principal?",
        "Equal payment offers steadier monthly budgeting. Equal principal starts higher but produces less total interest under the same terms.",
      ],
      [
        "What does the monthly bullet payment mean?",
        "It is monthly interest before maturity; the final installment also includes the full principal.",
      ],
      [
        "Are prepayment penalties included?",
        "No. Fees, variable rates, and grace periods must be checked with the lender.",
      ],
      [
        "Why can displayed rows differ slightly from totals?",
        "Internal values are not rounded, while displayed amounts are rounded to whole currency units.",
      ],
    ],
    relatedTitle: "Related calculators",
    related: [
      ["/en/finance/compound-interest", "Compound Interest Calculator"],
      ["/en/finance/savings", "Savings Calculator"],
      ["/en/finance/fixed-deposit", "Fixed Deposit Calculator"],
    ],
  },
  calculator: {
    inputEyebrow: "Inputs",
    inputTitle: "Loan settings",
    inputDescription:
      "Estimate repayment costs from principal, a fixed annual rate, and term.",
    errorSummary: "Check the inputs. Focus moved to the first error.",
    amount: "Loan amount",
    amountHelp: "The principal borrowed",
    amountPlaceholder: "Example: 100,000,000",
    rate: "Annual interest rate",
    rateHelp: "The nominal annual rate assumed for the full term",
    ratePlaceholder: "Example: 4.5",
    period: "Loan term",
    periodHelp: "Up to 100 years or 1,200 months",
    periodPlaceholder: "Example: 30",
    periodUnit: "Term unit",
    years: "years",
    months: "months",
    repaymentType: "Repayment method",
    equalPayment: "Equal payment",
    equalPrincipal: "Equal principal",
    bullet: "Bullet repayment",
    calculate: "Calculate repayments",
    reset: "Reset",
    won: "KRW",
    resultsEyebrow: "Estimated results",
    resultsTitle: "Repayment results",
    monthlyPayment: "Monthly payment",
    firstPayment: "First payment",
    bulletPayment: "Monthly interest payment",
    totalRepayment: "Total repayment",
    totalInterest: "Total interest",
    notice:
      "Whole-unit estimates assume the rate and repayment terms do not change.",
    comparisonTitle: "Repayment comparison",
    comparisonDescription:
      "Compare payment burden and total interest for equal-payment and equal-principal repayment under identical terms.",
    first: "First payment",
    last: "Final payment",
    cheaper: "Lower total interest",
    details: "View repayment schedule",
    emptyDetails:
      "After calculation, review monthly principal, interest, payment, and remaining balance for the selected method.",
    tableCaption: "Monthly loan principal and interest repayment schedule",
    tableHeadings: [
      "Payment",
      "Payment index",
      "Principal",
      "Interest",
      "Payment amount",
      "Remaining balance",
    ],
    paymentIndex: (month: number) => `Month ${month}`,
    additional: "Additional information and assumptions",
    additionalLabels: [
      "Total principal",
      "Total interest",
      "Repayment term",
      "Effective repayment summary",
    ],
    complete: (amount: string) =>
      `Calculation complete. First payment is ${amount}.`,
    resetAnnouncement: "Inputs and calculated results have been reset.",
    summaries: {
      equalPayment: (months: number) =>
        `Payments remain nearly level for ${months} months.`,
      equalPrincipal:
        "The first payment is highest and decreases as the outstanding balance falls.",
      bullet: (months: number) =>
        `Interest is paid for ${months - 1} months and all principal is repaid in the final installment.`,
    },
  },
  validation: {
    amount:
      "Enter a whole-number loan amount from 10,000 to 1,000,000,000,000 in the selected display currency.",
    rate: "Enter an annual interest rate from 0% to 100%.",
    period: "Enter a loan term as a whole number of at least 1.",
    periodUnit: "Select a loan term unit.",
    repaymentType: "Select a repayment method.",
    maxPeriod: "Loan term cannot exceed 1,200 months (100 years).",
    requiredAmount: "Enter the loan amount.",
    requiredRate: "Enter the annual interest rate.",
    requiredPeriod: "Enter the loan term.",
  },
} satisfies Widen<typeof ko>;

export const loanDictionaries = { ko, en } as const;
export function getLoanDictionary(locale: LoanLocale) {
  return loanDictionaries[locale];
}
