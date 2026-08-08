export type AverageWageLocale = "ko" | "en";

export const averageWageContent = {
  ko: {
    title: "평균임금 계산기",
    metaTitle: "평균임금 계산기 | 1일 평균임금 계산",
    description:
      "사유 발생 전 3개월간 임금총액과 산정기간 총일수로 1일 평균임금과 30일분 평균임금을 계산합니다.",
    category: "근로·급여 계산기",
    intro:
      "퇴직금·휴업수당·재해보상 등의 기초가 되는 평균임금을 간편하게 확인하세요.",
    input: "평균임금 조건",
    wageTotal: "산정기간 임금총액",
    wagePlaceholder: "예: 9,000,000",
    calendarDays: "산정기간 총일수",
    daysPlaceholder: "예: 92",
    ordinaryDailyWage: "일급 통상임금",
    ordinaryPlaceholder: "선택 입력, 예: 100,000",
    optional: "선택",
    calculate: "평균임금 계산하기",
    reset: "초기화",
    error: "입력값을 확인해 주세요.",
    result: "예상 결과",
    calculatedDaily: "산출 1일 평균임금",
    appliedDaily: "적용 1일 평균임금",
    thirtyDay: "30일분 평균임금",
    comparedNote:
      "근로기준법 제2조 제2항에 따라 산출 평균임금과 입력한 통상임금을 비교한 결과입니다.",
    notComparedNote:
      "통상임금을 입력하지 않아 통상임금과 비교하지 않은 산출값입니다. 법정 적용 평균임금으로 확정된 값이 아닙니다.",
    notCompared: "비교하지 않음",
    notProvided: "입력하지 않음",
    details: "계산 상세",
    total: "포함한 임금총액",
    days: "나눈 총일수",
    formula: "임금총액 ÷ 산정기간 총일수",
    empty: "계산하면 산출값과 통상임금 비교 결과가 표시됩니다.",
    explanationTitle: "계산 방법",
    explanation: [
      "근로기준법 제2조 제1항 제6호에 따라 평균임금은 산정 사유 발생 전 3개월간 지급된 임금총액을 그 기간의 총일수로 나눈 금액입니다.",
      "근로기준법 제2조 제2항에 따라 산출 평균임금이 통상임금보다 낮으면 통상임금을 적용 평균임금으로 사용합니다.",
      "30일분 평균임금은 통상임금 비교 후 적용된 1일 평균임금에 30을 곱합니다.",
      "상여금과 연차수당은 법적 배분액을 임금총액에 포함해야 합니다.",
    ],
    cautionsTitle: "중요한 주의사항",
    cautions: [
      "업무상 재해 요양, 출산전후휴가, 사용자 귀책 휴업 등 평균임금 제외기간은 임금과 일수 양쪽에서 함께 제외해야 합니다.",
      "일급 통상임금을 입력하지 않으면 법정 최저기준 비교를 하지 않은 산출 평균임금만 표시합니다.",
      "실제 정산에는 급여대장과 고용노동부 또는 노무 전문가의 확인이 필요합니다.",
    ],
    faq: [
      [
        "3개월은 항상 90일인가요?",
        "아닙니다. 달력상 3개월의 실제 총일수에 따라 보통 89~92일이 될 수 있습니다.",
      ],
      [
        "세전 금액을 입력하나요?",
        "네. 소득세와 4대보험을 공제하기 전 임금총액을 기준으로 입력합니다.",
      ],
      [
        "상여금도 포함하나요?",
        "정기성·지급 기준에 따라 포함 범위가 달라질 수 있으므로 실제 산정에서는 지급 규정과 공식 안내를 확인하세요.",
      ],
      [
        "퇴직금으로 바로 사용할 수 있나요?",
        "평균임금은 퇴직금 산식의 한 요소입니다. 계속근로기간과 통상임금 비교 등은 별도로 확인해야 합니다.",
      ],
    ],
    reference: "국가법령정보센터 근로기준법 제2조 제1항 제6호 및 제2항",
  },
  en: {
    title: "South Korea Average Wage Calculator",
    metaTitle: "South Korea Average Wage Calculator | KRW Estimate",
    description:
      "Calculate South Korean average daily wage and a 30-day amount in KRW from total wages and calendar days in the calculation period.",
    category: "Employment calculator",
    intro:
      "This calculator applies to South Korea. Enter every monetary amount in KRW to estimate the average wage used for severance, shutdown allowance, and statutory compensation.",
    input: "South Korea average wage inputs (KRW)",
    wageTotal: "Total wages in period (KRW)",
    wagePlaceholder: "e.g. 9,000,000",
    calendarDays: "Calendar days in period",
    daysPlaceholder: "e.g. 92",
    ordinaryDailyWage: "Ordinary daily wage (KRW)",
    ordinaryPlaceholder: "Optional, e.g. 100,000",
    optional: "Optional",
    calculate: "Calculate average wage",
    reset: "Reset",
    error: "Check the highlighted values.",
    result: "Estimated result",
    calculatedDaily: "Calculated daily average wage (KRW)",
    appliedDaily: "Applied daily average wage (KRW)",
    thirtyDay: "30-day average wage (KRW)",
    comparedNote:
      "This result compares the calculated average wage with the entered ordinary wage under Article 2(2) of the Korean Labor Standards Act.",
    notComparedNote:
      "No ordinary daily wage was entered, so this is a calculated value not compared with ordinary wage. It is not a confirmed statutory applied average wage.",
    notCompared: "Not compared",
    notProvided: "Not provided",
    details: "Calculation details",
    total: "Included total wages (KRW)",
    days: "Calendar-day divisor",
    formula: "Total wages ÷ calendar days",
    empty:
      "Calculate to see the calculated value and ordinary-wage comparison.",
    explanationTitle: "How it is calculated",
    explanation: [
      "Under Article 2(1)6 of the Korean Labor Standards Act, average wage is total wages paid during the three months before the relevant event divided by total calendar days in that period.",
      "Under Article 2(2), use ordinary wage as the applied average wage when it is higher than the calculated average wage.",
      "The 30-day amount multiplies the applied daily average wage by 30 after the ordinary-wage comparison.",
      "Include the legally allocated amount of bonuses and unused-leave pay in total wages.",
    ],
    cautionsTitle: "Important cautions",
    cautions: [
      "Average-wage excluded periods must be removed from both wages and days.",
      "If no ordinary daily wage is entered, the calculator shows only a calculated value without the statutory minimum comparison.",
      "Use payroll records and official or professional guidance for an actual settlement.",
    ],
    faq: [
      [
        "Is three months always 90 days?",
        "No. The actual calendar period commonly ranges from 89 to 92 days.",
      ],
      [
        "Should I enter pre-tax wages?",
        "Yes. Enter wages before income tax and social-insurance deductions.",
      ],
      [
        "Are bonuses included?",
        "Treatment depends on payment rules and legal allocation; confirm the official guidance for your case.",
      ],
      [
        "Can this directly calculate severance?",
        "Average wage is only one part of severance calculation. Service period and ordinary-wage comparison also matter.",
      ],
    ],
    reference: "Korean Labor Standards Act, Article 2(1)6 and Article 2(2)",
  },
} as const;
