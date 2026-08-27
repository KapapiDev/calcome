export type AgeLocale = "ko" | "en";

export const ageContent = {
  ko: {
    title: "나이 계산기",
    description:
      "생년월일과 기준일을 입력해 만 나이, 살아온 총 일수, 주 단위 경과 기간과 다음 생일까지 남은 날짜를 계산합니다.",
    category: "사업·생활",
    input: "날짜 입력",
    birthDate: "생년월일",
    asOfDate: "기준일",
    calculate: "나이 계산하기",
    reset: "초기화",
    result: "계산 결과",
    fullYears: "만 나이",
    yearsUnit: "세",
    totalDays: "총 경과 일수",
    daysUnit: "일",
    weeks: "주 단위 경과",
    nextBirthday: "다음 생일",
    daysUntilBirthday: "다음 생일까지",
    error: "올바른 날짜를 입력하고 생년월일이 기준일보다 늦지 않게 입력하세요.",
    note: "만 나이는 기준일에 이미 지난 생일 수를 기준으로 계산합니다. 2월 29일생의 비윤년 생일은 이 계산기에서 2월 28일로 처리합니다.",
    method:
      "기준일과 생년월일의 달력 날짜를 비교해 완료된 연수를 계산하고, 두 날짜 사이의 UTC 기준 일수 차이로 총 경과 일수와 주 단위 기간을 계산합니다.",
    tips: "계약·보험·행정처럼 특정 날짜의 나이가 필요한 경우 오늘 날짜 대신 그 기준일을 직접 입력하세요. 법적 연령 판단은 해당 제도의 별도 기준을 확인해야 합니다.",
    metaTitle: "나이 계산기 | 만 나이·총 일수·다음 생일 계산",
  },
  en: {
    title: "Age Calculator",
    description:
      "Enter a birth date and reference date to calculate completed age, total days lived, elapsed weeks, and time until the next birthday.",
    category: "Business & Everyday",
    input: "Date inputs",
    birthDate: "Birth date",
    asOfDate: "As-of date",
    calculate: "Calculate age",
    reset: "Reset",
    result: "Results",
    fullYears: "Completed age",
    yearsUnit: "years",
    totalDays: "Total elapsed days",
    daysUnit: "days",
    weeks: "Elapsed weeks",
    nextBirthday: "Next birthday",
    daysUntilBirthday: "Until next birthday",
    error:
      "Enter valid dates and make sure the birth date is not after the as-of date.",
    note: "Completed age counts birthdays already reached by the as-of date. For Feb 29 births, this calculator uses Feb 28 as the birthday in non-leap years.",
    method:
      "The calculator compares calendar dates for completed years, then uses the UTC day difference between the two dates for total elapsed days and weeks.",
    tips: "Use a specific as-of date when you need age at a past or future event. Legal or program-specific age rules can differ, so verify the applicable rule separately.",
    metaTitle: "Age Calculator | Years, Days & Next Birthday",
  },
} satisfies Record<AgeLocale, Record<string, string>>;
