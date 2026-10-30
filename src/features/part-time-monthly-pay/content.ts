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
      "주 근무시간 = 하루 근무시간 × 주 근무일수, 주급 = 시급 × 주 근무시간입니다. 평균 월급 = 주급 × (365.2425 ÷ 7 ÷ 12)로, 약 4.348125주를 사용합니다. 4주 급여나 특정 달의 실제 지급액과는 다릅니다.",
    example:
      "설명용 시급 12,000원, 하루 5시간, 주 4일이면 주 20시간·주급 240,000원입니다. 4주 급여는 960,000원이지만 이 계산기의 평균 월급은 1,043,550원, 연간 예상 급여는 12,522,600원입니다. 법정 최저임금을 나타내는 예시가 아닙니다.",
    assumptions:
      "같은 근무 일정이 연중 유지된다고 가정합니다. 월평균은 그레고리력 평균 연도 365.2425일을 사용한 이 계산기의 환산 기준이며, 법정 급여 산정 규칙이 아닙니다. 표시 통화는 단위만 바꾸며 환율을 적용하지 않습니다.",
    cautions:
      "실제 급여는 근무일수 변화, 유급휴일, 법정수당, 계약 조건에 따라 달라질 수 있습니다. 주휴수당은 별도 주휴수당 계산기에서 확인하세요.",
    metaTitle: "알바 월급 계산기 | 시급으로 월급 계산",
  },
  en: {
    title: "Part-Time Pay Calculator: Hourly to Monthly",
    description:
      "Convert an hourly wage and part-time schedule into weekly, average monthly, and annual gross pay. See how the annual-average estimate differs from four weeks of pay.",
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
      "Weekly hours = hours per day × days per week. Weekly pay = hourly wage × weekly hours. Average monthly pay = weekly pay × (365.2425 ÷ 7 ÷ 12), about 4.348125 weeks. This is not a four-week pay total or a particular month's payslip.",
    example:
      "With an illustrative hourly wage of USD 20, 5 hours a day, and 4 days a week, weekly hours are 20 and weekly pay is USD 400. Four weeks give USD 1,600, while this calculator estimates USD 1,739.25 per average month and USD 20,871 per year, before deductions and excluded allowances.",
    assumptions:
      "The same schedule continues all year. The 365.2425-day Gregorian average year is this calculator's conversion convention, not a statutory payroll rule. The currency selector changes display units only; it does not apply exchange rates.",
    cautions:
      "Actual pay can vary with schedules, paid holidays, statutory premiums, and contract terms. Use the Weekly Holiday Pay Calculator separately when relevant.",
    metaTitle: "Hourly to Monthly Pay Calculator | Part-Time Gross Pay",
  },
} satisfies Record<PartTimeMonthlyPayLocale, Record<string, string>>;
