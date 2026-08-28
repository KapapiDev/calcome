export type BusinessCashRunwayLocale = "ko" | "en";

export const businessCashRunwayContent = {
  ko: {
    title: "사업 현금 런웨이 계산기",
    description:
      "현재 보유 현금과 월 현금 유입·유출을 입력해 월 순소진액, 예상 현금 런웨이와 소진 시점을 계산합니다.",
    category: "사업·생활",
    input: "현금 런웨이 조건",
    startingCash: "현재 보유 현금",
    monthlyInflow: "월 현금 유입",
    monthlyOutflow: "월 현금 유출",
    calculate: "현금 런웨이 계산하기",
    reset: "초기화",
    result: "현금 런웨이 결과",
    monthlyNetBurn: "월 순소진액",
    runwayMonths: "예상 런웨이",
    runwayEndDate: "예상 현금 소진일",
    increasedInflow: "월 유입 10% 증가 시",
    reducedOutflow: "월 유출 10% 감소 시",
    months: "개월",
    notConsuming: "현금 소진 없음",
    lowRunway: "주의: 현재 조건의 현금 런웨이가 3개월 미만입니다.",
    error:
      "입력값을 확인해 주세요. 보유 현금과 월 유입은 0 이상, 월 유출은 0보다 커야 합니다.",
    note: "모든 금액은 원화, 달러 등 같은 통화 단위로 입력하세요. 환율 변환은 하지 않으며 결과도 입력한 통화 단위를 그대로 따릅니다.",
    method:
      "월 현금 유출에서 월 현금 유입을 빼 월 순소진액을 구하고, 보유 현금을 순소진액으로 나눠 런웨이 개월 수를 계산합니다. 순소진액이 0 이하라면 현금이 감소하지 않는 상태로 표시합니다.",
    example:
      "예를 들어 보유 현금 120, 월 유입 30, 월 유출 50을 같은 통화 단위로 입력하면 월 순소진액은 20이고 예상 런웨이는 6개월입니다.",
    assumptionCashFlow:
      "입력한 월 현금 유입과 유출이 비교 기간 동안 동일하게 이어진다고 가정합니다.",
    assumptionCurrency:
      "모든 금액은 같은 통화 단위라고 가정하며 환율 변환은 수행하지 않습니다.",
    limitationCashFlow:
      "세금, 일회성 지출, 투자 유치, 대출 실행 같은 현금 흐름은 월 유입·유출에 직접 포함하지 않으면 결과에 반영되지 않습니다.",
    limitationDate:
      "예상 소진일은 평균 월 길이를 사용한 추정치이므로 실제 은행 잔액 소진 시점과 다를 수 있습니다.",
    tips: "실제 현금 흐름은 월별로 달라질 수 있으므로 최근 평균과 보수적 시나리오를 함께 비교하세요. 소진일은 평균 월 길이를 이용한 추정치이며, 유입 10% 증가와 유출 10% 감소 시나리오는 개선 효과를 빠르게 비교하기 위한 참고값입니다.",
    metaTitle: "사업 현금 런웨이 계산기 | 월 소진액·현금 소진일 계산",
  },
  en: {
    title: "Business Cash Runway Calculator",
    description:
      "Enter starting cash and monthly cash inflow and outflow to calculate net burn, estimated runway, and the projected cash-out date.",
    category: "Business & Life",
    input: "Cash runway inputs",
    startingCash: "Starting cash",
    monthlyInflow: "Monthly cash inflow",
    monthlyOutflow: "Monthly cash outflow",
    calculate: "Calculate cash runway",
    reset: "Reset",
    result: "Cash runway results",
    monthlyNetBurn: "Monthly net burn",
    runwayMonths: "Estimated runway",
    runwayEndDate: "Estimated cash-out date",
    increasedInflow: "With 10% more inflow",
    reducedOutflow: "With 10% less outflow",
    months: "months",
    notConsuming: "Cash is not being consumed",
    lowRunway:
      "Warning: cash runway is under 3 months at the current burn rate.",
    error:
      "Check the inputs. Starting cash and monthly inflow must be nonnegative, and monthly outflow must be greater than zero.",
    note: "Enter every monetary value in the same currency, such as KRW or USD. This calculator performs no FX conversion and keeps the currency unit you entered.",
    method:
      "The calculator subtracts monthly inflow from monthly outflow to get net burn, then divides starting cash by net burn to estimate runway months. If net burn is zero or negative, it reports a non-consuming state instead of dividing by zero.",
    example:
      "For example, entering 120 of starting cash, 30 of monthly inflow, and 50 of monthly outflow in the same currency unit produces a monthly net burn of 20 and an estimated runway of 6 months.",
    assumptionCashFlow:
      "The estimate assumes the entered monthly cash inflow and outflow continue at the same level during the comparison period.",
    assumptionCurrency:
      "All monetary inputs are assumed to use the same currency unit; no foreign-exchange conversion is performed.",
    limitationCashFlow:
      "Taxes, one-off expenses, financing, or investment proceeds affect the result only when you include them in the monthly inflow or outflow inputs.",
    limitationDate:
      "The projected cash-out date uses an average month length, so the actual bank-balance depletion date can differ.",
    tips: "Actual cash flow can vary by month, so compare recent averages with conservative assumptions. The projected cash-out date uses an average month length, while the 10% inflow and outflow scenarios are quick sensitivity checks rather than forecasts.",
    metaTitle: "Business Cash Runway Calculator | Burn Rate & Cash-Out Date",
  },
} satisfies Record<BusinessCashRunwayLocale, Record<string, string>>;
