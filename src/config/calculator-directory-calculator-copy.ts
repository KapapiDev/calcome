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
  ltv: "LTV Calculator",
  dsr: "DSR Calculator",
  "stress-dsr": "Stress DSR Calculator",
  "mortgage-loan-limit": "Mortgage Loan Limit Calculator",
  loan: "Loan Calculator",
  "loan-interest-comparison": "Loan Interest Comparison Calculator",
  "loan-refinancing-savings": "Loan Refinancing Savings Calculator",
  "balloon-payment": "Balloon Payment Calculator",
  "mortgage-payment": "Mortgage Payment Calculator",
  "jeonse-loan-interest": "Jeonse Loan Interest Calculator",
  "credit-loan-interest": "Credit Loan Interest Calculator",
  "early-loan-repayment-fee": "Early Loan Repayment Fee Calculator",
  dti: "DTI Calculator",
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
  deposit: "Deposit Calculator",
  savings: "Savings Calculator",
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
  cagr: "CAGR Calculator",
  "stock-average-cost": "Stock Average Cost Calculator",
  "stock-profit-loss": "Stock Profit/Loss Calculator",
  dividend: "Dividend Calculator",
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
  percentage: "Percentage Calculator",
  "discount-sale-price": "Discount Sale Price Calculator",
  age: "Age Calculator",
  "d-day": "D-Day Calculator",
  "date-difference": "Date Difference Calculator",
  "break-even-sales": "Break-Even Sales Calculator",
  "operating-profit": "Operating Profit Calculator",
  "business-cash-runway": "Business Cash Runway Calculator",
};

