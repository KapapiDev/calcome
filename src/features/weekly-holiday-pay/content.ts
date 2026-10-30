export type WeeklyHolidayPayLocale = "ko" | "en";

export const weeklyHolidayPayContent = {
  ko: {
    title: "주휴수당 계산기",
    metaTitle: "주휴수당 계산기",
    description:
      "평균 주 15시간·개근 요건을 확인하고 시급과 소정근로시간으로 주휴수당, 주급 합계와 월 환산 주휴수당을 계산하세요.",
    category: "근로·급여 계산기",
    intro:
      "4주 평균 주 15시간 이상과 소정근로일 개근 요건을 확인하고, 주 40시간·주 5일 통상근로자 기준에 비례한 주휴수당을 추정하세요.",
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
    hoursHelp:
      "4주(근로기간이 4주 미만이면 그 기간)의 평균 주 소정근로시간을 기준으로 확인하세요. 시간이 일정한 일반적인 주 40시간·주 5일 근로 기준의 비례 추정입니다.",
    example:
      "시급 10,320원, 평균 주 20시간, 소정근로일 개근을 가정하면 주휴시간은 20 ÷ 5 = 4시간, 주휴수당은 41,280원입니다. 근로 주급 206,400원을 더하면 247,680원이며, 월 환산 주휴수당만 따로 보면 41,280 × 4.345 ≈ 179,362원입니다.",
    modelAssumption:
      "주 40시간·주 5일 통상근로자에 비례한 간편 모델입니다. 입력 시급은 원화이며, 4주 평균 주 소정근로시간이 15시간 이상이고 해당 주 소정근로일을 개근했다고 가정합니다.",
    explanationTitle: "계산 방법",
    explanation: [
      "4주(근로기간이 더 짧으면 그 기간) 평균 주 소정근로시간이 15시간 이상이고 해당 주 소정근로일을 개근한 경우를 가정합니다.",
      "이 비례 모델의 유급휴일 시간은 주 소정근로시간 ÷ 5로 계산하며 1일 8시간을 상한으로 둡니다.",
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
        "365 ÷ 7 ÷ 12 ≈ 4.345238을 소수 셋째 자리까지 반올림한 4.345를 사용합니다. 주휴수당만 월 단위로 비교하는 추정값이며 월급 전체가 아닙니다.",
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
      "Check the 15-hour average-week and attendance assumptions, then estimate South Korean weekly holiday pay, weekly total and monthly holiday pay in KRW.",
    category: "Employment calculator",
    intro:
      "Estimate South Korea weekly holiday pay in KRW using average scheduled hours and attendance, with a proportional 40-hour, five-day reference schedule.",
    input: "South Korea work conditions (KRW)",
    hourlyWage: "Hourly wage (KRW)",
    weeklyHours: "Scheduled weekly hours",
    attendance: "All scheduled workdays were completed this week",
    calculate: "Calculate holiday pay",
    reset: "Reset",
    result: "Estimated South Korea results (KRW)",
    holidayPay: "Weekly holiday pay (KRW)",
    totalPay: "Total weekly pay (KRW)",
    monthlyPay: "Monthly equivalent of holiday pay (KRW)",
    eligible: "The entered conditions are generally eligible.",
    ineligible: "Estimated holiday pay is KRW 0 for the entered conditions.",
    hoursHelp:
      "Check average scheduled weekly hours over four weeks (or the employment period if shorter). The proportional estimate assumes a conventional 40-hour, five-day full-time reference schedule.",
    example:
      "At KRW 10,320 per hour, an average 20-hour scheduled week and completed scheduled workdays, paid holiday hours = 20 ÷ 5 = 4. Holiday pay is KRW 41,280; adding KRW 206,400 work pay gives KRW 247,680 weekly total. The monthly equivalent of holiday pay alone is 41,280 × 4.345 ≈ KRW 179,362.",
    modelAssumption:
      "This simplified proportional model uses a conventional 40-hour, five-day full-time reference schedule. Wage inputs are KRW. It assumes at least 15 average scheduled weekly hours over four weeks and completion of the relevant week's scheduled workdays.",
    explanationTitle: "How it is calculated",
    explanation: [
      "Eligibility assumes at least 15 scheduled weekly hours averaged over four weeks (or a shorter employment period), with completed scheduled workdays in the relevant week.",
      "This proportional model uses weekly hours divided by five, capped at eight paid holiday hours.",
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
        "4.345 is rounded from 365 ÷ 7 ÷ 12 ≈ 4.345238. It estimates a monthly equivalent of holiday pay only, not total monthly salary.",
      ],
      [
        "Where can I confirm eligibility?",
        "Ask South Korea's Ministry of Employment and Labor with your contract and attendance records.",
      ],
    ] as const,
  },
} as const;
