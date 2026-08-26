export type PartTimeMonthlyPayLocale = "ko" | "en";

export const partTimeMonthlyPayContent = {
  ko: {
    title: "알바 월급 계산기",
    description:
      "시급과 하루 근무시간, 주 근무일수를 입력해 주급과 평균 월급, 연간 예상 급여를 계산합니다.",
    category: "급여·근로",
    input: "근무 조건",
    hourlyWage: "시급",
    hoursPerDay: "하루 근무시간",
    daysPerWeek: "주 근무일수",
    calculate: "계산하기",
    reset: "초기화",
    result: "예상 급여",
    weeklyHours: "주 근무시간",
    weeklyPay: "주급",
    monthlyPay: "평균 월급",
    annualPay: "연간 예상 급여",
    error: "시급과 근무시간을 확인해 주세요.",
    note: "입력한 고정 근무 일정이 1년 내내 이어진다고 보고 1년 365.2425일을 주 단위로 환산해 월평균을 계산합니다. 주휴수당, 연장·야간·휴일수당, 세금과 4대보험은 포함하지 않습니다.",
    method:
      "주 근무시간은 하루 근무시간 × 주 근무일수, 주급은 시급 × 주 근무시간으로 계산합니다. 월급은 연간 주급을 12개월로 나눈 평균값입니다.",
    cautions:
      "실제 급여는 근무일수 변화, 유급휴일, 법정수당, 계약 조건에 따라 달라질 수 있습니다. 주휴수당은 별도 주휴수당 계산기에서 확인하세요.",
    metaTitle: "알바 월급 계산기 | 시급으로 월급 계산",
  },
  en: {
    title: "Part-Time Monthly Pay Calculator",
    description:
      "Enter an hourly wage, hours per day, and days per week to estimate weekly, average monthly, and annual gross pay.",
    category: "Pay & Work",
    input: "Work schedule",
    hourlyWage: "Hourly wage",
    hoursPerDay: "Hours per day",
    daysPerWeek: "Days per week",
    calculate: "Calculate",
    reset: "Reset",
    result: "Estimated gross pay",
    weeklyHours: "Weekly hours",
    weeklyPay: "Weekly pay",
    monthlyPay: "Average monthly pay",
    annualPay: "Estimated annual pay",
    error: "Check the hourly wage and work schedule.",
    note: "The calculator assumes the entered schedule continues throughout the year and converts 365.2425 days into an average month. Paid weekly-holiday allowance, overtime, night/holiday premiums, taxes, and insurance are excluded.",
    method:
      "Weekly hours equal hours per day multiplied by days per week. Weekly pay equals hourly wage multiplied by weekly hours, and average monthly pay is annualized weekly pay divided by 12.",
    cautions:
      "Actual pay can vary with schedules, paid holidays, statutory premiums, and contract terms. Use the Weekly Holiday Pay Calculator separately when relevant.",
    metaTitle: "Part-Time Monthly Pay Calculator | Hourly to Monthly Pay",
  },
} satisfies Record<PartTimeMonthlyPayLocale, Record<string, string>>;
