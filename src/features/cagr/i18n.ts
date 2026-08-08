export type CagrLocale = "ko" | "en";

const dictionaries = {
  ko: {
    calculator: {
      inputEyebrow: "입력",
      inputTitle: "투자 성과 설정",
      inputDescription: "추가 현금흐름이 없는 시작값과 종료값을 입력하세요.",
      initialValue: "시작값",
      initialHelp: "투자나 지표의 최초 평가액",
      initialPlaceholder: "예: 10,000,000",
      finalValue: "종료값",
      finalHelp: "투자 기간이 끝난 시점의 평가액",
      finalPlaceholder: "예: 15,000,000",
      period: "투자 기간",
      periodHelp: "최대 100년 또는 1,200개월",
      periodPlaceholder: "예: 5",
      periodUnit: "기간 단위",
      years: "년",
      months: "개월",
      won: "원",
      calculate: "CAGR 계산하기",
      reset: "초기화",
      errorSummary:
        "입력값을 확인해 주세요. 첫 번째 오류 항목으로 이동했습니다.",
      resultEyebrow: "계산 결과",
      resultTitle: "CAGR 분석 결과",
      cagr: "CAGR",
      totalGrowth: "총 성장률",
      absoluteProfit: "절대 손익",
      beginningValue: "시작값",
      endingValue: "종료값",
      investmentPeriod: "투자 기간",
      growthMultiple: "성장 배수",
      resultNote: "매년 같은 복리 비율로 변했다고 가정한 연환산 추정치입니다.",
      details: "상세 내역 보기",
      detailsEmpty:
        "계산 후 기간별 추정 가치와 누적 성장률을 확인할 수 있습니다.",
      tableCaption: "CAGR 기준 기간별 성장 상세 내역",
      periodIndex: "기간",
      estimatedValue: "추정 가치",
      cumulativeGrowth: "누적 성장률",
      additional: "추가 결과와 적용 가정",
      additionalEmpty:
        "계산 후 시작값, 종료값, 기간과 성장 배수를 확인할 수 있습니다.",
      complete: (cagr: string) =>
        `계산이 완료되었습니다. CAGR은 ${cagr}입니다.`,
      resetAnnouncement: "입력값과 계산 결과를 초기화했습니다.",
    },
    chart: {
      title: "연환산 성장 경로",
      description:
        "입력한 시작값과 종료값 사이를 동일한 CAGR로 연결한 추정 성장 경로입니다.",
      legend: "차트 범례",
      series: "추정 가치",
      empty: "값을 입력하고 계산하면 CAGR 기준 성장 경로가 표시됩니다.",
      period: "기간",
    },
    validation: {
      initialInvalid: "시작값은 0보다 크고 1조원 이하인 숫자로 입력해 주세요.",
      finalInvalid: "종료값은 0 이상 1조원 이하인 숫자로 입력해 주세요.",
      periodInvalid: "투자 기간은 1 이상의 정수로 입력해 주세요.",
      unitInvalid: "투자 기간 단위를 선택해 주세요.",
      periodMax: "투자 기간은 최대 1,200개월(100년)까지 입력할 수 있습니다.",
      initialRequired: "시작값을 입력해 주세요.",
      finalRequired: "종료값을 입력해 주세요.",
      periodRequired: "투자 기간을 입력해 주세요.",
    },
    page: {
      metaTitle: "CAGR 계산기 - 연평균 복합성장률 계산",
      metaDescription:
        "시작값과 종료값, 투자 기간으로 CAGR, 총 성장률, 절대 손익과 기간별 성장 경로를 계산하세요.",
      title: "CAGR 계산기",
      category: "금융 계산기",
      description:
        "시작값과 종료값 사이의 변화를 연평균 복합성장률로 환산하고 전체 성장 규모를 함께 확인하세요.",
      intro:
        "CAGR은 중간 변동과 현금흐름을 생략한 비교 지표이며 실제 매년 같은 수익이 발생했다는 뜻은 아닙니다.",
      breadcrumb: "현재 위치",
      home: "홈",
      calculators: "계산기",
      explanationTitle: "CAGR 계산 방법",
      explanation: [
        "CAGR은 종료값을 시작값으로 나눈 뒤 투자 기간의 역수를 거듭제곱해 연평균 복리 변화율로 환산합니다.",
        "개월 단위 기간은 12로 나누어 년으로 환산하며, 계산 중에는 Decimal.js 정밀도를 유지합니다.",
        "성장 경로는 입력한 두 값 사이가 같은 CAGR로 움직였다고 가정한 설명용 경로이며 실제 과거 가격은 아닙니다.",
      ],
      assumptionsTitle: "계산 전 확인하세요",
      assumptions: [
        "중간의 추가 납입, 인출, 배당과 현금흐름은 반영하지 않습니다.",
        "변동성, 최대 낙폭, 세금, 수수료, 물가와 환율 효과는 포함하지 않습니다.",
        "짧은 기간을 연환산한 CAGR은 장기간 유지 가능한 수익률을 의미하지 않습니다.",
      ],
      faqTitle: "자주 묻는 질문",
      faq: [
        [
          "CAGR과 평균 수익률은 같은가요?",
          "아닙니다. CAGR은 시작값과 종료값을 연결하는 기하평균 복리 성장률이며 실제 연도별 수익률의 산술평균과 다릅니다.",
        ],
        [
          "CAGR이 음수일 수 있나요?",
          "종료값이 시작값보다 작으면 연평균 감소율을 나타내는 음수 CAGR이 계산됩니다.",
        ],
        [
          "개월 단위는 어떻게 연환산하나요?",
          "입력 개월을 12로 나눈 기간을 CAGR 공식에 사용합니다. 짧은 기간의 작은 변화는 연환산 시 크게 보일 수 있습니다.",
        ],
        [
          "추가 투자금도 반영되나요?",
          "아닙니다. CAGR은 두 시점의 값만 사용하므로 중간 현금흐름이 있다면 현금흐름 기반 수익률을 별도로 확인해야 합니다.",
        ],
      ] as const,
      relatedTitle: "관련 계산기",
      related: [
        ["/ko/finance/compound-interest", "복리 계산기"],
        ["/ko/finance/savings", "적금 계산기"],
        ["/ko/finance/fixed-deposit", "정기예금 계산기"],
        ["/ko/finance/loan", "대출 계산기"],
      ] as const,
    },
  },
  en: {
    calculator: {
      inputEyebrow: "Inputs",
      inputTitle: "Growth settings",
      inputDescription:
        "Enter beginning and ending values with no intermediate cash flows.",
      initialValue: "Beginning value",
      initialHelp: "Value at the start of the period",
      initialPlaceholder: "e.g. 10,000,000",
      finalValue: "Ending value",
      finalHelp: "Value at the end of the period",
      finalPlaceholder: "e.g. 15,000,000",
      period: "Investment period",
      periodHelp: "Up to 100 years or 1,200 months",
      periodPlaceholder: "e.g. 5",
      periodUnit: "Period unit",
      years: "years",
      months: "months",
      won: "KRW",
      calculate: "Calculate CAGR",
      reset: "Reset",
      errorSummary: "Check the inputs. Focus moved to the first error.",
      resultEyebrow: "Results",
      resultTitle: "CAGR analysis",
      cagr: "CAGR",
      totalGrowth: "Total growth",
      absoluteProfit: "Absolute profit",
      beginningValue: "Beginning value",
      endingValue: "Ending value",
      investmentPeriod: "Investment period",
      growthMultiple: "Growth multiple",
      resultNote:
        "An annualized estimate assuming the same compounded rate each year.",
      details: "View detailed breakdown",
      detailsEmpty:
        "Calculate to view estimated value and cumulative growth by period.",
      tableCaption: "CAGR implied growth breakdown",
      periodIndex: "Period",
      estimatedValue: "Estimated value",
      cumulativeGrowth: "Cumulative growth",
      additional: "Additional results and assumptions",
      additionalEmpty:
        "Calculate to view beginning value, ending value, period, and growth multiple.",
      complete: (cagr: string) => `Calculation complete. CAGR is ${cagr}.`,
      resetAnnouncement: "Inputs and results were reset.",
    },
    chart: {
      title: "Annualized growth path",
      description:
        "An implied growth path connecting the entered beginning and ending values at a constant CAGR.",
      legend: "Chart legend",
      series: "Estimated value",
      empty: "Enter values and calculate to display the CAGR growth path.",
      period: "Period",
    },
    validation: {
      initialInvalid:
        "Enter a beginning value greater than zero and no more than 1 trillion in the selected display currency.",
      finalInvalid:
        "Enter an ending value from zero to 1 trillion in the selected display currency.",
      periodInvalid: "Enter an investment period as an integer of at least 1.",
      unitInvalid: "Select a period unit.",
      periodMax: "The investment period can be up to 1,200 months (100 years).",
      initialRequired: "Enter the beginning value.",
      finalRequired: "Enter the ending value.",
      periodRequired: "Enter the investment period.",
    },
    page: {
      metaTitle: "CAGR Calculator - Compound Annual Growth Rate",
      metaDescription:
        "Calculate CAGR, total growth, absolute profit, and an implied growth path from beginning value, ending value, and investment period.",
      title: "CAGR Calculator",
      category: "Financial calculator",
      description:
        "Annualize the change between beginning and ending values and understand the total scale of growth.",
      intro:
        "CAGR omits interim volatility and cash flows. It does not mean the same return occurred every year.",
      breadcrumb: "Breadcrumb",
      home: "Home",
      calculators: "Calculators",
      explanationTitle: "How CAGR is calculated",
      explanation: [
        "CAGR divides ending value by beginning value, raises the ratio to the reciprocal of the investment period, and subtracts one.",
        "Month periods are divided by 12 before applying the formula, while Decimal.js precision is retained through calculation.",
        "The growth path is an explanatory constant-CAGR path between the two entered values, not historical price data.",
      ],
      assumptionsTitle: "Important assumptions",
      assumptions: [
        "Intermediate contributions, withdrawals, dividends, and other cash flows are excluded.",
        "Volatility, drawdowns, taxes, fees, inflation, and currency effects are excluded.",
        "An annualized result from a short period should not be treated as a sustainable long-term return.",
      ],
      faqTitle: "Frequently asked questions",
      faq: [
        [
          "Is CAGR the same as an average return?",
          "No. CAGR is a geometric compounded rate connecting two values, not the arithmetic average of actual periodic returns.",
        ],
        [
          "Can CAGR be negative?",
          "Yes. When ending value is below beginning value, CAGR is a negative annualized decline.",
        ],
        [
          "How are months annualized?",
          "The entered months are divided by 12. Small short-term changes can appear large when annualized.",
        ],
        [
          "Are additional investments included?",
          "No. CAGR uses only two values. Use a cash-flow-based return measure when contributions or withdrawals occurred.",
        ],
      ] as const,
      relatedTitle: "Related calculators",
      related: [
        ["/en/finance/compound-interest", "Compound Interest Calculator"],
        ["/en/finance/savings", "Savings Calculator"],
        ["/en/finance/fixed-deposit", "Fixed Deposit Calculator"],
        ["/en/finance/loan", "Loan Calculator"],
      ] as const,
    },
  },
} as const;

export function getCagrDictionary(locale: CagrLocale) {
  return dictionaries[locale];
}
