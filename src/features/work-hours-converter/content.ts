export type WorkHoursConverterLocale = "ko" | "en";

export const workHoursConverterContent = {
  ko: {
    title: "주·월 근무시간 변환기",
    description:
      "주 근무시간과 월평균 근무시간을 서로 변환하고 연간 환산 근무시간까지 확인합니다.",
    category: "급여·근로",
    input: "변환 기준",
    direction: "변환 방향",
    weeklyToMonthly: "주 근무시간 → 월평균 근무시간",
    monthlyToWeekly: "월평균 근무시간 → 주 근무시간",
    hours: "근무시간",
    calculate: "변환하기",
    reset: "초기화",
    result: "환산 결과",
    weeklyHours: "주 근무시간",
    monthlyHours: "월평균 근무시간",
    annualHours: "연간 환산 근무시간",
    weeksPerMonth: "월평균 주수",
    error: "0 이상 744 이하의 유효한 근무시간을 입력해 주세요.",
    note: "월평균은 1년 365.2425일을 52.1775주로 환산한 뒤 12개월로 나눈 약 4.348125주를 사용합니다. 단순 시간 환산 도구이며 법정근로시간, 연장근로 한도, 휴게시간 또는 수당 발생 여부를 판단하지 않습니다.",
    example:
      "주 40시간 × 4.348125 = 월평균 173.925시간(표시값 173.93시간), 연간 2,087.1시간입니다. 월평균 173.925시간 ÷ 4.348125 = 주 40시간으로 역변환됩니다. 4주만 곱한 160시간은 다른 기준입니다.",
    assumption:
      "동일한 주 근무시간이 유지된다고 가정한 달력 평균입니다. 특정 월의 출근일이나 실제 근무기록을 세는 방식이 아닙니다.",
    payrollLimit:
      "173.925시간은 주휴 등 유급시간을 더하지 않은 환산값입니다. 한국 최저임금의 공식 209시간 월급 기준과 바꿔 쓸 수 없습니다.",
    method:
      "주 근무시간에 월평균 주수 4.348125를 곱하면 월평균 근무시간이 됩니다. 반대로 월평균 근무시간을 4.348125로 나누면 평균 주 근무시간을 구할 수 있습니다.",
    cautions:
      "실제 월별 근무시간은 달력의 주수, 공휴일, 휴가, 교대 일정에 따라 달라질 수 있습니다. 급여 계산이 목적이라면 알바 월급 계산기나 시급 계산기를 함께 사용하세요.",
    metaTitle: "주·월 근무시간 변환기 | 주간·월간 시간 환산",
  },
  en: {
    title: "Weekly and Monthly Work-Hours Converter",
    description:
      "Convert weekly work hours to average monthly hours, or monthly hours back to weekly hours, with an annualized total.",
    category: "Pay & Work",
    input: "Conversion basis",
    direction: "Conversion direction",
    weeklyToMonthly: "Weekly hours → average monthly hours",
    monthlyToWeekly: "Average monthly hours → weekly hours",
    hours: "Work hours",
    calculate: "Convert",
    reset: "Reset",
    result: "Converted hours",
    weeklyHours: "Weekly hours",
    monthlyHours: "Average monthly hours",
    annualHours: "Annualized work hours",
    weeksPerMonth: "Average weeks per month",
    error: "Enter a valid work-hour value from 0 to 744.",
    note: "The average month uses about 4.348125 weeks, derived from 365.2425 days per year. This is a time-conversion tool only; it does not determine statutory working-hour limits, overtime eligibility, required breaks, or premium pay.",
    example:
      "40 weekly hours × 4.348125 = 173.925 average monthly hours (displayed as 173.93 hr), or 2,087.1 annual hours. Reversing 173.925 ÷ 4.348125 gives 40 weekly hours. Multiplying by four gives 160 hours, a different basis.",
    assumption:
      "This calendar average assumes unchanged weekly hours. It does not count actual attendance days or a particular calendar month.",
    payrollLimit:
      "The 173.925-hour conversion does not add paid weekly holidays. It is not interchangeable with South Korea's official 209-hour monthly minimum-wage basis.",
    method:
      "Multiply weekly hours by 4.348125 to estimate average monthly hours. Divide average monthly hours by 4.348125 to convert back to average weekly hours.",
    cautions:
      "Actual monthly hours vary with the calendar, holidays, leave, and rotating schedules. For pay estimates, use the Part-Time Monthly Pay Calculator or Hourly Wage Calculator alongside this converter.",
    metaTitle: "Weekly and Monthly Work-Hours Converter | Hours Conversion",
  },
} satisfies Record<WorkHoursConverterLocale, Record<string, string>>;
