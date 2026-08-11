import type { SocialInsuranceLocale } from "./types";

const dictionaries = {
  ko: {
    page: {
      title: "4대보험 계산기",
      metaTitle: "2026 4대보험 계산기",
      metaDescription:
        "월 보수와 비과세 급여를 기준으로 국민연금·건강보험·장기요양보험·고용보험의 근로자 및 사업주 부담액을 계산하세요.",
      category: "근로·급여 계산기",
      description:
        "2026년 보험료율로 월별 4대보험 예상 부담액을 근로자와 사업주로 나누어 계산합니다.",
      intro:
        "사업장 규모에 따라 사업주의 고용보험 추가 부담률이 달라집니다. 산재보험은 업종별 요율이 달라 직접 입력하며, 실제 고지액은 신고 보수와 공단의 원 단위 처리에 따라 달라질 수 있습니다.",
      home: "홈",
      calculators: "계산기",
      breadcrumb: "경로",
      explanationTitle: "계산 방법",
      explanation: [
        "월 보수에서 비과세 급여를 뺀 금액을 간이 보험료 산정 기준으로 사용합니다.",
        "근로자 고용보험은 0.9%를 적용하고, 사업주 고용보험은 실업급여 0.9%와 사업장 규모별 고용안정·직업능력개발사업 부담률을 합산합니다.",
        "산재보험은 사업주 전액 부담이며 입력한 업종 요율을 적용합니다.",
      ],
      assumptionsTitle: "적용 기준과 주의사항",
      assumptions: [
        "국민연금 4.75%, 건강보험 3.595%, 장기요양은 건강보험료의 0.9448/7.19, 근로자 고용보험 0.9%를 적용합니다. 사업주는 0.9%에 사업장 규모별 0.25%·0.45%·0.65%·0.85%를 더합니다.",
        "국민연금은 월 기준소득 상한 659만 원을 반영합니다.",
        "사업주 고용보험의 추가 부담률은 우선지원대상기업 여부와 사업장 규모에 따라 달라집니다. 실제 보험료는 자격, 보수월액 상·하한, 업종별 산재 요율과 공단 정산에 따라 달라질 수 있습니다.",
      ],
      faqTitle: "자주 묻는 질문",
      faq: [
        [
          "산재보험료는 근로자도 부담하나요?",
          "아니요. 산재보험료는 사업주가 전액 부담합니다.",
        ],
        [
          "비과세 급여는 왜 입력하나요?",
          "식대 등 보험료 산정에서 제외되는 보수를 단순화해 반영하기 위해서입니다.",
        ],
        [
          "급여명세서와 결과가 다른 이유는 무엇인가요?",
          "공단에 신고된 보수월액, 상·하한, 원 단위 처리와 정산 시점이 다를 수 있습니다.",
        ],
        [
          "결과를 신고에 사용해도 되나요?",
          "아닙니다. 비교를 위한 추정치이며 신고에는 각 공단의 고지 자료를 확인해야 합니다.",
        ],
        [
          "사업주 고용보험료는 왜 더 높을 수 있나요?",
          "사업주는 실업급여 0.9% 외에 사업장 규모와 우선지원대상기업 여부에 따른 고용안정·직업능력개발사업 부담률을 추가로 냅니다.",
        ],
      ],
      sourcesTitle: "공식 기준 출처",
    },
    calc: {
      inputEyebrow: "입력",
      inputTitle: "보험료 조건",
      inputDescription:
        "월 보수, 사업장 규모, 적용할 산재보험 요율을 입력하세요.",
      monthlyPay: "월 보수",
      monthlyPlaceholder: "예: 3,500,000",
      nonTaxable: "월 비과세 급여",
      nonTaxablePlaceholder: "예: 200,000",
      accidentRate: "산재보험 요율",
      accidentPlaceholder: "예: 0.7",
      workplaceSize: "사업장 규모",
      under150: "150인 미만 (추가 0.25%)",
      priority150: "150인 이상 우선지원대상기업 (추가 0.45%)",
      between150And999: "150인 이상 1,000인 미만 (추가 0.65%)",
      over1000OrPublic: "1,000인 이상 또는 국가·지자체 (추가 0.85%)",
      calculate: "4대보험 계산하기",
      reset: "초기화",
      error: "입력값을 확인해 주세요.",
      resultEyebrow: "예상 결과",
      resultTitle: "월 보험료",
      employeeTotal: "근로자 부담",
      employerTotal: "사업주 부담",
      combinedTotal: "합계 부담",
      note: "2026년 기준 간이 추정치입니다.",
      breakdown: "보험별 상세 내역",
      item: "보험",
      employee: "근로자",
      employer: "사업주",
      pension: "국민연금",
      health: "건강보험",
      longTermCare: "장기요양보험",
      employment: "고용보험",
      employerEmploymentNote:
        "사업주 고용보험료에는 실업급여 0.9%와 선택한 고용안정·직업능력개발사업 추가 부담률이 포함됩니다.",
      industrialAccident: "산재보험",
      empty: "계산하면 보험별 부담액이 표시됩니다.",
      won: "원",
      percent: "%",
      complete: (v: string) => `예상 근로자 부담액은 ${v}입니다.`,
      resetAnnouncement: "입력과 결과를 초기화했습니다.",
    },
  },
  en: {
    page: {
      title: "Korean Social Insurance Calculator",
      metaTitle: "2026 Korea Social Insurance Calculator",
      metaDescription:
        "Estimate 2026 Korean national pension, health, long-term care, employment, and industrial accident insurance contributions.",
      category: "Employment calculator",
      description:
        "Estimate monthly employee and employer Korean social-insurance contributions using 2026 rates.",
      intro:
        "The employer's additional employment-insurance rate varies by workplace size. Enter the industry-specific accident insurance rate. Actual bills vary by reported remuneration, eligibility, and official rounding.",
      home: "Home",
      calculators: "Calculators",
      breadcrumb: "Breadcrumb",
      explanationTitle: "How it is calculated",
      explanation: [
        "Monthly tax-free pay is subtracted from monthly remuneration for this simplified contribution base.",
        "Employee employment insurance uses 0.9%. Employer employment insurance combines 0.9% unemployment benefits with the workplace-size employment-stability and vocational-development rate.",
        "Industrial accident insurance is employer-paid and uses the rate you enter.",
      ],
      assumptionsTitle: "Assumptions and cautions",
      assumptions: [
        "Rates: pension 4.75%, health 3.595%, long-term care at 0.9448/7.19 of health, and employee employment insurance 0.9%. Employers add 0.25%, 0.45%, 0.65%, or 0.85% based on workplace size.",
        "The KRW 6.59 million monthly pension ceiling is applied.",
        "The employer's additional employment-insurance rate depends on workplace size and priority-support status. Actual contributions vary with eligibility, official remuneration limits, industry rate, and agency settlement.",
      ],
      faqTitle: "Frequently asked questions",
      faq: [
        [
          "Do employees pay accident insurance?",
          "No. The employer pays the full industrial accident insurance contribution.",
        ],
        [
          "Why enter tax-free pay?",
          "It provides a simplified adjustment for remuneration excluded from the contribution base.",
        ],
        [
          "Why can payroll differ?",
          "Reported remuneration, limits, rounding, and settlement timing may differ.",
        ],
        [
          "Can I use this estimate for filing?",
          "No. Use official agency notices for filing and payment.",
        ],
        [
          "Why can the employer employment contribution be higher?",
          "Employers pay 0.9% for unemployment benefits plus an employment-stability and vocational-development rate based on workplace size and priority-support status.",
        ],
      ],
      sourcesTitle: "Official references",
    },
    calc: {
      inputEyebrow: "Inputs",
      inputTitle: "Insurance details",
      inputDescription:
        "Enter South Korean monthly pay in KRW, workplace size, and the applicable accident insurance rate.",
      monthlyPay: "Monthly pay (KRW)",
      monthlyPlaceholder: "e.g. 3,500,000",
      nonTaxable: "Monthly tax-free pay (KRW)",
      nonTaxablePlaceholder: "e.g. 200,000",
      accidentRate: "Accident insurance rate",
      accidentPlaceholder: "e.g. 0.7",
      workplaceSize: "Workplace size",
      under150: "Under 150 employees (additional 0.25%)",
      priority150: "150+ priority-support enterprise (additional 0.45%)",
      between150And999: "150 to fewer than 1,000 employees (additional 0.65%)",
      over1000OrPublic:
        "1,000+ employees or public authority (additional 0.85%)",
      calculate: "Calculate contributions",
      reset: "Reset",
      error: "Check the highlighted values.",
      resultEyebrow: "Estimate",
      resultTitle: "Monthly contributions (KRW)",
      employeeTotal: "Employee share",
      employerTotal: "Employer share",
      combinedTotal: "Combined total",
      note: "A simplified South Korea estimate using 2026 rates; all amounts are KRW.",
      breakdown: "Contribution breakdown",
      item: "Insurance",
      employee: "Employee",
      employer: "Employer",
      pension: "National pension",
      health: "Health insurance",
      longTermCare: "Long-term care",
      employment: "Employment insurance",
      employerEmploymentNote:
        "Employer employment insurance includes 0.9% unemployment benefits plus the selected employment-stability and vocational-development rate.",
      industrialAccident: "Industrial accident",
      empty: "Calculate to see each contribution.",
      won: "KRW",
      percent: "%",
      complete: (v: string) => `Estimated employee contribution is ${v}.`,
      resetAnnouncement: "Inputs and results reset.",
    },
  },
} as const;
export const getSocialInsuranceDictionary = (locale: SocialInsuranceLocale) =>
  dictionaries[locale];
