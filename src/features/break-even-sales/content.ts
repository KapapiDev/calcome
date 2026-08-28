export type BreakEvenSalesLocale = "ko" | "en";

export const breakEvenSalesContent = {
  ko: {
    title: "손익분기 매출 계산기",
    description:
      "고정비, 단위 판매가격, 단위 변동비를 입력해 공헌이익과 손익분기 판매량·매출액을 계산합니다.",
    category: "사업·생활",
    input: "손익분기 조건",
    fixedCosts: "고정비",
    sellingPricePerUnit: "단위 판매가격",
    variableCostPerUnit: "단위 변동비",
    calculate: "손익분기점 계산하기",
    reset: "초기화",
    result: "손익분기 결과",
    contributionMarginPerUnit: "단위 공헌이익",
    contributionMarginRatio: "공헌이익률",
    breakEvenUnits: "손익분기 판매량",
    breakEvenSales: "손익분기 매출액",
    error:
      "입력값을 확인해 주세요. 판매가격은 0보다 커야 하며 변동비는 판매가격보다 작아야 합니다.",
    note: "세금, 금융비용, 단계별 원가 변화는 포함하지 않는 단순 손익분기 분석입니다.",
    method:
      "단위 판매가격에서 단위 변동비를 빼 공헌이익을 구합니다. 고정비를 단위 공헌이익으로 나누면 손익분기 판매량, 고정비를 공헌이익률로 나누면 손익분기 매출액이 됩니다.",
    tips: "고정비와 변동비의 구분이 결과를 크게 좌우합니다. 실제 의사결정에는 임대료·인건비·결제수수료·배송비처럼 매출 규모에 따라 성격이 달라지는 비용도 함께 점검하세요.",
    metaTitle: "손익분기 매출 계산기 | 손익분기점·공헌이익 계산",
  },
  en: {
    title: "Break-Even Sales Calculator",
    description:
      "Enter fixed costs, selling price per unit, and variable cost per unit to calculate contribution margin, break-even units, and break-even sales.",
    category: "Business & Life",
    input: "Break-even inputs",
    fixedCosts: "Fixed costs",
    sellingPricePerUnit: "Selling price per unit",
    variableCostPerUnit: "Variable cost per unit",
    calculate: "Calculate break-even point",
    reset: "Reset",
    result: "Break-even results",
    contributionMarginPerUnit: "Contribution margin per unit",
    contributionMarginRatio: "Contribution margin ratio",
    breakEvenUnits: "Break-even units",
    breakEvenSales: "Break-even sales",
    error:
      "Check the inputs. Selling price must be greater than zero and variable cost must be lower than the selling price.",
    note: "This is a simplified break-even analysis and excludes taxes, financing costs, and step changes in costs.",
    method:
      "The calculator subtracts variable cost per unit from selling price to get contribution margin. Fixed costs divided by contribution margin gives break-even units; fixed costs divided by contribution margin ratio gives break-even sales.",
    tips: "Results depend on separating fixed and variable costs correctly. For real decisions, review costs such as rent, labor, payment fees, and shipping that may behave differently as sales volume changes.",
    metaTitle:
      "Break-Even Sales Calculator | Contribution Margin & Break-Even Point",
  },
} satisfies Record<BreakEvenSalesLocale, Record<string, string>>;