export const englishCalculatorDescriptions: Readonly<Record<string, string>> = {
  "weekly-holiday-pay": "Estimate South Korea weekly holiday pay from eligible workdays, hours, and wages.",
  "severance-pay": "Estimate South Korea statutory severance pay from service period and average wages.",
  "unemployment-benefits": "Estimate South Korea unemployment benefit amounts and expected payment duration.",
  "net-salary": "Estimate take-home salary after South Korea taxes and payroll deductions.",
  "hourly-wage": "Convert pay and working time into an effective hourly wage.",
  "social-insurance": "Estimate South Korea social insurance contributions for employee and employer payroll.",
  "average-wage": "Calculate an average wage from earnings and the applicable averaging period.",
  "salary-raise": "Compare current and proposed salary to measure the raise amount and percentage.",
  "salary-conversion": "Convert salary between hourly, daily, monthly, and annual pay periods.",
  "overtime-pay": "Estimate South Korea overtime compensation from base wage and overtime hours.",
  "night-work-pay": "Estimate South Korea night-work compensation from qualifying hours and base wage.",
  "holiday-work-pay": "Estimate South Korea holiday-work compensation from hours and applicable wage premiums.",
  "minimum-wage": "Check pay against the applicable South Korea minimum-wage basis.",
  "annual-leave-allowance": "Estimate South Korea unused annual-leave allowance from leave days and wage inputs.",
  "retirement-pension": "Estimate South Korea retirement pension contributions and projected retirement value.",
  "gross-up-salary": "Calculate the gross salary needed to reach a target net take-home amount.",
  "part-time-monthly-pay": "Estimate monthly pay for part-time work from hourly wage, schedule, and eligible allowances.",
  "daily-worker-pay": "Estimate daily-worker pay from workdays, daily wage, and applicable additions.",
  "work-hours-converter": "Convert working time between daily, weekly, monthly, and annual hour totals.",
  "total-compensation-comparison": "Compare salary, bonuses, benefits, and other compensation across job offers.",
  "salary-negotiation-target": "Set a salary negotiation target from current pay and desired increase.",
  "parental-leave-benefit": "Estimate South Korea parental-leave benefits from wage and leave-period inputs.",
  "maternity-leave-benefit": "Estimate South Korea maternity-leave benefits from wage and covered leave period.",
  ltv: "Calculate loan-to-value ratio from property value and secured borrowing.",
  dsr: "Estimate debt service ratio from annual income and required debt payments.",
  "stress-dsr": "Estimate stressed debt service ratio using a higher qualifying interest-rate assumption.",
  "mortgage-loan-limit": "Estimate a mortgage borrowing limit from income, property value, and lending constraints.",
  loan: "Calculate loan payments, total interest, and repayment schedule from principal, rate, and term.",
  "loan-interest-comparison": "Compare borrowing costs across loans with different rates, terms, and balances.",
  "loan-refinancing-savings": "Estimate whether refinancing can reduce interest or total borrowing cost after fees.",
  "balloon-payment": "Calculate a loan schedule with a remaining balloon balance at the end of the term.",
  "mortgage-payment": "Estimate recurring mortgage principal and interest payments from loan terms.",
  "jeonse-loan-interest": "Estimate interest cost for a South Korea jeonse deposit loan.",
  "credit-loan-interest": "Estimate interest and repayment cost for an unsecured credit loan.",
  "early-loan-repayment-fee": "Estimate an early loan repayment fee from remaining balance, fee rate, and elapsed period.",
  dti: "Calculate debt-to-income ratio from income and qualifying debt obligations.",
  "loan-affordability": "Estimate an affordable loan amount from income, payment capacity, rate, and term.",
  "debt-repayment-period": "Estimate how long debt repayment will take from balance, interest, and periodic payment.",
  "credit-card-installment-interest": "Estimate installment interest and payment amounts for a credit-card purchase.",
  "jeonse-loan-limit": "Estimate a South Korea jeonse loan limit from deposit, income, and lending inputs.",
  "real-estate-acquisition-tax": "Estimate South Korea real-estate acquisition tax from property and transaction inputs.",
  "capital-gains-tax": "Estimate South Korea capital gains tax from acquisition, sale, and deductible-cost inputs.",
  "gift-tax": "Estimate South Korea gift tax from gift value, relationship, and applicable deductions.",
  "inheritance-tax": "Estimate South Korea inheritance tax from estate value and applicable deductions.",
  "property-tax": "Estimate South Korea property tax from assessed value and property inputs.",
  "comprehensive-real-estate-holding-tax": "Estimate South Korea comprehensive real-estate holding tax from taxable property values.",
  "value-added-tax": "Calculate value added tax from a tax-inclusive or tax-exclusive amount.",
  "comprehensive-income-tax": "Estimate South Korea comprehensive income tax from taxable income and deductions.",
  "withholding-tax": "Estimate South Korea withholding tax from payment amount and withholding basis.",
  "freelancer-3-3-tax": "Estimate South Korea freelancer withholding commonly calculated at the 3.3% basis.",
  "year-end-tax-refund": "Estimate a South Korea year-end tax settlement refund or additional payment.",
  "retirement-income-tax": "Estimate South Korea retirement income tax from retirement benefit and service period.",
  "earned-income-withholding-tax": "Estimate South Korea earned-income withholding from salary and household inputs.",
  "rent-conversion-rate": "Calculate the implied conversion rate between a rental deposit and monthly rent.",
  "jeonse-monthly-rent-conversion": "Convert between South Korea jeonse deposit and monthly-rent structures.",
  "real-estate-brokerage-fee": "Estimate South Korea real-estate brokerage fees from transaction type and amount.",
  "rent-affordability": "Estimate an affordable rent budget from income and housing-cost assumptions.",
  "jeonse-vs-rent": "Compare the financial cost of South Korea jeonse and monthly-rent options.",
  "home-purchase-total-cost": "Estimate total home-purchase cash needs including price and transaction costs.",
  "home-sale-net-proceeds": "Estimate net proceeds from a home sale after debt and selling costs.",
  "rental-yield": "Calculate gross and net rental yield from property value, rent, and expenses.",
  "apartment-management-fee-budget": "Estimate a monthly apartment management-fee budget from household assumptions.",
  deposit: "Calculate maturity value and interest for a lump-sum time deposit.",
  savings: "Calculate recurring savings growth from deposits, interest, and saving period.",
  "compound-interest": "Project how principal grows when interest compounds over time.",
  "savings-goal": "Calculate the recurring contribution needed to reach a target savings amount.",
  "inflation-purchasing-power": "Estimate how inflation changes the future purchasing power of money.",
  "pension-savings-tax-credit": "Estimate South Korea pension-savings tax-credit value from eligible contributions.",
  "retirement-pension-tax-credit": "Estimate South Korea retirement-pension tax-credit value from eligible contributions.",
  "emergency-fund": "Estimate an emergency-fund target from essential monthly expenses and coverage months.",
  "fire-retirement-target": "Estimate a FIRE retirement portfolio target from spending and withdrawal assumptions.",
  "retirement-withdrawal": "Estimate sustainable retirement withdrawals from portfolio value, return, and horizon.",
  "pension-future-monthly-income": "Project future monthly pension income from contributions, growth, and payout assumptions.",
  "apr-apy-conversion": "Convert between APR and APY for a selected compounding frequency.",
  cagr: "Calculate compound annual growth rate from starting value, ending value, and time period.",
  "stock-average-cost": "Calculate a weighted average stock cost after additional share purchases.",
  "stock-profit-loss": "Calculate stock investment profit, loss, and return from cost and sale value.",
  dividend: "Estimate dividend income from share count, dividend amount, and payment frequency.",
  "dividend-yield": "Calculate dividend yield from annual dividend and share price.",
  "dollar-cost-averaging": "Project recurring-investment accumulation using regular contributions and return assumptions.",
  "investment-fee-impact": "Compare long-term investment outcomes before and after recurring fees.",
  "isa-tax-savings": "Estimate South Korea ISA tax savings from investment gains and account tax treatment.",
  "dividend-reinvestment": "Project portfolio growth when dividends are reinvested over time.",
  "portfolio-rebalancing": "Calculate trades needed to restore a portfolio to target allocation weights.",
  "bond-yield-to-maturity": "Estimate a bond's yield to maturity from price, coupon, face value, and term.",
  "bond-price": "Estimate bond price from coupon cash flows, yield, face value, and maturity.",
  "crypto-average-cost": "Calculate a weighted average cryptocurrency cost after multiple purchases.",
  "crypto-profit-loss": "Calculate cryptocurrency profit, loss, and return from cost and sale value.",
  "staking-reward": "Estimate staking rewards from stake amount, reward rate, and staking period.",
  "foreign-currency-average-cost": "Calculate a weighted average exchange rate and total cost after additional currency purchases.",
  "currency-conversion": "Convert an amount between currencies using an entered exchange rate.",
  "employer-total-labor-cost": "Estimate total employer labor cost from wages and employer-paid payroll costs.",
  percentage: "Calculate percentages, percentage change, and proportional values.",
  "discount-sale-price": "Calculate sale price and savings from an original price and discount rate.",
  age: "Calculate age from a birth date and reference date.",
  "d-day": "Count days remaining until or elapsed since a target date.",
  "date-difference": "Calculate the elapsed time between two calendar dates.",
  "break-even-sales": "Calculate contribution margin, break-even units, and break-even revenue.",
  "operating-profit": "Calculate gross profit, operating profit, and operating margin from business inputs.",
  "business-cash-runway": "Estimate monthly cash burn, runway duration, and the projected cash-out date.",
};

