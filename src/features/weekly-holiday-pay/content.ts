export type WeeklyHolidayPayLocale = "ko" | "en";

export const weeklyHolidayPayContent = {
  ko: {
    title: "주휴수당 계산기",
    metaTitle: "주휴수당 계산기",
    description:
      "시급과 주 소정근로시간으로 주휴수당, 주급 합계와 월 환산 추정액을 계산합니다.",
    category: "근로·급여 계산기",
    intro:
      "주 15시간 이상 근무하고 소정근로일을 개근한 일반적인 근로자를 위한 간편 추정입니다.",
    input: "근로 조건",
    hourlyWage: "시급",
    weeklyHours: "주 소정근로시간",
    attendance: "이번 주 소정근로일을 모두 근무했습니다",
    calculate: "주휴수당 계산하기",
    reset: "초기화",
    result: "예상 결과",
    holidayPay: "주휴수당",
    totalPay: "주급 합계",
    monthlyPay: "월 환산 주휴수당",
    eligible: "예상 적용 대상입니다.",
    ineligible: "입력 조건에서는 주휴수당이 0원으로 추정됩니다.",
    explanationTitle: "계산 방법",
    explanation: [
      "주 15시간 이상이고 소정근로일을 개근한 경우를 적용 대상으로 봅니다.",
      "유급휴일 시간은 주 소정근로시간 ÷ 5로 계산하며 1일 8시간을 상한으로 둡니다.",
      "주휴수당은 시급 × 유급휴일 시간, 월 환산액은 주휴수당 × 4.345입니다.",
    ],
    cautionsTitle: "확인할 사항",
    cautions: [
      "근로계약, 교대제, 단시간근로자의 통상 근로일수에 따라 실제 산정이 달라질 수 있습니다.",
      "결근·휴일·퇴직 주의 처리와 임금 포함 여부는 개별 사실관계를 확인해야 합니다.",
      "이 결과는 세전 추정액이며 법률 자문이나 임금 지급 보장이 아닙니다.",
    ],
    faq: [
      [
        "주 15시간 미만이면 받을 수 있나요?",
        "일반적으로 4주 평균 주 소정근로시간이 15시간 미만인 초단시간근로자는 적용 대상에서 제외됩니다.",
      ],
      [
        "월급에 이미 포함될 수 있나요?",
        "근로계약과 임금명세서에 적법하게 포함되어 지급되는 경우가 있으므로 지급 항목을 확인하세요.",
      ],
      [
        "월 환산액은 왜 4.345를 곱하나요?",
        "1년 365일을 12개월과 7일로 나눈 평균 주 수를 사용한 비교용 추정치입니다.",
      ],
      [
        "정확한 판단은 어디에 문의하나요?",
        "근로계약서와 근무기록을 준비해 고용노동부 고객상담센터 또는 관할 노동관서에 확인하세요.",
      ],
    ] as const,
  },
  en: {
    title: "South Korea Weekly Holiday Pay Calculator",
    metaTitle: "South Korea Weekly Holiday Pay Calculator | KRW Estimate",
    description:
      "Estimate South Korean weekly holiday pay, total weekly pay, and a monthly equivalent in KRW from hourly wage and scheduled weekly hours.",
    category: "Employment calculator",
    intro:
      "A South Korea planning estimate in KRW for workers generally scheduled for at least 15 hours who complete their scheduled workdays.",
    input: "South Korea work conditions (KRW)",
    hourlyWage: "Hourly wage (KRW)",
    weeklyHours: "Scheduled weekly hours",
    attendance: "All scheduled workdays were completed this week",
    calculate: "Calculate holiday pay",
    reset: "Reset",
    result: "Estimated South Korea results (KRW)",
    holidayPay: "Weekly holiday pay (KRW)",
    totalPay: "Total weekly pay (KRW)",
    monthlyPay: "Monthly equivalent (KRW)",
    eligible: "The entered conditions are generally eligible.",
    ineligible: "Estimated holiday pay is KRW 0 for the entered conditions.",
    explanationTitle: "How it is calculated",
    explanation: [
      "Eligibility assumes at least 15 scheduled weekly hours and completion of scheduled workdays under South Korea rules.",
      "Paid holiday hours equal weekly hours divided by five, capped at eight hours.",
      "Holiday pay in KRW equals hourly wage times paid holiday hours; the monthly comparison uses 4.345 weeks.",
    ],
    cautionsTitle: "Important cautions",
    cautions: [
      "This calculator applies South Korea employment rules and KRW amounts; actual treatment can differ for shifts, part-time schedules, and individual employment contracts.",
      "Absence, holidays, termination weeks, and whether pay already includes the allowance require factual review.",
      "This is a pre-tax estimate, not legal advice or a payment guarantee.",
    ],
    faq: [
      [
        "What if I work under 15 hours?",
        "Workers averaging under 15 scheduled hours per week are generally excluded under South Korea rules.",
      ],
      [
        "Can it already be included in salary?",
        "It may be included when properly stated and paid; check your contract and wage statement.",
      ],
      [
        "Why multiply by 4.345?",
        "It is an average weeks-per-month conversion used only for comparison.",
      ],
      [
        "Where can I confirm eligibility?",
        "Ask South Korea's Ministry of Employment and Labor with your contract and attendance records.",
      ],
    ] as const,
  },
} as const;
