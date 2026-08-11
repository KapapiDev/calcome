export type UnemploymentBenefitsLocale = "ko" | "en";

const ko = {
  page: {
    title: "실업급여 계산기",
    metaTitle: "2026 실업급여 계산기",
    metaDescription:
      "평균임금, 고용보험 가입기간, 연령과 소정근로시간으로 2026년 예상 구직급여일액과 지급기간을 계산하세요.",
    category: "고용·급여 계산기",
    description:
      "퇴직 전 평균임금과 피보험기간을 바탕으로 예상 구직급여일액, 소정급여일수와 총액을 계산합니다.",
    intro:
      "실제 수급자격은 이직 사유, 피보험단위기간, 재취업 활동 등 개별 요건을 고용센터가 심사합니다.",
    home: "홈",
    calculators: "계산기",
    breadcrumb: "이동 경로",
    explanationTitle: "계산 방법",
    explanation: [
      "기초일액에 해당하는 1일 평균임금의 60%를 먼저 계산합니다.",
      "계산액에 2026년 최저임금 기반 하한과 법정 상한을 적용합니다.",
      "피보험기간과 퇴직 당시 연령 또는 장애 여부에 따라 120~270일을 적용합니다.",
    ],
    assumptionsTitle: "적용 기준과 주의사항",
    assumptions: [
      "상용근로자의 간편 추정이며 일용근로자, 예술인, 노무제공자와 자영업자는 산정 기준이 다릅니다.",
      "퇴직 전 1일 평균임금은 원칙적으로 퇴직 전 3개월 임금총액을 그 기간 총일수로 나눈 값입니다.",
      "수급기간, 대기기간, 반복수급 감액, 개별 연장급여와 실제 실업인정일은 반영하지 않습니다.",
      "결과는 예상치이며 신청·수급 가능 여부를 보장하지 않습니다.",
    ],
    faqTitle: "자주 묻는 질문",
    faq: [
      [
        "평균임금은 어떻게 확인하나요?",
        "퇴직 전 3개월 임금총액을 해당 기간의 총일수로 나눈 값이 원칙입니다. 정확한 값은 급여명세서와 회사 자료를 확인하세요.",
      ],
      [
        "자발적 퇴사도 받을 수 있나요?",
        "원칙적으로 비자발적 이직이 대상이지만 법령상 정당한 이직 사유가 인정되는 예외가 있습니다. 고용센터의 개별 판단이 필요합니다.",
      ],
      [
        "계산 결과만큼 한 번에 받나요?",
        "아닙니다. 실업인정을 받은 날에 따라 나누어 지급되며 대기기간과 재취업 활동 요건이 적용됩니다.",
      ],
      [
        "피보험기간 1년 미만도 계산 가능한가요?",
        "소정급여일수 구간은 표시할 수 있지만 실제 수급에는 원칙적으로 이직 전 18개월 중 피보험단위기간 180일 이상 등 별도 요건이 있습니다.",
      ],
    ],
    sourcesTitle: "공식 기준 출처",
  },
  calculator: {
    inputEyebrow: "입력",
    inputTitle: "수급 조건",
    inputDescription: "상용근로자 기준의 간편 추정에 필요한 값을 입력하세요.",
    averageDailyWage: "퇴직 전 1일 평균임금",
    wagePlaceholder: "예: 100,000",
    insuredMonths: "고용보험 가입기간",
    monthsPlaceholder: "예: 48",
    months: "개월",
    age: "퇴직 당시 만 나이",
    agePlaceholder: "예: 40",
    yearsOld: "세",
    dailyHours: "1일 소정근로시간",
    hours: "시간",
    disabled: "장애인 수급자",
    calculate: "예상 급여 계산하기",
    reset: "초기화",
    errorSummary: "입력값을 확인해 주세요.",
    resultEyebrow: "예상 결과",
    resultTitle: "구직급여 예상액",
    dailyBenefit: "1일 구직급여",
    benefitDays: "소정급여일수",
    totalBenefit: "총 예상수급액",
    resultNote:
      "2026년 기준 모의계산이며 실제 수급자격과 지급액은 고용센터에서 결정합니다.",
    timelineTitle: "예상 지급기간",
    timelineDescription: "가입기간과 연령·장애 조건에 따른 소정급여일수",
    emptyTimeline: "계산하면 예상 지급기간이 표시됩니다.",
    details: "상세 계산 내역",
    emptyDetails: "계산하면 상·하한 적용과 산식이 표시됩니다.",
    baseAmount: "평균임금의 60%",
    lowerLimit: "적용 하한",
    upperLimit: "적용 상한",
    applied: "최종 1일 지급액",
    limitLower: "하한 적용",
    limitUpper: "상한 적용",
    limitNone: "상·하한 미적용",
    complete: (value: string) => `총 예상수급액은 ${value}입니다.`,
    resetAnnouncement: "입력과 결과를 초기화했습니다.",
  },
};

