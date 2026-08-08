export type Locale = "ko" | "en";

export const content = {
  ko: {
    title: "휴일근로수당 계산기",
    metaTitle: "휴일근로수당 계산기",
    description:
      "급여 정산기간의 휴일근로시간에 대한 구간별 휴일근로 보상액을 계산합니다.",
    category: "근로·급여 계산기",
    input: "휴일근로 조건",
    wage: "통상 시급",
    hours: "급여 정산기간의 총 휴일근로시간",
    workplaceSize: "사업장 규모",
    fiveOrMore: "상시 5인 이상",
    underFive: "상시 5인 미만",
    contractualRate: "약정 가산율 (5인 미만)",
    calculate: "휴일근로수당 계산하기",
    reset: "초기화",
    error: "입력값을 확인해 주세요.",
    total: "총 휴일근로 보상액",
    base: "기본 임금분",
    premium: "총 가산 임금",
    withinHours: "8시간 이내 근로시간",
    overHours: "8시간 초과 근로시간",
    withinPremium: "8시간 이내 50% 가산분",
    overPremium: "8시간 초과 100% 가산분",
    contractualPremium: "약정 가산분",
    details: "계산 상세",
    note: "이 결과는 기본 임금을 포함한 총 보상액입니다. 추가 가산액만은 ‘총 가산 임금’을 확인하세요.",
    monthlySalaryNotice:
      "월급에 유급휴일의 기본 임금이 이미 포함된 경우 실제 추가 지급액은 표시된 총 보상액보다 적을 수 있습니다. 가산 임금분을 별도로 확인하세요.",
    underFiveNotice:
      "상시 5인 미만 사업장은 근로기준법 제56조의 법정 휴일근로 가산 규정이 원칙적으로 적용되지 않을 수 있습니다. 입력한 값은 약정 가산율입니다.",
    overlapNotice:
      "야간근로와 겹치는 시간에는 야간 가산이 별도로 더해질 수 있으며, 이 결과에는 자동으로 포함되지 않습니다.",
    cautionTitle: "중요한 주의사항",
    cautions: [
      "월급에 유급휴일의 기본 임금이 이미 포함된 근로자는 실제 추가 지급액이 이 총 보상액과 다를 수 있습니다.",
      "168시간은 입력 안전 제한일 뿐 법정 허용 한도가 아닙니다.",
      "5인 이상 사업장은 8시간 이내 50%, 8시간 초과분 100%의 법정 구간별 가산을 적용합니다.",
    ],
    empty: "계산하면 구간별 금액을 표시합니다.",
  },
  en: {
    title: "South Korea Holiday Work Pay Calculator",
    metaTitle: "South Korea Holiday Work Pay Calculator | KRW Estimate",
    description:
      "Estimate segmented South Korean holiday-work compensation in KRW for total holiday-work hours in a payroll period.",
    category: "Employment calculator",
    input: "South Korea holiday-work inputs (KRW)",
    wage: "Ordinary hourly wage (KRW)",
    hours: "Total holiday-work hours in the payroll period",
    workplaceSize: "Workplace size",
    fiveOrMore: "Five or more regular employees",
    underFive: "Fewer than five regular employees",
    contractualRate: "Contractual premium rate (under five employees)",
    calculate: "Calculate holiday-work pay",
    reset: "Reset",
    error: "Check the highlighted values.",
    total: "Total holiday-work compensation (KRW)",
    base: "Base wage portion (KRW)",
    premium: "Total premium pay (KRW)",
    withinHours: "Hours within 8 hours",
    overHours: "Hours over 8 hours",
    withinPremium: "Within-8-hours 50% premium (KRW)",
    overPremium: "Over-8-hours 100% premium (KRW)",
    contractualPremium: "Contractual premium portion (KRW)",
    details: "Calculation details",
    note: "This South Korea result is total compensation in KRW including base wages. See total premium pay for the additional premium only.",
    monthlySalaryNotice:
      "If base pay for the paid holiday is already included in monthly salary, the actual additional payment may be lower than the displayed total compensation. Review the premium portion separately.",
    underFiveNotice:
      "At workplaces with fewer than five regular employees, the statutory Article 56 holiday-work premium may not apply. The entered value is a contractual premium rate.",
    overlapNotice:
      "Night-work premiums may be added separately for overlapping hours and are not automatically included in this result.",
    cautionTitle: "Important cautions",
    cautions: [
      "For monthly-paid employees whose paid-holiday base wage is already included in salary, the actual additional payment may differ from this total compensation.",
      "The 168-hour limit is an input safety limit, not a statutory maximum.",
      "For workplaces with five or more employees, the statutory segmented premiums are 50% within eight hours and 100% above eight hours.",
    ],
    empty: "Calculate to see the segmented amounts.",
  },
} as const;
