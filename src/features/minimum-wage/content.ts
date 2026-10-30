export type MinimumWageLocale = "ko" | "en";

export const minimumWageContent = {
  ko: {
    title: "최저임금 계산기",
    metaTitle: "2026 최저임금 계산기",
    description:
      "2026년 최저시급 10,320원을 기준으로 주 소정근로시간별 최저임금을 계산합니다.",
    category: "근로·급여 계산기",
    intro:
      "입력 근로시간 기준 추정액과 주 40시간·유급주휴 8시간·209시간 기준 공식 월 최저임금을 구분해 확인하세요.",
    input: "근로 시간",
    weeklyHours: "주 소정근로시간",
    holiday: "유급 주휴시간 포함 (주 15시간 이상일 때만 적용)",
    calculate: "최저임금 계산하기",
    reset: "초기화",
    result: "2026년 최저임금 기준",
    hourly: "2026년 최저시급",
    weekly: "입력 근로시간 기준 예상 주급",
    monthly: "입력 시간 기준 월 환산 추정액",
    officialMonthly: "공식 209시간 기준 월 최저임금",
    paidHolidayHours: "적용된 유급 주휴시간",
    totalPaidHours: "총 주 유급시간",
    weeklyHoursResult: "입력한 주 소정근로시간",
    error: "주 소정근로시간은 0보다 크고 40시간 이하여야 합니다.",
    resultNote:
      "월 환산 추정액은 365÷7÷12의 연평균 주 수를 사용한 입력 시간 기준 추정값이며 공식 고시 월급이 아닙니다.",
    underFifteenNotice:
      "주 15시간 미만에서는 유급 주휴시간이 적용되지 않습니다. 체크 상태와 관계없이 주휴시간은 0시간으로 계산됩니다.",
    holidayAppliedNotice:
      "유급 주휴시간은 주 15시간 이상 외에도 소정근로일 개근 등 실제 요건을 충족해야 합니다.",
    hoursHelp:
      "4주(근로기간이 4주 미만이면 그 기간)의 평균 주 소정근로시간을 기준으로 확인하세요. 시간이 일정한 일반적인 주 40시간·주 5일 근로 기준의 비례 추정입니다.",
    example:
      "2026년 주 40시간에 주휴 8시간을 포함하면 주급은 10,320원 × 48 = 495,360원입니다. 이 계산기의 365 ÷ 7 ÷ 12 환산값은 월 약 2,152,457원이며, 공식 209시간 월급 2,156,880원과 구분해야 합니다.",
    modelAssumption:
      "2026년 1월 1일부터 12월 31일까지의 한국 최저임금을 사용합니다. 주휴 포함을 선택하려면 평균 주 15시간 이상, 소정근로일 개근 등의 실제 요건을 별도로 확인해야 합니다.",
    explanationTitle: "계산 기준",
    explanation: [
      "2026년 법정 최저시급 10,320원을 사용합니다.",
      "유급 주휴시간은 주 15시간 이상이면서 선택한 경우에만 주 소정근로시간÷5로 계산하고 최대 8시간으로 제한합니다.",
      "공식 월 최저임금은 주 40시간·유급주휴 8시간의 209시간 기준 2,156,880원입니다.",
    ],
    cautionsTitle: "확인 사항",
    cautions: [
      "최저임금 적용 여부와 산입 임금은 근로계약, 업종, 수습 여부 및 법정 예외에 따라 달라질 수 있습니다.",
      "주휴수당은 주 15시간 이상 및 소정근로일 개근 등 실제 요건이 필요합니다.",
      "이 결과는 세전 추정치이며 법률 판단을 대체하지 않습니다.",
    ],
    faq: [
      [
        "월 환산 추정액과 공식 월급은 왜 다른가요?",
        "이 계산기는 입력 주 유급시간에 365 ÷ 7 ÷ 12를 곱해 환산합니다. 공식 월 최저임금은 고시된 209시간 기준이므로, 주 40시간·주휴 8시간 조건에서는 2,156,880원을 따로 확인하세요.",
      ],
      [
        "2026년 최저시급은 얼마인가요?",
        "10,320원이며 8시간 일급은 82,560원입니다.",
      ],
      [
        "공식 월 최저임금은 얼마인가요?",
        "주 40시간과 유급주휴 8시간을 포함한 209시간 기준 2,156,880원입니다.",
      ],
      [
        "주 15시간 미만도 주휴시간을 포함하나요?",
        "아니요. 이 계산기에서는 체크 상태와 관계없이 0시간으로 계산합니다.",
      ],
    ] as const,
  },
  en: {
    title: "South Korea Minimum Wage Calculator",
    metaTitle: "2026 South Korea Minimum Wage Calculator | KRW",
    description:
      "Estimate South Korea minimum pay in KRW by scheduled weekly hours using the 2026 statutory minimum hourly wage of KRW 10,320.",
    category: "Employment calculator",
    intro:
      "This South Korea calculator keeps all wage amounts in KRW and distinguishes your entered-hours estimate from the official 209-hour monthly minimum for 40 weekly hours plus eight paid weekly-holiday hours.",
    input: "South Korea working hours (KRW pay basis)",
    weeklyHours: "Scheduled weekly hours",
    holiday:
      "Include paid weekly-holiday hours (only for at least 15 weekly hours)",
    calculate: "Calculate minimum pay",
    reset: "Reset",
    result: "2026 South Korea minimum-wage basis (KRW)",
    hourly: "2026 minimum hourly wage (KRW)",
    weekly: "Estimated weekly pay for entered hours (KRW)",
    monthly: "Monthly-equivalent estimate for entered hours (KRW)",
    officialMonthly: "Official 209-hour monthly minimum (KRW)",
    paidHolidayHours: "Applied paid weekly-holiday hours",
    totalPaidHours: "Total weekly paid hours",
    weeklyHoursResult: "Entered scheduled weekly hours",
    error: "Enter scheduled weekly hours greater than 0 and no more than 40.",
    resultNote:
      "This South Korea KRW estimate uses a 365-day annual average of 365÷7÷12 weeks and is not an official published monthly wage.",
    underFifteenNotice:
      "Below 15 weekly hours, paid weekly-holiday hours do not apply. They are calculated as 0 regardless of the checkbox.",
    holidayAppliedNotice:
      "Paid weekly-holiday hours require actual eligibility conditions in addition to at least 15 weekly hours, including completed scheduled workdays.",
    hoursHelp:
      "Check average scheduled weekly hours over four weeks (or the employment period if shorter). The proportional estimate assumes a conventional 40-hour, five-day full-time reference schedule.",
    example:
      "For 40 weekly hours plus eight paid holiday hours in 2026, weekly pay = KRW 10,320 × 48 = KRW 495,360. This calculator's 365 ÷ 7 ÷ 12 conversion is about KRW 2,152,457 per month, distinct from the official KRW 2,156,880 minimum on the 209-hour basis.",
    modelAssumption:
      "Uses South Korea's minimum wage effective January 1–December 31, 2026. Selecting paid holiday hours requires checking actual eligibility, including at least 15 average weekly hours and completed scheduled workdays.",
    explanationTitle: "Calculation basis",
    explanation: [
      "Uses South Korea's 2026 statutory minimum hourly wage of KRW 10,320.",
      "Paid weekly-holiday hours apply only when selected at 15 or more weekly hours: weekly hours divided by five, capped at eight.",
      "The official monthly minimum is KRW 2,156,880: KRW 10,320 × 209 hours for 40 weekly hours plus eight paid weekly-holiday hours.",
    ],
    cautionsTitle: "Important cautions",
    cautions: [
      "This calculator applies South Korea minimum-wage rules and reports monetary amounts only in KRW.",
      "Coverage and includable wages can differ by contract, industry, probation status, and statutory exceptions.",
      "Paid weekly-holiday hours require actual eligibility conditions, including at least 15 weekly hours and completed scheduled workdays.",
      "This is a pre-tax estimate and does not replace a wage statement or legal determination.",
    ],
    faq: [
      [
        "Why do the monthly estimate and official minimum differ?",
        "The estimate multiplies entered weekly paid hours by 365 ÷ 7 ÷ 12. The published monthly minimum uses 209 hours, so check KRW 2,156,880 separately for the 40-hour week plus eight paid holiday hours.",
      ],
      [
        "What is the 2026 minimum hourly wage?",
        "South Korea's 2026 statutory minimum hourly wage is KRW 10,320; the eight-hour daily reference is KRW 82,560.",
      ],
      [
        "What is the official monthly minimum?",
        "KRW 2,156,880 on the official 209-hour basis for 40 weekly hours plus eight paid weekly-holiday hours.",
      ],
      [
        "Do paid weekly-holiday hours apply below 15 hours?",
        "No. This South Korea calculator always applies zero hours below 15 weekly hours.",
      ],
    ] as const,
  },
} as const;
