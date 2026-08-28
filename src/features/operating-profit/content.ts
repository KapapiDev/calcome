export type OperatingProfitLocale = "ko" | "en";

export const operatingProfitContent = {
  ko: {
    title: "영업이익 계산기",
    description:
      "매출액, 매출원가, 영업비용을 입력해 매출총이익, 영업이익, 영업이익률을 계산합니다.",
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
      "매출액에서 매출원가를 빼 매출총이익을 구하고, 다시 영업비용을 빼 영업이익을 계산합니다. 영업이익을 매출액으로 나누면 영업이익률입니다.",
    tips: "기간과 회계 범위를 일관되게 맞추세요. 감가상각비, 인건비, 임차료처럼 영업비용에 포함되는 항목을 빠뜨리면 실제 수익성이 과대평가될 수 있습니다.",
    metaTitle: "영업이익 계산기 | 영업이익률·매출총이익 계산",
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
      "The calculator subtracts cost of goods sold from revenue to get gross profit, then subtracts operating expenses to get operating profit. Operating profit divided by revenue gives operating margin.",
    tips: "Use the same reporting period and accounting scope for every input. Missing operating costs such as payroll, rent, or depreciation can overstate profitability.",
    metaTitle: "Operating Profit Calculator | Operating Margin & Gross Profit",
  },
} satisfies Record<OperatingProfitLocale, Record<string, string>>;
