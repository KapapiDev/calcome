import { allPublishedCalculators } from "./calculator-directory";

export const englishCalculatorNames: Readonly<Record<string, string>> = {
  "weekly-holiday-pay": "Weekly Holiday Pay Calculator",
  "severance-pay": "Severance Pay Calculator",
  "unemployment-benefits": "Unemployment Benefits Calculator",
  "net-salary": "Net Salary Calculator",
  "hourly-wage": "Hourly Wage Calculator",
  "social-insurance": "Social Insurance Calculator",
  "average-wage": "Average Wage Calculator",
  "salary-raise": "Salary Raise Calculator",
  "salary-conversion": "Salary Conversion Calculator",
  "overtime-pay": "Overtime Pay Calculator",
  "night-work-pay": "Night Work Pay Calculator",
  "holiday-work-pay": "Holiday Work Pay Calculator",
  "minimum-wage": "Minimum Wage Calculator",
  "annual-leave-allowance": "Annual Leave Allowance Calculator",
  "retirement-pension": "Retirement Pension Calculator",
  "gross-up-salary": "Gross-Up Salary Calculator",
  "part-time-monthly-pay": "Part-Time Monthly Pay Calculator",
  "daily-worker-pay": "Daily Worker Pay Calculator",
  "work-hours-converter": "Work Hours Converter",
  "total-compensation-comparison": "Total Compensation Comparison Calculator",
  "salary-negotiation-target": "Salary Negotiation Target Calculator",
  "parental-leave-benefit": "Parental Leave Benefit Calculator",
  "maternity-leave-benefit": "Maternity Leave Benefit Calculator",
  "ltv": "LTV Calculator",
  "dsr": "DSR Calculator",
  "stress-dsr": "Stress DSR Calculator",
  "mortgage-loan-limit": "Mortgage Loan Limit Calculator",
  "loan": "Loan Calculator",
  "loan-interest-comparison": "Loan Interest Comparison Calculator",
  "loan-refinancing-savings": "Loan Refinancing Savings Calculator",
  "balloon-payment": "Balloon Payment Calculator",
  "mortgage-payment": "Mortgage Payment Calculator",
  "jeonse-loan-interest": "Jeonse Loan Interest Calculator",
  "credit-loan-interest": "Credit Loan Interest Calculator",
  "early-loan-repayment-fee": "Early Loan Repayment Fee Calculator",
  "dti": "DTI Calculator",
  "loan-affordability": "Loan Affordability Calculator",
  "debt-repayment-period": "Debt Repayment Period Calculator",
  "credit-card-installment-interest":
    "Credit Card Installment Interest Calculator",
  "jeonse-loan-limit": "Jeonse Loan Limit Calculator",
  "real-estate-acquisition-tax": "Real Estate Acquisition Tax Calculator",
  "capital-gains-tax": "Capital Gains Tax Calculator",
  "gift-tax": "Gift Tax Calculator",
  "inheritance-tax": "Inheritance Tax Calculator",
  "property-tax": "Property Tax Calculator",
  "comprehensive-real-estate-holding-tax":
    "Comprehensive Real Estate Holding Tax Calculator",
  "value-added-tax": "Value Added Tax Calculator",
  "comprehensive-income-tax": "Comprehensive Income Tax Calculator",
  "withholding-tax": "Withholding Tax Calculator",
  "freelancer-3-3-tax": "Freelancer 3.3% Tax Calculator",
  "year-end-tax-refund": "Year-End Tax Refund Calculator",
  "retirement-income-tax": "Retirement Income Tax Calculator",
  "earned-income-withholding-tax": "Earned Income Withholding Tax Calculator",
  "rent-conversion-rate": "Rent Conversion Rate Calculator",
  "jeonse-monthly-rent-conversion": "Jeonse Monthly Rent Conversion Calculator",
  "real-estate-brokerage-fee": "Real Estate Brokerage Fee Calculator",
  "rent-affordability": "Rent Affordability Calculator",
  "jeonse-vs-rent": "Jeonse vs Rent Calculator",
  "home-purchase-total-cost": "Home Purchase Total Cost Calculator",
  "home-sale-net-proceeds": "Home Sale Net Proceeds Calculator",
  "rental-yield": "Rental Yield Calculator",
  "apartment-management-fee-budget":
    "Apartment Management Fee Budget Calculator",
  "deposit": "Deposit Calculator",
  "savings": "Savings Calculator",
  "compound-interest": "Compound Interest Calculator",
  "savings-goal": "Savings Goal Calculator",
  "inflation-purchasing-power": "Inflation Purchasing Power Calculator",
  "pension-savings-tax-credit": "Pension Savings Tax Credit Calculator",
  "retirement-pension-tax-credit": "Retirement Pension Tax Credit Calculator",
  "emergency-fund": "Emergency Fund Calculator",
  "fire-retirement-target": "FIRE Retirement Target Calculator",
  "retirement-withdrawal": "Retirement Withdrawal Calculator",
  "pension-future-monthly-income": "Pension Future Monthly Income Calculator",
  "apr-apy-conversion": "APR/APY Conversion Calculator",
  "cagr": "CAGR Calculator",
  "stock-average-cost": "Stock Average Cost Calculator",
  "stock-profit-loss": "Stock Profit/Loss Calculator",
  "dividend": "Dividend Calculator",
  "dividend-yield": "Dividend Yield Calculator",
  "dollar-cost-averaging": "Dollar Cost Averaging Calculator",
  "investment-fee-impact": "Investment Fee Impact Calculator",
  "isa-tax-savings": "ISA Tax Savings Calculator",
  "dividend-reinvestment": "Dividend Reinvestment Calculator",
  "portfolio-rebalancing": "Portfolio Rebalancing Calculator",
  "bond-yield-to-maturity": "Bond Yield to Maturity Calculator",
  "bond-price": "Bond Price Calculator",
  "crypto-average-cost": "Crypto Average Cost Calculator",
  "crypto-profit-loss": "Crypto Profit/Loss Calculator",
  "staking-reward": "Staking Reward Calculator",
  "foreign-currency-average-cost": "Foreign Currency Average Cost Calculator",
  "currency-conversion": "Currency Conversion Calculator",
  "employer-total-labor-cost": "Employer Total Labor Cost Calculator",
  "percentage": "Percentage Calculator",
  "discount-sale-price": "Discount Sale Price Calculator",
  "age": "Age Calculator",
  "d-day": "D-Day Calculator",
  "date-difference": "Date Difference Calculator",
  "break-even-sales": "Break-Even Sales Calculator",
  "operating-profit": "Operating Profit Calculator",
  "business-cash-runway": "Business Cash Runway Calculator",
};

const publishedIds = allPublishedCalculators.map((calculator) => calculator.id);
const publishedIdSet = new Set<string>(publishedIds);
const localizedIds = Object.keys(englishCalculatorNames);

if (
  publishedIds.length !== localizedIds.length ||
  publishedIds.some((id) => !(id in englishCalculatorNames)) ||
  localizedIds.some((id) => !publishedIdSet.has(id))
) {
  throw new Error(
    "English calculator names must exactly cover the published calculator directory.",
  );
}

for (const [id, name] of Object.entries(englishCalculatorNames)) {
  if (name.trim().length === 0) {
    throw new Error(`Missing explicit English calculator name for: ${id}`);
  }
}

export function getEnglishCalculatorName(id: string) {
  const name = englishCalculatorNames[id];
  if (!name) {
    throw new Error(`Unknown English calculator name for: ${id}`);
  }
  return name;
}
