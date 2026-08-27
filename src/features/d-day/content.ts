export type DDayLocale = "ko" | "en";

export const dDayContent = {
  ko: {
    title: "디데이 계산기",
    description:
      "기준일과 목표일을 입력해 D-·D+ 표시, 남은·지난 일수, 주 단위 기간과 목표일 요일을 계산합니다.",
    category: "사업·생활",
    input: "날짜 입력",
    asOfDate: "기준일",
    targetDate: "목표일",
    calculate: "디데이 계산하기",
    reset: "초기화",
    result: "계산 결과",
    countdown: "디데이",
    dayDistance: "남은·지난 일수",
    weeks: "주 단위 기간",
    targetWeekday: "목표일 요일",
    daysUnit: "일",
    weeksUnit: "주",
    error: "기준일과 목표일에 올바른 날짜를 입력하세요.",
    note: "같은 날짜는 D-Day, 미래 목표일은 D-n, 지난 목표일은 D+n으로 표시합니다. 남은 일수는 기준일 자체를 포함하지 않는 달력 날짜 차이입니다.",
    method:
      "두 날짜를 UTC 기준의 달력 날짜로 정규화한 뒤 목표일에서 기준일을 뺀 일수 차이를 계산합니다. 절댓값으로 전체 주와 나머지 일수를 함께 보여줍니다.",
    tips: "시험·여행·마감처럼 특정 목표일까지 남은 날짜를 볼 때 사용하세요. 시간대나 시각까지 필요한 일정은 캘린더의 실제 마감 시각을 별도로 확인해야 합니다.",
    metaTitle: "디데이 계산기 | D-Day·D-·D+ 날짜 계산",
  },
  en: {
    title: "D-Day Calculator",
    description:
      "Enter an as-of date and target date to calculate D-, D+, calendar days remaining or elapsed, weeks, and the target weekday.",
    category: "Business & Everyday",
    input: "Date inputs",
    asOfDate: "As-of date",
    targetDate: "Target date",
    calculate: "Calculate D-Day",
    reset: "Reset",
    result: "Results",
    countdown: "D-Day",
    dayDistance: "Days remaining / elapsed",
    weeks: "Week breakdown",
    targetWeekday: "Target weekday",
    daysUnit: "days",
    weeksUnit: "weeks",
    error: "Enter valid as-of and target dates.",
    note: "The same date is D-Day, a future target is D-n, and a past target is D+n. The day count is the calendar-day difference and does not include the as-of date itself.",
    method:
      "Both inputs are normalized as UTC calendar dates. The calculator subtracts the as-of date from the target date, then breaks the absolute difference into full weeks and extra days.",
    tips: "Use this for exams, trips, launches, deadlines, and other target-date countdowns. If the exact time or timezone matters, verify the event's actual deadline separately.",
    metaTitle: "D-Day Calculator | D-, D+ & Days Remaining",
  },
} satisfies Record<DDayLocale, Record<string, string>>;
