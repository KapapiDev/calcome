export type OperatingProfitLocale = "ko" | "en";

export const operatingProfitContent = {
  ko: {
    title: "영업이익률·영업이익 계산기",
    description:
      "영업이익률 = 영업이익 ÷ 매출액 × 100. 매출액·매출원가·영업비용을 입력해 영업이익률과 영업이익, 매출총이익을 함께 계산하세요.",
    category: "사업·생활",
    input: "영업이익 조건",
    revenue: "매출액",
    costOfGoodsSold: "매출원가",
    operatingExpenses: "영업비용",
    calculate: "영업이익 계산하기",
    reset: "초기화",
    result: "영업이익 결과",
    grossProfit: "매출총이익",
    operatingProfit: "영업이익",
    operatingMargin: "영업이익률",
    error:
      "입력값을 확인해 주세요. 매출액은 0보다 커야 하며 비용은 음수가 될 수 없습니다.",
    note: "이 계산기는 이자비용, 법인세, 영업외손익을 제외한 단순 영업성과 분석입니다.",
    method:
      "매출총이익 = 매출액 − 매출원가, 영업이익 = 매출총이익 − 영업비용입니다. 영업이익률(%) = 영업이익 ÷ 매출액 × 100이며, 매출총이익률이나 순이익률과는 다른 지표입니다.",
    example:
      "예를 들어 매출액 1억 원, 매출원가 5,500만 원, 영업비용 2,500만 원이면 매출총이익 4,500만 원, 영업이익 2,000만 원, 영업이익률 20%입니다. 비용 합계가 매출을 넘으면 영업이익과 영업이익률은 음수가 됩니다.",
    assumptions:
      "세 입력값의 통화·기간·회계 범위를 맞추고, 매출원가와 영업비용에 같은 비용을 두 번 넣지 마세요. 매출액은 0보다 커야 합니다.",
    tips: "기간과 회계 범위를 일관되게 맞추세요. 감가상각비, 인건비, 임차료처럼 영업비용에 포함되는 항목을 빠뜨리면 실제 수익성이 과대평가될 수 있습니다.",
    metaTitle: "영업이익률 계산기 | 영업이익·매출총이익 계산",
  },
  en: {
    title: "Operating Profit Calculator",
    description:
      "Enter revenue, cost of goods sold, and operating expenses to calculate gross profit, operating profit, and operating margin.",
    category: "Business & Life",
    input: "Operating profit inputs",
    revenue: "Revenue",
    costOfGoodsSold: "Cost of goods sold",
    operatingExpenses: "Operating expenses",
    calculate: "Calculate operating profit",
    reset: "Reset",
    result: "Operating profit results",
    grossProfit: "Gross profit",
    operatingProfit: "Operating profit",
    operatingMargin: "Operating margin",
    error:
      "Check the inputs. Revenue must be greater than zero and costs cannot be negative.",
    note: "This simplified operating analysis excludes interest, taxes, and non-operating gains or losses.",
    method:
      "Gross profit = revenue − cost of goods sold. Operating profit = gross profit − operating expenses. Operating margin (%) = operating profit ÷ revenue × 100; it differs from gross margin and net profit margin.",
    example:
      "For example, revenue of 100,000, cost of goods sold of 55,000, and operating expenses of 25,000 give gross profit of 45,000, operating profit of 20,000, and operating margin of 20%. Costs above revenue produce an operating loss and a negative margin.",
    assumptions:
      "Use one currency, reporting period, and accounting scope. Do not count a cost under both cost of goods sold and operating expenses. Revenue must be positive.",
    tips: "Use the same reporting period and accounting scope for every input. Missing operating costs such as payroll, rent, or depreciation can overstate profitability.",
    metaTitle: "Operating Profit Calculator | Operating Margin & Gross Profit",
  },
} satisfies Record<OperatingProfitLocale, Record<string, string>>;
