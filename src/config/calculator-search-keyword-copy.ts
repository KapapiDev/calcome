import { allPublishedCalculators } from "./calculator-directory";

export const englishCalculatorSearchAliases: Readonly<
  Record<string, readonly string[]>
> = {
  "weekly-holiday-pay": ["weekly holiday allowance", "paid weekly holiday"],
  "severance-pay": ["severance", "termination pay"],
  "unemployment-benefits": ["unemployment insurance", "jobless benefits"],
  "net-salary": ["take home pay", "after tax salary"],
  "hourly-wage": ["hourly rate", "wage per hour"],
  "social-insurance": [
    "social security contributions",
    "insurance contributions",
  ],
  "average-wage": ["average pay"],
  "salary-raise": ["pay raise", "salary increase"],
  "salary-conversion": ["salary period conversion", "pay period conversion"],
  "overtime-pay": ["overtime", "time and a half"],
  "night-work-pay": ["night shift pay"],
  "holiday-work-pay": ["holiday pay"],
  "minimum-wage": ["minimum hourly wage"],
  "annual-leave-allowance": ["unused leave pay", "vacation pay"],
  "retirement-pension": ["retirement plan", "irp"],
  "gross-up-salary": ["gross up", "gross salary from net"],
  "part-time-monthly-pay": ["part time monthly salary"],
  "daily-worker-pay": ["daily wage"],
  "work-hours-converter": ["work time converter"],
  "total-compensation-comparison": [
    "compensation comparison",
    "offer comparison",
  ],
  "salary-negotiation-target": ["salary target", "negotiation target"],
  "parental-leave-benefit": ["parental leave pay"],
  "maternity-leave-benefit": ["maternity pay"],
  ltv: ["loan to value", "loan-to-value"],
  dsr: ["debt service ratio"],
  "stress-dsr": ["stress debt service ratio"],
  "mortgage-loan-limit": ["mortgage borrowing capacity"],
  loan: ["loan payment", "loan repayment"],
  "loan-interest-comparison": ["compare loan rates"],
  "loan-refinancing-savings": ["refinance savings", "refinancing calculator"],
  "balloon-payment": ["balloon loan"],
  "mortgage-payment": ["home loan payment"],
  "jeonse-loan-interest": ["jeonse interest"],
  "credit-loan-interest": ["personal loan interest"],
  "early-loan-repayment-fee": ["prepayment penalty", "early payoff fee"],
  dti: ["debt to income", "debt-to-income"],
  "loan-affordability": ["borrowing capacity"],
  "debt-repayment-period": ["debt payoff time"],
  "credit-card-installment-interest": ["installment interest"],
  "jeonse-loan-limit": ["jeonse borrowing limit"],
  "real-estate-acquisition-tax": ["property acquisition tax"],
  "capital-gains-tax": ["capital gain tax", "cgt"],
  "gift-tax": ["gift taxation"],
  "inheritance-tax": ["estate tax"],
  "property-tax": ["real estate tax"],
  "comprehensive-real-estate-holding-tax": ["real estate holding tax"],
  "value-added-tax": ["vat"],
  "comprehensive-income-tax": ["income tax"],
  "withholding-tax": ["tax withholding"],
  "freelancer-3-3-tax": ["freelancer withholding", "3.3 tax"],
  "year-end-tax-refund": ["tax refund"],
  "retirement-income-tax": ["retirement tax"],
  "earned-income-withholding-tax": ["payroll withholding"],
  "rent-conversion-rate": ["rent conversion"],
  "jeonse-monthly-rent-conversion": ["jeonse rent conversion"],
  "real-estate-brokerage-fee": ["realtor fee", "agent commission"],
  "rent-affordability": ["rent budget"],
  "jeonse-vs-rent": ["jeonse or rent", "rent comparison"],
  "home-purchase-total-cost": ["closing costs", "home buying costs"],
  "home-sale-net-proceeds": ["seller proceeds", "home sale proceeds"],
  "rental-yield": ["rental return", "cap rate"],
  "apartment-management-fee-budget": [
    "apartment fees",
    "maintenance fee budget",
  ],
  deposit: ["fixed deposit", "term deposit"],
  savings: ["recurring savings"],
  "compound-interest": ["compound growth", "interest compounding"],
  "savings-goal": ["savings target"],
  "inflation-purchasing-power": ["purchasing power", "inflation calculator"],
  "pension-savings-tax-credit": ["pension tax credit"],
  "retirement-pension-tax-credit": ["retirement tax credit"],
  "emergency-fund": ["rainy day fund"],
  "fire-retirement-target": ["fire number", "financial independence"],
  "retirement-withdrawal": ["safe withdrawal rate", "4 percent rule"],
  "pension-future-monthly-income": ["future pension income"],
  "apr-apy-conversion": ["apr to apy", "apy to apr"],
  cagr: ["compound annual growth rate"],
  "stock-average-cost": ["stock cost basis", "average stock price"],
  "stock-profit-loss": ["stock return", "stock pnl"],
  dividend: ["dividend income"],
  "dividend-yield": ["dividend rate"],
  "dollar-cost-averaging": ["dca", "recurring investment"],
  "investment-fee-impact": ["expense ratio impact", "investment fees"],
  "isa-tax-savings": ["isa tax benefit"],
  "dividend-reinvestment": ["drip", "reinvest dividends"],
  "portfolio-rebalancing": ["rebalance portfolio", "asset allocation"],
  "bond-yield-to-maturity": ["ytm", "yield to maturity"],
  "bond-price": ["bond valuation"],
  "crypto-average-cost": ["crypto cost basis", "average crypto price"],
  "crypto-profit-loss": ["crypto return", "crypto pnl"],
  "staking-reward": ["staking yield", "staking apy"],
  "foreign-currency-average-cost": [
    "fx average cost",
    "currency cost basis",
    "weighted average exchange rate",
  ],
  "currency-conversion": ["exchange rate", "fx converter"],
  "employer-total-labor-cost": ["total employment cost", "cost to company"],
  percentage: ["percent change", "percentage change"],
  "discount-sale-price": ["sale price", "discount price"],
  age: ["age from birth date"],
  "d-day": ["countdown days", "days until"],
  "date-difference": ["days between dates", "date interval"],
  "break-even-sales": ["break even point", "contribution margin"],
  "operating-profit": ["operating income", "operating margin"],
  "business-cash-runway": ["cash runway", "burn rate", "startup runway"],
};

const publishedIdSet = new Set<string>(
  allPublishedCalculators.map((calculator) => calculator.id),
);

for (const [id, aliases] of Object.entries(englishCalculatorSearchAliases)) {
  if (!publishedIdSet.has(id)) {
    throw new Error(`Unknown English calculator search alias id: ${id}`);
  }

  const normalized = new Set<string>();
  for (const alias of aliases) {
    if (alias.trim().length === 0 || !/^[\x00-\x7F]+$/.test(alias)) {
      throw new Error(`Invalid English calculator search alias for: ${id}`);
    }
    const key = alias.trim().toLocaleLowerCase("en-US");
    if (normalized.has(key)) {
      throw new Error(`Duplicate English calculator search alias for: ${id}`);
    }
    normalized.add(key);
  }
}

export function getEnglishCalculatorSearchAliases(
  id: string,
): readonly string[] {
  if (!publishedIdSet.has(id)) {
    throw new Error(`Unknown English calculator search alias id: ${id}`);
  }
  return englishCalculatorSearchAliases[id] ?? [];
}
