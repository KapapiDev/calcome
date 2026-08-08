export type Locale = "ko" | "en";

export const content = {
  ko: {
    title: "야간근로수당 계산기",
    metaTitle: "야간근로수당 계산기 | 야간수당 계산",
    description:
      "오후 10시부터 다음 날 오전 6시 사이에 실제 근무한 시간의 야간근로수당을 계산합니다.",
    category: "근로·급여 계산기",
    intro: "기본 임금분과 야간 가산 임금분을 구분해 확인하세요.",
    input: "야간근로 조건",
    wage: "통상 시급",
    wagePh: "예: 12,000",
    hours:
      "급여 정산기간의 총 야간근로시간 (오후 10시~다음 날 오전 6시에 실제 근무한 시간만)",
    hoursPh: "예: 8",
    workplaceSize: "사업장 규모",
    fiveOrMore: "상시 5인 이상",
    underFive: "상시 5인 미만",
    rate: "야간 가산율",
    ratePh: "예: 50",
    calculate: "야간근로수당 계산하기",
    reset: "초기화",
    error: "입력값을 확인해 주세요.",
    result: "예상 결과",
    total: "총 야간근로수당",
    base: "기본 임금분",
    premium: "야간 가산 임금분",
    note: "세전 추정치입니다. 실제 적용 여부와 지급액은 근로계약 및 급여기록을 확인하세요.",
    underFiveNotice:
      "상시 5인 미만 사업장은 근로기준법 제56조의 가산임금 규정이 원칙적으로 적용되지 않을 수 있습니다. 입력한 가산율은 약정 가산율로 계산됩니다.",
    overlapNotice:
      "이 계산기는 야간 가산만 계산합니다. 연장 또는 휴일근로와 중첩되는 시간에는 해당 가산이 별도로 더해질 수 있으며, 이 결과에 자동으로 포함되지 않습니다.",
    details: "계산 상세",
    adjusted: "가산 적용 시급",
    appliedHours: "적용 야간근로시간",
    appliedRate: "적용 야간 가산율",
    empty: "계산하면 적용 조건을 표시합니다.",
    exTitle: "계산 방법",
    ex: [
      "기본 임금분은 통상 시급 × 야간근로시간입니다.",
      "야간 가산 임금분은 기본 임금분 × 야간 가산율입니다.",
      "야간근로는 오후 10시부터 다음 날 오전 6시 사이에 실제 근무한 시간입니다.",
    ],
    warnTitle: "중요한 주의사항",
    warn: [
      "상시 5인 이상 사업장에서는 원칙적으로 50% 이상의 야간 가산율이 적용됩니다.",
      "168시간은 입력 안전 제한일 뿐 법정 허용 한도가 아닙니다. 정산기간의 실제 야간근로시간만 입력하세요.",
      "연장·휴일근로와 겹치면 별도 가산이 더해질 수 있으며, 이 계산기는 그 중첩 가산을 자동으로 합산하지 않습니다.",
    ],
    faq: [
      [
        "야간근로 시간은 언제인가요?",
        "오후 10시부터 다음 날 오전 6시까지입니다.",
      ],
      [
        "5인 미만 사업장도 적용되나요?",
        "가산임금 규정의 적용 여부가 다를 수 있습니다.",
      ],
      ["연장근로 가산도 포함되나요?", "아니요. 야간 가산만 계산합니다."],
      ["세후 금액인가요?", "아니요. 공제 전 예상 금액입니다."],
    ],
    reference: "국가법령정보센터 근로기준법 제56조",
  },
  en: {
    title: "South Korea Night Work Pay Calculator",
    metaTitle: "South Korea Night Work Pay Calculator | KRW Estimate",
    description:
      "Estimate South Korean night-work pay in KRW for actual work performed between 10 p.m. and 6 a.m.",
    category: "Employment calculator",
    intro:
      "This calculator applies to South Korea. Enter every monetary amount in KRW to separate ordinary wages and the night-work premium.",
    input: "South Korea night-work inputs (KRW)",
    wage: "Ordinary hourly wage (KRW)",
    wagePh: "e.g. 12,000",
    hours:
      "Total night-work hours in the payroll period (only actual work between 10 p.m. and 6 a.m.)",
    hoursPh: "e.g. 8",
    workplaceSize: "Workplace size",
    fiveOrMore: "Five or more regular employees",
    underFive: "Fewer than five regular employees",
    rate: "Night-work premium rate",
    ratePh: "e.g. 50",
    calculate: "Calculate night-work pay",
    reset: "Reset",
    error: "Check the highlighted values.",
    result: "Estimated result",
    total: "Total night-work pay (KRW)",
    base: "Base wage portion (KRW)",
    premium: "Night-work premium portion (KRW)",
    note: "A South Korea gross estimate in KRW; confirm actual coverage and payment with your contract and payroll records.",
    underFiveNotice:
      "At workplaces with fewer than five regular employees, the Article 56 statutory premium rule may not apply. The entered rate is calculated as a contractual premium.",
    overlapNotice:
      "This calculator models the night-work premium only. Overtime or holiday premiums may be added separately for overlapping hours and are not automatically included in this result.",
    details: "Calculation details",
    adjusted: "Premium-adjusted hourly pay (KRW)",
    appliedHours: "Applied night-work hours",
    appliedRate: "Applied night-work premium",
    empty: "Calculate to see the applied conditions.",
    exTitle: "How it is calculated",
    ex: [
      "Base pay is hourly wage multiplied by night-work hours.",
      "Night-work premium pay is base pay multiplied by the premium rate.",
      "Night work means actual work between 10 p.m. and 6 a.m.",
    ],
    warnTitle: "Important cautions",
    warn: [
      "At workplaces with five or more regular employees, a night-work premium of at least 50% generally applies.",
      "The 168-hour limit is an input safety limit, not a statutory maximum. Enter only actual night-work hours for the payroll period.",
      "Overlapping overtime or holiday premiums may be added separately; this calculator does not automatically combine them.",
    ],
    faq: [
      [
        "What hours count as night work?",
        "Actual work between 10 p.m. and 6 a.m.",
      ],
      [
        "Does it apply below five employees?",
        "Statutory premium coverage may differ.",
      ],
      [
        "Does this include overtime?",
        "No. It models the night-work premium only.",
      ],
      ["Is this after tax?", "No. It is before deductions."],
    ],
    reference: "Korean Labor Standards Act, Article 56",
  },
} as const;