const en = {
  page: {
    title: "Korean Unemployment Benefits Calculator",
    metaTitle: "2026 Korea Unemployment Benefits Calculator",
    metaDescription:
      "Estimate 2026 Korean job-seeking benefit amounts and duration from average daily wage, insured period, age, and working hours.",
    category: "Employment calculator",
    description:
      "Estimate South Korean job-seeking benefits in KRW from wage and employment-insurance history.",
    intro:
      "Actual eligibility depends on separation reason, insured qualifying days, job-seeking activity, and a South Korean employment-center review.",
    home: "Home",
    calculators: "Calculators",
    breadcrumb: "Breadcrumb",
    explanationTitle: "How it is calculated",
    explanation: [
      "First calculate 60% of average daily wage.",
      "Apply the 2026 South Korean minimum-wage floor and statutory daily cap.",
      "Use insured months and age or disability to select 120–270 prescribed days.",
    ],
    assumptionsTitle: "Assumptions and cautions",
    assumptions: [
      "This is a simplified South Korea estimate for regular employees; other insured-worker categories use different rules.",
      "Average daily wage generally means the prior three months' wage total divided by calendar days in that period.",
      "Waiting periods, repeat-claim reductions, extensions, and recognized unemployment days are excluded.",
      "This estimate does not guarantee eligibility or payment.",
    ],
    faqTitle: "Frequently asked questions",
    faq: [
      [
        "How do I find average daily wage?",
        "It is generally the prior three months' wage total divided by calendar days. Check payroll and employer records.",
      ],
      [
        "Can a voluntary resignation qualify?",
        "Usually not, but statutory justified reasons may qualify after an individual review.",
      ],
      [
        "Is the total paid at once?",
        "No. Payment follows recognized unemployment days, waiting periods, and job-seeking requirements.",
      ],
      [
        "Can I calculate with under one insured year?",
        "The duration band can be estimated, but separate eligibility rules such as qualifying insured days still apply.",
      ],
    ],
    sourcesTitle: "Official references",
  },
  calculator: {
    inputEyebrow: "Inputs",
    inputTitle: "Benefit details",
    inputDescription:
      "Enter South Korean regular-employee details. All wage and benefit amounts are in KRW.",
    averageDailyWage: "Average daily wage (KRW)",
    wagePlaceholder: "e.g. 100,000",
    insuredMonths: "Employment-insurance period",
    monthsPlaceholder: "e.g. 48",
    months: "months",
    age: "Age at separation",
    agePlaceholder: "e.g. 40",
    yearsOld: "years",
    dailyHours: "Scheduled hours per day",
    hours: "hours",
    disabled: "Recipient with a disability",
    calculate: "Estimate benefits",
    reset: "Reset",
    errorSummary: "Check the highlighted values.",
    resultEyebrow: "Estimate",
    resultTitle: "Job-seeking benefits (KRW)",
    dailyBenefit: "Daily benefit",
    benefitDays: "Prescribed days",
    totalBenefit: "Estimated total",
    resultNote:
      "A 2026 South Korea simulation; all monetary amounts are KRW and the employment center determines actual eligibility and payment.",
    timelineTitle: "Estimated benefit period",
    timelineDescription:
      "Prescribed days based on insured period and age or disability",
    emptyTimeline: "Calculate to see the estimated duration.",
    details: "Detailed calculation",
    emptyDetails: "Calculate to see the formula and applied limits.",
    baseAmount: "60% of average wage",
    lowerLimit: "Applicable floor",
    upperLimit: "Daily cap",
    applied: "Final daily benefit",
    limitLower: "Floor applied",
    limitUpper: "Cap applied",
    limitNone: "No limit applied",
    complete: (value: string) => `Estimated total benefit is ${value}.`,
    resetAnnouncement: "Inputs and results reset.",
  },
};

export const getUnemploymentBenefitsDictionary = (
  locale: UnemploymentBenefitsLocale,
) => (locale === "ko" ? ko : en);
