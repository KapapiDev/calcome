export type SalaryNegotiationTargetLocale = "ko" | "en";

export const salaryNegotiationTargetContent = {
  ko: {
    title: "연봉 협상 목표 계산기",
    description:
      "현재 연봉과 최소·목표·도전 인상률을 기준으로 협상에서 사용할 연봉 구간과 인상 금액을 계산합니다.",
    category: "급여·근로",
    input: "협상 기준",
    currentSalary: "현재 연봉",
    minimumIncrease: "최소 수용 인상률",
    targetIncrease: "목표 인상률",
    stretchIncrease: "도전 인상률",
    calculate: "협상 목표 계산하기",
    reset: "초기화",
    result: "협상 목표",
    minimumSalary: "최소 수용 연봉",
    targetSalary: "목표 연봉",
    stretchSalary: "도전 연봉",
    targetIncreaseAmount: "목표 인상 금액",
    currentMonthly: "현재 월 환산액",
    targetMonthly: "목표 월 환산액",
    error:
      "현재 연봉은 0보다 크게 입력하고 인상률은 최소 ≤ 목표 ≤ 도전 순서로 입력해 주세요.",
    note: "세전 기본연봉 기준의 협상 보조 계산입니다. 보너스, 주식보상, 복리후생, 세금, 물가, 시장 연봉 데이터는 자동 반영하지 않습니다.",
    method:
      "각 목표 연봉은 현재 연봉 × (1 + 인상률 ÷ 100)으로 계산합니다. 최소·목표·도전의 세 구간을 함께 보면 협상 하한선과 제안 기준을 분리해서 정하기 쉽습니다.",
    cautions:
      "협상 목표는 역할 범위, 시장 시세, 성과, 총보상 구조를 함께 고려해 조정하세요. 이 계산기는 특정 인상률이 적정하거나 보장된다고 판단하지 않습니다.",
    metaTitle: "연봉 협상 목표 계산기 | 인상률별 목표 연봉 계산",
  },
  en: {
    title: "Salary Negotiation Target Calculator",
    description:
      "Turn your current salary and minimum, target, and stretch raise percentages into concrete negotiation salary anchors.",
    category: "Pay & Work",
    input: "Negotiation assumptions",
    currentSalary: "Current annual salary",
    minimumIncrease: "Minimum acceptable raise",
    targetIncrease: "Target raise",
    stretchIncrease: "Stretch raise",
    calculate: "Calculate negotiation targets",
    reset: "Reset",
    result: "Negotiation targets",
    minimumSalary: "Minimum acceptable salary",
    targetSalary: "Target salary",
    stretchSalary: "Stretch salary",
    targetIncreaseAmount: "Target increase amount",
    currentMonthly: "Current monthly equivalent",
    targetMonthly: "Target monthly equivalent",
    error:
      "Enter a current salary above zero and raise percentages ordered minimum ≤ target ≤ stretch.",
    note: "This is a pre-tax base-salary planning tool. It does not automatically include bonus, equity, benefits, taxes, inflation, or market salary data.",
    method:
      "Each salary anchor equals current salary × (1 + raise percentage ÷ 100). Using minimum, target, and stretch anchors separates your walk-away floor from your preferred ask and ambitious opening range.",
    cautions:
      "Adjust the anchors using role scope, market evidence, performance, and the full compensation package. The calculator does not claim that any raise percentage is appropriate or guaranteed.",
    metaTitle: "Salary Negotiation Target Calculator",
  },
} satisfies Record<SalaryNegotiationTargetLocale, Record<string, string>>;