const publishedIds = allPublishedCalculators.map((calculator) => calculator.id);
const publishedIdSet = new Set<string>(publishedIds);

function assertExactCoverage(
  localizedCopy: Readonly<Record<string, string>>,
  label: string,
) {
  const localizedIds = Object.keys(localizedCopy);
  if (
    publishedIds.length !== localizedIds.length ||
    publishedIds.some((id) => !(id in localizedCopy)) ||
    localizedIds.some((id) => !publishedIdSet.has(id))
  ) {
    throw new Error(
      `English calculator ${label} must exactly cover the published calculator directory.`,
    );
  }

  for (const [id, value] of Object.entries(localizedCopy)) {
    if (value.trim().length === 0) {
      throw new Error(`Missing explicit English calculator ${label} for: ${id}`);
    }
  }
}

assertExactCoverage(englishCalculatorNames, "names");
assertExactCoverage(englishCalculatorDescriptions, "descriptions");

export function getEnglishCalculatorName(id: string) {
  const name = englishCalculatorNames[id];
  if (!name) {
    throw new Error(`Unknown English calculator name for: ${id}`);
  }
  return name;
}

export function getEnglishCalculatorDescription(id: string) {
  const description = englishCalculatorDescriptions[id];
  if (!description) {
    throw new Error(`Unknown English calculator description for: ${id}`);
  }
  return description;
}
